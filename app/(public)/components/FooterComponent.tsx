export default function FooterComponent() {
	return (
		<>
			<footer className="footer sm:footer-horizontal md:px-32 p-10  :mt-16 flex flex-col">
				<div className="flex w-full  gap-4 justify-center items-center">
					<p className="text-2xl">¡Síguenos en nuestras Redes!</p>
				</div>
				<div className="flex w-full  gap-4 justify-center items-center">
					<a
						className="bg-white p-2 rounded-full"
						href="https://instagram.com/atrapatusuerteconliskel"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							className="h-auto w-12"
							src="/instagram-svgrepo-com.svg"
							alt="logo_instagram"
						/>
					</a>
					<a
						href="https://www.tiktok.com/@atrapatusuerteconliskel_"
						target="_blank"
						className="bg-white p-2 rounded-full"
						rel="noopener noreferrer"
					>
						<img
							className="h-auto w-12"
							src="/tiktok-icon-white-1-logo-svgrepo-com.svg"
							alt="logo_tiktok"
						/>
					</a>
				</div>
				<div className="flex w-full  gap-4 justify-center items-center">
					<img className="h-auto w-32" src="/logo_conalot-300x132.png" alt="" />
					<img className="h-auto w-32" src="/loteriatachira.png" alt="" />
					<img className="h-auto w-32" src="/Super-GAna.png" alt="" />
				</div>

				<div className="w-full flex justify-center items-center">
					<a
						className="text-center w-full"
						href="https://exatronclouds.com/"
						target="_blank"
					>
						Todos los derechos reservados © 2025 - Diseñado y desarrollado por EC
					</a>
				</div>
			</footer>
		</>
	);
}
