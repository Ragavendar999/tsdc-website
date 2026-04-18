'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  IndianRupee,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { FormEvent, ReactNode } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type ContactPopupOptions = {
  title?: string
  subtitle?: string
  interest?: string
  source?: string
  ctaLabel?: string
  syllabusDownloadUrl?: string
  syllabusFileName?: string
}

type ContactPopupContextValue = {
  openPopup: (options?: ContactPopupOptions) => void
  closePopup: () => void
}

type EnquiryFormState = {
  name: string
  email: string
  mobile: string
  message: string
  appointmentDate: string
  appointmentTime: string
}

type FieldError = Partial<Record<keyof EnquiryFormState, string>>

const ContactPopupContext = createContext<ContactPopupContextValue | null>(null)

const programOptions = [
  'Graphic Design',
  'UI/UX Design',
  'Digital Marketing',
  'Video Editing',
  'Motion Graphics',
]

const defaultOptions: Required<ContactPopupOptions> = {
  title: "Let's Build Your Creative Career",
  subtitle: 'Share your details and our team will contact you shortly with the right guidance.',
  interest: '',
  source: 'website-popup',
  ctaLabel: 'Send Enquiry',
  syllabusDownloadUrl: '',
  syllabusFileName: 'tsdc-syllabus.pdf',
}

const initialFormState: EnquiryFormState = {
  name: '',
  email: '',
  mobile: '',
  message: '',
  appointmentDate: '',
  appointmentTime: '',
}

const inputClass =
  'w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#3244b5] focus:ring-2 focus:ring-[#3244b5]/30 placeholder:text-[#94a3b8]'

const selectClass =
  'w-full appearance-none rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#3244b5] focus:ring-2 focus:ring-[#3244b5]/30'

function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-[#64748b]">
      {children}
      {required && <span className="ml-0.5 text-[#e11d48]">*</span>}
    </span>
  )
}

