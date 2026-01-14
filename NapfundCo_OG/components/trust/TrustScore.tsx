'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Clock, RefreshCw, TrendingUp } from 'lucide-react'
import {
  trustCalculator,
  type TrustScore,
  type TrustMetrics,
} from '@/lib/trust-calculator'

export function TrustScoreDisplay() {
  const [trustScore, setTrustScore] = useState<TrustScore>(
    trustCalculator.getDefaultTrustScore()
  )
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // In Produktion würde man hier echte Metriken vom Server holen
    const score = trustCalculator.getDefaultTrustScore()
    setTrustScore(score)
  }, [])

  const badge = trustCalculator.getStatusBadge(trustScore.overall)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-32 md:top-36 right-4 md:right-6 z-[60] w-[calc(100vw-2rem)] md:w-80 rounded-xl border-2 border-primary-200 bg-white p-4 shadow-xl"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary-600" aria-hidden="true" />
          <h3 className="font-semibold text-warmgray-900">Trust Score</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded p-1 text-warmgray-400 hover:bg-warmgray-100 hover:text-warmgray-600"
          aria-label={isExpanded ? 'Einklappen' : 'Ausklappen'}
        >
          <TrendingUp
            className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Overall Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-warmgray-700">Gesamt-Score</span>
          <span
            className={`text-2xl font-bold ${
              badge.color === 'green'
                ? 'text-green-600'
                : badge.color === 'blue'
                  ? 'text-blue-600'
                  : badge.color === 'yellow'
                    ? 'text-yellow-600'
                    : 'text-red-600'
            }`}
          >
            {trustScore.overall}%
          </span>
        </div>
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
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg">{badge.icon}</span>
          <span className="text-xs font-medium text-warmgray-600">{badge.label}</span>
        </div>
      </div>

      {/* Detailed Metrics */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3 border-t border-warmgray-200 pt-3"
        >
          <MetricItem
            icon={Lock}
            label="Sicherheit"
            value={trustScore.metrics.security}
            description="SSL-Verschlüsselung, sichere Verbindung"
          />
          <MetricItem
            icon={Eye}
            label="Datenschutz"
            value={trustScore.metrics.privacy}
            description="DSGVO-konform, transparente Datennutzung"
          />
          <MetricItem
            icon={Shield}
            label="Transparenz"
            value={trustScore.metrics.transparency}
            description="Decision Trace, Consent Management"
          />
          <MetricItem
            icon={Clock}
            label="Support-Reaktionszeit"
            value={trustScore.metrics.responseTime}
            unit="Stunden"
            description="Durchschnittliche Antwortzeit"
          />
          <MetricItem
            icon={RefreshCw}
            label="Update-Status"
            value={
              trustScore.metrics.updateStatus === 'up-to-date'
                ? 100
                : trustScore.metrics.updateStatus === 'recent'
                  ? 75
                  : 25
            }
            description={`Letztes Update: ${new Date(trustScore.metrics.lastUpdate).toLocaleDateString('de-DE')}`}
            status={trustScore.metrics.updateStatus}
          />
        </motion.div>
      )}
    </motion.div>
  )
}

interface MetricItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  unit?: string
  description: string
  status?: string
}

function MetricItem({ icon: Icon, label, value, unit, description, status }: MetricItemProps) {
  return (
    <div className="rounded-lg bg-warmgray-50 p-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary-600" aria-hidden="true" />
          <span className="text-sm font-medium text-warmgray-900">{label}</span>
        </div>
        <span className="text-sm font-bold text-warmgray-900">
          {value}
          {unit && ` ${unit}`}
          {!unit && '%'}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-warmgray-200">
        <div
          className="h-full bg-primary-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-warmgray-600">{description}</p>
      {status && (
        <p className="mt-1 text-xs font-medium text-primary-600">
          Status: {status === 'up-to-date' ? 'Aktuell' : status === 'recent' ? 'Kürzlich' : 'Veraltet'}
        </p>
      )}
    </div>
  )
}

