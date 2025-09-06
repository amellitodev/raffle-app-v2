import Link from "next/link";

export default function NavbarComponent() {
	return (
		<>
			<div className="navbar fixed top-0  z-20 shadow-sm backdrop-blur-md md:px-32">
				<div className="flex justify-between w-full">
					<div className="flex gap-2 items-center  ">
						<img
							className="size-16"
							src="/LOGO3ATRAPATUSUERTECONLISKEL.webp"
							alt="Logo_Atrapa_y_gana_Con_Liskel"
						/>
						{/* <a className="btn btn-ghost text-xl rounded-md hidden md:flex">Atrapa y gana Con Liskel</a> */}
					</div>
					<div className="flex gap-2 p-2 items-center">
						<a
							href="http://wa.me/584220106025"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-green-500 text-white px-4 py-2 rounded inline-block"
						>
							WhatsApp
						</a>
						{/* <a className="btn bg-pink-500 text-white rounded-md" href="https://www.instagram.com/atrapatusuerteconliskel" target="_blank" >Contacto</a> */}
						<Link
							className="btn btn-secondary  rounded-md"
							href="#verify"
							scroll={true}
						>
							Verifica tu ticket
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
