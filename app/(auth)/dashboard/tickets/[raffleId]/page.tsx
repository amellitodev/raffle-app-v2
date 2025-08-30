
import PaginateTickets from "../../components/PaginateTickets";

export default async function page({ params }: { params: Promise<{ raffleId: string }> }) {
    const { raffleId } = await params;
	return (
		<>
			
			<PaginateTickets raffleId={raffleId} />
		</>
	);
}
