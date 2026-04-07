'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'

export default function ContactSection() {
  const { openPopup } = useContactPopup()

  return (
    <section className="site-section-bg relative min-h-[88vh] overflow-hidden px-4 py-10">
      <div className="absolute inset-x-0 top-0 h-56 bg-[#f7f9ff]" />
      <div className="absolute left-10 top-20 h-24 w-24 rounded-[2rem] bg-[#4562b0]/10" />
      <div className="absolute right-10 top-24 h-28 w-28 rounded-full bg-[#fa8a43]/12" />
      <div className="absolute bottom-16 left-[12%] h-16 w-16 rounded-full bg-[#ea6865]/14" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-7"
        >
          <div>
            <div className="inline-flex rounded-full border border-[#d7e1f3] bg-[#f8fbff] px-4 py-2 text-sm font-semibold text-[#4562b0] shadow-sm">
              Contact TSDC Admissions
            </div>
            <h2 className="mt-5 max-w-xl text-4xl font-black leading-tight text-[#0f172a] md:text-6xl">
              A colorful next step for your <span className="text-[#4562b0]">creative career</span>.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#475569]">
              Reach out for Graphic Design, UI/UX Design, Digital Marketing, or Video Editing guidance. Every key action on the site now opens the same admissions popup, and this page does too.
            </p>
          </div>

          <div className="relative h-[320px] overflow-hidden rounded-[2rem] border border-[#d9e2f3] bg-white shadow-[0_30px_70px_rgba(15,23,42,0.1)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4043768777274!2d80.20013457403127!3d12.881699316845065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525b9bc3c5abe1%3A0x319e95489c67101a!2sTraijo%20Skill%20Development%20Center!5e0!3m2!1sen!2sin!4v1752409406800!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 text-sm font-semibold text-[#4562b0] shadow-lg">
              <Phone size={16} />
              <span>+91 73581 16929</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() =>
                openPopup({
                  title: 'Talk to TSDC Admissions',
                  subtitle: 'Share your details and we will help you choose the right course, batch, and next step.',
                  interest: 'General Enquiry',
                  source: 'contact-page-primary',
                  ctaLabel: 'Send My Enquiry',
                })
              }
              className="inline-flex items-center gap-2 rounded-full bg-[#4562b0] px-7 py-3.5 text-sm font-bold text-white shadow-[0_20px_40px_rgba(69,98,176,0.25)] transition hover:-translate-y-0.5"
            >
              Open Contact Form
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() =>
                openPopup({
                  title: 'Book a Free Counselling Session',
                  subtitle: 'Tell us your current skill level and we will guide you toward the best course path.',
                  interest: 'Free Counselling',
                  source: 'contact-page-counselling',
                  ctaLabel: 'Book My Session',
                })
              }
              className="rounded-full border border-[#d7e1f3] bg-[#fff7f1] px-7 py-3.5 text-sm font-bold text-[#fa8a43] transition hover:-translate-y-0.5 hover:border-[#fa8a43]/40"
            >
              Book Free Counselling
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-[#d9e2f3] bg-white p-6 shadow-[0_30px_70px_rgba(15,23,42,0.12)] md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Creative Courses',
                text: 'Graphic Design, UI/UX Design, Digital Marketing, and Video Editing guidance.',
                color: 'bg-[#f8fbff] text-[#4562b0]',
              },
              {
                title: 'Fast Response',
                text: 'Your enquiry goes to the same configured email destination already used by the website.',
                color: 'bg-[#fff7f1] text-[#fa8a43]',
              },
              {
                title: 'Career Support',
                text: 'Get clarity on fees, schedules, portfolios, and job-focused learning paths.',
                color: 'bg-[#fff5f5] text-[#ea6865]',
              },
              {
                title: 'One Consistent Flow',
                text: 'Every major trigger across the site now opens one unified contact popup experience.',
                color: 'bg-[#f5f7ff] text-[#334155]',
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-[1.5rem] border border-[#e3e8f5] p-5 ${item.color}`}>
                <h3 className="text-base font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#475569]">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.75rem] bg-[#4562b0] p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Admissions Support</p>
            <h3 className="mt-2 text-2xl font-black">Open the popup and send your enquiry in one step.</h3>
            <p className="mt-3 text-sm leading-7 text-white/85">
              We kept the flow simple so every CTA feels intentional, colorful, and consistent with the rest of the website.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
