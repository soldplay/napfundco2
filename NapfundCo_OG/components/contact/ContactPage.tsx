'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Check,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const contactInfo = [
  {
    icon: Mail,
    title: 'E-Mail',
    content: 'office@work-force.at',
    href: 'mailto:office@work-force.at',
  },
  {
    icon: Phone,
    title: 'Telefon',
    content: '+43 676 4844169',
    href: 'tel:+436764844169',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    content: 'Napf&Co OG, Donau-City-Straße 7, 32. Stock, 1220 Wien, Österreich',
    href: null,
  },
  {
    icon: Clock,
    title: 'Servicezeiten',
    content: 'Mo-Fr 9:00-18:00 Uhr',
    href: null,
  },
]

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  consent: boolean
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
  consent?: string
}

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  )

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Bitte geben Sie Ihren Namen ein.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Bitte wählen Sie einen Betreff.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Bitte geben Sie Ihre Nachricht ein.'
    } else if (formData.message.length < 20) {
      newErrors.message = 'Ihre Nachricht sollte mindestens 20 Zeichen haben.'
    }

    if (!formData.consent) {
      newErrors.consent = 'Bitte stimmen Sie der Datenschutzerklärung zu.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setStatus('loading')

    // Simulierte API-Anfrage
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setStatus('success')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      consent: false,
    })
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-warmgray-50 py-12 lg:py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center">
          <h1 className="heading-2 text-warmgray-900">Kontakt</h1>
          <p className="body-large mx-auto mt-4 max-w-2xl text-warmgray-600">
            Haben Sie Fragen zu unseren Produkten oder Ihrer Bestellung? Unser
            Team hilft Ihnen gerne weiter.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="rounded-xl bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                <item.icon
                  className="h-6 w-6 text-primary-600"
                  aria-hidden="true"
                />
              </div>
              <h2 className="mt-4 font-semibold text-warmgray-900">
                {item.title}
              </h2>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-1 block text-primary-600 hover:underline"
                >
                  {item.content}
                </a>
              ) : (
                <p className="mt-1 text-warmgray-600">{item.content}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="heading-3 text-warmgray-900">
              Schreiben Sie uns eine Nachricht
            </h2>
            <p className="mt-2 text-warmgray-600">
              Füllen Sie das Formular aus und wir melden uns schnellstmöglich
              bei Ihnen.
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 flex flex-col items-center rounded-xl bg-green-50 p-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-green-900">
                  Nachricht gesendet!
                </h3>
                <p className="mt-2 text-green-700">
                  Vielen Dank für Ihre Nachricht. Wir werden uns innerhalb von
                  24 Stunden bei Ihnen melden.
                </p>
                <Button
                  onClick={() => setStatus('idle')}
                  variant="outline"
                  className="mt-6"
                >
                  Weitere Nachricht senden
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-warmgray-700"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-warmgray-700"
                    >
                      E-Mail <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="ihre@email.de"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-warmgray-700"
                  >
                    Betreff <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`flex h-11 w-full rounded-lg border bg-white px-4 py-2 text-base transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
                      errors.subject
                        ? 'border-red-500'
                        : 'border-warmgray-300'
                    }`}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="produkte">Frage zu Produkten</option>
                    <option value="bestellung">Frage zu meiner Bestellung</option>
                    <option value="rueckgabe">Rückgabe/Widerruf</option>
                    <option value="fuetterung">Beratung zur Fütterung</option>
                    <option value="kooperation">Kooperationsanfrage</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1.5 text-sm text-red-600" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-warmgray-700"
                  >
                    Nachricht <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Wie können wir Ihnen helfen?"
                    className={`flex w-full rounded-lg border bg-white px-4 py-3 text-base transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
                      errors.message
                        ? 'border-red-500'
                        : 'border-warmgray-300'
                    }`}
                    aria-invalid={errors.message ? 'true' : 'false'}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-600" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-warmgray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="consent" className="text-sm text-warmgray-600">
                    Ich habe die{' '}
                    <a
                      href="/datenschutz"
                      className="text-primary-600 underline hover:text-primary-700"
                      target="_blank"
                    >
                      Datenschutzerklärung
                    </a>{' '}
                    gelesen und stimme der Verarbeitung meiner Daten zur
                    Bearbeitung meiner Anfrage zu.{' '}
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.consent && (
                  <p className="text-sm text-red-600" role="alert">
                    {errors.consent}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    'Wird gesendet...'
                  ) : (
                    <>
                      Nachricht senden
                      <Send className="ml-2 h-5 w-5" aria-hidden="true" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-warmgray-500">
                  Wir antworten in der Regel innerhalb von 24 Stunden.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

