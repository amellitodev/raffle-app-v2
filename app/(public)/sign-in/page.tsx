"use client";
import GoogleIcon from "@/app/(auth)/dashboard/components/icons/Icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function SignInPage() {
	const { data: session } = useSession();
	console.log("🚀 ~ SignInPage ~ session:", session);
	const router = useRouter();
	
	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="flex flex-col gap-2 p-5 border border-gray-300 rounded-md shadow-md">
				<p className="text-center">Inicia sesión con tu cuenta de Google</p>
				<button
					className="btn bg-white text-black border-[#e5e5e5]"
					onClick={() => { signIn(); router.push("/dashboard"); }}
				>
					<GoogleIcon className="size-5 " />
					Login with Google
				</button>
			</div>
		</div>
	);
}
