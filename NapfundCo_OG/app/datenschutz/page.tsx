import { Metadata } from 'next'
import { ResetButton } from '@/components/privacy/ResetButton'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung der Napf&Co OG gemäß DSGVO',
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white py-12 lg:py-16">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-2 text-warmgray-900">Datenschutzerklärung</h1>
          <p className="mt-2 text-warmgray-600">Stand: Januar 2024</p>

          <div className="mt-8 space-y-8 text-warmgray-700">
            <section>
              <h2 className="heading-4 text-warmgray-900">
                1. Verantwortlicher
              </h2>
              <div className="mt-4">
                <p>
                  Verantwortlich für die Datenverarbeitung auf dieser Website
                  ist:
                </p>
                <address className="mt-4 not-italic">
                  <p className="font-semibold">Napf&Co OG</p>
                  <p>Donau-City-Straße 7, 32. Stock</p>
                  <p>1220 Wien, Österreich</p>
                  <p>
                    E-Mail:{' '}
                    <a
                      href="mailto:office@work-force.at"
                      className="text-primary-600 hover:underline"
                    >
                      office@work-force.at
                    </a>
                  </p>
                </address>
              </div>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                2. Ihre Rechte als Betroffene/r
              </h2>
              <p className="mt-4">
                Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie
                betreffenden personenbezogenen Daten:
              </p>
              <ul className="mt-4 list-inside list-disc space-y-2">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
              </ul>
              <p className="mt-4">
                Sie haben zudem das Recht, sich bei einer
                Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
                personenbezogenen Daten durch uns zu beschweren.
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                3. Erhebung personenbezogener Daten beim Besuch unserer Website
              </h2>
              <p className="mt-4">
                Bei der bloß informatorischen Nutzung der Website erheben wir
                nur die personenbezogenen Daten, die Ihr Browser an unseren
                Server übermittelt. Wenn Sie unsere Website betrachten möchten,
                erheben wir die folgenden Daten, die für uns technisch
                erforderlich sind, um Ihnen unsere Website anzuzeigen:
              </p>
              <ul className="mt-4 list-inside list-disc space-y-2">
                <li>IP-Adresse</li>
                <li>Datum und Uhrzeit der Anfrage</li>
                <li>Zeitzonendifferenz zur Greenwich Mean Time (GMT)</li>
                <li>Inhalt der Anforderung (konkrete Seite)</li>
                <li>Zugriffsstatus/HTTP-Statuscode</li>
                <li>Jeweils übertragene Datenmenge</li>
                <li>Website, von der die Anforderung kommt</li>
                <li>Browser</li>
                <li>Betriebssystem und dessen Oberfläche</li>
                <li>Sprache und Version der Browsersoftware</li>
              </ul>
              <p className="mt-4">
                Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. f DSGVO.
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">4. Cookies</h2>
              <p className="mt-4">
                Wir setzen auf unserer Website Cookies ein. Bei Cookies handelt
                es sich um kleine Textdateien, die auf Ihrem Endgerät
                gespeichert werden.
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-warmgray-900">
                    Technisch notwendige Cookies
                  </h3>
                  <p className="mt-2">
                    Diese Cookies sind erforderlich, damit die Website
                    ordnungsgemäß funktioniert. Rechtsgrundlage ist Art. 6 Abs.
                    1 S. 1 lit. f DSGVO.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-warmgray-900">
                    Analyse-Cookies
                  </h3>
                  <p className="mt-2">
                    Mit Ihrer Einwilligung setzen wir Cookies zu Analysezwecken
                    ein. Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. a DSGVO.
                    Sie können Ihre Einwilligung jederzeit mit Wirkung für die
                    Zukunft widerrufen.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                5. TikTok Shop Integration
              </h2>
              <p className="mt-4">
                Unser Online-Shop wird über TikTok Shop betrieben. Wenn Sie
                Produkte über TikTok Shop kaufen, werden Ihre Daten von TikTok
                verarbeitet. TikTok ist verantwortlich für die Datenverarbeitung
                im Rahmen des Kaufprozesses.
              </p>
              <p className="mt-4">
                Weitere Informationen zur Datenverarbeitung durch TikTok finden
                Sie in der Datenschutzerklärung von TikTok:{' '}
                <a
                  href="https://www.tiktok.com/legal/privacy-policy-eea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  https://www.tiktok.com/legal/privacy-policy-eea
                </a>
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                6. Newsletter
              </h2>
              <p className="mt-4">
                Wenn Sie den auf der Website angebotenen Newsletter beziehen
                möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie
                Informationen, welche uns die Überprüfung gestatten, dass Sie
                der Inhaber der angegebenen E-Mail-Adresse sind und mit dem
                Empfang des Newsletters einverstanden sind (Double-Opt-In).
              </p>
              <p className="mt-4">
                Ihre Einwilligung zur Speicherung der Daten, der
                E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters
                können Sie jederzeit widerrufen. Rechtsgrundlage ist Art. 6
                Abs. 1 S. 1 lit. a DSGVO.
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                7. Kontaktformular
              </h2>
              <p className="mt-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                werden Ihre Angaben aus dem Anfrageformular inklusive der von
                Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                Anfrage und für den Fall von Anschlussfragen bei uns
                gespeichert.
              </p>
              <p className="mt-4">
                Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. b DSGVO
                (Vertragsanbahnung) bzw. Art. 6 Abs. 1 S. 1 lit. f DSGVO
                (berechtigtes Interesse).
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                8. Datensicherheit
              </h2>
              <p className="mt-4">
                Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
                Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung. Sie
                erkennen eine verschlüsselte Verbindung an der Zeichenfolge
                &quot;https://&quot; und dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">
                9. Änderung dieser Datenschutzerklärung
              </h2>
              <p className="mt-4">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                damit sie stets den aktuellen rechtlichen Anforderungen
                entspricht oder um Änderungen unserer Leistungen umzusetzen.
                Für Ihren erneuten Besuch gilt dann die neue
                Datenschutzerklärung.
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">10. Fragen</h2>
              <p className="mt-4">
                Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte
                eine E-Mail an:{' '}
                <a
                  href="mailto:datenschutz@napfundco.de"
                  className="text-primary-600 hover:underline"
                >
                  datenschutz@napfundco.de
                </a>
              </p>
            </section>

            <section>
              <h2 className="heading-4 text-warmgray-900">11. Ihre Kontrolle</h2>
              <p className="mt-4">
                Sie haben die volle Kontrolle über Ihre Daten. Hier können Sie alle
                gespeicherten Daten zurücksetzen:
              </p>
              <div className="mt-6 space-y-4">
                <ResetButton variant="full" />
                <ResetButton variant="personalization" />
                <ResetButton variant="history" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

