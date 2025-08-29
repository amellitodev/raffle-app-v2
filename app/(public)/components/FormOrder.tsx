"use client";
import { createOrder } from "@/app/actions/actions";
import { useActionState, useState, Suspense } from "react";
import UploadImageComponent from "./UploadImageComponent";
import { uploadAuthImageCloudinary } from "@/app/utils/updateImageCloudinary";

interface Props {
	ticketPriceDolar?: number;
	ticketPriceBolivar?: number;
	raffleId?: string;
	paymentMethod?: Array<{
		type: string;
		entityName: string;
		accountNumber?: string;
		phoneNumber?: string;
		email?: string;
		sellerId?: string;
	}>;
	maxTickets?: number;
}
type ActionState = {
    message: string;
    errors: { 
        general: string;
        [key: string]: string; // <-- Permitir otros campos de error
    };
    success: boolean;
};
const initialState: ActionState = {
	message: "",
	errors: { general: "" },
	success: false,
};
export default function FormTicket({
	ticketPriceDolar = 0,
	ticketPriceBolivar = 0,
	raffleId = "",
	paymentMethod = [],
	maxTickets,
}: Props) {
	const [count, setCount] = useState(1);
	const [selectedCurrency, setSelectedCurrency] = useState("USD");
	const [selectedPrice, setSelectedPrice] = useState(ticketPriceDolar);
	const [paymentMethodSelected, setPaymentMethodSelected] = useState(paymentMethod[0]);
	const [selectedIdx, setSelectedIdx] = useState(0);
	const [file, setFile] = useState<File | null>(null);
	const [previewFile, setPreviewFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	console.log("🚀 ~ FormTicket ~ loading:", loading)
	const [error, setError] = useState<string | null>(null);
	console.log("🚀 ~ FormTicket ~ error:", error)

	const [publicId, setPublicId] = useState<string | "">("");

	const incrementCount = () => setCount(count + 1);
	const decrementCount = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	const selectPriceDolar = () => {
		setSelectedPrice(ticketPriceDolar);
		setSelectedCurrency("USD");
	};

	const selectPriceBolivar = () => {
		setSelectedPrice(ticketPriceBolivar);
		setSelectedCurrency("VES");
	};

	const calcAmount = () => {
		return selectedPrice * count;
	};

	const currencyDolarStyle = `btn rounded-md ${
		selectedCurrency === "USD" ? "bg-warning text-slate-950" : "bg-disabled"
	}`;
	const currencyBolivarStyle = `btn rounded-md ${
		selectedCurrency === "VES" ? "bg-warning text-slate-950" : "bg-disabled"
	}`;

	const isSelectedPaymentMethodStyle = (index: number) => {
		return selectedIdx === index
			? "p-2 border border-slate-300 rounded-md bg-warning text-slate-950"
			: "p-2 border border-slate-300 rounded-md bg-disabled";
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] || null;
		setFile(selectedFile);
		setPreviewFile(selectedFile);
	};

	const handleClearFile = () => {
		setPreviewFile(null);
	};

	const handleCreateOrder = async (file: File | null, formData: FormData) => {
		try {
			setLoading(true);
			setError(null);
			const paymentProof = await uploadAuthImageCloudinary(file);
			if(!formData) {
				return {
					message: "No se encontraron datos del formulario.",
					errors: { general: "No se encontraron datos del formulario." },
					success: false
				};
			}
			formData.append("paymentProof", paymentProof);
			const newOrder = await createOrder(formData);
			if (!newOrder.success) {
				return {
					message: "Order failed",
					errors: { general: newOrder.errors as string },
					success: false,
				};
			}
			// Caso de éxito - ESTO FALTABA
			setLoading(false);
			return {
				message: "Orden creada exitosamente",
				errors: { general: "" },
				success: true,
			};
		} catch (error) {
			if(error instanceof Error) {
				console.error("Error creating order:", error);
				setError("Ocurrió un error inesperado: " + error.message);
				setLoading(false);
				// Aquí puedes manejar el error de manera más específica si lo deseas
				return {
					message: "Error creando la orden",
					errors: { general: "Ocurrió un error inesperado: " + error.message },
					success: false,
				};
			}
		}
	};

	

	return (
		<>
			<form action={async (formData) => handleCreateOrder(file, formData)} className="flex flex-col gap-2">
				<span className="text-md text-center">Precio por ticket</span>
				<div className="flex gap-8 justify-center items-center">
					<button className={currencyDolarStyle} type="button" onClick={selectPriceDolar}>
						$ {ticketPriceDolar}
					</button>
					<button
						className={currencyBolivarStyle}
						type="button"
						onClick={selectPriceBolivar}
					>
						Bs. {ticketPriceBolivar}
					</button>
				</div>
				{/* <input type="text" name="paymentProof" defaultValue={publicId || ""} hidden /> */}
				<input type="hidden" name="raffleId" defaultValue={raffleId || ""} />
				<input
					type="hidden"
					name="selectedCurrency"
					defaultValue={selectedCurrency || ""}
				/>

				{/* Cantidad de tickets */}
				<input type="text" name="maxTickets" value={maxTickets} readOnly hidden />
				<div className="flex flex-col mx-auto mt-2 justify-around items-center w-2/3 h-16 border rounded-md  border-gray-800/30  ">
					<div className="flex items-center justify-around w-full">
						<button
							className="btn btn-xs btn-error btn-outline rounded-md hover:bg-white hover:text-slate-950"
							type="button"
							onClick={decrementCount}
						>
							-
						</button>
						<input name="ticketCount" type="text" value={count} readOnly hidden />
						<p className="text-2xl font-bold">{count}</p>
						<button
							className="btn btn-xs btn-success btn-outline rounded-md hover:bg-white hover:text-slate-950"
							type="button"
							onClick={incrementCount}
						>
							+
						</button>
					</div>
					<span className="text-xs">Cantidad de tickets</span>
				</div>
				<div></div>
				<input
					className="rounded-md mx-auto text-slate-950 bg-slate-200"
					type="text"
					name="amount"
					placeholder="Monto"
					value={calcAmount()}
					readOnly
					hidden
				/>

				<input
					className="input rounded-md w-full text-slate-950 bg-slate-200"
					type="text"
					name="buyerName"
					placeholder="Nombre Completo"
				/>

				<input
					className="input rounded-md w-full text-slate-950 bg-slate-200"
					type="text"
					name="buyerId"
					placeholder="Cédula"
				/>
				<input
					className="input rounded-md w-full text-slate-950 bg-slate-200"
					type="text"
					name="buyerEmail"
					placeholder="Email"
				/>
				<input
					className="input rounded-md w-full text-slate-950 bg-slate-200"
					type="text"
					name="buyerPhone"
					placeholder="Teléfono"
				/>

				<div className="divider"></div>

				<strong className="text-lg text-center">
					Total a pagar: {calcAmount()} {selectedCurrency}{" "}
				</strong>

				{paymentMethod.map((method, index) => (
					<div
						className={`cursor-pointer ${isSelectedPaymentMethodStyle(index)}`}
						key={index}
						onClick={() => {
							setPaymentMethodSelected(method), setSelectedIdx(index);
						}}
					>
						<strong>{method.type}</strong>
						<p>Entidad: {method.entityName}</p>
						{method.accountNumber && <p>Número de cuenta: {method.accountNumber}</p>}
						{method.phoneNumber && <p>Teléfono: {method.phoneNumber}</p>}
						{method.email && <p>Email: {method.email}</p>}
						{method.sellerId && <p>ID del vendedor: {method.sellerId}</p>}
					</div>
				))}
				<input
					className="input rounded-md w-full text-slate-950 bg-slate-200"
					type="text"
					name="bank"
					placeholder="Banco al que se realizó el pago"
					value={paymentMethodSelected?.type || ""}
					readOnly
					hidden
				/>

				<input
					className="input rounded-md w-full text-slate-950 bg-slate-200"
					type="text"
					name="paymentReference"
					placeholder="Referencia del pago"
				/>

				{/* Componente para subir imagen */}
				{previewFile && <img src={URL.createObjectURL(previewFile)} alt="Preview" />}
				<UploadImageComponent handleFileChange={handleFileChange} />

				<button
					onClick={() => {
						handleClearFile();
					}}
					className="btn btn-success text-slate-950 font-bold rounded-md"
					type="submit"
					disabled={loading}
				>
					Comprar Ticket {loading && <span className="loading">Cargando...</span>}
				</button>
			</form>
			{/* Mostrar mensajes de estado
			{state?.message && (
				<div className={`alert ${state.success ? "alert-success" : "alert-error"} mt-4`}>
					{state.message}
				</div>
			)}

			{/* Mostrar errores específicos si existen */}
			{/* {state?.errors?.general && !state.success && (
				<div className="text-red-600 mt-2">
					{JSON.stringify(state?.errors?.general)}
				</div>
			)} */}
		</>
	);
}
