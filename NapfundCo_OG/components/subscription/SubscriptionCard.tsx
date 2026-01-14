'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { SubscriptionPackage } from '@/lib/subscription'
import {
  calculateDiscountedPrice,
  calculateSavings,
  formatPrice,
} from '@/lib/subscription'

interface SubscriptionCardProps {
  package: SubscriptionPackage
  index: number
}

export function SubscriptionCard({ package: pkg, index }: SubscriptionCardProps) {
  const discountedPrice = calculateDiscountedPrice(pkg.basePrice, pkg.discountPercent)
  const savings = calculateSavings(pkg.basePrice, pkg.discountPercent)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative h-full rounded-2xl border-2 bg-white p-6 shadow-sm transition-all hover:shadow-md ${
        pkg.recommended
          ? 'border-primary-500 ring-2 ring-primary-500/20'
          : 'border-warmgray-200'
      }`}
    >
      {pkg.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-accent-500 text-white">
            <Sparkles className="mr-1 h-3 w-3" />
            Empfohlen
          </Badge>
        </div>
      )}

      <div className="text-center">
        <div className="mb-4 text-5xl" role="img" aria-label={pkg.petType}>
          {pkg.icon}
        </div>
        <h3 className="heading-3 text-warmgray-900">{pkg.name}</h3>
        <p className="mt-2 text-warmgray-600">{pkg.description}</p>
      </div>

      <div className="mt-6 border-t border-warmgray-200 pt-6">
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-3xl font-bold text-warmgray-900">
              {formatPrice(discountedPrice)}
            </span>
            <span className="text-warmgray-500">/ Monat</span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-sm text-warmgray-500 line-through">
              {formatPrice(pkg.basePrice)}
            </span>
            <Badge variant="outline" className="border-green-500 text-green-700">
              {pkg.discountPercent}% Rabatt
            </Badge>
          </div>
          <p className="mt-2 text-sm text-warmgray-600">
            Sie sparen {formatPrice(savings)} pro Monat
          </p>
        </div>

        <ul className="mt-6 space-y-3">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
              <span className="text-sm text-warmgray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          size="lg"
          className={`mt-8 w-full ${
            pkg.recommended
              ? 'bg-accent-500 hover:bg-accent-600'
              : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          <Link href={`/abo/${pkg.id}`}>
            Abo auswählen
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

