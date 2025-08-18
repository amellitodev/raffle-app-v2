import connectMongoDB from '@/app/lib/mongoConnection';
import OrderModel from '@/app/lib/models/order.model';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise< { id: string }> }) {
    try {
        await connectMongoDB();
        const { id } = await params;
        const order = await OrderModel.findById(id);
        if (!order) {
            return NextResponse.json({ message: "Order not found", error: "404" });
        }
        return NextResponse.json({ message: "Order retrieved successfully", data: order });
    } catch (error) {
        return NextResponse.json({ message: "Error retrieving order", error: "500" });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // solo actualiza el status de la order
        await connectMongoDB();
        const { id } = await params;
        const { status, assignedTicket, ticketNumbers } = await request.json();
        //~ podríamos actualizar también los tickets, assignedTicket y el status <--
        await OrderModel.findByIdAndUpdate(id, { status, assignedTicket, ticketNumbers });
        return NextResponse.json({ message: "Order updated successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error updating order", error: "500" });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectMongoDB();
        const { id } = await params;
        await OrderModel.findByIdAndDelete(id);
        return NextResponse.json({ message: "Order deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting order", error: "500" });
    }
}