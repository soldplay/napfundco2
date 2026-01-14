import type { Product } from './products'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Napf&Co OG',
    url: 'https://napfundco.at',
    logo: 'https://napfundco.at/logo.png',
    description:
      'Premium Tierfutter für Hunde, Katzen und Pferde. Natürlich, hochwertig und 100% aus der EU.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Donau-City-Straße 7, 32. Stock',
      addressLocality: 'Wien',
      postalCode: '1220',
      addressCountry: 'AT',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+43-676-4844169',
      contactType: 'customer service',
      availableLanguage: 'German',
    },
    sameAs: [
      'https://www.tiktok.com/@napfundco',
      'https://www.instagram.com/napfundco',
      'https://www.facebook.com/napfundco',
    ],
  }
}

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images[0] || 'https://napfundco.at/placeholder.jpg',
    brand: {
      '@type': 'Brand',
      name: 'Napf&Co',
    },
    offers: {
      '@type': 'Offer',
      url: `https://napfundco.at/produkte/${product.category}/${product.slug}`,
      priceCurrency: 'EUR',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Napf&Co',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  }
}

export function generateFAQSchema(
  questions: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateArticleSchema(post: {
  title: string
  excerpt: string
  author: string
  publishedAt: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Napf&Co OG',
      logo: {
        '@type': 'ImageObject',
        url: 'https://napfundco.at/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://napfundco.at/ratgeber/${post.slug}`,
    },
  }
}

