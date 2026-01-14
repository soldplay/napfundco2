import subscriptionData from '@/data/subscription-packages.json'

export interface SubscriptionProduct {
  productId: string
  quantity: number
}

export interface SubscriptionPackage {
  id: string
  name: string
  description: string
  petType: string
  icon: string
  products: SubscriptionProduct[]
  basePrice: number
  discountPercent: number
  duration: number
  deliveryFrequency: string
  features: string[]
  recommended: boolean
}

export interface SubscriptionBenefit {
  icon: string
  title: string
  description: string
}

export interface SubscriptionFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  houseNumber: string
  postalCode: string
  city: string
  country: string
  notes: string
  packageId: string
  acceptTerms: boolean
  acceptPrivacy: boolean
}

// Get all subscription packages
export function getAllPackages(): SubscriptionPackage[] {
  return subscriptionData.packages as SubscriptionPackage[]
}

// Get packages by pet type
export function getPackagesByPetType(petType: string): SubscriptionPackage[] {
  return subscriptionData.packages.filter(
    (pkg) => pkg.petType === petType
  ) as SubscriptionPackage[]
}

// Get a single package by ID
export function getPackageById(id: string): SubscriptionPackage | undefined {
  return subscriptionData.packages.find(
    (pkg) => pkg.id === id
  ) as SubscriptionPackage | undefined
}

// Get subscription benefits
export function getSubscriptionBenefits(): SubscriptionBenefit[] {
  return subscriptionData.benefits as SubscriptionBenefit[]
}

// Calculate discounted price
export function calculateDiscountedPrice(basePrice: number, discountPercent: number): number {
  const discount = basePrice * (discountPercent / 100)
  return Math.round((basePrice - discount) * 100) / 100
}

// Calculate savings
export function calculateSavings(basePrice: number, discountPercent: number): number {
  return Math.round(basePrice * (discountPercent / 100) * 100) / 100
}

// Calculate yearly savings
export function calculateYearlySavings(basePrice: number, discountPercent: number): number {
  return Math.round(calculateSavings(basePrice, discountPercent) * 12 * 100) / 100
}

// Format price in German locale
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

// Validate subscription form
export function validateSubscriptionForm(
  data: SubscriptionFormData
): { isValid: boolean; errors: Partial<Record<keyof SubscriptionFormData, string>> } {
  const errors: Partial<Record<keyof SubscriptionFormData, string>> = {}

  if (!data.firstName.trim()) {
    errors.firstName = 'Bitte geben Sie Ihren Vornamen ein.'
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Bitte geben Sie Ihren Nachnamen ein.'
  }

  if (!data.email.trim()) {
    errors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
  }

  if (!data.phone.trim()) {
    errors.phone = 'Bitte geben Sie Ihre Telefonnummer ein.'
  }

  if (!data.street.trim()) {
    errors.street = 'Bitte geben Sie Ihre Straße ein.'
  }

  if (!data.houseNumber.trim()) {
    errors.houseNumber = 'Bitte geben Sie Ihre Hausnummer ein.'
  }

  if (!data.postalCode.trim()) {
    errors.postalCode = 'Bitte geben Sie Ihre Postleitzahl ein.'
  }

  if (!data.city.trim()) {
    errors.city = 'Bitte geben Sie Ihre Stadt ein.'
  }

  if (!data.country.trim()) {
    errors.country = 'Bitte wählen Sie Ihr Land.'
  }

  if (!data.acceptTerms) {
    errors.acceptTerms = 'Bitte akzeptieren Sie die AGB.'
  }

  if (!data.acceptPrivacy) {
    errors.acceptPrivacy = 'Bitte akzeptieren Sie die Datenschutzerklärung.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// Get recommended package for pet type
export function getRecommendedPackage(petType: string): SubscriptionPackage | undefined {
  return subscriptionData.packages.find(
    (pkg) => pkg.petType === petType && pkg.recommended
  ) as SubscriptionPackage | undefined
}

