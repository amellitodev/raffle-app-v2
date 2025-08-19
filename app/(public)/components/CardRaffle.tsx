import { IRaffle } from "@/app/types/types";
import Link from "next/link";
import { CalendarIcon } from "./icons/icons";

interface Props {
	raffle: IRaffle;
}

export default function CardRaffle({ raffle }: Props) {
	// Determine if the raffle is active
	const isRaffleActive = raffle.status === "active" && "Active";

	// Determine the raffle status badge
	const raffleStatus = isRaffleActive ? (
		<span className="badge badge-success rounded-full first-letter:uppercase">
			{isRaffleActive || "Card Status"}
		</span>
	) : (
		<span className="badge badge-error rounded-full first-letter:uppercase">Finalizado</span>
	);

	// Format the raffle date
	const formattedDate = new Date(raffle.raffleDate).toLocaleString("es-ES", {
		dateStyle: "long",
		timeStyle: "short",
		hour12: true,
	});



	return (
		<div className="card bg-base-100 w-full md:w-80 h-96 shadow-sm">
			<figure>
				<img
					src={raffle.imageUrl || "https://via.placeholder.com/150"}
					alt={raffle.title || "Raffle Image"}
					className="card-img w-full h-full object-cover rounded-t-lg"
				/>
			</figure>
			<div className="card-body">
			{/* // Format the raffle date */}
			<span className="flex gap-2 align-middle items-center text-sm">
				<CalendarIcon className="size-4 text-yellow-400 stroke-2" /> {formattedDate}
			</span>
				<h2 className="card-title truncate">{raffle.title || "Card Title"}</h2>
				<p className="text-sm line-clamp-2">{raffle.description || "Card Description"}</p>
				{/* // Format the raffle status */}
				{raffleStatus}
				<div className="card-actions">
					<Link
						href={`/api/raffle/${raffle._id}`}
						className="btn btn-primary w-full rounded-md"
					>
						Participa
					</Link>
				</div>
			</div>
		</div>
	);
}
