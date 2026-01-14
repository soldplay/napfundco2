'use client'

import { useState } from 'react'
import { HelpCircle, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSimplifiedContent } from '@/hooks/useSimplifiedContent'
import { simplifyText } from '@/lib/content-simplifier'

const agbSections = [
  {
    title: '§ 1 Geltungsbereich',
    content: `(1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten für alle über den TikTok Shop abgeschlossenen Verträge zwischen der Napf&Co OG (nachfolgend "Verkäufer") und dem Kunden (nachfolgend "Käufer").

(2) Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können.

(3) Abweichende Bedingungen des Käufers werden nicht anerkannt, es sei denn, der Verkäufer stimmt ihrer Geltung ausdrücklich schriftlich zu.`,
  },
  {
    title: '§ 2 Vertragsschluss',
    content: `(1) Die Darstellung der Produkte im TikTok Shop stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung dar.

(2) Mit dem Absenden der Bestellung im TikTok Shop gibt der Käufer ein verbindliches Kaufangebot ab.

(3) Der Verkäufer bestätigt den Eingang der Bestellung unverzüglich per automatisierter E-Mail (Bestellbestätigung). Dies stellt noch keine Annahme des Vertragsangebots dar.

(4) Der Kaufvertrag kommt zustande, wenn der Verkäufer das Angebot durch Versand der Ware annimmt.`,
  },
  {
    title: '§ 3 Preise und Zahlungsbedingungen',
    content: `(1) Alle angegebenen Preise sind Endpreise und enthalten die gesetzliche Umsatzsteuer. Hinzu kommen gegebenenfalls Versandkosten.

(2) Die Zahlung erfolgt über die im TikTok Shop angebotenen Zahlungsmethoden (z.B. PayPal, Kreditkarte, Klarna).

(3) Die Kaufpreisforderung wird mit Vertragsschluss fällig.`,
  },
  {
    title: '§ 4 Lieferung und Versand',
    content: `(1) Die Lieferung erfolgt an die vom Käufer angegebene Lieferadresse.

(2) Die Lieferzeit beträgt in der Regel 2-4 Werktage nach Zahlungseingang, sofern keine andere Lieferzeit angegeben ist.

(3) Die Versandkosten innerhalb Österreichs und Deutschlands betragen 4,95 €. Ab einem Bestellwert von 49 € erfolgt die Lieferung versandkostenfrei.

(4) Der Verkäufer ist zu Teillieferungen berechtigt, soweit dies für den Käufer zumutbar ist.`,
  },
  {
    title: '§ 5 Eigentumsvorbehalt',
    content: `Die gelieferte Ware bleibt bis zur vollständigen Bezahlung Eigentum des Verkäufers.`,
  },
  {
    title: '§ 6 Gewährleistung',
    content: `(1) Es gelten die gesetzlichen Gewährleistungsrechte.

(2) Die Gewährleistungsfrist für neue Waren beträgt zwei Jahre ab Erhalt der Ware.

(3) Offensichtliche Mängel müssen innerhalb von zwei Wochen nach Erhalt der Ware schriftlich angezeigt werden.`,
  },
  {
    title: '§ 7 Haftung',
    content: `(1) Der Verkäufer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit.

(2) Bei leichter Fahrlässigkeit haftet der Verkäufer nur bei Verletzung wesentlicher Vertragspflichten. Die Haftung ist in diesem Fall auf den vertragstypischen, vorhersehbaren Schaden begrenzt.

(3) Die vorstehenden Haftungsbeschränkungen gelten nicht für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.`,
  },
  {
    title: '§ 8 Widerrufsrecht',
    content: `Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Die Einzelheiten ergeben sich aus der Widerrufsbelehrung, die auf unserer Website unter "Widerrufsbelehrung" abrufbar ist.`,
  },
  {
    title: '§ 9 Schlussbestimmungen',
    content: `(1) Es gilt österreichisches Recht.

(2) Sofern der Käufer Kaufmann ist, ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertrag der Geschäftssitz des Verkäufers.

(3) Sollten einzelne Bestimmungen dieses Vertrages unwirksam sein oder werden, so wird die Wirksamkeit der übrigen Bestimmungen davon nicht berührt.

(4) Die Vertragssprache ist Deutsch.`,
  },
]

export function AGBContentWithExplain() {
  const { isSimplified, toggleSimplified } = useSimplifiedContent('agb')

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center justify-between rounded-lg border-2 border-primary-200 bg-primary-50 p-4">
        <div>
          <h2 className="font-semibold text-warmgray-900">
            {isSimplified ? 'Vereinfachte Ansicht aktiv' : 'Komplexer Rechtstext'}
          </h2>
          <p className="mt-1 text-sm text-warmgray-600">
            {isSimplified
              ? 'Der Text wurde vereinfacht und mit Beispielen ergänzt.'
              : 'Klicken Sie auf den Button, um eine einfachere Erklärung zu erhalten.'}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={toggleSimplified}
          className="flex items-center gap-2"
        >
          {isSimplified ? (
            <>
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Original anzeigen
            </>
          ) : (
            <>
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              Erklär mir das wie einem Freund
            </>
          )}
        </Button>
      </div>

      <div className="space-y-8 text-warmgray-700">
        {agbSections.map((section, idx) => {
          // Vereinfache den Text, wenn aktiviert
          const contentToShow = isSimplified
            ? simplifyText(section.content, 'agb')
            : section.content

          return (
            <section key={idx} data-section-id={idx}>
              <h2 className="heading-4 text-warmgray-900">{section.title}</h2>
              <div 
                className="mt-4 whitespace-pre-line text-base leading-relaxed"
                data-simplified={isSimplified}
              >
                {contentToShow.split('\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="mb-3">
                    {paragraph.trim() || '\u00A0'}
                  </p>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {isSimplified && (
        <div className="mt-8 rounded-lg border-2 border-primary-200 bg-primary-50 p-6">
          <h3 className="font-semibold text-warmgray-900 mb-4">Beispiele:</h3>
          <ul className="space-y-2 text-sm text-warmgray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>
                Wenn Sie ein Produkt bestellen, kommt der Vertrag zustande, sobald wir Ihre
                Bestellung bestätigen.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>
                Sie haben 14 Tage Zeit, um Ihre Bestellung ohne Angabe von Gründen
                zurückzusenden.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>
                Wenn ein Produkt defekt ist, können Sie es innerhalb von 2 Jahren reklamieren.
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

