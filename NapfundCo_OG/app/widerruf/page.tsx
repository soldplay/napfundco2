import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Widerrufsbelehrung',
  description: 'Widerrufsbelehrung und Muster-Widerrufsformular',
}

export default function WiderrufPage() {
  return (
    <div className="min-h-screen bg-white py-12 lg:py-16">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-2 text-warmgray-900">Widerrufsbelehrung</h1>

          <div className="mt-8 space-y-8 text-warmgray-700">
            <section>
              <h2 className="heading-4 text-warmgray-900">Widerrufsrecht</h2>
              <p className="mt-4">
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von
                Gründen diesen Vertrag zu widerrufen.
              </p>
              <p className="mt-2">
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie
                oder ein von Ihnen benannter Dritter, der nicht der Beförderer
                ist, die Waren in Besitz genommen haben bzw. hat.
              </p>
              <p className="mt-2">
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:
              </p>
              <address className="mt-4 not-italic rounded-lg bg-warmgray-50 p-4">
                <p className="font-semibold">Napf&Co OG</p>
                <p>Donau-City-Straße 7, 32. Stock</p>
                <p>1220 Wien, Österreich</p>
                <p>
                  Telefon:{' '}
                  <a href="tel:+436764844169" className="text-primary-600">
                    +43 676 4844169
                  </a>
                </p>
                <p>
                  E-Mail:{' '}
                  <a
                    href="mailto:office@work-force.at"
                    className="text-primary-600"
                  >
                    office@work-force.at
                  </a>
                </p>
              </address>
              <p className="mt-4">
                mittels einer eindeutigen Erklärung (z.B. ein mit der Post
                versandter Brief oder E-Mail) über Ihren Entschluss, diesen
                Vertrag zu widerrufen, informieren. Sie können dafür das
                beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht
                vorgeschrieben ist.
              </p>
              <p className="mt-2">
                Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die
                Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der
                Widerrufsfrist absenden.
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                Folgen des Widerrufs
              </h2>
              <p className="mt-4">
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle
                Zahlungen, die wir von Ihnen erhalten haben, einschließlich der
                Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich
                daraus ergeben, dass Sie eine andere Art der Lieferung als die
                von uns angebotene, günstigste Standardlieferung gewählt haben),
                unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
                zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses
                Vertrags bei uns eingegangen ist.
              </p>
              <p className="mt-2">
                Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das
                Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei
                denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in
                keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte
                berechnet.
              </p>
              <p className="mt-2">
                Wir können die Rückzahlung verweigern, bis wir die Waren wieder
                zurückerhalten haben oder bis Sie den Nachweis erbracht haben,
                dass Sie die Waren zurückgesandt haben, je nachdem, welches der
                frühere Zeitpunkt ist.
              </p>
              <p className="mt-2">
                Sie haben die Waren unverzüglich und in jedem Fall spätestens
                binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den
                Widerruf dieses Vertrags unterrichten, an uns zurückzusenden
                oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor
                Ablauf der Frist von vierzehn Tagen absenden.
              </p>
              <p className="mt-2">
                <strong>Wir tragen die Kosten der Rücksendung der Waren.</strong>
              </p>
              <p className="mt-2">
                Sie müssen für einen etwaigen Wertverlust der Waren nur
                aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der
                Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht
                notwendigen Umgang mit ihnen zurückzuführen ist.
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                Ausschluss des Widerrufsrechts
              </h2>
              <p className="mt-4">
                Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung
                von Waren, die schnell verderben können oder deren
                Verfallsdatum schnell überschritten würde (z.B. Frischfutter
                mit kurzer Haltbarkeit).
              </p>
              <p className="mt-2">
                Das Widerrufsrecht erlischt vorzeitig bei Verträgen zur
                Lieferung versiegelter Waren, die aus Gründen des
                Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe
                geeignet sind, wenn ihre Versiegelung nach der Lieferung
                entfernt wurde.
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                Muster-Widerrufsformular
              </h2>
              <p className="mt-4">
                (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte
                dieses Formular aus und senden Sie es zurück.)
              </p>
              <div className="mt-4 rounded-lg border border-warmgray-200 bg-warmgray-50 p-6">
                <p>An:</p>
                <p className="mt-2">
                  Napf&Co OG
                  <br />
                  Donau-City-Straße 7, 32. Stock
                  <br />
                  1220 Wien, Österreich
                  <br />
                  E-Mail: office@work-force.at
                </p>
                <p className="mt-4">
                  Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
                  abgeschlossenen Vertrag über den Kauf der folgenden Waren (*):
                </p>
                <p className="mt-2">
                  ________________________________________________________
                </p>
                <p className="mt-4">Bestellt am (*) / erhalten am (*):</p>
                <p className="mt-2">
                  ________________________________________________________
                </p>
                <p className="mt-4">Name des/der Verbraucher(s):</p>
                <p className="mt-2">
                  ________________________________________________________
                </p>
                <p className="mt-4">Anschrift des/der Verbraucher(s):</p>
                <p className="mt-2">
                  ________________________________________________________
                </p>
                <p className="mt-4">
                  Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf
                  Papier):
                </p>
                <p className="mt-2">
                  ________________________________________________________
                </p>
                <p className="mt-4">Datum:</p>
                <p className="mt-2">
                  ________________________________________________________
                </p>
                <p className="mt-4 text-sm text-warmgray-500">
                  (*) Unzutreffendes streichen.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

