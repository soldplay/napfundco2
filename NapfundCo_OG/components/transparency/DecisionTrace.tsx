'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X, Clock, Database, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  decisionTraceManager,
  type DecisionTrace,
} from '@/lib/decision-trace'

interface DecisionTraceProps {
  elementId: string
  className?: string
}

export function DecisionTraceDisplay({ elementId, className }: DecisionTraceProps) {
  const [traces, setTraces] = useState<DecisionTrace[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const elementTraces = decisionTraceManager.getTraces(elementId)
    setTraces(elementTraces)
  }, [elementId])

  if (traces.length === 0) return null

  const lastTrace = traces[traces.length - 1]

  return (
    <div className={className}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Info className="h-4 w-4" aria-hidden="true" />
        Decision Trace
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 top-full z-50 mt-2 w-96 rounded-lg border-2 border-primary-200 bg-white p-4 shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-warmgray-900">Decision Trace</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
                aria-label="Schließen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {traces.map((trace, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-warmgray-200 bg-warmgray-50 p-3"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Code className="h-4 w-4 text-primary-600 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-warmgray-900">
                        {trace.reason}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-warmgray-600">
                    <div className="flex items-center gap-2">
                      <Database className="h-3 w-3" aria-hidden="true" />
                      <span>
                        <strong>Datenquelle:</strong> {trace.dataSource}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      <span>
                        <strong>Zeitpunkt:</strong>{' '}
                        {new Date(trace.timestamp).toLocaleString('de-DE')}
                      </span>
                    </div>

                    {trace.context.userHistory && trace.context.userHistory.length > 0 && (
                      <div>
                        <strong>Historie:</strong>{' '}
                        {trace.context.userHistory.slice(0, 3).join(', ')}
                      </div>
                    )}

                    {trace.context.preferences && Object.keys(trace.context.preferences).length > 0 && (
                      <div>
                        <strong>Präferenzen:</strong>{' '}
                        {JSON.stringify(trace.context.preferences)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-warmgray-200">
              <p className="text-xs text-warmgray-500">
                Jede Empfehlung und Personalisierung ist vollständig rückverfolgbar für
                Transparenz und Compliance.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Hook für einfache Verwendung
 */
export function useDecisionTrace(elementId: string) {
  const [traces, setTraces] = useState<DecisionTrace[]>([])

  useEffect(() => {
    const elementTraces = decisionTraceManager.getTraces(elementId)
    setTraces(elementTraces)
  }, [elementId])

  return {
    traces,
    lastTrace: traces.length > 0 ? traces[traces.length - 1] : null,
    TraceDisplay: () => <DecisionTraceDisplay elementId={elementId} />,
  }
}

