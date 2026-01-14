'use client'

import { useState, useEffect, useCallback } from 'react'
import { useACG } from './useACG'
import type { Product } from '@/lib/products'

const HISTORY_STORAGE_KEY = 'napfco_personal_history'

interface PersonalHistory {
  lastViewedProducts: Product[]
  lastPurchasedProducts: Product[]
  lastSelectedCategory: string | null
  preferences: {
    priceRange?: { min: number; max: number }
    preferredPetType?: 'dog' | 'cat' | 'horse'
  }
  visitHistory: {
    date: string
    viewedProducts: string[]
    category: string | null
  }[]
}

export function usePersonalHistory() {
  const { lastViewedProducts, preferredPetType } = useACG()
  const [history, setHistory] = useState<PersonalHistory | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY)
      if (stored) {
        setHistory(JSON.parse(stored))
      } else {
        setHistory({
          lastViewedProducts: [],
          lastPurchasedProducts: [],
          lastSelectedCategory: null,
          preferences: {},
          visitHistory: [],
        })
      }
    } catch {
      setHistory({
        lastViewedProducts: [],
        lastPurchasedProducts: [],
        lastSelectedCategory: null,
        preferences: {},
        visitHistory: [],
      })
    }
  }, [])

  const saveHistory = useCallback((newHistory: PersonalHistory) => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory))
      setHistory(newHistory)
    } catch {
      // Ignore storage errors
    }
  }, [])

  const recordProductView = useCallback((product: Product) => {
    if (!history) return

    const updatedHistory: PersonalHistory = {
      ...history,
      lastViewedProducts: [
        product,
        ...history.lastViewedProducts.filter((p) => p.id !== product.id),
      ].slice(0, 10),
    }

    saveHistory(updatedHistory)
  }, [history, saveHistory])

  const recordPurchase = useCallback((product: Product) => {
    if (!history) return

    const updatedHistory: PersonalHistory = {
      ...history,
      lastPurchasedProducts: [
        product,
        ...history.lastPurchasedProducts.filter((p) => p.id !== product.id),
      ].slice(0, 10),
    }

    saveHistory(updatedHistory)
  }, [history, saveHistory])

  const getLastViewedProduct = useCallback((): Product | null => {
    return history?.lastViewedProducts[0] || null
  }, [history])

  const getLastPurchasedProduct = useCallback((): Product | null => {
    return history?.lastPurchasedProducts[0] || null
  }, [history])

  const getUpgradeSuggestion = useCallback((currentProduct: Product): Product | null => {
    if (!history || history.lastPurchasedProducts.length === 0) return null

    const lastProduct = history.lastPurchasedProducts[0]
    
    // Wenn aktuelles Produkt teurer ist, kein Upgrade nötig
    if (currentProduct.price > lastProduct.price) return null

    // Suche nach teurerem Produkt in derselben Kategorie
    // (In echter Implementierung würde man hier die Produktliste durchsuchen)
    return null // Placeholder
  }, [history])

  return {
    history,
    recordProductView,
    recordPurchase,
    getLastViewedProduct,
    getLastPurchasedProduct,
    getUpgradeSuggestion,
  }
}

