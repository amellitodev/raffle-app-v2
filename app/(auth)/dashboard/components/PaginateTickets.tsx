"use client";

import { getTickets } from "@/app/actions/ticket.actions";
import { useEffect, useState, Suspense } from "react";
import { isLessThousand } from "../../../utils/utils";
import FindTicket from "./FindTicket";
import { ITicketResponseData } from "@/app/types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PaginateTickets({ raffleId }: { raffleId: string }) {
	const [tickets, setTickets] = useState<ITicketResponseData>({
		tickets: [],
		docs: { totalPages: 0, limit: 10, prevPage: 0, currentPage: 1, nextPage: 0 },
	});
	console.log("🚀 ~ PaginateTickets ~ tickets:", tickets);

	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

	const handlePageChange = async (page: number) => {
		// const data = await getTickets(raffleId ?? "", page, 20, sortOrder);
		// console.log("🚀 ~ handlePageChange ~ data:", data)
		try {
			const response = await fetch(
				`/api/ticket?raffleId=${raffleId}&sortOrder=${sortOrder}&page=${page}&limit=${tickets.docs.limit}`
			);
			const data = await response.json();
			setTickets(data);
			if (!response.ok) {
				throw new Error(data.message || "Error fetching tickets");
			}
		} catch (error) {
			console.log("🚀 ~ PaginateTickets ~ error:", error);
			// Manejo de errores
			setTickets({
				tickets: [],
				docs: { totalPages: 0, limit: 10, prevPage: 0, currentPage: 1, nextPage: 0 },
			});
		}
	};
	const handleSortOrderChange = (order: "asc" | "desc") => {
		setSortOrder(order);
	};

	// useEffect(() => {
	// 	const fetchTickets = async () => {
	// 		const data = await getTickets(raffleId ?? "", 1, 20, sortOrder);
	// 		setTickets(data);
	// 	};
	// 	fetchTickets();
	// }, [raffleId, sortOrder]);

	useEffect(() => {
		try {
			const fetchData = async () => {
				const response = await fetch(
					`/api/ticket?raffleId=${raffleId}&sortOrder=${sortOrder}&page=${tickets.docs.currentPage}&limit=${tickets.docs.limit}`
				);
				const data = await response.json();
				console.log("🚀 ~ fetchData ~ data:", data);
				setTickets(data.data);
				if (!response.ok) {
					throw new Error(data.message || "Error fetching tickets");
				}
			};
			fetchData();
		} catch (error) {
			console.log("🚀 ~ PaginateTickets ~ error:", error);
			// Manejo de errores
			setTickets({
				tickets: [],
				docs: { totalPages: 0, limit: 10, prevPage: 0, currentPage: 1, nextPage: 0 },
			});
		}
	}, [raffleId, sortOrder]);

	// TODO: hacer loading de carga

	return (
		<>
			<Suspense fallback={<div>Cargando tickets...</div>}>
				<div className="p-4  mt-14  rounded-lg shadow-md bg-base-100 mx-2">
					<h1 className="text-2xl font-bold">
						Tickets del sorteo: {tickets?.raffleTitle}
					</h1>
					<p className="text-sm text-gray-500">
						Aquí puedes ver todos tus tickets comprados.
					</p>
				</div>
				{!tickets && <p className="mt-14">Cargando...</p>}

				<section className="px-2 ">
					<FindTicket raffleId={raffleId} />

					<div className="flex justify-between items-center mb-4 p-4 rounded-lg shadow-md bg-base-100 mt-2">
						<div>
							<p className="text-2xl">
								Tickets Existentes:{" "}
								<span className="font-bold">{tickets.tickets.length}</span>
							</p>
						</div>
						<button
							className="btn btn-primary rounded-md"
							onClick={() =>
								handleSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
							}
						>
							Ordenar {sortOrder === "asc" ? "descendente" : "ascendente"}
						</button>
					</div>
					<ul className="h-[calc(100vh-370px)] p-4 rounded-lg shadow-md bg-base-100  overflow-y-auto">
						{tickets?.tickets.map((ticket) => (
							<li className="flex flex-col border p-4 mb-2 rounded" key={ticket._id}>
								<p>
									Ticket # {isLessThousand(ticket.ticketNumber || 0)} -{" "}
									{ticket.orderId ? ticket.orderId.status : "Disponible"}
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
			</Suspense>
		</>
	);
}
