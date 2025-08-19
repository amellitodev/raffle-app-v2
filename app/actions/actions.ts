"use server";

import OrderModel from "../lib/models/order.model";

export async function createOrder(formData: FormData) {
	try {
		// data order
		const raffleId = formData.get("raffleId");
		// data buyer
		const buyerFirstName = (formData.get("buyerFirstName") as string) || "";
		const buyerLastName = (formData.get("buyerLastName") as string) || "";
		const buyerId = (formData.get("buyerId") as string) || "";
		const buyerEmail = (formData.get("buyerEmail") as string) || "";
		const buyerPhone = (formData.get("buyerPhone") as string) || "";

		// data payment
		const amount = parseFloat(formData.get("amount") as string) || 0;
		const currency = (formData.get("currency") as string) || "USD";
		const bank = (formData.get("bank") as string) || "";
		const paymentReference = (formData.get("paymentReference") as string) || "";

		const ticketNumbersString = (formData.get("ticketNumbers") as string) || "";

		// Convierte el string a un array de números
		const ticketNumbers = ticketNumbersString
			.split(",") // Divide por comas
			.map((num) => num.trim()) // Elimina espacios en blanco
			.filter((num) => num !== "") // Elimina valores vacíos
			.map((num) => parseInt(num, 10)); // Convierte a números

		// Ahora ticketNumbers es un array de números: [10, 20, 32]

		const newOrder = new OrderModel({
			raffleId,
			buyerFirstName,
			buyerLastName,
			buyerId,
			buyerEmail,
			buyerPhone,
			amount,
			currency,
			bank,
			paymentReference,
			ticketNumbers,
		});
		await newOrder.save();
		console.log("🚀 ~ createOrder ~ newOrder:", newOrder);
	} catch (error) {
		console.error("Error creating order:", error);
		throw new Error("Error creating order");
		// You might want to handle this error appropriately
	}
}
