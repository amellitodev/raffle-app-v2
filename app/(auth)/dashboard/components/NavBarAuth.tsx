import Link from "next/link";
import { MenuIcons } from "./icons/Icons";
import AvatarComponent from "./AvatarComponent";

export default function NavBarAuth() {
	return (
		<>
			<div className="navbar fixed top-0 left-0 z-10 backdrop-blur-md shadow-sm text-black">
				<div className="navbar-start">
					<Link className="btn btn-ghost text-xl rounded-md" href="/">
						Liskel app
					</Link>
				</div>
				<div className="navbar-center flex">
					<ul className="flex gap-2 px-1">
						<li>
							<Link href="/dashboard">Dashboard</Link>
						</li>

						<li>
							<Link href="/dashboard/sorteo">Mi Sorteo</Link>
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
