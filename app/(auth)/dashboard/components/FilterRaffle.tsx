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
					<li key={raffle._id} className={`list-row bg-slate-50 ${isCompleted} `}>
						<div>
							<img
								className="size-32 object-cover rounded-box"
								src={raffle.imageUrl}
							/>
						</div>
						<div className="flex flex-col gap-1 text-md text-slate-950">
							<div className=" truncate">{raffle.title}</div>

							<p className="list-col-wrap text-base  line-clamp-2">{raffle.description}</p>
							<div className=" uppercase font-semibold opacity-60">
								<DateDisplay date={raffle.raffleDate} className="" />
							</div>
							<div className="flex gap-4 items-center text-sm">
								<EyeIcons className="size-4" />
								<Link
									href={`/dashboard/ordenes/${raffle._id}`}
									className="link text-blue-500 rounded-md"
								>
									Órdenes
								</Link>
								<Link
									href={`/dashboard/tickets/${raffle._id}`}
									className="link text-blue-500 rounded-md"
								>
									Tickets
								</Link>
							</div>
						</div>
						{/* <div className="flex h-full items-center justify-center">
							<Link
								href={`/dashboard/sorteo/${raffle._id}`}
								className="btn btn-soft btn-primary rounded-md text-xs"
							>
								<UpdateIcon className="size-2" />
								
							</Link>
						
						
						</div> */}
					</li>
				);
			})}
		</>
	);
}
