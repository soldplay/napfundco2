'use client'

import { ExplainButton } from '@/components/ui/explain-button'

const agbContent = `
§ 1 Geltungsbereich

(1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten für alle über den TikTok Shop abgeschlossenen Verträge zwischen der Napf&Co OG (nachfolgend "Verkäufer") und dem Kunden (nachfolgend "Käufer").

(2) Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können.

(3) Abweichende Bedingungen des Käufers werden nicht anerkannt, es sei denn, der Verkäufer stimmt ihrer Geltung ausdrücklich schriftlich zu.

§ 2 Vertragsschluss

(1) Die Darstellung der Produkte im TikTok Shop stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung dar.

(2) Mit dem Absenden der Bestellung im TikTok Shop gibt der Käufer ein verbindliches Kaufangebot ab.

(3) Der Verkäufer bestätigt den Eingang der Bestellung unverzüglich per automatisierter E-Mail (Bestellbestätigung). Dies stellt noch keine Annahme des Vertragsangebots dar.

(4) Der Kaufvertrag kommt zustande, wenn der Verkäufer das Angebot durch Versand der Ware annimmt.

§ 3 Preise und Zahlungsbedingungen

(1) Alle angegebenen Preise sind Endpreise und enthalten die gesetzliche Umsatzsteuer. Hinzu kommen gegebenenfalls Versandkosten.

(2) Die Zahlung erfolgt über die im TikTok Shop angebotenen Zahlungsmethoden (z.B. PayPal, Kreditkarte, Klarna).

(3) Die Kaufpreisforderung wird mit Vertragsschluss fällig.

§ 4 Lieferung und Versand

(1) Die Lieferung erfolgt an die vom Käufer angegebene Lieferadresse.

(2) Die Lieferzeit beträgt in der Regel 2-4 Werktage nach Zahlungseingang, sofern keine andere Lieferzeit angegeben ist.

(3) Die Versandkosten innerhalb Österreichs und Deutschlands betragen 4,95 €. Ab einem Bestellwert von 49 € erfolgt die Lieferung versandkostenfrei.

(4) Der Verkäufer ist zu Teillieferungen berechtigt, soweit dies für den Käufer zumutbar ist.

§ 5 Eigentumsvorbehalt

Die gelieferte Ware bleibt bis zur vollständigen Bezahlung Eigentum des Verkäufers.

§ 6 Gewährleistung

(1) Es gelten die gesetzlichen Gewährleistungsrechte.

(2) Die Gewährleistungsfrist für neue Waren beträgt zwei Jahre ab Erhalt der Ware.

(3) Offensichtliche Mängel müssen innerhalb von zwei Wochen nach Erhalt der Ware schriftlich angezeigt werden.

§ 7 Haftung

(1) Der Verkäufer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit.

(2) Bei leichter Fahrlässigkeit haftet der Verkäufer nur bei Verletzung wesentlicher Vertragspflichten. Die Haftung ist in diesem Fall auf den vertragstypischen, vorhersehbaren Schaden begrenzt.

(3) Die vorstehenden Haftungsbeschränkungen gelten nicht für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.

§ 8 Widerrufsrecht

Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Die Einzelheiten ergeben sich aus der Widerrufsbelehrung, die auf unserer Website unter "Widerrufsbelehrung" abrufbar ist.

§ 9 Schlussbestimmungen

(1) Es gilt österreichisches Recht.

(2) Sofern der Käufer Kaufmann ist, ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertrag der Geschäftssitz des Verkäufers.

(3) Sollten einzelne Bestimmungen dieses Vertrages unwirksam sein oder werden, so wird die Wirksamkeit der übrigen Bestimmungen davon nicht berührt.

(4) Die Vertragssprache ist Deutsch.
`

export function AGBContent() {
  return (
    <div className="space-y-8 text-warmgray-700">
      <ExplainButton content={agbContent} type="agb" />
    </div>
  )
}

