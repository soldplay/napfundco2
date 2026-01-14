'use client'

import { useState, useCallback, useMemo } from 'react'

export interface CostChange {
  id: string
  label: string
  amount: number
  type: 'add' | 'remove' | 'modify'
  timestamp: number
}

interface CostTrackingState {
  baseCost: number
  changes: CostChange[]
  frequency: 'monthly' | 'one-time'
}

export function useCostTracking(initialBaseCost: number = 0) {
  const [state, setState] = useState<CostTrackingState>({
    baseCost: initialBaseCost,
    changes: [],
    frequency: 'monthly',
  })

  const addChange = useCallback(
    (change: Omit<CostChange, 'timestamp'>) => {
      setState((prev) => ({
        ...prev,
        changes: [
          ...prev.changes.filter((c) => c.id !== change.id),
          { ...change, timestamp: Date.now() },
        ],
      }))
    },
    []
  )

  const removeChange = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      changes: prev.changes.filter((c) => c.id !== id),
    }))
  }, [])

  const clearChanges = useCallback(() => {
    setState((prev) => ({
      ...prev,
      changes: [],
    }))
  }, [])

  const setBaseCost = useCallback((cost: number) => {
    setState((prev) => ({
      ...prev,
      baseCost: cost,
    }))
  }, [])

  const setFrequency = useCallback((frequency: 'monthly' | 'one-time') => {
    setState((prev) => ({
      ...prev,
      frequency,
    }))
  }, [])

  const totalCost = useMemo(() => {
    const changesTotal = state.changes.reduce((sum, change) => {
      if (change.type === 'remove') return sum - change.amount
      return sum + change.amount
    }, 0)
    return state.baseCost + changesTotal
  }, [state.baseCost, state.changes])

  const totalChanges = useMemo(() => {
    return state.changes.reduce((sum, change) => {
      if (change.type === 'remove') return sum - change.amount
      return sum + change.amount
    }, 0)
  }, [state.changes])

  return {
    baseCost: state.baseCost,
    totalCost,
    totalChanges,
    changes: state.changes,
    frequency: state.frequency,
    addChange,
    removeChange,
    clearChanges,
    setBaseCost,
    setFrequency,
  }
}

