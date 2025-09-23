// import TicketIcon, {
// 	CalendarIcon,
// 	GiftIcon,
// 	MoneyIcon,
// 	UsersIcon,
// } from "../../components/icons/icons";
import Layout from "../../layout";
import DateDisplay from "../../components/DateDisplay";
import PublicProgressComponent from "../../components/PublicProgressComponent";
import FormNewOrder from "../../components/FormNewOrder";
import { getRaffleDataByTitle } from "@/app/actions/raffle.action";
type RaffleDetailPageProps = {
	params: Promise<{ title: string }>;
};
export default async function RaffleDetailPage({ params }: RaffleDetailPageProps) {
	// resolvemos los parámetros de forma asíncrona
	const resolvedParams = await params;
	// decodificamos el Url reemplazando los guiones por espacios

	const raffleTitle = decodeURIComponent(resolvedParams.title).trim();

	// obtenemos los datos
	const raffleDataByTitle = (await getRaffleDataByTitle(raffleTitle)).data;
	const isRaffleActive = raffleDataByTitle?.status === "active" && "Active";

	// definimos el estado del sorteo
	// const raffleStatus = isRaffleActive ? (
	// 	<span className="badge badge-success rounded-md first-letter:uppercase">
	// 		{isRaffleActive || "Card Status"}
	// 	</span>
	// ) : (
	// 	<span className="badge badge-error rounded-md first-letter:uppercase">Finalizado</span>
	// );

	if (!raffleDataByTitle) {
		return (
			<Layout>
				<section className="max-w-5xl mx-auto pt-24">
					<div className="p-8 text-center">
						<h1 className=" text-2xl font-bold">Rifa no encontrada</h1>
						<p>La rifa que buscas no existe o ha sido eliminada.</p>
					</div>
				</section>
			</Layout>
		);
	}

	return (
		<section className="max-w-5xl mx-auto pt-24 px-2 flex flex-col  gap-4 md:gap-8">
			<div className="flex justify-center items-center bg-gradient-to-b from-pink-800 to-pink-500 p-4 rounded-4xl gap-4 animate-bounce">
				<h1 className="text-4xl text-center  font-bold text-white ">
					🔥Compra Tu Boleto Ya! 🔥
				</h1>
			</div>

			<div className="flex flex-col md:flex-row gap-8 ">
				<div className="w-full md:w-2/3 flex flex-col gap-4 border-1 border-gray-300/40 rounded-2xl p-4 shadow-xs shadow-gray-300">
					
					<div className=" w-full h-[540px] aspect-video rounded-lg overflow-hidden bg-muted">
						<img
							className="w-full h-full object-cover aspect-video"
							src={raffleDataByTitle?.imageUrl}
							alt={raffleDataByTitle?.title || "Imagen del premio"}
						/>
					</div>
					<p className="text-3xl font-bold text-pink-500 text-center ">
						{" "}
						⭐{raffleDataByTitle?.rafflePrize} ⭐
					</p>
					<p className="text-md text-center"> {raffleDataByTitle?.description} </p>

					<PublicProgressComponent
						maxTickets={raffleDataByTitle?.maxTickets}
						raffleId={raffleDataByTitle?._id}
					/>
					<article className=" border-1 mt-8 border-gray-300/40 rounded-2xl p-8 flex flex-col gap-4 shadow-xs shadow-gray-300">
						<div className="flex justify-center items-center gap-2 text-violet-950 bg-amber-400 p-2 animate-bounce rounded-4xl">
							{/* <MoneyIcon className="size-6" /> */}⚡
							<p className="text-lg font-bold">Precios por ticket</p>
						</div>
						<div className="flex gap-4 justify-between">
							<div className="flex hover:skeleton hover:bg-pink-700 text-white font-bold flex-col items-center gap-2 rounded-2xl bg-gradient-to-b from-pink-800 to-pink-500 p-4 min-w-1/2 ">
								<span>💰 BS</span>
								<p className="text-2xl text-white">
									{raffleDataByTitle?.ticketPriceBolivar} Bs.
								</p>
							</div>

							<div className="flex hover:skeleton hover:bg-pink-700 text-white font-bold flex-col items-center gap-2 rounded-2xl bg-gradient-to-b from-pink-800 to-pink-500 p-4 min-w-1/2 ">
								<span>💵 USD</span>
								<p className="text-2xl text-white">
									{raffleDataByTitle?.ticketPriceDolar} $
								</p>
							</div>
						</div>
					</article>

					<article className="text-3xl  font-bold  p-8 flex align-middle gap-4 shadow-xs ">
						<p className="text-pink-500">Fecha de sorteo</p>
						<DateDisplay date={raffleDataByTitle?.raffleDate} />
					</article>
				</div>

				<div className="flex flex-col w-full gap-4 border-1 border-gray-300/40 rounded-2xl p-4 shadow-xs shadow-gray-300">
					<div className="flex items-center text-2xl justify-center gap-2">
						🎫
						<h3 className="text-3xl font-bold">Compra tu Ticket</h3>
					</div>

					<FormNewOrder
						ticketPriceBolivar={raffleDataByTitle?.ticketPriceBolivar}
						ticketPriceDolar={raffleDataByTitle?.ticketPriceDolar}
						paymentMethod={raffleDataByTitle?.paymentMethod}
						maxTickets={raffleDataByTitle?.maxTickets}
						raffleId={raffleDataByTitle?._id}
					/>
				</div>
			</div>
		</section>
	);
}
