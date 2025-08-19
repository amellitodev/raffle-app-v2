import { getRaffleDataByTitle } from "@/app/utils/data";
import TicketIcon, { CalendarIcon, GiftIcon, UsersIcon } from "../../components/icons/icons";
type RaffleDetailPageProps = {
	params: Promise<{ title: string }>;
};
export default async function RaffleDetailPage({ params }: RaffleDetailPageProps) {
	// resolvemos los parámetros de forma asíncrona
	const resolvedParams = await params;
	// decodificamos el Url
	let raffleTitle = decodeURIComponent(resolvedParams.title).trim().replace(/-/g, " ");

	// obtenemos los datos
	let raffleDataByTitle = (await getRaffleDataByTitle(raffleTitle)).data;
	const isRaffleActive = raffleDataByTitle?.status === "active" && "Active";

	// definimos el estado del sorteo
	const raffleStatus = isRaffleActive ? (
		<span className="badge badge-success rounded-md first-letter:uppercase">
			{isRaffleActive || "Card Status"}
		</span>
	) : (
		<span className="badge badge-error rounded-md first-letter:uppercase">Finalizado</span>
	);
	return (
		<>
			<section className="max-w-5xl mx-auto pt-24">
				<article className=" border-1 border-gray-300/40 rounded-2xl p-8 flex flex-col gap-4 shadow-xs shadow-gray-300">
					<div className="flex justify-between items-center">
						<h1 className="text-4xl font-bold">{raffleDataByTitle?.title} 🔥</h1>
						{raffleStatus}
					</div>
					<p className="text-2xl">{raffleDataByTitle?.description}</p>
				</article>

				<div className="flex pt-8 gap-8 ">
					<div className=" w-2/3 flex flex-col gap-4 border-1 border-gray-300/40 rounded-2xl p-8 shadow-xs shadow-gray-300">
						<div className="flex items-center gap-2">
							<GiftIcon className="size-8" />
							<h2 className="text-lg font-bold "> Premio Principal</h2>
						</div>
						<div className=" w-full h-96 aspect-video rounded-lg overflow-hidden bg-muted">
							<img
								className="w-full h-full object-cover"
								src={raffleDataByTitle?.imageUrl}
								alt={raffleDataByTitle?.imageUrl}
							/>
						</div>
						<p className="text-2xl ">Premio principal </p>
						<p className="text-3xl  font-bold">$ {raffleDataByTitle?.ticketPrice}</p>
					</div>

					<div className="flex flex-col w-full gap-4 border-1 border-gray-300/40 rounded-2xl p-8 shadow-xs shadow-gray-300">
						<div className="flex items-center gap-2">
							<TicketIcon className="size-8" />
							<h3 className="text-lg font-bold">Compra tu Ticket</h3>
						</div>
					</div>
				</div>

				<article className=" border-1 mt-8 border-gray-300/40 rounded-2xl p-8 flex flex-col gap-4 shadow-xs shadow-gray-300">
					<div className="flex items-center gap-2">
						<UsersIcon className="size-8" />
						<p className="text-lg font-bold">Progreso de la rifa</p>
					</div>
				</article>

				<article className=" border-1 mt-8 border-gray-300/40 rounded-2xl p-8 flex flex-col gap-4 shadow-xs shadow-gray-300">
					<div className="flex items-center gap-2">
						<CalendarIcon className="size-8" />
						<p>Fechas Importantes</p>
					</div>
				</article>

				<h1 className="mt-24">Detalle del Sorteo individual</h1>
				<pre>{JSON.stringify(raffleDataByTitle, null, 2)}</pre>
			</section>
		</>
	);
}
