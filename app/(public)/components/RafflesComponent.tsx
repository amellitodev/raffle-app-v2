import { IRaffle } from "@/app/types/types";
import CardRaffle from "./CardRaffle";
import { getRaffleData } from "@/app/actions/raffle.action";

export default async function RafflesComponent() {
	const data = await getRaffleData();
	const raffles = data?.data || [];

	const isRaffleActive = raffles.filter((raffle: IRaffle) => raffle.status === "active").reverse();
	const isCompleted = raffles.filter((raffle: IRaffle) => raffle.status === "completed").reverse();

	return (
		<>
			<section className=" mx-auto max-w-5xl px-4">
				<h2 className="text-3xl font-bold pb-8">🔥 Sorteos Activos</h2>
				<div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
					{isRaffleActive.map((raffle: IRaffle) => (
						<div key={raffle._id}>
							<CardRaffle raffle={raffle} />
						</div>
					))}
				</div>
			</section>
			<section className=" mx-auto max-w-5xl px-4 pt-8">
				<h2 className="text-3xl font-bold pb-8">⭐ Sorteos Pasados</h2>
				<div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
					{isCompleted.map((raffle: IRaffle) => (
						<div key={raffle._id}>
							<CardRaffle raffle={raffle} />
						</div>
					))}
				</div>
			</section>
		</>
	);
}
