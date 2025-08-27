import ProgressComponent from "@/app/(public)/components/ProgressComponent";
import { getRaffleInfo } from "@/app/actions/actions";

export default async function DashboardPage() {
	const { raffle, orders, tickets } = await getRaffleInfo();

	
	return (
		<div className="px-4 py-6 sm:px-0 mt-6 max-w-5xl mx-auto">
			<div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">
					Bienvenido al Panel de Administración
				</h2>
				<p className="text-gray-600 mb-6">
					Desde aquí puedes gestionar todos los sorteos, órdenes y tickets.
				</p>

				{/* Cards de resumen */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-white p-6 rounded-lg shadow">
						<h3 className="text-lg font-medium text-gray-900">Ultimo Sorteo Activo</h3>
						<p className="text-3xl font-bold text-blue-600 mt-2">{raffle?.title}</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow">
						<h3 className="text-lg font-medium text-gray-900">Órdenes Recibidas</h3>
						<p className="text-3xl font-bold text-green-600 mt-2">
							{orders.toLocaleString()}
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow">
						<h3 className="text-lg font-medium text-gray-900">Tickets Vendidos</h3>
						<p className="text-3xl font-bold text-purple-600 mt-2">
							{tickets.toLocaleString()}
						</p>
					</div>
				</div>
				<ProgressComponent />
			</div>
		</div>
	);
}
