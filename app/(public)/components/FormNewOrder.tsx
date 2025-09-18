"use client";
import { useState } from "react";
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
import imageCompression from "browser-image-compression"; // 👈 librería

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
  const [count, setCount] = useState(2);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedPrice, setSelectedPrice] = useState(ticketPriceDolar);
  const [file, setFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calcAmount = () => selectedPrice * count;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (!selectedFile) return;

    try {
      // Opciones de compresión
      const options = {
        maxSizeMB: 0.8, // limita a ~0.8MB
        maxWidthOrHeight: 1024, // redimensiona
        useWebWorker: true,
      };

      // 👇 Comprimir en el navegador
      const compressedFile = await imageCompression(selectedFile, options);

      // Guardamos el archivo comprimido y el preview
      setFile(compressedFile);
      setPreviewFile(compressedFile);
    } catch (err) {
      console.error("Error al comprimir la imagen:", err);
      setError("No se pudo comprimir la imagen, intenta con otra.");
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      setError(null);
      if (!file) {
        throw new Error("Falta la imagen del formulario");
      }

      // subir la imagen a Cloudinary y recuperar el secure_url
      const secureUrl = await uploadAuthImageCloudinary(file);
      if (!secureUrl) {
        throw new Error("Error al subir la imagen");
      }
      formData.append("paymentProof", secureUrl);

      // enviar el formulario
      const response = await createOrder(formData);

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
      }
      const dialog = document.getElementById("my_modal_6");
      if (dialog instanceof HTMLDialogElement) {
        dialog.showModal();
      }
      setFile(null);
      setPreviewFile(null);
      setCount(1);
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    await handleSubmit(formData);
  };

  return (
    <>
      <ModalErrorComponent error={"Ha ocurrido un error!, por favor verifica e intenta nuevamente. si el problema persiste, contacta al soporte."} />
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

        {previewFile && (
          <img src={URL.createObjectURL(previewFile)} alt="Preview" className="w-64 rounded-lg" />
        )}

        <UploadImageComponent handleFileChange={handleFileChange} />

        <TicketButton />
      </form>
    </>
  );
}