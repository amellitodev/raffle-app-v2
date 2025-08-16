import mongoose, { Schema } from "mongoose";

const RaffleSchema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		imageUrl: { type: String, required: true, trim: true },
		raffleDate: { type: Date, required: true },
		ticketPrice: { type: Number, required: true },
        maxTickets: { type: Number, required: true },
        status: { type: String, enum: ["active", "completed", "cancelled"], default: "active" },
	},
	{ timestamps: true }
);

const RaffleModel = mongoose.models.Raffle || mongoose.model("Raffle", RaffleSchema);
export default RaffleModel;