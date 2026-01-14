'use client'

import { useState, useCallback } from 'react'
import { interpretUserIntent, applySmartFilter, type SmartFilterResult } from '@/lib/smart-filter'
import { getAllProducts, type Product } from '@/lib/products'

export function useSmartAssistant() {
  const [query, setQuery] = useState('')
  const [filterResult, setFilterResult] = useState<SmartFilterResult | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isActive, setIsActive] = useState(false)

  const processQuery = useCallback((userQuery: string) => {
    if (!userQuery.trim()) {
      setFilterResult(null)
      setFilteredProducts([])
      setIsActive(false)
      return
    }

    setQuery(userQuery)
    setIsActive(true)

    // Interpretiere die Anfrage
    const result = interpretUserIntent(userQuery)
    setFilterResult(result)

    // Filtere Produkte
    const allProducts = getAllProducts()
    const filtered = applySmartFilter(allProducts, result)
    setFilteredProducts(filtered)
  }, [])

  const clearQuery = useCallback(() => {
    setQuery('')
    setFilterResult(null)
    setFilteredProducts([])
    setIsActive(false)
  }, [])

  return {
    query,
    filterResult,
    filteredProducts,
    isActive,
    processQuery,
    clearQuery,
  }
}

