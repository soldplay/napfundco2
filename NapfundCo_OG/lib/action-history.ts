// Action History Manager - Verwaltet Aktionen für Undo-Funktionalität

export interface Action {
  id: string
  type: string
  description: string
  timestamp: number
  undo: () => void
  data?: unknown
}

class ActionHistoryManager {
  private actions: Action[] = []
  private maxHistorySize = 50

  addAction(action: Omit<Action, 'timestamp'>): Action {
    const fullAction: Action = {
      ...action,
      timestamp: Date.now(),
    }

    this.actions.push(fullAction)

    // Limit history size
    if (this.actions.length > this.maxHistorySize) {
      this.actions.shift()
    }

    return fullAction
  }

  getLastAction(): Action | null {
    return this.actions.length > 0 ? this.actions[this.actions.length - 1] : null
  }

  undoLastAction(): boolean {
    const lastAction = this.getLastAction()
    if (!lastAction) return false

    try {
      lastAction.undo()
      this.actions.pop()
      return true
    } catch (error) {
      console.error('Error undoing action:', error)
      return false
    }
  }

  clearHistory(): void {
    this.actions = []
  }

  getActionsByType(type: string): Action[] {
    return this.actions.filter((action) => action.type === type)
  }
}

// Singleton instance
export const actionHistory = new ActionHistoryManager()

