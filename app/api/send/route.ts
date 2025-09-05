import { EmailTemplate } from "@/app/(public)/components/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";


export async function POST(req: Request) {
	try {

		const { buyerEmail, ticketsAssigned } = await req.json(); // 👈 recibimos el email desde el body
		console.log("🚀 ~ POST ~ ticketsAssigned:", ticketsAssigned)
		// los tickets llegan en un array 
		
		if(!buyerEmail) {
			return NextResponse.json({ error: "buyerEmail is required" }, { status: 400 });
		}
		const resend = new Resend(process.env.RESEND_API_KEY);
		
		const { data, error } = await resend.emails.send({
			from: "Atrapatusuerteconliskel <contacto@atrapatusuerteconliskel.com>", // 👈 debe ser un dominio verificado o el de pruebas
			to: [buyerEmail],
			subject: "Boletos asignados",
			react: EmailTemplate({ ticketsAssigned}), // 👈 uso correcto de React.createElement
			text: "Welcome to Resend! We're happy to have you on board.",
		});

		if (error) {
			return NextResponse.json({ error }, { status: 500 });
		}

		return NextResponse.json({ message: "Email sent successfully", data });
	} catch (error) {
		console.error("Error enviando email:", error);
		return NextResponse.json({ error: "Error enviando email" }, { status: 500 });
	}
}