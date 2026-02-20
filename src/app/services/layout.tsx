import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hire Rushiraj Jadeja — Freelance Full-Stack & iOS Developer',
  description: 'Hire Rushiraj Jadeja for MVP development, iOS apps, Next.js, React, and SaaS consulting. Full-stack developer from India with 7 years US experience. From $40/hr.',
  keywords: ['hire Rushiraj Jadeja', 'freelance developer India', 'hire full stack developer', 'MVP developer for hire', 'iOS developer freelance', 'Next.js developer India', 'React developer for hire', 'SaaS consultant'],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Hire Rushiraj Jadeja — Freelance Full-Stack & iOS Developer',
    description: 'Ship your MVP in a week. Full-stack development, Next.js, React, iOS. Based in India, serving global clients.',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
