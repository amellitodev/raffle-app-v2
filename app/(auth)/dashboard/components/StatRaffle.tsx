import Link from "next/link";


interface Props {
    receivedOrders: string;
    ticketsSold: string;
}

export default function StatRaffle({ receivedOrders, ticketsSold }: Props) {
	return (
		<>
			<div className="stats w-full text-center stats-vertical lg:stats-horizontal shadow">
				{/* <div className="stat">
					<div className="stat-title">Downloads</div>
					<div className="stat-value">31K</div>
					<div className="stat-desc">Jan 1st - Feb 1st</div>
				</div> */}

				<div className="stat">
					<div className="stat-title text-lg font-bold text-warning"><Link href="/dashboard/ordenes/68ba2ff50dc326327c3f9feb">Órdenes Pendientes</Link></div>
					<div className="stat-value">{receivedOrders}</div>
					{/* <div className="stat-desc">↘︎ 400 (22%)</div> */}
				</div>

				<div className="stat">
					<div className="stat-title text-lg font-bold text-success">Tickets Vendidos</div>
					<div className="stat-value">{ticketsSold}</div>
					<div className="stat-desc">↗︎ {( parseFloat(ticketsSold.replace(/,/g, "")) / 9999 * 100).toFixed(2)} % </div>
				</div>
			</div>
		</>
	);
}
