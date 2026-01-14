'use client'

import React, { createContext, useEffect, useState, useCallback, useRef } from 'react'
import {
  ACGContextState,
  ACGContextValue,
  VisitorData,
  ACG_STORAGE_KEY,
} from '@/lib/acg/types'
import {
  detectDevice,
  detectTimeOfDay,
  getVisitorData,
  saveVisitorData,
  detectReferrer,
  BrowsingSpeedTracker,
} from '@/lib/acg/detection'

// Initial state (server-safe defaults)
const initialState: ACGContextState = {
  device: 'desktop',
  isTouch: false,
  viewportWidth: 1920,
  timeOfDay: 'afternoon',
  dayOfWeek: 1,
  isWeekend: false,
  isReturningVisitor: false,
  visitCount: 0,
  lastVisit: null,
  lastViewedProducts: [],
  lastViewedCategory: null,
  preferredPetType: null,
  browsingSpeed: 'normal',
  stressLevel: 'low',
  scrollDepth: 0,
  timeOnPage: 0,
  clickCount: 0,
  referrer: 'direct',
  referrerUrl: null,
  isLoaded: false,
}

// Create context
export const ACGContext = createContext<ACGContextValue | null>(null)

interface ACGProviderProps {
  children: React.ReactNode
}

export function ACGProvider({ children }: ACGProviderProps) {
  const [state, setState] = useState<ACGContextState>(initialState)
  const speedTrackerRef = useRef<BrowsingSpeedTracker | null>(null)
  const scrollDepthRef = useRef(0)

  // Initialize context on mount
  useEffect(() => {
    // Initialize speed tracker
    speedTrackerRef.current = new BrowsingSpeedTracker()

    // Detect all contexts
    const deviceInfo = detectDevice()
    const timeInfo = detectTimeOfDay()
    const referrerInfo = detectReferrer()

    // Get and update visitor data
    const visitorData = getVisitorData()
    const isReturning = visitorData.visitCount > 0
    const newVisitCount = visitorData.visitCount + 1

    // Update visitor data
    const updatedVisitorData: VisitorData = {
      ...visitorData,
      visitCount: newVisitCount,
      lastVisit: new Date().toISOString(),
    }
    saveVisitorData(updatedVisitorData)

    // Set initial state
    setState({
      ...deviceInfo,
      ...timeInfo,
      ...referrerInfo,
      isReturningVisitor: isReturning,
      visitCount: newVisitCount,
      lastVisit: visitorData.lastVisit ? new Date(visitorData.lastVisit) : null,
      lastViewedProducts: visitorData.lastViewedProducts,
      lastViewedCategory: visitorData.lastViewedCategory,
      preferredPetType: visitorData.preferences.petType,
      browsingSpeed: 'normal',
      stressLevel: 'low',
      scrollDepth: 0,
      timeOnPage: 0,
      clickCount: 0,
      isLoaded: true,
    })

    // Set up viewport resize listener
    const handleResize = () => {
      const newDeviceInfo = detectDevice()
      setState((prev) => ({
        ...prev,
        ...newDeviceInfo,
      }))
    }

    // Set up scroll listener for depth tracking
    const handleScroll = () => {
      if (speedTrackerRef.current) {
        speedTrackerRef.current.recordScroll()
      }

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const depth = scrollHeight > 0 ? Math.round((currentScroll / scrollHeight) * 100) : 0

      if (depth > scrollDepthRef.current) {
        scrollDepthRef.current = depth
        setState((prev) => ({
          ...prev,
          scrollDepth: depth,
        }))
      }
    }

    // Set up click listener
    const handleClick = () => {
      if (speedTrackerRef.current) {
        speedTrackerRef.current.recordClick()
      }
      setState((prev) => ({
        ...prev,
        clickCount: prev.clickCount + 1,
      }))
    }

    // Update browsing speed and stress level periodically
    const speedInterval = setInterval(() => {
      if (speedTrackerRef.current) {
        const browsingSpeed = speedTrackerRef.current.getBrowsingSpeed()
        const stressLevel = speedTrackerRef.current.getStressLevel()
        const timeOnPage = speedTrackerRef.current.getTimeOnPage()
        setState((prev) => ({
          ...prev,
          browsingSpeed,
          stressLevel,
          timeOnPage,
        }))
      }
    }, 5000) // Update every 5 seconds

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
      clearInterval(speedInterval)
    }
  }, [])

  // Action: Track product view
  const trackProductView = useCallback((productSlug: string) => {
    setState((prev) => {
      const newProducts = [
        productSlug,
        ...prev.lastViewedProducts.filter((p) => p !== productSlug),
      ].slice(0, 10) // Keep last 10

      // Update localStorage
      try {
        const stored = localStorage.getItem(ACG_STORAGE_KEY)
        if (stored) {
          const data = JSON.parse(stored) as VisitorData
          data.lastViewedProducts = newProducts
          saveVisitorData(data)
        }
      } catch {
        // Ignore storage errors
      }

      return {
        ...prev,
        lastViewedProducts: newProducts,
      }
    })
  }, [])

  // Action: Track category view
  const trackCategoryView = useCallback((categorySlug: string) => {
    setState((prev) => {
      // Update localStorage
      try {
        const stored = localStorage.getItem(ACG_STORAGE_KEY)
        if (stored) {
          const data = JSON.parse(stored) as VisitorData
          data.lastViewedCategory = categorySlug
          saveVisitorData(data)
        }
      } catch {
        // Ignore storage errors
      }

      return {
        ...prev,
        lastViewedCategory: categorySlug,
      }
    })
  }, [])

  // Action: Set pet preference
  const setPetPreference = useCallback((petType: 'dog' | 'cat' | 'horse') => {
    setState((prev) => {
      // Update localStorage
      try {
        const stored = localStorage.getItem(ACG_STORAGE_KEY)
        if (stored) {
          const data = JSON.parse(stored) as VisitorData
          data.preferences.petType = petType
          saveVisitorData(data)
        }
      } catch {
        // Ignore storage errors
      }

      return {
        ...prev,
        preferredPetType: petType,
      }
    })
  }, [])

  // Action: Record click (manual)
  const recordClick = useCallback(() => {
    if (speedTrackerRef.current) {
      speedTrackerRef.current.recordClick()
    }
  }, [])

  // Action: Record scroll (manual)
  const recordScroll = useCallback((depth: number) => {
    if (depth > scrollDepthRef.current) {
      scrollDepthRef.current = depth
      setState((prev) => ({
        ...prev,
        scrollDepth: depth,
      }))
    }
  }, [])

  const value: ACGContextValue = {
    ...state,
    trackProductView,
    trackCategoryView,
    setPetPreference,
    recordClick,
    recordScroll,
  }

  return <ACGContext.Provider value={value}>{children}</ACGContext.Provider>
}

