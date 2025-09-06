"use server";
import connectMongoDB from "@/app/lib/mongoConnection";
import OrderModel from "../lib/models/order.model";
import TicketModel from "../lib/models/ticket.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrder(formData: FormData) {
	try {
		await connectMongoDB();
		// data file del paymentProof
		const paymentProof = formData.get("paymentProof") as string | null;

		// data order
		const raffleId = formData.get("raffleId");

		// data buyer
		const buyerName = (formData.get("buyerName") as string) || "";
		const buyerId = (formData.get("buyerId") as string) || "";
		const buyerEmail = (formData.get("buyerEmail") as string) || "";
		const buyerPhone = (formData.get("buyerPhone") as string) || "";

		// data payment
		const amount = parseFloat(formData.get("amount") as string) || 0;
		const paymentReference = (formData.get("paymentReference") as string) || "";
		const bank = (formData.get("bank") as string) || "";
		const currency = (formData.get("currency") as string) || "USD";
		const ticketCount = parseInt(formData.get("ticketCount") as string, 10) || 0;

		if(ticketCount < 2) {
			throw new Error("Debes comprar al menos 2 tickets.");
		}
		if(ticketCount > 100) {
			throw new Error("No puedes comprar más de 100 tickets.");
		}
		// maxTickets para verificar que no exista un cantidad maxima de tickets existentes en la db
		const maxTickets = parseInt(formData.get("maxTickets") as string, 10) || 0;
		const existingTickets = await TicketModel.countDocuments({ raffleId });
		const remainingTickets = maxTickets - existingTickets;

		if (existingTickets + ticketCount > maxTickets) {
			throw new Error(
				`No hay suficientes tickets disponibles. Quedan ${remainingTickets} tickets.`
			);
		}
		if (!paymentProof) {
			throw new Error("Falta la imagen del comprobante de pago.");
		}
		if (
			!raffleId ||
			!buyerName ||
			!buyerId ||
			!buyerPhone ||
			!amount ||
			!bank ||
			!paymentReference
		) {
			throw new Error("Faltan datos obligatorios del formulario.");
		}

		const newOrder = new OrderModel({
			raffleId,
			buyerName,
			buyerId,
			buyerEmail,
			buyerPhone,
			amount,
			currency,
			bank,
			paymentReference,
			paymentProof,
			ticketCount,
		});
		await newOrder.save();
		revalidatePath("/");
	} catch (error) {
		console.error("Error creating order:", error);
		throw new Error(error instanceof Error ? error.message : "Error creating order");
	}
}

export async function getOrders() {
	try {
		await connectMongoDB();
		const orders = (await OrderModel.find());
		return orders;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		throw new Error("Error connecting to MongoDB");
	}
}

export async function getOrderById(orderId: string) {
	console.log("🚀 ~ getOrderById ~ orderId:", orderId);
	try {
		await connectMongoDB();
		if (!orderId) {
			throw new Error("Invalid order ID");
		}
		const order = await OrderModel.findById(orderId)
			.populate("raffleId")
			.populate({
				path: "ticketsAssigned", // si ticketsAssigned es un array de ObjectId
				select: "ticketNumber", // solo traer ticketNumber de cada ticket
			})
			.lean()
			.exec();
		return order;
	} catch (error) {
		console.error("Error fetching order by ID:", error);
		throw new Error("Error fetching order by ID");
	}
}

export async function deleteOrder(formData: FormData) {
	const orderId = formData.get("orderId") as string;
	const raffleId = formData.get("raffleId") as string;
	try {
		await connectMongoDB();

		const order = await OrderModel.findById(orderId);
		if (!order) {
			throw new Error("Order not found");
		}
		if (order.status === "completed") {
			throw new Error("Cannot delete completed order");
		}

		await OrderModel.findByIdAndDelete(orderId);
		// revalidar la página del dashboard

		revalidatePath("/dashboard");
	} catch (error) {
		console.error("Error deleting order:", error);
		throw new Error("Error deleting order");
	}
	redirect(`/dashboard/ordenes/${raffleId}`);
}


export async function getOrderByBuyerId(raffleId: string, buyerId: string) {
	// pueden existir mas de una order con el mismo buyerId
	// buscar todos las ordenes con el mismo buyerId
	
	try {
		await connectMongoDB();
		if (!buyerId) {
			throw new Error("Invalid buyer ID");
		}
		const order = await OrderModel.findOne({ buyerId, raffleId })
			.populate("raffleId")
			.populate({
				path: "ticketsAssigned", // si ticketsAssigned es un array de ObjectId
				select: "ticketNumber", // solo traer ticketNumber de cada ticket
			})
			.lean()
			.exec();

			const serializedOrder = JSON.parse(JSON.stringify(order));
		return serializedOrder;
	} catch (error) {
		console.error("Error fetching order by buyer ID:", error);
		throw new Error("Error fetching order by buyer ID");
	}
}