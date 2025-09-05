"use client";

import { useState } from "react";
import { IOrderverify } from "../../types/types";
import { isLessThousand } from "@/app/utils/utils";

interface Props {
	raffleId: string;
}
export default function VerifyOrder({ raffleId }: Props) {
	const [buyerId, setBuyerId] = useState("");
	const [orders, setOrders] = useState<IOrderverify[]>();

	const fetchOrders = async (buyerId: string, raffleId: string) => {
		const data = await fetch(`/api/verificatuorden?buyerId=${buyerId}&raffleId=${raffleId}`);
		const result = await data.json();
		setOrders(result.data);
	};

	const handleSearch = () => {
		fetchOrders(buyerId, raffleId);
		setBuyerId("");
	};

	return (
		<>
			<section id="verify">
				<div className="flex flex-col md:flex-row gap-4 my-4 w-full ">
					<div className="flex flex-col gap-2 p-4 rounded-lg shadow-md  w-full">
						<h2 className="text-xl text-pink-500 font-bold">Verificar Orden</h2>

						<input
							name="buyerId"
							type="text"
							placeholder="Cédula de identidad: Ej: 12123123"
							value={buyerId}
							onChange={(e) => setBuyerId(e.target.value)}
							className="border p-2 rounded bg-slate-50 w-full"
						/>

						<button
							onClick={handleSearch}
							className="bg-blue-500 text-white p-2 rounded"
						>
							Buscar
						</button>
					</div>
				</div>

				<div>
					{orders && orders.length > 0 ? (
						<ul className="flex flex-col gap-4 p-4 rounded-lg shadow-md  w-full">
							<div className="flex flex-col mx-auto justify-center items-center gap-2 p-4 w-1/2">
								<p className="text-xl text-center font-bold text-pink-500 text-pretty">
									✨Si tu numero es aprobado felicidades ya estas participando en
									el sorteo, si esta pendiente debes esperar por aprobación
								</p>
								<span className="text-amber-500 text-2xl font-bold">
									{orders[0]?.raffleId.title}
								</span>

								<p>Nombre del Comprador: {orders[0]?.buyerName}</p>
							</div>
							{orders?.map((order) => {
								const isPending =
									order.status === "pending" ? "badge-warning" : "badge-success";
								return (
									<li
										className="flex flex-col border p-4 rounded-lg shadow-md"
										key={order._id}
									>
										<span
											className={`badge font-bold ${isPending} badge-lg mb-2`}
										>
											Estado:{" "}
											{order.status === "completed"
												? "Aprobado"
												: "Pendiente"}
										</span>
										<p>Cantidad de Tickets: {order.ticketCount}</p>
										<span>
											{order?.ticketsAssigned.map((ticket) => (
												<span
													key={ticket._id}
													className="font-bold badge badge-dash"
												>
													{isLessThousand(ticket.ticketNumber)}
												</span>
											))}
										</span>
									</li>
								);
							})}
						</ul>
					) : (
						<p>No se encontraron órdenes.</p>
					)}
				</div>
			</section>
		</>
	);
}
