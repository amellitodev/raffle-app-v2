import { deleteRaffle, updateRaffle } from "@/app/actions/raffle.action";
import FormUpdateRaffle from "../../components/FormUpdateRaffle";

interface Props {
	params: Promise<{
		raffleId: string;
	}>;
}

export default async function page({ params }: Props) {
	const { raffleId } = await params;
	return (
		<>
			<form action={updateRaffle} className=" mt-14 gap-2 max-w-5xl mx-auto">
				<FormUpdateRaffle raffleId={raffleId} />
			</form>


			<form action={deleteRaffle} className="flex justify-end-safe mt-14 gap-2 max-w-5xl mx-auto">
				<input type="text" name="raffleId" hidden value={raffleId} />
				<button className="btn btn-soft btn-secondary rounded-md">Eliminar Sorteo</button>
			</form>
		</>
	);
}
