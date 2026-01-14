'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Lock, Eye, Clock, RefreshCw, TrendingUp, ChevronDown, ChevronUp, X } from 'lucide-react'
import {
  trustCalculator,
  type TrustScore,
} from '@/lib/trust-calculator'
import { useDevice } from '@/hooks/useDevice'

export function TrustScoreDisplay() {
  const [trustScore, setTrustScore] = useState<TrustScore>(
    trustCalculator.getDefaultTrustScore()
  )
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const { isMobile, isTablet } = useDevice()

  // Trust Score ist standardmäßig immer sichtbar (nicht automatisch minimiert)
  // Der Benutzer kann ihn manuell minimieren

  useEffect(() => {
    const score = trustCalculator.getDefaultTrustScore()
    setTrustScore(score)
  }, [])

  const badge = trustCalculator.getStatusBadge(trustScore.overall)

  // Komplett ausblenden wenn dismissed
  if (isDismissed) return null

  // Mobile: Floating Button wenn minimiert
  if (isMinimized) {
    return (
      <motion.button
        data-popup="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsMinimized(false)}
        className={`fixed z-[60] rounded-full bg-white border-2 border-primary-200 shadow-lg p-3 ${
          isMobile 
            ? 'top-20 right-4' 
            : 'top-32 right-6'
        }`}
        aria-label="Trust Score anzeigen"
      >
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary-600" aria-hidden="true" />
          <span className={`font-bold text-sm ${
            badge.color === 'green' ? 'text-green-600' : 'text-primary-600'
          }`}>
            {trustScore.overall}%
          </span>
        </div>
      </motion.button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        data-popup="true"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed z-[60] rounded-xl border-2 border-primary-200 bg-white shadow-xl ${
          isMobile
            ? 'top-20 right-2 left-2 max-w-none'
            : isTablet
              ? 'top-28 right-4 w-72'
              : 'top-32 right-6 w-80'
        }`}
      >
        {/* Header - immer sichtbar */}
        <div className={`flex items-center justify-between ${isMobile ? 'p-3' : 'p-4'}`}>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary-600" aria-hidden="true" />
            <h3 className={`font-semibold text-warmgray-900 ${isMobile ? 'text-sm' : ''}`}>
              Trust Score
            </h3>
          </div>
          <div className="flex items-center gap-1">
            {/* Gesamt-Score kompakt */}
            <span className={`font-bold mr-2 ${
              isMobile ? 'text-lg' : 'text-xl'
            } ${
              badge.color === 'green'
                ? 'text-green-600'
                : badge.color === 'blue'
                  ? 'text-blue-600'
                  : badge.color === 'yellow'
                    ? 'text-yellow-600'
                    : 'text-red-600'
            }`}>
              {trustScore.overall}%
            </span>
            
            {/* Expand/Collapse Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded p-1.5 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
              aria-label={isExpanded ? 'Details einklappen' : 'Details ausklappen'}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            
            {/* Minimize Button (Mobile) */}
            <button
              onClick={() => setIsMinimized(true)}
              className="rounded p-1.5 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
              aria-label="Minimieren"
            >
              <TrendingUp className="h-4 w-4 rotate-90" aria-hidden="true" />
            </button>
            
            {/* Close Button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="rounded p-1.5 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
              aria-label="Schließen"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Progress Bar - immer sichtbar */}
        <div className={`${isMobile ? 'px-3 pb-3' : 'px-4 pb-4'}`}>
          <div className="h-2 w-full overflow-hidden rounded-full bg-warmgray-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${trustScore.overall}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full ${
                badge.color === 'green'
                  ? 'bg-green-500'
                  : badge.color === 'blue'
                    ? 'bg-blue-500'
                    : badge.color === 'yellow'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
              }`}
            />
          </div>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-sm">{badge.icon}</span>
            <span className="text-xs font-medium text-warmgray-600">{badge.label}</span>
          </div>
        </div>

        {/* Detailed Metrics - expandable */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`border-t border-warmgray-200 ${isMobile ? 'p-3' : 'p-4'} space-y-2`}
            >
              <MetricItem
                icon={Lock}
                label="Sicherheit"
                value={trustScore.metrics.security}
                description="SSL-Verschlüsselung"
                compact={isMobile}
              />
              <MetricItem
                icon={Eye}
                label="Datenschutz"
                value={trustScore.metrics.privacy}
                description="DSGVO-konform"
                compact={isMobile}
              />
              <MetricItem
                icon={Shield}
                label="Transparenz"
                value={trustScore.metrics.transparency}
                description="Decision Trace"
                compact={isMobile}
              />
              <MetricItem
                icon={Clock}
                label="Support"
                value={trustScore.metrics.responseTime}
                unit="h"
                description="Reaktionszeit"
                compact={isMobile}
              />
              <MetricItem
                icon={RefreshCw}
                label="Updates"
                value={
                  trustScore.metrics.updateStatus === 'up-to-date'
                    ? 100
                    : trustScore.metrics.updateStatus === 'recent'
                      ? 75
                      : 25
                }
                description={trustScore.metrics.updateStatus === 'up-to-date' ? 'Aktuell' : 'Kürzlich'}
                compact={isMobile}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

interface MetricItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  unit?: string
  description: string
  compact?: boolean
}

function MetricItem({ icon: Icon, label, value, unit, description, compact }: MetricItemProps) {
  return (
    <div className={`rounded-lg bg-warmgray-50 ${compact ? 'p-2' : 'p-3'}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Icon className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} text-primary-600`} aria-hidden="true" />
          <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-warmgray-900`}>{label}</span>
        </div>
        <span className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-warmgray-900`}>
          {value}{unit || '%'}
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-warmgray-200">
        <div
          className="h-full bg-primary-500"
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
      <p className={`mt-1 ${compact ? 'text-[10px]' : 'text-xs'} text-warmgray-600`}>{description}</p>
    </div>
  )
}
