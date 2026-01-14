import { Metadata } from 'next'
import { ProductsPage } from '@/components/products/ProductsPage'

export const metadata: Metadata = {
  title: 'Alle Produkte',
  description:
    'Entdecken Sie unser gesamtes Sortiment an Premium-Tierfutter für Hunde, Katzen und Pferde. Natürlich, hochwertig und 100% aus der EU.',
}

export default function AllProductsPage() {
  return <ProductsPage />
}

