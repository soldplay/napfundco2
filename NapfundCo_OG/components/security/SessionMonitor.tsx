'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { sessionMonitor } from '@/lib/session-monitor'
import { botDetector, type BotDetectionResult } from '@/lib/bot-detection'

export function SessionMonitorComponent() {
  const [detectionResult, setDetectionResult] = useState<BotDetectionResult | null>(null)
  const [isMonitoring, setIsMonitoring] = useState(true)

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

  if (!detectionResult || !detectionResult.analysis.isSuspicious) {
    return null
  }

  const { analysis, confidence, action } = detectionResult

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-4 md:left-6 z-[60] w-[calc(100vw-2rem)] md:w-80 rounded-xl border-2 border-yellow-200 bg-yellow-50 p-4 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <h3 className="font-semibold text-yellow-900 mb-2">
              Verdächtiges Verhalten erkannt
            </h3>
            <p className="text-sm text-yellow-700 mb-2">
              Risiko-Level: <strong>{analysis.riskLevel}</strong> ({confidence}% Confidence)
            </p>
            <ul className="text-xs text-yellow-700 space-y-1 mb-3">
              {analysis.reasons.map((reason, idx) => (
                <li key={idx}>• {reason}</li>
              ))}
            </ul>
            {action !== 'none' && (
              <p className="text-xs font-medium text-yellow-900">
                Aktion: {action === 'captcha' ? 'Captcha angezeigt' : action === 'restrict' ? 'Funktionen eingeschränkt' : 'Wird überwacht'}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

