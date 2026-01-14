'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { actionHistory, type Action } from '@/lib/action-history'

const UNDO_TIMEOUT = 10000 // 10 Sekunden

export function useUndoAction() {
  const [currentAction, setCurrentAction] = useState<Action | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const executeAction = useCallback(
    (action: Omit<Action, 'timestamp'>, autoExecute: boolean = true) => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      // Add action to history
      const fullAction = actionHistory.addAction(action)

      // Set current action
      setCurrentAction(fullAction)
      setTimeRemaining(UNDO_TIMEOUT)

      // Start countdown
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1000) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
            }
            return 0
          }
          return prev - 1000
        })
      }, 1000)

      // Auto-remove after timeout
      timeoutRef.current = setTimeout(() => {
        setCurrentAction(null)
        setTimeRemaining(0)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }, UNDO_TIMEOUT)

      // Execute action if autoExecute is true
      if (autoExecute && action.undo) {
        // Action is already executed, undo function will reverse it
      }
    },
    []
  )

  const undo = useCallback(() => {
    if (!currentAction) return false

    const success = actionHistory.undoLastAction()
    if (success) {
      setCurrentAction(null)
      setTimeRemaining(0)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
    return success
  }, [currentAction])

  const dismiss = useCallback(() => {
    setCurrentAction(null)
    setTimeRemaining(0)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    currentAction,
    timeRemaining,
    executeAction,
    undo,
    dismiss,
    canUndo: currentAction !== null && timeRemaining > 0,
  }
}

