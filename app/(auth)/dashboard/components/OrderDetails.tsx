"use client";
import { IOrderPopulated, ITicket } from "@/app/types/types";
import { isLessThousand } from "@/app/utils/utils";
import { useEffect, useState } from "react";
import SeeReceiptButton from "./SeeReceiptButton";
import { createTickets } from "@/app/actions/ticket.actions";
import DeleteButton from "./DeleteButton";
import { redirect, useRouter } from "next/navigation";

interface Props {
	raffleId: string;
}

export default function OrderDetails({ raffleId }: Props) {
	const [order, setOrder] = useState<IOrderPopulated | null>(null);
	const router = useRouter()

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

	const handleRegresar = () => {
		router.push(`/dashboard/sorteo`);
	};

	return (
		<>
			

			<div className="mt-14 flex flex-col  mb-2 justify-between items-center mx-2 bg-slate-50">
				<div className="flex flex-col gap-2 justify-starts items-start w-full max-w-5xl">
					<button className="btn btn-sm btn-accent rounded-md" onClick={handleRegresar}>Regresar</button>
				<h1 className=" text-4xl font-bold px-2">Detalles de la Orden</h1>
				</div>
				{order?.status === "pending" && (
					<div className="w-full md:px-24 flex flex-col items-end gap-2 justify-between bg-slate-50 ">
						<DeleteButton orderId={order?._id} raffleId={order?.raffleId.toString()} />
						<form
							action={async (formData: FormData) => {
								await createTickets(formData);
								// router.refresh() 
								redirect('/dashboard/sorteo')
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
						<p className="text-yellow-500 text-center w-full">El pago está pendiente de aprobación.</p>

					</div>
				)}
			</div>
			<div className="px-2 flex flex-col md:flex-row w-full gap-4 max-w-5xl mx-auto ">
				<div className="flex flex-col gap-2 w-full  0">
					<div className="flex flex-col gap-2 p-4 rounded-box shadow-md bg-slate-50">
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

					<div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-box shadow-md">
						<span className="text-xs font-bold">Datos del cliente:</span>
						<p>Cliente: {order?.buyerName}</p>
						<p>Correo del Cliente: {order?.buyerEmail}</p>
						<p>Teléfono del Cliente: {order?.buyerPhone}</p>
					</div>

					<section className="flex flex-col gap-2 p-4 bg-slate-50 rounded-box shadow-md">
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