function FieldErrorMsg({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1 text-[11px] font-semibold text-[#e11d48]">{message}</p>
  )
}

const getProgramFromInterest = (interest?: string) => {
  if (!interest) return ''
  const normalizedInterest = interest.toLowerCase()
  return programOptions.find((program) => normalizedInterest.includes(program.toLowerCase())) || ''
}

const needsScheduledCallback = (options: ContactPopupOptions) => {
  const combined = `${options.title ?? ''} ${options.subtitle ?? ''} ${options.interest ?? ''} ${options.source ?? ''}`.toLowerCase()
  return ['counselling', 'session', 'appointment', 'callback', 'call'].some((keyword) => combined.includes(keyword))
}

const today = new Date().toISOString().split('T')[0]

// Mobile trust signals shown above form
const mobileTrustItems = [
  { icon: GraduationCap, text: 'Personalised guidance' },
  { icon: IndianRupee, text: 'EMI options available' },
  { icon: ShieldCheck, text: 'No spam, ever' },
]

export function ContactPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const [selectedProgram, setSelectedProgram] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [stepError, setStepError] = useState('')
  const [requestError, setRequestError] = useState('')
  const [formState, setFormState] = useState<EnquiryFormState>(initialFormState)
  const [fieldErrors, setFieldErrors] = useState<FieldError>({})
  const [touchedFields, setTouchedFields] = useState<Set<keyof EnquiryFormState>>(new Set())

  const requiresScheduling = useMemo(() => needsScheduledCallback(options), [options])
  // Total steps: 2 for scheduling (details → slot), 1 for general enquiry
  const totalSteps = requiresScheduling ? 2 : 1

  const resetState = useCallback((interest = '', keepSubmitted = false) => {
    setLoading(false)
    setSubmitted(keepSubmitted)
    setCurrentStep(1)
    setStepError('')
    setRequestError('')
    setFormState(initialFormState)
    setFieldErrors({})
    setTouchedFields(new Set())
    setSelectedProgram(getProgramFromInterest(interest))
  }, [])

  const closePopup = useCallback(() => {
    setIsOpen(false)
    resetState()
  }, [resetState])

  const openPopup = useCallback((nextOptions?: ContactPopupOptions) => {
    const mergedOptions = { ...defaultOptions, ...nextOptions }
    setOptions(mergedOptions)
    resetState(mergedOptions.interest)
    setIsOpen(true)
  }, [resetState])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (isOpen) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePopup()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closePopup, isOpen])

  const updateForm = <K extends keyof EnquiryFormState>(key: K, value: EnquiryFormState[K]) => {
    setFormState((current) => ({ ...current, [key]: value }))
    setStepError('')
    setRequestError('')
    // Clear per-field error as user types
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  const validateField = (key: keyof EnquiryFormState, value: string): string => {
    if (key === 'name' && !value.trim()) return 'Please enter your full name.'
    if (key === 'mobile' && !/^[0-9]{10}$/.test(value.trim())) return 'Please enter a valid 10-digit WhatsApp number.'
    if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address.'
    return ''
  }

  const handleBlur = (key: keyof EnquiryFormState) => {
    setTouchedFields((prev) => new Set(prev).add(key))
    const error = validateField(key, formState[key])
    setFieldErrors((prev) => ({ ...prev, [key]: error || undefined }))
  }

  const validateStep = (step: number): string => {
    if (step === 1) {
      if (!formState.name.trim()) return 'Please enter your full name.'
      if (!/^[0-9]{10}$/.test(formState.mobile.trim())) return 'Please enter a valid 10-digit WhatsApp number.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) return 'Please enter a valid email address.'
      if (!selectedProgram) return 'Please select your program of interest.'
      return ''
    }
    if (step === 2 && requiresScheduling) {
      if (!formState.appointmentDate) return 'Please choose your preferred callback date.'
      if (!formState.appointmentTime) return 'Please choose your preferred callback time.'
    }
    return ''
  }

  const goToNextStep = () => {
    const error = validateStep(currentStep)
    if (error) { setStepError(error); return }
    setStepError('')
    setCurrentStep((step) => Math.min(step + 1, totalSteps))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const error = validateStep(currentStep)
    if (error) { setStepError(error); return }

    setLoading(true)
    setRequestError('')

    const formData = new FormData()
    formData.append('source', options.source)
    formData.append('interest', selectedProgram || options.interest)
    formData.append('name', formState.name)
    formData.append('email', formState.email)
    formData.append('mobile', formState.mobile)
    formData.append('occupation', '')
    formData.append('joiningTimeline', '')
    formData.append('appointmentDate', formState.appointmentDate)
    formData.append('appointmentTime', formState.appointmentTime)
    formData.append('message', formState.message)

    try {
      const response = await fetch('/api/contact', { method: 'POST', body: formData })
      if (!response.ok) throw new Error('Unable to submit your enquiry right now.')

      window.gtag?.('event', 'conversion', { send_to: 'AW-11403134953/GA8iCOS_g5gcEOmPuL0q' })
      setSubmitted(true)

      if (options.syllabusDownloadUrl) {
        const downloadLink = document.createElement('a')
        downloadLink.href = options.syllabusDownloadUrl
        downloadLink.download = options.syllabusFileName
        document.body.appendChild(downloadLink)
        downloadLink.click()
        downloadLink.remove()
      }

      resetState(options.interest, true)
      window.setTimeout(() => closePopup(), options.syllabusDownloadUrl ? 2600 : 1800)
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'Unable to submit your enquiry right now.')
    } finally {
      setLoading(false)
    }
  }

  const value = useMemo(() => ({ openPopup, closePopup }), [openPopup, closePopup])

  return (
    <ContactPopupContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] flex items-end justify-center bg-black/60 px-0 pb-0 backdrop-blur-md sm:items-center sm:px-4 sm:pb-4"
            onClick={(e) => { if (e.target === e.currentTarget) closePopup() }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={options.title}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[920px] overflow-hidden rounded-t-[2rem] rounded-b-none border-[3px] border-[#10163a] bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.25)] sm:rounded-[2rem] sm:shadow-[10px_10px_0_#10163a]"
            >
              {/* Mobile drag handle */}
              <div className="flex justify-center pb-1 pt-3 sm:hidden">
                <div className="h-1 w-10 rounded-full bg-[#10163a]/20" />
              </div>

              <div className="grid sm:grid-cols-[0.85fr_1.15fr]">
                {/* LEFT SIDEBAR — desktop only */}
                <div className="relative hidden overflow-hidden bg-[#10163a] p-7 text-white sm:block">
                  <div className="pointer-events-none absolute -left-6 top-8 h-28 w-28 rounded-full bg-[#3244b5]/50 blur-2xl" />
                  <div className="pointer-events-none absolute -right-4 bottom-16 h-24 w-24 rounded-full bg-[#db4b87]/40 blur-2xl" />
                  <div className="pointer-events-none absolute right-8 top-[-1rem] h-16 w-16 rounded-full bg-[#ff9736]/30 blur-xl" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#ffffff30] bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                      <Sparkles size={13} className="text-[#ff9736]" />
                      TSDC Admissions
                    </div>

                    <h3 className="text-[1.85rem] font-black leading-[1.1] text-white">{options.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">{options.subtitle}</p>

                    <div className="mt-6 space-y-2.5">
                      {[
                        { icon: GraduationCap, text: 'Personalised course guidance' },
                        { icon: PhoneCall, text: requiresScheduling ? 'Choose a callback slot that suits you' : 'Get a response from admissions quickly' },
                        { icon: IndianRupee, text: 'EMI, batch timing, and fee-plan clarity' },
                      ].map((item) => {
                        const Icon = item.icon
                        return (
                          <div
                            key={item.text}
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur-sm"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                              <Icon size={16} />
                            </span>
                            {item.text}
                          </div>
                        )
                      })}
                    </div>

                    {/* Early-action incentive — always visible in sidebar */}
                    <div className="mt-5 rounded-xl border border-[#ff9736]/30 bg-[#ff9736]/10 px-4 py-3">
                      <p className="text-xs font-black text-[#ff9736]">Early decision benefit</p>
                      <p className="mt-1 text-sm text-white/80">Students who submit this week may receive a <strong>₹2,000 discount</strong> on course fees.</p>
                    </div>

                    <div className="mt-auto pt-8 text-xs text-white/40">
                      Trusted by students across Chennai who want portfolio-first training and clear career direction.
                    </div>
                  </div>
                </div>

                {/* RIGHT — form */}
                <div className="relative bg-white p-5 sm:p-7">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#e2e8f0] bg-white text-[#94a3b8] transition hover:border-[#10163a] hover:text-[#10163a]"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>

                  {/* Mobile trust signals */}
                  <div className="mb-4 flex flex-wrap gap-3 sm:hidden">
                    {mobileTrustItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <div key={item.text} className="flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fbff] px-3 py-1.5 text-[11px] font-semibold text-[#475569]">
                          <Icon size={11} className="text-[#3244b5]" />
                          {item.text}
                        </div>
                      )
                    })}
                  </div>

                  {/* Step header */}
                  <div className="mb-5 pr-8">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#3244b5]">Enquiry Form</p>
                      {totalSteps > 1 && (
                        <span className="rounded-full bg-[#eef3ff] px-2 py-0.5 text-[10px] font-black text-[#3244b5]">
                          {currentStep} of {totalSteps}
                        </span>
                      )}
                    </div>
                    <h4 className="mt-1.5 text-xl font-black text-[#0f172a] sm:text-2xl">
                      {currentStep === 1 && (totalSteps === 1 ? 'Share your details' : 'Your details')}
                      {currentStep === 2 && 'Choose your callback slot'}
                    </h4>
                    <p className="mt-1 text-sm text-[#64748b]">
                      {currentStep === 1 && totalSteps === 1 && 'Our admissions team will reach out with course details and batch info.'}
                      {currentStep === 1 && totalSteps === 2 && 'Step 1 of 2 — Contact details and program of interest.'}
                      {currentStep === 2 && 'Step 2 of 2 — Pick a date and time for a free callback.'}
                    </p>
                  </div>

                  {/* Step progress bar (only for scheduling mode) */}
                  {totalSteps > 1 && (
                    <div className="mb-5 grid grid-cols-2 gap-2">
                      {(['Your details', 'Book a slot'] as const).map((label, index) => {
                        const step = index + 1
                        const isDone = step < currentStep
                        const isCurrent = step === currentStep
                        return (
                          <div
                            key={label}
                            className={`rounded-2xl px-3 py-2 text-center text-[11px] font-black uppercase tracking-[0.12em] transition-colors ${
                              isDone
                                ? 'bg-[#10163a] text-white'
                                : isCurrent
                                  ? 'bg-[#3244b5] text-white ring-2 ring-[#3244b5]/30 ring-offset-1'
                                  : 'bg-[#eef2f7] text-[#94a3b8]'
                            }`}
                          >
                            {isDone ? '✓ ' : ''}{label}
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Success state */}
                  <AnimatePresence>
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mb-4 flex items-start gap-3 rounded-2xl border-2 border-[#bbf7d0] bg-[#f0fdf4] px-5 py-4"
                      >
                        <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#16a34a]" />
                        <div>
                          <p className="text-sm font-bold text-[#15803d]">
                            {options.syllabusDownloadUrl
                              ? 'Enquiry received. Your syllabus download is starting.'
                              : 'Enquiry sent successfully.'}
                          </p>
                          <p className="mt-0.5 text-xs text-[#4b7a5a]">Our admissions team will contact you shortly.</p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* STEP 1 — details + program (always) */}
                    {currentStep === 1 ? (
                      <div className="space-y-3.5">
                        <div>
                          <FieldLabel required>Full Name</FieldLabel>
                          <input
                            type="text"
                            name="name"
                            placeholder="e.g. Priya Sharma"
                            required
                            value={formState.name}
                            onChange={(e) => updateForm('name', e.target.value)}
                            onBlur={() => handleBlur('name')}
                            className={`${inputClass} ${fieldErrors.name ? 'border-[#fca5a5] focus:border-[#e11d48]' : ''}`}
                          />
                          <FieldErrorMsg message={fieldErrors.name} />
                        </div>

                        <div>
                          <FieldLabel required>WhatsApp Number</FieldLabel>
                          <input
                            type="tel"
                            name="mobile"
                            placeholder="10-digit mobile number"
                            required
                            pattern="[0-9]{10}"
                            value={formState.mobile}
                            onChange={(e) => updateForm('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                            onBlur={() => handleBlur('mobile')}
                            className={`${inputClass} ${fieldErrors.mobile ? 'border-[#fca5a5] focus:border-[#e11d48]' : ''}`}
                          />
                          <FieldErrorMsg message={fieldErrors.mobile} />
                        </div>

                        <div>
                          <FieldLabel required>Email Address</FieldLabel>
                          <input
                            type="email"
                            name="email"
                            placeholder="you@email.com"
                            required
                            value={formState.email}
                            onChange={(e) => updateForm('email', e.target.value)}
                            onBlur={() => handleBlur('email')}
                            className={`${inputClass} ${fieldErrors.email ? 'border-[#fca5a5] focus:border-[#e11d48]' : ''}`}
                          />
                          <FieldErrorMsg message={fieldErrors.email} />
                        </div>

                        <div>
                          <FieldLabel required>Program of Interest</FieldLabel>
                          <select
                            value={selectedProgram}
                            onChange={(e) => {
                              setSelectedProgram(e.target.value)
                              setStepError('')
                            }}
                            required
                            className={selectClass}
                          >
                            <option value="">Select a program</option>
                            {programOptions.map((program) => (
                              <option key={program} value={program}>{program}</option>
                            ))}
                          </select>
                        </div>

                        {/* Message shown on single-step forms (non-scheduling) */}
                        {totalSteps === 1 && (
                          <div>
                            <FieldLabel>Message <span className="font-normal normal-case text-[#94a3b8]">(optional)</span></FieldLabel>
                            <textarea
                              name="message"
                              rows={3}
                              value={formState.message}
                              onChange={(e) => updateForm('message', e.target.value)}
                              placeholder="Tell us what you want to learn, your current level, or any question for admissions."
                              className={inputClass}
                            />
                          </div>
                        )}
                      </div>
                    ) : null}

                    {/* STEP 2 — callback slot (scheduling mode only) */}
                    {currentStep === 2 && requiresScheduling ? (
                      <div className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <FieldLabel required>Preferred Date</FieldLabel>
                            <div className="relative">
                              <Calendar size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                              <input
                                type="date"
                                name="appointmentDate"
                                min={today}
                                required
                                value={formState.appointmentDate}
                                onChange={(e) => updateForm('appointmentDate', e.target.value)}
                                className={`${inputClass} pl-9`}
                              />
                            </div>
                          </div>
                          <div>
                            <FieldLabel required>Preferred Time</FieldLabel>
                            <div className="relative">
                              <Clock size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                              <select
                                name="appointmentTime"
                                required
                                value={formState.appointmentTime}
                                onChange={(e) => updateForm('appointmentTime', e.target.value)}
                                className={`${selectClass} pl-9`}
                              >
                                <option value="">Select a time slot</option>
                                <option value="09:00–10:00">9am – 10am</option>
                                <option value="10:00–11:00">10am – 11am</option>
                                <option value="11:00–12:00">11am – 12pm</option>
                                <option value="12:00–13:00">12pm – 1pm</option>
                                <option value="14:00–15:00">2pm – 3pm</option>
                                <option value="15:00–16:00">3pm – 4pm</option>
                                <option value="16:00–17:00">4pm – 5pm</option>
                                <option value="17:00–18:00">5pm – 6pm</option>
                                <option value="18:00–19:00">6pm – 7pm</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div>
                          <FieldLabel>Message <span className="font-normal normal-case text-[#94a3b8]">(optional)</span></FieldLabel>
                          <textarea
                            name="message"
                            rows={3}
                            value={formState.message}
                            onChange={(e) => updateForm('message', e.target.value)}
                            placeholder="Any specific questions, your current level, or what you want guidance on."
                            className={inputClass}
                          />
                        </div>
                      </div>
                    ) : null}

                    {/* Errors */}
                    {stepError ? (
                      <div className="rounded-xl border-2 border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm font-semibold text-[#b42318]">
                        {stepError}
                      </div>
                    ) : null}
                    {requestError ? (
                      <div className="rounded-xl border-2 border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm font-semibold text-[#b42318]">
                        {requestError}
                      </div>
                    ) : null}

                    {/* Actions */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          onClick={() => { setCurrentStep((s) => Math.max(s - 1, 1)); setStepError('') }}
                          className="w-full rounded-xl border-[3px] border-[#10163a] bg-white py-3.5 text-sm font-black text-[#10163a] shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5 sm:w-auto sm:px-6"
                        >
                          Back
                        </button>
                      ) : null}

                      {currentStep < totalSteps ? (
                        <motion.button
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={(e) => { e.preventDefault(); goToNextStep() }}
                          className="relative w-full overflow-hidden rounded-xl border-[3px] border-[#10163a] bg-[#3244b5] py-3.5 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition"
                        >
                          Next Step
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={loading}
                          className="relative w-full overflow-hidden rounded-xl border-[3px] border-[#10163a] bg-[#ff9736] py-3.5 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition disabled:opacity-60"
                        >
                          {!loading ? (
                            <motion.span
                              animate={{ x: ['-120%', '220%'] }}
                              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
                              className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            />
                          ) : null}
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                              />
                              Sending...
                            </span>
                          ) : (
                            options.ctaLabel
                          )}
                        </motion.button>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-2 text-center text-[11px] text-[#94a3b8]">
                      <ShieldCheck size={14} />
                      No spam. Your details are only used to help with course guidance.
                    </div>

                    <div className="flex justify-center gap-4 text-xs font-semibold text-[#64748b]">
                      <a href="tel:+917358116929" className="inline-flex items-center gap-1 transition hover:text-[#3244b5]">
                        <PhoneCall size={13} />
                        Call us
                      </a>
                      <a href="https://wa.me/917358116929" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition hover:text-[#3244b5]">
                        <MessageCircle size={13} />
                        WhatsApp
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ContactPopupContext.Provider>
  )
}

export function useContactPopup() {
  const context = useContext(ContactPopupContext)
  if (!context) throw new Error('useContactPopup must be used within ContactPopupProvider')
  return context
}
