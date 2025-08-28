"use server";

import connectMongoDB from "@/app/lib/mongoConnection";
import OrderModel from "../lib/models/order.model";
import RaffleModel from "../lib/models/raffle.model";
import TicketModel from "../lib/models/ticket.model";
import { IOrderPopulated, IRaffle, ITicket } from "../types/types";
import { revalidatePath } from "next/cache";

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
		revalidatePath("/");
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
		// refrescar la pagina
		revalidatePath("/dashboard");
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
		revalidatePath("/dashboard");
		return newTickets;
	} catch (error) {
		console.error("Error creating tickets:", error);
		throw new Error("Error creating tickets");
	}
}

export async function getRaffleInfo() {
	try {
		await connectMongoDB();
		const raffle = await RaffleModel.findOne().sort({ createdAt: -1 }).lean<IRaffle>().exec();
		// recuperar las ordenes del ultimo raffle con count
		const orders = await OrderModel.find({ raffleId: raffle?._id, status: "pending" })
			.countDocuments()
			.lean<IOrderPopulated[]>()
			.exec();
		// recuperar los tickets del raffle
		const tickets = await TicketModel.find({ raffleId: raffle?._id })
			.countDocuments()
			.lean<number>()
			.exec();
		return { raffle, orders, tickets };
	} catch (error) {
		console.error("Error fetching raffle info:", error);
		throw new Error("Error fetching raffle info");
	}
}
export async function getTickets(raffleId: string, page: number = 1, limit: number = 10, sortOrder: "asc" | "desc" = "desc") {
	
	try {
		await connectMongoDB();

		// debemos paginar por la cantidad de tickets que existe
		// ordenar los ticketsNumber de mayor a menor
		// filter by raffleId
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

		// se realiza la serialización de los tickets porque necesitamos convertir los ObjectId a string
		// para poder leer sus datos contenidos de raffleId y orderId
		const serializedTickets = tickets.map(ticket => ({
            ...ticket,
            _id: (ticket._id as string).toString(), // Convertir ObjectId a string
            raffleId: ticket.raffleId ? {
				_id: (ticket.raffleId._id as string).toString(),
				title: ticket.raffleId.title,
			} : null,
            orderId: ticket.orderId ? {
				_id: (ticket.orderId._id as string).toString(),
				status: ticket.orderId.status,
				buyerName: ticket.orderId.buyerName,
				ticketCount: ticket.orderId.ticketCount,
				ticketsAssigned: ticket.orderId.ticketsAssigned.map((id: number) => id.toString()),
			} : null,
        }));

		// Formatear la respuesta
		const response = {
			tickets: serializedTickets,
			docs: {
				totalPages,
				limit,
				prevPage: page > 1 ? page - 1 : null,
				currentPage: page,
				nextPage: page < totalPages ? page + 1 : null,
			},
		};
		return response;
	} catch (error) {
		console.error("Error fetching tickets:", error);
		throw new Error("Error fetching tickets");
	}
}

export async function getTicketsByRaffle(raffleId: string) {
	try {
		await connectMongoDB();
		const tickets = await TicketModel.find({ raffleId }).lean<ITicket>().exec();
		return tickets;
	} catch (error) {
		console.error("Error fetching tickets:", error);
		throw new Error("Error fetching tickets");
	}
}

export async function getTicketByNumber(ticketNumber: number) {
	try {
		await connectMongoDB();
		const ticket = await TicketModel.findOne({ ticketNumber }).lean<ITicket>().exec();
		return ticket;
	} catch (error) {
		console.error("Error fetching ticket by number:", error);
		throw new Error("Error fetching ticket by number");
	}
}
