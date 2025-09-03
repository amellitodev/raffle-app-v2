"use client";

export default function ModalComponent() {
	return (
		<>
			<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h3 className="font-bold text-lg"> ✨ Hola! muchas gracias por participar!  </h3>
					<p>
						Gracias por participar, nuestro equipo validará tu pago, en un lapso de 12 a
						24 horas tus tickets serán enviados por correo electrónico.
					</p>
					{/* <p className="py-4">Presiona la tecla ESC o haz clic en el botón de abajo para cerrar</p> */}
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn">Cerrar</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}
