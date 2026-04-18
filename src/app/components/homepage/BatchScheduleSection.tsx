'use client'

import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight, CalendarDays, CheckCircle2, Clock, CreditCard, MapPin, Zap } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import {
  defaultSiteContent,
  loadSiteContent,
  SITE_CONTENT_UPDATED_EVENT,
  type BatchEntry,
} from '@/app/lib/siteContent'

const statusConfig: Record<BatchEntry['status'], { label: string; bg: string; text: string; dot: string; icon: React.ReactNode }> = {
  open: { label: 'Enrolling Now', bg: '#dcfce7', text: '#15803d', dot: '#22c55e', icon: <CheckCircle2 size={12} /> },
  filling: { label: 'Filling Fast', bg: '#fef3c7', text: '#92400e', dot: '#f59e0b', icon: <Zap size={12} /> },
  'starting-soon': { label: 'Starting Soon', bg: '#e0f2fe', text: '#0369a1', dot: '#0ea5e9', icon: <Clock size={12} /> },
  full: { label: 'Batch Full', bg: '#fee2e2', text: '#991b1b', dot: '#ef4444', icon: <AlertCircle size={12} /> },
}

function SeatBar({ taken, total }: { taken: number; total: number }) {
  const pct = Math.min(100, Math.round((taken / total) * 100))
  const left = total - taken
  const color = pct >= 100 ? '#ef4444' : pct >= 75 ? '#f59e0b' : '#22c55e'

  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px] font-bold">
        <span style={{ color }} className="font-black">
          {pct >= 100 ? 'No seats left' : `${left} seat${left !== 1 ? 's' : ''} left`}
        </span>
        <span className="text-[#667085]">{taken}/{total} filled</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#e5e7eb]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export default function BatchScheduleSection() {
  const { openPopup } = useContactPopup()
  const [content, setContent] = useState(defaultSiteContent.batchSchedule)

  useEffect(() => {
    const sync = () => setContent(loadSiteContent().batchSchedule)
    sync()
    window.addEventListener('storage', sync)
    window.addEventListener(SITE_CONTENT_UPDATED_EVENT, sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(SITE_CONTENT_UPDATED_EVENT, sync)
    }
  }, [])

  const openEnquiry = (courseName: string) =>
    openPopup({
      title: `Reserve your ${courseName} seat`,
      subtitle: 'Share your details and our admissions team will confirm your seat, explain the fee plan, and send batch details.',
      interest: courseName,
      source: `batch-schedule-${courseName.toLowerCase().replace(/\s+/g, '-')}`,
      ctaLabel: 'Reserve My Seat',
    })

  return (
    <section className="site-section-bg section-alt-clean section-divider relative overflow-hidden px-4 py-16 sm:px-6 md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="comic-dots absolute inset-0 opacity-30" />
        <div className="comic-burst pointer-events-none absolute -left-8 bottom-24 hidden h-24 w-24 bg-[#ffcb53] opacity-40 lg:block" />
        <div className="comic-burst pointer-events-none absolute -right-6 top-20 hidden h-20 w-20 bg-[#db4b87] opacity-30 lg:block" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="retro-pill mb-4 inline-flex px-4 py-2 text-sm font-black text-[#10163a]">
            <CalendarDays size={14} className="text-[#ff9736]" />
            {content.badge}
          </span>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-[#081225] sm:text-4xl md:text-[3.2rem]">
            {content.title}
            <span className="block text-[#3244b5]">{content.highlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#475467]">{content.description}</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {content.batches.map((batch, i) => {
            const status = statusConfig[batch.status]
            const isFull = batch.status === 'full'

            return (
              <motion.div
                key={batch.course}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.07 }}
              >
                <div className={`overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] bg-white shadow-[7px_7px_0_#10163a] transition-all duration-200 ${isFull ? 'opacity-70' : 'hover:-translate-y-1'}`}>
                  <div className="flex items-center justify-between px-5 py-4" style={{ backgroundColor: `${batch.accent}15` }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border-[3px] border-[#10163a] text-sm font-black text-white shadow-[3px_3px_0_#10163a]"
                        style={{ backgroundColor: batch.accent }}
                      >
                        {batch.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-[#10163a]">{batch.course}</h3>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-[#667085]">
                          <MapPin size={10} /> {batch.mode}
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold"
                      style={{ backgroundColor: status.bg, color: status.text, border: `1.5px solid ${status.dot}35` }}
                    >
                      <motion.span
                        animate={!isFull ? { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] } : {}}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: status.dot }}
                      />
                      {status.label}
                    </div>
                  </div>

                  <div className="px-5 py-4">
                    <div className="mb-4 grid grid-cols-2 gap-3">
                      <div className="rounded-[1rem] border-[2px] border-[#10163a]/10 bg-[#f8faff] px-4 py-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#667085]">Batch starts</p>
                        <p className="mt-1 text-sm font-black text-[#10163a]">{batch.startDate}</p>
                      </div>
                      <div className="rounded-[1rem] border-[2px] border-[#10163a]/10 bg-[#f8faff] px-4 py-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#667085]">Duration</p>
                        <p className="mt-1 text-sm font-black text-[#10163a]">{batch.duration}</p>
                      </div>
                    </div>

                    <div className="mb-4 flex items-center justify-between rounded-[1rem] border-[2px] border-[#10163a]/10 bg-[#fffbf5] px-4 py-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#667085]">Course fee</p>
                        <p className="mt-0.5 text-xl font-black text-[#10163a]">{batch.fee}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#667085]">
                          <CreditCard size={11} style={{ color: batch.accent }} />
                          EMI available
                        </div>
                        <p className="mt-0.5 text-xs font-black" style={{ color: batch.accent }}>{batch.emi}</p>
                      </div>
                    </div>

                    <div className="mb-5">
                      <SeatBar taken={batch.seatsTaken} total={batch.seatsTotal} />
                    </div>

                    <div className="flex gap-2.5">
                      {isFull ? (
                        <>
                          <button
                            onClick={() => openEnquiry(batch.course)}
                            className="flex-1 rounded-[1rem] border-[3px] border-[#10163a] bg-[#10163a] py-3 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5"
                          >
                            Join Waitlist
                          </button>
                          <Link
                            href={batch.link}
                            className="flex items-center gap-1.5 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-black text-[#10163a] shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5"
                          >
                            Details <ArrowRight size={13} />
                          </Link>
                        </>
                      ) : (
                        <>
                          <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => openEnquiry(batch.course)}
                            className="relative flex-1 overflow-hidden rounded-[1rem] border-[3px] border-[#10163a] py-3 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
                            style={{ backgroundColor: batch.accent }}
                          >
                            <motion.span
                              animate={{ x: ['-120%', '220%'] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                              className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            />
                            Reserve My Seat
                          </motion.button>
                          <Link
                            href={batch.link}
                            className="flex items-center gap-1.5 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-black text-[#10163a] shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5"
                          >
                            Details <ArrowRight size={13} />
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between"
        >
          <div className="flex items-start gap-2 rounded-[1.2rem] border-[3px] border-[#fa8a43]/40 bg-[#fff7ed] px-5 py-3.5 text-sm font-bold text-[#92400e]">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-[#fa8a43]" />
            {content.noteText}
          </div>
          <button
            onClick={() =>
              openPopup({
                title: 'Free Counselling - Pick the Right Batch',
                subtitle: 'Not sure which course or batch is right for you? Our admissions team will guide you in under 10 minutes.',
                interest: 'Batch Counselling',
                source: 'batch-schedule-counselling-cta',
                ctaLabel: 'Book Free Counselling',
              })
            }
            className="shrink-0 rounded-[1rem] border-[3px] border-[#10163a] bg-[#10163a] px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5"
          >
            Book Free Counselling
          </button>
        </motion.div>
      </div>
    </section>
  )
}
