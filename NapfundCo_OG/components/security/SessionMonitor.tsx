'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { sessionMonitor } from '@/lib/session-monitor'
import { botDetector, type BotDetectionResult } from '@/lib/bot-detection'
import { useDevice } from '@/hooks/useDevice'

export function SessionMonitorComponent() {
  const [detectionResult, setDetectionResult] = useState<BotDetectionResult | null>(null)
  const [isMonitoring, setIsMonitoring] = useState(true)
  const [isDismissed, setIsDismissed] = useState(false)
  const { isMobile } = useDevice()

  useEffect(() => {
    if (!isMonitoring) return

    // Zeichne Events auf
    const handleClick = () => {
      sessionMonitor.recordClick()
      checkSession()
    }

    const handleScroll = () => {
      sessionMonitor.recordScroll()
    }

    const handleMouseMove = (e: MouseEvent) => {
      sessionMonitor.recordMouseMovement(e.clientX, e.clientY)
    }

    const handleKeyPress = () => {
      sessionMonitor.recordKeystroke()
    }

    // Führe regelmäßige Analyse durch
    const analysisInterval = setInterval(() => {
      checkSession()
    }, 10000) // Alle 10 Sekunden

    const checkSession = () => {
      const result = botDetector.detect()
      setDetectionResult(result)

      if (result.action !== 'none') {
        botDetector.handleBotDetection(result)
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('keypress', handleKeyPress)

    return () => {
      clearInterval(analysisInterval)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [isMonitoring])

  if (!detectionResult || !detectionResult.analysis.isSuspicious || isDismissed) {
    return null
  }

  const { analysis, confidence, action } = detectionResult

  return (
    <AnimatePresence>
      <motion.div
        data-popup="true"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`fixed z-[60] rounded-xl border-2 border-yellow-200 bg-yellow-50 shadow-xl ${
          isMobile
            ? 'top-20 left-2 right-2 p-3'
            : 'top-24 left-6 w-80 p-4'
        }`}
      >
        <div className="flex items-start gap-2">
          <AlertTriangle className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-yellow-600 mt-0.5 flex-shrink-0`} aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`font-semibold text-yellow-900 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                Verdächtiges Verhalten
              </h3>
              <button
                onClick={() => setIsDismissed(true)}
                className="rounded p-1 text-yellow-600 hover:bg-yellow-100"
                aria-label="Schließen"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-yellow-700 mt-1`}>
              Risiko: <strong>{analysis.riskLevel}</strong> ({confidence}%)
            </p>
            {!isMobile && (
              <ul className="text-xs text-yellow-700 space-y-0.5 mt-2">
                {analysis.reasons.slice(0, 2).map((reason, idx) => (
                  <li key={idx} className="truncate">• {reason}</li>
                ))}
              </ul>
            )}
            {action !== 'none' && (
              <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-yellow-900 mt-1`}>
                {action === 'captcha' ? 'Captcha aktiviert' : action === 'restrict' ? 'Eingeschränkt' : 'Überwacht'}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
