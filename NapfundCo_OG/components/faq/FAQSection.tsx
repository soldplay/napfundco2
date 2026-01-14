'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Package,
  RotateCcw,
  Utensils,
  Award,
  Smartphone,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import faqData from '@/data/faq.json'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Package,
  RotateCcw,
  Utensils,
  Award,
  Smartphone,
}

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return faqData.categories

    const query = searchQuery.toLowerCase()
    return faqData.categories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(query) ||
            q.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.questions.length > 0)
  }, [searchQuery])

  const totalResults = filteredCategories.reduce(
    (sum, cat) => sum + cat.questions.length,
    0
  )

  return (
    <div className="min-h-screen bg-warmgray-50 py-12 lg:py-16">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center">
            <h1 className="heading-2 text-warmgray-900">
              Häufig gestellte Fragen
            </h1>
            <p className="body-large mt-4 text-warmgray-600">
              Hier finden Sie Antworten auf die häufigsten Fragen. Keine Antwort
              gefunden?{' '}
              <a href="/kontakt" className="text-primary-600 hover:underline">
                Kontaktieren Sie uns
              </a>
            </p>
          </div>

          {/* Search */}
          <div className="mt-8">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-warmgray-400"
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder="Suchen Sie nach Fragen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 text-lg"
                aria-label="FAQ durchsuchen"
              />
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-warmgray-600">
                {totalResults} Ergebnis{totalResults !== 1 ? 'se' : ''} gefunden
              </p>
            )}
          </div>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === null
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-warmgray-700 hover:bg-warmgray-100'
              }`}
            >
              Alle
            </button>
            {faqData.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-warmgray-700 hover:bg-warmgray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Categories */}
          <div className="mt-8 space-y-8">
            {filteredCategories
              .filter(
                (category) =>
                  activeCategory === null || category.id === activeCategory
              )
              .map((category, catIndex) => {
                const Icon = iconMap[category.icon] || Package

                return (
                  <motion.section
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIndex * 0.1, duration: 0.3 }}
                    className="rounded-xl bg-white p-6 shadow-sm"
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                        <Icon
                          className="h-5 w-5 text-primary-600"
                          aria-hidden="true"
                        />
                      </div>
                      <h2 className="heading-4 text-warmgray-900">
                        {category.name}
                      </h2>
                    </div>

                    <Accordion type="single" collapsible>
                      {category.questions.map((question, qIndex) => (
                        <AccordionItem key={question.id} value={question.id}>
                          <AccordionTrigger className="text-left text-warmgray-900 hover:text-primary-600">
                            {question.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-warmgray-600">
                            {question.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.section>
                )
              })}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <div className="mt-12 rounded-xl bg-white p-12 text-center">
              <p className="text-lg text-warmgray-600">
                Keine Ergebnisse für &quot;{searchQuery}&quot; gefunden.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-primary-600 hover:underline"
              >
                Suche zurücksetzen
              </button>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-12 rounded-xl bg-primary-50 p-8 text-center">
            <h3 className="heading-4 text-warmgray-900">
              Ihre Frage war nicht dabei?
            </h3>
            <p className="mt-2 text-warmgray-600">
              Unser Kundenservice hilft Ihnen gerne weiter.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:office@work-force.at"
                className="btn-primary btn-md"
              >
                E-Mail schreiben
              </a>
              <a href="/kontakt" className="btn-outline btn-md">
                Zum Kontaktformular
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

