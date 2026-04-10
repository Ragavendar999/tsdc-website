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
    <main className="min-h-screen overflow-hidden bg-[#fff8ef] text-[#10163a]">
      <section className="relative min-h-screen overflow-hidden px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[#fff8ef]" />
          {masterclass.backgroundImage && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-8"
              style={{ backgroundImage: `url(${masterclass.backgroundImage})` }}
            />
          )}
          <div className={`absolute inset-x-4 top-6 h-56 rounded-[2.6rem] border-[3px] border-[#10163a] ${getMasterclassBackgroundClass(masterclass.backgroundStyle)} opacity-95 shadow-[10px_10px_0_#10163a]`} />
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(50,68,181,0.18)_1px,transparent_0)] [background-size:24px_24px]" />
        </div>

        <Link
          href="/"
          aria-label="Go to TSDC homepage"
          className="fixed left-4 top-4 z-[1300] inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-white px-4 py-2 text-xs font-black text-[#10163a] shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5 sm:left-6"
        >
          ← TSDC
        </Link>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8">
          <header className="flex flex-col gap-4 rounded-[2rem] border-[3px] border-[#10163a] bg-[#fffdf7] p-4 shadow-[8px_8px_0_#10163a] md:flex-row md:items-center md:justify-between">
            <Link href="/" aria-label="TSDC home" className="inline-flex w-max items-center rounded-full border-[3px] border-[#10163a] bg-white px-4 py-3 shadow-[4px_4px_0_#10163a]">
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
                    className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-white px-3.5 py-2 text-xs font-black text-[#10163a] shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5 hover:bg-[#3244b5] hover:text-white"
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

      <footer className="relative overflow-hidden bg-[#fff8ef] px-4 py-12 text-[#10163a] sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,151,54,0.16),transparent_28%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-6 rounded-[2.4rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[8px_8px_0_#10163a] md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <Image src="/logo.png" alt="TSDC Logo" width={132} height={42} />
            <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-[#5c617d]">
              {footerNote || 'TSDC masterclasses are focused, live sessions built for students who want hands-on creative skill upgrades with real expert guidance — not just theory.'}
            </p>
          </div>
          <a
            href={masterclass.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 self-center rounded-[1rem] border-[3px] border-[#10163a] bg-[#3244b5] px-6 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-1"
          >
            <MessageCircle size={16} />
            WhatsApp Community
          </a>
        </div>
      </footer>
    </main>
  )
}
