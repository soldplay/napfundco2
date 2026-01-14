import { Metadata } from 'next'
import Link from 'next/link'
import { SubscriptionOverview } from '@/components/subscription/SubscriptionOverview'

export const metadata: Metadata = {
  title: 'Abo-System - Monatliche Lieferung mit 2% Rabatt',
  description:
    'Sparen Sie 2% bei monatlicher Lieferung. Flexible Pakete für Hunde, Katzen und Pferde. Jederzeit pausierbar und kündbar.',
}

export default function AboPage() {
  return (
    <div className="min-h-screen bg-warmgray-50 py-12 lg:py-16">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="heading-2 text-warmgray-900">
            Monatliches Abo mit 2% Rabatt
          </h1>
          <p className="body-large mt-4 text-warmgray-600">
            Lassen Sie sich jeden Monat automatisch das Futter für Ihr Tier
            liefern und sparen Sie dabei 2% auf alle Produkte. Flexibel
            pausierbar, jederzeit kündbar.
          </p>
        </div>

        <SubscriptionOverview />

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="heading-3 text-warmgray-900">
              Häufige Fragen zum Abo
            </h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-warmgray-900">
                  Wie funktioniert das Abo?
                </h3>
                <p className="mt-2 text-warmgray-600">
                  Sie wählen ein Paket aus, geben Ihre Lieferadresse an und
                  erhalten jeden Monat automatisch Ihre Bestellung. Sie sparen
                  2% auf alle Produkte und haben kostenlosen Versand.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-warmgray-900">
                  Kann ich das Abo pausieren?
                </h3>
                <p className="mt-2 text-warmgray-600">
                  Ja, Sie können Ihr Abo jederzeit pausieren oder die
                  Lieferfrequenz anpassen. Einfach per E-Mail an{' '}
                  <a
                    href="mailto:office@work-force.at"
                    className="text-primary-600 hover:underline"
                  >
                    office@work-force.at
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-warmgray-900">
                  Gibt es eine Mindestlaufzeit?
                </h3>
                <p className="mt-2 text-warmgray-600">
                  Nein, es gibt keine Mindestlaufzeit. Sie können das Abo
                  jederzeit ohne Angabe von Gründen kündigen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-warmgray-900">
                  Kann ich die Produkte im Abo ändern?
                </h3>
                <p className="mt-2 text-warmgray-600">
                  Ja, Sie können jederzeit die Produkte oder Mengen in Ihrem
                  Abo anpassen. Kontaktieren Sie uns einfach per E-Mail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

