'use client'

import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { defaultMasterclasses, fetchMasterclasses, formatPrice, isMasterclassVisibleOnLiveSite, type Masterclass } from '@/app/lib/masterclasses'
import { loadSiteSettings } from '@/app/lib/siteSettings'

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

type RazorpayPaymentResponse = {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
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
  handler: (response: RazorpayPaymentResponse) => void
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
    fetchMasterclasses().then(setMasterclasses)
  }, [])

  const masterclass = masterclasses.find((item) => item.slug === slug)

  if (!masterclass || !isMasterclassVisibleOnLiveSite(masterclass)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6036e9]">Registration unavailable</p>
        <h1 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[#0b0e28]">This masterclass is no longer available for registration.</h1>
        <p className="mt-3 text-sm font-medium text-[#58637b]">
          This page is hidden whenever the masterclass is unpublished from the admin panel or reaches its admin-configured turn-off date and time.
        </p>
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

    const notifyAdmin = (status: 'paid' | 'abandoned', paymentVerified?: boolean) => {
      if (!studentRef.current) return
      const triggers = loadSiteSettings().email.triggers
      if (status === 'paid' && !triggers.masterclassPaid) return
      if (status === 'abandoned' && !triggers.masterclassAbandoned) return
      fetch('/api/masterclass/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          paymentVerified,
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

    // Verifies the Razorpay signature server-side and atomically increments the
    // masterclass's seat count — the checkout `handler` callback alone is not
    // proof of payment, it just means the modal closed after a claimed success.
    const verifyPayment = async (response: RazorpayPaymentResponse) => {
      try {
        const verifyResponse = await fetch('/api/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            masterclassId: masterclass.id,
          }),
        })
        const result = await verifyResponse.json()
        return Boolean(result.verified)
      } catch (err) {
        console.error('[verifyPayment]', err)
        return false
      }
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
      handler: (response) => {
        // Payment claimed successful by the checkout modal — verify the signature
        // server-side (and bump the seat count) before notifying admin, but still
        // redirect either way so a notify/verify hiccup doesn't strand the student.
        verifyPayment(response).then((verified) => {
          notifyAdmin('paid', verified)
          window.location.href = `/masterclasses/${masterclass.slug}/success`
        })
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
    <div className="bg-[#f7f8fc] px-4 py-12 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6036e9]">Step 1 of 3 · Information submission</p>
          <h1 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[#0b0e28] sm:text-3xl">Reserve your masterclass seat</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.45fr]">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-[#e7e9f2] bg-white p-5 shadow-[0_1px_3px_rgba(10,10,30,0.06)] sm:p-7">
            <div className="mb-5 grid grid-cols-3 gap-2">
              <span className="h-1.5 rounded-full bg-[#6036e9]" />
              <span className="h-1.5 rounded-full bg-[#eef0f7]" />
              <span className="h-1.5 rounded-full bg-[#eef0f7]" />
            </div>

            <p className="mb-4 text-sm font-black text-[#0b0e28]">Your details — all fields required</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required name="name" placeholder="Full name" className="rounded-xl border border-[#dfe2ee] bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#6036e9]" />
              <input required name="whatsapp" placeholder="WhatsApp number" className="rounded-xl border border-[#dfe2ee] bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#6036e9]" />
              <input required name="email" type="email" placeholder="Email address" className="rounded-xl border border-[#dfe2ee] bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#6036e9] sm:col-span-2" />
              <input required name="city" placeholder="City" className="rounded-xl border border-[#dfe2ee] bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#6036e9]" />
              <input required name="profession" placeholder="Profession / Role" className="rounded-xl border border-[#dfe2ee] bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#6036e9]" />
              <select required name="experience" defaultValue="" className="rounded-xl border border-[#dfe2ee] bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#6036e9] sm:col-span-2">
                <option value="">Experience level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Professional</option>
              </select>
              <input required name="referral" placeholder="How did you hear about us?" className="rounded-xl border border-[#dfe2ee] bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#6036e9] sm:col-span-2" />
              <input name="promoCode" placeholder="Promo code (optional)" className="rounded-xl border border-[#dfe2ee] bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#6036e9] sm:col-span-2" />
            </div>

            <button
              disabled={paymentLoading}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6036e9] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#5228c9] disabled:opacity-60"
            >
              {paymentLoading ? 'Opening Razorpay...' : 'Continue to Payment'}
              <ArrowRight size={16} />
            </button>

            {paymentError && (
              <p className="mt-4 rounded-xl border border-[#f3c6c6] bg-[#fff1f2] px-4 py-3 text-sm font-bold leading-6 text-[#b42318]">{paymentError}</p>
            )}
          </form>

          <aside className="h-fit rounded-2xl bg-[#0b0e28] p-5 text-white">
            <p className="flex items-center gap-2 text-sm font-black text-[#ffc43d]">
              <Sparkles size={15} />
              Order summary
            </p>
            <h2 className="mt-2 text-xl font-black tracking-[-0.02em]">{masterclass.title}</h2>
            <div className="mt-4 space-y-3 rounded-xl bg-white p-4 text-sm text-[#0b0e28]">
              <div className="flex justify-between">
                <span className="text-[#58637b]">Original price</span>
                <strong>{formatPrice(masterclass.originalPrice)}</strong>
              </div>
              <div className="flex justify-between text-[#1baf7a]">
                <span>Early bird discount</span>
                <strong>-{formatPrice(discount)}</strong>
              </div>
              <div className="flex justify-between border-t border-[#eef0f7] pt-3 text-[#6036e9]">
                <span>Total</span>
                <strong>{formatPrice(masterclass.price)}</strong>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs font-bold text-white/70">
              <CheckCircle2 size={15} className="text-[#ffc43d]" />
              Secure payment via Razorpay
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
