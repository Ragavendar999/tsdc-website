'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  MapPin,
  MessageCircle,
  Paintbrush,
  Phone,
  Trophy,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

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
  prefill: {
    name: string
    email: string
    contact: string
  }
  notes: Record<string, string>
  theme: {
    color: string
  }
  handler: (response: { razorpay_order_id: string; razorpay_payment_id: string }) => void
  modal: {
    ondismiss: () => void
  }
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

const scholarshipBenefits = [
  '100% scholarship for the top performer',
  'Up to 50% scholarship for the top 10 performers',
  '25% scholarship for all selected participants',
]

const commitmentBadges = [
  'Instant WhatsApp confirmation',
  'Demo class + evaluation access',
  'No prior design experience needed',
]

const processSteps = [
  {
    title: 'Register your slot',
    description: 'Complete the form and pay Rs 99 to lock your scholarship evaluation spot before May 2, 2026.',
  },
  {
    title: 'Attend the demo class',
    description: 'We share your confirmed demo class slot, joining instructions, and the exact exam flow on WhatsApp and email.',
  },
  {
    title: 'Take the scholarship assessment',
    description: 'Attend the guided creative assessment to measure design thinking, curiosity, and learning potential.',
  },
  {
    title: 'Get your result and admission guidance',
    description: 'We send your scholarship outcome, course fee guidance, and the next admission steps directly from TSDC.',
  },
]

const faqs = [
  {
    question: 'What does the Rs 99 cover?',
    answer: 'It confirms your scholarship registration, demo class slot, and assessment entry for this campaign.',
  },
  {
    question: 'Will I get the scholarship result on the same day?',
    answer: 'We follow up after the demo class and scholarship assessment with your result and admission guidance.',
  },
  {
    question: 'Is this for beginners?',
    answer: 'Yes. The page and offer are designed for students and beginners who want to build a creative career in graphic design.',
  },
  {
    question: 'Will details be shared after I register?',
    answer: 'Yes. Demo class confirmation, exam format, and next-step instructions are sent after payment.',
  },
]

