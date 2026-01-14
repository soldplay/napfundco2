// Consent Manager - Rechtssichere Einwilligungs-Logik (DSGVO-konform)

export type ConsentPurpose =
  | 'necessary'
  | 'analytics'
  | 'marketing'
  | 'personalization'
  | 'social-media'

export type ConsentDuration = 'session' | '30days' | '90days' | '1year' | 'permanent'

export interface ConsentOption {
  id: ConsentPurpose
  name: string
  description: string
  required: boolean
  duration: ConsentDuration
  dataCategories: string[]
  dataRecipients: string[]
  legalBasis: string
}

export interface ConsentRecord {
  purpose: ConsentPurpose
  granted: boolean
  timestamp: number
  duration: ConsentDuration
  version: string
  ipAddress?: string
  userAgent?: string
}

export interface ConsentState {
  consents: Record<ConsentPurpose, ConsentRecord>
  lastUpdated: number
  version: string
}

const CONSENT_STORAGE_KEY = 'napfco_consents'
const CONSENT_VERSION = '1.0'

const CONSENT_OPTIONS: ConsentOption[] = [
  {
    id: 'necessary',
    name: 'Technisch notwendige Cookies',
    description:
      'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
    required: true,
    duration: 'session',
    dataCategories: ['IP-Adresse', 'Browser-Informationen'],
    dataRecipients: ['Napf&Co OG'],
    legalBasis: 'Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)',
  },
  {
    id: 'analytics',
    name: 'Analyse & Statistiken',
    description:
      'Helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, um die Benutzererfahrung zu verbessern.',
    required: false,
    duration: '90days',
    dataCategories: ['Nutzungsdaten', 'Geräteinformationen'],
    dataRecipients: ['Napf&Co OG', 'Analytics-Dienstleister'],
    legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)',
  },
  {
    id: 'marketing',
    name: 'Marketing & Werbung',
    description:
      'Ermöglichen personalisierte Werbung und Marketing-Kommunikation basierend auf Ihren Interessen.',
    required: false,
    duration: '1year',
    dataCategories: ['Interessen', 'Kaufverhalten', 'E-Mail-Adresse'],
    dataRecipients: ['Napf&Co OG', 'Marketing-Dienstleister'],
    legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)',
  },
  {
    id: 'personalization',
    name: 'Personalisierung',
    description:
      'Speichern Ihre Präferenzen und Einstellungen, um Ihnen eine personalisierte Erfahrung zu bieten.',
    required: false,
    duration: '90days',
    dataCategories: ['Präferenzen', 'Einstellungen', 'Besuchsverlauf'],
    dataRecipients: ['Napf&Co OG'],
    legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)',
  },
  {
    id: 'social-media',
    name: 'Social Media Integration',
    description:
      'Ermöglichen die Integration von Social-Media-Inhalten und das Teilen auf sozialen Netzwerken.',
    required: false,
    duration: '90days',
    dataCategories: ['Interaktionsdaten', 'Social-Media-Profile'],
    dataRecipients: ['Napf&Co OG', 'Social-Media-Plattformen'],
    legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)',
  },
]

class ConsentManager {
  private state: ConsentState | null = null

  constructor() {
    this.loadState()
  }

  private loadState(): void {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
      if (stored) {
        this.state = JSON.parse(stored)
      }
    } catch {
      this.state = null
    }
  }

  private saveState(): void {
    try {
      if (this.state) {
        localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(this.state))
      }
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Prüft, ob Einwilligungen vorhanden sind
   */
  hasConsents(): boolean {
    return this.state !== null && Object.keys(this.state.consents).length > 0
  }

  /**
   * Prüft, ob eine spezifische Einwilligung erteilt wurde
   */
  hasConsent(purpose: ConsentPurpose): boolean {
    if (!this.state) return false
    const consent = this.state.consents[purpose]
    if (!consent) return false

    // Prüfe, ob Consent noch gültig ist
    return this.isConsentValid(consent)
  }

  /**
   * Prüft, ob eine Einwilligung noch gültig ist
   */
  private isConsentValid(consent: ConsentRecord): boolean {
    if (!consent.granted) return false

    const now = Date.now()
    const durationMs = this.getDurationMs(consent.duration)
    const expiresAt = consent.timestamp + durationMs

    return now < expiresAt
  }

  /**
   * Konvertiert Duration zu Millisekunden
   */
  private getDurationMs(duration: ConsentDuration): number {
    const durations: Record<ConsentDuration, number> = {
      session: 0, // Session endet beim Schließen des Browsers
      '30days': 30 * 24 * 60 * 60 * 1000,
      '90days': 90 * 24 * 60 * 60 * 1000,
      '1year': 365 * 24 * 60 * 60 * 1000,
      permanent: Number.MAX_SAFE_INTEGER,
    }

    return durations[duration]
  }

  /**
   * Erteilt eine Einwilligung
   */
  grantConsent(
    purpose: ConsentPurpose,
    duration: ConsentDuration,
    ipAddress?: string,
    userAgent?: string
  ): void {
    if (!this.state) {
      this.state = {
        consents: {} as Record<ConsentPurpose, ConsentRecord>,
        lastUpdated: Date.now(),
        version: CONSENT_VERSION,
      }
    }

    this.state.consents[purpose] = {
      purpose,
      granted: true,
      timestamp: Date.now(),
      duration,
      version: CONSENT_VERSION,
      ipAddress,
      userAgent,
    }

    this.state.lastUpdated = Date.now()
    this.saveState()
  }

  /**
   * Widerruft eine Einwilligung
   */
  revokeConsent(purpose: ConsentPurpose): void {
    if (!this.state) return

    if (this.state.consents[purpose]) {
      this.state.consents[purpose].granted = false
      this.state.lastUpdated = Date.now()
      this.saveState()
    }
  }

  /**
   * Erteilt alle Einwilligungen
   */
  grantAllConsents(ipAddress?: string, userAgent?: string): void {
    CONSENT_OPTIONS.forEach((option) => {
      if (!option.required) {
        this.grantConsent(option.id, option.duration, ipAddress, userAgent)
      }
    })
  }

  /**
   * Widerruft alle Einwilligungen (außer notwendigen)
   */
  revokeAllConsents(): void {
    CONSENT_OPTIONS.forEach((option) => {
      if (!option.required) {
        this.revokeConsent(option.id)
      }
    })
  }

  /**
   * Gibt alle Consent-Optionen zurück
   */
  getConsentOptions(): ConsentOption[] {
    return CONSENT_OPTIONS
  }

  /**
   * Gibt aktuellen Consent-Status zurück
   */
  getConsentState(): ConsentState | null {
    return this.state
  }

  /**
   * Exportiert Consent-Daten für Audit-Zwecke
   */
  exportConsents(): string {
    return JSON.stringify(this.state, null, 2)
  }
}

export const consentManager = new ConsentManager()

