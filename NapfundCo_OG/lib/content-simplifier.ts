// Content Simplifier - Vereinfacht komplexe Rechtstexte

export interface SimplifiedContent {
  original: string
  simplified: string
  examples?: string[]
}

// Vereinfachungs-Regeln für verschiedene Texttypen
export function simplifyText(text: string, type: 'agb' | 'datenschutz' | 'impressum' | 'versand'): string {
  let simplified = text

  // Allgemeine Vereinfachungen (mit replaceAll für alle Vorkommen)
  // WICHTIG: Spezifischere Muster ZUERST, sonst werden sie überschrieben!
  simplified = simplified.replace(/gemäß §/g, 'laut Paragraph')
  simplified = simplified.replace(/gemäß/g, 'laut')
  simplified = simplified.replace(/Verbraucher/g, 'Kunde')
  simplified = simplified.replace(/Verkäufer/g, 'wir')
  simplified = simplified.replace(/Käufer/g, 'Sie')
  simplified = simplified.replace(/binnen/g, 'innerhalb')
  simplified = simplified.replace(/unverzüglich/g, 'sofort')
  simplified = simplified.replace(/einschließlich/g, 'inklusive')
  simplified = simplified.replace(/jeweils/g, 'immer')
  simplified = simplified.replace(/insbesondere/g, 'besonders')
  simplified = simplified.replace(/vorbehaltlich/g, 'außer')
  simplified = simplified.replace(/soweit/g, 'wenn')
  simplified = simplified.replace(/sofern/g, 'wenn')
  simplified = simplified.replace(/hinsichtlich/g, 'bezüglich')
  simplified = simplified.replace(/zwecks/g, 'für')
  simplified = simplified.replace(/um zu/g, 'um zu')
  
  // Weitere Vereinfachungen
  simplified = simplified.replace(/erfolgt/g, 'passiert')
  simplified = simplified.replace(/erfolgen/g, 'passieren')
  simplified = simplified.replace(/erfolgte/g, 'passierte')
  simplified = simplified.replace(/zustande kommen/g, 'entstehen')
  simplified = simplified.replace(/zustande/g, 'entsteht')
  simplified = simplified.replace(/abgeschlossen/g, 'gemacht')
  simplified = simplified.replace(/abzuschließen/g, 'zu machen')
  simplified = simplified.replace(/abschließt/g, 'macht')
  simplified = simplified.replace(/Tätigkeit/g, 'Arbeit')
  simplified = simplified.replace(/zugerechnet/g, 'gezählt')
  simplified = simplified.replace(/abweichende/g, 'andere')
  simplified = simplified.replace(/schriftlich/g, 'schriftlich')
  simplified = simplified.replace(/Darstellung/g, 'Anzeige')
  simplified = simplified.replace(/Aufforderung/g, 'Bitte')
  simplified = simplified.replace(/verbindliches/g, 'gültiges')
  simplified = simplified.replace(/Kaufangebot/g, 'Kaufwunsch')
  simplified = simplified.replace(/automatisierter/g, 'automatischer')
  simplified = simplified.replace(/Bestellbestätigung/g, 'Bestätigung')
  simplified = simplified.replace(/Annahme/g, 'Zustimmung')
  simplified = simplified.replace(/Vertragsangebots/g, 'Angebots')
  simplified = simplified.replace(/Versand der Ware/g, 'Versand')
  simplified = simplified.replace(/Endpreise/g, 'Preise')
  simplified = simplified.replace(/Umsatzsteuer/g, 'Mehrwertsteuer')
  simplified = simplified.replace(/Zahlungsmethoden/g, 'Zahlungsarten')
  simplified = simplified.replace(/fällig/g, 'zu zahlen')
  simplified = simplified.replace(/Lieferadresse/g, 'Adresse')
  simplified = simplified.replace(/Lieferzeit/g, 'Lieferdauer')
  simplified = simplified.replace(/Zahlungseingang/g, 'Zahlung')
  simplified = simplified.replace(/Versandkosten/g, 'Lieferkosten')
  simplified = simplified.replace(/Bestellwert/g, 'Bestellsumme')
  simplified = simplified.replace(/versandkostenfrei/g, 'kostenlos')
  simplified = simplified.replace(/Teillieferungen/g, 'Teillieferungen')
  simplified = simplified.replace(/zumutbar/g, 'okay')
  simplified = simplified.replace(/Eigentum/g, 'Besitz')
  simplified = simplified.replace(/vollständigen Bezahlung/g, 'kompletten Zahlung')
  simplified = simplified.replace(/Gewährleistungsrechte/g, 'Garantierechte')
  simplified = simplified.replace(/Gewährleistungsfrist/g, 'Garantiezeit')
  simplified = simplified.replace(/Erhalt der Ware/g, 'Erhalt')
  simplified = simplified.replace(/Offensichtliche/g, 'Sichtbare')
  simplified = simplified.replace(/Mängel/g, 'Fehler')
  simplified = simplified.replace(/schriftlich angezeigt/g, 'gemeldet')
  simplified = simplified.replace(/haftet/g, 'ist verantwortlich')
  simplified = simplified.replace(/unbeschränkt/g, 'voll')
  simplified = simplified.replace(/Vorsatz/g, 'Absicht')
  simplified = simplified.replace(/grobe Fahrlässigkeit/g, 'grober Fehler')
  simplified = simplified.replace(/leichte Fahrlässigkeit/g, 'kleiner Fehler')
  simplified = simplified.replace(/Verletzung/g, 'Nichteinhaltung')
  simplified = simplified.replace(/wesentlicher Vertragspflichten/g, 'wichtiger Pflichten')
  simplified = simplified.replace(/vertragstypischen/g, 'üblichen')
  simplified = simplified.replace(/vorhersehbaren Schaden/g, 'erwartbaren Schaden')
  simplified = simplified.replace(/begrenzt/g, 'beschränkt')
  simplified = simplified.replace(/Haftungsbeschränkungen/g, 'Haftungsregeln')
  simplified = simplified.replace(/Verletzung des Lebens/g, 'Verletzung')
  simplified = simplified.replace(/Körpers/g, 'Körpers')
  simplified = simplified.replace(/Gesundheit/g, 'Gesundheit')
  simplified = simplified.replace(/Widerrufsrecht/g, 'Rückgaberecht')
  simplified = simplified.replace(/Widerrufsbelehrung/g, 'Rückgabe-Info')
  simplified = simplified.replace(/abrufbar/g, 'zu finden')
  simplified = simplified.replace(/Schlussbestimmungen/g, 'Schluss')
  simplified = simplified.replace(/österreichisches Recht/g, 'österreichisches Gesetz')
  simplified = simplified.replace(/Kaufmann/g, 'Geschäftsmann')
  simplified = simplified.replace(/ausschließlicher Gerichtsstand/g, 'zuständiges Gericht')
  simplified = simplified.replace(/Streitigkeiten/g, 'Streit')
  simplified = simplified.replace(/Geschäftssitz/g, 'Firmensitz')
  simplified = simplified.replace(/unwirksam/g, 'ungültig')
  simplified = simplified.replace(/Wirksamkeit/g, 'Gültigkeit')
  simplified = simplified.replace(/übrigen Bestimmungen/g, 'anderen Regeln')
  simplified = simplified.replace(/berührt/g, 'betroffen')
  simplified = simplified.replace(/Vertragssprache/g, 'Sprache')

  // Typ-spezifische Vereinfachungen
  if (type === 'agb') {
    simplified = simplified.replace(/Allgemeine Geschäftsbedingungen/g, 'Unsere Geschäftsbedingungen')
    simplified = simplified.replace(/Vertragsschluss/g, 'Bestellung')
    simplified = simplified.replace(/Gewährleistung/g, 'Garantie')
    simplified = simplified.replace(/Mängelhaftung/g, 'Gewährleistung')
  }

  if (type === 'datenschutz') {
    simplified = simplified.replace(/personenbezogene Daten/g, 'Ihre Daten')
    simplified = simplified.replace(/Verarbeitung/g, 'Nutzung')
    simplified = simplified.replace(/Verantwortlicher/g, 'Wir sind verantwortlich')
    simplified = simplified.replace(/DSGVO/g, 'Datenschutz-Gesetz')
  }

  if (type === 'versand') {
    simplified = simplified.replace(/Versandkosten/g, 'Lieferkosten')
    simplified = simplified.replace(/Lieferzeit/g, 'Lieferdauer')
    simplified = simplified.replace(/Versandzeitpunkt/g, 'Versand')
  }

  // Lange Sätze kürzen
  simplified = simplified.replace(/\. ([A-ZÄÖÜ][^.]{100,})\./g, (match) => {
    // Versuche lange Sätze zu kürzen
    return match.length > 150 ? match.substring(0, 100) + '...' : match
  })

  return simplified
}