const inputClass =
  'w-full rounded-[1rem] border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-semibold text-[#10163a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#3244b5]'

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
    if (!formState.name.trim()) return 'Please enter the student name.'
    if (!formState.email.trim()) return 'Please enter the email address.'
    if (!/^[0-9]{10}$/.test(formState.phone.trim())) return 'Please enter a valid 10-digit phone number.'
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
        student: {
          ...formState,
          source: 'meta-ad-graphic-design-scholarship',
        },
      }),
    })

    const leadPayload = await leadResponse.json()

    if (!leadResponse.ok) {
      setLoading(false)
      setError(leadPayload.error || 'Unable to save the scholarship enquiry right now. Please try again.')
      return
    }

    if (leadPayload.leadId) {
      setLeadId(leadPayload.leadId)
    }

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      setLoading(false)
      setError('Unable to load Razorpay checkout right now. Please try again.')
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
      setError(orderPayload.error || 'Unable to create payment order right now.')
      return
    }

    const options: ScholarshipRazorpayOptions = {
      key: orderPayload.keyId,
      amount: orderPayload.amount,
      currency: orderPayload.currency,
      name: 'TSDC Scholarship Registration',
      description: campaignTitle,
      order_id: orderPayload.orderId,
      prefill: {
        name: formState.name,
        email: formState.email,
        contact: formState.phone,
      },
      notes: {
        campaign: campaignTitle,
        slot: formState.preferredSlot,
      },
      theme: {
        color: '#3244b5',
      },
      handler: async (response) => {
        await fetch('/api/scholarship/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId: leadPayload.leadId || leadId || undefined,
            campaignSlug,
            campaignTitle,
            amount: registrationFee,
            student: {
              ...formState,
              source: 'meta-ad-graphic-design-scholarship',
            },
            payment: {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
            },
          }),
        })

        window.gtag?.('event', 'conversion', {
          send_to: 'AW-11403134953/GA8iCOS_g5gcEOmPuL0q',
        })
        window.fbq?.('track', 'Purchase', { currency: 'INR', value: registrationFee })

        router.push(`/graphic-design-scholarship/success?name=${encodeURIComponent(formState.name)}&slot=${encodeURIComponent(formState.preferredSlot)}`)
      },
      modal: {
        ondismiss: () => {
          setLoading(false)
          setStatusMessage('Student details are saved. If payment is not completed now, your team can still follow up later.')
        },
      },
    }

    const razorpay = new window.Razorpay!(options as never)
    razorpay.open()
    setLoading(false)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#eef2f7] text-[#10163a]">
      <section className="relative overflow-hidden px-4 pb-14 pt-10 md:px-8 md:pb-18 md:pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,151,54,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(50,68,181,0.16),transparent_30%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(16,22,58,0.15)_1px,transparent_0)] [background-size:26px_26px]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2.8rem] border-[3px] border-[#10163a] bg-white shadow-[10px_10px_0_#10163a]">
              <div className="relative aspect-square w-full bg-[#eef2f7]">
                <Image
                  src="/correct%20may%202nd.jpg.jpeg"
                  alt="TSDC Graphic Design Scholarship campaign poster"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-[#fff8ed] p-6 shadow-[8px_8px_0_#10163a]">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#10163a] bg-[#ffcb53] text-[#10163a] shadow-[4px_4px_0_#10163a]">
                    <Trophy size={28} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#9a4a10]">Scholarship ladder</p>
                    <p className="text-3xl font-black tracking-[-0.05em] text-[#10163a]">100% for the top performer</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {scholarshipBenefits.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[1.2rem] border-[3px] border-[#10163a] bg-white px-4 py-3 shadow-[4px_4px_0_#10163a]">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#16a34a]" />
                      <p className="text-sm font-bold leading-6 text-[#10163a]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-[linear-gradient(180deg,#10163a_0%,#182152_100%)] p-6 text-white shadow-[8px_8px_0_#10163a]">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/55">Register at just</p>
                <p className="mt-3 text-7xl font-black leading-none tracking-[-0.08em] text-[#ff9736]">Rs 99</p>
                <p className="mt-3 text-lg font-semibold text-white/85">Limited seats. Demo class slot, scholarship evaluation, and next-step guidance included.</p>
                <div className="mt-5 grid gap-2">
                  {commitmentBadges.map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-[1rem] border border-white/12 bg-white/8 px-3 py-2 text-sm font-semibold text-white/88">
                      <CheckCircle2 size={15} className="shrink-0 text-[#7df7ab]" />
                      {item}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-white bg-[#ff9736] px-5 py-4 text-sm font-black text-white shadow-[5px_5px_0_#000]"
                >
                  Reserve Your Slot
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div ref={formRef} className="self-start rounded-[2.4rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[10px_10px_0_#10163a] lg:sticky lg:top-28">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#3244b5]">Scholarship registration</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#10163a]">Reserve your demo class and scholarship slot.</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#475467]">
              Fill the essentials, pay Rs 99, and we will send the demo class slot, scholarship instructions, and next steps on WhatsApp and email.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Fast checkout', value: 'Takes about 1 minute' },
                { label: 'Confirmation', value: 'Shared instantly' },
                { label: 'Best for', value: 'Students and beginners' },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.2rem] border-[3px] border-[#10163a] bg-[#eef3ff] px-4 py-3 shadow-[3px_3px_0_#10163a]">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#3244b5]">{item.label}</p>
                  <p className="mt-2 text-sm font-bold leading-6 text-[#10163a]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.16em] text-[#667085]">Student name</span>
                <input type="text" autoComplete="name" value={formState.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="Full name" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.16em] text-[#667085]">WhatsApp number</span>
                <input type="tel" pattern="[0-9]{10}" autoComplete="tel" value={formState.phone} onChange={(event) => updateForm('phone', event.target.value)} placeholder="10-digit mobile number" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.16em] text-[#667085]">Email address</span>
                <input type="email" autoComplete="email" value={formState.email} onChange={(event) => updateForm('email', event.target.value)} placeholder="your@email.com" className={inputClass} />
              </label>
              <div className="rounded-[1.5rem] border-[3px] border-[#10163a] bg-[#fff8ed] p-4 shadow-[4px_4px_0_#10163a]">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#9a4a10]">Optional details for better follow-up</p>
                <div className="mt-3 grid gap-4">
                  <input value={formState.city} onChange={(event) => updateForm('city', event.target.value)} placeholder="City (optional)" className={inputClass} />
                  <input value={formState.schoolOrCollege} onChange={(event) => updateForm('schoolOrCollege', event.target.value)} placeholder="School or college name (optional)" className={inputClass} />
                  <input value={formState.classLevel} onChange={(event) => updateForm('classLevel', event.target.value)} placeholder="Class / year / current status (optional)" className={inputClass} />
                </div>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.16em] text-[#667085]">Preferred demo class slot</span>
                <select value={formState.preferredSlot} onChange={(event) => updateForm('preferredSlot', event.target.value)} className={inputClass}>
                  {demoSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>

              <textarea
                value={formState.goals}
                onChange={(event) => updateForm('goals', event.target.value)}
                rows={4}
                placeholder="What kind of creative career are you aiming for? (optional)"
                className={inputClass}
              />
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
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-5 py-4 text-sm font-black text-white shadow-[5px_5px_0_#10163a] disabled:opacity-60"
            >
              {loading ? 'Preparing payment...' : 'Pay Rs 99 and Confirm Slot'}
              <ArrowRight size={16} />
            </button>

            <p className="mt-4 text-center text-xs font-bold text-[#667085]">
              Student details are saved before checkout so the admissions team can follow up even if payment is completed later.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fffdf7_0%,#f4f7ff_100%)] px-4 py-16 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="overflow-hidden rounded-[2.5rem] border-[3px] border-[#10163a] bg-white shadow-[8px_8px_0_#10163a]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 md:p-8">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#3244b5]">Why students register</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.06em] text-[#10163a] md:text-5xl">
                  A clear, affordable first step before full admission.
                </h2>
                <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-[#475467]">
                  This is built for students and parents who want confidence before making a bigger course decision. Register once, attend the guided demo class, take the scholarship evaluation, and get direct admission guidance from the TSDC team.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      step: '01',
                      title: 'Low-risk entry',
                      text: 'Start with a Rs 99 registration instead of paying the full course fee upfront.',
                      bg: 'bg-[#eef3ff]',
                    },
                    {
                      step: '02',
                      title: 'Real scholarship opportunity',
                      text: 'Top performers can unlock meaningful fee support, including up to 100% scholarship.',
                      bg: 'bg-[#fff4e8]',
                    },
                    {
                      step: '03',
                      title: 'Guided support after payment',
                      text: 'You receive demo slot details, scholarship instructions, and next-step follow-up from admissions.',
                      bg: 'bg-[#effcf3]',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className={`rounded-[1.75rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a] ${item.bg}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.1rem] border-[3px] border-[#10163a] bg-white text-lg font-black text-[#3244b5] shadow-[3px_3px_0_#10163a]">
                          {item.step}
                        </div>
                        <div>
                          <p className="text-xl font-black tracking-[-0.04em] text-[#10163a]">{item.title}</p>
                          <p className="mt-2 max-w-xl text-sm font-semibold leading-7 text-[#23315f]">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t-[3px] border-[#10163a] bg-[#10163a] p-6 text-white lg:border-l-[3px] lg:border-t-0 md:p-8">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/55">Good fit for</p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.05em]">Students who want clarity before they commit.</h3>
                <div className="mt-6 space-y-3">
                  {[
                    'School and college students exploring graphic design as a real career path',
                    'Parents looking for a structured, lower-risk first step before admission',
                    'Beginners who want guidance, scholarship support, and a stronger career direction',
                  ].map((item) => (
                    <div key={item} className="rounded-[1.35rem] border-[3px] border-white/15 bg-white/8 px-4 py-4 text-sm font-semibold leading-7 text-white/90">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.6rem] border-[3px] border-white/15 bg-[linear-gradient(135deg,#3244b5_0%,#6b5cff_100%)] p-5 shadow-[4px_4px_0_#000]">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/70">Why this works for families</p>
                  <p className="mt-3 text-lg font-black leading-8">
                    The offer is simple: pay a small amount, attend the demo class, and earn the chance to reduce your full course fee.
                  </p>
                </div>

                <div className="mt-6 rounded-[1.7rem] border-[3px] border-white/12 bg-white/6 p-5 shadow-[4px_4px_0_#000]">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/55">Book your slot</p>
                  <p className="mt-3 text-sm font-semibold leading-7 text-white/78">
                    Limited scholarship entries are open. Reserve the student slot now and complete the registration in one step.
                  </p>
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="mt-5 inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-white bg-[#ff9736] px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0_#000]"
                  >
                    Start Registration
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border-[3px] border-[#10163a] bg-[#0f1634] text-white shadow-[8px_8px_0_#10163a]">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="border-b-[3px] border-white/10 p-6 md:p-8 lg:border-b-0 lg:border-r-[3px] lg:border-white/10">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/55">Inside the program</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] md:text-5xl">Real projects. Industry tools. Portfolio-ready output.</h2>
                <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-white/75">
                  This is not just a demo session. It introduces students to the actual learning style, tools, and creative thinking they need to build confidence and move toward paid work.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Tools used', value: 'Photoshop, Illustrator, Figma' },
                    { label: 'Learning style', value: 'Demo class + guided evaluation' },
                    { label: 'Outcome', value: 'Portfolio direction + scholarship result' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[1.35rem] border-[3px] border-white/12 bg-white/8 px-4 py-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/50">{item.label}</p>
                      <p className="mt-2 text-sm font-bold leading-6 text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { icon: Paintbrush, title: 'Design foundations', text: 'Layout, hierarchy, typography, branding basics, and composition through guided creative exercises.' },
                    { icon: Trophy, title: 'Portfolio building', text: 'Project-based work that helps students show ability, effort, and creative thinking instead of only theory.' },
                    { icon: GraduationCap, title: 'Career direction', text: 'Clear direction on role fit, course pathway, scholarship opportunity, and what to do next after the demo.' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="rounded-[1.7rem] border-[3px] border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-5 shadow-[4px_4px_0_rgba(0,0,0,0.45)]">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[1rem] border-[3px] border-white/12 bg-white/10">
                          <Icon size={22} className="text-[#ffcb53]" />
                        </div>
                        <p className="mt-5 text-xl font-black tracking-[-0.04em]">{item.title}</p>
                        <p className="mt-3 text-sm font-semibold leading-7 text-white/78">{item.text}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef2f7] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#3244b5]">What happens next</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[#10163a]">From registration to scholarship result, everything is clearly guided.</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[2rem] border-[3px] border-[#10163a] bg-white p-5 shadow-[7px_7px_0_#10163a]"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Step {index + 1}</p>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#10163a]">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#475467]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf7] px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.3rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[8px_8px_0_#10163a]">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#3244b5]">FAQ</p>
            <div className="mt-5 space-y-3">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="overflow-hidden rounded-[1.4rem] border-[3px] border-[#10163a] bg-[#eef3ff] shadow-[4px_4px_0_#10163a]">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    aria-expanded={openFaqIndex === index}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                  >
                    <h3 className="text-lg font-black tracking-[-0.03em] text-[#10163a]">{faq.question}</h3>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#3244b5] transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaqIndex === index && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm font-semibold leading-7 text-[#475467]">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.3rem] border-[3px] border-[#10163a] bg-[#fff8ed] p-6 shadow-[8px_8px_0_#10163a]">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#9a4a10]">Visit or contact TSDC</p>
            <div className="mt-4 flex items-start gap-3">
              <MapPin size={18} className="mt-1 shrink-0 text-[#fa8a43]" />
              <p className="text-base font-semibold leading-8 text-[#10163a]">
                Villa 20, Bollineni Iris, Block 52, Bollineni Hillside Rd, Perumbakkam, Chennai, Tamil Nadu 600131
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <a href="tel:+917358116929" className="flex items-center gap-3 rounded-[1.1rem] border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-black text-[#10163a] shadow-[4px_4px_0_#10163a]">
                <Phone size={16} className="text-[#3244b5]" />
                Call admissions: +91 73581 16929
              </a>
              <a href="https://wa.me/917358116929" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-[1.1rem] border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-black text-[#10163a] shadow-[4px_4px_0_#10163a]">
                <MessageCircle size={16} className="text-[#16a34a]" />
                WhatsApp us for slot support
              </a>
            </div>

            <div className="mt-6 rounded-[1.6rem] border-[3px] border-[#10163a] bg-[#10163a] p-5 text-white shadow-[5px_5px_0_#10163a]">
              <div className="inline-flex rounded-[1.1rem] border-[3px] border-white/20 bg-white px-5 py-4 shadow-[4px_4px_0_#000]">
                <Image src="/logo.png" alt="TSDC Logo" width={156} height={52} className="h-auto w-auto" />
              </div>
              <p className="mt-4 text-[0.72rem] font-black uppercase tracking-[0.28em] text-[#9db0ff]">
                TSDC Admissions Support
              </p>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/80">
                Complete your Rs 99 registration, attend the demo class, and our team will guide you through the scholarship evaluation and admission follow-up.
              </p>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-white bg-[#ff9736] px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0_#000]"
                >
                  Start Registration
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-[1100] border-t-[3px] border-[#10163a] bg-white/95 px-4 py-3 backdrop-blur-xl sm:hidden">
        <button
          type="button"
          onClick={scrollToForm}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-5 py-4 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
        >
          Reserve Your Slot — Rs 99
          <ArrowRight size={16} />
        </button>
      </div>
    </main>
  )
}
