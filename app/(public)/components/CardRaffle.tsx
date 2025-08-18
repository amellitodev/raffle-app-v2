import { IRaffle } from "@/app/types/types";
import Link from "next/link";

interface Props {
	raffle: IRaffle;
}

export default function CardRaffle({ raffle }: Props) {
	return (
		<div className="card bg-base-100 w-80 h-96 shadow-sm">
        
			<figure>
				<img
					src={raffle.imageUrl || "https://via.placeholder.com/150"}
					alt={raffle.title || "Raffle Image"}
					className="card-img w-full h-full object-cover rounded-t-lg"
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">{raffle.title || "Card Title"}</h2>
				<p>{raffle.description || "Card Description"}</p>
				<span className="badge badge-success first-letter:uppercase">
					{raffle.status || "Card Status"}
				</span>
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
