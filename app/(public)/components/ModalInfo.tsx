"use client";

import { useEffect } from "react";

export default function ModalInfo() {
	useEffect(() => {
		const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
		if (modal && !modal.open) {
			modal.showModal();
		}
	}, []);

	return (
		<dialog id="my_modal_1" className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">Términos y Condiciones</h3>
				<p className="py-4 text-sm leading-relaxed">
					Disponibilidad de números: La cantidad total de números disponibles para
					cada rifa, así como su precio individual, se detallan en la página
					informativa correspondiente a dicha rifa.
					<br />
					<br />
					El sorteo se realizará a través de la plataforma SUPERGANA, adscrita a la
					Lotería del Táchira.
					<br />
					<br />
					Elegibilidad de los participantes: Solo podrán participar personas
					naturales mayores de 18 años. La compra de números implica la aceptación
					íntegra de estos términos y condiciones.
					<br />
					<br />
					Retiro y entrega de premios: Los premios deberán retirarse personalmente en
					el lugar indicado para cada rifa. Únicamente se realizará entrega a la
					dirección proporcionada por el ganador del primer premio (o premio mayor),
					previa verificación de identidad y nuevamente verificación de pago, el cual
					pasa doble proceso de validación.
					<br />
					<br />
					Autorización para uso de imagen: Los ganadores autorizan a Atrapa tu suerte
					con Liskel a capturar y difundir fotografías y/o videos de la entrega de
					premios en todas sus redes sociales y medios de comunicación, sin que ello
					genere compensación adicional.
				</p>
				<div className="modal-action">
					<form method="dialog">
						<button className="btn">Cerrar</button>
					</form>
				</div>
			</div>
		</dialog>
	);
}
