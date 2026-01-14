'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { Button } from './button'
import { useExitIntent, type ExitSurveyResponse } from '@/hooks/useExitIntent'

const EXIT_REASONS = [
  { id: 'price', label: 'Preis zu hoch' },
  { id: 'not-found', label: 'Nicht gefunden, was ich suche' },
  { id: 'too-complex', label: 'Website zu kompliziert' },
  { id: 'just-browsing', label: 'Nur stöbern' },
  { id: 'later', label: 'Später nochmal schauen' },
  { id: 'other', label: 'Anderes' },
]

export function ExitSurvey() {
  const { showSurvey, submitSurvey, dismissSurvey } = useExitIntent()
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!selectedReason) return

    setIsSubmitting(true)

    const response: ExitSurveyResponse = {
      reason: selectedReason,
      feedback: feedback.trim() || undefined,
      timestamp: Date.now(),
    }

    submitSurvey(response)

    // Kurze Verzögerung für besseres UX
    setTimeout(() => {
      setIsSubmitting(false)
    }, 500)
  }

  if (!showSurvey) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 backdrop-blur-sm p-4"
        onClick={dismissSurvey}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-2xl border-2 border-primary-200 bg-white p-6 shadow-2xl"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-warmgray-900">
                Willst du uns sagen, warum?
              </h3>
              <p className="mt-1 text-sm text-warmgray-600">
                Nur eine kurze Frage – kein Betteln, kein Spam.
              </p>
            </div>
            <button
              onClick={dismissSurvey}
              className="rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-warmgray-700 mb-2">
                Warum verlässt du uns?
              </p>
              <div className="space-y-2">
                {EXIT_REASONS.map((reason) => (
                  <label
                    key={reason.id}
                    className="flex items-center gap-3 rounded-lg border-2 border-warmgray-200 p-3 cursor-pointer transition-colors hover:border-primary-300 hover:bg-primary-50"
                  >
                    <input
                      type="radio"
                      name="exit-reason"
                      value={reason.id}
                      checked={selectedReason === reason.id}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-warmgray-700">{reason.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {selectedReason && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="overflow-hidden"
              >
                <label htmlFor="exit-feedback" className="block text-sm font-medium text-warmgray-700 mb-2">
                  Zusätzliches Feedback (optional)
                </label>
                <textarea
                  id="exit-feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={2}
                  placeholder="Was können wir besser machen?"
                  className="w-full rounded-lg border border-warmgray-300 bg-white px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </motion.div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={dismissSurvey}
                className="flex-1"
                disabled={isSubmitting}
              >
                Überspringen
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!selectedReason || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  'Wird gesendet...'
                ) : (
                  <>
                    Absenden
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

