import { getOrderById } from "@/app/actions/actions";
import SeeReceiptButton from "../../../components/SeeReceiptButton";

export default async function page({ params }: { params: Promise<{ orderId: string }> }) {
	// params.orderId tendrá el id de la orden
	const { orderId } = await params;
	const order = await getOrderById(orderId);

	return (
		<>
			<div className="mt-14 flex flex-col mb-2 justify-between items-center mx-2">
				<h1 className=" text-2xl font-bold px-2">Order Details</h1>
				<div className="w-full flex gap-2 justify-between">
					<button className="btn btn-sm btn-error btn-soft rounded-md">Eliminar pago</button>
					<button className="btn btn-sm btn-success rounded-md">Aprobar pago</button>
				</div>
			</div>
			<div className="px-2 flex flex-col md:flex-row w-full gap-4">
				<div className="flex flex-col gap-2 ">
					<div className="flex flex-col gap-2 p-2 bg-base-100 rounded-box shadow-md">
						<span className="text-xs font-bold">Método de pago:</span>
						<p>Banco: {order?.bank}</p>
						<p>Referencia de Pago: {order?.paymentReference}</p>
						<p>Cantidad de Tickets: {order?.ticketCount}</p>
						<p>
							Total: {order?.amount} {order?.currency}
						</p>
						<p>Estado: {order?.status} </p>
						<SeeReceiptButton paymentProofUrl={order?.paymentProof || ""} />
					</div>

					<div className="flex flex-col gap-2 p-2 bg-base-100 rounded-box shadow-md">
						<span className="text-xs font-bold">Datos del cliente:</span>
						<p>Cliente: {order?.buyerName}</p>
						<p>Correo del Cliente: {order?.buyerEmail}</p>
						<p>Teléfono del Cliente: {order?.buyerPhone}</p>
					</div>

					<section className="flex flex-col gap-2 p-2 bg-base-100 rounded-box shadow-md">
						<span className="text-xs font-bold">información de Tickets</span>
						<p>
							Tickets asignados:{" "}
							{order?.ticketsAssigned || order?.ticketsAssigned.length === 0
								? "'No tiene tickets asignados'"
								: order?.ticketsAssigned}
						</p>

						{/* Mostrar detalles de la rifa */}
						{order?.raffleId && (
							<div className="mt-4 flex flex-col gap-2 ">
								<p className="text-pretty text-xs">
									Orden Pertenece al sorteo: {typeof order.raffleId === 'object' && 'title' in order.raffleId ? order.raffleId.title : 'N/A'}
								</p>
								<img
									src={typeof order.raffleId === 'object' && 'imageUrl' in order.raffleId ? order.raffleId.imageUrl : ''}
									alt="Raffle Image"
									className="max-h-24 object-cover rounded-md"
								/>
							</div>
						)}
					</section>
				</div>
			</div>
		</>
	);
}
