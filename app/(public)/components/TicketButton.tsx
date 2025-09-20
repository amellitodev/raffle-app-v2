import { useFormStatus } from "react-dom";

export default function TicketButton() {
	const { pending } = useFormStatus();
	return (
		<>
			<button
				className="btn btn-block text-slate-950 font-bold rounded-md"
				type="submit"
				disabled={pending}
			>
				{pending ? (
					<>
						Cargando... <span className="loading"></span>
					</>
				) : (
					// "Comprar boleto 🎟️"
					"Sorteo finalizado 🎉"
				)}
			</button>
		</>
	);
}
