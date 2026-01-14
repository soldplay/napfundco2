'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Percent, Calendar, Truck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  {
    icon: Percent,
    text: '2% Rabatt',
  },
  {
    icon: Truck,
    text: 'Kostenloser Versand',
  },
  {
    icon: Calendar,
    text: 'Monatliche Lieferung',
  },
]

export function SubscriptionTeaser() {
  return (
    <section className="section bg-gradient-to-br from-primary-50 to-secondary-50" aria-labelledby="subscription-heading">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white p-8 shadow-lg lg:p-12"
          >
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
                <Percent className="h-4 w-4" aria-hidden="true" />
                Sparen Sie mit unserem Abo-System
              </div>
              <h2 id="subscription-heading" className="heading-2 text-warmgray-900">
                Monatliche Lieferung mit 2% Rabatt
              </h2>
              <p className="body-large mt-4 text-warmgray-600">
                Lassen Sie sich jeden Monat automatisch das Futter für Ihr Tier liefern.
                Sparen Sie 2% auf alle Produkte und erhalten Sie kostenlosen Versand.
                Flexibel pausierbar, jederzeit kündbar.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center rounded-xl bg-warmgray-50 p-4 text-center"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <benefit.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-warmgray-900">{benefit.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button asChild size="lg" className="bg-accent-500 hover:bg-accent-600">
                <Link href="/abo">
                  Abo-System entdecken
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

