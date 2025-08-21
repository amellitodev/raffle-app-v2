"use client"

import { createRaffle } from "@/app/actions/actions";
import { useState } from "react";

export default function  FormRaffle () {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
    <div>
      <form className="flex flex-col gap-2" action={createRaffle}>
        <input className="input w-full" type="text" name="title" placeholder="Título del sorteo" />
        <textarea className="textarea w-full" name="description" placeholder="Descripción del sorteo"></textarea>
        <input className="input w-full" type="datetime-local" name="raffleStart" placeholder="Fecha de inicio del sorteo" />
        <input className="input w-full" type="datetime-local" name="raffleDate" placeholder="Fecha del sorteo" />
        <input className="input w-full" type="text" name="rafflePrize" placeholder="Premio Principal del sorteo" />
        <input className="input w-full" type="text" name="ticketPriceDolar" placeholder="Precio en Dolares" />
        <input className="input w-full" type="text" name="ticketPriceBolivar" placeholder="Precio en Bolívares" />
        <input className="input w-full" type="text" name="paymentMethod" placeholder="Método de pago" />
        <input className="input w-full" type="text" name="maxTickets" placeholder="Máximo de boletos" />
        <input className="file-input file-input-primary w-full" type="file" name="imageUrl" placeholder="URL de la imagen" />


        <button type="submit" className="btn btn-success rounded-md p-4">Crear Sorteo</button>
      </form>
    </div>
    </>
  );
};
