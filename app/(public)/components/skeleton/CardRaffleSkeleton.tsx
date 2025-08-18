export default function CardRaffleSkeleton() {
	return (
		<>
			<div className="card bg-base-100 w-80 h-96 shadow-sm">
				<div className="bg-gray-500 w-full h-full rounded-t-lg"></div>
				<div className="card-body">
					<div className="h-4 bg-gray-200 w-1/2 rounded mb-2"></div>
					<div className="h-4 bg-gray-200 w-full rounded mb-2"></div>
					<span className="badge badge-neutral h-6 w-14 first-letter:uppercase">
						
					</span>
					<div className="card-actions justify-end">
						<button className="btn w-full btn-soft rounded-md">Participa</button>
					</div>
				</div>
			</div>
		</>
	);
}
