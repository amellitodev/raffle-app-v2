export const isLessThousand = (ticketNumber: number) => {
		// retornar string con ceros a la izquierda
		if (ticketNumber < 1000) {
			// para concatenar ceros a la izquierda y completar a 4 dígitos
			return ticketNumber.toString().padStart(4, "0");
		}
		return ticketNumber.toString();
	};