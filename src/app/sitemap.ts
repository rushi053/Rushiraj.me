import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.rushiraj.me'

  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/products', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/projects', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/ios-apps', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/work', changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
