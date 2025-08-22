import { IRaffle } from "@/app/types/types";
import { getRaffleData } from "@/app/utils/data";
import FilterRaffle from "./FilterRaffle";

export default async function ListRaffle() {
	const data = await getRaffleData();
	const raffles = data?.data || [];
	console.log("🚀 ~ ListRaffle ~ raffles:", raffles);

	const isRaffleActive = raffles.filter((raffle: IRaffle) => raffle.status === "active");
	const isCompleted = raffles.filter((raffle: IRaffle) => raffle.status === "completed");
	return (
		<>
			<div className="px-2 w-full h-full">
				<span>Sorteos Activos</span>
				<ul className="list bg-base-100 rounded-box shadow-md overflow-scroll overflow-x-hidden h-1/2">
					<FilterRaffle raffles={isRaffleActive} />
				</ul>
				<span>Sorteos Completados</span>
				<ul className="list bg-base-100 rounded-box shadow-md overflow-scroll overflow-x-hidden h-1/2">
					<FilterRaffle raffles={isCompleted} />
				</ul>
			</div>
		</>
	);
}
