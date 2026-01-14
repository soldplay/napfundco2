// ACG Detection Functions - Client-side context detection

import {
  DeviceType,
  TimeOfDay,
  BrowsingSpeed,
  StressLevel,
  ReferrerType,
  VisitorData,
  ACG_STORAGE_KEY,
} from './types'

/**
 * Detect device type based on viewport width and touch capability
 */
export function detectDevice(): { device: DeviceType; isTouch: boolean; viewportWidth: number } {
  if (typeof window === 'undefined') {
    return { device: 'desktop', isTouch: false, viewportWidth: 1920 }
  }

  const viewportWidth = window.innerWidth
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  let device: DeviceType = 'desktop'
  if (viewportWidth < 768) {
    device = 'mobile'
  } else if (viewportWidth < 1024) {
    device = 'tablet'
  }

  return { device, isTouch, viewportWidth }
}

/**
 * Detect time of day based on local time
 */
export function detectTimeOfDay(): { timeOfDay: TimeOfDay; dayOfWeek: number; isWeekend: boolean } {
  const now = new Date()
  const hour = now.getHours()
  const dayOfWeek = now.getDay()
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  let timeOfDay: TimeOfDay
  if (hour >= 5 && hour < 12) {
    timeOfDay = 'morning'
  } else if (hour >= 12 && hour < 17) {
    timeOfDay = 'afternoon'
  } else if (hour >= 17 && hour < 21) {
    timeOfDay = 'evening'
  } else {
    timeOfDay = 'night'
  }

  return { timeOfDay, dayOfWeek, isWeekend }
}

/**
 * Get visitor data from localStorage
 */
export function getVisitorData(): VisitorData {
  if (typeof window === 'undefined') {
    return getDefaultVisitorData()
  }

  try {
    const stored = localStorage.getItem(ACG_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as VisitorData
    }
  } catch {
    // localStorage not available or corrupted data
  }

  return getDefaultVisitorData()
}

/**
 * Save visitor data to localStorage
 */
export function saveVisitorData(data: VisitorData): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(ACG_STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage not available
  }
}

/**
 * Get default visitor data for new visitors
 */
function getDefaultVisitorData(): VisitorData {
  return {
    visitCount: 0,
    lastVisit: null,
    lastViewedProducts: [],
    lastViewedCategory: null,
    preferences: {
      petType: null,
    },
  }
}

/**
 * Update visitor data on page load
 */
export function recordVisit(): VisitorData {
  const data = getVisitorData()
  const now = new Date().toISOString()

  const updatedData: VisitorData = {
    ...data,
    visitCount: data.visitCount + 1,
    lastVisit: now,
  }

  saveVisitorData(updatedData)
  return updatedData
}

/**
 * Detect referrer type from document.referrer
 */
export function detectReferrer(): { referrer: ReferrerType; referrerUrl: string | null } {
  if (typeof document === 'undefined' || !document.referrer) {
    return { referrer: 'direct', referrerUrl: null }
  }

  const referrerUrl = document.referrer
  const referrerHostname = new URL(referrerUrl).hostname.toLowerCase()

  // Social media platforms
  const socialPlatforms = [
    'tiktok.com',
    'facebook.com',
    'instagram.com',
    'twitter.com',
    'x.com',
    'linkedin.com',
    'pinterest.com',
    'youtube.com',
    'reddit.com',
    'snapchat.com',
  ]

  // Search engines
  const searchEngines = [
    'google.',
    'bing.com',
    'duckduckgo.com',
    'yahoo.',
    'ecosia.org',
    'baidu.com',
    'yandex.',
  ]

  // Check social
  if (socialPlatforms.some((platform) => referrerHostname.includes(platform))) {
    return { referrer: 'social', referrerUrl }
  }

  // Check search
  if (searchEngines.some((engine) => referrerHostname.includes(engine))) {
    return { referrer: 'search', referrerUrl }
  }

  // Check if same domain (internal navigation)
  if (typeof window !== 'undefined' && referrerHostname === window.location.hostname) {
    return { referrer: 'direct', referrerUrl: null }
  }

  return { referrer: 'other', referrerUrl }
}

/**
 * Browsing speed tracker class
 */
export class BrowsingSpeedTracker {
  private clickTimestamps: number[] = []
  private scrollTimestamps: number[] = []
  private startTime: number

  constructor() {
    this.startTime = Date.now()
  }

  recordClick(): void {
    this.clickTimestamps.push(Date.now())
    // Keep only last 20 clicks
    if (this.clickTimestamps.length > 20) {
      this.clickTimestamps.shift()
    }
  }

  recordScroll(): void {
    this.scrollTimestamps.push(Date.now())
    // Keep only last 50 scroll events
    if (this.scrollTimestamps.length > 50) {
      this.scrollTimestamps.shift()
    }
  }

  /**
   * Calculate browsing speed based on interaction frequency
   */
  getBrowsingSpeed(): BrowsingSpeed {
    const timeElapsed = (Date.now() - this.startTime) / 1000 // in seconds
    if (timeElapsed < 5) return 'normal' // Not enough data

    const totalInteractions = this.clickTimestamps.length + this.scrollTimestamps.length
    const interactionsPerSecond = totalInteractions / timeElapsed

    // Fast: > 0.5 interactions/second (lots of quick scrolling/clicking)
    // Slow: < 0.1 interactions/second (taking time to read)
    if (interactionsPerSecond > 0.5) {
      return 'fast'
    } else if (interactionsPerSecond < 0.1) {
      return 'slow'
    }
    return 'normal'
  }

  getTimeOnPage(): number {
    return Math.floor((Date.now() - this.startTime) / 1000)
  }

  getClickCount(): number {
    return this.clickTimestamps.length
  }

  /**
   * Calculate stress level based on interaction patterns
   */
  getStressLevel(): StressLevel {
    const timeElapsed = (Date.now() - this.startTime) / 1000 // in seconds
    if (timeElapsed < 5) return 'low' // Not enough data

    const totalInteractions = this.clickTimestamps.length + this.scrollTimestamps.length
    const interactionsPerSecond = totalInteractions / timeElapsed

    // Check for rapid clicking (stress indicator)
    const rapidClicks = this.clickTimestamps.filter((timestamp, index) => {
      if (index === 0) return false
      const timeSinceLastClick = timestamp - this.clickTimestamps[index - 1]
      return timeSinceLastClick < 500 // Less than 500ms between clicks
    }).length

    // Check for rapid scrolling (stress indicator)
    const rapidScrolls = this.scrollTimestamps.filter((timestamp, index) => {
      if (index === 0) return false
      const timeSinceLastScroll = timestamp - this.scrollTimestamps[index - 1]
      return timeSinceLastScroll < 200 // Less than 200ms between scrolls
    }).length

    // High stress: very fast interactions OR many rapid clicks/scrolls
    if (interactionsPerSecond > 1.0 || rapidClicks > 5 || rapidScrolls > 10) {
      return 'high'
    }

    // Medium stress: fast interactions OR some rapid clicks/scrolls
    if (interactionsPerSecond > 0.7 || rapidClicks > 2 || rapidScrolls > 5) {
      return 'medium'
    }

    return 'low'
  }
}

