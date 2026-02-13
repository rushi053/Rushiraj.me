import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hire Rushiraj Jadeja — MVP Development & SaaS Consulting',
  description: 'Ship your MVP in a week. Full-stack development, Next.js, React, iOS. From $2,500. Based in India, serving global clients.',
  keywords: ['hire indie developer', 'MVP development', 'Next.js developer for hire', 'SaaS consultant India'],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Hire Rushiraj Jadeja — MVP Development & SaaS Consulting',
    description: 'Ship your MVP in a week. Full-stack development, Next.js, React, iOS. From $2,500. Based in India, serving global clients.',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
