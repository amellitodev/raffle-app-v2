"use client";

import { useState } from "react";
import {  IOrderverify } from '../../types/types';

interface Props {
	raffleId: string;
}
export default function VerifyOrder({ raffleId }: Props) {
	const [buyerId, setBuyerId] = useState("");
	const [orders, setOrders] = useState<IOrderverify[]>();
	console.log("🚀 ~ VerifyOrder ~ orders:", orders);

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
			<section>
				<div className="flex flex-col md:flex-row gap-4 my-4 w-full ">
					<div className="flex flex-col gap-2 p-4 rounded-lg shadow-md  w-full">
						<h2 className="text-xl text-pink-500 font-bold">Verificar Orden</h2>
						<input
							type="text"
							placeholder="ID del Comprador"
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
					{orders && orders.length  > 0 ? (
                        <ul>
                            <span>{orders[0]?.raffleId.title}</span>
                            <p>Cédula {orders[0]?.buyerId}</p>
							{orders?.map((order) => (
								<li className="flex flex-col" key={order._id}>
									<span>Estado: {order.status}</span>
									<p>Cantidad de Tickets: {order.ticketCount}</p>
									<p>
										{order?.ticketsAssigned.map((ticket) => (
											<span key={ticket._id}>{ticket.ticketNumber}</span>
										))}
									</p>
								</li>
							))}
						</ul>
					) : (
						<p>No se encontraron órdenes.</p>
					)}
				</div>
			</section>
		</>
	);
}
