import OrderDetails from "../../../components/OrderDetails";

interface Props {
	params: Promise<{
		orderId: string;
	}>;
}

export default async function page({ params }: Props) {
	const { orderId } = await params;

	return (
		<>
			<OrderDetails raffleId={orderId} />
		</>
	);
}
