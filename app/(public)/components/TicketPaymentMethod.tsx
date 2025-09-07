import { TPaymentMethod } from "@/app/types/types";
import { useState } from "react";
import CopyTextButton from "./CopyTextButton";

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
			? "p-2 border border-slate-300 rounded-md bg-amber-400 text-slate-950"
			: "p-2 border border-slate-300 rounded-md bg-disabled";
	};

	const tipoPago = (type: string) => {
		switch (type) {
			case "banco":
				return "Transferencia Bancaria";
			case "pago_movil":
				return "Pago Móvil";
			case "zelle":
				return "Zelle";
			case "crypto":
				return "Binance";
			default:
				return "Método de Pago Desconocido";
		}
	};
	return (
		<>
			<section className="flex flex-col gap-2 justify-center w-full">
				
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
					<div className="w-full flex justify-center items-center">
					<span className="text-2xl">🛒 Método de Pago</span>

					</div>
				<div className="flex flex-col gap-4">
					{paymentMethod.map((method, index) => (
						<div
							className={`cursor-pointer flex flex-col ${isSelectedPaymentMethodStyle(index)}`}
							key={index}
							onClick={() => {
								setPaymentMethodSelected(method), setSelectedIdx(index);
							}}
						>
							<strong className="">{tipoPago(method.type)}</strong>
							<p>{method.entityName}</p>
							{method.accountNumber && (
								<div className="flex items-center gap-2">
									<p>Número de cuenta: {method.accountNumber} </p>
									<CopyTextButton textToCopy={method.accountNumber} />
								</div>
							)}
							{method.phoneNumber && (
								<div className="flex items-center gap-2">
									<p>Teléfono: {method.phoneNumber} </p>
									<CopyTextButton textToCopy={method.phoneNumber} />
								</div>
							)}
							{method.email && (
								<div className="flex items-center gap-2">
									<p>Email: {method.email} </p>
									<CopyTextButton textToCopy={method.email} />
								</div>
							)}
							{method.sellerId && (
								<div className="flex items-center gap-2">
									<p>Cédula: {method.sellerId} </p>
									<CopyTextButton textToCopy={method.sellerId} />
								</div>
							)}
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
