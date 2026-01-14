'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Leaf, MapPin, Heart, Truck } from 'lucide-react'

const trustItems = [
  {
    icon: Shield,
    title: 'Trusted Shops',
    description: 'Geprüft & zertifiziert',
  },
  {
    icon: Award,
    title: 'Premium Qualität',
    description: 'Höchste Standards',
  },
  {
    icon: Leaf,
    title: '100% Natürlich',
    description: 'Ohne künstliche Zusätze',
  },
  {
    icon: MapPin,
    title: '100% aus EU',
    description: 'Hergestellt in der EU',
  },
  {
    icon: Heart,
    title: 'Tierliebe',
    description: 'Mit Leidenschaft entwickelt',
  },
  {
    icon: Truck,
    title: 'Schneller Versand',
    description: 'Lieferung in 2-4 Tagen',
  },
]

export function TrustBadges() {
  return (
    <section className="section-sm bg-primary-600" aria-labelledby="trust-heading">
      <div className="container-custom">
        <h2 id="trust-heading" className="sr-only">
          Unsere Qualitätsversprechen
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="flex flex-col items-center text-center text-white"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-primary-100">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

