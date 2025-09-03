import { getTicketInfoByRaffleId } from "@/app/actions/ticket.actions";
interface Props {
	maxTickets: number;
	raffleId: string;
}

export default async function PublicProgressComponent({ maxTickets, raffleId }: Props) {
	const { tickets } = await getTicketInfoByRaffleId(raffleId);
	const soldTickets = tickets;
	// const remainingTickets = maxTickets - soldTickets;
	const progressPercentage = (soldTickets / maxTickets) * 100;

	return (
		<div className="flex flex-col gap-4  p-4 rounded-lg shadow ">
			<div className="flex justify-center text-3xl text-pink-500 items-center gap-2">
				<p className=" font-bold">Progreso de la rifa</p>
			</div>
			<div className="flex items-center text-xl font-bold justify-between mb-2">
				<div className="flex flex-col items-center align-middle text-center ">
					<span>Vendidos</span>
					<p className="text-2xl font-bold">🔥{parseFloat(progressPercentage.toFixed(2))} %</p>
				</div>

				<div className="flex flex-col items-center align-middle ">
					<span>Max Tickets</span>
					<span>{maxTickets.toLocaleString()}</span>
				</div>
			</div>
			<progress
				className="progress progress-warning w-full skeleton h-6"
				value={soldTickets}
				max={maxTickets}
			></progress>
		</div>
	);
}
