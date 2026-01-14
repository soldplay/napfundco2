import productsData from '@/data/products.json'

export interface FeedingGuide {
  weightFrom: number
  weightTo: number
  amountPerDay: string
}

export interface AnalyticalConstituents {
  protein: number
  fat: number
  fiber: number
  ash: number
  moisture: number
}

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  category: string
  subcategory: string
  price: number
  pricePerKg: number
  weight: number
  weightUnit: string
  images: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  isNew: boolean
  isBestseller: boolean
  badges: string[]
  ingredients: string
  analyticalConstituents: AnalyticalConstituents
  additives: Record<string, string>
  feedingGuide: FeedingGuide[]
  highlights: string[]
  suitableFor: string[]
  tiktokShopUrl: string
}

export interface Subcategory {
  id: string
  name: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  subcategories: Subcategory[]
}

export function getAllProducts(): Product[] {
  return productsData.products as Product[]
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.products.find((p) => p.slug === slug) as Product | undefined
}

export function getProductsByCategory(category: string): Product[] {
  return productsData.products.filter((p) => p.category === category) as Product[]
}

export function getProductsBySubcategory(
  category: string,
  subcategory: string
): Product[] {
  return productsData.products.filter(
    (p) => p.category === category && p.subcategory === subcategory
  ) as Product[]
}

export function getBestsellers(): Product[] {
  return productsData.products.filter((p) => p.isBestseller) as Product[]
}

export function getNewProducts(): Product[] {
  return productsData.products.filter((p) => p.isNew) as Product[]
}

export function getAllCategories(): Category[] {
  return productsData.categories as Category[]
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return productsData.categories.find((c) => c.slug === slug) as Category | undefined
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase()
  return productsData.products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.shortDescription.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.badges.some((b: string) => b.toLowerCase().includes(searchTerm))
  ) as Product[]
}

export function filterProducts(
  products: Product[],
  filters: {
    category?: string
    subcategory?: string
    priceMin?: number
    priceMax?: number
    inStock?: boolean
    badges?: string[]
  }
): Product[] {
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false
    if (filters.subcategory && product.subcategory !== filters.subcategory) return false
    if (filters.priceMin !== undefined && product.price < filters.priceMin) return false
    if (filters.priceMax !== undefined && product.price > filters.priceMax) return false
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) return false
    if (
      filters.badges &&
      filters.badges.length > 0 &&
      !filters.badges.some((badge) => product.badges.includes(badge))
    )
      return false
    return true
  })
}

export function sortProducts(
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name' | 'newest'
): Product[] {
  const sorted = [...products]
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'de'))
    case 'newest':
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    default:
      return sorted
  }
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return productsData.products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.subcategory === product.subcategory)
    )
    .slice(0, limit) as Product[]
}

