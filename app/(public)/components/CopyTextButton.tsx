"use client";
import { useState } from "react";
import { CopySquareIcons } from "./icons/icons";

interface Props {
	textToCopy: string;
}

export default function CopyTextButton({ textToCopy }: Props) {
	const [showToast, setShowToast] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			setShowToast(true);
			setTimeout(() => setShowToast(false), 1000); // desaparece en 1s
		} catch (err) {
			console.error("Error al copiar: ", err);
		}
	};

	return (
		<div className="relative inline-block">
			<button
				type="button" // ❗ evita que dispare submit en formularios
				onClick={handleCopy}
				aria-label="Copiar texto"
				className="flex items-center hover:bg-gray-200 p-1 rounded-md transition cursor-pointer"
			>
				<CopySquareIcons className="size-4" />
			</button>

			{showToast && (
				<div className="toast toast-end z-10 absolute -top-12 p-0">
					<div className="alert alert-sm p-2">
						<span>Texto copiado ✅</span>
					</div>
				</div>
			)}
		</div>
	);
}
