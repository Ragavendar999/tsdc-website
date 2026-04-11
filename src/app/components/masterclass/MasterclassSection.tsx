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
    <section
      className={`site-section-bg section-alt-blue section-divider section-band-dots relative overflow-hidden px-4 text-white md:px-8 ${
        compact ? 'py-10 md:py-14' : 'py-14 md:py-18'
      }`}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className={`text-center ${compact ? 'mb-8' : 'mb-10 md:mb-12'}`}>
          <span className="retro-pill mb-4 px-4 py-2 text-sm font-black text-[#10163a]">
            <Sparkles size={16} className="text-[#fa8a43]" />
            Limited-seat live masterclasses
          </span>
          <h2 className={`font-black tracking-[-0.04em] text-white ${compact ? 'text-3xl md:text-4xl' : 'text-3xl md:text-5xl'}`}>
            {title || 'Join a TSDC masterclass before the next batch fills.'}
          </h2>
          <p className={`mx-auto mt-4 font-semibold leading-7 text-white/82 ${compact ? 'max-w-3xl text-sm md:text-base' : 'max-w-2xl text-base'}`}>
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
              whileHover={{ y: -6 }}
              className={`relative overflow-hidden border-[3px] border-[#10163a] bg-[#fffdf7] text-[#10163a] shadow-[9px_9px_0_#10163a] transition-transform ${
                compact ? 'rounded-[2.1rem] p-5 md:p-6' : 'rounded-[2.4rem] p-5 md:p-7'
              }`}
            >
              <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#fa8a43]/14 blur-[2px]" />
              <div className="absolute bottom-0 left-6 h-20 w-20 rounded-[1.6rem] bg-[#3244b5]/10" />
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(50,68,181,0.14)_1px,transparent_0)] [background-size:18px_18px]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3244b5]/45 to-transparent" />

              <div className="relative z-10">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[#6b7288]">TSDC Masterclass</p>
                    <span className="mt-3 inline-flex rounded-full border-[3px] border-[#10163a] bg-[#3244b5] px-3 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#10163a]">
                      {masterclass.badge}
                    </span>
                  </div>
                  <div className="rounded-full border-[3px] border-[#10163a] bg-[#ffcb53] px-3 py-1.5 text-xs font-black text-[#160b24] shadow-[3px_3px_0_#10163a]">
                    {formatPrice(masterclass.price)}
                  </div>
                </div>

                {compact ? (
                  <div>
                    <div className="grid gap-5">
                      <div className="min-w-0">
                        <h3 className="max-w-4xl text-[clamp(2rem,4vw,3.5rem)] font-black leading-[0.96] tracking-[-0.05em] text-[#10163a]">
                          {masterclass.hook}
                        </h3>
                        <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-[#4d556f] md:text-[15px]">
                          {masterclass.description}
                        </p>
                      </div>

                      <div className="rounded-[1.8rem] border-[3px] border-[#10163a] bg-[linear-gradient(180deg,#f8faff_0%,#eef2ff_100%)] p-4 shadow-[5px_5px_0_#10163a]">
                        <div className="grid gap-3 lg:grid-cols-3">
                          {[
                            [Clock, masterclass.date],
                            [Sparkles, masterclass.time],
                            [Users, `${masterclass.seatsTotal - masterclass.seatsTaken} seats left`],
                          ].map(([Icon, label]) => {
                            const TypedIcon = Icon as typeof Clock
                            return (
                              <div
                                key={label as string}
                                className="rounded-[1.25rem] border-[3px] border-[#10163a] bg-white/95 px-4 py-3 shadow-[4px_4px_0_#10163a]"
                              >
                                <div className="flex items-center gap-2 lg:min-h-[44px]">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff3e5]">
                                    <TypedIcon size={15} className="text-[#fa8a43]" />
                                  </div>
                                  <p className="text-sm font-black leading-5">{label as string}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-center">
                          <Link
                            href={`/masterclasses/${masterclass.slug}`}
                            className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[1.1rem] border-[3px] border-[#10163a] bg-[#3244b5] px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
                          >
                            View Masterclass
                            <ArrowRight size={16} />
                          </Link>
                          <Link
                            href={`/masterclasses/${masterclass.slug}/register`}
                            className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[1.1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
                          >
                            Secure Your Spot
                            <ArrowRight size={16} />
                          </Link>
                          <p className="text-center text-xs font-bold text-[#6b7288] lg:text-left">
                            {masterclass.seatsTaken} seats already taken. Certificate and resources included.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="max-w-3xl text-[clamp(2.1rem,3vw,4rem)] font-black leading-[0.94] tracking-[-0.05em] text-[#10163a]">
                      {masterclass.hook}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-[#4d556f] md:text-base">
                      {masterclass.description}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        [Clock, masterclass.date],
                        [Sparkles, masterclass.time],
                        [Users, `${masterclass.seatsTotal - masterclass.seatsTaken} seats left`],
                      ].map(([Icon, label]) => {
                        const TypedIcon = Icon as typeof Clock
                        return (
                          <div
                            key={label as string}
                            className="rounded-[1.25rem] border-[3px] border-[#10163a] bg-[linear-gradient(180deg,#f8faff_0%,#eef2ff_100%)] px-4 py-3 shadow-[4px_4px_0_#10163a]"
                          >
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff3e5]">
                                <TypedIcon size={15} className="text-[#fa8a43]" />
                              </div>
                              <p className="text-sm font-black leading-5">{label as string}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <Link
                        href={`/masterclasses/${masterclass.slug}`}
                        className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[1.1rem] border-[3px] border-[#10163a] bg-[#3244b5] px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
                      >
                        View Masterclass
                        <ArrowRight size={16} />
                      </Link>
                      <Link
                        href={`/masterclasses/${masterclass.slug}/register`}
                        className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[1.1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
                      >
                        Secure Your Spot
                        <ArrowRight size={16} />
                      </Link>
                    </div>

                    <p className="mt-4 text-center text-xs font-bold text-[#6b7288]">
                      {masterclass.seatsTaken} seats already taken. Certificate and resources included.
                    </p>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
