export default function ModalErrorComponent({ error }: { error: string | null }) {
	return (
		<> {error && (
			<dialog id="my_modal_6" className="modal">
				<form method="dialog" className="modal-box">
					<h2 className="font-bold text-lg">Error</h2>
					<p className="py-4">{error}</p>
					<div className="modal-action">
						<button className="btn">Close</button>
					</div>
				</form>
			</dialog>
			)}
		</>
	);
}
