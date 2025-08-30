import { TPaymentMethod } from "@/app/types/types";
import { useState } from "react";

interface Props {
	paymentMethod: TPaymentMethod[];
}

export default function TicketPaymentMethod({ paymentMethod }: Props) {
	const [paymentMethodSelected, setPaymentMethodSelected] = useState<TPaymentMethod | null>(
		paymentMethod[0] || null
	);
	const [selectedIdx, setSelectedIdx] = useState(0);

	const isSelectedPaymentMethodStyle = (index: number) => {
		return selectedIdx === index
			? "p-2 border border-slate-300 rounded-md bg-warning text-slate-950"
			: "p-2 border border-slate-300 rounded-md bg-disabled";
	};
	return (
		<>
			<section className="flex flex-col gap-2 justify-center w-full">
				<span className="text-center">🛒 Método de Pago</span>
                    <label className="text-xs" htmlFor="buyerName">Referencia del pago</label>
                <input
					className="input rounded-md w-full text-slate-950 bg-slate-200 validator"
					type="text"
					name="paymentReference"
					placeholder="Ej: 1234"
					required
					pattern="[0-9]*"
					minLength={4}
					maxLength={12}
				/>
				<p className="validator-hint -mt-1">Ingrese una referencia de pago válida</p>
				<div>
					{paymentMethod.map((method, index) => (
						<div
							className={`cursor-pointer ${isSelectedPaymentMethodStyle(index)}`}
							key={index}
							onClick={() => {
								setPaymentMethodSelected(method), setSelectedIdx(index);
							}}
						>
							<strong>{method.type}</strong>
							<p>Entidad: {method.entityName}</p>
							{method.accountNumber && (
								<p>Número de cuenta: {method.accountNumber}</p>
							)}
							{method.phoneNumber && <p>Teléfono: {method.phoneNumber}</p>}
							{method.email && <p>Email: {method.email}</p>}
							{method.sellerId && <p>ID del vendedor: {method.sellerId}</p>}
						</div>
					))}
					<input
						className="input rounded-md w-full text-slate-950 bg-slate-200"
						type="text"
						name="bank"
						placeholder="Banco al que se realizó el pago"
						value={paymentMethodSelected?.type || ""}
						readOnly
						hidden
					/>
				</div>
			</section>
		</>
	);
}
