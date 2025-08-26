"use server";

import connectMongoDB from "@/app/lib/mongoConnection";
import { v2 as cloudinary } from "cloudinary";
import OrderModel from "../lib/models/order.model";
import RaffleModel from "../lib/models/raffle.model";
import TicketModel from "../lib/models/ticket.model";
import { IOrderPopulated } from "../types/types";
// import { updateImageCloudinary } from "../utils/updateImageCloudinary";


export async function createOrder(formData: FormData) {
	try {
		await connectMongoDB();
		// data file del paymentProof
		const paymentProof = formData.get("paymentProof") as string | null;
		// const public_id = await updateImageCloudinary(file);
		

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
		console.log("🚀 ~ createOrder ~ newOrder:", newOrder);
	} catch (error) {
		console.error("Error creating order:", error);
		throw new Error("Error creating order");
		// You might want to handle this error appropriately
	}
}


export async function getOrders() {
	try {
		await connectMongoDB();
		return OrderModel.find();
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		throw new Error("Error connecting to MongoDB");
	}
}

export async function getOrderById(orderId: string) {
	try {
		await connectMongoDB();
		return OrderModel.findById(orderId)
			.populate("raffleId")
			.populate({
				path: "ticketsAssigned", // si ticketsAssigned es un array de ObjectId
				select: "ticketNumber", // solo traer ticketNumber de cada ticket
			})
			.lean<IOrderPopulated>()
			.exec();
	} catch (error) {
		console.error("Error fetching order by ID:", error);
		throw new Error("Error fetching order by ID");
	}
}

export async function createRaffle(formData: FormData) {
	try {
		await connectMongoDB();
		// Extrae los datos del formulario
		const imageUrl = formData.get("imageUrl") as string;
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const raffleStart = formData.get("raffleStart") as string;
		const raffleDate = formData.get("raffleDate") as string;
		const rafflePrize = formData.get("rafflePrize") as string;
		const ticketPriceDolar = formData.get("ticketPriceDolar") as string;
		const ticketPriceBolivar = formData.get("ticketPriceBolivar") as string;
		const paymentMethod = JSON.parse(formData.get("paymentMethod") as string);
		const maxTickets = formData.get("maxTickets") as string;

		const newRaffle = new RaffleModel({
			title,
			description,
			imageUrl,
			raffleStart,
			raffleDate,
			rafflePrize,
			ticketPriceDolar,
			ticketPriceBolivar,
			paymentMethod,
			maxTickets,
		});
		await newRaffle.save();
	} catch (error) {
		console.error("Error creating raffle:", error);
		throw new Error("Error creating raffle");
	}
}

export async function createTickets(formData: FormData) {
	try {
		// Convierte IDs a ObjectId (si en tu schema son ObjectId)
		const orderId = formData.get("orderId") as string;
		const raffleId = formData.get("raffleId") as string;

		const ticketCount = parseInt(formData.get("ticketCount") as string, 10) || 0;
		if (ticketCount <= 0) {
			throw new Error("ticketCount debe ser mayor que 0");
		}

		// Traemos todos los números de ticket ya ocupados en esta rifa
		const existingTickets = await TicketModel.find({ raffleId }).select("ticketNumber");
		const existingNumbers = new Set(existingTickets.map((t) => t.ticketNumber));

		const newTickets: {
			orderId: string;
			raffleId: string;
			ticketNumber: number;
		}[] = [];
		const generatedNumbers = new Set<number>();

		while (newTickets.length < ticketCount) {
			const ticketNumber = Math.floor(Math.random() * 10000); // rango 0-9999

			// Validamos que no esté repetido en DB ni en los que estamos generando
			if (existingNumbers.has(ticketNumber) || generatedNumbers.has(ticketNumber)) {
				continue;
			}

			newTickets.push({ orderId, raffleId, ticketNumber });
			generatedNumbers.add(ticketNumber);
		}

		// Inserción masiva
		const ticketsCreados = await TicketModel.insertMany(newTickets);
		// actualizar el order con los nuevos tickets

		const updatedOrder = await OrderModel.findByIdAndUpdate(
			orderId,
			{
				$push: { ticketsAssigned: { $each: ticketsCreados.map((ticket) => ticket._id) } },
				$set: { status: "completed" }, // <--- actualiza el status
			},
			{ new: true }
		);

		return newTickets;
	} catch (error) {
		console.error("Error creating tickets:", error);
		throw new Error("Error creating tickets");
	}
}
