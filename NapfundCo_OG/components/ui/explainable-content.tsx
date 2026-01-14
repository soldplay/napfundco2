'use client'

import { ReactNode, useMemo } from 'react'
import { ExplainButton } from './explain-button'
import { simplifyContent } from '@/lib/content-simplifier'

interface ExplainableContentProps {
  children: ReactNode
  type: 'agb' | 'datenschutz' | 'impressum' | 'versand'
  className?: string
}

// Konvertiert React-Knoten zu String (vereinfacht)
function nodeToString(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeToString).join(' ')
  if (node && typeof node === 'object' && 'props' in node) {
    if (node.props.children) {
      return nodeToString(node.props.children)
    }
  }
  return ''
}

export function ExplainableContent({
  children,
  type,
  className,
}: ExplainableContentProps) {
  const contentString = useMemo(() => {
    // Konvertiere React-Knoten zu String
    const text = nodeToString(children)
    return text
  }, [children])

  const simplified = useMemo(() => {
    if (!contentString) return null
    return simplifyContent(contentString, type)
  }, [contentString, type])

  return (
    <div className={className}>
      <ExplainButton content={contentString} type={type} />
      <div className="mt-4">{children}</div>
    </div>
  )
}

