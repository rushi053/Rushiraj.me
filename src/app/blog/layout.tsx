import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Rushiraj Jadeja | Indie Dev, AI, Privacy Tech',
  description: 'Thoughts on building products solo, AI-assisted development, privacy-first software, and the indie hacker journey.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog — Rushiraj Jadeja | Indie Dev, AI, Privacy Tech',
    description: 'Thoughts on building products solo, AI-assisted development, privacy-first software, and the indie hacker journey.',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
