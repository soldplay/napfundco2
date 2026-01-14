'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  behavioralAuth,
  type BehavioralPattern,
  type AuthContext,
  type AuthResult,
} from '@/lib/behavioral-auth'

interface BehavioralAuthProps {
  userId: string
  onAuthSuccess?: () => void
  onAuthFailure?: () => void
}

export function BehavioralAuthComponent({
  userId,
  onAuthSuccess,
  onAuthFailure,
}: BehavioralAuthProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authResult, setAuthResult] = useState<AuthResult | null>(null)
  const [behavioralPattern, setBehavioralPattern] = useState<BehavioralPattern>({
    mouseMovements: [],
    typingPattern: [],
    scrollPattern: [],
    clickPattern: [],
  })

  useEffect(() => {
    // Sammle Verhaltensmuster
    const mouseMovements: Array<{ x: number; y: number; timestamp: number }> = []
    const typingPattern: Array<{ key: string; timestamp: number; duration: number }> = []
    const scrollPattern: Array<{ depth: number; timestamp: number }> = []
    const clickPattern: Array<{ x: number; y: number; timestamp: number }> = []

    const handleMouseMove = (e: MouseEvent) => {
      mouseMovements.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      })
      // Behalte nur letzte 50 Bewegungen
      if (mouseMovements.length > 50) {
        mouseMovements.shift()
      }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      const startTime = Date.now()
      typingPattern.push({
        key: e.key,
        timestamp: startTime,
        duration: 100, // Vereinfacht
      })
    }

    const handleScroll = () => {
      const depth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      scrollPattern.push({
        depth,
        timestamp: Date.now(),
      })
    }

    const handleClick = (e: MouseEvent) => {
      clickPattern.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      })
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('keypress', handleKeyPress)
    document.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick)

    // Update pattern alle 5 Sekunden
    const updateInterval = setInterval(() => {
      setBehavioralPattern({
        mouseMovements: [...mouseMovements],
        typingPattern: [...typingPattern],
        scrollPattern: [...scrollPattern],
        clickPattern: [...clickPattern],
      })
    }, 5000)

    return () => {
      clearInterval(updateInterval)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('keypress', handleKeyPress)
      document.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const handleAuthenticate = async () => {
    setIsAuthenticating(true)

    // Erstelle Geräte-Signatur
    const deviceSignature = behavioralAuth.createDeviceSignature()

    // Erstelle Kontext
    const context: AuthContext = {
      timeOfDay: new Date().toISOString(),
      device: deviceSignature,
    }

    // Führe Authentifizierung durch
    const result = behavioralAuth.authenticate(userId, behavioralPattern, context)

    setAuthResult(result)
    setIsAuthenticating(false)

    if (result.authenticated) {
      if (onAuthSuccess) {
        onAuthSuccess()
      }
    } else {
      if (onAuthFailure) {
        onAuthFailure()
      }
    }
  }

  if (authResult?.authenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-lg bg-green-50 p-4"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" aria-hidden="true" />
          <div>
            <p className="font-medium text-green-900">Erfolgreich authentifiziert</p>
            <p className="text-sm text-green-700">
              Methode: {authResult.method} ({authResult.confidence}% Confidence)
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  if (authResult && !authResult.authenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-lg bg-yellow-50 p-4"
      >
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-medium text-yellow-900">
              Zusätzliche Authentifizierung erforderlich
            </p>
            <p className="text-sm text-yellow-700 mt-1">
              Confidence: {authResult.confidence}% - Bitte verwenden Sie eine zusätzliche
              Authentifizierungsmethode.
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="rounded-lg border-2 border-primary-200 bg-primary-50 p-4">
      <div className="flex items-start gap-3">
        <Shield className="h-5 w-5 text-primary-600 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
          <h3 className="font-semibold text-warmgray-900 mb-2">
            Passwortlose Authentifizierung
          </h3>
          <p className="text-sm text-warmgray-600 mb-4">
            Wir erkennen Sie anhand Ihres Verhaltens, Ihrer Geräte-Signatur und Ihres Kontexts.
            Kein Passwort erforderlich.
          </p>
          <Button
            onClick={handleAuthenticate}
            disabled={isAuthenticating}
            className="w-full"
          >
            {isAuthenticating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wird authentifiziert...
              </>
            ) : (
              'Jetzt authentifizieren'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

