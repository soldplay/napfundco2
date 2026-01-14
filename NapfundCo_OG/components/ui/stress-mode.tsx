'use client'

import { useState, useEffect } from 'react'
import { useACG } from '@/hooks/useACG'

/**
 * StressMode - Passt UI basierend auf Stress-Level an
 * Wird automatisch aktiviert, wenn hoher Stress erkannt wird
 */
export function StressMode() {
  const { stressLevel } = useACG()

  useEffect(() => {
    // Nur im Browser ausführen
    if (typeof window === 'undefined') return

    const root = document.documentElement

    if (stressLevel === 'high') {
      // Weniger Animationen
      root.style.setProperty('--animation-duration', '0.1s')
      root.classList.add('stress-mode-high')

      // Größere Buttons
      root.style.setProperty('--button-min-height', '52px')
      root.style.setProperty('--button-min-width', '52px')

      // Ruhigere Farben (reduzierter Kontrast)
      root.style.setProperty('--primary-600', 'var(--primary-500)')
    } else if (stressLevel === 'medium') {
      root.classList.add('stress-mode-medium')
      root.style.setProperty('--animation-duration', '0.2s')
      root.style.setProperty('--button-min-height', '48px')
      root.style.setProperty('--button-min-width', '48px')
    } else {
      root.classList.remove('stress-mode-high', 'stress-mode-medium')
      root.style.removeProperty('--animation-duration')
      root.style.removeProperty('--button-min-height')
      root.style.removeProperty('--button-min-width')
      root.style.removeProperty('--primary-600')
    }

    return () => {
      root.classList.remove('stress-mode-high', 'stress-mode-medium')
      root.style.removeProperty('--animation-duration')
      root.style.removeProperty('--button-min-height')
      root.style.removeProperty('--button-min-width')
      root.style.removeProperty('--primary-600')
    }
  }, [stressLevel])

  return null
}

/**
 * Ruhig-Modus Toggle Button
 */
export function CalmModeToggle() {
  const { stressLevel } = useACG()
  const [manualCalmMode, setManualCalmMode] = useState(false)

  useEffect(() => {
    // Nur im Browser ausführen
    if (typeof window === 'undefined') return

    const root = document.documentElement
    const isActive = manualCalmMode || stressLevel === 'high'

    if (isActive) {
      root.classList.add('calm-mode')
      root.style.setProperty('--animation-duration', '0.1s')
      root.style.setProperty('--button-min-height', '52px')
    } else {
      root.classList.remove('calm-mode')
      root.style.removeProperty('--animation-duration')
      root.style.removeProperty('--button-min-height')
    }
  }, [manualCalmMode, stressLevel])

  return (
    <button
      onClick={() => setManualCalmMode(!manualCalmMode)}
      className="fixed bottom-6 left-6 z-40 rounded-full bg-primary-600 p-3 text-white shadow-lg hover:bg-primary-700"
      aria-label={manualCalmMode ? 'Ruhig-Modus deaktivieren' : 'Ruhig-Modus aktivieren'}
      title={manualCalmMode ? 'Ruhig-Modus deaktivieren' : 'Ruhig-Modus aktivieren'}
    >
      {manualCalmMode ? '😌' : '🧘'}
    </button>
  )
}

