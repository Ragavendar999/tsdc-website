'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Accordion } from '@/app/components/ui/accordion'

export default function UiUxDesignCoursePage() {
  const [showPopup, setShowPopup] = useState(false)

  const curriculumModules = [
    {
      title: 'UX Research & User Psychology',
      content:
        'Understand user behavior, conduct user interviews, and build empathy maps and personas.',
    },
    {
      title: 'Wireframing & Prototyping',
      content:
        'Sketch low-fidelity wireframes and convert them into interactive prototypes using Figma.',
    },
    {
      title: 'UI Design Principles',
      content:
        'Master layout, typography, spacing, and color systems for user-centric interfaces.',
    },
    {
      title: 'Design Systems & Components',
      content:
        'Build scalable design systems with reusable components and consistent styles.',
    },
    {
      title: 'Mobile & Web UI Projects',
      content:
        'Design responsive UIs for mobile apps and websites, including dashboards and landing pages.',
    },
    {
      title: 'Portfolio + Case Studies',
      content:
        'Document real projects with UX process, decisions, and learnings to build strong case studies.',
    },
  ]

  const features = [
    '📱 App & Web UI Projects',
    '💼 Internship & Freelance Pathways',
    '🔍 UX Research Techniques',
    '🎨 Advanced Figma Training',
    '📚 Design System & Accessibility Practices',
    '💡 Lifetime Portfolio Feedback'
  ]

  const testimonials = [
    {
      quote:
        'This course made me fall in love with design. I built confidence in UX research and landed a paid internship right after.',
      author: '— Meera S, Product Designer Intern',
    },
    {
      quote:
        'The clarity and logic behind UI/UX finally clicked. I now run freelance UI projects for startups!',
      author: '— Arvind K, Freelance UI Designer',
    },
  ]

  return (
    <section className="pt-32 pb-24 px-4 md:px-8 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 relative">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-20 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            UI/UX Design Mastery Program
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn human-first product design with real-world projects, Figma mastery, and UX strategy.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => setShowPopup(true)}
              className="bg-[#4B3A97] hover:bg-[#3a2f78] text-white px-8 py-3 rounded-full text-sm font-medium shadow-lg"
            >
              Enroll Now
            </button>
            <Link
              href="#curriculum"
              className="text-[#4B3A97] hover:underline text-sm font-semibold mt-2 md:mt-0"
            >
              📄 Download Curriculum
            </Link>
          </div>
        </div>

        <Image
          src="/Gd1.jpeg"
          alt="UI UX Design Banner"
          width={1500}
          height={440}
          className="rounded-3xl shadow-xl mb-24"
        />

        {/* Curriculum */}
        <div id="curriculum" className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What You’ll Learn</h2>
          <Accordion items={curriculumModules} />
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Course Features</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            {features.map((feature, i) => (
              <li
                key={i}
                className="bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Batches */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Upcoming Batches</h2>
          <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2 text-sm">
            <p>📅 <strong>Duration:</strong> 10 Weeks</p>
            <p>🧑‍💻 <strong>Mode:</strong> Offline / Online / Hybrid</p>
            <p>🚀 <strong>Next Batches:</strong> Jul 25, 2025 | Aug 29, 2025</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Student Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl shadow-md"
              >
                <p className="text-base italic">“{t.quote}”</p>
                <p className="mt-3 text-right text-sm font-semibold text-zinc-600 dark:text-zinc-400">{t.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">Start Designing for Humans</h2>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join the TSDC UI/UX Design Mastery program and shape the future of user experiences.
          </p>
          <button
            onClick={() => setShowPopup(true)}
            className="px-8 py-3 bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] text-white rounded-full font-semibold shadow-lg hover:brightness-110"
          >
            Apply Now
          </button>
        </div>

        {/* WhatsApp Popup */}
        {showPopup && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <div className="relative bg-white dark:bg-zinc-900 text-center p-8 rounded-3xl shadow-xl w-full max-w-sm">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
              <p className="text-xl font-bold mb-2">Ready to Enroll?</p>
              <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">Message us directly on WhatsApp!</p>
              <a
                href="https://wa.me/917358116929"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] text-white px-6 py-2 rounded-full font-medium hover:scale-105 transition"
              >
                📱 +91 73581 16929
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
