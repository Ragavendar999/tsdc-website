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
  occupation: string
  appointmentDate: string
  appointmentTime: string
  message: string
}

const ContactPopupContext = createContext<ContactPopupContextValue | null>(null)

const programOptions = [
  'Graphic Design',
  'UI/UX Design',
  'Digital Marketing',
  'Video Editing',
  'Motion Graphics',
]

const occupationOptions = [
  'Student',
  'Working Professional',
  'Freelancer',
  'Business Owner',
  'Homemaker',
  'Career Break / Job Seeker',
  'Other',
]

const joiningOptions = [
  'Immediately',
  'Within a month',
  'Just enquiry',
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
  occupation: '',
  appointmentDate: '',
  appointmentTime: '',
  message: '',
}

const inputClass =
  'w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#3244b5] focus:ring-2 focus:ring-[#3244b5]/10 placeholder:text-[#94a3b8]'

const selectClass =
  'w-full appearance-none rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#3244b5] focus:ring-2 focus:ring-[#3244b5]/10'

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-[#64748b]">
      {children}
    </span>
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

const stepLabels = ['Your details', 'Your goal', 'Next step']
const today = new Date().toISOString().split('T')[0]

export function ContactPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const [selectedProgram, setSelectedProgram] = useState('')
  const [joiningTimeline, setJoiningTimeline] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [stepError, setStepError] = useState('')
  const [requestError, setRequestError] = useState('')
  const [formState, setFormState] = useState<EnquiryFormState>(initialFormState)

  const requiresScheduling = useMemo(() => needsScheduledCallback(options), [options])

  const resetState = useCallback((interest = '', keepSubmitted = false) => {
    setLoading(false)
    setSubmitted(keepSubmitted)
    setCurrentStep(1)
    setStepError('')
    setRequestError('')
    setFormState(initialFormState)
    setSelectedProgram(getProgramFromInterest(interest))
    setJoiningTimeline('')
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
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closePopup, isOpen])

  const updateForm = <K extends keyof EnquiryFormState>(key: K, value: EnquiryFormState[K]) => {
    setFormState((current) => ({ ...current, [key]: value }))
    setStepError('')
    setRequestError('')
  }

  const validateStep = (step: number) => {
    if (step === 1) {
      if (!formState.name.trim()) return 'Please enter your full name.'
      if (!/^[0-9]{10}$/.test(formState.mobile.trim())) return 'Please enter a valid 10-digit WhatsApp number.'
      if (!formState.email.trim()) return 'Please enter your email address.'
      return ''
    }

    if (step === 2) {
      if (!selectedProgram) return 'Please select your program of interest.'
      if (!formState.occupation) return 'Please select your occupation.'
      if (!joiningTimeline) return 'Please tell us when you can join.'
      return ''
    }

    if (step === 3 && requiresScheduling) {
      if (!formState.appointmentDate) return 'Please choose your preferred appointment date.'
      if (!formState.appointmentTime) return 'Please choose your preferred appointment time.'
    }

    return ''
  }

  const goToNextStep = () => {
    const error = validateStep(currentStep)
    if (error) {
      setStepError(error)
      return
    }

    setStepError('')
    setCurrentStep((step) => Math.min(step + 1, 3))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const error = validateStep(3)
    if (error) {
      setStepError(error)
      return
    }

    setLoading(true)
    setRequestError('')

    const formData = new FormData()
    formData.append('source', options.source)
    formData.append('interest', selectedProgram || options.interest)
    formData.append('name', formState.name)
    formData.append('email', formState.email)
    formData.append('mobile', formState.mobile)
    formData.append('occupation', formState.occupation)
    formData.append('joiningTimeline', joiningTimeline)
    formData.append('appointmentDate', formState.appointmentDate)
    formData.append('appointmentTime', formState.appointmentTime)
    formData.append('message', formState.message)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Unable to submit your enquiry right now.')
      }

      window.gtag?.('event', 'conversion', {
        send_to: 'AW-11403134953/GA8iCOS_g5gcEOmPuL0q',
      })

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

      window.setTimeout(() => {
        closePopup()
      }, options.syllabusDownloadUrl ? 2600 : 1800)
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
            className="fixed inset-0 z-[5000] flex items-end justify-center bg-black/60 px-4 pb-0 backdrop-blur-md sm:items-center sm:pb-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closePopup()
              }
            }}
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
              <div className="grid sm:grid-cols-[0.85fr_1.15fr]">
                <div className="relative hidden overflow-hidden bg-[#10163a] p-7 text-white sm:block">
                  <div className="pointer-events-none absolute -left-6 top-8 h-28 w-28 rounded-full bg-[#3244b5]/50 blur-2xl" />
                  <div className="pointer-events-none absolute -right-4 bottom-16 h-24 w-24 rounded-full bg-[#db4b87]/40 blur-2xl" />
                  <div className="pointer-events-none absolute right-8 top-[-1rem] h-16 w-16 rounded-full bg-[#ff9736]/30 blur-xl" />

                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
                      backgroundSize: '20px 20px',
                    }}
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
                        { icon: GraduationCap, text: 'Personalized course guidance' },
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

                    <div className="mt-auto pt-8 text-xs text-white/40">
                      Trusted by students across Chennai who want portfolio-first training and clear career direction.
                    </div>
                  </div>
                </div>

                <div className="relative bg-white p-6 sm:p-7">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#e2e8f0] bg-white text-[#94a3b8] transition hover:border-[#cbd5e1] hover:text-[#475569]"
                    aria-label="Close"
                  >
                    <X size={15} />
                  </button>

                  <div className="mb-5 rounded-[1.3rem] border border-[#e2e8f0] bg-[#f8fbff] p-4 sm:hidden">
                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#3244b5]">
                      <ShieldCheck size={14} />
                      TSDC Admissions
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#475569]">
                      Share your details once and we will help with course choice, fees, and the best next step.
                    </p>
                  </div>

                  <div className="mb-5 pr-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#3244b5]">Enquiry Form</p>
                    <h4 className="mt-1.5 text-2xl font-black text-[#0f172a]">
                      {currentStep === 1 && "Let's start with your details"}
                      {currentStep === 2 && 'Tell us what you want to join'}
                      {currentStep === 3 && (requiresScheduling ? 'Choose your preferred callback slot' : 'Add a note for our admissions team')}
                    </h4>
                    <p className="mt-1 text-sm text-[#64748b]">
                      {currentStep === 1 && 'Step 1 of 3. Basic contact details so we can reach you quickly.'}
                      {currentStep === 2 && 'Step 2 of 3. Help us understand the right course and joining plan for you.'}
                      {currentStep === 3 &&
                        (requiresScheduling
                          ? 'Step 3 of 3. Pick a date and time for a free callback.'
                          : 'Step 3 of 3. Add optional timing or message so we can follow up better.')}
                    </p>
                  </div>

                  <div className="mb-5 grid grid-cols-3 gap-2">
                    {stepLabels.map((label, index) => {
                      const step = index + 1
                      return (
                        <div
                          key={label}
                          className={`rounded-2xl px-3 py-2 text-center text-[11px] font-black uppercase tracking-[0.12em] ${
                            step <= currentStep ? 'bg-[#3244b5] text-white' : 'bg-[#eef2f7] text-[#94a3b8]'
                          }`}
                        >
                          {label}
                        </div>
                      )
                    })}
                  </div>

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

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {currentStep === 1 ? (
                      <div className="space-y-4">
                        <div>
                          <FieldLabel>Full Name</FieldLabel>
                          <input
                            type="text"
                            name="name"
                            placeholder="e.g. Priya Sharma"
                            required
                            value={formState.name}
                            onChange={(e) => updateForm('name', e.target.value)}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <FieldLabel>WhatsApp Number</FieldLabel>
                          <input
                            type="tel"
                            name="mobile"
                            placeholder="10-digit mobile number"
                            required
                            pattern="[0-9]{10}"
                            value={formState.mobile}
                            onChange={(e) => updateForm('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <FieldLabel>Email Address</FieldLabel>
                          <input
                            type="email"
                            name="email"
                            placeholder="you@email.com"
                            required
                            value={formState.email}
                            onChange={(e) => updateForm('email', e.target.value)}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    ) : null}

                    {currentStep === 2 ? (
                      <div className="space-y-4">
                        <div>
                          <FieldLabel>Program Of Interest</FieldLabel>
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
                              <option key={program} value={program}>
                                {program}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <FieldLabel>Your Occupation</FieldLabel>
                          <select
                            name="occupation"
                            required
                            value={formState.occupation}
                            onChange={(e) => updateForm('occupation', e.target.value)}
                            className={selectClass}
                          >
                            <option value="">Select occupation</option>
                            {occupationOptions.map((occupation) => (
                              <option key={occupation} value={occupation}>
                                {occupation}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <FieldLabel>When Can You Join?</FieldLabel>
                          <select
                            name="joiningTimeline"
                            value={joiningTimeline}
                            onChange={(e) => {
                              setJoiningTimeline(e.target.value)
                              setStepError('')
                            }}
                            required
                            className={selectClass}
                          >
                            <option value="">Select your joining plan</option>
                            {joiningOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : null}

                    {currentStep === 3 ? (
                      <div className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <FieldLabel>{requiresScheduling ? 'Preferred Date' : 'Preferred Follow-up Date (optional)'}</FieldLabel>
                            <div className="relative">
                              <Calendar size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                              <input
                                type="date"
                                name="appointmentDate"
                                min={today}
                                required={requiresScheduling}
                                value={formState.appointmentDate}
                                onChange={(e) => updateForm('appointmentDate', e.target.value)}
                                className={`${inputClass} pl-9`}
                              />
                            </div>
                          </div>
                          <div>
                            <FieldLabel>{requiresScheduling ? 'Preferred Time' : 'Preferred Follow-up Time (optional)'}</FieldLabel>
                            <div className="relative">
                              <Clock size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                              <input
                                type="time"
                                name="appointmentTime"
                                required={requiresScheduling}
                                value={formState.appointmentTime}
                                onChange={(e) => updateForm('appointmentTime', e.target.value)}
                                className={`${inputClass} pl-9`}
                              />
                            </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {joiningTimeline === 'Immediately' ? (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className="flex items-start gap-3 rounded-xl border-2 border-[#fed7aa] bg-[#fff7ed] px-4 py-3"
                            >
                              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffedd5] text-[#c2410c]">
                                <IndianRupee size={16} />
                              </span>
                              <p className="text-sm font-semibold text-[#9a3412]">
                                Submit now and receive a <strong>Rs 2,000 discount coupon</strong> by email. It stays valid for 24 hours.
                              </p>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>

                        <div>
                          <FieldLabel>Message (optional)</FieldLabel>
                          <textarea
                            name="message"
                            rows={4}
                            value={formState.message}
                            onChange={(e) => updateForm('message', e.target.value)}
                            placeholder="Tell us what you want to learn, your current level, or any question you want answered."
                            className={inputClass}
                          />
                        </div>

                        {!requiresScheduling ? (
                          <div className="rounded-xl border border-[#dbeafe] bg-[#f8fbff] px-4 py-3 text-sm text-[#475569]">
                            Leave date and time blank if you just want a quick response by call or WhatsApp.
                          </div>
                        ) : null}
                      </div>
                    ) : null}

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

                    <div className="flex flex-col gap-3 sm:flex-row">
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentStep((step) => Math.max(step - 1, 1))
                            setStepError('')
                          }}
                          className="w-full rounded-xl border-[3px] border-[#10163a] bg-white py-3.5 text-sm font-black text-[#10163a] shadow-[4px_4px_0_#10163a] sm:w-auto sm:px-6"
                        >
                          Back
                        </button>
                      ) : null}

                      {currentStep < 3 ? (
                        <motion.button
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            goToNextStep()
                          }}
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
                          className="relative w-full overflow-hidden rounded-xl border-[3px] border-[#10163a] bg-[#3244b5] py-3.5 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition disabled:opacity-60"
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
                      No spam. We only use your details to help with course guidance.
                    </div>

                    <div className="flex justify-center gap-3 text-xs font-semibold text-[#64748b]">
                      <a href="tel:+917358116929" className="inline-flex items-center gap-1 hover:text-[#3244b5]">
                        <PhoneCall size={13} />
                        Call
                      </a>
                      <a href="https://wa.me/917358116929" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#3244b5]">
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

  if (!context) {
    throw new Error('useContactPopup must be used within ContactPopupProvider')
  }

  return context
}
