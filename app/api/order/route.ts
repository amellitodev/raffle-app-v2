import connectMongoDB from "@/app/lib/mongoConnection";
import OrderModel from "@/app/lib/models/order.model";
import { NextResponse } from 'next/server';

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
		console.log("🚀 ~ POST ~ error:", error)
		return NextResponse.json({ message: "Error creating order", error: "500" });
	}
}

export async function GET() {
	try {
		await connectMongoDB();
		const orders = await OrderModel.find();
		if(!orders || orders.length === 0) {
			return NextResponse.json({ message: "No orders found", error: "404" });
		}
		return NextResponse.json({ message: "Orders retrieved successfully", data: orders });
	} catch (error) {
		return NextResponse.json({ message: "Error retrieving orders", error: "500" });
	}
}

export async function DELETE() {
	// elimina todas las ordenes
	try {
		await connectMongoDB();
		const deletedOrders = await OrderModel.deleteMany();
		return NextResponse.json({ message: "All orders deleted successfully", data: deletedOrders });
	} catch (error) {
		return NextResponse.json({ message: "Error deleting orders", error: "500" });
	}
}