"use client";


import { getSignedUrl } from "@/app/utils/updateImageCloudinary";
import { useState } from "react";


export default function SeeReceiptButton({ paymentProofUrl }: { paymentProofUrl: string }) {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [showPreview, setShowPreview] = useState<boolean>(false);
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
		// para utilizar la imagen ya cacheada
		if (imageUrl) {
			setShowPreview(true);
			return;
		}
		const signedUrl = await getSignedUrl(paymentProofUrl || "");
		console.log("🚀 ~ handleSeeReceipt ~ signedUrl:", signedUrl)
		setImageUrl(signedUrl);
		setShowPreview(true);
	};

	const handleCloseReceipt = () => {
		setIsOpenImage(false);
	};

	const handleOpenReceipt = () => {
		if (imageUrl) {
			setIsOpenImage(true);
		}
	};


	const handleClosePreview = () => {
		// esconde la image con css para no tener que hacer una nueva petición
		setShowPreview(false);
	};

	return (
		<>
			<button className="btn btn-info rounded-md" onClick={() => handleSeeReceipt(paymentProofUrl)}>
				Ver Comprobante de pago
			</button>
			<button className="btn rounded-md" onClick={handleClosePreview}>
				Cerrar Comprobante
			</button>
			{imageUrl && showPreview && (
				<div onClick={handleOpenReceipt}>
					<span>Comprobante de pago</span>
					<img src={imageUrl} alt="Comprobante de pago" className="max-w-xs cursor-pointer" />
				</div>
			)}

			{/* zoom a la imagen del pago */}
			{imageUrl && isOpenImage && (
				<div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<button
						className="absolute top-4 right-4 text-white btn btn-xs btn-primary rounded-md"
						onClick={handleCloseReceipt}
					>
						X
					</button>
					<img src={imageUrl} alt="Payment Proof" className="max-w-xs" />
				</div>
			)}
		</>
	);
}
