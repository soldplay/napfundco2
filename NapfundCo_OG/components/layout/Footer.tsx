import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
  Truck,
  CreditCard,
  RotateCcw,
} from 'lucide-react'

const footerNavigation = {
  shop: [
    { name: 'Hundefutter', href: '/produkte/hund' },
    { name: 'Katzenfutter', href: '/produkte/katze' },
    { name: 'Pferdefutter', href: '/produkte/pferd' },
    { name: 'Alle Produkte', href: '/produkte' },
    { name: 'Angebote', href: '/angebote' },
  ],
  service: [
    { name: 'Futterberater', href: '/futterberater' },
    { name: 'Ratgeber', href: '/ratgeber' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Kontakt', href: '/kontakt' },
    { name: 'Versand & Zahlung', href: '/versand-zahlung' },
  ],
  rechtliches: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' },
    { name: 'Widerrufsbelehrung', href: '/widerruf' },
  ],
  social: [
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@napfundco',
      icon: () => (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
    },
    { name: 'Instagram', href: 'https://instagram.com/napfundco', icon: Instagram },
    { name: 'Facebook', href: 'https://facebook.com/napfundco', icon: Facebook },
    { name: 'YouTube', href: 'https://youtube.com/@napfundco', icon: Youtube },
  ],
}

const trustBadges = [
  { icon: Truck, text: 'Versandkostenfrei ab 49€' },
  { icon: RotateCcw, text: '14 Tage Widerrufsrecht' },
  { icon: Shield, text: 'Sichere Zahlung' },
  { icon: CreditCard, text: 'Flexible Zahlungsarten' },
]

export function Footer() {
  return (
    <footer className="border-t border-warmgray-200 bg-warmgray-50" role="contentinfo">
      {/* Trust Badges */}
      <div className="border-b border-warmgray-200 bg-white">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {trustBadges.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-3 text-warmgray-700"
              >
                <badge.icon
                  className="h-6 w-6 flex-shrink-0 text-primary-600"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block text-2xl font-bold text-primary-600"
              aria-label="Napf&Co - Zur Startseite"
            >
              <span className="font-heading">
                Napf<span className="text-accent-500">&</span>Co
              </span>
            </Link>
            <p className="mt-4 max-w-md text-warmgray-600">
              Premium Tierfutter für Hunde, Katzen und Pferde. Natürlich,
              hochwertig und 100% aus der EU. Entdecke unser Sortiment im TikTok
              Shop!
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:office@work-force.at"
                className="flex items-center gap-2 text-warmgray-600 hover:text-primary-600"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                <span>office@work-force.at</span>
              </a>
              <a
                href="tel:+436764844169"
                className="flex items-center gap-2 text-warmgray-600 hover:text-primary-600"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span>+43 676 4844169</span>
              </a>
              <div className="flex items-start gap-2 text-warmgray-600">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <address className="not-italic">
                  Napf&Co OG
                  <br />
                  Donau-City-Straße 7, 32. Stock
                  <br />
                  1220 Wien, Österreich
                </address>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-warmgray-100 p-2 text-warmgray-600 transition-colors hover:bg-primary-100 hover:text-primary-600"
                  aria-label={`Besuchen Sie uns auf ${item.name}`}
                >
                  <item.icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-warmgray-900">
              Shop
            </h3>
            <nav aria-label="Shop-Navigation">
              <ul className="mt-4 space-y-3">
                {footerNavigation.shop.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-warmgray-600 hover:text-primary-600"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-warmgray-900">
              Service
            </h3>
            <nav aria-label="Service-Navigation">
              <ul className="mt-4 space-y-3">
                {footerNavigation.service.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-warmgray-600 hover:text-primary-600"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-warmgray-900">
              Rechtliches
            </h3>
            <nav aria-label="Rechtliche Navigation">
              <ul className="mt-4 space-y-3">
                {footerNavigation.rechtliches.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-warmgray-600 hover:text-primary-600"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Payment & Security Logos */}
        <div className="mt-12 border-t border-warmgray-200 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-sm text-warmgray-500">Sichere Zahlung:</span>
            <div className="flex flex-wrap items-center gap-4">
              {/* Payment Icons - Placeholder für echte Logos */}
              <div className="rounded bg-white px-3 py-1.5 text-xs font-medium text-warmgray-700 shadow-sm">
                PayPal
              </div>
              <div className="rounded bg-white px-3 py-1.5 text-xs font-medium text-warmgray-700 shadow-sm">
                Visa
              </div>
              <div className="rounded bg-white px-3 py-1.5 text-xs font-medium text-warmgray-700 shadow-sm">
                Mastercard
              </div>
              <div className="rounded bg-white px-3 py-1.5 text-xs font-medium text-warmgray-700 shadow-sm">
                Klarna
              </div>
              <div className="rounded bg-white px-3 py-1.5 text-xs font-medium text-warmgray-700 shadow-sm">
                Apple Pay
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-warmgray-200 bg-warmgray-100">
        <div className="container-custom py-4">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-warmgray-500 sm:flex-row sm:text-left">
            <p>
              © {new Date().getFullYear()} Napf&Co OG. Alle Rechte vorbehalten.
            </p>
            <p>
              Mit{' '}
              <span className="text-red-500" aria-label="Liebe">
                ♥
              </span>{' '}
              gemacht für Tierliebhaber
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

