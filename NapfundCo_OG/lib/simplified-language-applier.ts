// Simplified Language Applier - Wendet vereinfachte Sprache auf gesamten Content an

import { simplifyText } from './content-simplifier'

// Speichere Original-Texte für Wiederherstellung
const originalTexts = new WeakMap<Text, string>()

/**
 * Wendet vereinfachte Sprache auf alle Text-Inhalte der Seite an
 */
export function applySimplifiedLanguage(): void {
  if (typeof document === 'undefined') return

  // Finde alle Text-Knoten
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Überspringe Script- und Style-Tags
        const parent = node.parentElement
        if (
          parent &&
          (parent.tagName === 'SCRIPT' ||
            parent.tagName === 'STYLE' ||
            parent.closest('script') ||
            parent.closest('style') ||
            parent.closest('[data-no-simplify]'))
        ) {
          return NodeFilter.FILTER_REJECT
        }
        return NodeFilter.FILTER_ACCEPT
      },
    }
  )

  const textNodes: Text[] = []
  let node: Node | null = walker.nextNode()

  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node as Text
      const textContent = text.textContent || ''
      if (textContent.trim().length > 5) {
        // Speichere Original, wenn noch nicht gespeichert
        if (!originalTexts.has(text)) {
          originalTexts.set(text, textContent)
        }
        textNodes.push(text)
      }
    }
    node = walker.nextNode()
  }

  // Vereinfache jeden Text-Knoten
  textNodes.forEach((textNode) => {
    const originalText = originalTexts.get(textNode) || textNode.textContent || ''
    if (originalText.trim().length > 5) {
      // Bestimme Typ basierend auf Kontext
      let type: 'agb' | 'datenschutz' | 'impressum' | 'versand' = 'agb'
      const parent = textNode.parentElement
      if (parent) {
        const url = window.location.pathname
        if (url.includes('datenschutz')) type = 'datenschutz'
        else if (url.includes('impressum')) type = 'impressum'
        else if (url.includes('versand')) type = 'versand'
        else if (url.includes('agb')) type = 'agb'
      }

      const simplified = simplifyText(originalText, type)
      if (simplified !== originalText) {
        textNode.textContent = simplified
      }
    }
  })
}

/**
 * Entfernt vereinfachte Sprache (stellt Original wieder her)
 */
export function removeSimplifiedLanguage(): void {
  if (typeof document === 'undefined') return

  // Finde alle Text-Knoten, die vereinfacht wurden
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  )

  let node: Node | null = walker.nextNode()
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const textNode = node as Text
      const original = originalTexts.get(textNode)
      if (original) {
        textNode.textContent = original
        originalTexts.delete(textNode)
      }
    }
    node = walker.nextNode()
  }

  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('simplified-language')
  }
}

