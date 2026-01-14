// ACG Adaptive Content - Content variations based on context

import { ACGContextState, AdaptiveContent } from './types'

/**
 * Generate time-based greeting
 */
export function getGreeting(timeOfDay: ACGContextState['timeOfDay'], isReturning: boolean): string {
  const greetings = {
    morning: isReturning ? 'Guten Morgen! Schön, Sie wiederzusehen.' : 'Guten Morgen!',
    afternoon: isReturning ? 'Willkommen zurück!' : 'Herzlich willkommen!',
    evening: isReturning ? 'Schönen Abend! Willkommen zurück.' : 'Schönen Abend!',
    night: isReturning ? 'Willkommen zurück bei Napf&Co!' : 'Willkommen bei Napf&Co!',
  }
  return greetings[timeOfDay]
}

/**
 * Generate adaptive headline based on context
 */
export function getAdaptiveHeadline(context: ACGContextState): string {
  // Returning visitor with known pet preference
  if (context.isReturningVisitor && context.preferredPetType) {
    const petNames = {
      dog: 'Ihren Hund',
      cat: 'Ihre Katze',
      horse: 'Ihr Pferd',
    }
    return `Das Beste für ${petNames[context.preferredPetType]}`
  }

  // Time-based headlines
  const headlines = {
    morning: {
      mobile: 'Frisch gestartet.\nFrisch gefüttert.',
      desktop: 'Der perfekte Start in den Tag – für Sie und Ihr Tier',
    },
    afternoon: {
      mobile: 'Premium Futter.\nGlückliche Tiere.',
      desktop: 'Gesundes Futter = Glückliche Tiere',
    },
    evening: {
      mobile: 'Zeit für\ndas Beste.',
      desktop: 'Entspannt stöbern, das Beste finden',
    },
    night: {
      mobile: 'Noch wach?\nWir auch.',
      desktop: 'Spät dran? Kein Problem – wir sind 24/7 für Sie da',
    },
  }

  const deviceKey = context.device === 'mobile' ? 'mobile' : 'desktop'
  return headlines[context.timeOfDay][deviceKey]
}

/**
 * Generate adaptive subheadline
 */
export function getAdaptiveSubheadline(context: ACGContextState): string {
  // Fast browsers get shorter text
  if (context.browsingSpeed === 'fast') {
    return 'Premium Tierfutter – 100% aus der EU.'
  }

  // Returning visitors
  if (context.isReturningVisitor && context.lastViewedCategory) {
    const categoryNames: Record<string, string> = {
      hunde: 'Hundefutter',
      katzen: 'Katzenfutter',
      pferde: 'Pferdefutter',
    }
    const categoryName = categoryNames[context.lastViewedCategory] || 'Tierfutter'
    return `Schauen Sie sich unser neues ${categoryName}-Sortiment an. Natürliche Zutaten, höchste Qualität.`
  }

  // Weekend vs weekday
  if (context.isWeekend) {
    return 'Das Wochenende gehört Ihnen und Ihrem Tier. Entdecken Sie unser Premium-Sortiment in Ruhe.'
  }

  // Default based on time
  const subheadlines = {
    morning: 'Starten Sie den Tag mit dem Besten für Ihr Tier. 100% natürlich, 100% aus der EU.',
    afternoon: 'Premium Tierfutter für Hunde, Katzen und Pferde. Natürliche Zutaten, höchste Qualität.',
    evening: 'Nach einem langen Tag verdient Ihr Tier das Beste. Entdecken Sie unser Sortiment.',
    night: 'Rund um die Uhr verfügbar – Premium Tierfutter, wann immer Sie es brauchen.',
  }

  return subheadlines[context.timeOfDay]
}

/**
 * Get adaptive CTA texts
 */
export function getAdaptiveCTAs(context: ACGContextState): { primary: string; secondary: string } {
  // Mobile gets shorter CTAs
  if (context.device === 'mobile') {
    return {
      primary: context.referrer === 'social' ? 'Zum TikTok Shop' : 'Jetzt entdecken',
      secondary: 'Futterberater',
    }
  }

  // Social referrer
  if (context.referrer === 'social') {
    return {
      primary: 'Im TikTok Shop entdecken',
      secondary: 'Oder: Futterberater starten',
    }
  }

  // Returning visitor
  if (context.isReturningVisitor) {
    return {
      primary: 'Weiter stöbern',
      secondary: 'Neues im Sortiment',
    }
  }

  // Default
  return {
    primary: 'TikTok Shop entdecken',
    secondary: 'Futterberater starten',
  }
}

/**
 * Determine detail level based on browsing behavior
 */
export function getDetailLevel(context: ACGContextState): AdaptiveContent['detailLevel'] {
  if (context.browsingSpeed === 'fast') return 'minimal'
  if (context.browsingSpeed === 'slow') return 'detailed'
  return 'standard'
}

/**
 * Determine tone based on context
 */
export function getTone(context: ACGContextState): AdaptiveContent['tone'] {
  // Morning = energetic
  if (context.timeOfDay === 'morning') return 'energetic'
  
  // Evening/Night = calm
  if (context.timeOfDay === 'evening' || context.timeOfDay === 'night') return 'calm'
  
  // Returning visitors = friendly
  if (context.isReturningVisitor) return 'friendly'
  
  // Search referrer = professional
  if (context.referrer === 'search') return 'professional'
  
  return 'friendly'
}

/**
 * Generate complete adaptive content based on context
 */
export function generateAdaptiveContent(context: ACGContextState): AdaptiveContent {
  const ctas = getAdaptiveCTAs(context)

  return {
    greeting: getGreeting(context.timeOfDay, context.isReturningVisitor),
    headline: getAdaptiveHeadline(context),
    subheadline: getAdaptiveSubheadline(context),
    ctaPrimary: ctas.primary,
    ctaSecondary: ctas.secondary,
    detailLevel: getDetailLevel(context),
    tone: getTone(context),
  }
}

/**
 * Get personalized product recommendation text
 */
export function getRecommendationText(context: ACGContextState): string | null {
  if (!context.isReturningVisitor) return null

  if (context.lastViewedProducts.length > 0) {
    return 'Basierend auf Ihren letzten Besuchen'
  }

  if (context.preferredPetType) {
    const petRecommendations = {
      dog: 'Empfohlen für Hundebesitzer',
      cat: 'Empfohlen für Katzenbesitzer',
      horse: 'Empfohlen für Pferdebesitzer',
    }
    return petRecommendations[context.preferredPetType]
  }

  return 'Für Sie empfohlen'
}

/**
 * Get welcome back message for returning visitors
 */
export function getWelcomeBackMessage(context: ACGContextState): string | null {
  if (!context.isReturningVisitor || context.visitCount < 2) return null

  if (context.visitCount >= 10) {
    return `Willkommen zurück! Sie gehören schon zu unseren Stammkunden. 🐾`
  }

  if (context.visitCount >= 5) {
    return `Schön, Sie wiederzusehen! Das ist bereits Ihr ${context.visitCount}. Besuch.`
  }

  if (context.lastVisit) {
    const daysSinceLastVisit = Math.floor(
      (Date.now() - context.lastVisit.getTime()) / (1000 * 60 * 60 * 24)
    )
    if (daysSinceLastVisit > 7) {
      return 'Lange nicht gesehen! Entdecken Sie, was es Neues gibt.'
    }
  }

  return 'Willkommen zurück bei Napf&Co!'
}

