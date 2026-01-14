import { MetadataRoute } from 'next'
import { getAllProducts, getAllCategories } from '@/lib/products'
import blogData from '@/data/blog-posts.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://napfundco.at'

  // Static pages
  const staticPages = [
    '',
    '/produkte',
    '/futterberater',
    '/ratgeber',
    '/ueber-uns',
    '/faq',
    '/kontakt',
    '/impressum',
    '/datenschutz',
    '/agb',
    '/widerruf',
    '/versand-zahlung',
  ]

  const staticEntries = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  // Category pages
  const categories = getAllCategories()
  const categoryEntries = categories.map((category) => ({
    url: `${baseUrl}/produkte/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // Product pages
  const products = getAllProducts()
  const productEntries = products.map((product) => ({
    url: `${baseUrl}/produkte/${product.category}/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Blog posts
  const blogEntries = blogData.posts.map((post) => ({
    url: `${baseUrl}/ratgeber/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticEntries,
    ...categoryEntries,
    ...productEntries,
    ...blogEntries,
  ]
}

