'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import { getBestsellers } from '@/lib/products'

export function Bestsellers() {
  const bestsellers = getBestsellers()

  return (
    <section
      className="section bg-warmgray-50"
      aria-labelledby="bestsellers-heading"
    >
      <div className="container-custom">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2
              id="bestsellers-heading"
              className="heading-2 text-warmgray-900"
            >
              Unsere Bestseller
            </h2>
            <p className="mt-2 text-warmgray-600">
              Die beliebtesten Produkte unserer Kunden
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/produkte">
              Alle Produkte
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 product-grid">
          {bestsellers.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

