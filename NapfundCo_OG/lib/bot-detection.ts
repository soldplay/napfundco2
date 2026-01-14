// Bot Detection - Erkennt Bot-Verhalten und reagiert darauf

import { sessionMonitor, type SessionAnalysis } from './session-monitor'

export interface BotDetectionResult {
  isBot: boolean
  confidence: number // 0-100
  analysis: SessionAnalysis
  action: 'none' | 'monitor' | 'captcha' | 'restrict' | 'block'
}

class BotDetector {
  /**
   * Führt Bot-Erkennung durch
   */
  detect(): BotDetectionResult {
    const analysis = sessionMonitor.analyzeSession()

    let isBot = false
    let confidence = 0
    let action: BotDetectionResult['action'] = 'none'

    if (analysis.isSuspicious) {
      // Berechne Confidence basierend auf Risk Level
      confidence = analysis.riskLevel === 'high' ? 85 : analysis.riskLevel === 'medium' ? 60 : 30

      // Bestimme Aktion basierend auf Risk Level
      if (analysis.riskLevel === 'high') {
        isBot = true
        action = 'captcha'
      } else if (analysis.riskLevel === 'medium') {
        action = 'monitor'
      } else {
        action = 'monitor'
      }

      // Wenn mehrere verdächtige Muster, erhöhe Confidence
      if (analysis.reasons.length >= 3) {
        confidence = Math.min(100, confidence + 20)
        if (confidence > 70) {
          action = 'restrict'
        }
      }
    }

    return {
      isBot,
      confidence,
      analysis,
      action,
    }
  }

  /**
   * Reagiert auf Bot-Erkennung
   */
  handleBotDetection(result: BotDetectionResult): void {
    switch (result.action) {
      case 'captcha':
        this.showCaptcha()
        break
      case 'restrict':
        this.restrictFunctionality()
        break
      case 'monitor':
        // Nur überwachen, keine Aktion
        break
      case 'block':
        this.blockSession()
        break
      default:
        // Keine Aktion
        break
    }
  }

  /**
   * Zeigt Captcha an
   */
  private showCaptcha(): void {
    // In Produktion würde man hier ein echtes Captcha anzeigen
    console.warn('Bot-Verhalten erkannt - Captcha sollte angezeigt werden')
  }

  /**
   * Schränkt Funktionalität ein
   */
  private restrictFunctionality(): void {
    // Schränke bestimmte Funktionen ein
    if (typeof document !== 'undefined') {
      document.body.classList.add('restricted-mode')
    }
  }

  /**
   * Blockiert Session
   */
  private blockSession(): void {
    // Blockiere Session komplett
    if (typeof window !== 'undefined') {
      window.location.href = '/blocked'
    }
  }
}

export const botDetector = new BotDetector()

