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
      accent: 'from-[#4562b0] to-[#5c79c8]',
      onClick: () => openPopup(primaryPopupOptions),
    },
    {
      title: 'Free Counselling',
      text: 'Get one-on-one guidance before you decide which creative path to take.',
      icon: CalendarDays,
      accent: 'from-[#fa8a43] to-[#ffb26b]',
      onClick: () => openPopup(counsellingPopupOptions),
    },
    {
      title: 'Course Guidance',
      text: 'Tell us your goal and we will match you to the right design or marketing course.',
      icon: Sparkles,
      accent: 'from-[#ea6865] to-[#f49a98]',
      onClick: () =>
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(69,98,176,0.16),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(250,138,67,0.18),_transparent_28%),linear-gradient(180deg,_#f7f9ff_0%,_#ffffff_48%,_#f8fbff_100%)]" />
      <div className="absolute left-8 top-20 h-28 w-28 rounded-[2.5rem] bg-[#4562b0]/10 blur-sm" />
      <div className="absolute right-8 top-24 h-32 w-32 rounded-full bg-[#fa8a43]/14 blur-sm" />
      <div className="absolute bottom-16 left-[10%] h-20 w-20 rounded-full bg-[#ea6865]/14 blur-sm" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[2.2rem] border border-[#d9e2f3] bg-white/85 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-sm"
        >
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative overflow-hidden bg-[#0f172a] px-6 py-8 text-white md:px-8 md:py-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(92,121,200,0.55),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(250,138,67,0.35),_transparent_26%)]" />
              <div className="absolute left-[-2rem] top-10 h-28 w-28 rounded-[2.2rem] bg-white/10" />
              <div className="absolute right-8 top-12 h-16 w-16 rounded-full bg-[#fa8a43]/65" />
              <div className="absolute bottom-10 right-[-1rem] h-28 w-28 rounded-full bg-[#4562b0]/40 blur-sm" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm">
                  <Sparkles size={14} />
                  Contact TSDC Admissions
                </div>

                <h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight md:text-6xl">
                  Contact page, but with the same <span className="text-[#8cb2ff]">popup experience</span>.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/82 md:text-lg">
                  Reach out for Graphic Design, UI/UX Design, Digital Marketing, Motion Graphics, or Video Editing guidance. This page now feels like a dedicated admissions hub while keeping the same popup workflow used across the rest of the site.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { value: '5+', label: 'Creative career tracks' },
                    { value: '1', label: 'Unified admissions popup' },
                    { value: 'Fast', label: 'Response-oriented enquiry flow' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-5 backdrop-blur-sm"
                    >
                      <p className="text-2xl font-black text-white">{item.value}</p>
                      <p className="mt-1 text-sm leading-6 text-white/72">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => openPopup(primaryPopupOptions)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0f172a] shadow-[0_20px_45px_rgba(255,255,255,0.18)] transition hover:-translate-y-0.5"
                  >
                    Open Contact Form
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => openPopup(counsellingPopupOptions)}
                    className="rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/16"
                  >
                    Book Free Counselling
                  </button>
                </div>
              </div>
            </div>

            <div className="relative bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)] px-6 py-8 md:px-8 md:py-10">
              <div className="grid gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon

                  return (
                    <button
                      key={action.title}
                      onClick={action.onClick}
                      className="group rounded-[1.7rem] border border-[#dbe3f3] bg-white p-5 text-left shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_26px_50px_rgba(15,23,42,0.1)]"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`rounded-2xl bg-gradient-to-br ${action.accent} p-3 text-white shadow-lg`}>
                          <Icon size={18} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="text-lg font-black text-[#0f172a]">{action.title}</h3>
                            <ArrowRight
                              size={16}
                              className="text-[#94a3b8] transition group-hover:translate-x-1 group-hover:text-[#4562b0]"
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

          <div className="grid gap-6 border-t border-[#e3e8f5] bg-white px-6 py-8 md:px-8 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4562b0]">
                  Admissions Support
                </p>
                <h3 className="mt-2 text-3xl font-black text-[#0f172a]">
                  The contact page now behaves like a premium admissions entry point.
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-8 text-[#475569]">
                  Every action still opens the same shared popup so your functionality stays consistent, but the page itself now gives visitors a more polished, visually richer place to start.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Creative Courses',
                    text: 'Graphic Design, UI/UX Design, Digital Marketing, Motion Graphics, and Video Editing guidance.',
                    color: 'bg-[#f8fbff] text-[#4562b0]',
                  },
                  {
                    title: 'Fast Response',
                    text: 'Your enquiry still goes through the same configured popup and backend flow used across the site.',
                    color: 'bg-[#fff7f1] text-[#fa8a43]',
                  },
                  {
                    title: 'Career Support',
                    text: 'Get clarity on batches, fee plans, portfolios, and job-focused learning paths.',
                    color: 'bg-[#fff5f5] text-[#ea6865]',
                  },
                  {
                    title: 'Consistent Experience',
                    text: 'Visitors get one familiar popup flow whether they come from the homepage, course pages, or contact page.',
                    color: 'bg-[#f5f7ff] text-[#334155]',
                  },
                ].map((item) => (
                  <div key={item.title} className={`rounded-[1.5rem] border border-[#e3e8f5] p-5 ${item.color}`}>
                    <h4 className="text-base font-black">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-[#475569]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="relative h-[320px] overflow-hidden rounded-[2rem] border border-[#d9e2f3] bg-white shadow-[0_30px_70px_rgba(15,23,42,0.1)]">
                <iframe
                  src="https://www.google.com/maps?q=12.8817134,80.2026107&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] bg-white/95 p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#4562b0]">
                    <MapPin size={16} />
                    Traijo Skill Development Center
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-[#334155]">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#f8fbff] px-3 py-2">
                      <Phone size={15} />
                      +91 73581 16929
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#fff7f1] px-3 py-2 text-[#fa8a43]">
                      <Mail size={15} />
                      Admissions Support
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openPopup(primaryPopupOptions)}
                className="rounded-[1.75rem] bg-[#4562b0] p-6 text-left text-white shadow-[0_26px_55px_rgba(69,98,176,0.24)] transition hover:-translate-y-1"
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
