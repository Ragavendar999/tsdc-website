'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultMasterclasses, formatPrice, MASTERCLASS_STORAGE_KEY, type Masterclass } from '@/app/lib/masterclasses'
import MasterclassExperienceShell from './MasterclassExperienceShell'

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => { open: () => void }
  }
}

type RazorpayCheckoutOptions = {
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
  handler: () => void
  modal: {
    ondismiss: () => void
  }
}

export default function MasterclassRegisterPage({ slug }: { slug: string }) {
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>(defaultMasterclasses)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentError, setPaymentError] = useState('')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(MASTERCLASS_STORAGE_KEY)
      if (stored) setMasterclasses(JSON.parse(stored))
    } catch {
      setMasterclasses(defaultMasterclasses)
    }
  }, [])

  const masterclass = masterclasses.find((item) => item.slug === slug) || defaultMasterclasses[0]
  const discount = masterclass.originalPrice - masterclass.price

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPaymentLoading(true)
    setPaymentError('')

    const formData = new FormData(event.currentTarget)
    const studentName = String(formData.get('name') || '')
    const studentEmail = String(formData.get('email') || '')
    const studentPhone = String(formData.get('whatsapp') || '')

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      setPaymentLoading(false)
      setPaymentError('Unable to load Razorpay checkout. Please check your internet connection and try again.')
      return
    }

    const response = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: masterclass.price,
        masterclassTitle: masterclass.title,
        studentName,
      }),
    })

    const order = await response.json()
    if (!response.ok) {
      setPaymentLoading(false)
      setPaymentError(order.error || 'Unable to start Razorpay payment. Please try again.')
      return
    }

    const Razorpay = window.Razorpay
    if (!Razorpay) {
      setPaymentLoading(false)
      setPaymentError('Razorpay checkout is not available. Please try again.')
      return
    }

    const razorpay = new Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      name: 'TSDC Masterclass',
      description: masterclass.title,
      order_id: order.orderId,
      prefill: {
        name: studentName,
        email: studentEmail,
        contact: studentPhone,
      },
      notes: {
        masterclass: masterclass.title,
        city: String(formData.get('city') || ''),
        profession: String(formData.get('profession') || ''),
      },
      theme: {
        color: '#4562b0',
      },
      handler: () => {
        window.location.href = `/masterclasses/${masterclass.slug}/success`
      },
      modal: {
        ondismiss: () => setPaymentLoading(false),
      },
    })

    razorpay.open()
  }

  return (
    <MasterclassExperienceShell
      masterclass={masterclass}
      footerNote="Your seat details stay inside this focused masterclass registration flow. Complete the form and you will be routed to the community step after payment."
    >
      <div className="mx-auto w-full max-w-6xl rounded-[2.6rem] border border-white/12 bg-white/[0.07] p-4 shadow-[0_40px_130px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-7">
        <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-black text-black">1</span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#fa8a43]">Information submission</p>
              <h1 className="text-3xl font-black tracking-[-0.05em] text-white md:text-4xl">Reserve your masterclass seat</h1>
            </div>
          </div>
          <span className="w-max rounded-full border border-white/12 bg-white/[0.07] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/70">
            Step 1 of 3
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.45fr]">
          <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-5 text-black md:p-7">
            <div className="mb-5 grid grid-cols-3 gap-1">
              <span className="h-1 rounded-full bg-[#fa8a43]" />
              <span className="h-1 rounded-full bg-[#d8d3c8]" />
              <span className="h-1 rounded-full bg-[#d8d3c8]" />
            </div>

            <p className="mb-4 text-sm font-black text-[#344054]">Your details - all fields required</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required name="name" placeholder="Full name" className="rounded-2xl border border-[#d8d3c8] bg-[#f8fbff] px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0]" />
              <input required name="whatsapp" placeholder="WhatsApp number" className="rounded-2xl border border-[#d8d3c8] bg-[#f8fbff] px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0]" />
              <input required name="email" type="email" placeholder="Email address" className="rounded-2xl border border-[#d8d3c8] bg-[#f8fbff] px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0] sm:col-span-2" />
              <input required name="city" placeholder="City" className="rounded-2xl border border-[#d8d3c8] bg-[#f8fbff] px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0]" />
              <input required name="profession" placeholder="Profession / Role" className="rounded-2xl border border-[#d8d3c8] bg-[#f8fbff] px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0]" />
              <select required name="experience" className="rounded-2xl border border-[#d8d3c8] bg-[#f8fbff] px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0] sm:col-span-2">
                <option value="">Experience level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Professional</option>
              </select>
              <input required name="referral" placeholder="How did you hear about us?" className="rounded-2xl border border-[#d8d3c8] bg-[#f8fbff] px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0] sm:col-span-2" />
              <input name="promoCode" placeholder="Promo code (optional)" className="rounded-2xl border border-[#d8d3c8] bg-[#f8fbff] px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0] sm:col-span-2" />
            </div>

            <button
              disabled={paymentLoading}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {paymentLoading ? 'Opening Razorpay...' : 'Continue to Payment'}
              <ArrowRight size={16} />
            </button>

            {paymentError && (
              <p className="mt-4 rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-sm font-bold leading-6 text-[#b42318]">
                {paymentError}
              </p>
            )}
          </form>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-fit rounded-[2rem] border border-white/12 bg-black/60 p-5 text-white shadow-[0_28px_90px_rgba(0,0,0,0.32)] lg:sticky lg:top-28"
          >
            <p className="flex items-center gap-2 text-sm font-black text-[#fa8a43]">
              <Sparkles size={15} />
              Order summary
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">{masterclass.title}</h2>
            <div className="mt-4 space-y-3 border-y border-white/10 py-4 text-sm">
              <div className="flex justify-between">
                <span className="text-white/62">Original price</span>
                <strong>{formatPrice(masterclass.originalPrice)}</strong>
              </div>
              <div className="flex justify-between text-[#8cffb2]">
                <span>Early bird discount</span>
                <strong>-{formatPrice(discount)}</strong>
              </div>
              <div className="flex justify-between text-[#fa8a43]">
                <span>Total</span>
                <strong>{formatPrice(masterclass.price)}</strong>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs font-bold text-white/62">
              <CheckCircle2 size={15} className="text-[#8cffb2]" />
              Secure payment via Razorpay
            </p>
          </motion.aside>
        </div>
      </div>
    </MasterclassExperienceShell>
  )
}
