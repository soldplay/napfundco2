'use client'

import { useState, useEffect, useCallback } from 'react'

const FOCUS_MODE_STORAGE_KEY = 'napfco_focus_mode'
const FOCUS_MODE_DURATION = 30 * 60 * 1000 // 30 Minuten in Millisekunden

interface FocusModeState {
  isActive: boolean
  endTime: number | null
  remainingTime: number
}

export function useFocusMode() {
  const [state, setState] = useState<FocusModeState>({
    isActive: false,
    endTime: null,
    remainingTime: 0,
  })

  useEffect(() => {
    // Lade gespeicherten Zustand
    try {
      const stored = localStorage.getItem(FOCUS_MODE_STORAGE_KEY)
      if (stored) {
        const saved: FocusModeState = JSON.parse(stored)
        const now = Date.now()

        if (saved.endTime && saved.endTime > now) {
          // Focus Mode ist noch aktiv
          setState({
            isActive: true,
            endTime: saved.endTime,
            remainingTime: saved.endTime - now,
          })
        } else {
          // Focus Mode ist abgelaufen
          localStorage.removeItem(FOCUS_MODE_STORAGE_KEY)
          setState({
            isActive: false,
            endTime: null,
            remainingTime: 0,
          })
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [])

  // Update remaining time
  useEffect(() => {
    if (!state.isActive || !state.endTime) return

    const interval = setInterval(() => {
      const now = Date.now()
      const remaining = state.endTime! - now

      if (remaining <= 0) {
        // Focus Mode ist abgelaufen
        setState({
          isActive: false,
          endTime: null,
          remainingTime: 0,
        })
        localStorage.removeItem(FOCUS_MODE_STORAGE_KEY)
      } else {
        setState((prev) => ({
          ...prev,
          remainingTime: remaining,
        }))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [state.isActive, state.endTime])

  const activateFocusMode = useCallback((duration: number = FOCUS_MODE_DURATION) => {
    const endTime = Date.now() + duration
    const newState: FocusModeState = {
      isActive: true,
      endTime,
      remainingTime: duration,
    }

    setState(newState)
    try {
      localStorage.setItem(FOCUS_MODE_STORAGE_KEY, JSON.stringify(newState))
    } catch {
      // Ignore storage errors
    }
  }, [])

  const deactivateFocusMode = useCallback(() => {
    setState({
      isActive: false,
      endTime: null,
      remainingTime: 0,
    })
    try {
      localStorage.removeItem(FOCUS_MODE_STORAGE_KEY)
    } catch {
      // Ignore storage errors
    }
  }, [])

  const getRemainingMinutes = useCallback(() => {
    return Math.ceil(state.remainingTime / (60 * 1000))
  }, [state.remainingTime])

  return {
    isActive: state.isActive,
    remainingTime: state.remainingTime,
    remainingMinutes: getRemainingMinutes(),
    activateFocusMode,
    deactivateFocusMode,
  }
}

