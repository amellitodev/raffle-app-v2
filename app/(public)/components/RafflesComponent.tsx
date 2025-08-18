import { IRaffle } from "@/app/types/types";
import { getRaffleData } from "@/app/utils/data";
import CardRaffle from "./CardRaffle";

export default async function RafflesComponent() {
	const data = await getRaffleData();
	const raffles = data?.data || [];

	return (
		<>
			<h2 className="text-2xl font-bold">Sorteos Recientes</h2>
			<section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{raffles.map((raffle: IRaffle) => (
					<div key={raffle._id}>
						<CardRaffle raffle={raffle} />
					</div>
				))}
			</section>
		</>
	);
}
