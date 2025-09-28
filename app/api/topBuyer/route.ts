import TicketModel from "@/app/lib/models/ticket.model";
import dbConnect from "@/app/lib/mongoConnection";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request) {
	await dbConnect();

	try {
		const { searchParams } = new URL(request.url);
		const raffleId = searchParams.get("raffleId");

		if (!raffleId) {
			return NextResponse.json({ message: "raffleId is required" }, { status: 400 });
		}

		const objectId = new mongoose.Types.ObjectId(raffleId);

		const top3BuyersByRaffle = await TicketModel.aggregate([
			{
				$match: { raffleId: objectId }, // ✅ filtramos por la rifa
			},
			{
				$lookup: {
					from: "orders",
					localField: "orderId",
					foreignField: "_id",
					as: "order",
				},
			},
			{ $unwind: "$order" },
			{
				$match: { "order.status": "completed" }, // ✅ solo órdenes completadas
			},
			{
				$group: {
					_id: {
						raffleId: "$raffleId",
						buyerId: "$order.buyerId",
					},
					buyerName: { $first: "$order.buyerName" },
					buyerEmail: { $first: "$order.buyerEmail" },
					totalTickets: { $sum: 1 },
				},
			},
			{
				$group: {
					_id: "$_id.raffleId",
					topBuyers: {
						$topN: {
							sortBy: { totalTickets: -1 },
							output: {
								buyerId: "$_id.buyerId",
								buyerName: "$buyerName",
								buyerEmail: "$buyerEmail",
								totalTickets: "$totalTickets",
							},
							n: 3,
						},
					},
				},
			},
		]);

		return NextResponse.json(top3BuyersByRaffle);
	} catch (error) {
		console.error("Error fetching top buyers:", error);
		return NextResponse.json({ message: "Failed to fetch top buyers" }, { status: 500 });
	}
}
