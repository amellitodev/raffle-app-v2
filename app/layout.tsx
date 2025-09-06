import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "./AuthSessionProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atrapa tu suerte con Liskel",
  description: "Participa y gana premios increíbles con Liskel",
  keywords: ["sorteos", "rifas", "premios", "tickets", "Liskel"],
  authors: [{ name: "Liskel", url: "https://atrapatusuerteconliskel.com" }],

//   robots: { index: true, follow: true },
//   charset: "utf-8",
//   lang: "es",
  
  // Favicon y compatibilidad
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Open Graph para redes sociales
  openGraph: {
    title: "Atrapa tu suerte con Liskel",
    description: "Participa y gana premios increíbles con Liskel",
    url: "https://atrapatusuerteconliskel.com",
    siteName: "Atrapa tu suerte con Liskel",
    images: [
      {

        url: "https://atrapatusuerteconliskel.com/og-image.png", // se resuelve automáticamente gracias a metadataBase
        width: 1200,
        height: 630,
        alt: "Liskel - Sorteos y Premios",
      },
    ],
    locale: "es_ES",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Atrapa tu suerte con Liskel",
    description: "Participa y gana premios increíbles con Liskel",
    creator: "@Liskel", // tu usuario de Twitter si tienes
    images: ["https://atrapatusuerteconliskel.com/og-image.png"], // se resuelve con metadataBase
  },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html data-theme="pastel" lang="en">
        <AuthSessionProvider>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
        </AuthSessionProvider>
		</html>
	);
}
