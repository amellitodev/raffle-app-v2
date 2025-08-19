"use client";
import { createOrder } from "@/app/actions/actions";

interface Props {
	ticketPrice?: number;
	raffleId?: string;
}
export default function FormTicket({ ticketPrice = 0, raffleId = "" }: Props) {
	return (
		<>
			<form action={createOrder} className="flex flex-col gap-2">
				<span className="text-lg text-center">Precio por ticket</span>
				<span className="text-4xl font-bold text-center"> $ {ticketPrice}</span>
				<input type="hidden" name="raffleId" defaultValue={raffleId || ""} />

				<input className="input rounded-md w-full" type="text" name="buyerFirstName" placeholder="Nombre" />

				<input className="input rounded-md w-full" type="text" name="buyerLastName" placeholder="Apellido" />
				<input className="input rounded-md w-full" type="text" name="buyerId" placeholder="Cédula" />
				<input className="input rounded-md w-full" type="text" name="buyerEmail" placeholder="Email" />
				<input className="input rounded-md w-full" type="text" name="buyerPhone" placeholder="Teléfono" />
				<div className="divider"></div>

					<input
						className="input rounded-md w-full"
						type="text"
						name="paymentReference"
						placeholder="Referencia del pago"
					/>
					<input
						className="input rounded-md w-full"
						type="text"
						name="bank"
						placeholder="Banco al que se realizó el pago"
					/>
			
				<div className="flex gap-2">
					<select className="select w-2/4" name="currency" id="currency">
						<option value="">Moneda</option>
						<option value="USD">Dolares</option>
						<option value="EUR">Euros</option>
						<option value="VES">Bolívares</option>
					</select>
					<input className="input rounded-md w-full" type="text" name="amount" placeholder="Monto" />
				</div>

				<input className="input rounded-md w-full" type="text" name="ticketNumbers" placeholder="Números de Ticket" />

				<button className="btn btn-primary rounded-md" type="submit">
					Comprar Ticket
				</button>
			</form>
		</>
	);
}
