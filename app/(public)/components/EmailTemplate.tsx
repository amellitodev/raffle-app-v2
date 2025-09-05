import * as React from "react";
import { isLessThousand } from "../../utils/utils";

interface EmailTemplateProps {
	ticketsAssigned: [{ _id: string; ticketNumber: number }];
}

export function EmailTemplate({ ticketsAssigned }: EmailTemplateProps): React.ReactNode {
	return (
		<div
			style={{
				fontFamily: "Arial, sans-serif",
				lineHeight: "1.5",
				color: "#333",
				backgroundColor: "#f9f9f9",
				padding: "20px",
			}}
		>
			<div
				style={{
					maxWidth: "600px",
					margin: "0 auto",
					backgroundColor: "#ffffff",
					padding: "20px",
					borderRadius: "8px",
					boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
				}}
			>
				{/* <img src="/LOGO2ATRAPATUSUERTECONLISKEL.png" alt="logo" /> */}
				<h2 style={{ color: "#222", marginBottom: "10px" }}>🎉 Felicidades por participar! en Atrapa tu suerte con Liskel</h2>
				<p>
					<strong>
						{" "}
						{ticketsAssigned.map((ticket) => (
							<li key={ticket._id}>
								Ticket #: {isLessThousand(ticket.ticketNumber)}
							</li>
						))}
					</strong>{" "}
					¡Tus boletos han sido asignados con éxito! 🍀
				</p>

				<hr style={{ margin: "20px 0", borderColor: "#eee" }} />

				<p style={{ fontSize: "14px", color: "#888" }}>
					Gracias por confiar en{" "}
					<strong>
						Atrapa tu suerte con Liskel, tu pago será verificado nuevamente si resultas
						ser ganador
					</strong>
					. ¡Mucha suerte en la rifa! ✨
				</p>

				<p>Si tienes alguna pregunta, no dudes en contactarnos</p>
				<p>
					Recuerda que puedes revisar el estado de tu orden en nuestro sitio web.
					<a href="https://atrapatusuerteconliskel.com/" style={{ color: "#007bff" }}>
						Ver estado de orden
					</a>
				</p>
			</div>
		</div>
	);
}
