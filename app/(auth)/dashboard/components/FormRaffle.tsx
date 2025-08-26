"use client"

import { createRaffle } from "@/app/actions/actions";
import { useState } from "react";
import PaymentMethodInput from "./PaymentMethodInput";

export default function  FormRaffle () {
  const [preview, setPreview] = useState<File | null>(null);

  

  return (
    <>
    <div>
      <form className="flex flex-col gap-2" action={createRaffle}>
        <input className="input w-full" type="text" name="title" placeholder="Título del sorteo" />
        <textarea className="textarea w-full" name="description" placeholder="Descripción del sorteo"></textarea>
        <label htmlFor="raffleStart">Fecha y hora de inicio del sorteo</label>
        <input className="input w-full" type="datetime-local" name="raffleStart" placeholder="Fecha de inicio del sorteo" />
        <label htmlFor="raffleDate">Fecha y hora del sorteo</label>
        <input className="input w-full" type="datetime-local" name="raffleDate" placeholder="Fecha del sorteo" />
        <input className="input w-full" type="text" name="rafflePrize" placeholder="Premio Principal del sorteo" />
        <input className="input w-full" type="text" name="ticketPriceDolar" placeholder="Precio en Dolares" />
        <input className="input w-full" type="text" name="ticketPriceBolivar" placeholder="Precio en Bolívares" />
        <input className="input w-full" type="text" name="maxTickets" placeholder="Máximo de boletos" />
        <PaymentMethodInput />
        <input className="file-input file-input-primary w-full" type="file" name="imageUrl" placeholder="URL de la imagen" onChange={(e) => setPreview(e.target.files?.[0] || null)} />
        <div className="preview">
          {preview && <img src={URL.createObjectURL(preview)} alt="Preview" />}
        </div>

        <button type="submit" className="btn btn-success rounded-md p-4" onClick={() => setPreview(null)}>Crear Sorteo</button>
      </form>
    </div>
    </>
  );
};
