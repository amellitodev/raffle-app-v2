
import Link from "next/link";
import { MenuIcons } from "./icons/Icons";
import AvatarComponent from "./AvatarComponent";


export default function NavBarAuth() {

	return (
		<>
			<div className="navbar fixed top-0 left-0 z-10 backdrop-blur-md shadow-sm">
				<div className="navbar-start">
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost lg:hidden rounded-md"
						>
							<MenuIcons className="h-5 w-5" />
						</div>
						<ul
							tabIndex={0}
							className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
						>
							<li>
								<Link href="/dashboard">Dashboard</Link>
							</li>
							<li>
								<p>Sorteos</p>
								<ul className="p-2">
									<li>
										<Link href="/dashboard/sorteo" >Mis Sorteos</Link>
									</li>
									<li>
										<Link href="/dashboard/sorteo/nuevo-sorteo" >
											Nuevo Sorteo
										</Link>
									</li>
								</ul>
							</li>
							<li>
								<Link href="/dashboard/ordenes" >Ordenes</Link>
							</li>
						</ul>
					</div>
					<Link className="btn btn-ghost text-xl rounded-md" href="/">Rifas don Carlos</Link>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1">
						<li>
							<Link href="/dashboard" >Dashboard</Link>
						</li>
						<li>
							<details>
								<summary>Sorteos</summary>
								<ul className="p-2">
									<li>
										<Link href="/dashboard/sorteo" >Mis Sorteos</Link>
									</li>
									<li>
										<Link href="/dashboard/sorteo/nuevo-sorteo" >
											Nuevo Sorteo
										</Link>
									</li>
								</ul>
							</details>
						</li>
						<li>
							<Link href="/dashboard/ordenes" >Ordenes</Link>
						</li>
					</ul>
				</div>
				<div className="navbar-end flex gap-2">
					<AvatarComponent />
					{/* <LogoutButton /> */}
				</div>
			</div>
		</>
	);
}
