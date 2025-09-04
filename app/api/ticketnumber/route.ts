import TicketModel from "@/app/lib/models/ticket.model";
import { TicketData } from "@/app/types/types";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  
    const { searchParams } = new URL(request.url);
    const raffleId = searchParams.get('raffleid'); 
    const ticketNumber = searchParams.get('ticketnumber');
    
    const ticket = await TicketModel.findOne({ raffleId, ticketNumber }).select({
                    _id: 1,
                    ticketNumber: 1,
                    raffleId: 1,
                    orderId: 1,
                })
                .populate({
                    path: "raffleId",
                    select: "title _id", // Solo traer título e ID
                })
                .populate({
                    path: "orderId",
                    select: "status buyerName buyerId buyerPhone ticketCount ticketsAssigned _id", // Campos necesarios
                })
                .lean<TicketData>()
                .exec();
            console.log("🚀 ~ getTicketByNumber ~ ticket:", ticket);
    
            if (!ticket) throw new Error("Ticket no encontrado");
            const serializedTicket = {
                _id: ticket._id.toString(),
                ticketNumber: ticket.ticketNumber,
                raffleId: {
                    _id: ticket.raffleId._id.toString(),
                    title: ticket.raffleId.title,
                },
                orderId: {
                    _id: ticket.orderId._id.toString(),
                    status: ticket.orderId.status,
                    buyerName: ticket.orderId.buyerName,
                    buyerId: ticket.orderId.buyerId.toString(),
                    buyerPhone: ticket.orderId.buyerPhone.toString(),
                    ticketCount: ticket.orderId.ticketCount,
                    // ticketsAssigned: ticket.orderId.ticketsAssigned.map((id) =>
                    // 	id.toString()
                    // ),
                    ticketsAssigned: [],
                },
            };
    if (!ticket) {
        return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    return NextResponse.json({ message: "Ticket number endpoint reached", data: { ticket: serializedTicket } });
}