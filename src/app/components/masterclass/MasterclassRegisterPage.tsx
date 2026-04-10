'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { defaultMasterclasses, formatPrice, loadMasterclasses, type Masterclass } from '@/app/lib/masterclasses'
import MasterclassExperienceShell from './MasterclassExperienceShell'

type CapturedStudent = {
  name: string
  email: string
  phone: string
  city: string
  profession: string
  experience: string
  referral: string
  promoCode: string
  orderId: string
}

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
  // Captures student + order data so Razorpay callbacks can read it
  const studentRef = useRef<CapturedStudent | null>(null)

  useEffect(() => {
    setMasterclasses(loadMasterclasses())
  }, [])

  const masterclass = masterclasses.find((item) => item.slug === slug)

  if (!masterclass) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20">
        <div className="rounded-[2.4rem] border-[3px] border-[#10163a] bg-white p-8 text-center text-[#10163a] shadow-[9px_9px_0_#10163a]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#3244b5]">Registration unavailable</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em]">This masterclass is no longer available for registration.</h1>
          <p className="mt-4 text-base font-semibold leading-8 text-[#4d556f]">
            It may have been deleted, unpublished, or replaced in the admin panel.
          </p>
        </div>
      </div>
    )
  }

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

    // Capture all student data before the modal opens so callbacks can read it
    studentRef.current = {
      name: studentName,
      email: studentEmail,
      phone: studentPhone,
      city: String(formData.get('city') || ''),
      profession: String(formData.get('profession') || ''),
      experience: String(formData.get('experience') || ''),
      referral: String(formData.get('referral') || ''),
      promoCode: String(formData.get('promoCode') || ''),
      orderId: order.orderId,
    }

    const notifyAdmin = (status: 'paid' | 'abandoned') => {
      if (!studentRef.current) return
      fetch('/api/masterclass/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          student: studentRef.current,
          masterclass: {
            title: masterclass.title,
            category: masterclass.category,
            price: masterclass.price,
            date: masterclass.date,
            time: masterclass.time,
            mode: masterclass.mode,
            slug: masterclass.slug,
          },
        }),
      }).catch((err) => console.error('[notify]', err))
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
        city: studentRef.current.city,
        profession: studentRef.current.profession,
      },
      theme: {
        color: '#3244b5',
      },
      handler: () => {
        // Payment successful — notify admin, then redirect to success page
        notifyAdmin('paid')
        window.location.href = `/masterclasses/${masterclass.slug}/success`
      },
      modal: {
        ondismiss: () => {
          // Modal closed without payment — notify admin about the drop-off
          notifyAdmin('abandoned')
          setPaymentLoading(false)
        },
      },
    })

    razorpay.open()
  }

  return (
    <MasterclassExperienceShell
      masterclass={masterclass}
      footerNote="Your seat details stay inside this focused masterclass registration flow. Complete the form and you will be routed to the community step after payment."
    >
      <div className="mx-auto w-full max-w-6xl rounded-[2.8rem] border-[3px] border-[#10163a] bg-white p-4 shadow-[10px_10px_0_#10163a] md:p-7">
        <div className="mb-8 flex flex-col gap-4 border-b-[3px] border-[#10163a] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#10163a] bg-[#3244b5] text-sm font-black text-white shadow-[4px_4px_0_#10163a]">1</span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#fa8a43]">Information submission</p>
              <h1 className="text-3xl font-black tracking-[-0.05em] text-[#10163a] md:text-4xl">Reserve your masterclass seat</h1>
            </div>
          </div>
          <span className="w-max rounded-full border-[3px] border-[#10163a] bg-[#fff1dd] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#10163a] shadow-[4px_4px_0_#10163a]">
            Step 1 of 3
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.45fr]">
          <form onSubmit={handleSubmit} className="rounded-[2rem] border-[3px] border-[#10163a] bg-[#fff8ed] p-5 text-black shadow-[7px_7px_0_#10163a] md:p-7">
            <div className="mb-5 grid grid-cols-3 gap-2">
              <span className="h-2 rounded-full bg-[#fa8a43]" />
              <span className="h-2 rounded-full bg-[#3244b5]" />
              <span className="h-2 rounded-full bg-[#db4b87]" />
            </div>

            <p className="mb-4 text-sm font-black text-[#344054]">Your details - all fields required</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required name="name" placeholder="Full name" className="rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0] shadow-[4px_4px_0_#10163a]" />
              <input required name="whatsapp" placeholder="WhatsApp number" className="rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0] shadow-[4px_4px_0_#10163a]" />
              <input required name="email" type="email" placeholder="Email address" className="rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0] shadow-[4px_4px_0_#10163a] sm:col-span-2" />
              <input required name="city" placeholder="City" className="rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0] shadow-[4px_4px_0_#10163a]" />
              <input required name="profession" placeholder="Profession / Role" className="rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0] shadow-[4px_4px_0_#10163a]" />
              <select required name="experience" className="rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0] shadow-[4px_4px_0_#10163a] sm:col-span-2">
                <option value="">Experience level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Professional</option>
              </select>
              <input required name="referral" placeholder="How did you hear about us?" className="rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0] shadow-[4px_4px_0_#10163a] sm:col-span-2" />
              <input name="promoCode" placeholder="Promo code (optional)" className="rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3.5 font-semibold outline-none transition focus:border-[#4562b0] shadow-[4px_4px_0_#10163a] sm:col-span-2" />
            </div>

            <button
              disabled={paymentLoading}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-6 py-4 text-sm font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {paymentLoading ? 'Opening Razorpay...' : 'Continue to Payment'}
              <ArrowRight size={16} />
            </button>

            {paymentError && (
              <p className="mt-4 rounded-2xl border-[3px] border-[#b42318] bg-[#fff1f2] px-4 py-3 text-sm font-bold leading-6 text-[#b42318] shadow-[4px_4px_0_#b42318]">
                {paymentError}
              </p>
            )}
          </form>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-fit rounded-[2rem] border-[3px] border-[#10163a] bg-[#3244b5] p-5 text-white shadow-[7px_7px_0_#10163a] lg:sticky lg:top-28"
          >
            <p className="flex items-center gap-2 text-sm font-black text-[#ffcb53]">
              <Sparkles size={15} />
              Order summary
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">{masterclass.title}</h2>
            <div className="mt-4 space-y-3 rounded-[1.5rem] border-[3px] border-[#10163a] bg-white p-4 text-sm text-[#10163a] shadow-[4px_4px_0_#10163a]">
              <div className="flex justify-between">
                <span className="text-[#667085]">Original price</span>
                <strong>{formatPrice(masterclass.originalPrice)}</strong>
              </div>
              <div className="flex justify-between text-[#16a34a]">
                <span>Early bird discount</span>
                <strong>-{formatPrice(discount)}</strong>
              </div>
              <div className="flex justify-between text-[#fa8a43]">
                <span>Total</span>
                <strong>{formatPrice(masterclass.price)}</strong>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs font-bold text-white/82">
              <CheckCircle2 size={15} className="text-[#ffcb53]" />
              Secure payment via Razorpay
            </p>
          </motion.aside>
        </div>
      </div>
    </MasterclassExperienceShell>
  )
}
