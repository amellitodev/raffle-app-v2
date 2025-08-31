"use server";
import connectMongoDB from "@/app/lib/mongoConnection";
import RaffleModel from "../lib/models/raffle.model";
import { revalidatePath } from "next/cache";
import OrderModel from "../lib/models/order.model";
import TicketModel from "../lib/models/ticket.model";
import { IOrderPopulated, IRaffle } from "../types/types";
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

export async function getRaffleData() {
	try {
		// En componentes de servidor, llamamos directamente a la base de datos
		// en lugar de hacer un fetch HTTP a nuestra propia API
		await connectMongoDB();
		const raffles = await RaffleModel.find();

		// Serializar para JSON
		const serializedRaffles = JSON.parse(JSON.stringify(raffles));

		return { message: "Raffles fetched successfully", data: serializedRaffles };
	} catch (error) {
		console.error("Error fetching raffle data:", error);
		throw error;
	}
}

export async function getRaffleDataByTitle(
	title: string
): Promise<{ message: string; data: IRaffle | null }> {
	try {
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
		throw error;
	}
}

export async function getRaffleById(raffleId: string) {
	try {
		await connectMongoDB();
		const raffle = await RaffleModel.findById(raffleId).lean<IRaffle>().exec();
		if (!raffle) {
			return { message: "Raffle not found", data: null };
		}
		return { message: "Raffle fetched successfully", data: JSON.parse(JSON.stringify(raffle)) };
	} catch (error) {
		console.error("Error fetching raffle by ID:", error);
		throw error;
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
