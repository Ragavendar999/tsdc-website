'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Image as ImageIcon, Quote } from 'lucide-react'
import Link from 'next/link'

const testimonials = [
  {
    quote:
      'TSDC gave me the confidence and skills to start my career as a UI Designer.',
    name: 'Arjun K',
    role: 'UI Designer at TechWand',
    accent: '#fa8a43',
    tint: '#fff4eb',
  },
  {
    quote:
      'The practical training and live projects made all the difference.',
    name: 'Nivetha S',
    role: 'Graphic Designer at Brandio',
    accent: '#db4b87',
    tint: '#fff1f7',
  },
  {
    quote:
      'From learning digital marketing to running real campaigns — TSDC is the best!',
    name: 'Karthik R',
    role: 'Digital Marketer at DigiGrow',
    accent: '#3244b5',
    tint: '#eef3ff',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="site-section-bg section-alt-warm section-divider relative overflow-hidden px-4 py-16 sm:px-6">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="retro-pill mb-3 inline-flex px-4 py-2 text-xs font-black text-[#10163a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3244b5] animate-pulse-soft" />
              Success Stories
            </span>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[#081225] sm:text-4xl md:text-[2.8rem]">
              Real People.{' '}
              <span className="text-[#db4b87]">Real Careers.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-5 py-3 text-sm font-black text-[#10163a] shadow-[4px_4px_0_#10163a] transition-all hover:-translate-y-1"
            >
              Watch More Stories
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                className="flex h-full flex-col overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] bg-white shadow-[6px_6px_0_#10163a]"
              >
                {/* Photo placeholder */}
                <div
                  className="flex h-48 items-center justify-center"
                  style={{ backgroundColor: t.tint }}
                >
                  <div className="flex flex-col items-center gap-2 opacity-50">
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-dashed"
                      style={{ borderColor: t.accent }}
                    >
                      <ImageIcon size={28} style={{ color: t.accent }} />
                    </div>
                    <span className="text-[10px] font-bold text-[#667085]">Photo Coming Soon</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <Quote size={22} className="mb-3 shrink-0" style={{ color: t.accent }} />
                  <p className="flex-1 text-sm leading-7 text-[#344054]">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 border-t border-[#f0f4ff] pt-4">
                    <p className="font-black text-[#10163a]">– {t.name}</p>
                    <p className="text-xs font-semibold" style={{ color: t.accent }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
