'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Accordion } from '@/app/components/ui/accordion'

export default function GraphicDesignCoursePage() {
  const [showPopup, setShowPopup] = useState(false)

  const curriculumModules = [
    {
      title: 'Design Fundamentals & Principles',
      content:
        'Understand layout, balance, contrast, alignment, hierarchy, and grid systems with real-world examples.',
    },
    {
      title: 'Typography & Color Theory',
      content:
        'Explore emotional triggers, legibility, and creative expression using font pairings and color palettes.',
    },
    {
      title: 'Photoshop & Illustrator Tools',
      content:
        'Master essential Adobe tools used in branding, image editing, and vector illustration.',
    },
    {
      title: 'Branding & Identity Design',
      content:
        'Create brand systems including logos, mockups, and visual identities.',
    },
    {
      title: 'Print + Digital Projects',
      content:
        'Design brochures, flyers, social media posts, and web banners using professional workflows.',
    },
    {
      title: 'Portfolio & Real Projects',
      content:
        'Build a complete portfolio with real design briefs and mentor feedback.',
    },
  ]

  const features = [
    '🎨 Hands-on Design Projects',
    '💼 Internship & Freelance Support',
    '🧠 Mentorship from Experts',
    '📜 Government-Recognized Certification',
    '🛠 Adobe Photoshop & Illustrator Training',
    '🔥 Lifetime Access to Materials',
  ]

  const testimonials = [
    {
      quote:
        'TSDC gave me the confidence and skills to freelance as a designer. The projects were real, and the mentorship was personal!',
      author: '— Ayesha R, Freelancer',
    },
    {
      quote:
        'The portfolio I created here helped me land my first job at a branding agency. It was a game-changer.',
      author: '— Dinesh K, Junior Designer',
    },
  ]

  return (
    <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-white via-zinc-50 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-gray-900 dark:text-gray-100 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97]"
          >
            Become a Graphic Design Pro
          </motion.h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Transform your creativity into a career. Get real skills, mentorship, and live projects.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setShowPopup(true)}
              className="bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] text-white px-6 py-3 rounded-full shadow-xl hover:scale-105 transition text-sm font-semibold"
            >
              Apply Now
            </button>
            <Link href="#curriculum" className="text-[#E83E8C] underline text-sm self-center">
              Download Curriculum
            </Link>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl mb-20">
          <Image
            src="/Gd1.jpeg"
            alt="Graphic Design Banner"
            width={1500}
            height={440}
            className="object-cover w-full h-[440px]"
          />
        </div>

        <div id="curriculum" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6 text-center">What You’ll Learn</h2>
          <Accordion items={curriculumModules} />
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-semibold mb-6 text-center">Course Features</h2>
          <ul className="grid md:grid-cols-3 gap-6 text-sm">
            {features.map((feature, i) => (
              <li
                key={i}
                className="bg-white/50 dark:bg-zinc-800 p-5 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-md"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-20 text-center">
          <h2 className="text-3xl font-semibold mb-6">Upcoming Batches</h2>
          <div className="inline-block bg-white/60 dark:bg-zinc-800 p-6 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-md">
            <p className="text-sm">📅 Duration: <strong>12 Weeks</strong></p>
            <p className="text-sm">🧑‍🏫 Mode: <strong>Offline / Online / Hybrid</strong></p>
            <p className="text-sm">🚀 Next Batches: <strong>Aug 1, 2025 | Sep 5, 2025</strong></p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-semibold mb-6 text-center">Student Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-5 bg-white/60 dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-md"
              >
                <p className="text-sm">"{t.quote}"</p>
                <p className="mt-2 text-xs text-right">{t.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="enroll" className="text-center">
          <h2 className="text-3xl font-bold mb-4">Design Your Future Today</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Join TSDC’s Graphic Design Mastery and become a professional visual communicator.
          </p>
          <button
            onClick={() => setShowPopup(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] text-white rounded-full font-medium hover:scale-105 transition"
          >
            Apply Now
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative bg-white dark:bg-zinc-900 p-6 rounded-2xl max-w-sm w-full shadow-2xl text-center">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2">Speak to Our Counselor</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">Tap the number below to contact us on WhatsApp or Call</p>
            <a
              href="https://wa.me/917358116929"
              target="_blank"
              className="text-[#4B3A97] text-lg font-semibold underline"
            >
              +91 73581 16929
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
