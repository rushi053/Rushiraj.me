import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products by Rushiraj Jadeja — Privacy-First Software',
  description: 'CashLens, PrivacyPage, InvoiceZen, DeadBy.ai, Cloudo. Privacy-first tools built by a solo developer.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Products by Rushiraj Jadeja — Privacy-First Software',
    description: 'CashLens, PrivacyPage, InvoiceZen, DeadBy.ai, Cloudo. Privacy-first tools built by a solo developer.',
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
