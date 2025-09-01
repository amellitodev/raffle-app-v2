import { getOrderById } from "@/app/actions/order.action";
// import { IOrderPopulated } from "@/app/types/types";

interface Props {
	raffleId: string;
}

export default async function OrderDetails({ raffleId }: Props) {
	const fetchedOrder = await getOrderById(raffleId);

	return (
		<>
			<div>
				<h2>Order Details</h2>

				<p>Buyer Name: {fetchedOrder?.buyerName}</p>
				<p>Buyer Email: {fetchedOrder?.buyerEmail}</p>
				<p>Ticket Count: {fetchedOrder?.ticketCount}</p>
				<p>
					Total Amount: {fetchedOrder?.amount} {fetchedOrder?.currency}
				</p>
			</div>
		</>
	);
}
