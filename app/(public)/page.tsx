// import { Suspense } from "react";
// import HeroComponent from "./components/HeroComponent";
// import RafflesComponent from "./components/RafflesComponent";
// import CardRaffleSkeleton from "./components/skeleton/CardRaffleSkeleton";

import { getRaffleData } from "../actions/raffle.action";
import DateDisplay from "./components/DateDisplay";
import FormNewOrder from "./components/FormNewOrder";
import ModalInfo from "./components/ModalInfo";
import PublicProgressComponent from "./components/PublicProgressComponent";
import VerifyOrder from "./components/VerifyOrder";

// Revalidar cada 60 segundos
export const revalidate = 60;

export default async function Home() {
	const raffle = await getRaffleData();
	const raffleData = raffle.data[0];
	return (
		<div className="font-sans min-h-screen p-2 mt-12 sm:mt-0 pb-20 gap-16 sm:p-20 ">
			<main className="max-w-5xl mx-auto pt-15 px-2 flex flex-col  gap-4 md:gap-8">
				<div className="flex justify-center items-center -mb-8 z-10">
					<ModalInfo />

				<img className="size-96" src="/LOGO2ATRAPATUSUERTECONLISKEL.webp" alt="" />
				</div>
				<div className="flex justify-center items-center bg-gradient-to-b from-pink-800 to-pink-500 p-4 rounded-4xl gap-4 animate-bounce">
					<h1 className="text-2xl md:text-4xl text-center  font-bold text-white ">
						🔥Compra Tu Boleto Ya! 🔥
					</h1>
				</div>

				<div className="flex flex-col md:flex-row gap-8 ">
					<div className="w-full md:w-2/3 flex flex-col gap-4 border-1 border-gray-300/40 rounded-2xl p-4 shadow-xs shadow-gray-300">
						<div className=" w-full h-[500px] md:h-[740px] aspect-video rounded-lg overflow-hidden bg-muted">
							<img
								className="w-full h-full object-cover aspect-auto"
								src={raffleData?.imageUrl}
								alt={raffleData?.title || "Imagen del premio"}
							/>
						</div>
						<p className="text-3xl font-bold text-pink-500 text-center ">
							{" "}
							⭐{raffleData?.rafflePrize} ⭐
						</p>
						<p className="text-md text-center"> {raffleData?.description} </p>

						<PublicProgressComponent
							maxTickets={raffleData?.maxTickets}
							raffleId={raffleData?._id}
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
										{raffleData?.ticketPriceBolivar} Bs.
									</p>
								</div>

								<div className="flex hover:skeleton hover:bg-pink-700 text-white font-bold flex-col items-center gap-2 rounded-2xl bg-gradient-to-b from-pink-800 to-pink-500 p-4 min-w-1/2 ">
									<span>💵 USD</span>
									<p className="text-2xl text-white">
										{raffleData?.ticketPriceDolar} $
									</p>
								</div>
							</div>
							<span className="w-full text-center">La compra mínima es de 2 tickets</span>
						</article>

						<article className="text-3xl  font-bold  p-8 flex align-middle gap-4 shadow-xs ">
							<p className="text-pink-500">Fecha de sorteo</p>
							<DateDisplay date={raffleData?.raffleDate} />
						</article>
					</div>

					<div className="flex flex-col w-full gap-4 border-1 border-gray-300/40 rounded-2xl p-4 shadow-xs shadow-gray-300">
						<div className="flex items-center text-2xl justify-center gap-2">
							🎫
							<h3 className="text-2xl font-bold">Compra tu Ticket</h3>
						</div>

						<FormNewOrder
							ticketPriceBolivar={raffleData?.ticketPriceBolivar}
							ticketPriceDolar={raffleData?.ticketPriceDolar}
							paymentMethod={raffleData?.paymentMethod}
							maxTickets={raffleData?.maxTickets}
							raffleId={raffleData?._id}
						/>
					</div>
				</div>

				{/* <HeroComponent />

				<Suspense
					fallback={
						<>
							<div className=" mx-auto max-w-5xl px-4">
								<h2 className="text-3xl font-bold">🔥 Sorteos Activos</h2>
								<section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
									<CardRaffleSkeleton />
									<CardRaffleSkeleton />
									<CardRaffleSkeleton />
								</section>
							</div>
						</>
					}
				>
					<RafflesComponent />
				</Suspense> */}

				<VerifyOrder raffleId={raffleData?._id} />
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
		</div>
	);
}
