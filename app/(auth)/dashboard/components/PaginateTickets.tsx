"use client";

import { getTickets } from "@/app/actions/actions";
import { useEffect, useState } from "react";
import { isLessThousand } from "../../../utils/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ticket = any;

interface TicketsResponse {
	tickets: Ticket[];
	docs: {
		totalPages: number;
		limit: number;
		prevPage: number | null;
		currentPage: number;
		nextPage: number | null;
	};
}

export default function PaginateTickets({ raffleId }: { raffleId: string }) {
	const [tickets, setTickets] = useState<TicketsResponse>({
		tickets: [],
		docs: { totalPages: 0, limit: 10, prevPage: null, currentPage: 1, nextPage: null },
	});

	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

	const handlePageChange = async (page: number) => {
		const data = await getTickets(raffleId ?? "", page, 10, sortOrder);
		setTickets(data);
	};
	const handleSortOrderChange = (order: "asc" | "desc") => {
		setSortOrder(order);
	};

	useEffect(() => {
		const fetchTickets = async () => {
			const data = await getTickets(raffleId ?? "", 1, 10, sortOrder);
			setTickets(data);
		};
		fetchTickets();
	}, [raffleId, sortOrder]);

	// TODO: hacer loading de carga

	return (
		<>
			<section className="px-2 ">
				<div className="flex justify-between items-center mb-4 p-4 rounded-lg shadow-md bg-base-100 mt-2">
					<div className="flex gap-2">
						<input
							className="input input-sm input-bordered"
							type="text"
							placeholder="Buscar tickets..."
						/>
						<button className="btn btn-sm btn-primary rounded-md">Buscar</button>
					</div>
					<button
						className="btn btn-sm btn-primary rounded-md"
						onClick={() => handleSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
					>
						Ordenar {sortOrder === "asc" ? "descendente" : "ascendente"}
					</button>
				</div>
				<ul className="h-[calc(100vh-340px)] p-4 rounded-lg shadow-md bg-base-100  overflow-y-auto">
					{tickets?.tickets.map((ticket) => (
						<li className="flex flex-col border p-4 mb-2 rounded" key={ticket._id}>
							<p>
								Ticket # {isLessThousand(ticket.ticketNumber)} - {ticket.orderId ? ticket.orderId.status : 'Disponible'}
							</p>
							{ticket.raffleId && <p>Sorteo: {ticket.raffleId.title}</p>}
							{ticket.orderId && (
								<p>
									Comprado por: {ticket.orderId.buyerName} (Estado:{" "}
									{ticket.orderId.status})
								</p>
							)}
						</li>
					))}
				</ul>
			</section>
			<div className="flex justify-between mt-4 px-2">
				<button
					className="btn btn-accent px-4 py-2 rounded-l"
					onClick={() => handlePageChange(tickets?.docs.currentPage - 1)}
					disabled={tickets?.docs.currentPage === 1}
				>
					Anterior
				</button>
				<span className="px-4 py-2">
					Página {tickets?.docs.currentPage} de {tickets?.docs.totalPages}
				</span>
				<button
					className="btn btn-accent px-4 py-2 rounded-r"
					onClick={() => handlePageChange(tickets?.docs.currentPage + 1)}
					disabled={tickets?.docs.currentPage === tickets?.docs.totalPages}
				>
					Siguiente
				</button>
			</div>
		</>
	);
}
