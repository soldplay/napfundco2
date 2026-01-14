// Behavioral Authentication - Passwortlose Authentifizierung basierend auf Verhalten

export interface DeviceSignature {
  userAgent: string
  screenResolution: string
  timezone: string
  language: string
  platform: string
  fingerprint: string
}

export interface BehavioralPattern {
  mouseMovements: Array<{ x: number; y: number; timestamp: number }>
  typingPattern: Array<{ key: string; timestamp: number; duration: number }>
  scrollPattern: Array<{ depth: number; timestamp: number }>
  clickPattern: Array<{ x: number; y: number; timestamp: number }>
}

export interface AuthContext {
  location?: string
  timeOfDay: string
  device: DeviceSignature
  network?: string
}

export interface AuthResult {
  authenticated: boolean
  confidence: number // 0-100
  method: 'device' | 'behavior' | 'context' | 'combined'
  requiresAdditionalAuth: boolean
}

class BehavioralAuth {
  private storedPatterns: Map<string, BehavioralPattern> = new Map()
  private deviceSignatures: Map<string, DeviceSignature> = new Map()

  /**
   * Erstellt Geräte-Signatur
   */
  createDeviceSignature(): DeviceSignature {
    const screenResolution = `${window.screen.width}x${window.screen.height}`
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const language = navigator.language

    // Erstelle Fingerprint aus verschiedenen Eigenschaften
    const fingerprint = this.createFingerprint({
      userAgent: navigator.userAgent,
      screenResolution,
      timezone,
      language,
      platform: navigator.platform,
    })

    return {
      userAgent: navigator.userAgent,
      screenResolution,
      timezone,
      language,
      platform: navigator.platform,
      fingerprint,
    }
  }

  /**
   * Erstellt Fingerprint aus Geräteeigenschaften
   */
  private createFingerprint(device: Omit<DeviceSignature, 'fingerprint'>): string {
    const data = `${device.userAgent}-${device.screenResolution}-${device.timezone}-${device.language}-${device.platform}`
    // Einfacher Hash (in Produktion würde man einen echten Hash verwenden)
    return btoa(data).substring(0, 32)
  }

  /**
   * Speichert Verhaltensmuster für einen Benutzer
   */
  saveBehavioralPattern(userId: string, pattern: BehavioralPattern): void {
    this.storedPatterns.set(userId, pattern)
    try {
      localStorage.setItem(`behavioral_pattern_${userId}`, JSON.stringify(pattern))
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Lädt gespeichertes Verhaltensmuster
   */
  loadBehavioralPattern(userId: string): BehavioralPattern | null {
    try {
      const stored = localStorage.getItem(`behavioral_pattern_${userId}`)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // Ignore storage errors
    }
    return this.storedPatterns.get(userId) || null
  }

  /**
   * Vergleicht Verhaltensmuster
   */
  compareBehavioralPatterns(
    stored: BehavioralPattern,
    current: BehavioralPattern
  ): number {
    // Vereinfachter Vergleich (in Produktion würde man ML-Algorithmen verwenden)
    let similarity = 0
    let comparisons = 0

    // Vergleiche Mausbewegungen
    if (stored.mouseMovements.length > 0 && current.mouseMovements.length > 0) {
      const avgStored = this.calculateAverageMovement(stored.mouseMovements)
      const avgCurrent = this.calculateAverageMovement(current.mouseMovements)
      const diff = Math.abs(avgStored - avgCurrent)
      similarity += Math.max(0, 100 - diff * 10)
      comparisons++
    }

    // Vergleiche Typing-Pattern
    if (stored.typingPattern.length > 0 && current.typingPattern.length > 0) {
      const storedAvg = this.calculateAverageTypingSpeed(stored.typingPattern)
      const currentAvg = this.calculateAverageTypingSpeed(current.typingPattern)
      const diff = Math.abs(storedAvg - currentAvg)
      similarity += Math.max(0, 100 - diff * 5)
      comparisons++
    }

    return comparisons > 0 ? similarity / comparisons : 0
  }

  /**
   * Berechnet durchschnittliche Mausbewegung
   */
  private calculateAverageMovement(
    movements: Array<{ x: number; y: number }>
  ): number {
    if (movements.length < 2) return 0

    let totalDistance = 0
    for (let i = 1; i < movements.length; i++) {
      const dx = movements[i].x - movements[i - 1].x
      const dy = movements[i].y - movements[i - 1].y
      totalDistance += Math.sqrt(dx * dx + dy * dy)
    }

    return totalDistance / (movements.length - 1)
  }

  /**
   * Berechnet durchschnittliche Tippgeschwindigkeit
   */
  private calculateAverageTypingSpeed(
    pattern: Array<{ duration: number }>
  ): number {
    if (pattern.length === 0) return 0
    const total = pattern.reduce((sum, p) => sum + p.duration, 0)
    return total / pattern.length
  }

  /**
   * Authentifiziert basierend auf Verhalten und Kontext
   */
  authenticate(
    userId: string,
    currentPattern: BehavioralPattern,
    context: AuthContext
  ): AuthResult {
    const storedPattern = this.loadBehavioralPattern(userId)
    const storedDevice = this.deviceSignatures.get(userId)

    let confidence = 0
    let method: AuthResult['method'] = 'context'
    let requiresAdditionalAuth = false

    // Prüfe Geräte-Signatur
    if (storedDevice) {
      const deviceMatch = this.compareDeviceSignatures(storedDevice, context.device)
      if (deviceMatch > 80) {
        confidence += 40
        method = 'device'
      }
    }

    // Prüfe Verhaltensmuster
    if (storedPattern) {
      const behaviorSimilarity = this.compareBehavioralPatterns(storedPattern, currentPattern)
      if (behaviorSimilarity > 70) {
        confidence += 40
        method = method === 'device' ? 'combined' : 'behavior'
      } else if (behaviorSimilarity < 50) {
        // Verdächtig niedrige Ähnlichkeit
        requiresAdditionalAuth = true
      }
    }

    // Prüfe Kontext
    const contextScore = this.evaluateContext(context)
    confidence += contextScore * 0.2

    // Wenn Confidence zu niedrig, zusätzliche Authentifizierung erforderlich
    if (confidence < 60) {
      requiresAdditionalAuth = true
    }

    return {
      authenticated: confidence >= 70,
      confidence: Math.min(100, Math.round(confidence)),
      method,
      requiresAdditionalAuth,
    }
  }

  /**
   * Vergleicht Geräte-Signaturen
   */
  private compareDeviceSignatures(
    stored: DeviceSignature,
    current: DeviceSignature
  ): number {
    let match = 0
    let comparisons = 0

    if (stored.userAgent === current.userAgent) match += 20
    comparisons++

    if (stored.screenResolution === current.screenResolution) match += 20
    comparisons++

    if (stored.timezone === current.timezone) match += 20
    comparisons++

    if (stored.language === current.language) match += 20
    comparisons++

    if (stored.fingerprint === current.fingerprint) match += 20
    comparisons++

    return comparisons > 0 ? (match / comparisons) * 100 : 0
  }

  /**
   * Bewertet Kontext
   */
  private evaluateContext(context: AuthContext): number {
    let score = 50 // Basis-Score

    // Bekannte Zeit = höherer Score
    const hour = new Date().getHours()
    if (hour >= 8 && hour <= 22) {
      score += 20
    }

    // Bekannte Location = höherer Score
    if (context.location) {
      score += 20
    }

    return Math.min(100, score)
  }
}

export const behavioralAuth = new BehavioralAuth()

