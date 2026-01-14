'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accessibility, X, Eye, Type, Languages, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDevice } from '@/hooks/useDevice'
import {
  accessibilityEngine,
  type AccessibilitySettings,
} from '@/lib/accessibility-engine'
import { sessionMonitor } from '@/lib/session-monitor'

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile } = useDevice()
  const [settings, setSettings] = useState<AccessibilitySettings>(
    accessibilityEngine.getSettings()
  )
  const [checkResult, setCheckResult] = useState<{
    issues: string[]
    score: number
  } | null>(null)

  useEffect(() => {
    // Wende Einstellungen an, wenn Komponente gemountet ist
    accessibilityEngine.applySettings()
    
    // Führe Barrierefreiheits-Prüfung durch
    const result = accessibilityEngine.checkAccessibility()
    setCheckResult(result)
  }, [settings])

  // Wende Einstellungen beim ersten Mount an
  useEffect(() => {
    accessibilityEngine.applySettings()
  }, [])

  // Auto-Collapse nach 7 Sekunden
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false)
      }, 7000) // 7 Sekunden

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleSettingChange = (key: keyof AccessibilitySettings, value: unknown) => {
    // Markiere Accessibility-Mode als aktiv, damit SessionMonitor nicht als verdächtig erkennt
    sessionMonitor.markAccessibilityMode()
    
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    accessibilityEngine.setSettings(newSettings)
    accessibilityEngine.applySettings()
    
    // Für vereinfachte Sprache: Warte etwas länger, damit DOM bereit ist
    if (key === 'simplifiedLanguage') {
      setTimeout(() => {
        accessibilityEngine.applySettings()
      }, 300)
    }
  }

  return (
    <>
      {/* Toggle Button - responsiv positioniert */}
      <button
        data-a11y-toggle="true"
        onClick={() => {
          sessionMonitor.markAccessibilityMode()
          setIsOpen(!isOpen)
        }}
        className={`fixed z-[70] rounded-full bg-primary-600 text-white shadow-xl hover:bg-primary-700 transition-all ${
          isMobile
            ? 'bottom-4 right-4 p-2.5'
            : 'bottom-6 right-6 p-3'
        }`}
        aria-label="Barrierefreiheitseinstellungen"
        title="Barrierefreiheit"
      >
        <Accessibility className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} aria-hidden="true" />
      </button>

      {/* Controls Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop für Mobile */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 z-[65]"
                onClick={() => setIsOpen(false)}
              />
            )}
            
            <motion.div
              data-popup="true"
              data-accessibility-controls="true"
              initial={{ opacity: 0, y: isMobile ? 100 : 0, x: isMobile ? 0 : 100 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: isMobile ? 100 : 0, x: isMobile ? 0 : 100 }}
              className={`fixed z-[70] bg-white shadow-2xl overflow-y-auto accessibility-controls ${
                isMobile
                  ? 'bottom-0 left-0 right-0 rounded-t-2xl max-h-[80vh] p-4'
                  : 'bottom-20 right-6 w-80 max-h-[calc(100vh-8rem)] rounded-2xl border-2 border-primary-200 p-6'
              }`}
              aria-label="Barrierefreiheitseinstellungen"
            >
              {/* Drag Handle für Mobile */}
              {isMobile && (
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-1 bg-warmgray-300 rounded-full" />
                </div>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <h3 className={`font-semibold text-warmgray-900 ${isMobile ? 'text-sm' : ''}`}>
                  Barrierefreiheit
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
                  aria-label="Schließen"
                >
                  <X className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                </button>
              </div>

              {/* Accessibility Score */}
              {checkResult && (
                <div className={`mb-4 rounded-lg bg-primary-50 ${isMobile ? 'p-2' : 'p-3'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-primary-900`}>
                      Score
                    </span>
                    <span className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-primary-600`}>
                      {checkResult.score}%
                    </span>
                  </div>
                </div>
              )}

              <div className={`space-y-3 ${isMobile ? 'space-y-2' : ''}`}>
                {/* Schriftgröße */}
                <div>
                  <label className={`mb-2 flex items-center gap-2 ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-warmgray-700`}>
                    <Type className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} aria-hidden="true" />
                    Schriftgröße
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['small', 'medium', 'large', 'xlarge'] as const).map((size) => (
                      <button
                        key={size}
                        data-a11y-toggle="true"
                        aria-label={`Schriftgröße ${size === 'small' ? 'Klein' : size === 'medium' ? 'Mittel' : size === 'large' ? 'Groß' : 'Sehr groß'}`}
                        onClick={() => handleSettingChange('fontSize', size)}
                        className={`rounded-lg border-2 ${isMobile ? 'px-2 py-1.5 text-[10px]' : 'px-3 py-2 text-xs'} font-medium transition-colors ${
                          settings.fontSize === size
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-warmgray-200 text-warmgray-700 hover:border-primary-300'
                        }`}
                      >
                        {size === 'small' ? 'S' : size === 'medium' ? 'M' : size === 'large' ? 'L' : 'XL'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kontrast */}
                <div>
                  <label className={`mb-2 flex items-center gap-2 ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-warmgray-700`}>
                    <Eye className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} aria-hidden="true" />
                    Kontrast
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['normal', 'high', 'very-high'] as const).map((contrast) => (
                      <button
                        key={contrast}
                        data-a11y-toggle="true"
                        aria-label={`Kontrast ${contrast === 'normal' ? 'Normal' : contrast === 'high' ? 'Hoch' : 'Maximal'}`}
                        onClick={() => handleSettingChange('contrast', contrast)}
                        className={`rounded-lg border-2 ${isMobile ? 'px-2 py-1.5 text-[10px]' : 'px-3 py-2 text-xs'} font-medium transition-colors ${
                          settings.contrast === contrast
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-warmgray-200 text-warmgray-700 hover:border-primary-300'
                        }`}
                      >
                        {contrast === 'normal' ? 'Normal' : contrast === 'high' ? 'Hoch' : 'Max'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vereinfachte Sprache */}
                <div className={`flex items-center justify-between rounded-lg border-2 border-warmgray-200 ${isMobile ? 'p-2' : 'p-3'}`}>
                  <div className="flex items-center gap-2">
                    <Languages className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-warmgray-600`} aria-hidden="true" />
                    <div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-warmgray-900`}>
                        Einfache Sprache
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer" data-a11y-toggle="true" aria-label="Einfache Sprache">
                    <input
                      type="checkbox"
                      checked={settings.simplifiedLanguage}
                      onChange={(e) => handleSettingChange('simplifiedLanguage', e.target.checked)}
                      className="sr-only peer"
                      aria-label="Einfache Sprache aktivieren"
                    />
                    <div className={`${isMobile ? 'w-9 h-5' : 'w-11 h-6'} bg-warmgray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-warmgray-300 after:border after:rounded-full ${isMobile ? 'after:h-4 after:w-4' : 'after:h-5 after:w-5'} after:transition-all peer-checked:bg-primary-600`}></div>
                  </label>
                </div>

                {/* Screenreader-Optimierung */}
                <div className={`rounded-lg border-2 border-warmgray-200 ${isMobile ? 'p-2' : 'p-3'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Monitor className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-warmgray-600`} aria-hidden="true" />
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-warmgray-900`}>
                          Screenreader-Optimierung
                        </p>
                        <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-warmgray-500 mt-0.5`}>
                          Optimiert für NVDA, JAWS, VoiceOver
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer" data-a11y-toggle="true" aria-label="Screenreader-Optimierung">
                      <input
                        type="checkbox"
                        checked={settings.screenReaderOptimized}
                        onChange={(e) =>
                          handleSettingChange('screenReaderOptimized', e.target.checked)
                        }
                        className="sr-only peer"
                        aria-label="Screenreader-Optimierung aktivieren"
                      />
                      <div className={`${isMobile ? 'w-9 h-5' : 'w-11 h-6'} bg-warmgray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-warmgray-300 after:border after:rounded-full ${isMobile ? 'after:h-4 after:w-4' : 'after:h-5 after:w-5'} after:transition-all peer-checked:bg-primary-600`}></div>
                    </label>
                  </div>
                  <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-warmgray-600 mt-1`}>
                    Verbessert ARIA-Labels und Tastatur-Navigation für Screenreader-Software
                  </p>
                </div>
              </div>

              <div className={`mt-4 pt-3 border-t border-warmgray-200 ${isMobile ? 'pb-4' : ''}`}>
                <Button
                  variant="outline"
                  size={isMobile ? 'sm' : 'default'}
                  onClick={() => {
                    accessibilityEngine.reset()
                    setSettings(accessibilityEngine.getSettings())
                  }}
                  className="w-full"
                >
                  Zurücksetzen
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
