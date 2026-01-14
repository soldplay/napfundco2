'use client'

import { useState, useEffect, useCallback } from 'react'

export interface ExitSurveyResponse {
  reason: string
  feedback?: string
  timestamp: number
}

const EXIT_SURVEY_STORAGE_KEY = 'napfco_exit_surveys'

export function useExitIntent() {
  const [showSurvey, setShowSurvey] = useState(false)
  const [hasShownSurvey, setHasShownSurvey] = useState(false)

  useEffect(() => {
    // Prüfe, ob bereits eine Umfrage in dieser Session gezeigt wurde
    const sessionKey = `exit_survey_shown_${Date.now()}`
    const shown = sessionStorage.getItem('exit_survey_shown')
    if (shown) {
      setHasShownSurvey(true)
      return
    }

    // Erkenne Exit-Intent (Maus verlässt oberen Bereich des Fensters)
    const handleMouseLeave = (e: MouseEvent) => {
      // Nur wenn Maus nach oben geht (verlässt Fenster)
      if (e.clientY <= 0 && !hasShownSurvey) {
        setShowSurvey(true)
        sessionStorage.setItem('exit_survey_shown', 'true')
        setHasShownSurvey(true)
      }
    }

    // Erkenne auch, wenn Tab gewechselt wird
    const handleVisibilityChange = () => {
      if (document.hidden && !hasShownSurvey) {
        setShowSurvey(true)
        sessionStorage.setItem('exit_survey_shown', 'true')
        setHasShownSurvey(true)
      }
    }

    // Erkenne Browser-Navigation (z.B. Zurück-Button)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasShownSurvey) {
        // Zeige Survey nur, wenn User wirklich geht
        // (nicht bei normaler Navigation)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasShownSurvey])

  const submitSurvey = useCallback((response: ExitSurveyResponse) => {
    try {
      const stored = localStorage.getItem(EXIT_SURVEY_STORAGE_KEY)
      const surveys: ExitSurveyResponse[] = stored ? JSON.parse(stored) : []
      surveys.push(response)
      localStorage.setItem(EXIT_SURVEY_STORAGE_KEY, JSON.stringify(surveys))
    } catch {
      // Ignore storage errors
    }

    setShowSurvey(false)
  }, [])

  const dismissSurvey = useCallback(() => {
    setShowSurvey(false)
  }, [])

  return {
    showSurvey,
    submitSurvey,
    dismissSurvey,
  }
}

