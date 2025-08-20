"use server";

import OrderModel from "../lib/models/order.model";

export async function createOrder(formData: FormData) {
	console.log("🚀 ~ createOrder ~ formData:", formData)
	try {
		// data order
		const raffleId = formData.get("raffleId");
		// data buyer
		const buyerName = (formData.get("buyerName") as string) || "";
		const buyerId = (formData.get("buyerId") as string) || "";
		const buyerEmail = (formData.get("buyerEmail") as string) || "";
		const buyerPhone = (formData.get("buyerPhone") as string) || "";

		// data payment
		const amount = parseFloat(formData.get("amount") as string) || 0;
		console.log("🚀 ~ createOrder ~ amount:", amount)
		const paymentReference = (formData.get("paymentReference") as string) || "";
		const bank = (formData.get("bank") as string) || "";
		const currency = (formData.get("currency") as string) || "USD";
		const ticketCount = parseInt(formData.get("ticketCount") as string, 10) || 0;
		console.log("🚀 ~ createOrder ~ ticketCount:", ticketCount)



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
