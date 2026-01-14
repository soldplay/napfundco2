'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Star,
  ExternalLink,
  ChevronRight,
  Check,
  Info,
  ShoppingBag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ProductCard } from './ProductCard'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/products'

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

const categoryMap: Record<string, string> = {
  hund: 'Hundefutter',
  katze: 'Katzenfutter',
  pferd: 'Pferdefutter',
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav
        className="border-b border-warmgray-100 bg-warmgray-50"
        aria-label="Breadcrumb"
      >
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-warmgray-500 hover:text-primary-600">
                Start
              </Link>
            </li>
            <ChevronRight
              className="h-4 w-4 text-warmgray-400"
              aria-hidden="true"
            />
            <li>
              <Link
                href="/produkte"
                className="text-warmgray-500 hover:text-primary-600"
              >
                Produkte
              </Link>
            </li>
            <ChevronRight
              className="h-4 w-4 text-warmgray-400"
              aria-hidden="true"
            />
            <li>
              <Link
                href={`/produkte/${product.category}`}
                className="text-warmgray-500 hover:text-primary-600"
              >
                {categoryMap[product.category]}
              </Link>
            </li>
            <ChevronRight
              className="h-4 w-4 text-warmgray-400"
              aria-hidden="true"
            />
            <li>
              <span className="font-medium text-warmgray-900" aria-current="page">
                {product.name}
              </span>
            </li>
          </ol>
        </div>
      </nav>

      <div className="container-custom py-8 lg:py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-warmgray-50 to-warmgray-100">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <span
                    className="text-9xl"
                    role="img"
                    aria-label={product.name}
                  >
                    {product.category === 'hund'
                      ? '🐕'
                      : product.category === 'katze'
                        ? '🐈'
                        : '🐴'}
                  </span>
                  <p className="mt-4 text-warmgray-500">
                    Produktbild: {product.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary-500'
                        : 'border-warmgray-200 hover:border-warmgray-300'
                    }`}
                    aria-label={`Bild ${index + 1} anzeigen`}
                  >
                    <div className="flex h-full items-center justify-center bg-warmgray-50">
                      <span className="text-2xl" aria-hidden="true">
                        {product.category === 'hund'
                          ? '🐕'
                          : product.category === 'katze'
                            ? '🐈'
                            : '🐴'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isNew && <Badge variant="accent">Neu</Badge>}
              {product.isBestseller && <Badge variant="default">Bestseller</Badge>}
              {product.badges.map((badge) => (
                <Badge key={badge} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Title & Category */}
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-warmgray-500">
              {categoryMap[product.category]}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold text-warmgray-900 lg:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex items-center"
                aria-label={`Bewertung: ${product.rating} von 5 Sternen`}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-warmgray-200 text-warmgray-200'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="font-semibold text-warmgray-900">
                {product.rating}
              </span>
              <span className="text-warmgray-500">
                ({product.reviewCount} Bewertungen)
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-lg text-warmgray-600">
              {product.shortDescription}
            </p>

            {/* Highlights */}
            <ul className="mt-6 space-y-2">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600"
                    aria-hidden="true"
                  />
                  <span className="text-warmgray-700">{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="mt-8 rounded-xl bg-warmgray-50 p-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-warmgray-900">
                  {formatPrice(product.price)}
                </span>
                <span className="text-warmgray-500">
                  inkl. MwSt. ({formatPrice(product.pricePerKg)}/kg)
                </span>
              </div>
              <p className="mt-2 text-sm text-warmgray-600">
                Inhalt: {product.weight}
                {product.weightUnit}
              </p>

              {/* Stock Status */}
              <div className="mt-4 flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    product.inStock ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`font-medium ${
                    product.inStock ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {product.inStock ? 'Auf Lager' : 'Derzeit nicht verfügbar'}
                </span>
              </div>

              {/* CTA */}
              <Button
                asChild
                size="lg"
                className="mt-6 w-full bg-accent-500 hover:bg-accent-600"
                disabled={!product.inStock}
              >
                <a
                  href={product.tiktokShopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" aria-hidden="true" />
                  Bei TikTok kaufen
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>

              <p className="mt-4 flex items-start gap-2 text-sm text-warmgray-500">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                Der Kauf erfolgt sicher über den TikTok Shop. Es gelten unsere AGB
                und das 14-tägige Widerrufsrecht.
              </p>
            </div>

            {/* Suitable For */}
            <div className="mt-6">
              <p className="font-medium text-warmgray-900">Geeignet für:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.suitableFor.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Accordion */}
        <div className="mt-12 lg:mt-16">
          <Accordion type="single" collapsible defaultValue="ingredients">
            {/* Zusammensetzung */}
            <AccordionItem value="ingredients">
              <AccordionTrigger className="text-lg font-semibold">
                Zusammensetzung
              </AccordionTrigger>
              <AccordionContent>
                <div className="prose max-w-none text-warmgray-600">
                  <p>{product.ingredients}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Analytische Bestandteile */}
            <AccordionItem value="analytical">
              <AccordionTrigger className="text-lg font-semibold">
                Analytische Bestandteile
              </AccordionTrigger>
              <AccordionContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-warmgray-200">
                        <th className="py-3 font-medium text-warmgray-900">
                          Bestandteil
                        </th>
                        <th className="py-3 font-medium text-warmgray-900">
                          Gehalt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-warmgray-600">
                      <tr className="border-b border-warmgray-100">
                        <td className="py-3">Rohprotein</td>
                        <td className="py-3">
                          {product.analyticalConstituents.protein}%
                        </td>
                      </tr>
                      <tr className="border-b border-warmgray-100">
                        <td className="py-3">Rohfett</td>
                        <td className="py-3">
                          {product.analyticalConstituents.fat}%
                        </td>
                      </tr>
                      <tr className="border-b border-warmgray-100">
                        <td className="py-3">Rohfaser</td>
                        <td className="py-3">
                          {product.analyticalConstituents.fiber}%
                        </td>
                      </tr>
                      <tr className="border-b border-warmgray-100">
                        <td className="py-3">Rohasche</td>
                        <td className="py-3">
                          {product.analyticalConstituents.ash}%
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3">Feuchtigkeit</td>
                        <td className="py-3">
                          {product.analyticalConstituents.moisture}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Zusatzstoffe */}
            {Object.keys(product.additives).length > 0 && (
              <AccordionItem value="additives">
                <AccordionTrigger className="text-lg font-semibold">
                  Ernährungsphysiologische Zusatzstoffe
                </AccordionTrigger>
                <AccordionContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-warmgray-200">
                          <th className="py-3 font-medium text-warmgray-900">
                            Zusatzstoff
                          </th>
                          <th className="py-3 font-medium text-warmgray-900">
                            Gehalt
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-warmgray-600">
                        {Object.entries(product.additives).map(([key, value]) => (
                          <tr key={key} className="border-b border-warmgray-100">
                            <td className="py-3 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </td>
                            <td className="py-3">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Fütterungsempfehlung */}
            <AccordionItem value="feeding">
              <AccordionTrigger className="text-lg font-semibold">
                Fütterungsempfehlung
              </AccordionTrigger>
              <AccordionContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-warmgray-200">
                        <th className="py-3 font-medium text-warmgray-900">
                          Körpergewicht
                        </th>
                        <th className="py-3 font-medium text-warmgray-900">
                          Tagesmenge
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-warmgray-600">
                      {product.feedingGuide.map((guide, index) => (
                        <tr
                          key={index}
                          className="border-b border-warmgray-100"
                        >
                          <td className="py-3">
                            {guide.weightFrom} - {guide.weightTo} kg
                          </td>
                          <td className="py-3">{guide.amountPerDay}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-warmgray-500">
                  Die angegebenen Mengen sind Richtwerte. Der tatsächliche
                  Futterbedarf kann je nach Aktivität, Alter und individuellem
                  Stoffwechsel variieren. Frisches Wasser sollte immer zur
                  Verfügung stehen.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16" aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="heading-3 text-warmgray-900"
            >
              Das könnte dir auch gefallen
            </h2>
            <div className="mt-8 product-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

