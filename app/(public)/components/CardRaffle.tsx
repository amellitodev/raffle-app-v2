import { IRaffle } from "@/app/types/types";
import Link from "next/link";
import DateDisplay from "./DateDisplay";

interface Props {
	raffle: IRaffle;
}

export default function CardRaffle({ raffle }: Props) {
	// Determine if the raffle is active
	const isRaffleActive = raffle.status === "active" && "Active";

	// Determine the raffle status badge
	const raffleStatus = isRaffleActive ? (
		<span className="badge badge-success rounded-md first-letter:uppercase">
			{isRaffleActive || "Card Status"}
		</span>
	) : (
		<span className="badge badge-error rounded-md first-letter:uppercase">Finalizado</span>
	);


	return ( 
		<div className="card bg-base-100 w-full md:w-80 h-96 shadow-sm">
			<figure>
				<img
					src={raffle.imageUrl || "https://via.placeholder.com/150"}
					alt={raffle.title.trim().replace(/-/g, " ") || "Raffle Image"}
					className="card-img w-full h-full object-cover rounded-t-lg"
				/>
			</figure>
			<div className="card-body">
			<DateDisplay date={raffle.raffleDate} />
				<h2 className="card-title truncate">{raffle.title.replace(/-/g, " ") || "Card Title"}</h2>
				<p className="text-sm line-clamp-2">{raffle.description || "Card Description"}</p>
				{/* // Format the raffle status */}
				{raffleStatus}
				<div className="card-actions">
					<Link
						href={`/sorteos/${raffle.title}`}
						className="btn btn-primary w-full rounded-md"
					>
						Participa
					</Link>
				</div>
			</div>
		</div>
	);
}
