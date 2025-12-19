'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { X } from 'lucide-react'

// ====== FULL SYLLABUS DATA ======
const fullSyllabus = [
  {
    module: 'Module 1 — Design Foundations',
    topics: [
      'Principles of Design: Alignment, Balance, Contrast, Rhythm',
      'Visual Hierarchy & Composition Mastery',
      'Layout Grids & Negative Space',
      'Understanding Design Thinking'
    ]
  },
  {
    module: 'Module 2 — Color Theory & Emotional Design',
    topics: [
      'Color Psychology',
      'Brand Color Development',
      'Palette Creation for Digital + Print',
      'Gradient Systems & Tonal Range Studies'
    ]
  },
  {
    module: 'Module 3 — Typography Mastery',
    topics: [
      'Font Families, Pairing Techniques',
      'Kerning, Tracking, Leading',
      'Typography in Branding & UI',
      'Readable Type Systems'
    ]
  },
  {
    module: 'Module 4 — Adobe Photoshop Expert Training',
    topics: [
      'Photo Manipulation & Retouching',
      'Social Media Poster Design',
      'Marketing Creatives for Real Clients',
      'Advanced Selection & Masking'
    ]
  },
  {
    module: 'Module 5 — Illustrator Branding & Vector Design',
    topics: [
      'Logo Creation Techniques',
      'Brand Identity Systems',
      'Iconography Design',
      'Packaging Design Workflow'
    ]
  },
  {
    module: 'Module 6 — Adobe InDesign for Publishing',
    topics: [
      'Magazine Layout Structure',
      'Brochure + Proposal Design',
      'Grid-Based Publishing Tools',
      'Export for Commercial Print'
    ]
  },
  {
    module: 'Module 7 — Social Media + Commercial Design',
    topics: [
      'Ad Creatives for Real Brands',
      'Carousel, Reels Thumbnails',
      'Brand Storytelling Frameworks',
      'Campaign Design for Advertoria Clients'
    ]
  },
  {
    module: 'Module 8 — UI Visual Design Basics',
    topics: [
      'UI Layouts & Buttons',
      'Dashboard Visuals',
      'App Icon Styles',
      'Component Systems for Designers'
    ]
  },
  {
    module: 'Module 9 — Portfolio & Case Studies',
    topics: [
      'Behance Case Study Writing',
      'Dribbble Visual Planning',
      'Personal Brand Identity Creation',
      'Final Portfolio Review'
    ]
  }
]

export default function GraphicDesignCoursePage() {
  const [showPopup, setShowPopup] = useState(false)
  const [showSyllabus, setShowSyllabus] = useState(false)

  const features = [
    '🎨 100% Practical Learning – Real Projects Included',
    '💼 Internship + Freelance Project Support',
    '🧠 1:1 Mentorship from Industry Designers',
    '📜 ISO 9001:2015 + MSME Certified Institute',
    '🛠 Photoshop + Illustrator + InDesign Mastery',
    '🚀 Real Client Projects from Advertoria Agency',
    '🔥 Lifetime Materials + Portfolio Support',
    '📁 Behance + Dribbble Case Studies'
  ]

  const testimonials = [
    {
      quote: 'The real branding projects completely transformed my skills. I got my first design job in 45 days!',
      author: '— Dinesh, Branding Designer'
    },
    {
      quote: 'The portfolio guidance helped me start freelancing even before the course ended!',
      author: '— Ayesha, Freelance Graphic Designer'
    }
  ]

  return (
    <section className="pt-12 pb-24 px-6 bg-gradient-to-b from-white via-[#faf4ff] to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      {/* 🔥 REDUCED TOP SPACE FROM pt-24 → pt-12 */}

      <div className="max-w-7xl mx-auto">

{/* ===================== ADVANCED INTERACTIVE HERO ===================== */}
<div className="relative mb-20">

  {/* Floating Gradient Orbs */}
  <motion.div
    animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 6, repeat: Infinity }}
    className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#F4793E]/30 via-[#E83E8C]/30 to-[#4B3A97]/30 blur-3xl z-0"
  />

  <motion.div
    animate={{ y: [0, 20, 0], opacity: [1, 0.5, 1] }}
    transition={{ duration: 7, repeat: Infinity }}
    className="absolute bottom-20 right-20 w-52 h-52 rounded-full bg-gradient-to-tr from-[#E83E8C]/20 via-[#4B3A97]/25 to-[#F4793E]/20 blur-3xl z-0"
  />

  <div className="relative grid md:grid-cols-2 gap-10 items-center">
    
    {/* LEFT SECTION */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="z-10"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] leading-tight drop-shadow-sm"
      >
        Graphic Design <br /> Mastery Program
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mt-5 text-gray-600 dark:text-gray-300 text-lg max-w-lg"
      >
        Become a commercial graphic designer with real client experience, 
        advanced Adobe tools, branding, packaging, UI visuals & a job-ready portfolio.
      </motion.p>

      {/* Features */}
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="mt-6 space-y-3 text-gray-700 dark:text-gray-300 text-sm"
      >
        {["✔ Beginner-Friendly", "✔ 5+ Live Real-Client Projects", "✔ Placement-Focused Training"]
          .map((item, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              {item}
            </motion.li>
          ))}
      </motion.ul>

      {/* CTA BUTTONS */}
      <div className="mt-8 flex gap-4">

        {/* Apply */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowPopup(true)}
          className="bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] text-white px-7 py-3 rounded-full shadow-2xl font-semibold transition hover:shadow-[0_0_35px_rgba(232,62,140,0.4)]"
        >
          Apply Now
        </motion.button>

        {/* View Syllabus */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowSyllabus(true)}
          className="relative text-[#E83E8C] font-semibold group"
        >
          View Full Syllabus
          <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-[#E83E8C] transition-all duration-300"></span>
        </motion.button>

      </div>
    </motion.div>

    {/* RIGHT IMAGE */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9 }}
      whileHover={{ scale: 1.03, rotate: 1 }}
      className="z-10"
    >
      <motion.div
        whileHover={{ y: -8, boxShadow: '0px 20px 40px rgba(0,0,0,0.25)' }}
        transition={{ type: 'spring', stiffness: 150 }}
      >
        <Image
          src="/Gd1.jpeg"
          alt="Graphic Design Course"
          width={520}
          height={520}
          className="rounded-3xl shadow-2xl object-cover"
        />
      </motion.div>
    </motion.div>

  </div>
