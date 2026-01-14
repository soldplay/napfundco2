'use client'

import { useContext, useMemo } from 'react'
import { ACGContext } from '@/components/providers/ACGProvider'
import { ACGContextValue, AdaptiveContent } from '@/lib/acg/types'
import { generateAdaptiveContent, getWelcomeBackMessage, getRecommendationText } from '@/lib/acg/content'

/**
 * Hook to access the ACG context
 * Throws if used outside of ACGProvider
 */
export function useACG(): ACGContextValue {
  const context = useContext(ACGContext)
  
  if (!context) {
    throw new Error('useACG must be used within an ACGProvider')
  }
  
  return context
}

/**
 * Hook to access ACG context safely (returns null if not available)
 */
export function useACGSafe(): ACGContextValue | null {
  return useContext(ACGContext)
}

/**
 * Hook to get adaptive content based on current context
 */
export function useAdaptiveContent(): AdaptiveContent & { isLoaded: boolean } {
  const context = useACGSafe()
  
  return useMemo(() => {
    if (!context || !context.isLoaded) {
      // Return default content when not loaded
      return {
        greeting: 'Willkommen bei Napf&Co!',
        headline: 'Gesundes Futter = Glückliche Tiere',
        subheadline: 'Premium Tierfutter für Hunde, Katzen und Pferde. Natürliche Zutaten, höchste Qualität – 100% aus der EU.',
        ctaPrimary: 'TikTok Shop entdecken',
        ctaSecondary: 'Futterberater starten',
        detailLevel: 'standard' as const,
        tone: 'friendly' as const,
        isLoaded: false,
      }
    }
    
    const content = generateAdaptiveContent(context)
    return {
      ...content,
      isLoaded: true,
    }
  }, [context])
}

/**
 * Hook to get welcome back message for returning visitors
 */
export function useWelcomeMessage(): string | null {
  const context = useACGSafe()
  
  return useMemo(() => {
    if (!context || !context.isLoaded) return null
    return getWelcomeBackMessage(context)
  }, [context])
}

/**
 * Hook to get recommendation text based on visitor history
 */
export function useRecommendationText(): string | null {
  const context = useACGSafe()
  
  return useMemo(() => {
    if (!context || !context.isLoaded) return null
    return getRecommendationText(context)
  }, [context])
}

/**
 * Hook to check if current visitor is on mobile
 */
export function useIsMobile(): boolean {
  const context = useACGSafe()
  return context?.device === 'mobile' ?? false
}

/**
 * Hook to check if current visitor is a returning visitor
 */
export function useIsReturningVisitor(): boolean {
  const context = useACGSafe()
  return context?.isReturningVisitor ?? false
}

/**
 * Hook to get current time context
 */
export function useTimeContext(): {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  isWeekend: boolean
} {
  const context = useACGSafe()
  return {
    timeOfDay: context?.timeOfDay ?? 'afternoon',
    isWeekend: context?.isWeekend ?? false,
  }
}

/**
 * Hook to get visitor tracking functions
 */
export function useACGTracking(): {
  trackProductView: (slug: string) => void
  trackCategoryView: (slug: string) => void
  setPetPreference: (pet: 'dog' | 'cat' | 'horse') => void
} {
  const context = useACGSafe()
  
  return {
    trackProductView: context?.trackProductView ?? (() => {}),
    trackCategoryView: context?.trackCategoryView ?? (() => {}),
    setPetPreference: context?.setPetPreference ?? (() => {}),
  }
}

