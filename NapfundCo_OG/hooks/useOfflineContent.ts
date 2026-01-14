'use client'

import { useState, useEffect, useCallback } from 'react'
import { offlineStorage, autoSaveCurrentPage, supportsOffline, type OfflineContent } from '@/lib/offline-storage'

export function useOfflineContent() {
  const [isOffline, setIsOffline] = useState(false)
  const [isAvailable, setIsAvailable] = useState(false)
  const [savedPages, setSavedPages] = useState<OfflineContent[]>([])
  const [supportsOfflineMode, setSupportsOfflineMode] = useState(false)

  useEffect(() => {
    setSupportsOfflineMode(supportsOffline())

    // Prüfe Online/Offline-Status
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine)
    }

    updateOnlineStatus()
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // Prüfe, ob aktuelle Seite offline verfügbar ist
    const currentUrl = window.location.href
    setIsAvailable(offlineStorage.isAvailableOffline(currentUrl))

    // Lade gespeicherte Seiten
    setSavedPages(offlineStorage.getAllPages())

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  const saveCurrentPage = useCallback(() => {
    autoSaveCurrentPage()
    const currentUrl = window.location.href
    setIsAvailable(offlineStorage.isAvailableOffline(currentUrl))
    setSavedPages(offlineStorage.getAllPages())
  }, [])

  const deletePage = useCallback((url: string) => {
    offlineStorage.deletePage(url)
    setSavedPages(offlineStorage.getAllPages())
    const currentUrl = window.location.href
    setIsAvailable(offlineStorage.isAvailableOffline(currentUrl))
  }, [])

  const clearAll = useCallback(() => {
    offlineStorage.clearAll()
    setSavedPages([])
    setIsAvailable(false)
  }, [])

  return {
    isOffline,
    isAvailable,
    savedPages,
    supportsOfflineMode,
    saveCurrentPage,
    deletePage,
    clearAll,
    totalSize: offlineStorage.getTotalSize(),
  }
}

