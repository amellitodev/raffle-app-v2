import mongoose, { Schema } from "mongoose";

const TicketSchema = new Schema(
	{
        // Id del sorteo al que pertenece
		raffleId: { type: mongoose.Schema.Types.ObjectId, ref: "Raffle", required: true },
        // Id de la orden a la que pertenece (comprador)
		orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
		ticketNumber: { type: Number, required: true, index: true }, // Único por sorteo indexado para buscar mas rápido
	},
	{ timestamps: true }
);
// ✅ Índices compuestos para consultas específicas
TicketSchema.index({ raffleId: 1, ticketNumber: 1 }); // Para ordenar tickets por número dentro de una rifa
TicketSchema.index({ raffleId: 1, orderId: 1 }); // Para buscar tickets de una orden específica en una rifa
TicketSchema.index({ ticketNumber: 1, raffleId: 1 }, { unique: true }); // Evitar tickets duplicados en la misma rifa
const TicketModel = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
export default TicketModel;
