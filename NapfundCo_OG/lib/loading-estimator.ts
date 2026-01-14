// Loading Estimator - Schätzt Ladezeiten basierend auf verschiedenen Faktoren

export interface LoadingEstimate {
  estimatedTime: number // in milliseconds
  reason: string
  confidence: 'high' | 'medium' | 'low'
}

interface LoadingMetrics {
  requestStart: number
  responseTime?: number
  serverLoad?: 'low' | 'medium' | 'high'
  networkSpeed?: 'fast' | 'medium' | 'slow'
  previousRequests: number[]
}

class LoadingEstimator {
  private metrics: Map<string, LoadingMetrics> = new Map()
  private readonly maxHistorySize = 20

  recordRequest(requestId: string): void {
    const metrics: LoadingMetrics = {
      requestStart: Date.now(),
      previousRequests: [],
    }
    this.metrics.set(requestId, metrics)
  }

  recordResponse(requestId: string, responseTime: number): void {
    const metrics = this.metrics.get(requestId)
    if (!metrics) return

    metrics.responseTime = responseTime
    metrics.previousRequests.push(responseTime)

    // Limit history
    if (metrics.previousRequests.length > this.maxHistorySize) {
      metrics.previousRequests.shift()
    }

    this.metrics.set(requestId, metrics)
  }

  setServerLoad(requestId: string, load: 'low' | 'medium' | 'high'): void {
    const metrics = this.metrics.get(requestId)
    if (metrics) {
      metrics.serverLoad = load
      this.metrics.set(requestId, metrics)
    }
  }

  setNetworkSpeed(requestId: string, speed: 'fast' | 'medium' | 'slow'): void {
    const metrics = this.metrics.get(requestId)
    if (metrics) {
      metrics.networkSpeed = speed
      this.metrics.set(requestId, metrics)
    }
  }

  estimate(requestId: string): LoadingEstimate | null {
    const metrics = this.metrics.get(requestId)
    if (!metrics) return null

    const elapsed = Date.now() - metrics.requestStart
    let estimatedTime = 2000 // Default: 2 seconds
    let reason = 'Standard-Verarbeitung'
    let confidence: 'high' | 'medium' | 'low' = 'medium'

    // Use previous response times if available
    if (metrics.previousRequests.length > 0) {
      const avgResponseTime =
        metrics.previousRequests.reduce((a, b) => a + b, 0) /
        metrics.previousRequests.length
      estimatedTime = avgResponseTime
      confidence = 'high'
      reason = 'Basierend auf vorherigen Anfragen'
    }

    // Adjust based on server load
    if (metrics.serverLoad === 'high') {
      estimatedTime *= 2
      reason = 'Server langsam wegen hoher Auslastung'
      confidence = 'high'
    } else if (metrics.serverLoad === 'medium') {
      estimatedTime *= 1.5
      reason = 'Server moderat ausgelastet'
      confidence = 'medium'
    }

    // Adjust based on network speed
    if (metrics.networkSpeed === 'slow') {
      estimatedTime *= 1.5
      reason = reason.includes('Server') ? reason : 'Langsame Netzwerkverbindung'
      confidence = 'medium'
    } else if (metrics.networkSpeed === 'fast') {
      estimatedTime *= 0.8
    }

    // If already elapsed, estimate remaining time
    const remaining = Math.max(0, estimatedTime - elapsed)

    return {
      estimatedTime: remaining,
      reason,
      confidence,
    }
  }

  getAverageResponseTime(): number {
    const allTimes: number[] = []
    this.metrics.forEach((metrics) => {
      allTimes.push(...metrics.previousRequests)
    })

    if (allTimes.length === 0) return 2000

    return allTimes.reduce((a, b) => a + b, 0) / allTimes.length
  }

  clearHistory(): void {
    this.metrics.clear()
  }
}

// Singleton instance
export const loadingEstimator = new LoadingEstimator()

// Helper function to detect network speed
export function detectNetworkSpeed(): 'fast' | 'medium' | 'slow' {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'medium'
  }

  const connection = (navigator as any).connection
  if (!connection) return 'medium'

  const effectiveType = connection.effectiveType
  if (effectiveType === '4g' || effectiveType === '5g') return 'fast'
  if (effectiveType === '3g' || effectiveType === '2g') return 'slow'
  return 'medium'
}

