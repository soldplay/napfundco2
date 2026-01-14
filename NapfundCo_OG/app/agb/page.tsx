import { Metadata } from 'next'
import { AGBContentWithExplain } from '@/components/legal/AGBContentWithExplain'

export const metadata: Metadata = {
  title: 'AGB',
  description: 'Allgemeine Geschäftsbedingungen der Napf&Co OG',
}

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-white py-12 lg:py-16">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-2 text-warmgray-900">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="mt-2 text-warmgray-600">Stand: Januar 2024</p>

          <AGBContentWithExplain />
        </div>
      </div>
    </div>
  )
}

