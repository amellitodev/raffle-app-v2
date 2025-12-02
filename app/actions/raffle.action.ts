"use server";
import connectMongoDB from "@/app/lib/mongoConnection";
import RaffleModel from "../lib/models/raffle.model";
import OrderModel from "../lib/models/order.model";
import TicketModel from "../lib/models/ticket.model";
import { IOrderPopulated, IRaffle } from "../types/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// TODO: pasar los actions que estan en data.ts

export async function createRaffle(formData: FormData) {
	try {
		await connectMongoDB();
		// Extrae los datos del formulario
		const imageUrl = formData.get("imageUrl") as string;
		const titleForm = formData.get("title") as string;
		// quitar los espacios y reemplazarlos por -
		const title = titleForm.trim().replace(/\s+/g, "-").toLowerCase();
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

export async function getRaffleInfo() {
	try {
		// 🔥 MODIFICACIÓN CLAVE: Verificar si estamos en build time
		if (process.env.NEXT_PHASE === 'phase-production-build') {
			console.log('Build time - returning empty data for getRaffleInfo');
			return {
				raffle: null,
				orders: 0,
				tickets: 0
			};
		}
		
		// 🔥 También verificar si MONGODB_URI está disponible
		if (!process.env.MONGODB_URI) {
			console.log('MONGODB_URI not available - returning empty data');
			return {
				raffle: null,
				orders: 0,
				tickets: 0
			};
		}

		await connectMongoDB();
		const raffle = await RaffleModel.findOne().sort({ createdAt: -1 }).lean<IRaffle>().exec();
		
		// Si no hay raffle, retornar datos vacíos
		if (!raffle) {
			return {
				raffle: null,
				orders: 0,
				tickets: 0
			};
		}
		
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
		// 🔥 MODIFICACIÓN: En lugar de throw, retornar datos vacíos
		return {
			raffle: null,
			orders: 0,
			tickets: 0
		};
	}
}

export async function getRaffleData() {
	try {
		// 🔥 MODIFICACIÓN: Verificar build time
		if (process.env.NEXT_PHASE === 'phase-production-build' || !process.env.MONGODB_URI) {
			console.log('Build time - returning empty raffle data');
			return { message: "Build time - empty data", data: [] };
		}

		// En componentes de servidor, llamamos directamente a la base de datos
		// en lugar de hacer un fetch HTTP a nuestra propia API
		await connectMongoDB();
		const raffles = await RaffleModel.find();

		// Serializar para JSON
		const serializedRaffles = JSON.parse(JSON.stringify(raffles));

		return { message: "Raffles fetched successfully", data: serializedRaffles };
	} catch (error) {
		console.error("Error fetching raffle data:", error);
		// 🔥 MODIFICACIÓN: Retornar datos vacíos en lugar de throw
		return { message: "Error fetching data", data: [] };
	}
}

export async function getRaffleDataByTitle(
	title: string
): Promise<{ message: string; data: IRaffle | null }> {
	try {
		// 🔥 MODIFICACIÓN: Verificar build time
		if (process.env.NEXT_PHASE === 'phase-production-build' || !process.env.MONGODB_URI) {
			console.log('Build time - returning empty data for raffle by title');
			return { message: "Build time - empty data", data: null };
		}

		await connectMongoDB();
		const raffle = await RaffleModel.findOne({ title });
		if (!raffle) {
			return { message: "Raffle not found", data: null };
		}
		console.log("Raffle fetched successfully:  ✅");
		const serializedRaffle = JSON.parse(JSON.stringify(raffle));
		return { message: "Raffle fetched successfully", data: serializedRaffle };
	} catch (error) {
		console.error("Error fetching raffle data by ID:", error);
		// 🔥 MODIFICACIÓN: Retornar datos vacíos
		return { message: "Error fetching data", data: null };
	}
}

export async function getRaffleById(raffleId: string) {
	try {
		// 🔥 MODIFICACIÓN: Verificar build time
		if (process.env.NEXT_PHASE === 'phase-production-build' || !process.env.MONGODB_URI) {
			console.log('Build time - returning empty data for raffle by ID');
			return { message: "Build time - empty data", data: null };
		}

		await connectMongoDB();
		const raffle = await RaffleModel.findById(raffleId).lean<IRaffle>().exec();
		if (!raffle) {
			return { message: "Raffle not found", data: null };
		}
		return { message: "Raffle fetched successfully", data: JSON.parse(JSON.stringify(raffle)) };
	} catch (error) {
		console.error("Error fetching raffle by ID:", error);
		// 🔥 MODIFICACIÓN: Retornar datos vacíos
		return { message: "Error fetching data", data: null };
	}
}

export async function updateRaffle(formData: FormData) {
	try {
		console.log("🚀 ~ updateRaffle ~ formData:", formData);
		// await connectMongoDB();
		// const updatedRaffle = await RaffleModel.findByIdAndUpdate(raffleId, formData, { new: true }).lean<IRaffle>().exec();
		// if (!updatedRaffle) {
		// 	return { message: "Raffle not found", data: null };
		// }
		// return { message: "Raffle updated successfully", data: JSON.parse(JSON.stringify(updatedRaffle)) };
	} catch (error) {
		console.error("Error updating raffle:", error);
		throw error;
	}
}

export async function deleteRaffle(formData: FormData) {
	try {
		const raffleId = formData.get("raffleId");
		console.log("🚀 ~ deleteRaffle ~ formData:", raffleId);
		await connectMongoDB();
		const deletedRaffle = await RaffleModel.findByIdAndDelete(raffleId).lean<IRaffle>().exec();
		if (!deletedRaffle) {
			throw new Error("Raffle not found");
		}
		revalidatePath("/dashboard/sorteo");
	} catch (error) {
		console.error("Error deleting raffle:", error);
		throw error;
	}
	redirect("/dashboard/sorteo");
}