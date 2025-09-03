"use client";
import { getOrderByBuyerId } from "@/app/actions/order.action";
import { Order } from "@/app/types/types";
import { useState } from "react";
import { EyeIcons } from "./icons/Icons";
import Link from "next/link";

export default function FindOrder({ raffleId }: { raffleId: string }) {
	const [searchOrderNumber, setSearchOrderNumber] = useState("");
	const [order, setOrder] = useState<Order | null>(null);
	const isPending = order?.status === "pending" ? "badge-warning" : "badge-success";
	const handleSearch = async (buyerId: string = "") => {
		// Lógica para buscar el ticket por ID de comprador
		const orden = await getOrderByBuyerId(raffleId, buyerId);
		setOrder(orden);
		console.log("🚀 ~ handleSearch ~ orden:", orden);
	};
	return (
		<>
			<div className="flex flex-col md:flex-row gap-4 my-4 w-full ">
				<div className="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-slate-50 w-full">
					<h2 className="text-xl font-bold">Buscar Orden</h2>
					<label htmlFor="searchOrderNumber">Número de cédula</label>
					<input
						name="searchOrderNumber"
						value={searchOrderNumber}
						onChange={(e) => setSearchOrderNumber(e.target.value)}
						type="text"
						placeholder="Ej: 12123123"
						className="input input-bordered w-full bg-slate-50"
					/>
					<button
						className="btn btn-primary rounded-md"
						onClick={() => handleSearch(searchOrderNumber)}
					>
						Buscar
					</button>
				</div>

				<ul className="flex gap-4 p-4 rounded-lg shadow-md bg-slate-50 w-full">
					{order ? (
						<li className=" flex gap-8">
							{/* <p className="text-4xl font-bold">
                            Orden # {order?._id}
                        </p> */}
							<div className="flex flex-col gap-2">
								<p className="text-md">Datos de la orden de compra</p>
								<span className="font-bold">Comprador: {order?.buyerName}</span>
								<span className="font-bold">Cédula: {order?.buyerId}</span>
								<span className="font-bold">Teléfono: {order?.buyerPhone}</span>
								<span className="font-bold">Email: {order?.buyerEmail}</span>
								<span className="font-bold">
									Cantidad pagada: {order?.amount} {order?.currency}
								</span>
								<span className="font-bold">
									Tickets asignados: {order?.ticketsAssigned?.length || 0}
								</span>
								<span className="font-bold">
									Comprobante de pago: {order?.paymentProof ? "✔️" : "❌"}
								</span>
								<span className="font-bold badge-accent">
									{
										<span className={`badge ${isPending}`}>
											{order?.status === "pending"
												? "Pendiente"
												: "Completada"}
										</span>
									}
								</span>
							</div>
							<Link href={`/dashboard/ordenes/detalles/${order._id}`}>
								<EyeIcons className="size-6" />
							</Link>
						</li>
					) : (
						<li className="">
							<p className="text-4xl font-bold">Información de la orden</p>
						</li>
					)}
				</ul>
			</div>
		</>
	);
}
