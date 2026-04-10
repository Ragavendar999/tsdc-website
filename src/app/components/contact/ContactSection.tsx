'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'

export default function ContactSection() {
  const { openPopup } = useContactPopup()

  const primaryPopupOptions = {
    title: 'Talk to TSDC Admissions',
    subtitle: 'Share your details and we will help you choose the right course, batch, and next step.',
    interest: 'General Enquiry',
    source: 'contact-page-primary',
    ctaLabel: 'Send My Enquiry',
  }

  const counsellingPopupOptions = {
    title: 'Book a Free Counselling Session',
    subtitle: 'Tell us your current skill level and we will guide you toward the best course path.',
    interest: 'Free Counselling',
    source: 'contact-page-counselling',
    ctaLabel: 'Book My Session',
  }

  const quickActions = [
    {
      title: 'General Enquiry',
      text: 'Ask about courses, fees, timings, and the best starting point for you.',
      icon: MessageCircle,
      accent: '#3244b5',
      action: () => openPopup(primaryPopupOptions),
    },
    {
      title: 'Free Counselling',
      text: 'Get one-on-one guidance before you decide which creative path to take.',
      icon: CalendarDays,
      accent: '#ff9736',
      action: () => openPopup(counsellingPopupOptions),
    },
    {
      title: 'Course Guidance',
      text: 'Tell us your goal and we will match you to the right design or marketing course.',
      icon: Sparkles,
      accent: '#db4b87',
      action: () =>
        openPopup({
          title: 'Get Course Guidance',
          subtitle: 'Tell us your goal and we will help you choose the right TSDC program.',
          interest: 'Course Guidance',
          source: 'contact-page-guidance',
          ctaLabel: 'Get My Guidance',
        }),
    },
  ]

  return (
    <section className="site-section-bg relative min-h-[88vh] overflow-hidden px-4 py-10 md:py-14">
      <div className="absolute left-8 top-16 h-24 w-24 rounded-[1.8rem] border-[3px] border-[#10163a] bg-[#ff9736] shadow-[6px_6px_0_#10163a]" />
      <div className="absolute right-8 top-24 h-24 w-24 rounded-full border-[3px] border-[#10163a] bg-[#db4b87] shadow-[6px_6px_0_#10163a]" />
      <div className="absolute bottom-16 left-[12%] hidden h-16 w-16 rotate-45 border-[3px] border-[#10163a] bg-[#3244b5] shadow-[5px_5px_0_#10163a] lg:block" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[2.6rem] border-[3px] border-[#10163a] bg-white shadow-[10px_10px_0_#10163a]"
        >
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden bg-[#fff8ed] px-6 py-8 text-[#10163a] md:px-8 md:py-10">
              <div className="absolute -left-8 top-10 h-24 w-24 rounded-[1.8rem] border-[3px] border-[#10163a] bg-[#3244b5] shadow-[5px_5px_0_#10163a]" />
              <div className="absolute right-8 top-12 h-16 w-16 rounded-full border-[3px] border-[#10163a] bg-[#ffcb53] shadow-[4px_4px_0_#10163a]" />

              <div className="relative z-10">
                <div className="retro-pill px-4 py-2 text-sm font-black text-[#10163a]">
                  <Sparkles size={14} className="text-[#ff9736]" />
                  Contact TSDC Admissions
                </div>

                <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[0.94] md:text-6xl">
                  Turn one question into
                  <span className="block text-[#3244b5]">a real next step.</span>
                </h2>

                <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-[#445066] md:text-lg">
                  This page should not feel like a dead-end contact form. It should feel like a conversion-ready admissions desk for Graphic Design, UI/UX Design, Digital Marketing, Motion Graphics, and Video Editing.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { value: '5+', label: 'Creative career tracks', color: '#fff1dd' },
                    { value: '1', label: 'Unified admissions popup', color: '#eef1ff' },
                    { value: 'Fast', label: 'Response-oriented enquiry flow', color: '#fff1f6' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.4rem] border-[3px] border-[#10163a] px-4 py-5 shadow-[4px_4px_0_#10163a]"
                      style={{ backgroundColor: item.color }}
                    >
                      <p className="text-2xl font-black text-[#10163a]">{item.value}</p>
                      <p className="mt-1 text-sm leading-6 text-[#445066]">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => openPopup(primaryPopupOptions)}
                    className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-7 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-0.5"
                  >
                    Open Contact Form
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => openPopup(counsellingPopupOptions)}
                    className="rounded-[1rem] border-[3px] border-[#10163a] bg-white px-7 py-3.5 text-sm font-black text-[#10163a] shadow-[5px_5px_0_#10163a] transition hover:-translate-y-0.5"
                  >
                    Book Free Counselling
                  </button>
                </div>
              </div>
            </div>

            <div className="relative bg-[#fffdf7] px-6 py-8 md:px-8 md:py-10">
              <div className="grid gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon

                  return (
                    <button
                      key={action.title}
                      onClick={action.action}
                      className="group rounded-[1.8rem] border-[3px] border-[#10163a] bg-white p-5 text-left shadow-[6px_6px_0_#10163a] transition hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="rounded-[1rem] border-[3px] border-[#10163a] p-3 text-white shadow-[4px_4px_0_#10163a]"
                          style={{ backgroundColor: action.accent }}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="text-lg font-black text-[#10163a]">{action.title}</h3>
                            <ArrowRight
                              size={16}
                              className="text-[#94a3b8] transition group-hover:translate-x-1 group-hover:text-[#3244b5]"
                            />
                          </div>
                          <p className="mt-2 text-sm leading-7 text-[#475569]">{action.text}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-6 border-t-[3px] border-[#10163a] bg-white px-6 py-8 md:px-8 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3244b5]">
                  Admissions Support
                </p>
                <h3 className="mt-2 text-3xl font-black text-[#10163a]">
                  The contact page should close doubt, not just collect clicks.
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-8 text-[#475569]">
                  Every action opens the same shared popup so your workflow stays consistent, but the page now feels more like a persuasive admissions experience with clearer reasons to enquire.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Creative Courses',
                    text: 'Graphic Design, UI/UX Design, Digital Marketing, Motion Graphics, and Video Editing guidance.',
                    color: '#eef1ff',
                  },
                  {
                    title: 'Fast Response',
                    text: 'Your enquiry still goes through the same configured popup and backend flow used across the site.',
                    color: '#fff4e7',
                  },
                  {
                    title: 'Career Support',
                    text: 'Get clarity on batches, fee plans, portfolios, and job-focused learning paths.',
                    color: '#fff1f6',
                  },
                  {
                    title: 'Consistent Experience',
                    text: 'Visitors get one familiar popup flow whether they come from the homepage, course pages, or contact page.',
                    color: '#f7f8ff',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]"
                    style={{ backgroundColor: item.color }}
                  >
                    <h4 className="text-base font-black text-[#10163a]">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-[#475569]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="relative h-[320px] overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] bg-white shadow-[7px_7px_0_#10163a]">
                <iframe
                  src="https://www.google.com/maps?q=12.8817134,80.2026107&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border-[3px] border-[#10163a] bg-white p-4 shadow-[5px_5px_0_#10163a]">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#3244b5]">
                    <MapPin size={16} />
                    Traijo Skill Development Center
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-[#334155]">
                    <a
                      href="tel:+917358116929"
                      className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-[#f8fbff] px-3 py-2 shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#10163a]"
                    >
                      <Phone size={15} />
                      +91 73581 16929
                    </a>
                    <button
                      type="button"
                      onClick={() => openPopup(primaryPopupOptions)}
                      className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-[#fff7f1] px-3 py-2 text-[#fa8a43] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#10163a]"
                    >
                      <Mail size={15} />
                      Admissions Support
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openPopup(primaryPopupOptions)}
                className="rounded-[1.9rem] border-[3px] border-[#10163a] bg-[#3244b5] p-6 text-left text-white shadow-[7px_7px_0_#10163a] transition hover:-translate-y-1"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Launch Popup</p>
                <h4 className="mt-2 text-2xl font-black">Open the same admissions popup right from the contact page.</h4>
                <p className="mt-3 text-sm leading-7 text-white/85">
                  No separate form flow, no mismatch in behavior. Visitors get the same enquiry experience everywhere on the website.
                </p>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
