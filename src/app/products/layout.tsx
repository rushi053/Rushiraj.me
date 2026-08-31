import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products by Rushiraj Jadeja — Privacy-First Apps & Tools',
  description: 'Software products built by Rushiraj Jadeja: CashLens (expense tracker), PrivacyPage (legal docs), InvoiceZen (invoices), StackRadar (tech stack detector), Cloudo (iOS tasks), DeadBy.ai.',
  keywords: ['Rushiraj Jadeja products', 'CashLens app', 'PrivacyPage', 'InvoiceZen', 'Cloudo app', 'StackRadar', 'indie developer products', 'privacy-first apps'],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Products by Rushiraj Jadeja — Privacy-First Apps & Tools',
    description: 'CashLens, PrivacyPage, InvoiceZen, StackRadar, Cloudo, DeadBy.ai — built by a solo developer.',
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
