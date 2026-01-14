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
   * Analysiert Session auf verdächtiges Verhalten
   */
  analyzeSession(): SessionAnalysis {
    const reasons: string[] = []
    const recommendations: string[] = []
    let riskLevel: 'low' | 'medium' | 'high' = 'low'

    const timeOnPage = (Date.now() - this.startTime) / 1000 // in Sekunden
    this.metrics.timeOnPage = timeOnPage

    // Prüfe auf Bot-Muster: Zu schnelle Klicks
    const rapidClicks = this.detectRapidClicks()
    if (rapidClicks) {
      reasons.push('Sehr schnelle, wiederholte Klicks erkannt')
      riskLevel = 'medium'
      recommendations.push('Captcha anzeigen')
    }

    // Prüfe auf Bot-Muster: Keine Mausbewegungen
    if (this.metrics.mouseMovements < 5 && this.metrics.clickCount > 10) {
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
    const interactionsPerSecond = this.metrics.clickCount / timeOnPage
    if (interactionsPerSecond > 2 && timeOnPage > 5) {
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

