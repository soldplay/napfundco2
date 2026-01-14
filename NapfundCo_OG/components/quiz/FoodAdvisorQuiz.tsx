'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Dog,
  Cat,
  Sparkles,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/products/ProductCard'
import { getAllProducts, type Product } from '@/lib/products'

interface QuizStep {
  id: string
  question: string
  type: 'single' | 'multiple' | 'text' | 'number'
  options?: { value: string; label: string; icon?: React.ReactNode }[]
  condition?: (answers: QuizAnswers) => boolean
}

interface QuizAnswers {
  petType: string
  petName: string
  age: string
  weight: string
  activity: string
  allergies: string[]
  preferences: string[]
  specialNeeds: string[]
}

const quizSteps: QuizStep[] = [
  {
    id: 'petType',
    question: 'Welches Tier hast du?',
    type: 'single',
    options: [
      {
        value: 'hund',
        label: 'Hund',
        icon: <Dog className="h-8 w-8" aria-hidden="true" />,
      },
      {
        value: 'katze',
        label: 'Katze',
        icon: <Cat className="h-8 w-8" aria-hidden="true" />,
      },
      {
        value: 'pferd',
        label: 'Pferd',
        icon: <span className="text-3xl" aria-hidden="true">🐴</span>,
      },
    ],
  },
  {
    id: 'petName',
    question: 'Wie heißt dein Liebling?',
    type: 'text',
  },
  {
    id: 'age',
    question: 'Wie alt ist {petName}?',
    type: 'single',
    options: [
      { value: 'puppy', label: 'Welpe/Kitten (0-1 Jahr)' },
      { value: 'adult', label: 'Erwachsen (1-7 Jahre)' },
      { value: 'senior', label: 'Senior (7+ Jahre)' },
    ],
  },
  {
    id: 'weight',
    question: 'Wie viel wiegt {petName} ungefähr?',
    type: 'single',
    condition: (answers) => answers.petType !== 'pferd',
    options: [
      { value: 'small', label: 'Klein (bis 10 kg)' },
      { value: 'medium', label: 'Mittel (10-25 kg)' },
      { value: 'large', label: 'Groß (25-45 kg)' },
      { value: 'xlarge', label: 'Sehr groß (über 45 kg)' },
    ],
  },
  {
    id: 'activity',
    question: 'Wie aktiv ist {petName}?',
    type: 'single',
    options: [
      { value: 'low', label: 'Wenig aktiv (Couch-Potato)' },
      { value: 'moderate', label: 'Normal aktiv' },
      { value: 'high', label: 'Sehr aktiv (Sportler)' },
    ],
  },
  {
    id: 'allergies',
    question: 'Hat {petName} bekannte Allergien oder Unverträglichkeiten?',
    type: 'multiple',
    options: [
      { value: 'none', label: 'Keine bekannten Allergien' },
      { value: 'grain', label: 'Getreide' },
      { value: 'chicken', label: 'Huhn/Geflügel' },
      { value: 'beef', label: 'Rind' },
      { value: 'fish', label: 'Fisch' },
      { value: 'dairy', label: 'Milchprodukte' },
    ],
  },
  {
    id: 'preferences',
    question: 'Welche Futterart bevorzugt {petName}?',
    type: 'multiple',
    options: [
      { value: 'wet', label: 'Nassfutter' },
      { value: 'dry', label: 'Trockenfutter' },
      { value: 'mixed', label: 'Mischfütterung' },
      { value: 'snacks', label: 'Auch Snacks/Leckerlis' },
    ],
  },
  {
    id: 'specialNeeds',
    question: 'Hat {petName} besondere Bedürfnisse?',
    type: 'multiple',
    options: [
      { value: 'none', label: 'Keine besonderen Bedürfnisse' },
      { value: 'weight', label: 'Gewichtskontrolle' },
      { value: 'digestion', label: 'Empfindliche Verdauung' },
      { value: 'skin', label: 'Haut & Fell Unterstützung' },
      { value: 'joints', label: 'Gelenk-Unterstützung' },
      { value: 'dental', label: 'Zahnpflege' },
    ],
  },
]

