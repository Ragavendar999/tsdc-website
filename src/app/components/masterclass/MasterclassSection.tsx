'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock, Sparkles, Users } from 'lucide-react'
import Link from 'next/link'
import { defaultMasterclasses, formatPrice, loadMasterclasses, type Masterclass } from '@/app/lib/masterclasses'
import { useEffect, useState } from 'react'

type MasterclassSectionProps = {
  compact?: boolean
  title?: string
  subtitle?: string
}

export default function MasterclassSection({ compact = false, title, subtitle }: MasterclassSectionProps) {
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>(defaultMasterclasses)

  useEffect(() => {
    setMasterclasses(loadMasterclasses())
  }, [])

  const liveMasterclasses = masterclasses.filter((masterclass) => masterclass.status === 'live')

  if (!liveMasterclasses.length) return null

  return (
    <section className="site-section-bg section-alt-blue section-divider section-band-dots relative overflow-hidden px-4 py-14 text-white md:px-8 md:py-20">

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="retro-pill mb-4 px-4 py-2 text-sm font-black text-[#10163a]">
            <Sparkles size={16} className="text-[#fa8a43]" />
            Limited-seat live masterclasses
          </span>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
            {title || 'Join a TSDC masterclass before the next batch fills.'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-white/82">
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
              className="relative overflow-hidden rounded-[2.5rem] border-[3px] border-[#10163a] bg-[#fffdf7] p-6 text-[#10163a] shadow-[9px_9px_0_#10163a] md:p-8"
            >
              <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#fa8a43]/18" />
              <div className="absolute bottom-0 left-8 h-24 w-24 rounded-[2rem] bg-[#3244b5]/12" />
              <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(50,68,181,0.14)_1px,transparent_0)] [background-size:22px_22px]" />

              <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[#6b7288]">TSDC Masterclass</p>
                    <span className="mt-4 inline-flex rounded-full border-[3px] border-[#10163a] bg-[#3244b5] px-3 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#10163a]">
                      {masterclass.badge}
                    </span>
                  </div>
                  <div className="rounded-full border-[3px] border-[#10163a] bg-[#ffcb53] px-3 py-1.5 text-xs font-black text-[#160b24] shadow-[3px_3px_0_#10163a]">
                    {formatPrice(masterclass.price)}
                  </div>
                </div>

                <h3 className="max-w-2xl text-3xl font-black leading-tight md:text-5xl">{masterclass.hook}</h3>
                <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-[#4d556f]">{masterclass.description}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    [Clock, masterclass.date],
                    [Sparkles, masterclass.time],
                    [Users, `${masterclass.seatsTotal - masterclass.seatsTaken} seats left`],
                  ].map(([Icon, label]) => {
                    const TypedIcon = Icon as typeof Clock
                    return (
                      <div key={label as string} className="rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3 shadow-[4px_4px_0_#10163a]">
                        <TypedIcon size={16} className="mb-2 text-[#fa8a43]" />
                        <p className="text-sm font-black">{label as string}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/masterclasses/${masterclass.slug}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-[3px] border-[#10163a] bg-[#3244b5] px-6 py-4 text-sm font-black text-white shadow-[5px_5px_0_#10163a]"
                  >
                    View Masterclass
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href={`/masterclasses/${masterclass.slug}/register`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-[3px] border-[#10163a] bg-[#ff9736] px-6 py-4 text-sm font-black text-white shadow-[5px_5px_0_#10163a]"
                  >
                    Secure Your Spot
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <p className="mt-4 text-center text-xs font-bold text-[#6b7288]">
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
