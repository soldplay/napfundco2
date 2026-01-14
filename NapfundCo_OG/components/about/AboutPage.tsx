'use client'

import { motion } from 'framer-motion'
import {
  Heart,
  Shield,
  Leaf,
  Award,
  Users,
  MapPin,
  CheckCircle,
} from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Tierliebe',
    description:
      'Jedes Produkt entwickeln wir mit der Frage: "Würden wir das unserem eigenen Tier geben?"',
  },
  {
    icon: Shield,
    title: 'Qualität',
    description:
      'Nur die besten Zutaten in Lebensmittelqualität kommen in unsere Rezepturen.',
  },
  {
    icon: Leaf,
    title: 'Natürlichkeit',
    description:
      'Keine künstlichen Farb-, Aroma- oder Konservierungsstoffe - versprochen.',
  },
  {
    icon: MapPin,
    title: '100% aus EU',
    description:
      'Alle Produkte werden in der EU unter höchsten Standards hergestellt.',
  },
]

const team = [
  {
    name: 'Dr. Maria Schmitt',
    role: 'Tierärztin & Gründerin',
    bio: 'Maria ist seit 15 Jahren Tierärztin und hat Napf&Co gegründet, um Tierernährung auf ein neues Level zu heben.',
  },
  {
    name: 'Thomas Weber',
    role: 'Ernährungsberater',
    bio: 'Thomas hat über 10 Jahre Erfahrung in der Entwicklung von Premium-Tierfutter.',
  },
  {
    name: 'Lisa Hoffmann',
    role: 'Kundenservice',
    bio: 'Lisa ist selbst Hundemama und beantwortet alle Ihre Fragen mit Herzblut.',
  },
  {
    name: 'Max Müller',
    role: 'Qualitätssicherung',
    bio: 'Max sorgt dafür, dass jede Charge unseren hohen Standards entspricht.',
  },
]

const milestones = [
  { year: '2020', event: 'Gründung von Napf&Co' },
  { year: '2021', event: 'Erste eigene Produktlinie für Hunde' },
  { year: '2022', event: 'Erste zufriedene Stammkunden' },
  { year: '2023', event: 'Erweiterung um Katzen- und Pferdefutter' },
  { year: '2024', event: 'TikTok Shop Launch' },
]

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-cream to-secondary-50 py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="heading-1 text-warmgray-900">
              Wir sind <span className="text-primary-600">Napf&Co</span>
            </h1>
            <p className="body-large mt-6 text-warmgray-600">
              Aus Liebe zu Tieren. Gegründet von Tierärzten und Ernährungsexperten,
              um das Beste für Ihren vierbeinigen Liebling zu entwickeln.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading-2 text-warmgray-900">Unsere Geschichte</h2>
              <div className="mt-6 space-y-4 text-warmgray-600">
                <p>
                  Alles begann 2020, als unsere Gründerin Dr. Maria Schmitt in
                  ihrer Tierarztpraxis immer wieder feststellte: Viele
                  Gesundheitsprobleme bei Haustieren lassen sich auf schlechte
                  Ernährung zurückführen.
                </p>
                <p>
                  Gemeinsam mit einem Team aus Ernährungsberatern und
                  Tierliebhabern entwickelte sie die ersten Napf&Co Rezepturen -
                  mit dem Anspruch, dass nur Zutaten verwendet werden, die auch
                  für den menschlichen Verzehr geeignet wären.
                </p>
                <p>
                  Heute vertrauen zahlreiche Tierbesitzer auf unsere Produkte.
                  Und wir arbeiten jeden Tag daran, noch besser zu werden - für
                  glückliche, gesunde Tiere.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square rounded-3xl bg-gradient-to-br from-primary-100 to-secondary-100"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl" aria-hidden="true">🐕</span>
                  <p className="mt-4 text-lg font-medium text-warmgray-700">
                    Aus Liebe zu Tieren
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-warmgray-50">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-2 text-warmgray-900">Unsere Werte</h2>
            <p className="body-large mx-auto mt-4 max-w-2xl text-warmgray-600">
              Diese Prinzipien leiten uns bei allem, was wir tun.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                  <value.icon
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-warmgray-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-warmgray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <Award
                className="mx-auto h-12 w-12 text-primary-600"
                aria-hidden="true"
              />
              <h2 className="heading-2 mt-4 text-warmgray-900">
                Unser Qualitätsversprechen
              </h2>
            </div>

            <ul className="mt-8 space-y-4">
              {[
                '100% natürliche Zutaten ohne künstliche Zusätze',
                'Fleisch und Fisch in Lebensmittelqualität',
                'Hergestellt in Deutschland unter strengen Kontrollen',
                'Entwickelt von Tierärzten und Ernährungsberatern',
                'Jede Charge wird im Labor geprüft',
                'Transparente Deklaration aller Inhaltsstoffe',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary-600"
                    aria-hidden="true"
                  />
                  <span className="text-lg text-warmgray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-warmgray-50">
        <div className="container-custom">
          <div className="text-center">
            <Users
              className="mx-auto h-12 w-12 text-primary-600"
              aria-hidden="true"
            />
            <h2 className="heading-2 mt-4 text-warmgray-900">Unser Team</h2>
            <p className="body-large mx-auto mt-4 max-w-2xl text-warmgray-600">
              Die Menschen hinter Napf&Co - vereint durch die Liebe zu Tieren.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-xl bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-secondary-100">
                  <span className="text-3xl" aria-hidden="true">👤</span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-warmgray-900">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-primary-600">
                  {member.role}
                </p>
                <p className="mt-2 text-sm text-warmgray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="heading-2 text-warmgray-900">Unsere Meilensteine</h2>
          </div>

          <div className="relative mt-12">
            <div
              className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-primary-200"
              aria-hidden="true"
            />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}
                  >
                    <span className="text-2xl font-bold text-primary-600">
                      {milestone.year}
                    </span>
                    <p className="mt-1 text-warmgray-700">{milestone.event}</p>
                  </div>
                  <div className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 ring-4 ring-white" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="heading-2 text-white">
            Überzeugen Sie sich selbst
          </h2>
          <p className="body-large mx-auto mt-4 max-w-2xl text-primary-100">
            Entdecken Sie unser Sortiment und erleben Sie den Napf&Co Unterschied.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/produkte"
              className="btn-md rounded-lg bg-white px-8 py-3 font-medium text-primary-600 transition-colors hover:bg-primary-50"
            >
              Produkte entdecken
            </a>
            <a
              href="/futterberater"
              className="btn-md rounded-lg border-2 border-white px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
            >
              Futterberater starten
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

