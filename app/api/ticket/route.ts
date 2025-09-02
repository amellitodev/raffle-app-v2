import connectMongoDB from '@/app/lib/mongoConnection';
import  '@/app/lib/models/raffle.model';
import TicketModel from '@/app/lib/models/ticket.model';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        await connectMongoDB();
        const { raffleId, orderId, ticketNumber, buyerId } = await request.json();
        // validamos que existan los campos
        if(!orderId || !raffleId || !ticketNumber || !buyerId) {
            return NextResponse.json({ message: 'Missing required fields', error: '400' });
        }
        // validamos que el ticketNumber sea único por raffle
        const existingTicket = await TicketModel.findOne({ orderId, raffleId, ticketNumber });
        if (existingTicket) {
            return NextResponse.json({ message: 'Ticket already exists', error: '409' });
        }
        // max ticketNumber by raffle 10000
        const maxTicketNumber = 10000;
        if (ticketNumber > maxTicketNumber) {
            return NextResponse.json({ message: `Ticket number must be less than ${maxTicketNumber}`, error: '400' });
        }

        const newTicket = new TicketModel({
            orderId,
            raffleId,
            ticketNumber,
            buyerId
        });
        await newTicket.save();

        return NextResponse.json({ message: 'Ticket purchased successfully', data: newTicket });
    } catch (error) {
        return NextResponse.json({ message: 'Error purchasing ticket', error: '500' });
    }
}

// export async function GET() {
//     try {
//         await connectMongoDB();
//         const tickets = await TicketModel.find();
//         return NextResponse.json({ message: 'Tickets retrieved successfully', data: tickets });
//     } catch (error) {
//         return NextResponse.json({ message: 'Error retrieving tickets', error: '500' });
//     }
// }

export async function DELETE() {
    try {
        await connectMongoDB();
        await TicketModel.deleteMany({});
        return NextResponse.json({ message: 'All tickets deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting tickets', error: '500' });
    }
}

// get tickets by raffle id
export async function GET(request: Request) {
    try {
         const { searchParams } = new URL(request.url);
        await connectMongoDB();
        const raffleId = searchParams.get('raffleId');
        const sortOrder = searchParams.get('sortOrder') || 'desc';
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        if (!raffleId) {
            return NextResponse.json({ message: 'Missing raffleId', error: '400' });
        }
        // const tickets = await TicketModel.find({ raffleId });
        const tickets = await TicketModel.find({ raffleId })
			.sort({ ticketNumber: sortOrder === "asc" ? 1 : -1 })
			.skip((page - 1) * limit)
			.limit(limit)
			.populate({ path: "raffleId", select: "title" })
			.populate({ path: "orderId", select: "status buyerName ticketCount ticketsAssigned" })
			.lean()
			.exec();
		const totalTickets = await TicketModel.countDocuments({ raffleId }).exec();
		const totalPages = Math.ceil(totalTickets / limit);
        // para poder leer sus datos contenidos de raffleId y orderId
		const serializedTickets = tickets.map((ticket) => ({
			...ticket,
			raffleTitle: ticket.raffleId?.title || null,
			_id: (ticket._id as string).toString(), // Convertir ObjectId a string
			raffleId: ticket.raffleId
				? {
						_id: (ticket.raffleId._id as string).toString(),
						title: ticket.raffleId.title,
				  }
				: null,
			orderId: ticket.orderId
				? {
						_id: (ticket.orderId._id as string).toString(),
						status: ticket.orderId.status,
						buyerName: ticket.orderId.buyerName,
						ticketCount: ticket.orderId.ticketCount,
						ticketsAssigned: ticket.orderId.ticketsAssigned.map((id: number) =>
							id.toString()
						),
				  }
				: null,
		}));
        console.log("🚀 ~ GET ~ tickets:", tickets)
        // Formatear la respuesta
		const response = {
			tickets: serializedTickets,
			docs: {
				totalPages,
				limit,
				prevPage: page > 1 ? page - 1 : 0,
				currentPage: page,
				nextPage: page < totalPages ? page + 1 : 0,
			},
		};
        return NextResponse.json({ message: 'Tickets retrieved successfully', data: response });
    } catch (error) {
        console.log("🚀 ~ GET ~ error:", error)
        return NextResponse.json({ message: 'Error retrieving tickets', error: '500' });
    }
}
