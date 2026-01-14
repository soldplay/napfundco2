import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SubscriptionForm } from '@/components/subscription/SubscriptionForm'
import { getPackageById } from '@/lib/subscription'

interface AboDetailPageProps {
  params: Promise<{ packageId: string }>
}

export async function generateMetadata({
  params,
}: AboDetailPageProps): Promise<Metadata> {
  const { packageId } = await params
  const pkg = getPackageById(packageId)

  if (!pkg) {
    return {
      title: 'Abo nicht gefunden',
    }
  }

  return {
    title: `${pkg.name} - Abo abschließen`,
    description: pkg.description,
  }
}

export default async function AboDetailPage({ params }: AboDetailPageProps) {
  const { packageId } = await params
  const pkg = getPackageById(packageId)

  if (!pkg) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-warmgray-50 py-12 lg:py-16">
      <div className="container-custom">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/abo">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Übersicht
          </Link>
        </Button>

        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <div className="mb-4 text-6xl" role="img" aria-label={pkg.petType}>
              {pkg.icon}
            </div>
            <h1 className="heading-2 text-warmgray-900">{pkg.name}</h1>
            <p className="body-large mt-4 text-warmgray-600">{pkg.description}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="heading-3 mb-6 text-warmgray-900">Was ist enthalten?</h2>
              <ul className="space-y-3">
                {pkg.products.map((product, idx) => (
                  <li key={idx} className="flex items-center gap-3 rounded-lg bg-white p-3">
                    <span className="text-warmgray-600">•</span>
                    <span className="text-warmgray-700">
                      {product.quantity}x Produkt-ID: {product.productId}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl bg-primary-50 p-6">
                <h3 className="font-semibold text-warmgray-900 mb-4">Ihre Vorteile:</h3>
                <ul className="space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-warmgray-700">
                      <span className="text-primary-600">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <SubscriptionForm package={pkg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

