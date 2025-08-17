import mongoose, { Schema } from "mongoose";

const TicketSchema = new Schema(
	{
        // Id del sorteo al que pertenece
		raffleId: { type: mongoose.Schema.Types.ObjectId, ref: "Raffle", required: true },
        // Id de la orden a la que pertenece (comprador)
		orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
		ticketNumber: { type: Number, required: true }, // Único por sorteo
		buyerId: { type: String, required: true }, // Información del comprador
	},
	{ timestamps: true }
);
TicketSchema.index({ raffleId: 1, ticketNumber: 1 }, { unique: true });
const TicketModel = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
export default TicketModel;
