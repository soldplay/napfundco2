'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, TrendingUp, X } from 'lucide-react'
import { useACG } from '@/hooks/useACG'
import {
  estimateTimeSavedFromSession,
  generateTimeSavedMessage,
  type TimeEstimate,
} from '@/lib/time-estimation'

interface TimeSaverProps {
  className?: string
  showOnPages?: string[]
  minTimeSaved?: number // Minimale gesparte Zeit in Minuten, bevor angezeigt wird
}

export function TimeSaver({
  className,
  showOnPages = [],
  minTimeSaved = 3,
}: TimeSaverProps) {
  const { timeOnPage, scrollDepth } = useACG()
  const [estimate, setEstimate] = useState<TimeEstimate | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Berechne gesparte Zeit basierend auf Session
    const pagesVisited = Math.max(1, Math.floor(scrollDepth / 25)) // Schätze Seiten basierend auf Scroll-Tiefe
    const newEstimate = estimateTimeSavedFromSession(timeOnPage, pagesVisited)

    setEstimate(newEstimate)

    // Zeige nur an, wenn genug Zeit gespart wurde
    if (newEstimate.savedMinutes >= minTimeSaved && !isDismissed) {
      setIsVisible(true)
    }
  }, [timeOnPage, scrollDepth, minTimeSaved, isDismissed])

  if (!isVisible || !estimate || isDismissed) return null

  const message = generateTimeSavedMessage(estimate)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className={`fixed bottom-32 md:bottom-36 right-4 md:right-6 z-[60] rounded-xl border-2 border-primary-200 bg-white p-4 shadow-xl ${className || ''}`}
        style={{ maxWidth: 'calc(100vw - 2rem)', width: 'min(320px, calc(100vw - 2rem))' }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 rounded-full bg-primary-100 p-2">
            <Clock className="h-5 w-5 text-primary-600" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-semibold text-warmgray-900">Zeit gespart</h4>
              <button
                onClick={() => {
                  setIsVisible(false)
                  setIsDismissed(true)
                }}
                className="rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
                aria-label="Schließen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-warmgray-700 mb-2">{message}</p>
            <div className="flex items-center gap-1 text-xs text-warmgray-500">
              <TrendingUp className="h-3 w-3" aria-hidden="true" />
              <span>{estimate.comparison}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Hook für einfache Verwendung
export function useTimeSaver() {
  const { timeOnPage, scrollDepth } = useACG()
  const [estimate, setEstimate] = useState<TimeEstimate | null>(null)

  useEffect(() => {
    const pagesVisited = Math.max(1, Math.floor(scrollDepth / 25))
    const newEstimate = estimateTimeSavedFromSession(timeOnPage, pagesVisited)
    setEstimate(newEstimate)
  }, [timeOnPage, scrollDepth])

  return {
    estimate,
    message: estimate ? generateTimeSavedMessage(estimate) : null,
    TimeSaverDisplay: () => <TimeSaver />,
  }
}

