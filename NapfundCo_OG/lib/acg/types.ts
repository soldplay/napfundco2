// ACG (Adaptive Content Governance) Types

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

export type BrowsingSpeed = 'fast' | 'normal' | 'slow'

export type StressLevel = 'low' | 'medium' | 'high'

export type ReferrerType = 'direct' | 'social' | 'search' | 'other'

export interface VisitorData {
  visitCount: number
  lastVisit: string | null
  lastViewedProducts: string[]
  lastViewedCategory: string | null
  preferences: {
    petType: 'dog' | 'cat' | 'horse' | null
  }
}

export interface ACGContextState {
  // Device Context
  device: DeviceType
  isTouch: boolean
  viewportWidth: number
  
  // Time Context
  timeOfDay: TimeOfDay
  dayOfWeek: number
  isWeekend: boolean
  
  // Visitor Context
  isReturningVisitor: boolean
  visitCount: number
  lastVisit: Date | null
  lastViewedProducts: string[]
  lastViewedCategory: string | null
  preferredPetType: 'dog' | 'cat' | 'horse' | null
  
  // Behavior Context
  browsingSpeed: BrowsingSpeed
  stressLevel: StressLevel
  scrollDepth: number
  timeOnPage: number
  clickCount: number
  
  // Referrer Context
  referrer: ReferrerType
  referrerUrl: string | null
  
  // Computed
  isLoaded: boolean
}

export interface ACGActions {
  trackProductView: (productSlug: string) => void
  trackCategoryView: (categorySlug: string) => void
  setPetPreference: (petType: 'dog' | 'cat' | 'horse') => void
  recordClick: () => void
  recordScroll: (depth: number) => void
}

export interface ACGContextValue extends ACGContextState, ACGActions {}

// Content adaptation types
export interface AdaptiveContent {
  greeting: string
  headline: string
  subheadline: string
  ctaPrimary: string
  ctaSecondary: string
  detailLevel: 'minimal' | 'standard' | 'detailed'
  tone: 'energetic' | 'calm' | 'professional' | 'friendly'
}

// Storage keys
export const ACG_STORAGE_KEY = 'napfco_acg_visitor'
export const ACG_SESSION_KEY = 'napfco_acg_session'

