import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit, Cairo } from "next/font/google";
import { AppContextProvider } from "@/context/AppContext";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eastern Sparrows – Pest Control & Cleaning Services Qatar",
  description: "Premium cleaning & certified pest control services in Doha, Qatar. Odorless, eco-friendly municipality-approved chemicals. Cleaning services starting from 25 QR/hour.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  keywords: ["cleaning services qatar", "pest control doha", "deep cleaning qatar", "sofa cleaning doha", "bed bug treatment qatar", "eastern sparrows qatar", "doha cleaning"],
  authors: [{ name: "Eastern Sparrows" }],
  openGraph: {
    title: "Eastern Sparrows – Pest Control & Cleaning Services Qatar",
    description: "Premium cleaning & certified pest control services in Doha, Qatar. Cleaners start at 25 QR/hr. Same-day service available.",
    url: "https://easternsparrows.qa",
    siteName: "Eastern Sparrows",
    images: [
      {
        url: "/logo.jpg",
        width: 512,
        height: 512,
        alt: "Eastern Sparrows Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B3C5D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${outfit.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950">
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
