
interface Props {
	setCount: React.Dispatch<React.SetStateAction<number>>;
	count: number;
}

export default function TicketCount({ count, setCount }: Props) {
	const incrementCount = () => setCount(count + 1);
	const decrementCount = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	return (
		<>
			{/* Cantidad de tickets */}
			<div className="flex flex-col justify-around items-center py-4 border rounded-md  border-gray-800/30  ">
				<input name="ticketCount" type="text" value={count} readOnly hidden />
				<div className="flex items-center justify-around w-full">
					<button
						className="btn btn-md btn-error btn-outline rounded-md hover:bg-white hover:text-slate-950"
						type="button"
						onClick={decrementCount}
					>
						-
					</button>
					<p className="text-4xl text-pink-500 font-bold">{count}</p>
					<button
						className="btn btn-md btn-success btn-outline rounded-md hover:bg-white hover:text-slate-950"
						type="button"
						onClick={incrementCount}
					>
						+
					</button>
				</div>
				<span className="text-md">Cantidad de tickets</span>
			</div>
		</>
	);
}
