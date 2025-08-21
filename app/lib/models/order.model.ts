import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
	{
		raffleId: { type: mongoose.Schema.Types.ObjectId, ref: "Raffle", required: true },
		// Datos del comprador
		buyerName: { type: String, required: true, trim: true },
		buyerId: { type: String, required: true, trim: true },
		buyerEmail: { type: String, trim: true },
		buyerPhone: { type: String, required: true, trim: true },
		// Datos del pago
		amount: { type: Number, required: true }, // Total pagado
		currency: { type: String, enum: ["USD", "EUR", "VES"], required: true },
		bank: { type: String, required: true, trim: true }, // banco donde se pago
		paymentReference: { type: String, required: true, trim: true }, // ID del procesador de pagos
		paymentProof: { type: String, required: true, trim: true }, // URL del comprobante de pago
		// Datos de los tickets
		ticketCount: { type: Number, required: true }, // Número de tickets comprados
		ticketsAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
		status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
	},
	{ timestamps: true }
);
const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default OrderModel;
