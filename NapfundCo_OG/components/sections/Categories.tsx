'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Dog, Cat, ArrowRight, LucideIcon } from 'lucide-react'
import { ComponentType } from 'react'

interface Category {
  id: string
  name: string
  description: string
  href: string
  icon: LucideIcon | ComponentType<{ className?: string }>
  color: string
  iconColor: string
  emoji: string
}

const HorseIcon = ({ className }: { className?: string }) => (
  <span className={`text-3xl ${className || ''}`} role="img" aria-hidden="true">
    🐴
  </span>
)

const categories: Category[] = [
  {
    id: 'hund',
    name: 'Hundefutter',
    description: 'Premium Futter für alle Rassen und Lebenslagen',
    href: '/produkte/hund',
    icon: Dog,
    color: 'from-amber-100 to-amber-200',
    iconColor: 'text-amber-600',
    emoji: '🐕',
  },
  {
    id: 'katze',
    name: 'Katzenfutter',
    description: 'Ausgewogene Ernährung für Ihre Samtpfote',
    href: '/produkte/katze',
    icon: Cat,
    color: 'from-blue-100 to-blue-200',
    iconColor: 'text-blue-600',
    emoji: '🐈',
  },
  {
    id: 'pferd',
    name: 'Pferdefutter',
    description: 'Hochwertiges Futter für Freizeit- und Sportpferde',
    href: '/produkte/pferd',
    icon: HorseIcon,
    color: 'from-green-100 to-green-200',
    iconColor: 'text-green-600',
    emoji: '🐴',
  },
]

export function Categories() {
  return (
    <section className="section bg-white" aria-labelledby="categories-heading">
      <div className="container-custom">
        <div className="text-center">
          <h2 id="categories-heading" className="heading-2 text-warmgray-900">
            Futter für jeden Liebling
          </h2>
          <p className="body-large mx-auto mt-4 max-w-2xl text-warmgray-600">
            Entdecken Sie unser Sortiment an Premium-Tierfutter. Natürlich,
            hochwertig und mit Liebe zusammengestellt.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={category.href}
                className="group block h-full overflow-hidden rounded-2xl border border-warmgray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color}`}
                >
                  <category.icon
                    className={`h-10 w-10 ${category.iconColor}`}
                  />
                </div>

                <h3 className="heading-3 text-warmgray-900 group-hover:text-primary-600">
                  {category.name}
                </h3>

                <p className="mt-2 text-warmgray-600">{category.description}</p>

                <div className="mt-4 flex items-center font-medium text-primary-600">
                  Produkte entdecken
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

