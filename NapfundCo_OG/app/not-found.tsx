import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="rounded-full bg-primary-100 p-6">
        <span className="text-6xl" aria-hidden="true">
          🐕
        </span>
      </div>
      <h1 className="mt-6 font-heading text-4xl font-bold text-warmgray-900">
        Seite nicht gefunden
      </h1>
      <p className="mt-4 max-w-md text-lg text-warmgray-600">
        Ups! Die gesuchte Seite existiert nicht oder wurde verschoben. Vielleicht
        kann unser Suchhund Ihnen helfen?
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            Zur Startseite
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/produkte">
            <Search className="mr-2 h-4 w-4" aria-hidden="true" />
            Produkte durchsuchen
          </Link>
        </Button>
      </div>
    </div>
  )
}

