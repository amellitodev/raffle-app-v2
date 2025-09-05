"use server";

import connectMongoDB from "@/app/lib/mongoConnection";
import OrderModel from "../lib/models/order.model";
import TicketModel from "../lib/models/ticket.model";
import { TicketData } from "../types/types";
import { revalidatePath } from "next/cache";

export async function createTickets(formData: FormData) {
	try {
		await connectMongoDB();
		// Convierte IDs a ObjectId (si en tu schema son ObjectId)
		const orderId = formData.get("orderId") as string;
		const raffleId = formData.get("raffleId") as string;
		const email = formData.get("buyerEmail") as string;
		// console.log("🚀 ~ createTickets ~ email:", email);

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
			const ticketNumber = Math.floor(Math.random() * 9999) + 1; // rango 1-9999

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

export async function getTickets(
	raffleId: string,
	page: number = 1,
	limit: number = 20,
	sortOrder: "asc" | "desc" = "desc"
) {
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
		const serializedTickets = tickets.map((ticket) => ({
			...ticket,
			raffleTitle: ticket.raffleId?.title || null,
			_id: (ticket._id as string).toString(), // Convertir ObjectId a string
			raffleId: ticket.raffleId
				? {
						_id: (ticket.raffleId._id as string).toString(),
						title: ticket.raffleId.title,
				  }
				: null,
			orderId: ticket.orderId
				? {
						_id: (ticket.orderId._id as string).toString(),
						status: ticket.orderId.status,
						buyerName: ticket.orderId.buyerName,
						ticketCount: ticket.orderId.ticketCount,
						ticketsAssigned: ticket.orderId.ticketsAssigned.map((id: number) =>
							id.toString()
						),
				  }
				: null,
		}));

		// Formatear la respuesta
		const response = {
			tickets: serializedTickets,
			docs: {
				totalPages,
				limit,
				prevPage: page > 1 ? page - 1 : 0,
				currentPage: page,
				nextPage: page < totalPages ? page + 1 : 0,
			},
		};
		return response;
	} catch (error) {
		console.error("Error fetching tickets:", error);
		throw new Error("Error fetching tickets");
	}
}

export async function getTicketByNumber(raffleId: string, ticketNumber: number) {
	try {
		await connectMongoDB();
		const ticket = await TicketModel.findOne({ raffleId, ticketNumber })
			.select({
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
		console.log("🚀 ~ getTicketByNumber ~ serializedTicket:", serializedTicket);
		return serializedTicket;
	} catch (error) {
		console.error("Error fetching ticket by number:", error);
		throw new Error("Error fetching ticket by number");
	}
}

export async function getDataInfoPrueba(formData: FormData) {
	console.log("🚀 ~ getDataInfoPrueba ~ formData:", formData);
}

export async function getTicketInfoByRaffleId(raffleId: string) {
	try {
		await connectMongoDB();

		const tickets = await TicketModel.find({ raffleId }).countDocuments().lean<number>().exec();
		return { tickets };
	} catch (error) {
		console.error("Error fetching raffle info:", error);
		throw new Error("Error fetching raffle info");
	}
}
