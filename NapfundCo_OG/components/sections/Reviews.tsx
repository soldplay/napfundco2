'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Maria S.',
    pet: 'Golden Retriever "Balu"',
    rating: 5,
    text: 'Balu liebt das Nassfutter! Seit wir auf Napf&Co umgestellt haben, ist sein Fell so viel glänzender. Absolute Empfehlung!',
    date: '15.12.2023',
  },
  {
    id: 2,
    name: 'Thomas K.',
    pet: 'Britisch Kurzhaar "Luna"',
    rating: 5,
    text: 'Endlich ein Futter, das meine wählerische Katze akzeptiert. Die Qualität merkt man sofort. Toller Service und schnelle Lieferung.',
    date: '10.12.2023',
  },
  {
    id: 3,
    name: 'Sarah M.',
    pet: 'Labrador "Max"',
    rating: 5,
    text: 'Max hatte immer Probleme mit der Verdauung. Seit dem Wechsel zu Napf&Co geht es ihm super! Danke für das tolle Produkt.',
    date: '08.12.2023',
  },
  {
    id: 4,
    name: 'Peter H.',
    pet: 'Hannoveraner "Storm"',
    rating: 5,
    text: 'Das Wellness Müsli ist perfekt für mein leichtfuttriges Pferd. Qualität top, Preis fair. Gerne wieder!',
    date: '05.12.2023',
  },
]

export function Reviews() {
  return (
    <section className="section bg-white" aria-labelledby="reviews-heading">
      <div className="container-custom">
        <div className="text-center">
          <h2 id="reviews-heading" className="heading-2 text-warmgray-900">
            Das sagen unsere Kunden
          </h2>
          <p className="body-large mx-auto mt-4 max-w-2xl text-warmgray-600">
            Über 10.000 zufriedene Tierbesitzer vertrauen auf Napf&Co
          </p>

          {/* Overall Rating */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex" aria-label="Durchschnittliche Bewertung: 4.9 von 5 Sternen">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-6 w-6 fill-yellow-400 text-yellow-400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-xl font-bold text-warmgray-900">4.9</span>
            <span className="text-warmgray-500">/ 5.0</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card flex flex-col p-6"
            >
              <Quote
                className="h-8 w-8 text-primary-200"
                aria-hidden="true"
              />

              <div className="mt-4 flex" aria-label={`Bewertung: ${review.rating} von 5 Sternen`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-warmgray-200 text-warmgray-200'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-warmgray-600">
                &quot;{review.text}&quot;
              </blockquote>

              <footer className="mt-6 border-t border-warmgray-100 pt-4">
                <p className="font-semibold text-warmgray-900">{review.name}</p>
                <p className="text-sm text-warmgray-500">{review.pet}</p>
                <time
                  className="mt-1 text-xs text-warmgray-400"
                  dateTime={review.date}
                >
                  {review.date}
                </time>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

