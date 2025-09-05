import { IRaffle } from "@/app/types/types";
import FilterRaffle from "./FilterRaffle";
import { getRaffleData } from "@/app/actions/raffle.action";

export default async function ListRaffle() {
	const data = await getRaffleData();
	const raffles = data?.data || [];

	const isRaffleActive = raffles.filter((raffle: IRaffle) => raffle.status === "active");
	// const isCompleted = raffles.filter((raffle: IRaffle) => raffle.status === "completed");
	return (
		<>
			<div className="px-2 flex flex-col gap-4 w-full h-full bg-slate-50">
				<ul className="list text-base-300 text-2xl rounded-box shadow-md overflow-scroll overflow-x-hidden bg-slate-50">
					<span className="p-4 text-slate-950">Sorteo Activo</span>
					<FilterRaffle raffles={isRaffleActive} />
				</ul>
				{/* <ul className="list text-base-300 text-2xl rounded-box shadow-md overflow-scroll overflow-x-hidden h-96 bg-slate-50">
					<span className="p-4">Sorteo Completado</span>
					<FilterRaffle raffles={isCompleted} />
				</ul> */}
			</div>
		</>
	);
}
