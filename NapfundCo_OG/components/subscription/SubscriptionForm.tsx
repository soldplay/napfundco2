'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PriceCalculator } from './PriceCalculator'
import { CostIndicator } from '@/components/ui/cost-indicator'
import type { SubscriptionPackage, SubscriptionFormData } from '@/lib/subscription'
import { validateSubscriptionForm, calculateDiscountedPrice } from '@/lib/subscription'

interface SubscriptionFormProps {
  package: SubscriptionPackage
}

export function SubscriptionForm({ package: pkg }: SubscriptionFormProps) {
  const [formData, setFormData] = useState<SubscriptionFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    country: 'AT',
    notes: '',
    packageId: pkg.id,
    acceptTerms: false,
    acceptPrivacy: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof SubscriptionFormData, string>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof SubscriptionFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateSubscriptionForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setStatus('loading')

    // Simulierte API-Anfrage
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setStatus('success')
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-green-50 p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="heading-3 text-green-900">Abo erfolgreich abgeschlossen!</h3>
        <p className="mt-4 text-green-700">
          Vielen Dank für Ihr Abo. Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen
          Details. Ihre erste Lieferung wird im nächsten Monat versendet.
        </p>
      </motion.div>
    )
  }

  const basePrice = calculateDiscountedPrice(pkg.basePrice, pkg.discountPercent)

  return (
    <>
      <CostIndicator baseCost={basePrice} frequency="monthly" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <PriceCalculator package={pkg} />

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="heading-4 mb-6 text-warmgray-900">Ihre Kontaktdaten</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-warmgray-700">
              Vorname <span className="text-red-500">*</span>
            </label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-warmgray-700">
              Nachname <span className="text-red-500">*</span>
            </label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-warmgray-700">
              E-Mail <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-warmgray-700">
              Telefon <span className="text-red-500">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="heading-4 mb-6 text-warmgray-900">Lieferadresse</h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor="street" className="mb-2 block text-sm font-medium text-warmgray-700">
              Straße <span className="text-red-500">*</span>
            </label>
            <Input
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              error={errors.street}
              required
            />
          </div>

          <div>
            <label
              htmlFor="houseNumber"
              className="mb-2 block text-sm font-medium text-warmgray-700"
            >
              Hausnummer <span className="text-red-500">*</span>
            </label>
            <Input
              id="houseNumber"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              error={errors.houseNumber}
              required
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="postalCode"
              className="mb-2 block text-sm font-medium text-warmgray-700"
            >
              PLZ <span className="text-red-500">*</span>
            </label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              error={errors.postalCode}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="city" className="mb-2 block text-sm font-medium text-warmgray-700">
              Stadt <span className="text-red-500">*</span>
            </label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="country" className="mb-2 block text-sm font-medium text-warmgray-700">
            Land <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`flex h-11 w-full rounded-lg border bg-white px-4 py-2 text-base transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
              errors.country ? 'border-red-500' : 'border-warmgray-300'
            }`}
            required
          >
            <option value="AT">Österreich</option>
            <option value="DE">Deutschland</option>
            <option value="CH">Schweiz</option>
          </select>
          {errors.country && (
            <p className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.country}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="notes" className="mb-2 block text-sm font-medium text-warmgray-700">
            Zusatzinformationen (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            placeholder="z.B. Klingel, Stockwerk, etc."
            className="flex w-full rounded-lg border border-warmgray-300 bg-white px-4 py-3 text-base transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-warmgray-50 p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-warmgray-300 text-primary-600 focus:ring-primary-500"
              required
            />
            <label htmlFor="acceptTerms" className="text-sm text-warmgray-700">
              Ich habe die{' '}
              <a href="/agb" className="text-primary-600 underline hover:text-primary-700">
                AGB
              </a>{' '}
              gelesen und akzeptiere sie. <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="ml-7 text-sm text-red-600" role="alert">
              {errors.acceptTerms}
            </p>
          )}

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="acceptPrivacy"
              name="acceptPrivacy"
              checked={formData.acceptPrivacy}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-warmgray-300 text-primary-600 focus:ring-primary-500"
              required
            />
            <label htmlFor="acceptPrivacy" className="text-sm text-warmgray-700">
              Ich habe die{' '}
              <a
                href="/datenschutz"
                className="text-primary-600 underline hover:text-primary-700"
              >
                Datenschutzerklärung
              </a>{' '}
              gelesen und akzeptiere sie. <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.acceptPrivacy && (
            <p className="ml-7 text-sm text-red-600" role="alert">
              {errors.acceptPrivacy}
            </p>
          )}
        </div>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
          <p>Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.</p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full bg-accent-500 hover:bg-accent-600"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Wird verarbeitet...
          </>
        ) : (
          'Abo jetzt abschließen'
        )}
      </Button>
    </form>
    </>
  )
}

