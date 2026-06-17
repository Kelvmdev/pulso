import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    template: "%s | Pulso",
    default: "Pulso — monitor del mercado cripto en vivo",
  },
  description:
    "Dashboard cripto en vivo: capitalización, volumen y precios que laten en tiempo real.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:font-medium focus:text-bg focus:outline-none"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex flex-1 flex-col focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
