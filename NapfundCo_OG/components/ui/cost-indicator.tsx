'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useCostTracking } from '@/hooks/useCostTracking'
import { formatPrice } from '@/lib/subscription'

interface CostIndicatorProps {
  baseCost: number
  frequency?: 'monthly' | 'one-time'
  className?: string
}

export function CostIndicator({
  baseCost,
  frequency = 'monthly',
  className,
}: CostIndicatorProps) {
  const { totalCost, totalChanges, addChange, removeChange, setBaseCost, setFrequency } =
    useCostTracking(baseCost)

  // Set frequency when prop changes
  useEffect(() => {
    setFrequency(frequency)
  }, [frequency, setFrequency])

  useEffect(() => {
    setBaseCost(baseCost)
  }, [baseCost, setBaseCost])

  if (Math.abs(totalChanges) < 0.01) {
    return null
  }

  const isIncrease = totalChanges > 0
  const displayAmount = Math.abs(totalChanges)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`fixed bottom-6 right-6 z-50 rounded-xl border-2 bg-white p-4 shadow-lg ${
          isIncrease ? 'border-green-500' : 'border-red-500'
        } ${className || ''}`}
      >
        <div className="flex items-center gap-3">
          {isIncrease ? (
            <TrendingUp className="h-5 w-5 text-green-600" aria-hidden="true" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-600" aria-hidden="true" />
          )}
          <div>
            <p className="text-sm font-medium text-warmgray-700">
              {isIncrease ? 'Zusätzliche Kosten:' : 'Ersparnis:'}
            </p>
            <p
              className={`text-lg font-bold ${
                isIncrease ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isIncrease ? '+' : '-'}
              {formatPrice(displayAmount)}
              {frequency === 'monthly' && ' / Monat'}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Hook für einfache Verwendung
export function useCostIndicator(baseCost: number, frequency: 'monthly' | 'one-time' = 'monthly') {
  const tracking = useCostTracking(baseCost)

  useEffect(() => {
    tracking.setBaseCost(baseCost)
    tracking.setFrequency(frequency)
  }, [baseCost, frequency, tracking])

  return {
    ...tracking,
    CostDisplay: () => (
      <CostIndicator baseCost={baseCost} frequency={frequency} />
    ),
  }
}

