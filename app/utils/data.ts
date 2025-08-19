import connectMongoDB from "@/app/lib/mongoConnection";
import RaffleModel from "@/app/lib/models/raffle.model";
import { IRaffle } from "../types/types";

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

export async function getRaffleDataByTitle(title: string): Promise<{ message: string; data: IRaffle | null }> {
	try {
		await connectMongoDB();
		const raffle = await RaffleModel.findOne({ title });
		if (!raffle) {
			return { message: "Raffle not found", data: null };
		}
		const serializedRaffle = JSON.parse(JSON.stringify(raffle));
		return { message: "Raffle fetched successfully", data: serializedRaffle };
	} catch (error) {
		console.error("Error fetching raffle data by ID:", error);
		throw error;
	}
}
