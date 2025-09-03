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
			<div className="relative flex flex-col gap-2 overflow-y-auto pt-1 w-full bg-slate-50">
				{orders.map((order) => (
					<div key={order._id} className="list rounded-box shadow-md bg-slate-50">
						<li className="list-row flex justify-around items-center bg-slate-50">
							<div>
								<div className="text-md uppercase font-semibold">
									{/* formato de fecha 02/02/2022 14:30 */}


									<p>Nombre: {order.buyerName}</p>
									<p>Cédula: {order.buyerId}</p>
								</div>
								<div className="flex flex-col">
									<strong>Tickets: {order.ticketCount}</strong>
									<strong>
										Monto: {order.amount.toLocaleString()} {order.currency}
									</strong>
								</div>
									<DateDisplay date={order.createdAt.toString()} className="text-md" />

							</div>
							<div className="flex flex-col items-center gap-2">
								{/* Badge status */}
								<span className={`text-xs opacity-60 badge ${isPending}`}>
									{order.status === "pending" ? "Pendiente" : "Completada"}
								</span>
								{/* <span>Tickets asignados:</span> */}
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
