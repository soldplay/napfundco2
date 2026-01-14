'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X } from 'lucide-react'
import { useACG } from '@/hooks/useACG'
import {
  decisionTraceManager,
  createTraceForElement,
  generateExplanation,
  type DecisionTrace,
} from '@/lib/decision-trace'

interface TransparencyTooltipProps {
  elementId: string
  reason: string
  children: React.ReactNode
  className?: string
}

export function TransparencyTooltip({
  elementId,
  reason,
  children,
  className,
}: TransparencyTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [trace, setTrace] = useState<DecisionTrace | null>(null)
  const { lastViewedProducts, preferredPetType, timeOfDay } = useACG()
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Erstelle Trace beim Mount
    const newTrace = createTraceForElement(elementId, reason, {
      userHistory: lastViewedProducts,
      preferences: {
        petType: preferredPetType ?? undefined,
      },
      timeOfDay,
    })

    setTrace(newTrace)
  }, [elementId, reason, lastViewedProducts, preferredPetType, timeOfDay])

  useEffect(() => {
    // Schließe Tooltip beim Klicken außerhalb
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const explanation = generateExplanation(trace)

  return (
    <div className={`relative inline-block ${className || ''}`} ref={tooltipRef}>
      <div className="flex items-center gap-2">
        {children}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-primary-600 transition-colors"
          aria-label="Warum sehe ich das?"
          title="Warum sehe ich das?"
        >
          <Info className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-0 top-full z-50 mt-2 w-80 rounded-lg border-2 border-primary-200 bg-white p-4 shadow-xl"
            style={{ transform: 'translateX(-50%)', left: '50%' }}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-warmgray-900">Warum sehe ich das?</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
                aria-label="Schließen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-warmgray-700 mb-3">{explanation}</p>

            {trace && (
              <div className="border-t border-warmgray-200 pt-3 space-y-2">
                <div className="text-xs text-warmgray-500">
                  <p>
                    <strong>Datenquelle:</strong> {trace.dataSource}
                  </p>
                  {trace.context.userHistory && trace.context.userHistory.length > 0 && (
                    <p className="mt-1">
                      <strong>Ihre Historie:</strong> {trace.context.userHistory.slice(0, 2).join(', ')}
                    </p>
                  )}
                  {trace.context.preferences?.petType && (
                    <p className="mt-1">
                      <strong>Ihre Präferenz:</strong> {trace.context.preferences.petType}
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Hook für einfache Verwendung
 */
export function useTransparency(elementId: string, reason: string) {
  const [trace, setTrace] = useState<DecisionTrace | null>(null)

  useEffect(() => {
    const traces = decisionTraceManager.getTraces(elementId)
    if (traces.length > 0) {
      setTrace(traces[traces.length - 1])
    } else {
      const newTrace = createTraceForElement(elementId, reason)
      setTrace(newTrace)
    }
  }, [elementId, reason])

  return {
    trace,
    explanation: generateExplanation(trace),
    TransparencyButton: ({ className }: { className?: string }) => (
      <TransparencyTooltip elementId={elementId} reason={reason} className={className}>
        <span />
      </TransparencyTooltip>
    ),
  }
}

