import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductsPage } from '@/components/products/ProductsPage'
import { getCategoryBySlug, getAllCategories } from '@/lib/products'

interface CategoryPageProps {
  params: { kategorie: string }
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    kategorie: category.slug,
  }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.kategorie)

  if (!category) {
    return { title: 'Kategorie nicht gefunden' }
  }

  return {
    title: category.name,
    description: category.description,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.kategorie)

  if (!category) {
    notFound()
  }

  return <ProductsPage category={params.kategorie} />
}

