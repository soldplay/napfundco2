// Trust Calculator - Berechnet Trust Score basierend auf verschiedenen Faktoren

export interface TrustMetrics {
  security: number // 0-100
  privacy: number // 0-100
  transparency: number // 0-100
  responseTime: number // in Stunden (durchschnittliche Support-Reaktionszeit)
  updateStatus: 'up-to-date' | 'recent' | 'outdated'
  lastUpdate: string
}

export interface TrustScore {
  overall: number // 0-100
  metrics: TrustMetrics
  lastCalculated: number
}

class TrustCalculator {
  /**
   * Berechnet Trust Score basierend auf Metriken
   */
  calculateTrustScore(metrics: TrustMetrics): TrustScore {
    // Gewichtete Berechnung
    const weights = {
      security: 0.3,
      privacy: 0.3,
      transparency: 0.2,
      responseTime: 0.1,
      updateStatus: 0.1,
    }

    // Response Time Score (je schneller, desto besser)
    const responseTimeScore = Math.max(
      0,
      100 - (metrics.responseTime / 24) * 10 // Max 10 Tage = 0 Punkte
    )

    // Update Status Score
    const updateStatusScore = {
      'up-to-date': 100,
      recent: 75,
      outdated: 25,
    }[metrics.updateStatus]

    // Gesamt-Score
    const overall =
      metrics.security * weights.security +
      metrics.privacy * weights.privacy +
      metrics.transparency * weights.transparency +
      responseTimeScore * weights.responseTime +
      updateStatusScore * weights.updateStatus

    return {
      overall: Math.round(overall),
      metrics,
      lastCalculated: Date.now(),
    }
  }

  /**
   * Gibt Standard-Metriken zurück (für Demo)
   */
  getDefaultMetrics(): TrustMetrics {
    return {
      security: 95, // SSL, sichere Verbindung
      privacy: 90, // DSGVO-konform, transparente Datennutzung
      transparency: 85, // Decision Trace, Consent Management
      responseTime: 2, // Durchschnittlich 2 Stunden
      updateStatus: 'up-to-date',
      lastUpdate: new Date().toISOString(),
    }
  }

  /**
   * Gibt Trust Score mit Standard-Metriken zurück
   */
  getDefaultTrustScore(): TrustScore {
    return this.calculateTrustScore(this.getDefaultMetrics())
  }

  /**
   * Gibt Status-Badge basierend auf Score zurück
   */
  getStatusBadge(score: number): {
    label: string
    color: string
    icon: string
  } {
    if (score >= 90) {
      return {
        label: 'Exzellent',
        color: 'green',
        icon: '🛡️',
      }
    } else if (score >= 75) {
      return {
        label: 'Sehr gut',
        color: 'blue',
        icon: '✅',
      }
    } else if (score >= 60) {
      return {
        label: 'Gut',
        color: 'yellow',
        icon: '⚠️',
      }
    } else {
      return {
        label: 'Verbesserung nötig',
        color: 'red',
        icon: '🔴',
      }
    }
  }
}

export const trustCalculator = new TrustCalculator()

