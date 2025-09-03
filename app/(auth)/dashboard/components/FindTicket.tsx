import { getTicketByNumber } from "@/app/actions/ticket.actions";
import { TicketData } from "@/app/types/types";
import { useState } from "react";
import { isLessThousand } from "../../../utils/utils";

export default function FindTicket({ raffleId }: { raffleId: string }) {
	const [ticket, setTicket] = useState<TicketData>({} as TicketData);
	const [searchTicketNumber, setSearchTicketNumber] = useState<string>("");

	const handleSearch = () => {
		const fetchData = async () => {
			const data = await getTicketByNumber(raffleId, Number(searchTicketNumber));
			if (data) {
				setTicket(data);
			}
		};
		fetchData();
	};

	return (
		<div className="flex flex-col md:flex-row gap-4 my-4 w-full">
			<div className="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-base-100 w-full">
				<h2 className="text-xl font-bold">Buscar Ticket</h2>
				<label htmlFor="searchTicketNumber">Número del ticket</label>
				<input
					name="searchTicketNumber"
					value={searchTicketNumber}
					onChange={(e) => setSearchTicketNumber(e.target.value)}
					type="text"
					placeholder="Número del ticket Ej: 170"
					className="input input-bordered w-full"
				/>
				<button className="btn btn-primary rounded-md" onClick={handleSearch}>
					Buscar
				</button>
			</div>

			<ul className="flex gap-4 p-4 rounded-lg shadow-md bg-base-100 w-full">
				{ticket.ticketNumber ? (
					<li className="">
						<p className="text-4xl font-bold">
							Ticket # {isLessThousand(ticket?.ticketNumber)}
						</p>
						<div className="flex flex-col gap-2">
							<span className="font-bold">Sorteo: {ticket?.raffleId?.title}</span>
							<span className="font-bold">Comprador: {ticket?.orderId?.buyerName}</span>
							<span className="font-bold">Cédula: {ticket?.orderId?.buyerId}</span>
							<span className="font-bold">Teléfono: {ticket?.orderId?.buyerPhone}</span>
							
						</div>
					</li>
				) : (
					<li className="">
						<p className="text-4xl font-bold">Información del ticket</p>
					</li>
				)}
			</ul>
		</div>
	);
}
