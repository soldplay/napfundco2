import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Anbieterkennzeichnung gemäß § 5 ECG',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white py-12 lg:py-16">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-2 text-warmgray-900">Impressum</h1>
          <p className="mt-2 text-warmgray-600">
            Angaben gemäß § 5 ECG und § 14 UGB
          </p>

          <div className="mt-8 space-y-8 text-warmgray-700">
            <section>
              <h2 className="heading-4 text-warmgray-900">Anbieter</h2>
              <address className="mt-4 not-italic">
                <p className="font-semibold">Napf&Co OG</p>
                <p>Donau-City-Straße 7, 32. Stock</p>
                <p>1220 Wien</p>
                <p>Österreich</p>
              </address>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">Kontakt</h2>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Telefon:</strong>{' '}
                  <a
                    href="tel:+436764844169"
                    className="text-primary-600 hover:underline"
                  >
                    +43 676 4844169
                  </a>
                </p>
                <p>
                  <strong>E-Mail:</strong>{' '}
                  <a
                    href="mailto:office@work-force.at"
                    className="text-primary-600 hover:underline"
                  >
                    office@work-force.at
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">Gesellschafter</h2>
              <p className="mt-4">
                <strong>Vertretungsbefugte Gesellschafter:</strong> Die Gesellschafter der Napf&Co OG
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">Firmenbucheintrag</h2>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Firmenbuchgericht:</strong> Handelsgericht Wien
                </p>
                <p>
                  <strong>Firmenbuchnummer:</strong> FN 123456a
                </p>
              </div>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">Umsatzsteuer-ID</h2>
              <p className="mt-4">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 UStG:
                <br />
                <strong>ATU12345678</strong>
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                Verantwortlich für den Inhalt
              </h2>
              <address className="mt-4 not-italic">
                <p>Napf&Co OG</p>
                <p>Donau-City-Straße 7, 32. Stock</p>
                <p>1220 Wien, Österreich</p>
              </address>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                Online-Streitbeilegung (OS)
              </h2>
              <p className="mt-4">
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="mt-2">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                Verbraucherstreitbeilegung/Universalschlichtungsstelle
              </h2>
              <p className="mt-4">
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">Haftungsausschluss</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-warmgray-900">
                    Haftung für Inhalte
                  </h3>
                  <p className="mt-2">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt
                    erstellt. Für die Richtigkeit, Vollständigkeit und
                    Aktualität der Inhalte können wir jedoch keine Gewähr
                    übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1
                    TMG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-warmgray-900">
                    Haftung für Links
                  </h3>
                  <p className="mt-2">
                    Unser Angebot enthält Links zu externen Webseiten Dritter,
                    auf deren Inhalte wir keinen Einfluss haben. Deshalb können
                    wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                    Für die Inhalte der verlinkten Seiten ist stets der
                    jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-warmgray-900">Urheberrecht</h3>
                  <p className="mt-2">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke
                    auf diesen Seiten unterliegen dem deutschen Urheberrecht.
                    Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                    der Verwertung außerhalb der Grenzen des Urheberrechtes
                    bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                    bzw. Erstellers.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">TikTok Shop</h2>
              <p className="mt-4">
                Der Verkauf unserer Produkte erfolgt über den TikTok Shop. Für
                die Nutzung des TikTok Shops gelten zusätzlich die
                Nutzungsbedingungen von TikTok. Der Kaufvertrag kommt direkt
                zwischen Ihnen und der Napf&Co OG zustande.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

