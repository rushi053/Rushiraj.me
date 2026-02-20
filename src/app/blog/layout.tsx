import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Rushiraj Jadeja | Cursor, Claude, AI Dev, Privacy Tech',
  description: 'Tutorials and insights on building apps with Cursor IDE and Claude AI, shipping MVPs fast, privacy-first software architecture, and the solo developer journey from India.',
  keywords: ['Cursor IDE tutorial', 'Claude AI coding', 'vibe coding', 'build app with AI', 'ship MVP fast', 'indie developer blog', 'privacy-first development', 'SwiftUI tutorial', 'Next.js developer', 'Rushiraj Jadeja blog'],
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
