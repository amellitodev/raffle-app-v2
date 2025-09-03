"use client";
import { useState, useEffect } from "react";
import TicketCount from "./TicketCount";
import TicketPrice from "./TicketPrice";
import TicketTotal from "./TicketTotal";
import TicketUserData from "./TicketUserData";
import TicketPaymentMethod from "./TicketPaymentMethod";
import { TPaymentMethod } from "@/app/types/types";
import UploadImageComponent from "./UploadImageComponent";
import TicketButton from "./TicketButton";
import { uploadAuthImageCloudinary } from "@/app/utils/updateImageCloudinary";
import { createOrder } from "@/app/actions/order.action";
import ModalComponent from "./ModalComponent";
import ModalErrorComponent from "./ModalErrorComponent";

interface Props {
	ticketPriceDolar: number;
	ticketPriceBolivar: number;
	paymentMethod: TPaymentMethod[];
	raffleId: string;
	maxTickets: number;
}

export default function FormNewOrder({
	ticketPriceDolar = 10,
	ticketPriceBolivar = 140,
	paymentMethod,
	raffleId,
	maxTickets,
}: Props) {
	const [count, setCount] = useState(1);
	const [selectedCurrency, setSelectedCurrency] = useState("USD");
	const [selectedPrice, setSelectedPrice] = useState(ticketPriceDolar); // Precio inicial en dólares <--- debe llegar desde page
	const [file, setFile] = useState<File | null>(null);
	const [previewFile, setPreviewFile] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);

	const calcAmount = () => {
		return selectedPrice * count;
	};
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] || null;
		setFile(selectedFile);
		setPreviewFile(selectedFile);
	};

	const handleSubmit = async (formData: FormData) => {
		console.log("🚀 ~ handleSubmit ~ formData:", formData);
		// Aquí puedes manejar el envío del formulario
		try {
			setError(null);
			if (!file) {
				throw new Error("Falta la imagen del formulario");
			}

			// subir la imagen en cloudinary y recuperar el secure_url
			const secureUrl = await uploadAuthImageCloudinary(file);
			if (!secureUrl) {
				throw new Error("Error al subir la imagen");
			}
			formData.append("paymentProof", secureUrl);

			// enviar el formulario
			const response = await createOrder(formData);
			console.log("🚀 ~ handleSubmit ~ response:", response);

			// ✅ En lugar de retornar, puedes manejar el éxito aquí
			console.log("Formulario enviado con éxito");

			setFile(null);
			setPreviewFile(null);
			setCount(1);
			const dialog = document.getElementById("my_modal_5");
			if (dialog instanceof HTMLDialogElement) {
				dialog.showModal();
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
				setError(error.message);
				const dialog = document.getElementById("my_modal_6");
				if (dialog instanceof HTMLDialogElement) {
					dialog.showModal();
				}
			}
			setFile(null);
			setPreviewFile(null);
			setCount(1);
		}
	};

	if (error) {
		const dialog = document.getElementById("my_modal_6");
		if (dialog instanceof HTMLDialogElement) {
			dialog.showModal();
		}
	}

	const handleFormSubmit = async (formData: FormData) => {
		await handleSubmit(formData);
	};

	return (
		<>
			<ModalErrorComponent error={error} />
			<ModalComponent />
			<form
				action={async (formData) => {
					await handleFormSubmit(formData);
				}}
				className="flex flex-col gap-4 w-full"
			>
				<input type="hidden" name="raffleId" value={raffleId} readOnly />
				<input type="hidden" name="maxTickets" value={maxTickets} readOnly />
				<TicketPrice
					selectedCurrency={selectedCurrency}
					ticketPriceDolar={ticketPriceDolar}
					ticketPriceBolivar={ticketPriceBolivar}
					setSelectedCurrency={setSelectedCurrency}
					setSelectedPrice={setSelectedPrice}
				/>
				<TicketCount count={count} setCount={setCount} />
				<TicketTotal calcAmount={calcAmount} selectedCurrency={selectedCurrency} />
				<TicketUserData />
				<TicketPaymentMethod paymentMethod={paymentMethod} />
				{previewFile && <img src={URL.createObjectURL(previewFile)} alt="Preview" />}
				<UploadImageComponent handleFileChange={handleFileChange} />

				<TicketButton />
			</form>
		</>
	);
}
