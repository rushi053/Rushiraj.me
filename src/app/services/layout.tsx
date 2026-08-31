import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hire Rushiraj Jadeja — MVP Builds & AI App Rescue',
  description: 'Fixed-price MVP development and AI app rescue. $500 code & security audit for apps built with Lovable, Bolt, v0, Cursor, or Replit — prioritized report in 3 business days. Full builds from $2,500.',
  keywords: ['hire Rushiraj Jadeja', 'AI app audit', 'AI app rescue', 'Lovable app broken', 'Bolt app security', 'code security audit', 'freelance developer India', 'hire full stack developer', 'MVP developer for hire', 'iOS developer freelance', 'Next.js developer India', 'React developer for hire', 'SaaS consultant'],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Hire Rushiraj Jadeja — MVP Builds & AI App Rescue',
    description: '$500 audit for your AI-built app: security holes, broken flows, payment integrity. Report in 3 business days. Full MVP builds at fixed prices.',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
