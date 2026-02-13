import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Rushiraj Jadeja — Solo Developer, 5 Products, 0 VC',
  description: 'Full-stack developer from India. MS Computer Science, 7 years in USA. Built CashLens, PrivacyPage, InvoiceZen, and more. Available for hire.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Rushiraj Jadeja — Solo Developer, 5 Products, 0 VC',
    description: 'Full-stack developer from India. MS Computer Science, 7 years in USA. Built CashLens, PrivacyPage, InvoiceZen, and more. Available for hire.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
