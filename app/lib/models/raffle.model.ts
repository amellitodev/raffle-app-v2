import mongoose, { Schema } from "mongoose";

const RaffleSchema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		imageUrl: { type: String, required: true, trim: true },
		raffleStart: { type: Date, required: true },
		raffleDate: { type: Date, required: true },
		rafflePrize: { type: String, required: true, trim: true },
		ticketPriceDolar: { type: Number, required: true },
		ticketPriceBolivar: { type: Number, required: true },
		paymentMethod: [
			{
				type: {
					type: String,
					enum: ["banco", "pago_movil", "crypto", "zelle"],
					required: true,
				},
				entityName: {
					type: String,
					required: true,
					trim: true,
				},
				accountNumber: {
					type: String,
					required: function () {
						return this.type === "banco";
					},
					trim: true,
				},
				phoneNumber: {
					type: String,
					required: function () {
						return this.type === "pago_movil";
					},
					trim: true,
				},
				email: {
					type: String,
					required: function () {
						return this.type === "zelle" || this.type === "crypto";
					},
					trim: true,
				},
				sellerId: {
					type: String,
					required: function () {
						return this.type === "banco" || this.type === "pago_movil";
					},
					trim: true,
				},
			},
		],
		maxTickets: { type: Number, required: true },
		status: { type: String, enum: ["active", "completed", "cancelled"], default: "active" },
	},
	{ timestamps: true }
);

const RaffleModel = mongoose.models.Raffle || mongoose.model("Raffle", RaffleSchema);
export default RaffleModel;
