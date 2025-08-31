"use client"
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <>
      <button className="btn btn-error rounded-md btn-xs" onClick={async () => {
        await signOut({ callbackUrl: '/' });
      }}>
        Cerrar Sesión
      </button>
    </>
  );
};
