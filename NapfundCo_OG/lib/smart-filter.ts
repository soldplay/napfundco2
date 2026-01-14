// Smart Filter - Interpretiert natürliche Sprache und passt Filter an

import type { Product } from './products'

export interface SmartFilterResult {
  filters: {
    priceRange?: { min: number; max: number }
    category?: string[]
    tags?: string[]
    searchTerms?: string[]
  }
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest'
  explanation: string
}

// Einfache NLP-ähnliche Interpretation
export function interpretUserIntent(query: string): SmartFilterResult {
  const lowerQuery = query.toLowerCase()
  const result: SmartFilterResult = {
    filters: {},
    explanation: '',
  }

  // Preis-bezogene Begriffe
  if (
    lowerQuery.includes('günstig') ||
    lowerQuery.includes('billig') ||
    lowerQuery.includes('preiswert') ||
    lowerQuery.includes('sparsam')
  ) {
    result.filters.priceRange = { min: 0, max: 20 }
    result.sortBy = 'price-asc'
    result.explanation = 'Günstige Produkte, sortiert nach Preis'
  }

  if (
    lowerQuery.includes('teuer') ||
    lowerQuery.includes('premium') ||
    lowerQuery.includes('hochwertig') ||
    lowerQuery.includes('qualität')
  ) {
    result.filters.priceRange = { min: 15, max: 999 }
    result.sortBy = 'price-desc'
    result.explanation = 'Premium-Produkte, sortiert nach Preis (höchste zuerst)'
  }

  // Haltbarkeit / Dauerhaftigkeit
  if (
    lowerQuery.includes('hält') ||
    lowerQuery.includes('dauerhaft') ||
    lowerQuery.includes('lange') ||
    lowerQuery.match(/\d+\s*(jahr|jahre|monat|monate)/)
  ) {
    // Suche nach Trockenfutter (hält länger)
    result.filters.tags = ['Trockenfutter']
    result.explanation = 'Produkte mit langer Haltbarkeit (Trockenfutter)'
  }

  // Tier-spezifische Begriffe
  if (lowerQuery.includes('hund') || lowerQuery.includes('hunde')) {
    result.filters.category = ['hund']
    result.explanation = 'Hundefutter'
  }
  if (lowerQuery.includes('katze') || lowerQuery.includes('katzen')) {
    result.filters.category = ['katze']
    result.explanation = 'Katzenfutter'
  }
  if (lowerQuery.includes('pferd') || lowerQuery.includes('pferde')) {
    result.filters.category = ['pferd']
    result.explanation = 'Pferdefutter'
  }

  // Allergie / Spezial
  if (
    lowerQuery.includes('allergie') ||
    lowerQuery.includes('unverträglich') ||
    lowerQuery.includes('spezial')
  ) {
    result.filters.tags = ['Getreidefrei', 'Hypoallergen']
    result.explanation = 'Spezialfutter für Allergiker'
  }

  // Größe / Menge
  if (lowerQuery.includes('groß') || lowerQuery.includes('viel')) {
    result.filters.tags = ['Große Packung']
    result.explanation = 'Große Packungsgrößen'
  }

  if (lowerQuery.includes('klein') || lowerQuery.includes('wenig')) {
    result.filters.tags = ['Kleine Packung']
    result.explanation = 'Kleine Packungsgrößen'
  }

  // Kombiniere Erklärungen
  if (!result.explanation) {
    result.explanation = 'Basierend auf Ihrer Anfrage angepasst'
  }

  return result
}

// Filtere Produkte basierend auf Smart Filter Result
export function applySmartFilter(
  products: Product[],
  filterResult: SmartFilterResult
): Product[] {
  let filtered = [...products]

  // Preis-Filter
  if (filterResult.filters.priceRange) {
    const { min, max } = filterResult.filters.priceRange
    filtered = filtered.filter(
      (p) => p.price >= min && p.price <= max
    )
  }

  // Kategorie-Filter
  if (filterResult.filters.category && filterResult.filters.category.length > 0) {
    filtered = filtered.filter((p) =>
      filterResult.filters.category!.includes(p.category)
    )
  }

  // Tag-Filter
  if (filterResult.filters.tags && filterResult.filters.tags.length > 0) {
    filtered = filtered.filter((p) => {
      return filterResult.filters.tags!.some((tag) =>
        p.badges?.some((badge) => badge.toLowerCase().includes(tag.toLowerCase()))
      )
    })
  }

  // Sortierung
  if (filterResult.sortBy) {
    switch (filterResult.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
        filtered.sort((a, b) => {
          const aNew = a.isNew ? 1 : 0
          const bNew = b.isNew ? 1 : 0
          return bNew - aNew
        })
        break
    }
  }

  return filtered
}

