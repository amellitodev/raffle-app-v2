import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarComponent />
      {children}
      <FooterComponent />
    </>
  );
}
