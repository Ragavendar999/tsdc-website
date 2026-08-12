'use client'

import { motion } from 'framer-motion'

const partners = [
  { name: 'Adobe', abbr: 'Ai', color: '#FF0000', bg: '#fff0f0', desc: 'Illustrator, Photoshop & InDesign' },
  { name: 'Figma', abbr: 'Fg', color: '#7B61FF', bg: '#f3f0ff', desc: 'UI/UX Design & Prototyping' },
  { name: 'Canva Pro', abbr: 'Cv', color: '#00C4CC', bg: '#f0fdfd', desc: 'Social Media & Presentations' },
  { name: 'Meta Ads', abbr: 'M', color: '#0866FF', bg: '#f0f5ff', desc: 'Facebook & Instagram Advertising' },
  { name: 'Google Ads', abbr: 'G', color: '#EA4335', bg: '#fff5f4', desc: 'Search & Display Campaigns' },
  { name: 'After Effects', abbr: 'Ae', color: '#D291FF', bg: '#faf0ff', desc: 'Motion Graphics & Animation' },
]

export default function PartnersSection() {
  return (
    <section className="site-section-bg section-divider relative overflow-hidden px-4 py-14 sm:px-6">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="retro-pill mb-3 inline-flex px-4 py-2 text-xs font-black text-[#10163a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#fa8a43] animate-pulse-soft" />
            Tools & Partners
          </span>
          <h2 className="text-2xl font-black tracking-[-0.04em] text-[#081225] sm:text-3xl">
            Industry-Standard Tools You&apos;ll Master
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#475467]">
            Train with the same tools used by top creative professionals worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col items-center gap-3 rounded-[1.5rem] border-[3px] border-[#10163a] bg-white p-4 text-center shadow-[4px_4px_0_#10163a] transition-all"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl border-[3px] border-[#10163a] text-xl font-black text-white shadow-[3px_3px_0_#10163a]"
                  style={{ backgroundColor: partner.color }}
                >
                  {partner.abbr}
                </div>
                <div>
                  <p className="text-sm font-black text-[#10163a]">{partner.name}</p>
                  <p className="mt-0.5 text-[10px] font-semibold leading-snug text-[#667085]">
                    {partner.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
