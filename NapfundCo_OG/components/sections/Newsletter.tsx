'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [consent, setConsent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!consent) {
      setStatus('error')
      return
    }

    setStatus('loading')

    // Simulierte API-Anfrage
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('success')
    setEmail('')
    setConsent(false)
  }

  return (
    <section
      className="section bg-gradient-to-br from-primary-50 to-secondary-50"
      aria-labelledby="newsletter-heading"
    >
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
              <Mail className="h-8 w-8 text-primary-600" aria-hidden="true" />
            </div>

            <h2
              id="newsletter-heading"
              className="heading-2 text-warmgray-900"
            >
              Bleib auf dem Laufenden!
            </h2>
            <p className="body-large mt-4 text-warmgray-600">
              Abonniere unseren Newsletter und erhalte exklusive Angebote,
              Tipps zur Tierernährung und News zu neuen Produkten.
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-green-50 p-6 text-green-700"
              >
                <Check className="h-6 w-6" aria-hidden="true" />
                <p className="font-medium">
                  Vielen Dank! Bitte bestätige deine E-Mail-Adresse.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                      E-Mail-Adresse
                    </label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="Deine E-Mail-Adresse"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                      aria-describedby="newsletter-privacy"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'loading' || !consent}
                    className="h-12 bg-accent-500 hover:bg-accent-600"
                  >
                    {status === 'loading' ? 'Wird angemeldet...' : 'Anmelden'}
                  </Button>
                </div>

                {/* DSGVO Consent */}
                <div className="mt-4 flex items-start gap-3 text-left">
                  <input
                    type="checkbox"
                    id="newsletter-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-warmgray-300 text-primary-600 focus:ring-primary-500"
                    required
                  />
                  <label
                    htmlFor="newsletter-consent"
                    id="newsletter-privacy"
                    className="text-sm text-warmgray-600"
                  >
                    Ich stimme zu, den Newsletter zu erhalten und habe die{' '}
                    <a
                      href="/datenschutz"
                      className="text-primary-600 underline hover:text-primary-700"
                    >
                      Datenschutzerklärung
                    </a>{' '}
                    gelesen. Ich kann mich jederzeit abmelden.
                  </label>
                </div>

                {status === 'error' && !consent && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Bitte stimme der Datenschutzerklärung zu.</span>
                  </div>
                )}
              </form>
            )}

            <p className="mt-4 text-xs text-warmgray-500">
              Wir respektieren deine Privatsphäre. Kein Spam, versprochen!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

