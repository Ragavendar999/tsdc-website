'use client'

import { Check, MessageCircle, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultMasterclasses, fetchMasterclasses, formatPrice, isMasterclassVisibleOnLiveSite, type Masterclass } from '@/app/lib/masterclasses'

export default function MasterclassSuccessPage({ slug }: { slug: string }) {
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>(defaultMasterclasses)

  useEffect(() => {
    fetchMasterclasses().then(setMasterclasses)
  }, [])

  const masterclass = masterclasses.find((item) => item.slug === slug)

  if (!masterclass || !isMasterclassVisibleOnLiveSite(masterclass)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6036e9]">Page unavailable</p>
        <h1 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[#0b0e28]">This masterclass confirmation page is no longer active.</h1>
        <p className="mt-3 text-sm font-medium text-[#58637b]">The linked masterclass is no longer live on the site.</p>
      </div>
    )
  }

  return (
    <div className="bg-[#f7f8fc] px-4 py-14 sm:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-[#e7e9f2] bg-white p-6 text-center shadow-[0_1px_3px_rgba(10,10,30,0.06)] sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#6036e9] text-white">
            <Check size={30} />
          </div>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[#6036e9]">Registration complete</p>
          <h1 className="mx-auto mt-3 max-w-lg text-3xl font-black tracking-[-0.03em] text-[#0b0e28] sm:text-4xl">
            You&apos;re in.
            <span className="block text-[#e34989]">Join the community next.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#58637b]">
            Confirmation will be sent to your email and WhatsApp. Community access keeps your reminders, resources, and session updates in one place.
          </p>

          <div className="mt-6 rounded-xl bg-[#f7f8fc] p-5 text-left">
            <p className="text-xs font-bold text-[#58637b]">Your registration ID</p>
            <p className="text-lg font-black text-[#0b0e28] sm:text-xl">TSDC-{masterclass.category.toUpperCase().replace(/\s+/g, '-')}-7842</p>
          </div>

          <div className="mt-4 rounded-xl bg-[#f0f1fb] p-5 text-left">
            {[
              ['Masterclass', masterclass.category],
              ['Date & Time', `${masterclass.date}, ${masterclass.time}`],
              ['Mode', masterclass.mode],
              ['Amount paid', `${formatPrice(masterclass.price)} confirmed`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-[#dfe2ee] py-2.5 text-sm last:border-0">
                <span className="text-[#58637b]">{label}</span>
                <strong className="text-right text-[#0b0e28]">{value}</strong>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-[#0b0e28] p-6 text-white">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white">
              <MessageCircle size={28} />
            </div>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
              <Sparkles size={14} className="text-[#25d366]" />
              WhatsApp community page
            </p>
            <h2 className="mx-auto mt-4 max-w-md text-xl font-black tracking-[-0.02em] sm:text-2xl">
              Join the {masterclass.category} Masterclass community
            </h2>
            <p className="mx-auto mt-2.5 max-w-md text-sm text-white/65">
              Get pre-class resources, reminders, meeting links, and connect with other learners before the session begins.
            </p>
            <a
              href={masterclass.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] px-5 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 sm:w-auto"
            >
              <MessageCircle size={17} />
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
