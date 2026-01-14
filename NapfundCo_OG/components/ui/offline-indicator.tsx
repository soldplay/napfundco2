'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, WifiOff, Download, CheckCircle2 } from 'lucide-react'
import { Button } from './button'
import { useOfflineContent } from '@/hooks/useOfflineContent'

export function OfflineIndicator() {
  const { isOffline, isAvailable, saveCurrentPage, supportsOfflineMode } = useOfflineContent()
  const [showSavePrompt, setShowSavePrompt] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    // Zeige Save-Prompt nach 5 Sekunden auf der Seite
    const timer = setTimeout(() => {
      if (!isAvailable && supportsOfflineMode && !isOffline) {
        setShowSavePrompt(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [isAvailable, supportsOfflineMode, isOffline])

  // Auto-Collapse nach 7 Sekunden
  useEffect(() => {
    if (showSavePrompt && !isOffline) {
      const timer = setTimeout(() => {
        setShowSavePrompt(false)
      }, 7000) // 7 Sekunden

      return () => clearTimeout(timer)
    }
  }, [showSavePrompt, isOffline])

  const handleSave = () => {
    setIsSaving(true)
    saveCurrentPage()
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setShowSavePrompt(false)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 500)
  }

  if (!supportsOfflineMode) return null

  return (
    <>
      {/* Offline-Status */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded-lg border-2 border-yellow-200 bg-yellow-50 px-4 py-2 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <WifiOff className="h-4 w-4 text-yellow-600" aria-hidden="true" />
              <span className="text-sm font-medium text-yellow-900">
                Offline-Modus aktiv
              </span>
              {isAvailable && (
                <span className="text-xs text-yellow-700">
                  (Diese Seite ist offline verfügbar)
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save-Prompt */}
      <AnimatePresence>
        {showSavePrompt && !isOffline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-40 rounded-xl border-2 border-primary-200 bg-white p-3 md:p-4 shadow-xl"
            style={{ maxWidth: 'min(400px, calc(100vw - 2rem))' }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 rounded-full bg-primary-100 p-2">
                <Download className="h-5 w-5 text-primary-600" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-warmgray-900 mb-1">
                  Offline verfügbar machen
                </h4>
                <p className="text-sm text-warmgray-600 mb-3">
                  Speichere diese Seite, um sie später ohne Internet zu lesen.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1"
                  >
                    {isSaving ? 'Wird gespeichert...' : 'Jetzt speichern'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowSavePrompt(false)}
                  >
                    Später
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Success */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-lg border-2 border-green-200 bg-green-50 px-4 py-2 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />
              <span className="text-sm font-medium text-green-900">
                Seite für Offline-Nutzung gespeichert
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Badge (wenn verfügbar) */}
      {isAvailable && !isOffline && (
        <div className="fixed top-20 right-6 z-40 rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5">
          <div className="flex items-center gap-2">
            <Wifi className="h-3 w-3 text-primary-600" aria-hidden="true" />
            <span className="text-xs font-medium text-primary-700">
              Offline verfügbar
            </span>
          </div>
        </div>
      )}
    </>
  )
}

