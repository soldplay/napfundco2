// Time Estimation - Schätzt gesparte Zeit durch die Website

export interface TimeEstimate {
  savedMinutes: number
  comparison: string
  method: 'average' | 'calculated' | 'estimated'
}

// Durchschnittliche Zeiten für verschiedene Aktionen (in Minuten)
const AVERAGE_TIMES = {
  findProduct: 5, // Durchschnittliche Zeit, um ein Produkt zu finden
  compareProducts: 3, // Zeit zum Vergleichen von Produkten
  readReviews: 2, // Zeit zum Lesen von Bewertungen
  checkout: 2, // Zeit für Checkout
  totalTraditional: 15, // Gesamte Zeit bei traditionellem Einkauf (Laden, Fahrt, etc.)
}

// Berechnet gesparte Zeit basierend auf User-Verhalten
export function calculateTimeSaved(
  actions: {
    productsViewed?: number
    productsCompared?: number
    reviewsRead?: number
    checkoutCompleted?: boolean
  }
): TimeEstimate {
  let savedMinutes = 0

  // Zeit gespart durch Produktsuche
  if (actions.productsViewed) {
    savedMinutes += actions.productsViewed * AVERAGE_TIMES.findProduct
  }

  // Zeit gespart durch Produktvergleich
  if (actions.productsCompared) {
    savedMinutes += actions.productsCompared * AVERAGE_TIMES.compareProducts
  }

  // Zeit gespart durch Bewertungen
  if (actions.reviewsRead) {
    savedMinutes += actions.reviewsRead * AVERAGE_TIMES.readReviews
  }

  // Zeit gespart durch Online-Checkout
  if (actions.checkoutCompleted) {
    savedMinutes += AVERAGE_TIMES.checkout
  }

  // Vergleich mit traditionellem Einkauf
  const traditionalTime = AVERAGE_TIMES.totalTraditional
  const totalSaved = Math.max(0, traditionalTime - savedMinutes)

  return {
    savedMinutes: totalSaved,
    comparison: `Im Vergleich zu einem traditionellen Einkauf im Laden`,
    method: 'calculated',
  }
}

// Schätzt gesparte Zeit basierend auf Verweildauer
export function estimateTimeSavedFromSession(
  sessionDuration: number, // in Sekunden
  pagesVisited: number
): TimeEstimate {
  // Annahme: Traditioneller Einkauf würde länger dauern
  const traditionalTimePerPage = 3 // Minuten pro Seite
  const traditionalTotal = pagesVisited * traditionalTimePerPage
  const onlineTime = sessionDuration / 60 // Konvertiere zu Minuten

  const saved = Math.max(0, traditionalTotal - onlineTime)

  return {
    savedMinutes: Math.round(saved),
    comparison: `Basierend auf Ihrer aktuellen Session`,
    method: 'estimated',
  }
}

// Generiert eine benutzerfreundliche Nachricht
export function generateTimeSavedMessage(estimate: TimeEstimate): string {
  if (estimate.savedMinutes < 1) {
    return 'Sie sparen Zeit durch unsere optimierte Website'
  }

  if (estimate.savedMinutes < 5) {
    return `Diese Seite spart dir ca. ${estimate.savedMinutes} Minuten`
  }

  if (estimate.savedMinutes < 15) {
    return `Du sparst bereits ${estimate.savedMinutes} Minuten – das ist wertvoll!`
  }

  return `Wow! Du hast bereits ${estimate.savedMinutes} Minuten gespart. Zeit ist Geld!`
}

