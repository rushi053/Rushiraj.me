import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CommandPalette from "@/components/CommandPalette";
import EasterEggs from "@/components/EasterEggs";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rushiraj Jadeja — Solo Dev, 5 Products, 0 VC",
  description: "Building privacy-first software from India. CashLens, PrivacyPage, InvoiceZen, Cloudo. No VC, no employees, just vibes and code.",
  openGraph: {
    title: "Rushiraj Jadeja — Solo Dev, 5 Products, 0 VC",
    description: "Building privacy-first software from India. CashLens, PrivacyPage, InvoiceZen, Cloudo.",
    url: "https://rushiraj.me",
    siteName: "Rushiraj Jadeja",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rushirajjj",
    title: "Rushiraj Jadeja — Solo Dev, 5 Products, 0 VC",
    description: "Building privacy-first software from India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DLKEQ0N44H" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DLKEQ0N44H');
          `,
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            })();
          `,
        }} />
      </head>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-body antialiased`}>
        <Navigation />
        <CommandPalette />
        <EasterEggs />
        <main>{children}</main>
      </body>
    </html>
  );
}
