'use client'

import Link from 'next/link'
import { Star, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const categoryMap: Record<string, string> = {
    hund: 'Hundefutter',
    katze: 'Katzenfutter',
    pferd: 'Pferdefutter',
  }

  return (
    <article className="card-hover group flex h-full flex-col">
      {/* Image */}
      <Link
        href={`/produkte/${product.category}/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-gradient-to-br from-warmgray-50 to-warmgray-100"
      >
        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {product.isNew && <Badge variant="accent">Neu</Badge>}
          {product.isBestseller && <Badge variant="default">Bestseller</Badge>}
        </div>

        {/* Placeholder für Produktbild */}
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <span
              className="text-5xl"
              role="img"
              aria-label={categoryMap[product.category] || 'Tierfutter'}
            >
              {product.category === 'hund'
                ? '🐕'
                : product.category === 'katze'
                  ? '🐈'
                  : '🐴'}
            </span>
            <p className="mt-2 text-sm text-warmgray-500">{product.name}</p>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/5">
          <span className="translate-y-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-warmgray-900 opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100">
            Details ansehen
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category */}
        <p className="text-xs font-medium uppercase tracking-wide text-warmgray-500">
          {categoryMap[product.category]}
        </p>

        {/* Title */}
        <Link href={`/produkte/${product.category}/${product.slug}`}>
          <h3 className="mt-1 font-heading text-lg font-semibold text-warmgray-900 transition-colors hover:text-primary-600">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-warmgray-600">
          {product.shortDescription}
        </p>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center" aria-label={`Bewertung: ${product.rating} von 5 Sternen`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-warmgray-200 text-warmgray-200'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sm text-warmgray-500">
            ({product.reviewCount})
          </span>
        </div>

        {/* Badges */}
        {product.badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.badges.slice(0, 2).map((badge) => (
              <Badge key={badge} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="mt-4 border-t border-warmgray-100 pt-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xl font-bold text-warmgray-900">
                {formatPrice(product.price)}
              </span>
              <span className="ml-2 text-sm text-warmgray-500">
                ({formatPrice(product.pricePerKg)}/kg)
              </span>
            </div>
            <span
              className={`text-sm font-medium ${
                product.inStock ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {product.inStock ? 'Auf Lager' : 'Ausverkauft'}
            </span>
          </div>

          {/* CTA */}
          <Button
            asChild
            className="mt-3 w-full bg-accent-500 hover:bg-accent-600"
          >
            <a
              href={product.tiktokShopUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Bei TikTok kaufen
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  )
}

