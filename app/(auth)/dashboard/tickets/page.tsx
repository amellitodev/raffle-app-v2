
// import PaginateTickets from "../components/PaginateTickets";


export default function page() {
	return (
		<>
		<div className="p-4  mt-14  rounded-lg shadow-md bg-base-100 mx-2">

			<h1 className="text-2xl font-bold">Mis Tickets</h1>
			<p className="text-sm text-gray-500">Aquí puedes ver todos tus tickets comprados.</p>
		</div>
            {/* // debe ser una función aparte para recuperar todos los tickets pero esto no es viable por la cantidad de Tickets */}

			{/* <PaginateTickets raffleId="" /> */}
		</>
	);
}
