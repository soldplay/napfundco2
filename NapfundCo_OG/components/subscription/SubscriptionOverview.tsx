'use client'

import { useState } from 'react'
import { Dog, Cat, Zap } from 'lucide-react'
import { SubscriptionCard } from './SubscriptionCard'
import { SubscriptionBenefits } from './SubscriptionBenefits'
import {
  getAllPackages,
  getPackagesByPetType,
  type SubscriptionPackage,
} from '@/lib/subscription'

const petTypes = [
  { id: 'all', name: 'Alle', icon: null },
  { id: 'hund', name: 'Hund', icon: Dog },
  { id: 'katze', name: 'Katze', icon: Cat },
  { id: 'pferd', name: 'Pferd', icon: Zap },
]

export function SubscriptionOverview() {
  const [selectedPetType, setSelectedPetType] = useState<string>('all')

  const packages = selectedPetType === 'all'
    ? getAllPackages()
    : getPackagesByPetType(selectedPetType)

  return (
    <div className="mt-12">
      {/* Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {petTypes.map((type) => {
          const Icon = type.icon
          return (
            <button
              key={type.id}
              onClick={() => setSelectedPetType(type.id)}
              className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors ${
                selectedPetType === type.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-warmgray-200 bg-white text-warmgray-700 hover:border-primary-300'
              }`}
            >
              {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
              {type.name}
            </button>
          )
        })}
      </div>

      {/* Packages Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, index) => (
          <SubscriptionCard key={pkg.id} package={pkg} index={index} />
        ))}
      </div>

      {/* Benefits */}
      <div className="mt-16">
        <SubscriptionBenefits />
      </div>
    </div>
  )
}

