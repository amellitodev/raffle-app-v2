"use client"
import { IOrderPopulated } from "@/app/types/types";
import { useEffect, useState } from "react";


interface Props {
	raffleId: string;
}

export default  function OrderDetails({ raffleId }: Props) {

	const [order, setOrder] = useState<IOrderPopulated | null>(null);

	// fetch order details from the API
	useEffect(() => {
		const fetchOrder = async () => {
			const data = await fetch(`/api/order/${raffleId}`, { cache: "no-store" }).then((res) => res.json());
			setOrder(data.data);
		};
		fetchOrder();
	}, [raffleId]);

	return (
		<>
			<div>
				<h2>Order Details</h2>

				<p>Buyer Name: {order?.buyerName}</p>
				<p>Buyer Email: {order?.buyerEmail}</p>
				<p>Ticket Count: {order?.ticketCount}</p>
				<p>
					Total Amount: {order?.amount} {order?.currency}
				</p>
			</div>
		</>
	);
}
