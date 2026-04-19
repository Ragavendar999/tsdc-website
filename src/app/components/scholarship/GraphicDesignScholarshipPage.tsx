'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Phone,
  Trophy,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import CountdownTimer from '@/app/components/common/CountdownTimer'
import StickyRailLayout from '@/app/components/common/StickyRailLayout'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

type ScholarshipRazorpayOptions = {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill: { name: string; email: string; contact: string }
  notes: Record<string, string>
  theme: { color: string }
  handler: (response: { razorpay_order_id: string; razorpay_payment_id: string }) => void
  modal: { ondismiss: () => void }
}

type ScholarshipFormState = {
  name: string
  email: string
  phone: string
  city: string
  schoolOrCollege: string
  classLevel: string
  preferredSlot: string
  goals: string
}

const campaignTitle = 'Graphic Design Scholarship and Demo Class 2026'
const campaignSlug = 'graphic-design-scholarship-2026'
const registrationFee = 99

const demoSlots = [
  'April 24, 2026 - 11:00 AM',
  'April 25, 2026 - 4:00 PM',
  'April 26, 2026 - 11:00 AM',
  'April 27, 2026 - 4:00 PM',
]

const processSteps = [
  {
    title: 'Register your slot',
    description: 'Fill the form and pay Rs 99/- to lock your scholarship evaluation spot.',
  },
  {
    title: 'Attend the demo class',
    description: 'Get your slot details and joining instructions on WhatsApp and email.',
  },
  {
    title: 'Take the scholarship test',
    description: 'A guided creative assessment measuring design thinking and curiosity.',
  },
  {
    title: 'Get your result',
    description: 'Scholarship outcome, fee guidance, and next steps directly from TSDC.',
  },
]

const faqs = [
  {
    question: 'What does the Rs 99/- cover?',
    answer: 'It confirms your scholarship registration, demo class slot, and assessment entry for this campaign.',
  },
  {
    question: 'Will I get the scholarship result on the same day?',
    answer: 'We follow up after the demo class and scholarship assessment with your result and admission guidance.',
  },
  {
    question: 'Is this for beginners?',
    answer: 'Yes. The offer is designed for students and beginners who want to build a creative career in graphic design.',
  },
  {
    question: 'Will I get details after I register?',
    answer: 'Yes. Demo class confirmation, exam format, and next-step instructions are sent after payment.',
  },
]

const inputClass =
  'w-full rounded-[0.875rem] border-[2.5px] border-[#10163a]/20 bg-[#f8f9fc] px-4 py-3 text-sm font-semibold text-[#10163a] outline-none transition placeholder:text-[#9ca3af] focus:border-[#3244b5] focus:bg-white focus:ring-4 focus:ring-[#3244b5]/10'

const initialFormState: ScholarshipFormState = {
  name: '',
  email: '',
  phone: '',
  city: '',
  schoolOrCollege: '',
  classLevel: '',
  preferredSlot: demoSlots[0],
  goals: '',
}

