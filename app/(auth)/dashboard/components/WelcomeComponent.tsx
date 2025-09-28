"use client";
import { useSession } from "next-auth/react";

export default function  WelcomeComponent () {
    const { data: session } = useSession();
  return (
    <>
    <div>

      <h2 className="text-2xl font-bold text-pink-500  mb-4">
        Bienvenido 	<span className=" ">{session?.user?.name}</span> 
      </h2>
      <p>
        Desde el Panel de Administración puedes gestionar todos los sorteos, órdenes y tickets.
      </p>
    </div>
    </>
  );
};
