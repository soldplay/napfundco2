// Accessibility Engine - Real-Time Barrierefreiheit

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'xlarge'
  contrast: 'normal' | 'high' | 'very-high'
  simplifiedLanguage: boolean
  screenReaderOptimized: boolean
  reducedMotion: boolean
}

const A11Y_STORAGE_KEY = 'napfco_a11y_settings'

class AccessibilityEngine {
  private settings: AccessibilitySettings = {
    fontSize: 'medium',
    contrast: 'normal',
    simplifiedLanguage: false,
    screenReaderOptimized: false,
    reducedMotion: false,
  }

  constructor() {
    this.loadSettings()
    // applySettings() wird nicht automatisch aufgerufen, um Hydration-Warnungen zu vermeiden
    // Es wird nur explizit aufgerufen, wenn die Komponente gemountet ist
  }

  private loadSettings(): void {
    try {
      const stored = localStorage.getItem(A11Y_STORAGE_KEY)
      if (stored) {
        this.settings = { ...this.settings, ...JSON.parse(stored) }
      }

      // Prüfe Browser-Präferenzen
      if (typeof window !== 'undefined') {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
          this.settings.reducedMotion = true
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  private saveSettings(): void {
    try {
      localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(this.settings))
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Wendet Einstellungen auf das Dokument an
   */
  applySettings(): void {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // Schriftgröße
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'xlarge': '20px',
    }
    root.style.setProperty('--base-font-size', fontSizeMap[this.settings.fontSize])
    root.style.fontSize = fontSizeMap[this.settings.fontSize]

    // Kontrast
    if (this.settings.contrast === 'high') {
      root.classList.add('high-contrast')
      root.classList.remove('very-high-contrast')
    } else if (this.settings.contrast === 'very-high') {
      root.classList.add('very-high-contrast')
      root.classList.remove('high-contrast')
    } else {
      root.classList.remove('high-contrast', 'very-high-contrast')
    }

    // Vereinfachte Sprache
    if (this.settings.simplifiedLanguage) {
      root.classList.add('simplified-language')
      // Wende vereinfachte Sprache auf Content an
      if (typeof window !== 'undefined') {
        // Verwende setTimeout, um sicherzustellen, dass DOM bereit ist
        setTimeout(() => {
          import('./simplified-language-applier').then((module) => {
            module.applySimplifiedLanguage()
          })
        }, 200)
      }
    } else {
      root.classList.remove('simplified-language')
      // Stelle Original wieder her
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          import('./simplified-language-applier').then((module) => {
            module.removeSimplifiedLanguage()
          })
        }, 100)
      }
    }

    // Screenreader-Optimierung
    if (this.settings.screenReaderOptimized) {
      root.classList.add('screenreader-optimized')
      // Füge ARIA-Labels hinzu, wo nötig
      this.optimizeForScreenReader()
    } else {
      root.classList.remove('screenreader-optimized')
    }

    // Reduzierte Bewegung
    if (this.settings.reducedMotion) {
      root.classList.add('reduced-motion')
      root.style.setProperty('--animation-duration', '0.01ms')
    } else {
      root.classList.remove('reduced-motion')
      root.style.removeProperty('--animation-duration')
    }
  }

  /**
   * Optimiert für Screenreader
   */
  private optimizeForScreenReader(): void {
    // Füge ARIA-Labels zu Bildern ohne Alt-Text hinzu
    const images = document.querySelectorAll('img:not([alt])')
    images.forEach((img) => {
      if (!img.getAttribute('aria-label')) {
        img.setAttribute('aria-label', 'Bild')
      }
    })

    // Stelle sicher, dass interaktive Elemente fokussierbar sind
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea')
    interactiveElements.forEach((el) => {
      if (!el.hasAttribute('tabindex') && (el as HTMLElement).tabIndex === -1) {
        ;(el as HTMLElement).tabIndex = 0
      }
    })
  }

  /**
   * Setzt Einstellungen
   */
  setSettings(newSettings: Partial<AccessibilitySettings>): void {
    this.settings = { ...this.settings, ...newSettings }
    this.saveSettings()
    this.applySettings()
  }

  /**
   * Gibt aktuelle Einstellungen zurück
   */
  getSettings(): AccessibilitySettings {
    return { ...this.settings }
  }

  /**
   * Setzt Standard-Einstellungen zurück
   */
  reset(): void {
    this.settings = {
      fontSize: 'medium',
      contrast: 'normal',
      simplifiedLanguage: false,
      screenReaderOptimized: false,
      reducedMotion: false,
    }
    this.saveSettings()
    this.applySettings()
  }

  /**
   * Prüft Barrierefreiheit in Echtzeit
   */
  checkAccessibility(): {
    issues: string[]
    score: number
  } {
    const issues: string[] = []
    let score = 100

    // Prüfe Alt-Texte
    const images = document.querySelectorAll('img')
    images.forEach((img) => {
      if (!img.alt && !img.getAttribute('aria-label')) {
        issues.push('Bild ohne Alt-Text gefunden')
        score -= 5
      }
    })

    // Prüfe Kontraste
    // (Vereinfachte Prüfung - in Produktion würde man echte Farbkontraste prüfen)
    const lowContrastElements = document.querySelectorAll('[style*="color"]')
    if (lowContrastElements.length > 0 && this.settings.contrast === 'normal') {
      issues.push('Mögliche Kontrastprobleme erkannt')
      score -= 10
    }

    // Prüfe Fokus-Indikatoren
    const focusableElements = document.querySelectorAll('button, a, input')
    let missingFocus = 0
    focusableElements.forEach((el) => {
      const styles = window.getComputedStyle(el)
      if (styles.outline === 'none' && !styles.boxShadow) {
        missingFocus++
      }
    })
    if (missingFocus > 0) {
      issues.push(`${missingFocus} Elemente ohne Fokus-Indikator`)
      score -= 5
    }

    return {
      issues,
      score: Math.max(0, score),
    }
  }
}

export const accessibilityEngine = new AccessibilityEngine()

