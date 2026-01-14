'use client'

import { motion } from 'framer-motion'
import { Percent, Truck, Calendar, Shield } from 'lucide-react'
import { getSubscriptionBenefits } from '@/lib/subscription'

const iconMap = {
  Percent,
  Truck,
  Calendar,
  Shield,
}

export function SubscriptionBenefits() {
  const benefits = getSubscriptionBenefits()

  return (
    <section className="section bg-white" aria-labelledby="benefits-heading">
      <div className="container-custom">
        <h2 id="benefits-heading" className="sr-only">
          Abo-Vorteile
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap] || Shield

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-xl bg-warmgray-50 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <Icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-warmgray-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-warmgray-600">{benefit.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

