import connectMongoDB from '@/app/lib/mongoConnection';
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

export async function GET() {
    try {
        await connectMongoDB();
        const tickets = await TicketModel.find();
        return NextResponse.json({ message: 'Tickets retrieved successfully', data: tickets });
    } catch (error) {
        return NextResponse.json({ message: 'Error retrieving tickets', error: '500' });
    }
}

export async function DELETE() {
    try {
        await connectMongoDB();
        await TicketModel.deleteMany({});
        return NextResponse.json({ message: 'All tickets deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting tickets', error: '500' });
    }
}