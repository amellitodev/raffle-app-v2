"use client";
import { IOrderPopulated } from "@/app/types/types";
import { useEffect, useState } from "react";

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
			<div className="mt-14 flex flex-col  mb-2 justify-between items-center mx-2 gap-4 ">
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
			</div>
		</>
	);
}
