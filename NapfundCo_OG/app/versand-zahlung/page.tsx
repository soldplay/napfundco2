import { Metadata } from 'next'
import { Truck, CreditCard, Clock, Shield, RotateCcw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Versand & Zahlung',
  description:
    'Informationen zu Versandkosten, Lieferzeiten und Zahlungsarten bei Napf&Co',
}

export default function VersandZahlungPage() {
  return (
    <div className="min-h-screen bg-white py-12 lg:py-16">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-2 text-warmgray-900">Versand & Zahlung</h1>
          <p className="mt-2 text-warmgray-600">
            Alles Wichtige zu Lieferung und Bezahlung
          </p>

          <div className="mt-12 space-y-12">
            {/* Versandkosten */}
            <section>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <Truck className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <h2 className="heading-3 text-warmgray-900">Versandkosten</h2>
              </div>
              <div className="mt-6 overflow-hidden rounded-xl border border-warmgray-200">
                <table className="w-full">
                  <thead className="bg-warmgray-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-medium text-warmgray-900">
                        Bestellwert
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-warmgray-900">
                        Versandkosten
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warmgray-100 text-warmgray-700">
                    <tr>
                      <td className="px-6 py-4">Bis 48,99 €</td>
                      <td className="px-6 py-4">4,95 €</td>
                    </tr>
                    <tr className="bg-primary-50">
                      <td className="px-6 py-4 font-medium text-primary-900">
                        Ab 49,00 €
                      </td>
                      <td className="px-6 py-4 font-medium text-primary-600">
                        Kostenlos
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-warmgray-600">
                Die Lieferung erfolgt ausschließlich innerhalb Deutschlands.
              </p>
            </section>

            {/* Lieferzeit */}
            <section>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <Clock className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <h2 className="heading-3 text-warmgray-900">Lieferzeit</h2>
              </div>
              <div className="mt-6 space-y-4 text-warmgray-700">
                <p>
                  Die Lieferzeit beträgt in der Regel <strong>2-4 Werktage</strong>{' '}
                  nach Zahlungseingang.
                </p>
                <p>
                  <strong>Express-Versand:</strong> Bei Bestellungen vor 14:00
                  Uhr (Mo-Fr) versenden wir noch am selben Tag.
                </p>
                <p>
                  Sie erhalten nach dem Versand eine E-Mail mit der
                  Sendungsnummer, mit der Sie Ihr Paket jederzeit bei DHL
                  verfolgen können.
                </p>
              </div>
            </section>

            {/* Zahlungsarten */}
            <section>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <CreditCard
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="heading-3 text-warmgray-900">Zahlungsarten</h2>
              </div>
              <div className="mt-6">
                <p className="text-warmgray-700">
                  Im TikTok Shop stehen Ihnen folgende Zahlungsarten zur
                  Verfügung:
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[
                    { name: 'PayPal', description: 'Sicher und schnell bezahlen' },
                    {
                      name: 'Kreditkarte',
                      description: 'Visa, Mastercard, American Express',
                    },
                    {
                      name: 'Klarna',
                      description: 'Rechnung, Ratenkauf oder Sofort',
                    },
                    { name: 'Apple Pay', description: 'Schnell mit Face ID/Touch ID' },
                  ].map((method) => (
                    <div
                      key={method.name}
                      className="rounded-lg border border-warmgray-200 p-4"
                    >
                      <p className="font-semibold text-warmgray-900">
                        {method.name}
                      </p>
                      <p className="mt-1 text-sm text-warmgray-600">
                        {method.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Sicherheit */}
            <section>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <Shield
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="heading-3 text-warmgray-900">Sicherheit</h2>
              </div>
              <div className="mt-6 space-y-4 text-warmgray-700">
                <p>
                  Ihre Zahlung wird sicher über TikTok Shop abgewickelt. Alle
                  Daten werden SSL-verschlüsselt übertragen.
                </p>
                <p>
                  TikTok bietet zudem einen Käuferschutz, der Sie bei Problemen
                  mit Ihrer Bestellung absichert.
                </p>
              </div>
            </section>

            {/* Rückgabe */}
            <section>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <RotateCcw
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="heading-3 text-warmgray-900">
                  Rückgabe & Retouren
                </h2>
              </div>
              <div className="mt-6 space-y-4 text-warmgray-700">
                <p>
                  Sie haben ein <strong>14-tägiges Widerrufsrecht</strong> ab
                  Erhalt der Ware.
                </p>
                <p>
                  Für die Rücksendung kontaktieren Sie uns bitte per E-Mail an{' '}
                  <a
                    href="mailto:office@work-force.at"
                    className="text-primary-600 hover:underline"
                  >
                    office@work-force.at
                  </a>
                  . Wir senden Ihnen dann ein kostenloses Rücksendeetikett zu.
                </p>
                <p>
                  Weitere Informationen finden Sie in unserer{' '}
                  <a href="/widerruf" className="text-primary-600 hover:underline">
                    Widerrufsbelehrung
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

