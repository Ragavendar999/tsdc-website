'use client'

import { Mail, MessageCircle, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Masterclass, getMasterclassBackgroundClass } from '@/app/lib/masterclasses'

const contactDetails = [
  { label: 'Call', value: '+91 73581 16929', href: 'tel:+917358116929', icon: Phone },
  { label: 'WhatsApp', value: 'Ask anything', href: 'https://wa.me/917358116929', icon: MessageCircle },
  { label: 'Email', value: 'support@traijoedu.in', href: 'mailto:support@traijoedu.in', icon: Mail },
]

type MasterclassExperienceShellProps = {
  masterclass: Masterclass
  children: ReactNode
  footerNote?: string
}

export default function MasterclassExperienceShell({ masterclass, children, footerNote }: MasterclassExperienceShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative min-h-screen overflow-hidden px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className={`absolute inset-0 ${getMasterclassBackgroundClass(masterclass.backgroundStyle)}`} />
          {masterclass.backgroundImage && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-28 mix-blend-screen"
              style={{ backgroundImage: `url(${masterclass.backgroundImage})` }}
            />
          )}
          <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),transparent)] opacity-70" />
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.24)_1px,transparent_0)] [background-size:26px_26px]" />
        </div>

        <Link
          href="/"
          aria-label="Go to TSDC homepage"
          className="fixed left-1/2 top-0 z-[1300] flex -translate-x-1/2 flex-col items-center"
        >
          <span className="h-12 w-1 rounded-b-full bg-white/55 shadow-[0_0_20px_rgba(255,255,255,0.45)]" />
          <span className="rounded-b-3xl border border-white/15 bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-black shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
            Pull home
          </span>
        </Link>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8">
          <header className="flex flex-col gap-4 rounded-[2rem] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <Link href="/" aria-label="TSDC home" className="inline-flex w-max items-center rounded-full bg-white px-4 py-3">
              <Image src="/logo.png" alt="TSDC Logo" width={118} height={42} priority />
            </Link>

            <div className="flex flex-wrap gap-2">
              {contactDetails.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-3.5 py-2 text-xs font-black text-white/88 transition hover:-translate-y-0.5 hover:bg-white hover:text-black"
                  >
                    <Icon size={14} />
                    <span className="hidden sm:inline">{item.label}:</span>
                    {item.value}
                  </a>
                )
              })}
            </div>
          </header>

          {children}
        </div>
      </section>

      <footer className="relative overflow-hidden bg-black px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(250,138,67,0.22),transparent_28%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-6 rounded-[2.4rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <Image src="/logo.png" alt="TSDC Logo" width={132} height={42} className="brightness-0 invert" />
            <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/62">
              {footerNote || 'This masterclass flow is a focused launch room with no common site footer or navbar distractions.'}
            </p>
          </div>
          <a
            href={masterclass.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/14 px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#25d366]"
          >
            <MessageCircle size={16} />
            WhatsApp Community
          </a>
        </div>
      </footer>
    </main>
  )
}
