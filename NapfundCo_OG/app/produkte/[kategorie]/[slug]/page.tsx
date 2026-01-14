import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/products/ProductDetail'
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/products'

interface ProductPageProps {
  params: { kategorie: string; slug: string }
}

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    kategorie: product.category,
    slug: product.slug,
  }))
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return { title: 'Produkt nicht gefunden' }
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: 'website',
    },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product)

  return <ProductDetail product={product} relatedProducts={relatedProducts} />
}

