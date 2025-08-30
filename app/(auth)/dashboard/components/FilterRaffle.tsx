import DateDisplay from "@/app/(public)/components/DateDisplay";
import { IRaffle } from "@/app/types/types";
import { EyeIcons, UpdateIcon } from "./icons/Icons";
import Link from "next/link";

export default function FilterRaffle({ raffles }: { raffles: IRaffle[] }) {
	if (!raffles || raffles.length === 0) {
		return <div className="text-center p-4">No hay sorteos disponibles.</div>;
	}
	return (
		<>
			{raffles.map((raffle) => {
				const isCompleted = raffle.status === "completed" ? "bg-gray-100" : "";
				return (
					<li key={raffle._id} className={`list-row ${isCompleted}`}>
						<div>
							<img className="size-20 object-cover rounded-box" src={raffle.imageUrl} />
						</div>
						<div className="flex flex-col gap-1">
							<div className="text-xs truncate">{raffle.title}</div>
							<div className="text-xs uppercase font-semibold opacity-60">
								<DateDisplay date={raffle.raffleDate} className="text-xs" />
							</div>
							<p className="list-col-wrap text-xs line-clamp-2">
								{raffle.description}
							</p>
							<div className="flex gap-4 items-center">
								<EyeIcons className="size-4" />
								<Link
									href={`/dashboard/ordenes/${raffle._id}`}
									className="link link-primary rounded-md text-xs"
								>
									Órdenes
								</Link>
								<Link
									href={`/dashboard/tickets/${raffle._id}`}
									className="link link-primary rounded-md text-xs"
								>
									Tickets
								</Link>
							</div>
						</div>
						<div className="flex h-full items-center justify-center">
							<Link
								href={`/dashboard/sorteo/${raffle._id}`}
								className="btn btn-soft btn-primary rounded-md text-xs"
							>
								<UpdateIcon className="size-2" />
								
							</Link>
						
						
						</div>
					</li>
				);
			})}
		</>
	);
}
