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
  metadataBase: new URL('https://www.rushiraj.me'),
  title: {
    default: 'Rushiraj Jadeja — Solo Dev, 5 Products, 0 VC',
    template: '%s | Rushiraj Jadeja',
  },
  description: 'Full-stack developer and indie maker from India. Building privacy-first software — CashLens, PrivacyPage, InvoiceZen, DeadBy.ai, Cloudo. Available for hire.',
  keywords: ['Rushiraj Jadeja', 'indie developer', 'solo developer', 'full stack developer India', 'Next.js developer', 'privacy-first software', 'CashLens', 'PrivacyPage', 'InvoiceZen', 'MVP development', 'SaaS developer', 'hire developer India'],
  authors: [{ name: 'Rushiraj Jadeja', url: 'https://rushiraj.me' }],
  creator: 'Rushiraj Jadeja',
  publisher: 'Rushiraj Jadeja',
  openGraph: {
    title: 'Rushiraj Jadeja — Solo Dev, 5 Products, 0 VC',
    description: 'Building privacy-first software from India. CashLens, PrivacyPage, InvoiceZen, Cloudo, DeadBy.ai.',
    url: 'https://www.rushiraj.me',
    siteName: 'Rushiraj Jadeja',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@rushirajjj',
    site: '@rushirajjj',
    title: 'Rushiraj Jadeja — Solo Dev, 5 Products, 0 VC',
    description: 'Building privacy-first software from India.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Rushiraj Jadeja',
                url: 'https://www.rushiraj.me',
                jobTitle: 'Full-Stack Developer & Indie Maker',
                description: 'Full-stack developer and indie maker from India. Building privacy-first software — CashLens, PrivacyPage, InvoiceZen, DeadBy.ai, Cloudo.',
                sameAs: [
                  'https://x.com/rushirajjj',
                  'https://github.com/rushi053',
                  'https://linkedin.com/in/rushirajjadeja',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Rushiraj Jadeja',
                url: 'https://www.rushiraj.me',
                description: 'Portfolio and blog of Rushiraj Jadeja — solo developer building privacy-first software.',
              },
            ]),
          }}
        />
        <Navigation />
        <CommandPalette />
        <EasterEggs />
        <main>{children}</main>
      </body>
    </html>
  );
}
