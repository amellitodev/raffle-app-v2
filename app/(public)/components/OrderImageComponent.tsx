import { getSignedUrl } from "@/app/actions/actions";

// Server component
export default async function OrderImageComponent() {
	const url = await getSignedUrl("raffle-app-demo/j4flcwa13qty7wejbrsv");

	return (
		<>
			<img src={url} alt="" />
			<p>Comprobante de pago</p>
		</>
	);
}
