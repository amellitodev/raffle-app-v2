import { getOrders } from "@/app/actions/actions";
import FilterOrder from "./FilterOrder";

export default async function ListOrder({ raffleId }: { raffleId: string }) {
	const data = await getOrders();

	//filter by raffle id and status
	const filteredOrders = data.filter(
		(order) => order.raffleId.toString() === raffleId.toString()
	);
	const orderPending = filteredOrders.filter((order) => order.status === "pending");
	const orderPaid = filteredOrders.filter((order) => order.status === "completed");

	return (
		<>
			<section className="flex flex-col md:flex-row md:gap-6 w-full h-screen gap-2">
				<div className="flex flex-col md:w-1/2 bg-base-100 rounded-box shadow-md overflow-scroll overflow-x-hidden px-2 w-full">
					<h2 className="mt-4 bg-gradient-to-b from-warning to-transparent rounded-t-md p-2">
						Órdenes Pendientes
					</h2>
					<ul className="flex flex-col md:flex-row gap-4 h-96">
						<FilterOrder orders={orderPending} status="pending" />
					</ul>
				</div>
				<div className="flex flex-col md:w-1/2 bg-base-100 rounded-box shadow-md overflow-scroll overflow-x-hidden px-2 w-full">
					<h2 className="mt-4 bg-gradient-to-b from-success to-transparent rounded-t-md p-2">
						Órdenes Pagadas
					</h2>
					<ul className="flex flex-col md:flex-row gap-4 h-96">
						<FilterOrder orders={orderPaid} status="paid" />
					</ul>
				</div>
			</section>
		</>
	);
}