</div>

{/* ===================== PREMIUM COURSE HIGHLIGHTS ===================== */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }}
  className="mb-24"
>
  <h2 className="text-4xl font-bold text-center mb-12">
    What You’ll Experience
  </h2>

  <div className="grid md:grid-cols-3 gap-8">
    {[
      {
        title: "3 Months Intensive Training",
        desc: "Hands-on weekly activities, design challenges, and guided assignments.",
        icon: "🎓"
      },
      {
        title: "Work on Real Brand Projects",
        desc: "Design logos, posters, packaging & ads for actual client case studies.",
        icon: "🔥"
      },
      {
        title: "Portfolio + Internship Support",
        desc: "Build a stunning Behance portfolio and get real industry experience.",
        icon: "🚀"
      }
    ].map((item, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05, rotate: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="
          relative p-[2px] rounded-2xl 
          bg-gradient-to-br from-[#F4793E] via-[#E83E8C] to-[#4B3A97] 
          shadow-lg hover:shadow-[0_0_25px_rgba(232,62,140,0.4)]
        "
      >
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl h-full">
          
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 * i, duration: 0.4 }}
            className="text-5xl mb-4"
          >
            {item.icon}
          </motion.div>

          <h3 className="text-xl font-bold mb-3 text-[#E83E8C]">
            {item.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            {item.desc}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

        {/* ===================== FEATURES ===================== */}
        <h2 className="text-4xl font-bold text-center mb-10">Why Choose TSDC?</h2>

        <ul className="grid md:grid-cols-3 gap-6 mb-24">
          {features.map((f, i) => (
            <li
              key={i}
              className="p-6 bg-white/70 dark:bg-zinc-800 rounded-2xl border shadow-xl hover:scale-[1.02] transition"
            >
              {f}
            </li>
          ))}
        </ul>

        {/* ===================== TESTIMONIALS ===================== */}
        <h2 className="text-4xl font-bold text-center mb-10">Student Success Stories</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 bg-white/80 dark:bg-zinc-800 rounded-2xl border shadow-xl">
              <p className="text-sm leading-relaxed">"{t.quote}"</p>
              <p className="mt-3 text-xs font-semibold text-right">{t.author}</p>
            </div>
          ))}
        </div>

        {/* ===================== CTA ===================== */}
        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold mb-4">Start Your Design Career Today</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-6">
            Join our industry-ready Graphic Design Masterclass and become a professional designer with real-world experience.
          </p>

          <button
            onClick={() => setShowPopup(true)}
            className="px-8 py-3 bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] text-white rounded-full font-semibold hover:scale-[1.05] transition"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* ===================== FIXED SCROLLABLE SYLLABUS MODAL ===================== */}
      {showSyllabus && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center p-4 overflow-y-auto">
          
          <div className="relative bg-white dark:bg-zinc-900 p-8 rounded-2xl max-w-2xl w-full shadow-2xl 
              max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setShowSyllabus(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-6 text-center">Full Course Syllabus</h3>

            <div className="space-y-6">
              {fullSyllabus.map((block, i) => (
                <div key={i} className="border-b pb-4">
                  <h4 className="text-lg font-semibold mb-2 text-[#E83E8C]">{block.module}</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {block.topics.map((t, idx) => (
                      <li key={idx}>• {t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ===================== COUNSELOR POPUP ===================== */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative bg-white dark:bg-zinc-900 p-8 rounded-2xl max-w-sm w-full shadow-2xl text-center">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-2">Speak to Our Counselor</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Tap below to contact us instantly (Call / WhatsApp)
            </p>

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
