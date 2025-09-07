"use client";
import { useEffect, useState } from "react";

interface Props {
	message?: string;
	duration?: number; // 👈 opcional, por defecto 30s
}

export default function ToastSuccess({ message, duration = 1000 }: Props) {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, duration);

		return () => clearTimeout(timer); // cleanup si el componente se desmonta
	}, [duration]);

	if (!visible) return null; // 👈 oculta el toast

	return (
		<div className="toast toast-top toast-center mt-16">
			<div className="alert alert-success">
				<div className="toast-title">¡Éxito!</div>
				<div className="toast-message">{message}</div>
			</div>
		</div>
	);
}
