import Link from "next/link";
import ListRaffle from "../components/ListRaffle";
import { Suspense } from "react";

export const revalidate = 60;
export default function SorteoPage() {
	return (
		<>
			<section className="h-svw bg-slate-50 ">
				<div className="flex flex-col gap-2 p-2 mx-2 mt-14 mb-8   rounded-box shadow-md">
					{/* <p className="text-sm">
						Crea un nuevo sorteo para que los usuarios puedan participar.
					</p>
					<Link
						href="/dashboard/sorteo/nuevo-sorteo"
						className="btn btn-primary rounded-md p-4"
					>
						Crea Nuevo Sorteo
					</Link> */}
				</div>
				<Suspense fallback={<p className="text-center">Cargando sorteos...</p>}>
					<ListRaffle />
				</Suspense>
			</section>
		</>
	);
}
