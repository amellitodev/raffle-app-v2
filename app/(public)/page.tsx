import { Suspense } from "react";
import HeroComponent from "./components/HeroComponent";
import RafflesComponent from "./components/RafflesComponent";
import CardRaffleSkeleton from "./components/skeleton/CardRaffleSkeleton";

// Revalidar cada 60 segundos
export const revalidate = 60;

export default function Home() {
	return (
		<div className="font-sans min-h-screen p-2 mt-12 sm:mt-0 pb-20 gap-16 sm:p-20 ">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<HeroComponent />

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
				</Suspense>
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
		</div>
	);
}
