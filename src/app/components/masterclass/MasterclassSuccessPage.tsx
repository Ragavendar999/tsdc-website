'use client'

import { Check, MessageCircle, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultMasterclasses, formatPrice, MASTERCLASS_STORAGE_KEY, type Masterclass } from '@/app/lib/masterclasses'
import MasterclassExperienceShell from './MasterclassExperienceShell'

export default function MasterclassSuccessPage({ slug }: { slug: string }) {
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>(defaultMasterclasses)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(MASTERCLASS_STORAGE_KEY)
      if (stored) setMasterclasses(JSON.parse(stored))
    } catch {
      setMasterclasses(defaultMasterclasses)
    }
  }, [])

  const masterclass = masterclasses.find((item) => item.slug === slug) || defaultMasterclasses[0]

  return (
    <MasterclassExperienceShell
      masterclass={masterclass}
      footerNote="Your payment is complete. The next step is the WhatsApp community where reminders, links, and pre-class resources will be shared."
    >
      <div className="mx-auto w-full max-w-5xl rounded-[2.8rem] border border-white/12 bg-white/[0.07] p-4 shadow-[0_40px_130px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-8">
        <div className="rounded-[2.3rem] bg-white p-6 text-center text-black md:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <Check size={30} />
          </div>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-[#fa8a43]">Registration complete</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            You're in. Join the community next.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-semibold leading-7 text-[#344054]">
            Confirmation will be sent to your email and WhatsApp. Community access keeps your reminders, resources, and session updates in one place.
          </p>

          <div className="mt-6 rounded-[1.6rem] bg-black p-5 text-white">
            <p className="text-sm font-bold text-white/56">Your registration ID</p>
            <p className="text-xl font-black sm:text-2xl">TSDC-{masterclass.category.toUpperCase().replace(/\s+/g, '-')}-7842</p>
          </div>

          <div className="mt-6 rounded-[1.6rem] bg-[#f4f6ff] p-5 text-left">
            {[
              ['Masterclass', masterclass.category],
              ['Date & Time', `${masterclass.date}, ${masterclass.time}`],
              ['Mode', masterclass.mode],
              ['Amount paid', `${formatPrice(masterclass.price)} confirmed`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-[#d9e4f5] py-3 text-sm last:border-0">
                <span className="text-[#667085]">{label}</span>
                <strong className="text-right">{value}</strong>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[2rem] bg-[#07120b] p-6 text-white">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white">
              <MessageCircle size={28} />
            </div>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#8cffb2]">
              <Sparkles size={14} />
              WhatsApp community page
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-black tracking-[-0.04em] md:text-4xl">
              Join the {masterclass.category} Masterclass community
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/72">
              Get pre-class resources, reminders, meeting links, and connect with other learners before the session begins.
            </p>
            <a
              href={masterclass.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-4 text-sm font-black text-white transition hover:-translate-y-1 md:w-auto"
            >
              <MessageCircle size={17} />
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </div>
    </MasterclassExperienceShell>
  )
}
