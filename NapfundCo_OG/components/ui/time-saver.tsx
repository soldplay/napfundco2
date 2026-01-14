'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, TrendingUp, X, ChevronUp } from 'lucide-react'
import { useACG } from '@/hooks/useACG'
import { useDevice } from '@/hooks/useDevice'
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
  minTimeSaved = 3,
}: TimeSaverProps) {
  const { timeOnPage, scrollDepth } = useACG()
  const { isMobile, isTablet } = useDevice()
  const [estimate, setEstimate] = useState<TimeEstimate | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    // Berechne gesparte Zeit basierend auf Session
    const pagesVisited = Math.max(1, Math.floor(scrollDepth / 25))
    const newEstimate = estimateTimeSavedFromSession(timeOnPage, pagesVisited)

    setEstimate(newEstimate)

    // Zeige nur an, wenn genug Zeit gespart wurde
    if (newEstimate.savedMinutes >= minTimeSaved && !isDismissed) {
      setIsVisible(true)
      // Auf Mobile automatisch minimiert starten
      if (isMobile) {
        setIsMinimized(true)
      }
    }
  }, [timeOnPage, scrollDepth, minTimeSaved, isDismissed, isMobile])

  if (!isVisible || !estimate || isDismissed) return null

  const message = generateTimeSavedMessage(estimate)

  // Minimierte Ansicht (besonders für Mobile)
  if (isMinimized) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsMinimized(false)}
        className={`fixed z-[55] rounded-full bg-white border-2 border-primary-200 shadow-lg ${
          isMobile 
            ? 'bottom-20 right-4 p-2.5' 
            : 'bottom-28 right-6 p-3'
        }`}
        aria-label="Zeit-Ersparnis anzeigen"
      >
        <div className="flex items-center gap-2">
          <Clock className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-primary-600`} aria-hidden="true" />
          <span className={`font-semibold ${isMobile ? 'text-xs' : 'text-sm'} text-warmgray-900`}>
            ~{estimate.savedMinutes} Min
          </span>
        </div>
      </motion.button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className={`fixed z-[55] rounded-xl border-2 border-primary-200 bg-white shadow-xl ${
          isMobile
            ? 'bottom-20 right-2 left-2 max-w-none p-3'
            : isTablet
              ? 'bottom-28 right-4 w-72 p-3'
              : 'bottom-32 right-6 w-80 p-4'
        } ${className || ''}`}
      >
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 rounded-full bg-primary-100 ${isMobile ? 'p-1.5' : 'p-2'}`}>
            <Clock className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-primary-600`} aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-warmgray-900`}>
                Zeit gespart
              </h4>
              <div className="flex items-center gap-1">
                {/* Minimize Button */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
                  aria-label="Minimieren"
                >
                  <ChevronUp className="h-3 w-3" />
                </button>
                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsVisible(false)
                    setIsDismissed(true)
                  }}
                  className="rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
                  aria-label="Schließen"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-warmgray-700 mb-1`}>
              {isMobile ? `~${estimate.savedMinutes} Min gespart` : message}
            </p>
            {!isMobile && (
              <div className="flex items-center gap-1 text-xs text-warmgray-500">
                <TrendingUp className="h-3 w-3" aria-hidden="true" />
                <span className="truncate">{estimate.comparison}</span>
              </div>
            )}
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
