
import PaginateTickets from "../../components/PaginateTickets";

export default async function page({ params }: { params: Promise<{ raffleId: string }> }) {
    const { raffleId } = await params;
	return (
		<>
			<div className="p-4  mt-14  rounded-lg shadow-md bg-base-100 mx-2">
				<h1 className="text-2xl font-bold">Tickets del sorteo: </h1>
				<p className="text-sm text-gray-500">
					Aquí puedes ver todos tus tickets comprados.
				</p>
			</div>

			<PaginateTickets raffleId={raffleId} />
		</>
	);
}
