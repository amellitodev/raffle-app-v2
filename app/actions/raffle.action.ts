"use server"
import connectMongoDB from '@/app/lib/mongoConnection';
import RaffleModel from '../lib/models/raffle.model';
import { revalidatePath } from 'next/cache';



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