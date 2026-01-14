'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, CheckCircle2, X, Info, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  consentManager,
  type ConsentOption,
  type ConsentPurpose,
} from '@/lib/consent-manager'

interface AdvancedConsentProps {
  onConsentChange?: () => void
}

export function AdvancedConsent({ onConsentChange }: AdvancedConsentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [consents, setConsents] = useState<Record<ConsentPurpose, boolean>>(
    {} as Record<ConsentPurpose, boolean>
  )
  const [hasInitialConsents, setHasInitialConsents] = useState(false)

  useEffect(() => {
    // Prüfe, ob bereits Einwilligungen vorhanden sind
    const hasConsents = consentManager.hasConsents()
    setHasInitialConsents(hasConsents)

    if (!hasConsents) {
      // Zeige Consent-Dialog beim ersten Besuch
      setIsOpen(true)
    }

    // Lade aktuelle Consents
    updateConsentStates()
  }, [])

  const updateConsentStates = () => {
    const options = consentManager.getConsentOptions()
    const newConsents = {} as Record<ConsentPurpose, boolean>

    options.forEach((option) => {
      newConsents[option.id] = consentManager.hasConsent(option.id) || option.required
    })

    setConsents(newConsents)
  }

  const handleToggleConsent = (purpose: ConsentPurpose, option: ConsentOption) => {
    if (option.required) return // Kann nicht deaktiviert werden

    const newValue = !consents[purpose]
    setConsents((prev) => ({ ...prev, [purpose]: newValue }))

    if (newValue) {
      const ipAddress = '' // Wird serverseitig gesetzt
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
      consentManager.grantConsent(purpose, option.duration, ipAddress, userAgent)
    } else {
      consentManager.revokeConsent(purpose)
    }

    if (onConsentChange) {
      onConsentChange()
    }
  }

  const handleAcceptAll = () => {
    const ipAddress = ''
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
    consentManager.grantAllConsents(ipAddress, userAgent)
    updateConsentStates()
    setIsOpen(false)
    if (onConsentChange) {
      onConsentChange()
    }
  }

  const handleRejectAll = () => {
    consentManager.revokeAllConsents()
    updateConsentStates()
    setIsOpen(false)
    if (onConsentChange) {
      onConsentChange()
    }
  }

  const handleSave = () => {
    setIsOpen(false)
    if (onConsentChange) {
      onConsentChange()
    }
  }

  const exportConsents = () => {
    const data = consentManager.exportConsents()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `consents_${new Date().toISOString()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const options = consentManager.getConsentOptions()

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-primary-600 p-3 text-white shadow-lg hover:bg-primary-700"
        aria-label="Cookie-Einstellungen"
        title="Cookie-Einstellungen"
      >
        <Settings className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Consent Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-primary-200 bg-white shadow-2xl"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="heading-3 text-warmgray-900">
                      Cookie-Einstellungen
                    </h2>
                    <p className="mt-2 text-sm text-warmgray-600">
                      Sie haben die volle Kontrolle über Ihre Daten. Wählen Sie aus, welche
                      Cookies Sie zulassen möchten.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
                    aria-label="Schließen"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Consent Options */}
                <div className="space-y-4 mb-6">
                  {options.map((option) => (
                    <div
                      key={option.id}
                      className="rounded-lg border-2 border-warmgray-200 p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-warmgray-900">
                              {option.name}
                            </h3>
                            {option.required && (
                              <span className="rounded-full bg-warmgray-100 px-2 py-0.5 text-xs font-medium text-warmgray-700">
                                Erforderlich
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-warmgray-600 mb-3">
                            {option.description}
                          </p>

                          {/* Details */}
                          <div className="space-y-2 text-xs text-warmgray-500">
                            <div>
                              <strong>Datenkategorien:</strong> {option.dataCategories.join(', ')}
                            </div>
                            <div>
                              <strong>Empfänger:</strong> {option.dataRecipients.join(', ')}
                            </div>
                            <div>
                              <strong>Rechtsgrundlage:</strong> {option.legalBasis}
                            </div>
                            <div>
                              <strong>Speicherdauer:</strong> {option.duration}
                            </div>
                          </div>
                        </div>

                        {/* Toggle */}
                        <label className="relative inline-flex items-center cursor-pointer ml-4">
                          <input
                            type="checkbox"
                            checked={consents[option.id] || false}
                            onChange={() => handleToggleConsent(option.id, option)}
                            disabled={option.required}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-warmgray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-warmgray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 border-t border-warmgray-200 pt-6">
                  <Button onClick={handleAcceptAll} variant="outline" className="flex-1">
                    Alle akzeptieren
                  </Button>
                  <Button onClick={handleRejectAll} variant="outline" className="flex-1">
                    Alle ablehnen
                  </Button>
                  <Button onClick={handleSave} className="flex-1 bg-primary-600 hover:bg-primary-700">
                    Auswahl speichern
                  </Button>
                  <Button
                    onClick={exportConsents}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Exportieren
                  </Button>
                </div>

                {/* Info */}
                <div className="mt-6 rounded-lg bg-primary-50 p-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-primary-600 mt-0.5" aria-hidden="true" />
                    <div className="text-sm text-primary-700">
                      <p className="font-medium mb-1">Ihre Rechte</p>
                      <p>
                        Sie können Ihre Einwilligung jederzeit widerrufen. Alle Einwilligungen
                        werden für Audit-Zwecke gespeichert und sind jederzeit einsehbar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

