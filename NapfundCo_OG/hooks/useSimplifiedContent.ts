'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'napfco_simplified_content_preference'

function getInitialState(type: 'agb' | 'datenschutz' | 'impressum' | 'versand'): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const preferences = JSON.parse(stored)
      return preferences[type] || false
    }
  } catch {
    // Ignore parse errors
  }
  return false
}

export function useSimplifiedContent(
  type: 'agb' | 'datenschutz' | 'impressum' | 'versand'
) {
  const [isSimplified, setIsSimplified] = useState(() => getInitialState(type))

  useEffect(() => {
    // Lade Präferenz aus localStorage
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const preferences = JSON.parse(stored)
        setIsSimplified(preferences[type] || false)
      } catch {
        // Ignore parse errors
      }
    }
  }, [type])

  const toggleSimplified = () => {
    const newValue = !isSimplified
    setIsSimplified(newValue)

    // Speichere Präferenz
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const preferences = stored ? JSON.parse(stored) : {}
      preferences[type] = newValue
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
    } catch {
      // Ignore storage errors
    }
  }

  return {
    isSimplified,
    toggleSimplified,
  }
}

