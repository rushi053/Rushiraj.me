import { Metadata } from 'next'
import { getPost, posts } from '@/lib/blog-posts'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  const url = `https://rushiraj.me/blog/${slug}`

  return {
    title: `${post.title} — Rushiraj Jadeja`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: 'Rushiraj Jadeja', url: 'https://rushiraj.me' }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: ['Rushiraj Jadeja'],
      tags: post.tags,
      siteName: 'Rushiraj Jadeja',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@rushirajjj',
    },
  }
}

export default async function BlogPostLayout({ params, children }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Rushiraj Jadeja',
      url: 'https://rushiraj.me',
      sameAs: [
        'https://x.com/rushirajjj',
        'https://github.com/rushi053',
        'https://linkedin.com/in/rushirajjadeja',
      ],
    },
    publisher: {
      '@type': 'Person',
      name: 'Rushiraj Jadeja',
      url: 'https://rushiraj.me',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rushiraj.me/blog/${slug}`,
    },
    keywords: post.tags.join(', '),
    wordCount: post.content.split(/\s+/).length,
    articleSection: 'Technology',
    inLanguage: 'en',
    url: `https://rushiraj.me/blog/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
