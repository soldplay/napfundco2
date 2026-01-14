// Decision Trace - Verfolgt, warum bestimmte Inhalte angezeigt werden

import { useACG } from '@/hooks/useACG'

export interface DecisionTrace {
  elementId: string
  reason: string
  dataSource: string
  timestamp: number
  context: {
    userHistory?: string[]
    preferences?: Record<string, unknown>
    timeOfDay?: string
    device?: string
  }
}

class DecisionTraceManager {
  private traces: Map<string, DecisionTrace[]> = new Map()

  recordTrace(elementId: string, trace: Omit<DecisionTrace, 'elementId' | 'timestamp'>): void {
    if (!this.traces.has(elementId)) {
      this.traces.set(elementId, [])
    }

    const traces = this.traces.get(elementId)!
    traces.push({
      ...trace,
      elementId,
      timestamp: Date.now(),
    })

    // Limit traces per element
    if (traces.length > 10) {
      traces.shift()
    }
  }

  getTraces(elementId: string): DecisionTrace[] {
    return this.traces.get(elementId) || []
  }

  getLastTrace(elementId: string): DecisionTrace | null {
    const traces = this.getTraces(elementId)
    return traces.length > 0 ? traces[traces.length - 1] : null
  }

  clearTraces(elementId?: string): void {
    if (elementId) {
      this.traces.delete(elementId)
    } else {
      this.traces.clear()
    }
  }
}

export const decisionTraceManager = new DecisionTraceManager()

/**
 * Erstellt einen Trace für ein Element basierend auf ACG-Kontext
 */
export function createTraceForElement(
  elementId: string,
  reason: string,
  context?: Partial<DecisionTrace['context']>
): DecisionTrace {
  const trace: DecisionTrace = {
    elementId,
    reason,
    dataSource: 'ACG System',
    timestamp: Date.now(),
    context: {
      ...context,
    },
  }

  decisionTraceManager.recordTrace(elementId, {
    reason,
    dataSource: 'ACG System',
    context: trace.context,
  })

  return trace
}

/**
 * Generiert eine benutzerfreundliche Erklärung basierend auf Trace
 */
export function generateExplanation(trace: DecisionTrace | null): string {
  if (!trace) {
    return 'Keine Informationen verfügbar'
  }

  let explanation = trace.reason

  // Erweitere Erklärung basierend auf Kontext
  if (trace.context.userHistory && trace.context.userHistory.length > 0) {
    const lastItem = trace.context.userHistory[0]
    explanation += ` Basierend auf: ${lastItem}`
  }

  if (trace.context.timeOfDay) {
    explanation += ` (${trace.context.timeOfDay})`
  }

  return explanation
}

