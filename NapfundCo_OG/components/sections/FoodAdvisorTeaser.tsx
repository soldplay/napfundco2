'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  'Individuelle Empfehlung basierend auf deinem Tier',
  'Berücksichtigung von Allergien & Unverträglichkeiten',
  'Passend zu Alter, Gewicht und Aktivitätslevel',
  'Kostenlos und unverbindlich',
]

export function FoodAdvisorTeaser() {
  return (
    <section className="section bg-white" aria-labelledby="advisor-heading">
      <div className="container-custom">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Kostenloser Service
            </div>

            <h2
              id="advisor-heading"
              className="heading-2 mt-6 text-warmgray-900"
            >
              Finde das perfekte Futter mit unserem Futterberater
            </h2>

            <p className="body-large mt-4 text-warmgray-600">
              Jedes Tier ist einzigartig. Unser interaktiver Futterberater
              analysiert die Bedürfnisse deines Lieblings und empfiehlt das
              optimale Futter aus unserem Sortiment.
            </p>

            <ul className="mt-6 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600"
                    aria-hidden="true"
                  />
                  <span className="text-warmgray-600">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-8">
              <Link href="/futterberater">
                Futterberater starten
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary-100 to-secondary-100">
              {/* Quiz Preview Illustration */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary-100 p-2">
                      <span className="text-xl" aria-hidden="true">🐕</span>
                    </div>
                    <div>
                      <p className="font-semibold text-warmgray-900">Schritt 1 von 5</p>
                      <p className="text-sm text-warmgray-500">Welches Tier hast du?</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { emoji: '🐕', label: 'Hund' },
                      { emoji: '🐈', label: 'Katze' },
                      { emoji: '🐴', label: 'Pferd' },
                    ].map((option) => (
                      <button
                        key={option.label}
                        className="rounded-xl border-2 border-primary-200 bg-primary-50 p-4 text-center transition-colors hover:border-primary-400"
                      >
                        <span className="text-2xl" aria-hidden="true">{option.emoji}</span>
                        <p className="mt-1 text-sm font-medium text-warmgray-700">
                          {option.label}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-warmgray-100">
                    <div className="h-full w-1/5 rounded-full bg-primary-500" />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute right-6 top-6 rounded-xl bg-white p-3 shadow-lg"
              >
                <span className="text-2xl" aria-hidden="true">✨</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                className="absolute bottom-6 left-6 rounded-xl bg-white p-3 shadow-lg"
              >
                <span className="text-2xl" aria-hidden="true">🎯</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

