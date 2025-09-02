"use client";
import { IOrderPopulated, ITicket } from "@/app/types/types";
import { isLessThousand } from "@/app/utils/utils";
import { useEffect, useState } from "react";
import SeeReceiptButton from "./SeeReceiptButton";
import { createTickets } from "@/app/actions/ticket.actions";
import DeleteButton from "./DeleteButton";

interface Props {
	raffleId: string;
}

export default function OrderDetails({ raffleId }: Props) {
	const [order, setOrder] = useState<IOrderPopulated | null>(null);

	// fetch order details from the API
	useEffect(() => {
		const fetchOrder = async () => {
			const data = await fetch(`/api/order/${raffleId}`, { cache: "no-store" }).then((res) =>
				res.json()
			);
			console.log("🚀 ~ fetchOrder ~ data:", data);
			setOrder(data.data);
		};
		fetchOrder();
	}, [raffleId]);

	return (
		<>
			{/* <div className="mt-14 flex flex-col  mb-2 justify-between items-center mx-2 gap-4 ">
				<h2 className="text-2xl font-bold ">Detalles de la Orden 🔍</h2>
				<section className="w-full rounded-lg shadow-md bg-base-100 mx-2 p-4">
					<p className="font-bold text-lg">Datos del Comprador</p>
					<p>
						Nombre del Comprador: <span className="font-bold">{order?.buyerName}</span>
					</p>
					<p>
						Correo del Comprador: <span className="font-bold">{order?.buyerEmail}</span>
					</p>
					<p>
						Cantidad de Tickets comprados:{" "}
						<span className="font-bold">{order?.ticketCount}</span>
					</p>
					<p>
						Monto Total:{" "}
						<span className="font-bold">
							{order?.amount} {order?.currency}
						</span>
					</p>
				</section>
				<section className="w-full rounded-lg shadow-md bg-base-100 mx-2 p-4">
					<p className="font-bold text-lg">Datos del Raffle</p>
					{order?.raffleId && typeof order.raffleId === "object" && (
						<>
							<p>
								ID del Raffle:{" "}
								<span className="font-bold">{order.raffleId._id}</span>
							</p>
							<p>
								Nombre del Raffle:{" "}
								<span className="font-bold">{order.raffleId.title}</span>
							</p>
						</>
					)}
				</section>

				<section className="w-full rounded-lg shadow-md bg-base-100 mx-2 p-4">
					<p className="font-bold text-lg">Tickets asignados</p>
					{order?.ticketsAssigned && order.ticketsAssigned.length > 0 ? (
						<ul className="flex flex-wrap gap-2">
							{order.ticketsAssigned.map((ticket) =>
								typeof ticket === "object" && ticket !== null ? (
									<li key={ticket._id} className="badge badge-pr badge-dash cursor-pointer">
										<span className="font-bold">{ticket.ticketNumber}</span>
									</li>
								) : null
							)}
						</ul>
					) : (
						<p>No se han asignado tickets.</p>
					)}
				</section>
			</div> */}

			<div className="mt-14 flex flex-col  mb-2 justify-between items-center mx-2">
				<h1 className=" text-2xl font-bold px-2">Order Details</h1>
				{order?.status === "pending" && (
					<div className="w-full flex gap-2 justify-between">
						<p className="text-yellow-500">El pago está pendiente de aprobación.</p>
						<DeleteButton orderId={order?._id} raffleId={order?.raffleId.toString()} />
						<form
							action={(formData: FormData) => {
								createTickets(formData);
							}}
						>
							<button className="btn btn-sm btn-success rounded-md">
								Aprobar pago
							</button>
							<input
								type="text"
								name="ticketCount"
								defaultValue={order?.ticketCount}
								hidden
								readOnly
							/>
							<input
								type="text"
								name="orderId"
								defaultValue={order?._id}
								hidden
								readOnly
							/>
							<input
								type="text"
								name="raffleId"
								defaultValue={
									order?.raffleId &&
									typeof order.raffleId === "object" &&
									"_id" in order.raffleId
										? order.raffleId._id.toString()
										: ""
								}
								hidden
								readOnly
							/>
						</form>
					</div>
				)}
			</div>
			<div className="px-2 flex flex-col md:flex-row w-full gap-4 max-w-5xl mx-auto">
				<div className="flex flex-col gap-2 w-full ">
					<div className="flex flex-col gap-2 p-4 bg-base-100 rounded-box shadow-md">
						<span className="text-xs font-bold">Método de pago:</span>
						<p>Banco: {order?.bank}</p>
						<p>Referencia de Pago: {order?.paymentReference}</p>
						<p>Cantidad de Tickets: {order?.ticketCount}</p>
						<p>
							Total: {order?.amount} {order?.currency}
						</p>
						<p>Estado: {order?.status} </p>
						<SeeReceiptButton paymentProofUrl={order?.paymentProof || ""} />
					</div>

					<div className="flex flex-col gap-2 p-4 bg-base-100 rounded-box shadow-md">
						<span className="text-xs font-bold">Datos del cliente:</span>
						<p>Cliente: {order?.buyerName}</p>
						<p>Correo del Cliente: {order?.buyerEmail}</p>
						<p>Teléfono del Cliente: {order?.buyerPhone}</p>
					</div>

					<section className="flex flex-col gap-2 p-4 bg-base-100 rounded-box shadow-md">
						<span className="text-xs font-bold">información de Tickets</span>
						<span>Tickets asignados: </span>

						<div className="flex flex-wrap gap-2">
							{order?.ticketsAssigned.length === 0
								? "'No tiene tickets asignados'"
								: order?.ticketsAssigned.map((ticket, index) => {
										return (
											<span
												key={index}
												className="badge badge-pr badge-dash cursor-pointer"
											>
												{isLessThousand(
													(ticket as ITicket)?.ticketNumber
												) || "0"}
											</span>
										);
								  })}
						</div>

						{/* Mostrar detalles de la rifa */}
						{order?.raffleId && (
							<div className="mt-4 flex flex-col gap-2 ">
								<p className="text-pretty text-xs">
									Orden Pertenece al sorteo:{" "}
									{typeof order.raffleId === "object" && "title" in order.raffleId
										? order.raffleId.title
										: "N/A"}
								</p>
								<img
									src={
										typeof order.raffleId === "object" &&
										"imageUrl" in order.raffleId
											? order.raffleId.imageUrl
											: ""
									}
									alt="Raffle Image"
									className="max-h-24 object-cover rounded-md"
								/>
							</div>
						)}
					</section>
				</div>
			</div>
		</>
	);
}
