import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Rushiraj Jadeja — Let\'s Build Something',
  description: 'Get in touch for MVP development, consulting, or collaboration. Based in India, working with global clients.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Rushiraj Jadeja — Let\'s Build Something',
    description: 'Get in touch for MVP development, consulting, or collaboration. Based in India, working with global clients.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
