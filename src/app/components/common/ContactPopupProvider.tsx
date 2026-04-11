'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, CheckCircle2, Clock, Sparkles, X } from 'lucide-react'
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

const getProgramFromInterest = (interest?: string) => {
  if (!interest) return ''
  const normalizedInterest = interest.toLowerCase()
  return programOptions.find((program) => normalizedInterest.includes(program.toLowerCase())) || ''
}

const defaultOptions: Required<ContactPopupOptions> = {
  title: "Let's Build Your Career",
  subtitle: 'Share your details and our team will contact you shortly with the right guidance.',
  interest: '',
  source: 'website-popup',
  ctaLabel: 'Send Enquiry',
  syllabusDownloadUrl: '',
  syllabusFileName: 'tsdc-syllabus.pdf',
}

const inputClass =
  'w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#3244b5] focus:ring-2 focus:ring-[#3244b5]/10 placeholder:text-[#94a3b8]'

const selectClass =
  'w-full appearance-none rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#3244b5] focus:ring-2 focus:ring-[#3244b5]/10'

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-1.5 block text-[11px] font-bold text-[#64748b] uppercase tracking-wide">
      {children}
    </span>
  )
}

export function ContactPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const [selectedProgram, setSelectedProgram] = useState('')
  const [joiningTimeline, setJoiningTimeline] = useState('')

  const closePopup = useCallback(() => {
    setIsOpen(false)
    setLoading(false)
    setSubmitted(false)
  }, [])

  const openPopup = useCallback((nextOptions?: ContactPopupOptions) => {
    const mergedOptions = { ...defaultOptions, ...nextOptions }
    setOptions(mergedOptions)
    setSelectedProgram(getProgramFromInterest(mergedOptions.interest))
    setJoiningTimeline('')
    setSubmitted(false)
    setIsOpen(true)
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    })

    setLoading(false)

    if (response.ok) {
      window.gtag?.('event', 'conversion', {
        send_to: 'AW-11403134953/GA8iCOS_g5gcEOmPuL0q',
      })

      setSubmitted(true)
      form.reset()

      if (options.syllabusDownloadUrl) {
        const downloadLink = document.createElement('a')
        downloadLink.href = options.syllabusDownloadUrl
        downloadLink.download = options.syllabusFileName
        document.body.appendChild(downloadLink)
        downloadLink.click()
        downloadLink.remove()
      }

      setTimeout(() => {
        closePopup()
      }, options.syllabusDownloadUrl ? 2600 : 1800)
    } else {
      alert('Failed to send enquiry. Please try again.')
    }
  }

  const value = useMemo(
    () => ({ openPopup, closePopup }),
    [openPopup, closePopup]
  )

  return (
    <ContactPopupContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] flex items-end justify-center bg-black/60 px-4 pb-0 backdrop-blur-md sm:items-center sm:pb-4"
            onClick={closePopup}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[920px] overflow-hidden rounded-t-[2rem] rounded-b-none border-[3px] border-[#10163a] bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.25)] sm:rounded-[2rem] sm:shadow-[10px_10px_0_#10163a]"
            >
              <div className="grid sm:grid-cols-[0.85fr_1.15fr]">

                {/* ── Left panel ── */}
                <div className="relative hidden overflow-hidden bg-[#10163a] p-7 text-white sm:block">
                  {/* Decorative blobs */}
                  <div className="pointer-events-none absolute -left-6 top-8 h-28 w-28 rounded-full bg-[#3244b5]/50 blur-2xl" />
                  <div className="pointer-events-none absolute -right-4 bottom-16 h-24 w-24 rounded-full bg-[#db4b87]/40 blur-2xl" />
                  <div className="pointer-events-none absolute right-8 top-[-1rem] h-16 w-16 rounded-full bg-[#ff9736]/30 blur-xl" />

                  {/* Dot grid */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
                      backgroundSize: '20px 20px',
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    {/* Badge */}
                    <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#ffffff30] bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                      <Sparkles size={13} className="text-[#ff9736]" />
                      TSDC Admissions
                    </div>

                    {/* Title */}
                    <h3 className="text-[1.85rem] font-black leading-[1.1] text-white">
                      {options.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {options.subtitle}
                    </p>

                    {/* Benefit cards */}
                    <div className="mt-6 space-y-2.5">
                      {[
                        { icon: '🎯', text: 'Personalized course guidance' },
                        { icon: '📅', text: 'Schedule a free counselling call' },
                        { icon: '🎁', text: 'Immediate joiners get ₹2,000 off' },
                      ].map((item) => (
                        <div
                          key={item.text}
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur-sm"
                        >
                          <span className="text-base">{item.icon}</span>
                          {item.text}
                        </div>
                      ))}
                    </div>

                    {/* Bottom accent */}
                    <div className="mt-auto pt-8 text-xs text-white/40">
                      Trusted by 500+ students in Chennai
                    </div>
                  </div>
                </div>

                {/* ── Right panel ── */}
                <div className="relative max-h-[85vh] overflow-y-auto bg-white p-6 sm:max-h-[88vh] sm:p-7">
                  {/* Close button */}
                  <button
                    onClick={closePopup}
                    className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#e2e8f0] bg-white text-[#94a3b8] transition hover:border-[#cbd5e1] hover:text-[#475569]"
                    aria-label="Close"
                  >
                    <X size={15} />
                  </button>

                  {/* Form header */}
                  <div className="mb-5 pr-8">
                    <p className="text-xs font-bold text-[#3244b5] uppercase tracking-widest">
                      Enquiry Form
                    </p>
                    <h4 className="mt-1.5 text-2xl font-black text-[#0f172a]">
                      Tell us about your goal
                    </h4>
                    <p className="mt-1 text-sm text-[#64748b]">
                      Fill in your details — we'll reach out within a few hours.
                    </p>
                  </div>

                  {/* Success state */}
                  <AnimatePresence>
                    {submitted && (
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
                              ? 'Enquiry received! Your syllabus download is starting.'
                              : 'Enquiry sent successfully!'}
                          </p>
                          <p className="mt-0.5 text-xs text-[#4ade80]">
                            Our team will contact you within a few hours.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="source" value={options.source} />
                    <input type="hidden" name="interest" value={selectedProgram || options.interest} />

                    {/* Row 1: Name + Email */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <FieldLabel>Full Name</FieldLabel>
                        <input
                          type="text"
                          name="name"
                          placeholder="e.g. Priya Sharma"
                          required
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
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Row 2: Mobile */}
                    <div>
                      <FieldLabel>Mobile Number</FieldLabel>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="10-digit mobile number"
                        required
                        pattern="[0-9]{10}"
                        className={inputClass}
                      />
                    </div>

                    {/* Row 3: Program + Occupation */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <FieldLabel>Program of Interest</FieldLabel>
                        <select
                          value={selectedProgram}
                          onChange={(e) => setSelectedProgram(e.target.value)}
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
                    </div>

                    {/* Row 4: Joining timeline */}
                    <div>
                      <FieldLabel>When can you join?</FieldLabel>
                      <select
                        name="joiningTimeline"
                        value={joiningTimeline}
                        onChange={(e) => setJoiningTimeline(e.target.value)}
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

                    {/* Row 5: Appointment date + time */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <FieldLabel>Preferred Date</FieldLabel>
                        <div className="relative">
                          <Calendar size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                          <input
                            type="date"
                            name="appointmentDate"
                            className={`${inputClass} pl-9`}
                          />
                        </div>
                      </div>
                      <div>
                        <FieldLabel>Preferred Time</FieldLabel>
                        <div className="relative">
                          <Clock size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                          <input
                            type="time"
                            name="appointmentTime"
                            className={`${inputClass} pl-9`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bonus coupon nudge */}
                    <AnimatePresence>
                      {joiningTimeline === 'Immediately' && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-start gap-3 rounded-xl border-2 border-[#fed7aa] bg-[#fff7ed] px-4 py-3"
                        >
                          <span className="mt-0.5 text-base">🎁</span>
                          <p className="text-sm font-semibold text-[#9a3412]">
                            Submit now and receive a <strong>₹2,000 discount coupon</strong> in your email — valid for 24 hours.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Message */}
                    <div>
                      <FieldLabel>Message (optional)</FieldLabel>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Tell us what you want to learn or achieve..."
                        className={inputClass}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="relative w-full overflow-hidden rounded-xl border-[3px] border-[#10163a] bg-[#3244b5] py-3.5 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition disabled:opacity-60"
                    >
                      {!loading && (
                        <motion.span
                          animate={{ x: ['-120%', '220%'] }}
                          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
                          className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        />
                      )}
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

                    <p className="text-center text-[11px] text-[#94a3b8]">
                      No spam, ever. We only reach out with course info.
                    </p>
                  </form>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
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
