'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAdaptiveContent, useWelcomeMessage } from '@/hooks/useACG'

export function Hero() {
  const adaptiveContent = useAdaptiveContent()
  const welcomeMessage = useWelcomeMessage()

  // Parse headline for multi-line display
  const headlineParts = adaptiveContent.headline.split('\n')
  const hasMultiLineHeadline = headlineParts.length > 1

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-cream to-secondary-50">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            {/* Welcome Back Banner for Returning Visitors */}
            <AnimatePresence>
              {welcomeMessage && adaptiveContent.isLoaded && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800">
                    <span role="img" aria-label="Winkende Hand">👋</span>
                    {welcomeMessage}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-accent-500" aria-hidden="true" />
              <span className="text-sm font-medium text-warmgray-700">
                Neu: Jetzt auch Pferdefutter!
              </span>
            </motion.div>

            {/* Adaptive Headline */}
            <h1 className="heading-1 text-warmgray-900">
              {hasMultiLineHeadline ? (
                <>
                  {headlineParts[0]}
                  <span className="block text-primary-600">{headlineParts[1]}</span>
                </>
              ) : (
                <>
                  {adaptiveContent.headline.includes('=') ? (
                    <>
                      {adaptiveContent.headline.split('=')[0].trim()} =
                      <span className="block text-primary-600">
                        {adaptiveContent.headline.split('=')[1]?.trim()}
                      </span>
                    </>
                  ) : (
                    adaptiveContent.headline
                  )}
                </>
              )}
            </h1>

            {/* Adaptive Subheadline */}
            <p className="body-large mt-6 text-warmgray-600">
              {adaptiveContent.subheadline}
            </p>

            {/* Adaptive CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-accent-500 hover:bg-accent-600">
                <a
                  href="https://www.tiktok.com/@napfundco"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {adaptiveContent.ctaPrimary}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/futterberater">
                  {adaptiveContent.ctaSecondary}
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-200 to-primary-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center gap-1 sm:justify-start">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                  <span className="ml-1 font-semibold text-warmgray-900">4.9</span>
                </div>
                <p className="text-sm text-warmgray-600">
                  Über <strong>10.000+</strong> zufriedene Kunden
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary-100 to-secondary-100 shadow-2xl">
              {/* Placeholder für Bild - kann durch echtes Image ersetzt werden */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-white/80 shadow-lg">
                    <span className="text-6xl" role="img" aria-label="Hund und Katze">
                      🐕
                    </span>
                  </div>
                  <p className="text-lg font-medium text-warmgray-700">
                    Premium Tierfutter
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute right-4 top-4 rounded-xl bg-white p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 p-1.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-green-600"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-warmgray-700">
                    100% aus EU
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                className="absolute bottom-4 left-4 rounded-xl bg-white p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-accent-100 p-1.5">
                    <span className="text-lg" aria-hidden="true">🌿</span>
                  </div>
                  <span className="text-sm font-medium text-warmgray-700">
                    100% Natürlich
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
