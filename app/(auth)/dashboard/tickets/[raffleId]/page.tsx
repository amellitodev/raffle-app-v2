
import PaginateTickets from "../../components/PaginateTickets";
import { Suspense } from 'react';

export default async function page({ params }: { params: { raffleId: string } }) {
    const { raffleId } = await params;
    console.log("🚀 ~ page ~ raffleId:", raffleId)
	return (
		<>
		<Suspense fallback={<div>Loading...</div>}>
			<PaginateTickets raffleId={raffleId} />
		</Suspense>
		</>
	);
}
