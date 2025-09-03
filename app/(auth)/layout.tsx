import NavBarAuth from "./dashboard/components/NavBarAuth";


export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen bg-slate-50">
			{/* Header/Navbar para admin */}
			<header>
				<NavBarAuth />
			</header>

			{/* Contenido principal */}
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-slate-950">{children}</main>
		</div>
	);
}
