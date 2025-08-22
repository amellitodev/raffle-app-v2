"use server";

import { v2 as cloudinary } from "cloudinary";
import OrderModel from "../lib/models/order.model";
import RaffleModel from "../lib/models/raffle.model";
import connectMongoDB from '@/app/lib/mongoConnection';


const config = cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadsFolder = process.env.CLOUDINARY_UPLOADS_FOLDER;

export async function createOrder(formData: FormData) {
	try {
		await connectMongoDB();
		// data file del paymentProof
		const file = formData.get("paymentProof") as File | null;
		if (!file) {
			throw new Error("No se encontró el archivo de comprobante de pago");
		}

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						resource_type: "image",
						folder: uploadsFolder,
						quality: "auto:good",
						type: "authenticated",
					},
					(error, result) => {
						if (error || !result) {
							reject(error);
						} else {
							resolve(result);
						}
					}
				)
				.end(buffer);
		});
		const { public_id } = uploadResult as { public_id: string };

		console.log("✅ Archivo subido a Cloudinary:", public_id);
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
			paymentProof: public_id,
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

export async function getSignedUrl(publicId: string) {
	return cloudinary.url(publicId, {
		type: "authenticated",
		sign_url: true,
		expires_at: Math.floor(Date.now() / 1000) + 600, // 10 minutos
		secure: true,
	});
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

export async function createRaffle(formData: FormData) {
	try {
		await connectMongoDB();

		const file = formData.get("imageUrl") as File | null;
		if (!file) {
			throw new Error("No se encontró el archivo de imagen");
		}

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						resource_type: "image",
						folder: "raffles-images",
						quality: "auto:good",
					},
					(error, result) => {
						if (error || !result) {
							reject(error);
						} else {
							resolve(result);
						}
					}
				)
				.end(buffer);
		});
		const { secure_url } = uploadResult as { secure_url: string };

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
			imageUrl: secure_url,
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


