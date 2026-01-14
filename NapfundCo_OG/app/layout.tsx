import type { Metadata } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Napf&Co - Premium Tierfutter für Hunde, Katzen & Pferde',
    template: '%s | Napf&Co',
  },
  description:
    'Hochwertiges, natürliches Tierfutter für Hunde, Katzen und Pferde. 100% aus der EU. Frei von künstlichen Zusätzen. Jetzt im TikTok Shop entdecken!',
  keywords: [
    'Tierfutter',
    'Hundefutter',
    'Katzenfutter',
    'Pferdefutter',
    'Premium Tiernahrung',
    'Natürliches Tierfutter',
    '100% aus EU',
  ],
  authors: [{ name: 'Napf&Co OG' }],
  creator: 'Napf&Co OG',
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: 'https://napfundco.at',
    siteName: 'Napf&Co',
    title: 'Napf&Co - Premium Tierfutter',
    description:
      'Hochwertiges, natürliches Tierfutter für Hunde, Katzen und Pferde.',
  },
      robots: {
        index: true,
        follow: true,
      },
      icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
      },
    }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Providers>
          {/* Skip-to-Content für Barrierefreiheit */}
          <a href="#main-content" className="skip-to-content">
            Zum Hauptinhalt springen
          </a>
          
          <Header />
          
          <main id="main-content" className="flex-1 pt-20 lg:pt-28" role="main">
            {children}
          </main>
          
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
