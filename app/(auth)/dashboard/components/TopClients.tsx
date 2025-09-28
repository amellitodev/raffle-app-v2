"use client";

import { useEffect, useState } from "react";

interface Props {
	raffleId: string;
}

interface TopClient {
	buyerName: string;
	totalTickets: number;
	buyerId: string;
}

export default function TopClients({ raffleId }: Props) {
	const [topClientes, setTopClientes] = useState<TopClient[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchTopClients = async (raffleId: string) => {
		setLoading(true);
		try {
			// Construye la URL completa para server-side fetch
			const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
			const response = await fetch(`${baseUrl}/api/topBuyer?raffleId=${raffleId}`, {
				cache: "no-store", // Asegura datos frescos
			});
			if (!response.ok) {
				console.error("Error fetching top clients:");
				return [];
			}
			const data = await response.json();
			return setTopClientes(data[0]?.topBuyers || []);
		} catch (error) {
			console.error("Error fetching top clients:", error);
			return [];
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (raffleId) {
			fetchTopClients(raffleId);
		}
	}, [raffleId]);

	return (
		<>
			<h2 className="text-2xl font-bold text-pink-500 mt-4">🏆Top Clientes</h2>
			<p className="mb-6">Aquí puedes ver a los clientes más fieles de este sorteo.</p>
			<div className="overflow-x-auto">
				<table className="table table-zebra">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th className="min-w-52">Nombre</th>
							<th>Tickets Comprados</th>
							<th>Cédula</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}

						{loading && (
							<>
								<tr>
                                    <th>1</th>
									<td colSpan={3} className="text-center skeleton rounded-none">
										Cargando...
									</td>
								</tr>
								<tr>
                                    <th>2</th>
									<td colSpan={3} className="text-center skeleton rounded-none">
										Cargando...
									</td>
								</tr>
								<tr>
                                    <th>3</th>
									<td colSpan={3} className="text-center skeleton rounded-none">
										Cargando...
									</td>
								</tr>
							</>
						)}

						{topClientes.map((client: TopClient, index: number) => {
							const isPrimary = index === 0;
							const rowClass = isPrimary ? "bg-yellow-200" : "";
							return (
								<tr key={index} className={rowClass}>
									<th>{index + 1}</th>
									<td>{client.buyerName}</td>
									<td>{client.totalTickets}</td>
									<td>{client.buyerId}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
