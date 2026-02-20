import { Metadata } from 'next'
import { getPost } from '@/lib/blog-posts'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) {
    return { title: 'Post Not Found — Rushiraj Jadeja' }
  }

  return {
    title: `${post.title} — Rushiraj Jadeja`,
    description: post.excerpt,
    keywords: [...post.tags, 'Rushiraj Jadeja', 'indie developer', 'solo dev blog'],
    authors: [{ name: 'Rushiraj Jadeja', url: 'https://www.rushiraj.me' }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Rushiraj Jadeja'],
      tags: post.tags,
      url: `https://www.rushiraj.me/blog/${slug}`,
      siteName: 'Rushiraj Jadeja',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@rushirajjj',
      creator: '@rushirajjj',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children
}
