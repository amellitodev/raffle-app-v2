import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
	{
		raffleId: { type: mongoose.Schema.Types.ObjectId, ref: "Raffle", required: true },
		// Datos del comprador
		buyerFirstName: { type: String, required: true, trim: true },
		buyerLastName: { type: String, required: true, trim: true },
		buyerId: { type: String, required: true, trim: true },
		buyerEmail: { type: String, trim: true },
		buyerPhone: { type: String, required: true, trim: true },
		// Datos del pago
		amount: { type: Number, required: true }, // Total pagado
		currency: { type: String, enum: ["USD", "EUR", "VES"], required: true },
		bank: { type: String, required: true, trim: true }, // banco donde se pago
		paymentReference: { type: String, required: true, trim: true }, // ID del procesador de pagos
		// Datos de los tickets
		ticketNumbers: [{ type: Number, required: true }], // Números de tickets comprados
		ticketsAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
		// ticketCount: { type: Number, required: true }, // Número de tickets comprados
		status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
	},
	{ timestamps: true }
);
const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default OrderModel;
