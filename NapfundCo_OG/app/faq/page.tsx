import { Metadata } from 'next'
import { FAQSection } from '@/components/faq/FAQSection'

export const metadata: Metadata = {
  title: 'FAQ - Häufige Fragen',
  description:
    'Antworten auf häufig gestellte Fragen zu Bestellung, Lieferung, Fütterung und mehr bei Napf&Co',
}

export default function FAQPage() {
  return <FAQSection />
}

