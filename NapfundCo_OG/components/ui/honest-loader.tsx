'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, AlertCircle } from 'lucide-react'
import { loadingEstimator, detectNetworkSpeed, type LoadingEstimate } from '@/lib/loading-estimator'

interface HonestLoaderProps {
  requestId: string
  message?: string
  onComplete?: () => void
  className?: string
}

export function HonestLoader({
  requestId,
  message,
  onComplete,
  className,
}: HonestLoaderProps) {
  const [estimate, setEstimate] = useState<LoadingEstimate | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    // Record request start
    loadingEstimator.recordRequest(requestId)
    startTimeRef.current = Date.now()

    // Detect network speed
    const networkSpeed = detectNetworkSpeed()
    loadingEstimator.setNetworkSpeed(requestId, networkSpeed)

    // Simulate server load detection (in real app, this would come from API)
    // For now, randomly set based on time of day or other factors
    const hour = new Date().getHours()
    const serverLoad: 'low' | 'medium' | 'high' =
      hour >= 9 && hour <= 17 ? 'medium' : 'low'
    loadingEstimator.setServerLoad(requestId, serverLoad)

    // Update estimate every 500ms
    intervalRef.current = setInterval(() => {
      const newEstimate = loadingEstimator.estimate(requestId)
      if (newEstimate) {
        setEstimate(newEstimate)

        // Check if loading is complete
        if (newEstimate.estimatedTime <= 0 && !isComplete) {
          setIsComplete(true)
          if (onComplete) {
            onComplete()
          }
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
        }
      }
    }, 500)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [requestId, onComplete, isComplete])

  // Record response when component unmounts (simulating completion)
  useEffect(() => {
    return () => {
      const responseTime = Date.now() - startTimeRef.current
      loadingEstimator.recordResponse(requestId, responseTime)
    }
  }, [requestId])

  if (isComplete) {
    return null
  }

  const seconds = Math.ceil((estimate?.estimatedTime || 0) / 1000)
  const progress = estimate
    ? Math.max(0, Math.min(100, ((Date.now() - startTimeRef.current) / (estimate.estimatedTime + (Date.now() - startTimeRef.current))) * 100))
    : 0

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm ${className || ''}`}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-2xl bg-white p-6 shadow-xl"
          style={{ maxWidth: '90vw', width: '400px' }}
        >
          <div className="flex items-center gap-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary-600" aria-hidden="true" />
            <div className="flex-1">
              <p className="font-medium text-warmgray-900">
                {message || 'Wird geladen...'}
              </p>
              {estimate && (
                <div className="mt-2">
                  <p className="text-sm text-warmgray-600">
                    Noch ca. <strong>{seconds} Sekunden</strong>
                    {estimate.reason && ` – ${estimate.reason}`}
                  </p>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-warmgray-100">
                    <motion.div
                      className="h-full bg-primary-500"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}
              {!estimate && (
                <p className="mt-2 text-sm text-warmgray-500">
                  Berechne verbleibende Zeit...
                </p>
              )}
            </div>
          </div>

          {estimate?.confidence === 'low' && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p>
                Die Schätzung ist ungenau. Bitte haben Sie etwas Geduld.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Hook für einfache Verwendung
export function useHonestLoader(requestId: string) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string>()

  const startLoading = (msg?: string) => {
    setIsLoading(true)
    setMessage(msg)
  }

  const stopLoading = () => {
    setIsLoading(false)
    const responseTime = Date.now()
    loadingEstimator.recordResponse(requestId, responseTime)
  }

  return {
    isLoading,
    message,
    startLoading,
    stopLoading,
    Loader: isLoading ? (
      <HonestLoader requestId={requestId} message={message} onComplete={stopLoading} />
    ) : null,
  }
}