export default function GraphicDesignScholarshipPage() {
  const router = useRouter()
  const [formState, setFormState] = useState(initialFormState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [leadId, setLeadId] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const formRef = useRef<HTMLDivElement | null>(null)

  const updateForm = <K extends keyof ScholarshipFormState>(key: K, value: ScholarshipFormState[K]) => {
    setFormState((current) => ({ ...current, [key]: value }))
    setError('')
    setStatusMessage('')
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const validate = () => {
    if (!formState.name.trim()) return 'Please enter your name.'
    if (!formState.email.trim()) return 'Please enter your email address.'
    if (!/^[0-9]{10}$/.test(formState.phone.trim())) return 'Please enter a valid 10-digit WhatsApp number.'
    return ''
  }

  const handlePayment = async () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      scrollToForm()
      return
    }

    setLoading(true)
    setStatusMessage('')

    const leadResponse = await fetch('/api/scholarship/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: leadId || undefined,
        campaignSlug,
        campaignTitle,
        amount: registrationFee,
        student: { ...formState, source: 'meta-ad-graphic-design-scholarship' },
      }),
    })

    const leadPayload = await leadResponse.json()

    if (!leadResponse.ok) {
      setLoading(false)
      setError(leadPayload.error || 'Unable to save your enquiry right now. Please try again.')
      return
    }

    if (leadPayload.leadId) setLeadId(leadPayload.leadId)

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      setLoading(false)
      setError('Unable to load the payment checkout. Please try again.')
      return
    }

    const orderResponse = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: registrationFee,
        masterclassTitle: campaignTitle,
        studentName: formState.name,
      }),
    })

    const orderPayload = await orderResponse.json()

    if (!orderResponse.ok) {
      setLoading(false)
      setError(orderPayload.error || 'Unable to create the payment order right now.')
      return
    }

    const options: ScholarshipRazorpayOptions = {
      key: orderPayload.keyId,
      amount: orderPayload.amount,
      currency: orderPayload.currency,
      name: 'TSDC Scholarship Registration',
      description: campaignTitle,
      order_id: orderPayload.orderId,
      prefill: { name: formState.name, email: formState.email, contact: formState.phone },
      notes: { campaign: campaignTitle, slot: formState.preferredSlot },
      theme: { color: '#ff9736' },
      handler: async (response) => {
        await fetch('/api/scholarship/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId: leadPayload.leadId || leadId || undefined,
            campaignSlug,
            campaignTitle,
            amount: registrationFee,
            student: { ...formState, source: 'meta-ad-graphic-design-scholarship' },
            payment: { orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id },
          }),
        })

        window.gtag?.('event', 'conversion', { send_to: 'AW-11403134953/GA8iCOS_g5gcEOmPuL0q' })
        window.fbq?.('track', 'Purchase', { currency: 'INR', value: registrationFee })

        router.push(
          `/graphic-design-scholarship/success?name=${encodeURIComponent(formState.name)}&slot=${encodeURIComponent(formState.preferredSlot)}`
        )
      },
      modal: {
        ondismiss: () => {
          setLoading(false)
          setStatusMessage(
            'Your details are saved. Our team will follow up on WhatsApp if you need help completing the payment.'
          )
        },
      },
    }

    const Razorpay = window.Razorpay as unknown as new (
      options: ScholarshipRazorpayOptions
    ) => { open: () => void }
    const razorpay = new Razorpay(options)
    razorpay.open()
    setLoading(false)
  }

  const scholarshipFormCard = (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="space-y-3">
        <CountdownTimer />

      <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-white shadow-[8px_8px_0_#10163a]">
        <div className="rounded-t-[1.7rem] bg-[#10163a] px-6 py-5 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/50">One-time registration fee</p>
          <p className="mt-1 text-6xl font-black tracking-[-0.08em] text-[#ff9736]">Rs 99/-</p>
          <p className="mt-1.5 text-xs font-semibold text-white/65">Demo class + scholarship evaluation included</p>
        </div>

        <div className="p-6">
          <div className="grid gap-4">
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-[#667085]">Your name</span>
              <input
                type="text"
                autoComplete="name"
                value={formState.name}
                onChange={(event) => updateForm('name', event.target.value)}
                placeholder="Full name"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-[#667085]">WhatsApp number</span>
              <input
                type="tel"
                pattern="[0-9]{10}"
                autoComplete="tel"
                value={formState.phone}
                onChange={(event) => updateForm('phone', event.target.value)}
                placeholder="10-digit mobile number"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-[#667085]">Email address</span>
              <input
                type="email"
                autoComplete="email"
                value={formState.email}
                onChange={(event) => updateForm('email', event.target.value)}
                placeholder="your@email.com"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-[#667085]">Pick a demo class slot</span>
              <select
                value={formState.preferredSlot}
                onChange={(event) => updateForm('preferredSlot', event.target.value)}
                className={inputClass}
              >
                {demoSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {error ? (
            <div className="mt-4 rounded-[0.875rem] border-2 border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm font-bold text-[#b42318]">
              {error}
            </div>
          ) : null}

          {statusMessage ? (
            <div className="mt-4 rounded-[0.875rem] border-2 border-[#bfdbfe] bg-[#eff6ff] px-4 py-3 text-sm font-bold text-[#1570ef]">
              {statusMessage}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-5 py-4 text-base font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? 'Preparing payment...' : 'Pay Rs 99/- · Reserve My Slot'}
            {!loading ? <ArrowRight size={18} /> : null}
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {['Instant WhatsApp confirmation', 'Safe Razorpay checkout'].map((item) => (
              <span key={item} className="flex items-center gap-1 text-[11px] font-semibold text-[#667085]">
                <CheckCircle2 size={11} className="text-[#16a34a]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  )

  return (
    <main className="min-h-screen bg-[#fffdf9] pb-24 text-[#10163a] sm:pb-0">
      <section className="relative overflow-x-hidden px-4 pb-20 pt-10 md:px-8 md:pt-14">
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(16,22,58,0.055)_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[#ff9736]/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] translate-x-1/3 -translate-y-1/4 rounded-full bg-[#3244b5]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              aria-label="TSDC home"
              className="inline-flex items-center rounded-full border-[3px] border-[#10163a] bg-white px-4 py-2 shadow-[5px_5px_0_rgba(16,22,58,0.18)] transition hover:-translate-y-0.5"
            >
              <Image src="/logo.png" alt="TSDC" width={112} height={36} priority className="h-9 w-auto" />
            </Link>
            <a
              href="https://wa.me/917358116929"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-white px-4 py-2 text-sm font-black text-[#10163a] shadow-[4px_4px_0_rgba(16,22,58,0.12)] transition hover:-translate-y-0.5"
            >
              <MessageCircle size={14} />
              Ask on WhatsApp
            </a>
          </div>

          <StickyRailLayout
            sidebar={scholarshipFormCard}
            className="lg:gap-14"
            contentClassName="space-y-6"
            desktopGridClassName="lg:grid-cols-[minmax(0,1fr)_400px]"
            desktopSidebarWidthClassName="lg:w-[400px]"
            desktopSidebarTopClassName="lg:top-28"
          >
            <div className="pt-2">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="inline-flex items-center gap-2 rounded-full border-[2px] border-[#fa8a43]/40 bg-[#fff4eb] px-4 py-2">
                  <Trophy size={13} className="text-[#fa8a43]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#c45e1a]">
                    Scholarship 2026 · Limited Seats
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 }}
                className="mt-5 text-[2.8rem] font-black leading-[1.06] tracking-[-0.06em] text-[#10163a] md:text-6xl lg:text-[4.2rem]"
              >
                Learn design.
                <br />
                <span className="text-[#ff9736]">Win a scholarship.</span>
                <br />
                Start at just Rs 99/-.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="mt-5 max-w-lg text-lg font-semibold leading-8 text-[#475467]"
              >
                Attend a free demo class, take the scholarship assessment, and earn up to 100% fee waiver on our Graphic
                Design course.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                {[
                  { pct: '100%', label: 'Top performer', bg: 'bg-[#fef9c3] text-[#713f12] border-[#fde68a]' },
                  { pct: '50%', label: 'Top 10 students', bg: 'bg-[#dcfce7] text-[#14532d] border-[#86efac]' },
                  { pct: '25%', label: 'All selected', bg: 'bg-[#dbeafe] text-[#1e3a8a] border-[#93c5fd]' },
                ].map((tier) => (
                  <div key={tier.pct} className={`flex items-center gap-2 rounded-full border-[2px] px-5 py-2.5 ${tier.bg}`}>
                    <span className="text-xl font-black">{tier.pct}</span>
                    <span className="text-xs font-semibold">{tier.label}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="mt-8 overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] shadow-[8px_8px_0_#10163a]"
              >
                <Image
                  src="/correct%20may%202nd.jpg.jpeg"
                  alt="TSDC Graphic Design Scholarship 2026"
                  width={1200}
                  height={1200}
                  priority
                  className="block h-auto w-full"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.26 }}
                className="mt-7 grid gap-3 sm:grid-cols-3"
              >
                {[
                  { emoji: '🎓', title: 'Free demo class', sub: 'See the course live' },
                  { emoji: '📋', title: 'Scholarship test', sub: 'Creative evaluation' },
                  { emoji: '🏆', title: 'Scholarship result', sub: 'Guidance + next step' },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.4rem] border-[2px] border-[#10163a]/10 bg-white px-4 py-4 shadow-sm">
                    <span className="text-2xl">{item.emoji}</span>
                    <p className="mt-2 text-sm font-black text-[#10163a]">{item.title}</p>
                    <p className="text-xs font-semibold text-[#667085]">{item.sub}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <section className="rounded-[2rem] border-[3px] border-[#10163a] bg-[#f0f4ff] p-6 text-[#10163a] shadow-[7px_7px_0_rgba(0,0,0,0.12)] md:p-8">
              <div className="mb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3244b5]">Simple process</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#10163a]">From registration to result.</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                    className="rounded-[1.75rem] border-[3px] border-[#10163a] bg-white p-5 shadow-[6px_6px_0_#10163a]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-[0.875rem] bg-[#10163a] text-sm font-black text-[#ff9736]">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="mt-4 text-base font-black leading-snug tracking-[-0.02em] text-[#10163a]">{step.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#475467]">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border-[3px] border-[#10163a] bg-white p-6 text-[#10163a] shadow-[7px_7px_0_rgba(0,0,0,0.12)] md:p-8">
              <div className="mb-8">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3244b5]">Questions answered</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#10163a]">Got questions?</h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={faq.question} className="overflow-hidden rounded-[1.4rem] border-[3px] border-[#10163a] bg-white shadow-[4px_4px_0_#10163a]">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      aria-expanded={openFaqIndex === index}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-base font-black text-[#10163a]">{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-[#3244b5] transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaqIndex === index ? (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-sm font-semibold leading-7 text-[#475467]">{faq.answer}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.6rem] border-[3px] border-[#10163a] bg-[#fff4eb] p-5 shadow-[4px_4px_0_#10163a]">
                <p className="text-sm font-semibold text-[#667085]">Still have a question?</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href="tel:+917358116929"
                    className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-white px-6 py-2.5 text-sm font-black text-[#10163a] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                  >
                    <Phone size={14} />
                    Call admissions
                  </a>
                  <a
                    href="https://wa.me/917358116929"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-[#ff9736] px-6 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                  >
                    <MessageCircle size={14} />
                    WhatsApp us
                  </a>
                </div>
              </div>
            </section>
          </StickyRailLayout>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-[1100] border-t-[3px] border-[#10163a] bg-white/95 px-4 py-3 backdrop-blur-xl sm:hidden">
        <button
          type="button"
          onClick={scrollToForm}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-5 py-4 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
        >
          Reserve Your Slot — Rs 99/-
          <ArrowRight size={16} />
        </button>
      </div>
    </main>
  )
}
