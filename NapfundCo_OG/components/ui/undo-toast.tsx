'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, X } from 'lucide-react'
import { Button } from './button'
import { useUndoAction } from '@/hooks/useUndoAction'

interface UndoToastProps {
  action: {
    id: string
    type: string
    description: string
    timestamp: number
    undo: () => void
  }
  timeRemaining: number
  onUndo: () => void
  onDismiss: () => void
}

export function UndoToast({ action, timeRemaining, onUndo, onDismiss }: UndoToastProps) {
  const seconds = Math.ceil(timeRemaining / 1000)
  const progress = (timeRemaining / 10000) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border-2 border-primary-200 bg-white p-4 shadow-xl"
      style={{ maxWidth: '90vw', width: '400px' }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium text-warmgray-900">
            {action.description}
          </p>
          <p className="mt-1 text-xs text-warmgray-600">
            Du hast noch <strong>{seconds} Sekunden</strong>, um das rückgängig zu machen
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-warmgray-100">
            <motion.div
              className="h-full bg-primary-500"
              initial={{ width: '100%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            size="sm"
            onClick={onUndo}
            className="bg-primary-600 hover:bg-primary-700"
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Rückgängig
          </Button>
          <button
            onClick={onDismiss}
            className="rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
            aria-label="Schließen"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Provider Component für globale Undo-Funktionalität
export function UndoProvider({ children }: { children: React.ReactNode }) {
  const { currentAction, timeRemaining, undo, dismiss, canUndo } = useUndoAction()

  return (
    <>
      {children}
      <AnimatePresence>
        {canUndo && currentAction && (
          <UndoToast
            action={currentAction}
            timeRemaining={timeRemaining}
            onUndo={undo}
            onDismiss={dismiss}
          />
        )}
      </AnimatePresence>
    </>
  )
}

