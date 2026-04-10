'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
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
    () => ({
      openPopup,
      closePopup,
    }),
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
            className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/55 px-4 backdrop-blur-md"
            onClick={closePopup}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-[2.2rem] border-[3px] border-[#10163a] bg-white shadow-[10px_10px_0_#10163a] md:max-h-[86vh]"
            >
              <div className="grid md:max-h-[86vh] md:grid-cols-[0.84fr_1.16fr] md:overflow-hidden">
                <div className="relative overflow-hidden bg-[#3244b5] p-6 text-white md:p-6">
                  <div
                    className="pointer-events-none absolute inset-0 bg-bottom bg-no-repeat opacity-20"
                    style={{ backgroundImage: "url('/contact-students-bg.svg')", backgroundSize: '92% auto' }}
                  />
                  <div className="absolute inset-0 bg-[#3244b5]/76" />
                  <div className="absolute left-[-1.2rem] top-6 h-20 w-20 rounded-[1.5rem] border-[3px] border-[#10163a] bg-[#ff9736] shadow-[5px_5px_0_#10163a]" />
                  <div className="absolute bottom-[-1rem] right-[-0.8rem] h-20 w-20 rounded-full border-[3px] border-[#10163a] bg-[#db4b87] shadow-[5px_5px_0_#10163a]" />
                  <div className="absolute right-10 top-14 h-12 w-12 rounded-full border-[3px] border-[#10163a] bg-[#ffcb53] shadow-[4px_4px_0_#10163a]" />

                  <div className="relative z-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-white px-4 py-2 text-sm font-semibold text-[#10163a] shadow-[4px_4px_0_#10163a]">
                      <Sparkles size={14} className="text-[#ff9736]" />
                      TSDC Admissions
                    </div>
                    <h3 className="max-w-sm text-[1.9rem] font-black leading-[1.05] md:text-[2.2rem]">{options.title}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/88">{options.subtitle}</p>

                    <div className="mt-5 space-y-2.5">
                      {[
                        'Real guidance for the right course',
                        'Schedule a counselling appointment',
                        'Immediate joiners receive a Rs. 2,000 coupon by email',
                      ].map((item, index) => (
                        <div
                          key={item}
                          className="rounded-2xl border-[3px] border-[#10163a] px-4 py-2 text-sm font-semibold shadow-[4px_4px_0_#10163a]"
                          style={{ backgroundColor: index === 0 ? '#fff1dd' : index === 1 ? '#ffffff' : '#fff1f7', color: '#10163a' }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative overflow-y-auto bg-[#fff8ed] p-6 md:max-h-[86vh] md:p-6">
                  <button
                    onClick={closePopup}
                    className="absolute right-4 top-4 rounded-xl border-[3px] border-[#10163a] bg-white p-2 text-[#667085] shadow-[3px_3px_0_#10163a] transition hover:bg-gray-50 hover:text-gray-700"
                    aria-label="Close contact form"
                  >
                    <X size={18} />
                  </button>

                  <div className="mb-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3244b5]">
                      Contact Form
                    </p>
                    <h4 className="mt-2 text-[1.7rem] font-black text-[#0f172a]">Tell us about your goal</h4>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="w-full rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#4562b0]"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        className="w-full rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#4562b0]"
                      />
                    </div>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      required
                      pattern="[0-9]{10}"
                      className="w-full rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#4562b0]"
                    />
                    <input type="hidden" name="source" value={options.source} />
                    <input type="hidden" name="interest" value={selectedProgram || options.interest} />

                    <div className="grid gap-3 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block min-h-[2.5rem] text-xs font-black uppercase leading-5 tracking-[0.14em] text-[#3244b5]">
                        Program you want to learn
                      </span>
                      <select
                        value={selectedProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        required
                        className="w-full appearance-none rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-semibold text-[#0f172a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#4562b0]"
                      >
                        <option value="">Select a program</option>
                        {programOptions.map((program) => (
                          <option key={program} value={program}>
                            {program}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block min-h-[2.5rem] text-xs font-black uppercase leading-5 tracking-[0.14em] text-[#3244b5]">
                        Your occupation
                      </span>
                      <select
                        name="occupation"
                        required
                        className="w-full appearance-none rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-semibold text-[#0f172a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#4562b0]"
                      >
                        <option value="">Select your occupation</option>
                        {occupationOptions.map((occupation) => (
                          <option key={occupation} value={occupation}>
                            {occupation}
                          </option>
                        ))}
                      </select>
                    </label>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block min-h-[2.5rem] text-xs font-black uppercase leading-5 tracking-[0.14em] text-[#3244b5]">
                        When can you join?
                      </span>
                      <select
                        name="joiningTimeline"
                        value={joiningTimeline}
                        onChange={(e) => setJoiningTimeline(e.target.value)}
                        required
                        className="w-full appearance-none rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-semibold text-[#0f172a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#4562b0]"
                      >
                        <option value="">Select joining plan</option>
                        {joiningOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block min-h-[2.5rem] text-xs font-black uppercase leading-5 tracking-[0.14em] text-[#3244b5]">
                          Appointment date
                        </span>
                        <input
                          type="date"
                          name="appointmentDate"
                          className="w-full rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-semibold text-[#0f172a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#4562b0]"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block min-h-[2.5rem] text-xs font-black uppercase leading-5 tracking-[0.14em] text-[#3244b5]">
                          Appointment time
                        </span>
                        <input
                          type="time"
                          name="appointmentTime"
                          className="w-full rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-semibold text-[#0f172a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#4562b0]"
                        />
                      </label>
                    </div>
                    </div>

                    {joiningTimeline === 'Immediately' && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border-[3px] border-[#10163a] bg-[#fff4eb] px-4 py-3 text-sm font-bold leading-6 text-[#9a4a10] shadow-[4px_4px_0_#10163a]"
                      >
                        Instant admission bonus: submit now and get a Rs. 2,000 discount coupon in your email, valid for 24 hours.
                      </motion.div>
                    )}

                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Tell us what you want to learn or achieve..."
                      className="w-full rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#4562b0]"
                    />

                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-[1rem] border-[3px] border-[#10163a] bg-[#fa8a43] py-3 text-sm font-bold text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-1 hover:bg-[#f47b2f] disabled:opacity-60"
                    >
                      {loading ? 'Sending...' : options.ctaLabel}
                    </motion.button>

                    {submitted && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-sm font-semibold text-green-600"
                      >
                        {options.syllabusDownloadUrl
                          ? 'Thank you. Your syllabus download is starting now.'
                          : "Enquiry sent successfully. We'll contact you soon."}
                      </motion.p>
                    )}
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
