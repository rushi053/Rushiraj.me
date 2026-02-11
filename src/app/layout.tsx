import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Rushiraj Jadeja — Solo Dev, 3 Products, 0 VC",
  description: "Building privacy-first software from India. CashLens, PrivacyPage, InvoiceZen. No VC, no employees, just vibes and code.",
  openGraph: {
    title: "Rushiraj Jadeja — Solo Dev, 3 Products, 0 VC",
    description: "Building privacy-first software from India. CashLens, PrivacyPage, InvoiceZen.",
    url: "https://rushiraj.me",
    siteName: "Rushiraj Jadeja",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rushirajjj",
    title: "Rushiraj Jadeja — Solo Dev, 3 Products, 0 VC",
    description: "Building privacy-first software from India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-black text-white min-h-screen`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