export function FoodAdvisorQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({
    petType: '',
    petName: '',
    age: '',
    weight: '',
    activity: '',
    allergies: [],
    preferences: [],
    specialNeeds: [],
  })
  const [showResults, setShowResults] = useState(false)
  const [recommendations, setRecommendations] = useState<Product[]>([])

  // Get active steps (filter by condition)
  const activeSteps = quizSteps.filter(
    (step) => !step.condition || step.condition(answers)
  )

  const currentQuizStep = activeSteps[currentStep]
  const progress = ((currentStep + 1) / activeSteps.length) * 100

  // Replace {petName} in questions
  const getQuestion = (question: string) => {
    return question.replace('{petName}', answers.petName || 'dein Tier')
  }

  const handleSingleSelect = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuizStep.id]: value,
    }))
  }

  const handleMultipleSelect = (value: string) => {
    const currentValues = answers[currentQuizStep.id as keyof QuizAnswers] as string[]
    
    // If "none" is selected, clear other selections
    if (value === 'none') {
      setAnswers((prev) => ({
        ...prev,
        [currentQuizStep.id]: ['none'],
      }))
      return
    }

    // If selecting something else while "none" is selected, remove "none"
    const newValues = currentValues.includes('none')
      ? [value]
      : currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]

    setAnswers((prev) => ({
      ...prev,
      [currentQuizStep.id]: newValues,
    }))
  }

  const handleTextInput = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuizStep.id]: value,
    }))
  }

  const canProceed = () => {
    const value = answers[currentQuizStep.id as keyof QuizAnswers]
    if (currentQuizStep.type === 'multiple') {
      return (value as string[]).length > 0
    }
    return Boolean(value)
  }

  const nextStep = () => {
    if (currentStep < activeSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      calculateRecommendations()
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const calculateRecommendations = () => {
    const allProducts = getAllProducts()
    
    // Filter products based on pet type
    let filtered = allProducts.filter((p) => p.category === answers.petType)

    // Filter by preferences
    if (answers.preferences.includes('wet')) {
      filtered = filtered.filter(
        (p) => p.subcategory === 'nassfutter' || p.subcategory === 'snacks'
      )
    }
    if (answers.preferences.includes('dry')) {
      filtered = filtered.filter(
        (p) => p.subcategory === 'trockenfutter' || p.subcategory === 'snacks'
      )
    }

    // Filter by allergies (e.g., grain-free)
    if (answers.allergies.includes('grain')) {
      filtered = filtered.filter((p) =>
        p.badges.some((b) => b.toLowerCase().includes('getreidefrei'))
      )
    }

    // Sort by rating and take top results
    const sorted = filtered.sort((a, b) => b.rating - a.rating)
    
    setRecommendations(sorted.slice(0, 4))
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers({
      petType: '',
      petName: '',
      age: '',
      weight: '',
      activity: '',
      allergies: [],
      preferences: [],
      specialNeeds: [],
    })
    setShowResults(false)
    setRecommendations([])
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-cream to-secondary-50 py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-primary-700">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              Deine persönliche Empfehlung
            </div>

            <h1 className="heading-2 text-warmgray-900">
              Das perfekte Futter für {answers.petName}!
            </h1>
            <p className="body-large mt-4 text-warmgray-600">
              Basierend auf deinen Angaben haben wir diese Produkte für dich
              ausgewählt.
            </p>

            {/* Summary */}
            <div className="mt-8 rounded-xl bg-white p-6 text-left shadow-sm">
              <h2 className="font-heading text-lg font-semibold text-warmgray-900">
                Zusammenfassung
              </h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-warmgray-500">Tierart</dt>
                  <dd className="font-medium text-warmgray-900 capitalize">
                    {answers.petType}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-warmgray-500">Alter</dt>
                  <dd className="font-medium text-warmgray-900">
                    {answers.age === 'puppy'
                      ? 'Welpe/Kitten'
                      : answers.age === 'adult'
                        ? 'Erwachsen'
                        : 'Senior'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-warmgray-500">Aktivität</dt>
                  <dd className="font-medium text-warmgray-900">
                    {answers.activity === 'low'
                      ? 'Wenig aktiv'
                      : answers.activity === 'moderate'
                        ? 'Normal aktiv'
                        : 'Sehr aktiv'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-warmgray-500">Futtervorlieben</dt>
                  <dd className="font-medium text-warmgray-900">
                    {answers.preferences
                      .map((p) =>
                        p === 'wet'
                          ? 'Nassfutter'
                          : p === 'dry'
                            ? 'Trockenfutter'
                            : p === 'mixed'
                              ? 'Mischfütterung'
                              : 'Snacks'
                      )
                      .join(', ')}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 ? (
              <div className="mt-12">
                <h2 className="heading-3 text-warmgray-900">
                  Unsere Empfehlungen
                </h2>
                <div className="mt-8 product-grid">
                  {recommendations.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-12 rounded-xl bg-white p-8 text-center">
                <p className="text-warmgray-600">
                  Leider haben wir keine passenden Produkte gefunden. Schau dir
                  unser gesamtes Sortiment an!
                </p>
                <Button asChild className="mt-4">
                  <a href="/produkte">Alle Produkte ansehen</a>
                </Button>
              </div>
            )}

            {/* Restart */}
            <Button
              variant="outline"
              onClick={resetQuiz}
              className="mt-8"
            >
              <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
              Quiz wiederholen
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-cream to-secondary-50 py-12">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-warmgray-600">
              <span>
                Schritt {currentStep + 1} von {activeSteps.length}
              </span>
              <span>{Math.round(progress)}% abgeschlossen</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-warmgray-200">
              <motion.div
                className="h-full rounded-full bg-primary-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuizStep.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-white p-8 shadow-lg"
            >
              <h1 className="heading-3 text-center text-warmgray-900">
                {getQuestion(currentQuizStep.question)}
              </h1>

              <div className="mt-8">
                {/* Single Select */}
                {currentQuizStep.type === 'single' && currentQuizStep.options && (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {currentQuizStep.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSingleSelect(option.value)}
                        className={`flex flex-col items-center rounded-xl border-2 p-4 transition-all ${
                          answers[currentQuizStep.id as keyof QuizAnswers] ===
                          option.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-warmgray-200 hover:border-warmgray-300'
                        }`}
                      >
                        {option.icon && (
                          <div className="mb-2 text-primary-600">
                            {option.icon}
                          </div>
                        )}
                        <span className="font-medium text-warmgray-900">
                          {option.label}
                        </span>
                        {answers[currentQuizStep.id as keyof QuizAnswers] ===
                          option.value && (
                          <Check
                            className="mt-2 h-5 w-5 text-primary-600"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Multiple Select */}
                {currentQuizStep.type === 'multiple' &&
                  currentQuizStep.options && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {currentQuizStep.options.map((option) => {
                        const values = answers[
                          currentQuizStep.id as keyof QuizAnswers
                        ] as string[]
                        const isSelected = values.includes(option.value)

                        return (
                          <button
                            key={option.value}
                            onClick={() => handleMultipleSelect(option.value)}
                            className={`flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                              isSelected
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-warmgray-200 hover:border-warmgray-300'
                            }`}
                          >
                            <span className="font-medium text-warmgray-900">
                              {option.label}
                            </span>
                            {isSelected && (
                              <Check
                                className="h-5 w-5 text-primary-600"
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}

                {/* Text Input */}
                {currentQuizStep.type === 'text' && (
                  <Input
                    type="text"
                    placeholder="Name eingeben..."
                    value={
                      answers[currentQuizStep.id as keyof QuizAnswers] as string
                    }
                    onChange={(e) => handleTextInput(e.target.value)}
                    className="text-center text-lg"
                  />
                )}
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                  Zurück
                </Button>

                <Button onClick={nextStep} disabled={!canProceed()}>
                  {currentStep === activeSteps.length - 1
                    ? 'Ergebnis anzeigen'
                    : 'Weiter'}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

