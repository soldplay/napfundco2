'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePersonalHistory } from '@/hooks/usePersonalHistory'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/utils'

interface PersonalComparisonProps {
  currentProduct: Product
  onUpgrade?: (product: Product) => void
  onDismiss?: () => void
}

export function PersonalComparison({
  currentProduct,
  onUpgrade,
  onDismiss,
}: PersonalComparisonProps) {
  const { getLastPurchasedProduct, getLastViewedProduct } = usePersonalHistory()
  const [lastProduct, setLastProduct] = useState<Product | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const lastPurchased = getLastPurchasedProduct()
    const lastViewed = getLastViewedProduct()

    // Priorisiere gekaufte Produkte
    const product = lastPurchased || lastViewed

    if (product && product.id !== currentProduct.id) {
      setLastProduct(product)
      setIsVisible(true)
    }
  }, [currentProduct, getLastPurchasedProduct, getLastViewedProduct])

  if (!isVisible || !lastProduct) return null

  const priceDifference = currentProduct.price - lastProduct.price
  const isUpgrade = priceDifference > 0
  const isDowngrade = priceDifference < 0

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="rounded-xl border-2 border-primary-200 bg-primary-50 p-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <h3 className="font-semibold text-warmgray-900">
                Vergleich mit deiner letzten Wahl
              </h3>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-warmgray-600">Letztes Mal:</span>
                <span className="font-medium text-warmgray-900">{lastProduct.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-warmgray-600">Preis letztes Mal:</span>
                <span className="font-medium text-warmgray-900">
                  {formatPrice(lastProduct.price)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-warmgray-600">Aktuell:</span>
                <span className="font-medium text-warmgray-900">{currentProduct.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-warmgray-600">Aktueller Preis:</span>
                <span className="font-medium text-warmgray-900">
                  {formatPrice(currentProduct.price)}
                </span>
              </div>

              {isUpgrade && (
                <div className="mt-3 rounded-lg bg-green-50 p-2">
                  <p className="text-sm font-medium text-green-700">
                    Du zahlst {formatPrice(Math.abs(priceDifference))} mehr als letztes Mal
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Möchtest du zu deiner letzten Wahl zurückkehren?
                  </p>
                </div>
              )}

              {isDowngrade && (
                <div className="mt-3 rounded-lg bg-blue-50 p-2">
                  <p className="text-sm font-medium text-blue-700">
                    Du sparst {formatPrice(Math.abs(priceDifference))} im Vergleich zu letztes Mal
                  </p>
                </div>
              )}

              {priceDifference === 0 && (
                <div className="mt-3 rounded-lg bg-warmgray-50 p-2">
                  <p className="text-sm text-warmgray-700">
                    Gleicher Preis wie letztes Mal
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              {isUpgrade && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (onUpgrade) {
                      onUpgrade(lastProduct)
                    }
                  }}
                >
                  Zur letzten Wahl
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsVisible(false)
                  if (onDismiss) {
                    onDismiss()
                  }
                }}
              >
                Verstanden
              </Button>
            </div>
          </div>

          <button
            onClick={() => {
              setIsVisible(false)
              if (onDismiss) {
                onDismiss()
              }
            }}
            className="ml-4 rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
            aria-label="Schließen"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Hook für einfache Verwendung
export function usePersonalComparison(product: Product) {
  const { getLastPurchasedProduct, getLastViewedProduct } = usePersonalHistory()
  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    const lastPurchased = getLastPurchasedProduct()
    const lastViewed = getLastViewedProduct()
    const lastProduct = lastPurchased || lastViewed

    if (lastProduct && lastProduct.id !== product.id) {
      setShowComparison(true)
    }
  }, [product, getLastPurchasedProduct, getLastViewedProduct])

  return {
    showComparison,
    Comparison: showComparison ? (
      <PersonalComparison currentProduct={product} />
    ) : null,
  }
}

