// Data Reset - Löscht alle gespeicherten Daten und setzt Personalisierung zurück

const STORAGE_KEYS = [
  'napfco_acg_visitor',
  'napfco_acg_session',
  'napfco_personal_history',
  'napfco_purchases',
  'napfco_reviews',
  'napfco_simplified_content_preference',
  'napfco_subscription_data',
]

/**
 * Löscht alle gespeicherten Daten
 */
export function resetAllData(): {
  success: boolean
  deletedKeys: string[]
  errors: string[]
} {
  const deletedKeys: string[] = []
  const errors: string[] = []

  // Lösche alle bekannten Storage-Keys
  STORAGE_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(key)
      deletedKeys.push(key)
    } catch (error) {
      errors.push(`Fehler beim Löschen von ${key}: ${error}`)
    }
  })

  // Lösche alle Cookies
  try {
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
    })
    deletedKeys.push('cookies')
  } catch (error) {
    errors.push(`Fehler beim Löschen von Cookies: ${error}`)
  }

  // Lösche Session Storage
  try {
    sessionStorage.clear()
    deletedKeys.push('sessionStorage')
  } catch (error) {
    errors.push(`Fehler beim Löschen von Session Storage: ${error}`)
  }

  return {
    success: errors.length === 0,
    deletedKeys,
    errors,
  }
}

/**
 * Setzt nur Personalisierungsdaten zurück (behält Einkäufe, etc.)
 */
export function resetPersonalizationOnly(): {
  success: boolean
  deletedKeys: string[]
  errors: string[]
} {
  const deletedKeys: string[] = []
  const errors: string[] = []

  const personalizationKeys = [
    'napfco_acg_visitor',
    'napfco_acg_session',
    'napfco_personal_history',
    'napfco_simplified_content_preference',
  ]

  personalizationKeys.forEach((key) => {
    try {
      localStorage.removeItem(key)
      deletedKeys.push(key)
    } catch (error) {
      errors.push(`Fehler beim Löschen von ${key}: ${error}`)
    }
  })

  return {
    success: errors.length === 0,
    deletedKeys,
    errors,
  }
}

/**
 * Setzt nur Verlauf zurück
 */
export function resetHistoryOnly(): {
  success: boolean
  deletedKeys: string[]
  errors: string[]
} {
  const deletedKeys: string[] = []
  const errors: string[] = []

  const historyKeys = [
    'napfco_personal_history',
    'napfco_acg_visitor',
  ]

  historyKeys.forEach((key) => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const data = JSON.parse(stored)
        // Behalte nur Einstellungen, lösche Verlauf
        if (key === 'napfco_acg_visitor') {
          const cleaned = {
            visitCount: 0,
            lastVisit: null,
            lastViewedProducts: [],
            lastViewedCategory: null,
            preferences: data.preferences || {},
          }
          localStorage.setItem(key, JSON.stringify(cleaned))
        } else {
          localStorage.removeItem(key)
        }
        deletedKeys.push(key)
      }
    } catch (error) {
      errors.push(`Fehler beim Zurücksetzen von ${key}: ${error}`)
    }
  })

  return {
    success: errors.length === 0,
    deletedKeys,
    errors,
  }
}

