"use client";

import { deleteOrder } from "@/app/actions/order.action";
import { useFormStatus } from "react-dom";

interface Props {
	orderId: string;
    raffleId: string;
}
export default function DeleteButton({ orderId, raffleId }: Props) {
	const { pending } = useFormStatus();
	console.log("🚀 ~ DeleteButton ~ pending:", pending);
	return (
		<form action={deleteOrder}>
			<input type="text" name="orderId" defaultValue={orderId} hidden readOnly />
			<input type="text" name="raffleId" defaultValue={raffleId} hidden readOnly />
			<button
				className="btn btn-sm btn-error btn-soft rounded-md"
				type="submit"
				disabled={pending}
			>
				{pending ? (
					<>
						Eliminando... <span className="loading"></span>
					</>
				) : (
					"Eliminar Orden"
				)}
			</button>
		</form>
	);
}
