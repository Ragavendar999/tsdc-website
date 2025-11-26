'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Accordion } from '@/app/components/ui/accordion'

export default function DigitalMarketingCoursePage() {
  const [showPopup, setShowPopup] = useState(false)

  const curriculumModules = [
    {
      title: 'Marketing Fundamentals & Strategy',
      content: 'Understand the core concepts of digital marketing including marketing funnels, branding, and customer psychology.'
    },
    {
      title: 'SEO & Content Marketing',
      content: 'Learn keyword research, on-page SEO, blogging, and how to build organic traffic and authority.'
    },
    {
      title: 'Paid Ads: Google & Meta',
      content: 'Hands-on campaign setup, ad creation, targeting, budgeting, and analyzing ROI with real dashboards.'
    },
    {
      title: 'Social Media & Influencer Strategy',
      content: 'Create engaging content calendars and campaigns across Instagram, LinkedIn, YouTube, and more.'
    },
    {
      title: 'Email & Automation Tools',
      content: 'Master Mailchimp, ConvertKit, and automation flows to nurture leads and increase conversions.'
    },
    {
      title: 'Analytics & Reporting',
      content: 'Use Google Analytics, Meta Insights, and tracking tools to make data-driven decisions.'
    }
  ]

  const features = [
    '📈 Live Client Campaigns & Case Studies',
    '📊 Meta Ads & Google Ads Certifications',
    '🤝 Freelance & Placement Support',
    '📧 Email Automation Hands-On Training',
    '💡 Social Media Growth Strategies',
    '🎓 Lifetime Curriculum Access'
  ]

  const testimonials = [
    {
      quote: 'From zero to landing freelance projects in 2 months — this course is worth every minute. Super practical and empowering!',
      author: '— Priya M, Digital Marketer'
    },
    {
      quote: 'The internship opportunity and real client exposure made me feel industry-ready. I cracked my agency interview easily.',
      author: '— Rahul S, Performance Marketing Executive'
    }
  ]

  return (
    <section className="pt-28 pb-20 px-6 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97]"
          >
            Digital Marketing Pro Program
          </motion.h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Learn how to drive real results online — SEO, paid ads, social media, content, and analytics in one complete program.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => setShowPopup(true)}
              className="bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition"
            >
              Apply Now
            </button>
            <Link href="#curriculum" className="text-[#E83E8C] underline text-sm self-center">
              Download Curriculum
            </Link>
          </div>
        </div>

        <Image
          src="/Gd1.jpeg"
          alt="Digital Marketing Banner"
          width={1500}
          height={440}
          className="rounded-xl shadow mb-20"
        />

        <div id="curriculum" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">What You’ll Learn</h2>
          <Accordion items={curriculumModules} />
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">Course Features</h2>
          <ul className="grid md:grid-cols-3 gap-6 text-sm">
            {features.map((feature, i) => (
              <li
                key={i}
                className="bg-zinc-100 dark:bg-zinc-800 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold mb-6">Upcoming Batches</h2>
          <div className="inline-block bg-zinc-100 dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-md">
            <p className="text-sm">📅 Duration: <strong>8 Weeks</strong></p>
            <p className="text-sm">🧑‍🏫 Mode: <strong>Offline / Online / Hybrid</strong></p>
            <p className="text-sm">🚀 Next Batches: <strong>Aug 10, 2025 | Sep 15, 2025</strong></p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">Student Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-5 bg-zinc-100 dark:bg-zinc-800 rounded-2xl shadow-md"
              >
                <p className="text-sm italic">"{t.quote}"</p>
                <p className="mt-2 text-xs text-right">{t.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="enroll" className="text-center">
          <h2 className="text-3xl font-bold mb-4">Start Growing Brands Today</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Enroll in TSDC’s Digital Marketing Program and become a certified growth expert.
          </p>
          <button
            onClick={() => setShowPopup(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#4B3A97] via-[#E83E8C] to-[#F4793E] text-white rounded-full font-medium hover:brightness-110 shadow-md"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* WhatsApp Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="relative bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl max-w-sm w-full text-center">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2">Talk to Our Admissions Team</h3>
            <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
              Connect directly on WhatsApp for course queries, guidance or quick enrollment.
            </p>
            <a
              href="https://wa.me/917358116929"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#25D366] text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
            >
              📱 +91 73581 16929
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
