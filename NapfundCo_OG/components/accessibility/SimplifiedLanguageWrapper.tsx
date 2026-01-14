'use client'

import { useEffect, useState } from 'react'
import { accessibilityEngine } from '@/lib/accessibility-engine'
import { simplifyText } from '@/lib/content-simplifier'

interface SimplifiedLanguageWrapperProps {
  children: React.ReactNode
}

/**
 * Wrapper-Komponente, die Text vereinfacht, wenn vereinfachte Sprache aktiv ist
 */
export function SimplifiedLanguageWrapper({ children }: SimplifiedLanguageWrapperProps) {
  const [isSimplified, setIsSimplified] = useState(false)

  useEffect(() => {
    const checkSettings = () => {
      const settings = accessibilityEngine.getSettings()
      setIsSimplified(settings.simplifiedLanguage)
    }

    checkSettings()

    // Prüfe regelmäßig, ob sich die Einstellung geändert hat
    const interval = setInterval(checkSettings, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isSimplified) {
    return <>{children}</>
  }

  // Vereinfache Text-Inhalte
  return <SimplifiedContent>{children}</SimplifiedContent>
}

function SimplifiedContent({ children }: { children: React.ReactNode }) {
  // Rekursiv durch React-Knoten gehen und Text vereinfachen
  return (
    <>
      {typeof children === 'string'
        ? simplifyText(children, 'agb')
        : Array.isArray(children)
          ? children.map((child, idx) => (
              <SimplifiedContent key={idx}>{child}</SimplifiedContent>
            ))
          : children}
    </>
  )
}

