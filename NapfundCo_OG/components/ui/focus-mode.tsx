'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Focus, X, Clock } from 'lucide-react'
import { Button } from './button'
import { useFocusMode } from '@/hooks/useFocusMode'

/**
 * FocusMode - Blendet Ablenkungen aus
 */
export function FocusMode() {
  const { isActive } = useFocusMode()
  const observerRef = useRef<MutationObserver | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Funktion zum Ausblenden von Pop-ups
  const hidePopups = () => {
    if (typeof document === 'undefined') return

    const selectors = [
      '[data-popup]',
      '[data-chatbot]',
      '[data-banner]',
      '.popup',
      '.chatbot',
      '.banner',
      '[role="dialog"]:not([data-keep-visible])',
    ]

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement
        // Nur ausblenden wenn noch nicht versteckt
        if (!htmlEl.hasAttribute('data-focus-hidden')) {
          htmlEl.setAttribute('data-focus-original-display', htmlEl.style.display || '')
          htmlEl.style.display = 'none'
          htmlEl.setAttribute('data-focus-hidden', 'true')
        }
      })
    })
  }

  // Funktion zum Anzeigen von Pop-ups
  const showPopups = () => {
    if (typeof document === 'undefined') return

    const hiddenElements = document.querySelectorAll('[data-focus-hidden="true"]')
    hiddenElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      const originalDisplay = htmlEl.getAttribute('data-focus-original-display') || ''
      htmlEl.style.display = originalDisplay
      htmlEl.removeAttribute('data-focus-hidden')
      htmlEl.removeAttribute('data-focus-original-display')
    })
  }

  useEffect(() => {
    if (isActive) {
      // Füge Klasse zum Body hinzu
      document.body.classList.add('focus-mode-active')

      // Verstecke Pop-ups sofort
      hidePopups()

      // Erstelle MutationObserver um neue Pop-ups zu erkennen
      observerRef.current = new MutationObserver(() => {
        hidePopups()
      })

      // Beobachte Änderungen im DOM
      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-popup', 'class', 'style'],
      })

      // Zusätzlich: Regelmäßige Checks (falls Observer etwas verpasst)
      intervalRef.current = setInterval(() => {
        hidePopups()
      }, 1000) // Alle Sekunde prüfen

      return () => {
        // Cleanup
        if (observerRef.current) {
          observerRef.current.disconnect()
          observerRef.current = null
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        document.body.classList.remove('focus-mode-active')
        showPopups()
      }
    } else {
      // Deaktiviert: Zeige alle Pop-ups wieder
      document.body.classList.remove('focus-mode-active')
      showPopups()

      // Cleanup Observer und Interval
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isActive])

  return null
}

/**
 * FocusModeToggle - Button zum Aktivieren/Deaktivieren
 */
export function FocusModeToggle() {
  const { isActive, remainingMinutes, activateFocusMode, deactivateFocusMode } = useFocusMode()

  const handleToggle = () => {
    if (isActive) {
      deactivateFocusMode()
    } else {
      activateFocusMode() // Standard: 30 Minuten
    }
  }

  return (
    <>
      <FocusMode />
      <div className="fixed bottom-6 left-6 z-40">
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-3 rounded-lg border-2 border-primary-200 bg-white p-3 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <Focus className="h-4 w-4 text-primary-600" aria-hidden="true" />
                <span className="text-sm font-medium text-warmgray-900">Fokus-Modus aktiv</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-warmgray-600">
                <Clock className="h-3 w-3" aria-hidden="true" />
                <span>Noch {remainingMinutes} Minuten</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={handleToggle}
          className={`rounded-full p-3 shadow-lg transition-colors ${
            isActive
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
          aria-label={isActive ? 'Fokus-Modus deaktivieren' : 'Fokus-Modus aktivieren'}
          title={isActive ? 'Fokus-Modus deaktivieren' : 'Fokus-Modus aktivieren (30 Min)'}
        >
          {isActive ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Focus className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>
    </>
  )
}
