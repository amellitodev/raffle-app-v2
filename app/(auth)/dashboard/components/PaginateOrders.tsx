"use client";
import { IOrdersResponse } from "@/app/types/types";
import { useEffect, useState } from "react";
import FilterOrder from "./FilterOrder";
interface Props {
	raffleId: string;
}
export default function PaginateOrders({ raffleId }: Props) {
	const [orders, setOrders] = useState<IOrdersResponse>({
		orders: [],
		message: "Orders retrieved successfully",
		docs: {
			totalPages: 0,
			limit: 2,
			prevPage: 0,
			currentPage: 1,
			nextPage: 0,
		},
	});
	console.log("🚀 ~ PaginateOrders ~ orders:", orders)
	const [orderStatus, setOrderStatus] = useState("pending");
	const isPending = orderStatus === "pending" ? "bg-warning" : "bg-success";

	const handleStatusChange = (status: string) => {
		setOrderStatus(status);
	};

	useEffect(() => {
		const fetchOrders = async () => {
			const response = await fetch(`/api/order?raffleId=${raffleId}&status=${orderStatus}`);
			const data = await response.json();
			setOrders(data);
		};
		fetchOrders();
	}, [raffleId, orderStatus]);

	const handlePageChange = async (page: number) => {
		// const data = await getTickets(raffleId ?? "", page, 20, sortOrder);
		// console.log("🚀 ~ handlePageChange ~ data:", data)
		try {
			const response = await fetch(
				`/api/order?raffleId=${raffleId}&page=${page}&limit=${orders.docs.limit}`
			);
			const data = await response.json();
			setOrders(data);
			if (!response.ok) {
				throw new Error(data.message || "Error fetching orders");
			}
		} catch (error) {
			console.log("🚀 ~ PaginateOrders ~ error:", error);
			// Manejo de errores
			setOrders({
				orders: [],
				message: "Orders retrieved successfully",
				docs: {
					totalPages: 0,
					limit: 2,
					prevPage: 0,
					currentPage: 1,
					nextPage: 0,
				},
			});
		}
	};

	return (
		<>
			<div>
				<button
					className={`btn rounded-l-md ${orderStatus === "pending" ? "btn-active" : ""}`}
					onClick={() => handleStatusChange("pending")}
				>
					Pendientes
				</button>
				<button
					className={`btn rounded-r-md ${
						orderStatus === "completed" ? "btn-active" : ""
					}`}
					onClick={() => handleStatusChange("completed")}
				>
					Completadas
				</button>
			</div>
			<div className="flex flex-col gap-4 h-[calc(100vh-200px)] justify-between">
				<div className="flex flex-col bg-base-100 rounded-box shadow-md overflow-scroll overflow-x-hidden px-2 w-full">
					<h2
						className={`mt-4 bg-gradient-to-b ${isPending} to-transparent rounded-t-md p-2`}
					>
						Órdenes {orderStatus === "pending" ? "Pendientes" : "Completadas"}{" "} {orders.orders.length}
					</h2>
					<ul className="flex flex-col md:flex-row gap-4 h-screen md:h-full">
						<FilterOrder orders={orders.orders} status={orderStatus} />
					</ul>
				</div>
				<div className="flex justify-between mt-4 px-2">
					<button
						className="btn btn-accent px-4 py-2 rounded-l"
						onClick={() => handlePageChange(orders?.docs.currentPage - 1)}
						disabled={orders?.docs.currentPage === 1}
					>
						Anterior
					</button>
					<span className="px-4 py-2">
						Página {orders?.docs.currentPage} de {orders?.docs.totalPages}
					</span>
					<button
						className="btn btn-accent px-4 py-2 rounded-r"
						onClick={() => handlePageChange(orders?.docs.currentPage + 1)}
						disabled={orders?.docs.currentPage === orders?.docs.totalPages}
					>
						Siguiente
					</button>
				</div>
			</div>
		</>
	);
}
