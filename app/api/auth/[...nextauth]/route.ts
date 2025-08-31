import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
});

export { handler as GET, handler as POST };


// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//     ],
//     callbacks: {
//ALLOWED_EMAILS = email autorizado por la app
//         async signIn({ user, account }) {
//             if (account?.provider === "google") {
//                 const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') || [];
//                 return allowedEmails.includes(user.email || "");
//             }
//             return false;
//         },
//     },
// });

// export { handler as GET, handler as POST };


// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const ALLOWED_EMAILS = [
//     "admin@gmail.com",
//     "usuario1@gmail.com",
//     "usuario2@gmail.com"
// ];

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//     ],
//     callbacks: {
//         async signIn({ user, account }) {
//             if (account?.provider === "google") {
//                 return ALLOWED_EMAILS.includes(user.email || "");
//             }
//             return false;
//         },
//         async session({ session, token }) {
//             if (!ALLOWED_EMAILS.includes(session.user?.email || "")) {
//                 throw new Error("Unauthorized access");
//             }
//             return session;
//         },
//     },
// });

// export { handler as GET, handler as POST };

// ALLOWED_EMAILS=tu-email@gmail.com,otro-email@gmail.com

// Con esta configuración, solo los usuarios con los emails 
// específicos podrán autenticarse y acceder a las rutas protegidas. 
// Los demás verán un error de autenticación.