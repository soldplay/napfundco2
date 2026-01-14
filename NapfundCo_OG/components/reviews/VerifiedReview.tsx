'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  createVerifiedReview,
  hasPurchasedProduct,
  hasReviewedProduct,
  canReviewProduct,
  getVerifiedReviews,
  type VerifiedReview as VerifiedReviewType,
} from '@/lib/review-verification'

interface VerifiedReviewProps {
  productId: string
  userId: string
  onReviewSubmitted?: (review: VerifiedReviewType) => void
}

export function VerifiedReviewForm({
  productId,
  userId,
  onReviewSubmitted,
}: VerifiedReviewProps) {
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [negativeAspect, setNegativeAspect] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'checking' | 'can-review' | 'cannot-review' | 'submitting' | 'success' | 'error'
  >('idle')
  const [error, setError] = useState<string | null>(null)
  const [purchaseInfo, setPurchaseInfo] = useState<{ canReview: boolean; reason?: string } | null>(
    null
  )

  const checkPurchaseStatus = () => {
    setStatus('checking')
    setError(null)

    // Prüfe Kauf
    const purchase = hasPurchasedProduct(userId, productId)
    if (!purchase) {
      setStatus('cannot-review')
      setPurchaseInfo({
        canReview: false,
        reason: 'Sie müssen dieses Produkt zuerst kaufen, um es bewerten zu können.',
      })
      return
    }

    // Prüfe, ob bereits bewertet
    if (hasReviewedProduct(userId, productId)) {
      setStatus('cannot-review')
      setPurchaseInfo({
        canReview: false,
        reason: 'Sie haben dieses Produkt bereits bewertet.',
      })
      return
    }

    // Prüfe Nutzungsdauer
    if (!canReviewProduct(purchase)) {
      setStatus('cannot-review')
      setPurchaseInfo({
        canReview: false,
        reason:
          'Sie müssen das Produkt mindestens 7 Tage genutzt haben, bevor Sie es bewerten können.',
      })
      return
    }

    setStatus('can-review')
    setPurchaseInfo({ canReview: true })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    // Validierung
    if (rating === 0) {
      setError('Bitte wählen Sie eine Bewertung aus')
      setStatus('can-review')
      return
    }

    if (!title.trim() || title.trim().length < 5) {
      setError('Bitte geben Sie einen Titel ein (mindestens 5 Zeichen)')
      setStatus('can-review')
      return
    }

    if (!comment.trim() || comment.trim().length < 20) {
      setError('Bitte geben Sie einen Kommentar ein (mindestens 20 Zeichen)')
      setStatus('can-review')
      return
    }

    if (!negativeAspect.trim() || negativeAspect.trim().length < 10) {
      setError(
        'Bitte beschreiben Sie kurz, was eventuell nervig war (mindestens 10 Zeichen)'
      )
      setStatus('can-review')
      return
    }

    try {
      const review = createVerifiedReview(
        userId,
        productId,
        rating,
        title,
        comment,
        negativeAspect
      )

      if (review && onReviewSubmitted) {
        onReviewSubmitted(review)
      }

      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Speichern der Bewertung')
      setStatus('error')
    }
  }

  if (status === 'idle') {
    return (
      <div className="rounded-xl border-2 border-primary-200 bg-primary-50 p-6 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary-600" aria-hidden="true" />
        <h3 className="font-semibold text-warmgray-900 mb-2">
          Verifizierte Bewertung abgeben
        </h3>
        <p className="text-sm text-warmgray-600 mb-4">
          Nur Käufer, die das Produkt mindestens 7 Tage genutzt haben, können eine verifizierte
          Bewertung abgeben.
        </p>
        <Button onClick={checkPurchaseStatus} disabled={status === 'checking'}>
          {status === 'checking' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird geprüft...
            </>
          ) : (
            'Berechtigung prüfen'
          )}
        </Button>
      </div>
    )
  }

  if (status === 'checking') {
    return (
      <div className="rounded-xl border-2 border-primary-200 bg-primary-50 p-6 text-center">
        <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary-600" />
        <p className="text-sm text-warmgray-600">Prüfe Berechtigung...</p>
      </div>
    )
  }

  if (status === 'cannot-review' || !purchaseInfo?.canReview) {
    return (
      <div className="rounded-xl border-2 border-yellow-200 bg-yellow-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <h3 className="font-semibold text-yellow-900 mb-2">
              Bewertung noch nicht möglich
            </h3>
            <p className="text-sm text-yellow-700">{purchaseInfo?.reason}</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center"
      >
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" aria-hidden="true" />
        <h3 className="font-semibold text-green-900 mb-2">Bewertung erfolgreich abgegeben!</h3>
        <p className="text-sm text-green-700">
          Vielen Dank für Ihre verifizierte Bewertung. Sie hilft anderen Kunden bei der
          Entscheidung.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {/* Rating */}
      <div>
        <label className="mb-2 block text-sm font-medium text-warmgray-700">
          Bewertung <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`rounded p-2 transition-colors ${
                star <= rating
                  ? 'text-yellow-400'
                  : 'text-warmgray-300 hover:text-yellow-300'
              }`}
              aria-label={`${star} Sterne`}
            >
              <Star
                className={`h-6 w-6 ${star <= rating ? 'fill-current' : ''}`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="review-title" className="mb-2 block text-sm font-medium text-warmgray-700">
          Titel <span className="text-red-500">*</span>
        </label>
        <Input
          id="review-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="z.B. 'Sehr zufrieden'"
          required
        />
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="review-comment" className="mb-2 block text-sm font-medium text-warmgray-700">
          Kommentar <span className="text-red-500">*</span>
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Beschreiben Sie Ihre Erfahrung mit dem Produkt..."
          className="flex w-full rounded-lg border border-warmgray-300 bg-white px-4 py-3 text-base transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          required
        />
      </div>

      {/* Negative Aspect (Pflichtfeld) */}
      <div>
        <label
          htmlFor="review-negative"
          className="mb-2 block text-sm font-medium text-warmgray-700"
        >
          Was war eventuell nervig? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="review-negative"
          value={negativeAspect}
          onChange={(e) => setNegativeAspect(e.target.value)}
          rows={2}
          placeholder="z.B. 'Die Verpackung war etwas schwierig zu öffnen' oder 'Nichts, alles perfekt'"
          className="flex w-full rounded-lg border border-warmgray-300 bg-white px-4 py-3 text-base transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          required
        />
        <p className="mt-1 text-xs text-warmgray-500">
          Dieses Feld ist Pflicht, um ehrliche Bewertungen zu fördern.
        </p>
      </div>

      {/* Verifizierungs-Badge Info */}
      <div className="rounded-lg bg-primary-50 p-3">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary-600 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-primary-900">Verifizierte Bewertung</p>
            <p className="text-xs text-primary-700 mt-1">
              Ihre Bewertung wird mit einem Verifizierungs-Badge angezeigt, da Sie das Produkt
              gekauft und genutzt haben.
            </p>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Wird gespeichert...
          </>
        ) : (
          'Bewertung absenden'
        )}
      </Button>
    </form>
  )
}

// Komponente zum Anzeigen verifizierter Bewertungen
export function VerifiedReviewDisplay({ review }: { review: VerifiedReviewType }) {
  return (
    <div className="rounded-lg border border-warmgray-200 bg-white p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex">
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
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
            Verifiziert
          </span>
        </div>
        <span className="text-xs text-warmgray-500">
          {new Date(review.createdAt).toLocaleDateString('de-DE')}
        </span>
      </div>

      <h4 className="font-semibold text-warmgray-900 mb-1">{review.title}</h4>
      <p className="text-sm text-warmgray-700 mb-3">{review.comment}</p>

      {review.negativeAspect && (
        <div className="rounded bg-warmgray-50 p-2 mb-2">
          <p className="text-xs font-medium text-warmgray-700 mb-1">Was war nervig?</p>
          <p className="text-xs text-warmgray-600">{review.negativeAspect}</p>
        </div>
      )}

      <p className="text-xs text-warmgray-500">
        Gekauft vor {review.usageDuration} Tagen • {review.usageDuration} Tage genutzt
      </p>
    </div>
  )
}

