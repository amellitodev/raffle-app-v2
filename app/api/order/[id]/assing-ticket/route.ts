import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "@/app/lib/mongoConnection";
import TicketModel from "@/app/lib/models/ticket.model";
import OrderModel from "@/app/lib/models/order.model";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	let session;
	try {
		await connectMongoDB();
		const { id } = await params;

		// Iniciar sesión de transacción
		session = await mongoose.startSession();
		session.startTransaction();

		// Verificar si la orden existe (con session)
		const order = await OrderModel.findById(id).session(session);
		if (!order) {
			await session.abortTransaction();
			session.endSession();
			return NextResponse.json({ message: "Order not found" }, { status: 404 });
		}

		// Verificar que los tickets no estén asignados a otras órdenes (para el mismo raffleId)
		const ticketNumbers = order.ticketNumbers;
		const existingTickets = await TicketModel.find({
			number: { $in: ticketNumbers },
			raffleId: order.raffleId, // Asumiendo que tienes raffleId en tu modelo de orden
		}).session(session);

		if (existingTickets.length > 0) {
			// Algunos tickets ya están asignados a otras órdenes
			const takenNumbers = existingTickets.map((ticket) => ticket.number);
			await session.abortTransaction();
			session.endSession();
			return NextResponse.json(
				{
					message: "Some tickets are already assigned to other orders",
					takenNumbers,
				},
				{ status: 409 }
			);
		}
		// Crear todos los tickets en una sola operación
		const ticketsToCreate = ticketNumbers.map((number: number) => ({
			ticketNumber: number,
			orderId: order._id,
			raffleId: order.raffleId,
			buyerId: order.buyerId, // Si tienes información del comprador en la orden
		}));

		const createdTickets = await TicketModel.insertMany(ticketsToCreate, { session });

		// Asignar tickets a la orden
		order.ticketsAssigned = createdTickets.map((ticket) => ticket._id);
		order.status = "paid"; // Si tienes un campo de estado en tu orden
		await order.save({ session });

		// Confirmar transacción
		await session.commitTransaction();
		session.endSession();

		return NextResponse.json(
			{
				message: "Tickets assigned successfully",
				data: {
					orderId: order._id,
					ticketsAssigned: ticketNumbers,
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		// Revertir transacción en caso de error
		if (session) {
			await session.abortTransaction();
			session.endSession();
		}
		console.error("Error assigning tickets:", error);
		return NextResponse.json(
			{
				message: "Error assigning tickets",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
