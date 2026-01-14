import { Metadata } from 'next'
import { AboutPage } from '@/components/about/AboutPage'

export const metadata: Metadata = {
  title: 'Über uns',
  description:
    'Erfahren Sie mehr über Napf&Co - unsere Geschichte, unser Team und unsere Mission für gesunde Tierernährung.',
}

export default function UeberUnsPage() {
  return <AboutPage />
}

