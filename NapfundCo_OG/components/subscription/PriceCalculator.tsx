'use client'

import { useMemo } from 'react'
import { Calculator, TrendingDown } from 'lucide-react'
import type { SubscriptionPackage } from '@/lib/subscription'
import {
  calculateDiscountedPrice,
  calculateSavings,
  calculateYearlySavings,
  formatPrice,
} from '@/lib/subscription'

interface PriceCalculatorProps {
  package: SubscriptionPackage
}

export function PriceCalculator({ package: pkg }: PriceCalculatorProps) {
  const discountedPrice = useMemo(
    () => calculateDiscountedPrice(pkg.basePrice, pkg.discountPercent),
    [pkg.basePrice, pkg.discountPercent]
  )

  const monthlySavings = useMemo(
    () => calculateSavings(pkg.basePrice, pkg.discountPercent),
    [pkg.basePrice, pkg.discountPercent]
  )

  const yearlySavings = useMemo(
    () => calculateYearlySavings(pkg.basePrice, pkg.discountPercent),
    [pkg.basePrice, pkg.discountPercent]
  )

  return (
    <div className="rounded-xl border-2 border-primary-200 bg-primary-50 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-primary-600" aria-hidden="true" />
        <h3 className="font-semibold text-warmgray-900">Preisübersicht</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-primary-200 pb-3">
          <span className="text-warmgray-600">Grundpreis:</span>
          <span className="text-lg font-semibold text-warmgray-900">
            {formatPrice(pkg.basePrice)}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-primary-200 pb-3">
          <span className="text-warmgray-600">Rabatt ({pkg.discountPercent}%):</span>
          <span className="text-lg font-semibold text-green-600">
            -{formatPrice(monthlySavings)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-warmgray-900">
            Monatlicher Preis:
          </span>
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(discountedPrice)}
          </span>
        </div>

        <div className="mt-4 rounded-lg bg-green-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-4 w-4 text-green-600" aria-hidden="true" />
            <span className="text-sm font-medium text-green-900">
              Jährliche Ersparnis
            </span>
          </div>
          <p className="text-2xl font-bold text-green-700">
            {formatPrice(yearlySavings)}
          </p>
          <p className="mt-1 text-xs text-green-600">
            Das sind {formatPrice(monthlySavings)} pro Monat gespart
          </p>
        </div>
      </div>
    </div>
  )
}

