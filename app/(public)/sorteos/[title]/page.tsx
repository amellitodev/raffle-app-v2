import { getRaffleDataByTitle } from "@/app/utils/data";
import TicketIcon, { CalendarIcon, GiftIcon, UsersIcon } from "../../components/icons/icons";
import FormOrder from "../../components/FormOrder";
import Layout from "../../layout";
import DateDisplay from "../../components/DateDisplay";
type RaffleDetailPageProps = {
	params: Promise<{ title: string }>;
};
export default async function RaffleDetailPage({ params }: RaffleDetailPageProps) {
	// resolvemos los parámetros de forma asíncrona
	const resolvedParams = await params;
	// decodificamos el Url
	const raffleTitle = decodeURIComponent(resolvedParams.title).trim().replace(/-/g, " ");

	// obtenemos los datos
	const raffleDataByTitle = (await getRaffleDataByTitle(raffleTitle)).data;
	const isRaffleActive = raffleDataByTitle?.status === "active" && "Active";

	// definimos el estado del sorteo
	const raffleStatus = isRaffleActive ? (
		<span className="badge badge-success rounded-md first-letter:uppercase">
			{isRaffleActive || "Card Status"}
		</span>
	) : (
		<span className="badge badge-error rounded-md first-letter:uppercase">Finalizado</span>
	);

	if (!raffleDataByTitle) {
		return (
			<Layout>
				<section className="max-w-5xl mx-auto pt-24">
					<div className="p-8 text-center">
						<h1 className="text-2xl font-bold">Rifa no encontrada</h1>
						<p>La rifa que buscas no existe o ha sido eliminada.</p>
					</div>
				</section>
			</Layout>
		);
	}

	return (
		<section className="max-w-5xl mx-auto pt-24 px-4">
			<article className=" border-1 border-gray-300/40 rounded-2xl p-8 flex flex-col gap-4 shadow-xs shadow-gray-300">
				<div className="flex justify-between items-center">
					<h1 className="text-4xl font-bold">{raffleDataByTitle?.title} 🔥</h1>
					{raffleStatus}
				</div>
				<p className="text-2xl">{raffleDataByTitle?.description}</p>
			</article>

			<div className="flex flex-col md:flex-row pt-8 gap-8 ">
				<div className="w-full md:w-2/3 flex flex-col gap-4 border-1 border-gray-300/40 rounded-2xl p-8 shadow-xs shadow-gray-300">
					<div className="flex items-center gap-2">
						<GiftIcon className="size-8" />
						<h2 className="text-lg font-bold "> Premio Principal</h2>
					</div>
					<div className=" w-full h-96 aspect-video rounded-lg overflow-hidden bg-muted">
						<img
							className="w-full h-full object-cover aspect-video"
							src={raffleDataByTitle?.imageUrl}
							alt={raffleDataByTitle?.title || "Imagen del premio"}
						/>
					</div>
					<p className="text-2xl ">{raffleDataByTitle?.rafflePrize} </p>
					<p className="text-3xl  font-bold">$ {raffleDataByTitle?.ticketPriceDolar}</p>
					<article className=" border-1 mt-8 border-gray-300/40 rounded-2xl p-8 flex flex-col gap-4 shadow-xs shadow-gray-300">
						<div className="flex items-center gap-2">
							<UsersIcon className="size-8" />
							<p className="text-lg font-bold">Progreso de la rifa</p>
						</div>
						<progress
							className="progress progress-warning w-full"
							value={60}
							max="100"
						></progress>
					</article>

					<article className=" border-1 mt-8 border-gray-300/40 rounded-2xl p-8 flex flex-col gap-4 shadow-xs shadow-gray-300">
						<div className="flex items-center gap-2">
							<CalendarIcon className="size-8" />
							<p className="text-lg font-bold">Fechas Importantes</p>
						</div>
						<DateDisplay date={raffleDataByTitle?.raffleStart}/>
						<DateDisplay date={raffleDataByTitle?.raffleDate}/>
					</article>
				</div>

				<div className="flex flex-col w-full gap-4 border-1 border-gray-300/40 rounded-2xl p-8 shadow-xs shadow-gray-300">
					<div className="flex items-center gap-2">
						<TicketIcon className="size-8" />
						<h3 className="text-lg font-bold">Compra tu Ticket</h3>
					</div>

					<FormOrder
						ticketPriceDolar={raffleDataByTitle?.ticketPriceDolar}
						ticketPriceBolivar={raffleDataByTitle?.ticketPriceBolivar}
						raffleId={raffleDataByTitle?._id}
						paymentMethod={raffleDataByTitle?.paymentMethod}
					/>
				</div>
			</div>
		</section>
	);
}
