import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Rushiraj Jadeja — Software Developer from Ahmedabad, India',
  description: 'Rushiraj Jadeja is a full-stack software developer and indie maker based in Ahmedabad, India. MS Computer Science from Cal State Fullerton. 7 years in USA. Creator of CashLens, PrivacyPage, InvoiceZen, Savvit. Available for freelance.',
  keywords: ['Rushiraj Jadeja about', 'Rushiraj Jadeja developer', 'software developer Ahmedabad', 'CSUF alumni developer', 'indie developer India', 'who is Rushiraj Jadeja'],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Rushiraj Jadeja — Software Developer from Ahmedabad, India',
    description: 'Rushiraj Jadeja — full-stack developer, MS CS from Cal State Fullerton, building privacy-first software from India.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
