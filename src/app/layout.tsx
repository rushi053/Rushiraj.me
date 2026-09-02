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
    default: 'Rushiraj Jadeja — Solo Dev, 0 VC',
    template: '%s | Rushiraj Jadeja',
  },
  description: 'Rushiraj Jadeja — solo developer. Ships CashLens and PrivacyPage, and audits AI-built apps.',
  keywords: ['Rushiraj Jadeja', 'Rushi Jadeja', 'Rushiraj', 'rushirajjj', 'indie developer', 'solo developer', 'full stack developer India', 'iOS developer India', 'freelance developer India', 'Next.js developer', 'React developer India', 'Swift developer', 'indie hacker India', 'privacy-first software', 'CashLens', 'PrivacyPage', 'InvoiceZen', 'StackRadar', 'MVP development', 'SaaS developer', 'hire developer India', 'CSUF alumni', 'Cal State Fullerton computer science'],
  authors: [{ name: 'Rushiraj Jadeja', url: 'https://rushiraj.me' }],
  creator: 'Rushiraj Jadeja',
  publisher: 'Rushiraj Jadeja',
  openGraph: {
    title: 'Rushiraj Jadeja — Solo Dev, 0 VC',
    description: 'Solo developer. CashLens, PrivacyPage, and $500 audits for AI-built apps.',
    url: 'https://www.rushiraj.me',
    siteName: 'Rushiraj Jadeja',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@rushirajjj',
    site: '@rushirajjj',
    title: 'Rushiraj Jadeja — Solo Dev, 0 VC',
    description: 'Solo developer. CashLens, PrivacyPage, and $500 audits for AI-built apps.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: 'Rushiraj Jadeja — Blog' },
      ],
    },
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
                alternateName: ['Rushi Jadeja', 'Rushiraj', 'rushirajjj'],
                url: 'https://www.rushiraj.me',
                image: 'https://www.rushiraj.me/opengraph-image',
                jobTitle: 'Full-Stack Developer & Indie Maker',
                description: 'Rushiraj Jadeja is a solo developer. He ships CashLens and PrivacyPage, and audits AI-built apps.',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Ahmedabad',
                  addressRegion: 'Gujarat',
                  addressCountry: 'IN',
                },
                alumniOf: {
                  '@type': 'CollegeOrUniversity',
                  name: 'California State University, Fullerton',
                  sameAs: 'https://www.fullerton.edu',
                },
                knowsAbout: ['TypeScript', 'React', 'Next.js', 'Swift', 'iOS Development', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'AI/ML', 'Privacy Engineering', 'SaaS', 'Full-Stack Development'],
                nationality: { '@type': 'Country', name: 'India' },
                sameAs: [
                  'https://x.com/rushirajjj',
                  'https://github.com/rushi053',
                  'https://linkedin.com/in/rushirajjadeja',
                  'https://www.behance.net/rushirajjadeja',
                  'https://apps.apple.com/developer/rushiraj-jadeja/id1758126286',
                  'https://www.upwork.com/freelancers/~014526420cde227b56',
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
