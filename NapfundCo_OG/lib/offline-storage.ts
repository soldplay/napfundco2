// Offline Storage - Speichert Inhalte für Offline-Nutzung

const OFFLINE_STORAGE_KEY = 'napfco_offline_content'
const MAX_OFFLINE_SIZE = 10 * 1024 * 1024 // 10 MB

export interface OfflineContent {
  url: string
  html: string
  timestamp: number
  title: string
}

class OfflineStorageManager {
  private content: Map<string, OfflineContent> = new Map()

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(OFFLINE_STORAGE_KEY)
      if (stored) {
        const data: OfflineContent[] = JSON.parse(stored)
        data.forEach((item) => {
          this.content.set(item.url, item)
        })
      }
    } catch {
      // Ignore storage errors
    }
  }

  private saveToStorage(): void {
    try {
      const data = Array.from(this.content.values())
      localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(data))
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Speichert eine Seite für Offline-Nutzung
   */
  savePage(url: string, html: string, title: string): boolean {
    try {
      // Prüfe Größe
      const size = new Blob([html]).size
      if (size > MAX_OFFLINE_SIZE) {
        console.warn('Seite zu groß für Offline-Speicherung')
        return false
      }

      const content: OfflineContent = {
        url,
        html,
        title,
        timestamp: Date.now(),
      }

      this.content.set(url, content)
      this.saveToStorage()
      return true
    } catch {
      return false
    }
  }

  /**
   * Holt gespeicherte Seite
   */
  getPage(url: string): OfflineContent | null {
    return this.content.get(url) || null
  }

  /**
   * Prüft, ob eine Seite offline verfügbar ist
   */
  isAvailableOffline(url: string): boolean {
    return this.content.has(url)
  }

  /**
   * Löscht gespeicherte Seite
   */
  deletePage(url: string): void {
    this.content.delete(url)
    this.saveToStorage()
  }

  /**
   * Löscht alle gespeicherten Seiten
   */
  clearAll(): void {
    this.content.clear()
    this.saveToStorage()
  }

  /**
   * Gibt alle gespeicherten Seiten zurück
   */
  getAllPages(): OfflineContent[] {
    return Array.from(this.content.values())
  }

  /**
   * Gibt geschätzte Gesamtgröße zurück
   */
  getTotalSize(): number {
    let total = 0
    this.content.forEach((content) => {
      total += new Blob([content.html]).size
    })
    return total
  }
}

export const offlineStorage = new OfflineStorageManager()

/**
 * Speichert aktuelle Seite automatisch
 */
export function autoSaveCurrentPage(): void {
  if (typeof window === 'undefined') return

  const url = window.location.href
  const html = document.documentElement.outerHTML
  const title = document.title

  offlineStorage.savePage(url, html, title)
}

/**
 * Prüft, ob Browser Offline-Funktionalität unterstützt
 */
export function supportsOffline(): boolean {
  if (typeof window === 'undefined') return false
  return 'serviceWorker' in navigator && 'caches' in window
}

