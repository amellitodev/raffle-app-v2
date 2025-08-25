import { IOrder } from "@/app/types/types";
import { EyeIcons, UpdateIcon } from "./icons/Icons";
import Link from "next/link";

export default function FilterOrder({ orders, status }: { orders: IOrder[]; status: string }) {
	const isPending = status === "pending" ? "badge-warning" : "badge-success";

	return (
		<>
			<div className="relative flex flex-col gap-2 overflow-y-auto pt-4">
				{orders.map((order) => (
					<div key={order._id} className="list bg-base-100 rounded-box shadow-md ">
						<li className="list-row flex justify-around">
							<div>
								<div className="text-xs uppercase font-semibold opacity-60">
									{order.createdAt?.toLocaleString()}
									<div>Nombre: {order.buyerName}</div>
								</div>
								<div className="flex flex-col">
									<strong>Tickets: {order.ticketCount}</strong>
									<strong>
										Monto: {order.amount} {order.currency}
									</strong>
								</div>
							</div>
							<div className="flex flex-col items-center gap-2">
								{/* Badge status */}
								<span className={`text-xs opacity-60 badge ${isPending}`}>
									{order.status}
								</span>
								<span>Tickets asignados:</span>
							</div>
							<div className="flex flex-col">
								<button className="btn btn-square btn-ghost">
									<UpdateIcon className="size-6" />
								</button>
								<button className="btn btn-square btn-ghost">
									<EyeIcons className="size-6" />
								</button>
								<Link href={`/dashboard/ordenes/detalles/${order._id}`}>
									Ver Orden
								</Link>
							</div>
						</li>
					</div>
				))}
			</div>
		</>
	);
}
