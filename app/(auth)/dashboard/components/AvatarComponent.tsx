"use client";
import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";

export default function AvatarComponent() {
	const { data: session } = useSession();
	// agregar loading data
	if (!session) {
		return (
			<div className="avatar flex items-center gap-2 p-2">
				<span className="text-sm font-semibold">Loading...    </span>
				<div className="skeleton w-10 h-10 mask mask-squircle"></div>
			</div>
		);
	}

	return (
		<>
			<div className="avatar flex items-center ">
				<details className="cursor-pointer menu menu-dropdown">
					<summary className="list-none flex items-center gap-2">
						<span className="text-sm font-semibold">{session?.user?.name}</span>
						<div className="mask mask-squircle w-10">
							<img
								src={session?.user?.image as string}
								alt={session?.user?.name as string}
								className="size-2"
							/>
						</div>
					</summary>
					<ul className="absolute">
						<li>
							<LogoutButton />
						</li>
					</ul>
				</details>
			</div>
		</>
	);
}
