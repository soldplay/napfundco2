'use client'

import { ACGProvider } from './ACGProvider'
import { UndoProvider } from '@/components/ui/undo-toast'
import { StressMode, CalmModeToggle } from '@/components/ui/stress-mode'
import { SmartAssistant } from '@/components/assistant/SmartAssistant'
import { ExitSurvey } from '@/components/ui/exit-survey'
import { TimeSaver } from '@/components/ui/time-saver'
import { OfflineIndicator } from '@/components/ui/offline-indicator'
import { AdvancedConsent } from '@/components/consent/AdvancedConsent'
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls'
import { TrustScoreDisplay } from '@/components/trust/TrustScore'
import { SessionMonitorComponent } from '@/components/security/SessionMonitor'

interface ProvidersProps {
  children: React.ReactNode
}

/**
 * Client-side providers wrapper
 * Wraps all context providers for the application
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ACGProvider>
      <UndoProvider>
        <StressMode />
        <CalmModeToggle />
        <SmartAssistant />
        <ExitSurvey />
        <TimeSaver />
        <OfflineIndicator />
        <AdvancedConsent />
        <AccessibilityControls />
        <TrustScoreDisplay />
        <SessionMonitorComponent />
        {children}
      </UndoProvider>
    </ACGProvider>
  )
}

