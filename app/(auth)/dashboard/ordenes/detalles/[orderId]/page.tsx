// import { getOrderById } from "@/app/actions/order.action";
// import { createTickets } from "@/app/actions/ticket.actions";
// import SeeReceiptButton from "../../../components/SeeReceiptButton";
// import { isLessThousand } from "@/app/utils/utils";
// import { ITicket } from "@/app/types/types";
// import DeleteButton from "../../../components/DeleteButton";
import OrderDetails from "../../../components/OrderDetails";

interface Props {
	params: Promise<{
		orderId: string;
	}>;
}

export default async function page({ params }: Props) {
	// params.orderId tendrá el id de la orden

	const { orderId } = await params;
	// if (!orderId) {
	// 	throw new Error("Invalid order ID");
	// }
	// const order = getOrderById(orderId);
	// console.log("🚀 ~ page ~ order:", order);
	return (
		<>
			<h1 className="mt-14">La orden es {orderId}</h1>
			<OrderDetails raffleId={orderId} />
		</>
	);
	// return (
	// 	<>
	// 		<div className="mt-14 flex flex-col  mb-2 justify-between items-center mx-2">
	// 			<h1 className=" text-2xl font-bold px-2">Order Details</h1>
	// 			{order?.status === "pending" && (
	// 				<div className="w-full flex gap-2 justify-between">
	// 					<p className="text-yellow-500">El pago está pendiente de aprobación.</p>
	// 					<DeleteButton orderId={orderId} raffleId={order?.raffleId.toString()} />
	// 					<form
	// 						action={async (formData: FormData) => {
	// 							"use server";
	// 							await createTickets(formData);
	// 						}}
	// 					>
	// 						<button className="btn btn-sm btn-success rounded-md">
	// 							Aprobar pago
	// 						</button>
	// 						<input
	// 							type="text"
	// 							name="ticketCount"
	// 							defaultValue={order?.ticketCount}
	// 							hidden
	// 							readOnly
	// 						/>
	// 						<input
	// 							type="text"
	// 							name="orderId"
	// 							defaultValue={orderId}
	// 							hidden
	// 							readOnly
	// 						/>
	// 						<input
	// 							type="text"
	// 							name="raffleId"
	// 							defaultValue={
	// 								order?.raffleId &&
	// 								typeof order.raffleId === "object" &&
	// 								"_id" in order.raffleId
	// 									? order.raffleId._id.toString()
	// 									: ""
	// 							}
	// 							hidden
	// 							readOnly
	// 						/>
	// 					</form>
	// 				</div>
	// 			)}
	// 		</div>
	// 		<div className="px-2 flex flex-col md:flex-row w-full gap-4 max-w-5xl mx-auto">
	// 			<div className="flex flex-col gap-2 w-full ">
	// 				<div className="flex flex-col gap-2 p-4 bg-base-100 rounded-box shadow-md">
	// 					<span className="text-xs font-bold">Método de pago:</span>
	// 					<p>Banco: {order?.bank}</p>
	// 					<p>Referencia de Pago: {order?.paymentReference}</p>
	// 					<p>Cantidad de Tickets: {order?.ticketCount}</p>
	// 					<p>
	// 						Total: {order?.amount} {order?.currency}
	// 					</p>
	// 					<p>Estado: {order?.status} </p>
	// 					<SeeReceiptButton paymentProofUrl={order?.paymentProof || ""} />
	// 				</div>

	// 				<div className="flex flex-col gap-2 p-4 bg-base-100 rounded-box shadow-md">
	// 					<span className="text-xs font-bold">Datos del cliente:</span>
	// 					<p>Cliente: {order?.buyerName}</p>
	// 					<p>Correo del Cliente: {order?.buyerEmail}</p>
	// 					<p>Teléfono del Cliente: {order?.buyerPhone}</p>
	// 				</div>

	// 				<section className="flex flex-col gap-2 p-4 bg-base-100 rounded-box shadow-md">
	// 					<span className="text-xs font-bold">información de Tickets</span>
	// 					<span>Tickets asignados: </span>

	// 					<div className="flex flex-wrap gap-2">
	// 						{order?.ticketsAssigned.length === 0
	// 							? "'No tiene tickets asignados'"
	// 							: order?.ticketsAssigned.map((ticket, index) => {
	// 									return (
	// 										<span
	// 											key={index}
	// 											className="badge badge-pr badge-dash cursor-pointer"
	// 										>
	// 											{isLessThousand(
	// 												(ticket as ITicket)?.ticketNumber
	// 											) || "0"}
	// 										</span>
	// 									);
	// 							  })}
	// 					</div>

	// 					{/* Mostrar detalles de la rifa */}
	// 					{order?.raffleId && (
	// 						<div className="mt-4 flex flex-col gap-2 ">
	// 							<p className="text-pretty text-xs">
	// 								Orden Pertenece al sorteo:{" "}
	// 								{typeof order.raffleId === "object" && "title" in order.raffleId
	// 									? order.raffleId.title
	// 									: "N/A"}
	// 							</p>
	// 							<img
	// 								src={
	// 									typeof order.raffleId === "object" &&
	// 									"imageUrl" in order.raffleId
	// 										? order.raffleId.imageUrl
	// 										: ""
	// 								}
	// 								alt="Raffle Image"
	// 								className="max-h-24 object-cover rounded-md"
	// 							/>
	// 						</div>
	// 					)}
	// 				</section>
	// 			</div>
	// 		</div>
	// 	</>
	// );
}
