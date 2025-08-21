import DateDisplay from "@/app/(public)/components/DateDisplay";
import { IRaffle } from "@/app/types/types";
import { EyeIcons, UpdateIcon } from "./icons/Icons";

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
							<img className="size-10 rounded-box" src={raffle.imageUrl} />
						</div>
						<div className="flex flex-col gap-1">
							<div className="text-xs truncate">{raffle.title}</div>
							<div className="text-xs uppercase font-semibold opacity-60">
								<DateDisplay date={raffle.raffleDate} className="text-xs" />
							</div>
							<p className="list-col-wrap text-xs line-clamp-2">
								{raffle.description}
							</p>
						</div>
						<div className="flex flex-col gap-1">
							<button className="btn btn-square btn-ghost rounded-md">
								<UpdateIcon className="size-6" />
							</button>
							<button className="btn btn-square btn-ghost rounded-md">
								<EyeIcons className="size-6" />
							</button>
						</div>
					</li>
				);
			})}
		</>
	);
}
