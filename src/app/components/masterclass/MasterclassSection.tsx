'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock, Sparkles, Users } from 'lucide-react'
import Link from 'next/link'
import { defaultMasterclasses, formatPrice, MASTERCLASS_STORAGE_KEY, type Masterclass } from '@/app/lib/masterclasses'
import { useEffect, useState } from 'react'

type MasterclassSectionProps = {
  compact?: boolean
  title?: string
  subtitle?: string
}

export default function MasterclassSection({ compact = false, title, subtitle }: MasterclassSectionProps) {
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>(defaultMasterclasses)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(MASTERCLASS_STORAGE_KEY)
      if (stored) setMasterclasses(JSON.parse(stored))
    } catch {
      setMasterclasses(defaultMasterclasses)
    }
  }, [])

  const liveMasterclasses = masterclasses.filter((masterclass) => masterclass.status === 'live')

  if (!liveMasterclasses.length) return null

  return (
    <section className="site-section-bg section-alt-blue section-divider relative overflow-hidden px-4 py-14 md:px-8 md:py-20">
      <div className="pointer-events-none absolute left-8 top-16 h-28 w-28 rounded-full bg-[#fa8a43]/16" />
      <div className="pointer-events-none absolute bottom-10 right-12 h-32 w-32 rounded-[2rem] bg-[#4562b0]/12" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#4562b0]">
            <Sparkles size={16} className="text-[#fa8a43]" />
            Limited-seat live masterclasses
          </span>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-[#081225] md:text-5xl">
            {title || 'Join a TSDC masterclass before the next batch fills.'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-[#344054]">
            {subtitle || 'Short, focused, high-output sessions for students who want a quick creative upgrade with real guidance.'}
          </p>
        </div>

        <div className={`grid gap-6 ${compact ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}>
          {liveMasterclasses.map((masterclass) => (
            <motion.article
              key={masterclass.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-[#160b24] p-6 text-white md:p-8"
            >
              <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#fa8a43]/28" />
              <div className="absolute bottom-0 left-8 h-24 w-24 rounded-[2rem] bg-[#4562b0]/45" />
              <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.24)_1px,transparent_0)] [background-size:22px_22px]" />

              <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-white/55">TSDC Masterclass</p>
                    <span className="mt-4 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#4562b0]">
                      {masterclass.badge}
                    </span>
                  </div>
                  <div className="rounded-full bg-[#fff4d8] px-3 py-1.5 text-xs font-black text-[#160b24]">
                    Only {formatPrice(masterclass.price)}
                  </div>
                </div>

                <h3 className="max-w-2xl text-3xl font-black leading-tight md:text-5xl">{masterclass.hook}</h3>
                <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/72">{masterclass.description}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    [Clock, masterclass.date],
                    [Sparkles, masterclass.time],
                    [Users, `${masterclass.seatsTotal - masterclass.seatsTaken} seats left`],
                  ].map(([Icon, label]) => {
                    const TypedIcon = Icon as typeof Clock
                    return (
                      <div key={label as string} className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3">
                        <TypedIcon size={16} className="mb-2 text-[#fa8a43]" />
                        <p className="text-sm font-black">{label as string}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/masterclasses/${masterclass.slug}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#5b4bc4] px-6 py-4 text-sm font-black text-white"
                  >
                    View Masterclass
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href={`/masterclasses/${masterclass.slug}/register`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#fa8a43] px-6 py-4 text-sm font-black text-white"
                  >
                    Secure Your Spot
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <p className="mt-4 text-center text-xs font-bold text-white/55">
                  {masterclass.seatsTaken} seats already taken. Certificate and resources included.
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
