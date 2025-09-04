import { EmailTemplate } from "@/app/(public)/components/EmailTemplate";
import React from "react";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
	try {
        
		const { buyerEmail } = await req.json(); // 👈 recibimos el email desde el body
		console.log("🚀 ~ email:", buyerEmail);

		const { data, error } = await resend.emails.send({
			from: "Atrapatusuerteconliskel <contacto@atrapatusuerteconliskel.com>", // 👈 debe ser un dominio verificado o el de pruebas
			to: [buyerEmail],
			subject: "Hello world",
			react: React.createElement(EmailTemplate, { firstName: "John" }), // 👈 uso correcto de React.createElement
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