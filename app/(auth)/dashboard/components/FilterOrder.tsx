import { IOrder, Order } from "@/app/types/types";
import { EyeIcons, UpdateIcon } from "./icons/Icons";
import Link from "next/link";
import DateDisplay from "@/app/(public)/components/DateDisplay";

export default function FilterOrder({ orders, status }: { orders: Order[]; status: string }) {
	const isPending = status === "pending" ? "badge-warning" : "badge-success";

	if (orders.length === 0) {
		return (
			<div className="text-center py-4">
				<p>No hay órdenes {status === "pending" ? "pendientes" : "pagadas"}</p>
			</div>
		);
	}

	return (
		<>
			<div className="relative flex flex-col gap-2 overflow-y-auto pt-1 w-full">
				{orders.map((order) => (
					<div key={order._id} className="list bg-base-100 rounded-box shadow-md">
						<li className="list-row flex justify-around items-center">
							<div>
								<div className="text-xs uppercase font-semibold opacity-60">
									{/* formato de fecha 02/02/2022 14:30 */}

									<DateDisplay date={order.createdAt.toString()} />

									<p>Nombre: {order.buyerName}</p>
									<p>Cédula: {order.buyerId}</p>
								</div>
								<div className="flex flex-col">
									<strong>Tickets: {order.ticketCount}</strong>
									<strong>
										Monto: {order.amount.toLocaleString()} {order.currency}
									</strong>
								</div>
							</div>
							<div className="flex flex-col items-center gap-2">
								{/* Badge status */}
								<span className={`text-xs opacity-60 badge ${isPending}`}>
									{order.status === "pending" ? "Pendiente" : "Completada"}
								</span>
								<span>Tickets asignados:</span>
							</div>
							<div className="flex flex-col">
								<Link href={`/dashboard/ordenes/detalles/${order._id}`}>
									<EyeIcons className="size-6" />
								</Link>
							</div>
						</li>
					</div>
				))}
			</div>
		</>
	);
}
