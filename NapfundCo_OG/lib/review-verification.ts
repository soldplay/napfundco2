// Review Verification - Verifiziert echte Bewertungen

export interface VerifiedReview {
  id: string
  productId: string
  userId: string
  rating: number
  title: string
  comment: string
  negativeAspect?: string // "Was war nervig?" Antwort
  isVerified: boolean
  verifiedAt: string
  purchaseDate: string
  usageDuration: number // in Tagen
  createdAt: string
}

interface PurchaseRecord {
  productId: string
  purchaseDate: string
  orderId: string
}

const PURCHASE_STORAGE_KEY = 'napfco_purchases'
const REVIEW_STORAGE_KEY = 'napfco_reviews'

/**
 * Prüft, ob ein Benutzer ein Produkt gekauft hat
 */
export function hasPurchasedProduct(
  userId: string,
  productId: string
): PurchaseRecord | null {
  try {
    const stored = localStorage.getItem(PURCHASE_STORAGE_KEY)
    if (!stored) return null

    const purchases: PurchaseRecord[] = JSON.parse(stored)
    const purchase = purchases.find(
      (p) => p.productId === productId && p.userId === userId
    )

    return purchase || null
  } catch {
    return null
  }
}

/**
 * Prüft, ob ein Benutzer bereits eine Bewertung für ein Produkt abgegeben hat
 */
export function hasReviewedProduct(userId: string, productId: string): boolean {
  try {
    const stored = localStorage.getItem(REVIEW_STORAGE_KEY)
    if (!stored) return false

    const reviews: VerifiedReview[] = JSON.parse(stored)
    return reviews.some((r) => r.productId === productId && r.userId === userId)
  } catch {
    return false
  }
}

/**
 * Prüft, ob genug Zeit seit dem Kauf vergangen ist (mindestens 7 Tage Nutzung)
 */
export function canReviewProduct(purchase: PurchaseRecord): boolean {
  const purchaseDate = new Date(purchase.purchaseDate)
  const daysSincePurchase = Math.floor(
    (Date.now() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  return daysSincePurchase >= 7 // Mindestens 7 Tage Nutzung
}

/**
 * Erstellt eine verifizierte Bewertung
 */
export function createVerifiedReview(
  userId: string,
  productId: string,
  rating: number,
  title: string,
  comment: string,
  negativeAspect: string
): VerifiedReview | null {
  // Prüfe Kauf
  const purchase = hasPurchasedProduct(userId, productId)
  if (!purchase) {
    throw new Error('Produkt muss gekauft worden sein, um bewertet zu werden')
  }

  // Prüfe, ob bereits bewertet
  if (hasReviewedProduct(userId, productId)) {
    throw new Error('Sie haben dieses Produkt bereits bewertet')
  }

  // Prüfe Nutzungsdauer
  if (!canReviewProduct(purchase)) {
    throw new Error(
      'Sie müssen das Produkt mindestens 7 Tage genutzt haben, bevor Sie es bewerten können'
    )
  }

  // Validiere negative Aspect (Pflichtfeld)
  if (!negativeAspect || negativeAspect.trim().length < 10) {
    throw new Error(
      'Bitte beschreiben Sie kurz, was eventuell nervig war (mindestens 10 Zeichen)'
    )
  }

  // Erstelle Bewertung
  const purchaseDate = new Date(purchase.purchaseDate)
  const usageDuration = Math.floor(
    (Date.now() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  const review: VerifiedReview = {
    id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    productId,
    userId,
    rating,
    title,
    comment,
    negativeAspect,
    isVerified: true,
    verifiedAt: new Date().toISOString(),
    purchaseDate: purchase.purchaseDate,
    usageDuration,
    createdAt: new Date().toISOString(),
  }

  // Speichere Bewertung
  try {
    const stored = localStorage.getItem(REVIEW_STORAGE_KEY)
    const reviews: VerifiedReview[] = stored ? JSON.parse(stored) : []
    reviews.push(review)
    localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews))
  } catch {
    throw new Error('Fehler beim Speichern der Bewertung')
  }

  return review
}

/**
 * Holt alle verifizierten Bewertungen für ein Produkt
 */
export function getVerifiedReviews(productId: string): VerifiedReview[] {
  try {
    const stored = localStorage.getItem(REVIEW_STORAGE_KEY)
    if (!stored) return []

    const reviews: VerifiedReview[] = JSON.parse(stored)
    return reviews.filter(
      (r) => r.productId === productId && r.isVerified
    )
  } catch {
    return []
  }
}

/**
 * Simuliert einen Kauf (für Testzwecke)
 */
export function simulatePurchase(
  userId: string,
  productId: string,
  orderId: string
): void {
  try {
    const stored = localStorage.getItem(PURCHASE_STORAGE_KEY)
    const purchases: PurchaseRecord[] = stored ? JSON.parse(stored) : []

    purchases.push({
      productId,
      purchaseDate: new Date().toISOString(),
      orderId,
    })

    localStorage.setItem(PURCHASE_STORAGE_KEY, JSON.stringify(purchases))
  } catch {
    // Ignore storage errors
  }
}

