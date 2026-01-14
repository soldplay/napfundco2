// Session Monitor - Überwacht Session-Integrität und erkennt verdächtiges Verhalten

export interface SessionMetrics {
  clickCount: number
  scrollEvents: number
  timeOnPage: number
  mouseMovements: number
  keystrokes: number
  suspiciousPatterns: string[]
}

export interface SessionAnalysis {
  isSuspicious: boolean
  riskLevel: 'low' | 'medium' | 'high'
  reasons: string[]
  recommendations: string[]
}

class SessionMonitor {
  private metrics: SessionMetrics = {
    clickCount: 0,
    scrollEvents: 0,
    timeOnPage: 0,
    mouseMovements: 0,
    keystrokes: 0,
    suspiciousPatterns: [],
  }

  private startTime: number = Date.now()
  private clickTimestamps: number[] = []
  private mouseMovements: Array<{ x: number; y: number; timestamp: number }> = []
  private accessibilityModeActiveUntil: number = 0 // Timestamp bis wann Accessibility-Mode aktiv ist

  /**
   * Zeichnet einen Klick auf
   */
  recordClick(): void {
    this.metrics.clickCount++
    this.clickTimestamps.push(Date.now())
  }

  /**
   * Zeichnet Scroll-Event auf
   */
  recordScroll(): void {
    this.metrics.scrollEvents++
  }

  /**
   * Zeichnet Mausbewegung auf
   */
  recordMouseMovement(x: number, y: number): void {
    this.metrics.mouseMovements++
    this.mouseMovements.push({ x, y, timestamp: Date.now() })
    // Behalte nur letzte 100 Bewegungen
    if (this.mouseMovements.length > 100) {
      this.mouseMovements.shift()
    }
  }

  /**
   * Zeichnet Tastendruck auf
   */
  recordKeystroke(): void {
    this.metrics.keystrokes++
  }

  /**
   * Markiert, dass Accessibility-Features aktiviert werden
   * Verhindert für 3 Sekunden, dass diese als verdächtig erkannt werden
   */
  markAccessibilityMode(): void {
    this.accessibilityModeActiveUntil = Date.now() + 3000 // 3 Sekunden
  }

  /**
   * Prüft, ob Accessibility-Mode aktiv ist
   */
  private isAccessibilityModeActive(): boolean {
    return Date.now() < this.accessibilityModeActiveUntil
  }

  /**
   * Analysiert Session auf verdächtiges Verhalten
   */
  analyzeSession(): SessionAnalysis {
    const reasons: string[] = []
    const recommendations: string[] = []
    let riskLevel: 'low' | 'medium' | 'high' = 'low'

    const timeOnPage = (Date.now() - this.startTime) / 1000 // in Sekunden
    this.metrics.timeOnPage = timeOnPage

    // Ignoriere verdächtiges Verhalten während Accessibility-Mode
    if (this.isAccessibilityModeActive()) {
      return {
        isSuspicious: false,
        riskLevel: 'low',
        reasons: [],
        recommendations: [],
      }
    }

    // Prüfe auf Bot-Muster: Zu schnelle Klicks
    // Nur als verdächtig, wenn mehr als 5 Klicks in kurzer Zeit
    const rapidClicks = this.detectRapidClicks()
    if (rapidClicks && this.metrics.clickCount > 5) {
      reasons.push('Sehr schnelle, wiederholte Klicks erkannt')
      riskLevel = 'medium'
      recommendations.push('Captcha anzeigen')
    }

    // Prüfe auf Bot-Muster: Keine Mausbewegungen
    // Nur als verdächtig, wenn viele Klicks (mehr als 15) ohne Mausbewegungen
    if (this.metrics.mouseMovements < 5 && this.metrics.clickCount > 15) {
      reasons.push('Viele Klicks ohne Mausbewegungen (möglicher Bot)')
      riskLevel = 'high'
      recommendations.push('Captcha anzeigen', 'Funktionen einschränken')
    }

    // Prüfe auf Bot-Muster: Perfekte Scroll-Muster
    if (this.metrics.scrollEvents > 50 && this.metrics.mouseMovements < 10) {
      reasons.push('Automatisches Scroll-Verhalten erkannt')
      riskLevel = 'medium'
      recommendations.push('Verhalten überwachen')
    }

    // Prüfe auf Bot-Muster: Zu schnelle Interaktionen
    // Nur als verdächtig, wenn sehr hohe Rate (mehr als 3 pro Sekunde) UND mehr als 10 Klicks insgesamt
    const interactionsPerSecond = this.metrics.clickCount / timeOnPage
    if (interactionsPerSecond > 3 && timeOnPage > 5 && this.metrics.clickCount > 10) {
      reasons.push('Ungewöhnlich hohe Interaktionsrate')
      riskLevel = 'medium'
      recommendations.push('Verhalten überwachen')
    }

    // Prüfe auf manipulierte Sessions: Ungewöhnliche Zeitstempel
    const timeAnomalies = this.detectTimeAnomalies()
    if (timeAnomalies) {
      reasons.push('Zeitstempel-Anomalien erkannt (mögliche Manipulation)')
      riskLevel = 'high'
      recommendations.push('Session zurücksetzen', 'Admin benachrichtigen')
    }

    const isSuspicious = reasons.length > 0

    return {
      isSuspicious,
      riskLevel,
      reasons,
      recommendations,
    }
  }

  /**
   * Erkennt schnelle, wiederholte Klicks
   */
  private detectRapidClicks(): boolean {
    if (this.clickTimestamps.length < 5) return false

    // Prüfe, ob mehrere Klicks innerhalb von 100ms erfolgten
    for (let i = 1; i < this.clickTimestamps.length; i++) {
      const timeDiff = this.clickTimestamps[i] - this.clickTimestamps[i - 1]
      if (timeDiff < 100) {
        return true
      }
    }

    return false
  }

  /**
   * Erkennt Zeitstempel-Anomalien
   */
  private detectTimeAnomalies(): boolean {
    if (this.clickTimestamps.length < 3) return false

    // Prüfe auf rückwärts gerichtete Zeitstempel
    for (let i = 1; i < this.clickTimestamps.length; i++) {
      if (this.clickTimestamps[i] < this.clickTimestamps[i - 1]) {
        return true
      }
    }

    return false
  }

  /**
   * Gibt aktuelle Metriken zurück
   */
  getMetrics(): SessionMetrics {
    return { ...this.metrics }
  }

  /**
   * Setzt Metriken zurück
   */
  reset(): void {
    this.metrics = {
      clickCount: 0,
      scrollEvents: 0,
      timeOnPage: 0,
      mouseMovements: 0,
      keystrokes: 0,
      suspiciousPatterns: [],
    }
    this.startTime = Date.now()
    this.clickTimestamps = []
    this.mouseMovements = []
  }
}

export const sessionMonitor = new SessionMonitor()

