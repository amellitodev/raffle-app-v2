import connectMongoDB from '@/app/lib/mongoConnection';
import TicketModel from '@/app/lib/models/ticket.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectMongoDB();
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ message: 'Missing ticket ID', error: '400' });
        }
        const ticket = await TicketModel.findById(id);
        if (!ticket) {
            return NextResponse.json({ message: 'Ticket not found', error: '404' });
        }
        return NextResponse.json({ message: 'Ticket by id retrieved successfully', data: ticket });
    } catch (error) {
        console.log("🚀 ~ GET ~ error:", error)
        return NextResponse.json({ message: 'Error retrieving ticket', error: '500' });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectMongoDB();
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ message: 'Missing ticket ID', error: '400' });
        }
        const body = await request.json();
        // actualizar la updatedAt
        const updatedTicket = await TicketModel.findByIdAndUpdate(id, { ...body, updatedAt: new Date() }, { new: true });
        if (!updatedTicket) {
            return NextResponse.json({ message: 'Ticket not found', error: '404' });
        }
        return NextResponse.json({ message: 'Ticket updated successfully', data: updatedTicket });
    } catch (error) {
        console.log("🚀 ~ PUT ~ error:", error)
        return NextResponse.json({ message: 'Error updating ticket', error: '500' });
    }
}

// export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
//     try {
//         await connectMongoDB();
//         const { id } = await params;
//         if (!id) {
//             return NextResponse.json({ message: 'Missing ticket ID', error: '400' });
//         }
//         const deletedTicket = await TicketModel.findByIdAndDelete(id);
//         if (!deletedTicket) {
//             return NextResponse.json({ message: 'Ticket not found', error: '404' });
//         }
//         return NextResponse.json({ message: 'Ticket deleted successfully', data: deletedTicket });
//     } catch (error) {
//         return NextResponse.json({ message: 'Error deleting ticket', error: '500' });
//     }
// }
