"use client";

import { getSignedUrl } from "@/app/actions/actions";
import { useState } from "react";

export default function SeeReceiptButton({ paymentProofUrl }: { paymentProofUrl: string }) {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [isOpenImage, setIsOpenImage] = useState<boolean>(false);

	if (!paymentProofUrl) {
		return (
			<p className="text-xs text-black bg-warning px-2 py-1 rounded-md">
				Comprobante de pago no disponible.
			</p>
		);
	}

	// para no hacer peticiones de mas, hacer render de la url de la prueba de pago al hacer click en el botón ver comprobante
	const handleSeeReceipt = async (paymentProofUrl: string) => {
		const signedUrl = await getSignedUrl(paymentProofUrl || "");
		setImageUrl(signedUrl);
	};

	const handleOpenReceipt = () => {
		if (imageUrl) {
			setIsOpenImage(true);
		}
	};

	return (
		<>
			<button className="btn btn-info rounded-md btn-xs" onClick={() => handleSeeReceipt(paymentProofUrl)}>
				Ver Comprobante de pago
			</button>
			{imageUrl && (
				<div onClick={handleOpenReceipt}>
					<span>Comprobante de pago</span>
					<img src={imageUrl} alt="Comprobante de pago" className="max-w-xs cursor-pointer" />
				</div>
			)}
			{imageUrl && isOpenImage && (
				<div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<button
						className="absolute top-4 right-4 text-white btn btn-xs btn-primary rounded-md"
						onClick={() => setIsOpenImage(false)}
					>
						X
					</button>
					<img src={imageUrl} alt="Payment Proof" className="max-w-xs" />
				</div>
			)}
		</>
	);
}
