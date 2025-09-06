"use client";
import { useEffect, useState } from "react";
import { EyeIcons } from "./icons/Icons";
import Link from "next/link";
import { Order } from "@/app/types/types";
// eslint-disable-next-line react-hooks/exhaustive-deps
export default function FindOrder({ raffleId }: { raffleId: string }) {
	const [searchOrderNumber, setSearchOrderNumber] = useState("");
	const [orders, setOrders] = useState<Order[]>([]);
	console.log("🚀 ~ FindOrder ~ orders:", orders);
	// const isPending = orders?.status === "pending" ? "badge-warning" : "badge-success";

	const fetchedOrder = async (searchOrderNumber: string) => {
		try {
			const data = await fetch(
				`/api/orderbuyer?buyerId=${searchOrderNumber}&raffleId=${raffleId}`
			);
			const orders = await data.json();
			console.log("🚀 ~ fetchedOrder ~ orden:", orders);
			setOrders(orders.data);
		} catch (error) {
			console.error("Error fetching order:", error);
		}
	};

	useEffect(() => {
		if (!searchOrderNumber) return;
		const handler = setTimeout(() => {
			fetchedOrder(searchOrderNumber);
		}, 300);

		return () => clearTimeout(handler);
	}, [searchOrderNumber]);

	const handleSearch = async (searchOrderNumber: string) => {
		fetchedOrder(searchOrderNumber);
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

				<ul className="flex flex-col gap-4 p-4 rounded-lg shadow-md bg-slate-50 w-full">
					<p className="text-md">Datos de la orden de compra</p>
					{orders?.length === 0 && (
						<span className="font-bold">No se encontraron órdenes</span>
					)}

					<li className="flex flex-col justify-between items-center gap-4">
						{orders?.length > 0 &&
							orders.map((orders) => {
								const isPending =
									orders?.status === "pending"
										? "badge-warning"
										: "badge-success";

								return (
									<div
										key={orders._id}
										className="flex flex-col gap-2 border p-4 rounded-lg shadow-md bg-white w-full"
									>
										<span className="font-bold">
											Comprador: {orders?.buyerName}
										</span>
										<span className="font-bold">Cédula: {orders?.buyerId}</span>
										<span className="font-bold">
											Teléfono: {orders?.buyerPhone}
										</span>
										<span className="font-bold">
											Email: {orders?.buyerEmail}
										</span>
										<span className="font-bold">
											Comprobante de pago:{" "}
											{orders?.paymentProof ? "✔️" : "❌"}
										</span>
										<span>Tickets: {orders?.ticketsAssigned.length}</span>
										<div className="flex justify-between items-center">
											<span className={`badge ${isPending}`}>
												{orders?.status === "pending"
													? "Pendiente"
													: "Completada"}
											</span>
											<Link href={`/dashboard/ordenes/detalles/${orders?._id}/`}>
												<EyeIcons className="w-6 h-6 cursor-pointer" />
											</Link>
										</div>
									</div>
								);
							})}
					</li>
				</ul>
			</div>
		</>
	);
}