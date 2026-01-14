'use client'

import { useState } from 'react'
import { HelpCircle, BookOpen, X } from 'lucide-react'
import { Button } from './button'
import { useSimplifiedContent } from '@/hooks/useSimplifiedContent'
import { simplifyContent, type SimplifiedContent } from '@/lib/content-simplifier'

interface ExplainButtonProps {
  content: string
  type: 'agb' | 'datenschutz' | 'impressum' | 'versand'
  className?: string
}

export function ExplainButton({ content, type, className }: ExplainButtonProps) {
  const { isSimplified, toggleSimplified } = useSimplifiedContent(type)
  const [simplifiedData, setSimplifiedData] = useState<SimplifiedContent | null>(null)
  const [showExamples, setShowExamples] = useState(false)

  const handleToggle = () => {
    if (!simplifiedData) {
      // Vereinfache den Content beim ersten Klick
      const simplified = simplifyContent(content, type)
      setSimplifiedData(simplified)
    }
    toggleSimplified()
  }

  const currentContent = isSimplified && simplifiedData
    ? simplifiedData.simplified
    : content

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggle}
          className="flex items-center gap-2"
        >
          {isSimplified ? (
            <>
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Original anzeigen
            </>
          ) : (
            <>
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              Erklär mir das wie einem Freund
            </>
          )}
        </Button>

        {isSimplified && simplifiedData?.examples && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExamples(!showExamples)}
          >
            {showExamples ? 'Beispiele ausblenden' : 'Beispiele anzeigen'}
          </Button>
        )}
      </div>

      {showExamples && simplifiedData?.examples && (
        <div className="mb-6 rounded-lg border-2 border-primary-200 bg-primary-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-warmgray-900">Beispiele:</h3>
            <button
              onClick={() => setShowExamples(false)}
              className="text-warmgray-500 hover:text-warmgray-700"
              aria-label="Beispiele ausblenden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="space-y-2">
            {simplifiedData.examples.map((example, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-warmgray-700">
                <span className="text-primary-600">•</span>
                <span>{example}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        className={`prose prose-sm max-w-none ${
          isSimplified ? 'prose-simple' : ''
        }`}
        dangerouslySetInnerHTML={{ __html: currentContent }}
      />
    </div>
  )
}

