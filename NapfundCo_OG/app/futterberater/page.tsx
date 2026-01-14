import { Metadata } from 'next'
import { FoodAdvisorQuiz } from '@/components/quiz/FoodAdvisorQuiz'

export const metadata: Metadata = {
  title: 'Futterberater',
  description:
    'Finde das perfekte Futter für dein Tier mit unserem interaktiven Futterberater. Individuelle Empfehlungen basierend auf Alter, Gewicht und besonderen Bedürfnissen.',
}

export default function FoodAdvisorPage() {
  return <FoodAdvisorQuiz />
}

