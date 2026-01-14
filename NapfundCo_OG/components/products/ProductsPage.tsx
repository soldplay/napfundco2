'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from './ProductCard'
import {
  getAllProducts,
  getProductsByCategory,
  getAllCategories,
  filterProducts,
  sortProducts,
  type Product,
} from '@/lib/products'

interface ProductsPageProps {
  category?: string
}

const sortOptions = [
  { value: 'rating', label: 'Beliebtheit' },
  { value: 'price-asc', label: 'Preis aufsteigend' },
  { value: 'price-desc', label: 'Preis absteigend' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'newest', label: 'Neueste zuerst' },
]

const badgeFilters = [
  'Getreidefrei',
  '100% aus EU',
  'Hypoallergen',
  'Bio',
  'Ohne Zusätze',
]

export function ProductsPage({ category }: ProductsPageProps) {
  const [sortBy, setSortBy] = useState<string>('rating')
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [showFilters, setShowFilters] = useState(false)

  const categories = getAllCategories()
  const currentCategory = category
    ? categories.find((c) => c.slug === category)
    : null

  const baseProducts = useMemo(() => {
    return category ? getProductsByCategory(category) : getAllProducts()
  }, [category])

  const filteredProducts = useMemo(() => {
    let products = filterProducts(baseProducts, {
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      badges: selectedBadges.length > 0 ? selectedBadges : undefined,
    })

    return sortProducts(
      products,
      sortBy as 'price-asc' | 'price-desc' | 'rating' | 'name' | 'newest'
    )
  }, [baseProducts, sortBy, selectedBadges, priceRange])

  const toggleBadge = (badge: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    )
  }

  const clearFilters = () => {
    setSelectedBadges([])
    setPriceRange([0, 100])
    setSortBy('rating')
  }

  const hasActiveFilters = selectedBadges.length > 0 || priceRange[0] > 0 || priceRange[1] < 100

  return (
    <div className="min-h-screen bg-warmgray-50">
      {/* Header */}
      <div className="bg-white border-b border-warmgray-100">
        <div className="container-custom py-8 lg:py-12">
          <h1 className="heading-2 text-warmgray-900">
            {currentCategory?.name || 'Alle Produkte'}
          </h1>
          <p className="mt-2 text-warmgray-600">
            {currentCategory?.description ||
              'Entdecken Sie unser gesamtes Sortiment an Premium-Tierfutter'}
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden lg:block" aria-label="Produktfilter">
            <div className="sticky top-24 space-y-6">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg font-semibold text-warmgray-900">
                    Filter
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Zurücksetzen
                    </button>
                  )}
                </div>

                {/* Category Filter (wenn keine Kategorie ausgewählt) */}
                {!category && (
                  <div className="mt-6">
                    <h3 className="mb-3 font-medium text-warmgray-900">
                      Tierart
                    </h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <a
                          key={cat.id}
                          href={`/produkte/${cat.slug}`}
                          className="block rounded-lg px-3 py-2 text-warmgray-600 hover:bg-primary-50 hover:text-primary-600"
                        >
                          {cat.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Badge Filter */}
                <div className="mt-6">
                  <h3 className="mb-3 font-medium text-warmgray-900">
                    Eigenschaften
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {badgeFilters.map((badge) => (
                      <button
                        key={badge}
                        onClick={() => toggleBadge(badge)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                          selectedBadges.includes(badge)
                            ? 'bg-primary-600 text-white'
                            : 'bg-warmgray-100 text-warmgray-700 hover:bg-warmgray-200'
                        }`}
                      >
                        {badge}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mt-6">
                  <h3 className="mb-3 font-medium text-warmgray-900">Preis</h3>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-20 rounded-lg border border-warmgray-300 px-3 py-2 text-sm"
                      aria-label="Mindestpreis"
                    />
                    <span className="text-warmgray-500">bis</span>
                    <input
                      type="number"
                      min={priceRange[0]}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-20 rounded-lg border border-warmgray-300 px-3 py-2 text-sm"
                      aria-label="Höchstpreis"
                    />
                    <span className="text-warmgray-500">€</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
                  Filter
                  {hasActiveFilters && (
                    <Badge variant="default" className="ml-2">
                      {selectedBadges.length}
                    </Badge>
                  )}
                </Button>

                <p className="text-sm text-warmgray-600">
                  {filteredProducts.length} Produkte
                </p>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  className="h-4 w-4 text-warmgray-500"
                  aria-hidden="true"
                />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]" aria-label="Sortieren nach">
                    <SelectValue placeholder="Sortieren nach" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mobile Filter Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 lg:hidden"
              >
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-warmgray-900">Filter</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      aria-label="Filter schließen"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {badgeFilters.map((badge) => (
                      <button
                        key={badge}
                        onClick={() => toggleBadge(badge)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                          selectedBadges.includes(badge)
                            ? 'bg-primary-600 text-white'
                            : 'bg-warmgray-100 text-warmgray-700 hover:bg-warmgray-200'
                        }`}
                      >
                        {badge}
                      </button>
                    ))}
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 text-sm text-primary-600 hover:text-primary-700"
                    >
                      Alle Filter zurücksetzen
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Active Filters */}
            {selectedBadges.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-warmgray-600">Aktive Filter:</span>
                {selectedBadges.map((badge) => (
                  <Badge
                    key={badge}
                    variant="default"
                    className="cursor-pointer"
                    onClick={() => toggleBadge(badge)}
                  >
                    {badge}
                    <X className="ml-1 h-3 w-3" aria-hidden="true" />
                  </Badge>
                ))}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-12 text-center">
                <p className="text-lg text-warmgray-600">
                  Keine Produkte gefunden.
                </p>
                <Button onClick={clearFilters} className="mt-4">
                  Filter zurücksetzen
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

