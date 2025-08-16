const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		raffleId: { type: mongoose.Schema.Types.ObjectId, ref: "Raffle", required: true },
        // Datos del comprador
		buyerFirstName: { type: String, required: true, trim: true },
		buyerLastName: { type: String, required: true, trim: true },
		buyerEmail: { type: String, trim: true },
		buyerPhone: { type: String, required: true, trim: true },
        // Datos del pago
		amount: { type: Number, required: true }, // Total pagado
		bank: { type: String, required: true, trim: true }, // banco donde se pago
		paymentReference: { type: String, required: true, trim: true }, // ID del procesador de pagos
		ticketCount: { type: Number, required: true }, // Número de tickets comprados
		status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
	},
	{ timestamps: true }
);
OrderSchema.index({ raffleId: 1, paymentReference: 1 }, { unique: true });
const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema);
