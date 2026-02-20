import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products by Rushiraj Jadeja — Privacy-First Apps & Tools',
  description: 'Software products built by Rushiraj Jadeja: CashLens (expense tracker), PrivacyPage (legal docs), InvoiceZen (invoices), Savvit (price intelligence), StackRadar (tech stack detector), DeadBy.ai.',
  keywords: ['Rushiraj Jadeja products', 'CashLens app', 'PrivacyPage', 'InvoiceZen', 'Savvit app', 'StackRadar', 'indie developer products', 'privacy-first apps'],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Products by Rushiraj Jadeja — Privacy-First Apps & Tools',
    description: 'CashLens, PrivacyPage, InvoiceZen, Savvit, StackRadar, DeadBy.ai — built by a solo developer.',
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