// Beispiele für verschiedene Themen hinzufügen
export function getExamples(type: 'agb' | 'datenschutz' | 'impressum' | 'versand'): string[] {
  const examples: Record<string, string[]> = {
    agb: [
      'Beispiel: Wenn Sie ein Produkt bestellen, kommt der Vertrag zustande, sobald wir Ihre Bestellung bestätigen.',
      'Beispiel: Sie haben 14 Tage Zeit, um Ihre Bestellung ohne Angabe von Gründen zurückzusenden.',
      'Beispiel: Wenn ein Produkt defekt ist, können Sie es innerhalb von 2 Jahren reklamieren.',
    ],
    datenschutz: [
      'Beispiel: Wenn Sie eine Bestellung aufgeben, speichern wir Ihren Namen und Ihre Adresse, um die Lieferung durchzuführen.',
      'Beispiel: Wir nutzen Cookies, um zu sehen, welche Produkte Sie interessieren. Sie können diese jederzeit in den Browser-Einstellungen löschen.',
      'Beispiel: Ihre Zahlungsdaten werden direkt an unseren Zahlungsdienstleister weitergegeben, nicht an uns.',
    ],
    impressum: [
      'Beispiel: Das Impressum zeigt, wer für diese Website verantwortlich ist und wie Sie uns erreichen können.',
      'Beispiel: Wenn Sie Fragen haben, können Sie uns unter der angegebenen E-Mail-Adresse kontaktieren.',
    ],
    versand: [
      'Beispiel: Bestellungen vor 14 Uhr werden noch am selben Tag versendet.',
      'Beispiel: Ab 49€ Bestellwert ist der Versand kostenlos.',
      'Beispiel: Die Lieferung erfolgt in der Regel innerhalb von 2-4 Werktagen.',
    ],
  }

  return examples[type] || []
}

// Hauptfunktion zum Vereinfachen von Content
export function simplifyContent(
  content: string,
  type: 'agb' | 'datenschutz' | 'impressum' | 'versand'
): SimplifiedContent {
  return {
    original: content,
    simplified: simplifyText(content, type),
    examples: getExamples(type),
  }
}

