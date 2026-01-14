'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSmartAssistant } from '@/hooks/useSmartAssistant'

export function SmartAssistant() {
  const { query, filterResult, filteredProducts, isActive, processQuery, clearQuery } =
    useSmartAssistant()
  const [inputValue, setInputValue] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      processQuery(inputValue)
      setIsExpanded(true)
    }
  }

  const handleClear = () => {
    setInputValue('')
    clearQuery()
    setIsExpanded(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Toggle Button */}
      {!isExpanded && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsExpanded(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg hover:bg-accent-600"
          aria-label="Smart Assistent öffnen"
        >
          <Sparkles className="h-6 w-6" aria-hidden="true" />
        </motion.button>
      )}

      {/* Expanded Assistant */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="h-[600px] w-[400px] rounded-2xl border-2 border-primary-200 bg-white shadow-2xl"
            style={{ maxHeight: '90vh', maxWidth: '90vw' }}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-warmgray-200 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  <h3 className="font-semibold text-warmgray-900">
                    Was willst du wirklich?
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsExpanded(false)
                    handleClear()
                  }}
                  className="rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
                  aria-label="Schließen"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Input */}
              <div className="border-b border-warmgray-200 p-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="z.B. 'Ich brauch was Günstiges, hält 2 Jahre'"
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className="flex-1">
                      <Search className="mr-2 h-4 w-4" />
                      Suchen
                    </Button>
                    {isActive && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleClear}
                      >
                        Zurücksetzen
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto p-4">
                {isActive && filterResult && (
                  <div className="space-y-4">
                    <div className="rounded-lg bg-primary-50 p-3">
                      <p className="text-sm font-medium text-primary-900">
                        {filterResult.explanation}
                      </p>
                    </div>

                    {filteredProducts.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-warmgray-700">
                          {filteredProducts.length} Produkt
                          {filteredProducts.length !== 1 ? 'e' : ''} gefunden:
                        </p>
                        <div className="space-y-3">
                          {filteredProducts.slice(0, 3).map((product) => (
                            <div key={product.id} className="rounded-lg border border-warmgray-200 p-3">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl" role="img" aria-label={product.category}>
                                  {product.category === 'hund' ? '🐕' : product.category === 'katze' ? '🐈' : '🐴'}
                                </span>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-warmgray-900">{product.name}</h4>
                                  <p className="text-sm text-warmgray-600">{product.shortDescription}</p>
                                  <p className="mt-1 text-sm font-bold text-primary-600">
                                    {new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' }).format(product.price)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {filteredProducts.length > 5 && (
                          <Button variant="outline" size="sm" className="w-full">
                            Alle {filteredProducts.length} Ergebnisse anzeigen
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-warmgray-600">
                          Keine Produkte gefunden. Versuchen Sie eine andere Anfrage.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {!isActive && (
                  <div className="py-8 text-center">
                    <p className="text-sm text-warmgray-600">
                      Beschreiben Sie, was Sie suchen, und wir finden das passende Produkt
                      für Sie.
                    </p>
                    <div className="mt-4 space-y-2 text-left">
                      <p className="text-xs font-medium text-warmgray-700">Beispiele:</p>
                      <ul className="space-y-1 text-xs text-warmgray-600">
                        <li>• &ldquo;Günstiges Hundefutter&rdquo;</li>
                        <li>• &ldquo;Premium Katzenfutter&rdquo;</li>
                        <li>• &ldquo;Hält 2 Jahre&rdquo;</li>
                        <li>• &ldquo;Für Allergiker&rdquo;</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

