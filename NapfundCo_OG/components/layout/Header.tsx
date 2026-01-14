'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Search,
  Dog,
  Cat,
  ChevronDown,
  Heart,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Hundefutter',
    href: '/produkte/hund',
    icon: Dog,
    submenu: [
      { name: 'Nassfutter', href: '/produkte/hund?typ=nassfutter' },
      { name: 'Trockenfutter', href: '/produkte/hund?typ=trockenfutter' },
      { name: 'Snacks & Leckerlis', href: '/produkte/hund?typ=snacks' },
      { name: 'Welpenfutter', href: '/produkte/hund?typ=welpen' },
    ],
  },
  {
    name: 'Katzenfutter',
    href: '/produkte/katze',
    icon: Cat,
    submenu: [
      { name: 'Nassfutter', href: '/produkte/katze?typ=nassfutter' },
      { name: 'Trockenfutter', href: '/produkte/katze?typ=trockenfutter' },
      { name: 'Snacks & Leckerlis', href: '/produkte/katze?typ=snacks' },
      { name: 'Kittenfutter', href: '/produkte/katze?typ=kitten' },
    ],
  },
  {
    name: 'Pferdefutter',
    href: '/produkte/pferd',
    submenu: [
      { name: 'Müsli', href: '/produkte/pferd?typ=muesli' },
      { name: 'Pellets', href: '/produkte/pferd?typ=pellets' },
      { name: 'Ergänzungsfutter', href: '/produkte/pferd?typ=ergaenzung' },
      { name: 'Leckerlis', href: '/produkte/pferd?typ=leckerlis' },
    ],
  },
  { name: 'Futterberater', href: '/futterberater' },
  { name: 'Ratgeber', href: '/ratgeber' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-warmgray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      {/* Top Bar */}
      <div className="hidden bg-primary-600 text-white sm:block">
        <div className="container-custom flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <a href="tel:+436764844169" className="hover:underline">
                +43 676 4844169
              </a>
            </span>
            <span>|</span>
            <span>Versandkostenfrei ab 49€</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/faq" className="hover:underline">
              Hilfe & FAQ
            </Link>
            <Link href="/kontakt" className="hover:underline">
              Kontakt
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className="container-custom"
        aria-label="Hauptnavigation"
        role="navigation"
      >
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary-600"
            aria-label="Napf&Co - Zur Startseite"
          >
            <span className="font-heading text-2xl lg:text-3xl">
              Napf<span className="text-accent-500">&</span>Co
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.submenu && setActiveSubmenu(item.name)
                }
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-warmgray-700 transition-colors hover:bg-warmgray-50 hover:text-primary-600',
                    activeSubmenu === item.name && 'bg-warmgray-50 text-primary-600'
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4" aria-hidden="true" />}
                  {item.name}
                  {item.submenu && (
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        activeSubmenu === item.name && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  )}
                </Link>

                {/* Desktop Submenu */}
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full z-50 min-w-[200px] rounded-lg border border-warmgray-100 bg-white py-2 shadow-lg"
                    >
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-warmgray-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="ghost" size="icon" aria-label="Suche öffnen">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Merkzettel">
              <Heart className="h-5 w-5" />
            </Button>
            <Button asChild className="bg-accent-500 hover:bg-accent-600">
              <a
                href="https://www.tiktok.com/@napfundco"
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok Shop
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="rounded-lg p-2 text-warmgray-700 hover:bg-warmgray-50 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-warmgray-100 lg:hidden"
            >
              <div className="space-y-1 py-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-warmgray-700 hover:bg-warmgray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon && <item.icon className="h-5 w-5" aria-hidden="true" />}
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-8 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block rounded-lg px-4 py-2 text-sm text-warmgray-600 hover:bg-warmgray-50 hover:text-primary-600"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="border-t border-warmgray-100 pt-4">
                  <Link
                    href="/faq"
                    className="block px-4 py-2 text-sm text-warmgray-600 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Hilfe & FAQ
                  </Link>
                  <Link
                    href="/kontakt"
                    className="block px-4 py-2 text-sm text-warmgray-600 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Kontakt
                  </Link>
                </div>

                <div className="px-4 pt-4">
                  <Button
                    asChild
                    className="w-full bg-accent-500 hover:bg-accent-600"
                  >
                    <a
                      href="https://www.tiktok.com/@napfundco"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Zum TikTok Shop
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

