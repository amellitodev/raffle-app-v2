import connectMongoDB from "@/app/lib/mongoConnection";
import RaffleModel from "@/app/lib/models/raffle.model";
import { NextResponse } from "next/server";

// export async function GET() {
// 	try {
// 		await connectMongoDB();
// 		const raffles = await RaffleModel.find();
// 		return NextResponse.json({ message: "Raffles fetched successfully", data: raffles });
// 	} catch {
// 		return NextResponse.json({ message: "Error fetching raffles", error: "500" });
// 	}
// }

export async function POST (_request: Request) {
	try {
		await connectMongoDB();
		const body = await _request.json();
        const { title, description, imageUrl,raffleStart, raffleDate, rafflePrize, ticketPriceDolar,ticketPriceBolivar, maxTickets, paymentMethod } = body;
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
			maxTickets
		});
		await newRaffle.save();
		return NextResponse.json({ message: "Raffle created successfully", data: newRaffle });
	} catch {
		return NextResponse.json({ message: "Error creating raffle", error: "500" });
	}
}