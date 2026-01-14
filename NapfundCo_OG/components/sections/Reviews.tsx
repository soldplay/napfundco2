'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react'
import {
  getAllVerifiedReviews,
  getAverageRating,
  getVerifiedReviewCount,
  type VerifiedReview,
} from '@/lib/review-verification'

export function Reviews() {
  const [reviews, setReviews] = useState<VerifiedReview[]>([])
  const [averageRating, setAverageRating] = useState<number | null>(null)
  const [reviewCount, setReviewCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Lade verifizierte Reviews aus localStorage
    const loadReviews = () => {
      const verifiedReviews = getAllVerifiedReviews()
      const avgRating = getAverageRating()
      const count = getVerifiedReviewCount()
      
      setReviews(verifiedReviews.slice(0, 4)) // Maximal 4 Reviews anzeigen
      setAverageRating(avgRating)
      setReviewCount(count)
      setIsLoading(false)
    }

    loadReviews()
  }, [])

  // Zeige "Noch keine Bewertungen" wenn keine verifizierten Reviews vorhanden
  const hasReviews = reviews.length > 0

  return (
    <section className="section bg-white" aria-labelledby="reviews-heading">
      <div className="container-custom">
        <div className="text-center">
          <h2 id="reviews-heading" className="heading-2 text-warmgray-900">
            Das sagen unsere Kunden
          </h2>
          <p className="body-large mx-auto mt-4 max-w-2xl text-warmgray-600">
            {hasReviews 
              ? `${reviewCount} verifizierte Bewertungen von echten Käufern`
              : 'Echte Bewertungen von verifizierten Käufern'
            }
          </p>

          {/* Overall Rating - nur anzeigen wenn Reviews vorhanden */}
          {hasReviews && averageRating !== null && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="flex" aria-label={`Durchschnittliche Bewertung: ${averageRating} von 5 Sternen`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= Math.round(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-warmgray-200 text-warmgray-200'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-xl font-bold text-warmgray-900">{averageRating}</span>
              <span className="text-warmgray-500">/ 5.0</span>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="mt-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
          </div>
        ) : hasReviews ? (
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
                <div className="flex items-center justify-between">
                  <Quote
                    className="h-8 w-8 text-primary-200"
                    aria-hidden="true"
                  />
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    Verifiziert
                  </span>
                </div>

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

                <h3 className="mt-3 font-semibold text-warmgray-900">{review.title}</h3>
                <blockquote className="mt-2 flex-1 text-warmgray-600 text-sm">
                  &quot;{review.comment}&quot;
                </blockquote>

                {review.negativeAspect && (
                  <div className="mt-3 rounded bg-warmgray-50 p-2">
                    <p className="text-xs font-medium text-warmgray-700">Was war nervig?</p>
                    <p className="text-xs text-warmgray-600">{review.negativeAspect}</p>
                  </div>
                )}

                <footer className="mt-4 border-t border-warmgray-100 pt-4">
                  <p className="text-xs text-warmgray-500">
                    Gekauft vor {review.usageDuration} Tagen
                  </p>
                  <time
                    className="mt-1 text-xs text-warmgray-400"
                    dateTime={review.createdAt}
                  >
                    {new Date(review.createdAt).toLocaleDateString('de-DE')}
                  </time>
                </footer>
              </motion.article>
            ))}
          </div>
        ) : (
          /* Keine Reviews vorhanden - freundliche Nachricht */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <div className="mx-auto max-w-md rounded-2xl border-2 border-dashed border-warmgray-200 bg-warmgray-50 p-8">
              <MessageSquare className="mx-auto h-12 w-12 text-warmgray-400" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-warmgray-900">
                Noch keine Bewertungen
              </h3>
              <p className="mt-2 text-warmgray-600">
                Wir zeigen hier nur echte, verifizierte Bewertungen von Kunden, die das Produkt 
                tatsächlich gekauft und mindestens 7 Tage genutzt haben.
              </p>
              <p className="mt-4 text-sm text-warmgray-500">
                Seien Sie einer der Ersten, der eine verifizierte Bewertung abgibt!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
