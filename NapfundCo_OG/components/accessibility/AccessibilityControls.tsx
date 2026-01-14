'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accessibility, X, Eye, Type, Languages, Monitor, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  accessibilityEngine,
  type AccessibilitySettings,
} from '@/lib/accessibility-engine'

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
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

  const handleSettingChange = (key: keyof AccessibilitySettings, value: unknown) => {
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
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-6 z-[60] rounded-full bg-primary-600 p-3 text-white shadow-xl hover:bg-primary-700 transition-all"
        aria-label="Barrierefreiheitseinstellungen"
        title="Barrierefreiheitseinstellungen"
      >
        <Accessibility className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Controls Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-20 right-4 md:right-6 z-[60] w-[calc(100vw-2rem)] md:w-80 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border-2 border-primary-200 bg-white p-4 md:p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-warmgray-900">Barrierefreiheit</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
                aria-label="Schließen"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Accessibility Score */}
            {checkResult && (
              <div className="mb-4 rounded-lg bg-primary-50 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-primary-900">
                    Barrierefreiheits-Score
                  </span>
                  <span className="text-lg font-bold text-primary-600">
                    {checkResult.score}%
                  </span>
                </div>
                {checkResult.issues.length > 0 && (
                  <div className="mt-2 text-xs text-primary-700">
                    {checkResult.issues.length} Problem(e) gefunden
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              {/* Schriftgröße */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-warmgray-700">
                  <Type className="h-4 w-4" aria-hidden="true" />
                  Schriftgröße
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['small', 'medium', 'large', 'xlarge'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSettingChange('fontSize', size)}
                      className={`rounded-lg border-2 px-3 py-2 text-xs font-medium transition-colors ${
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
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-warmgray-700">
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  Kontrast
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['normal', 'high', 'very-high'] as const).map((contrast) => (
                    <button
                      key={contrast}
                      onClick={() => handleSettingChange('contrast', contrast)}
                      className={`rounded-lg border-2 px-3 py-2 text-xs font-medium transition-colors ${
                        settings.contrast === contrast
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-warmgray-200 text-warmgray-700 hover:border-primary-300'
                      }`}
                    >
                      {contrast === 'normal'
                        ? 'Normal'
                        : contrast === 'high'
                          ? 'Hoch'
                          : 'Sehr hoch'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vereinfachte Sprache */}
              <div className="flex items-center justify-between rounded-lg border-2 border-warmgray-200 p-3">
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-warmgray-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-warmgray-900">
                      Vereinfachte Sprache
                    </p>
                    <p className="text-xs text-warmgray-500">
                      Einfachere Formulierungen
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.simplifiedLanguage}
                    onChange={(e) => handleSettingChange('simplifiedLanguage', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-warmgray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-warmgray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              {/* Screenreader-Optimierung */}
              <div className="flex items-center justify-between rounded-lg border-2 border-warmgray-200 p-3">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-warmgray-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-warmgray-900">
                      Screenreader-Optimierung
                    </p>
                    <p className="text-xs text-warmgray-500">
                      Verbesserte ARIA-Labels
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.screenReaderOptimized}
                    onChange={(e) =>
                      handleSettingChange('screenReaderOptimized', e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-warmgray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-warmgray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-warmgray-200">
              <Button
                variant="outline"
                size="sm"
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
        )}
      </AnimatePresence>
    </>
  )
}

