'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  resetAllData,
  resetPersonalizationOnly,
  resetHistoryOnly,
} from '@/lib/data-reset'

interface ResetButtonProps {
  variant?: 'full' | 'personalization' | 'history'
  className?: string
}

export function ResetButton({ variant = 'full', className }: ResetButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<
    'idle' | 'confirming' | 'resetting' | 'success' | 'error'
  >('idle')
  const [result, setResult] = useState<{
    deletedKeys: string[]
    errors: string[]
  } | null>(null)

  const handleReset = async () => {
    setStatus('resetting')

    let resetResult
    switch (variant) {
      case 'personalization':
        resetResult = resetPersonalizationOnly()
        break
      case 'history':
        resetResult = resetHistoryOnly()
        break
      default:
        resetResult = resetAllData()
    }

    setResult(resetResult)

    if (resetResult.success) {
      setStatus('success')
      // Seite neu laden nach 2 Sekunden
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      setStatus('error')
    }
  }

  const getVariantText = () => {
    switch (variant) {
      case 'personalization':
        return {
          title: 'Personalisierung zurücksetzen',
          description:
            'Setzt alle Personalisierungsdaten zurück. Einkäufe und Bewertungen bleiben erhalten.',
        }
      case 'history':
        return {
          title: 'Verlauf löschen',
          description: 'Löscht den Besuchsverlauf. Einstellungen bleiben erhalten.',
        }
      default:
        return {
          title: 'Alle Daten zurücksetzen',
          description:
            'Löscht alle Cookies, den Verlauf und Personalisierungsdaten. Die Seite wird neu geladen.',
        }
    }
  }

  const variantText = getVariantText()

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-lg bg-green-50 p-4 ${className || ''}`}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" aria-hidden="true" />
          <p className="text-sm font-medium text-green-900">
            Daten erfolgreich zurückgesetzt. Seite wird neu geladen...
          </p>
        </div>
      </motion.div>
    )
  }

  if (status === 'error' && result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-lg bg-red-50 p-4 ${className || ''}`}
      >
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900 mb-1">
              Fehler beim Zurücksetzen
            </p>
            {result.errors.length > 0 && (
              <ul className="text-xs text-red-700 space-y-1">
                {result.errors.map((error, idx) => (
                  <li key={idx}>• {error}</li>
                ))}
              </ul>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setStatus('idle')
                setIsOpen(false)
                setResult(null)
              }}
              className="mt-2"
            >
              Schließen
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className={className}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        {variantText.title}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 rounded-lg border-2 border-warmgray-200 bg-white p-4 shadow-lg"
          >
            <h3 className="font-semibold text-warmgray-900 mb-2">{variantText.title}</h3>
            <p className="text-sm text-warmgray-600 mb-4">{variantText.description}</p>

            {(status === 'confirming' || status === 'resetting') && (
              <div className="space-y-3">
                <div className="rounded-lg bg-yellow-50 p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">
                        Sind Sie sicher?
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Diese Aktion kann nicht rückgängig gemacht werden.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleReset}
                    disabled={status === 'resetting'}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    {status === 'resetting' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Wird zurückgesetzt...
                      </>
                    ) : (
                      'Ja, zurücksetzen'
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setStatus('idle')
                      setIsOpen(false)
                    }}
                    disabled={status === 'resetting'}
                  >
                    Abbrechen
                  </Button>
                </div>
              </div>
            )}

            {status === 'idle' && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setStatus('confirming')}
                  className="flex-1"
                >
                  Weiter
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  Abbrechen
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

