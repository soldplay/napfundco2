import { Metadata } from 'next'
import { ContactPage } from '@/components/contact/ContactPage'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktieren Sie das Napf&Co Team. Wir helfen Ihnen gerne bei Fragen zu Produkten, Bestellungen und mehr.',
}

export default function KontaktPage() {
  return <ContactPage />
}

