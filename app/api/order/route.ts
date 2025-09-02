import connectMongoDB from "@/app/lib/mongoConnection";
import OrderModel from "@/app/lib/models/order.model";
import { NextResponse } from "next/server";
import { ITicket } from "@/app/types/types";
// import page from "../../(auth)/dashboard/tickets/page";

export async function POST(request: Request) {
	try {
		await connectMongoDB();
		const {
			raffleId,
			buyerFirstName,
			buyerLastName,
			buyerId,
			buyerEmail,
			buyerPhone,
			currency,
			amount,
			bank,
			paymentReference,
			ticketNumbers,
		} = await request.json();
		// validamos que existan los campos
		if (
			!raffleId ||
			!buyerFirstName ||
			!buyerLastName ||
			!buyerId ||
			!buyerPhone ||
			!currency ||
			!amount ||
			!bank ||
			!paymentReference ||
			!ticketNumbers
		) {
			return NextResponse.json({ message: "Missing required fields", error: "400" });
		}
		const newOrder = new OrderModel({
			raffleId,
			buyerFirstName,
			buyerLastName,
			buyerId,
			buyerEmail,
			buyerPhone,
			currency,
			amount,
			bank,
			paymentReference,
			ticketNumbers,
		});
		await newOrder.save();
		return NextResponse.json({ message: "Order created successfully", data: newOrder });
	} catch (error) {
		console.log("🚀 ~ POST ~ error:", error);
		return NextResponse.json({ message: "Error creating order", error: "500" });
	}
}

// all orders con paginacion
export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const sortOrder = searchParams.get("sortOrder") || "desc";
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);
		const raffleId = searchParams.get("raffleId");
		const status = searchParams.get("status");
		console.log("🚀 ~ GET ~ raffleId:", raffleId)

		await connectMongoDB();

		// Buscar órdenes por status "pending" y "completed"
		const orders = await OrderModel.find({ raffleId, status })
			.sort({ createdAt: sortOrder === "asc" ? 1 : -1 })
			.skip((page - 1) * limit)
			.limit(limit)
			.lean()
			.exec();

		// Contar total de órdenes
		const totalOrders = await OrderModel.countDocuments();
		const totalPages = Math.ceil(totalOrders / limit);

		if (orders.length === 0) {
			return NextResponse.json({ message: "No orders found" }, { status: 404 });
		}

		// Serializar órdenes
		const serializedOrders = orders.map((order) => ({
			...order,
			_id: order._id?.toString(),
			raffleInfo: order.raffleId
				? {
						id: order.raffleId._id?.toString(),
						title: order.raffleId.title,
						raffleDate: order.raffleId.raffleDate,
				  }
				: null,
			ticketsAssigned: order.ticketsAssigned?.map((ticket: ITicket) => ticket.ticketNumber) || [],
		}));

		// Respuesta final

		const response = {
			message: "Orders retrieved successfully",
			orders: serializedOrders,
			docs: {
				totalPages,
				limit,
				prevPage: page > 1 ? page - 1 : null,
				currentPage: page,
				nextPage: page < totalPages ? page + 1 : null,
			},
		};

		return NextResponse.json(response);
	} catch (error) {
		console.error("❌ Error retrieving orders:", error);
		return NextResponse.json({ message: "Error retrieving orders" }, { status: 500 });
	}
}
export async function DELETE() {
	// elimina todas las ordenes
	try {
		await connectMongoDB();
		const deletedOrders = await OrderModel.deleteMany();
		return NextResponse.json({
			message: "All orders deleted successfully",
			data: deletedOrders,
		});
	} catch (error) {
		console.log("🚀 ~ DELETE ~ error:", error)
		return NextResponse.json({ message: "Error deleting orders", error: "500" });
	}
}
