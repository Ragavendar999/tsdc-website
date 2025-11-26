'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Paintbrush,
  MonitorSmartphone,
  Megaphone,
  CalendarClock,
  FileCheck2,
  X
} from 'lucide-react'

const iconAnimations = [
  { rotate: [0, 10, -10, 0] },
  { scale: [1, 1.2, 1] },
  { y: [0, -5, 0] }
]

const courses = [
  {
    title: 'Graphic Design',
    role: 'The Dreamer',
    icon: <Paintbrush className="w-10 h-10 text-[#E83E8C]" />,
    duration: '12 Weeks',
    certificate: 'Included',
    skills: ['Design Principles', 'Color Theory', 'Typography', 'Figma', 'Branding'],
    careerPath: ['Graphic Designer', 'Brand Designer', 'Freelancer'],
    bonus: 'Internship + Live Projects',
    color: 'from-[#fff5f8] to-[#ffeef1]',
    iconEffect: iconAnimations[0],
    link: '/courses/graphic-design',
  },
  {
    title: 'UI/UX Design',
    role: 'The Architect',
    icon: <MonitorSmartphone className="w-10 h-10 text-[#4B3A97]" />,
    duration: '10 Weeks',
    certificate: 'Included',
    skills: ['User Research', 'Wireframes', 'Prototypes', 'Design Systems', 'UX Audits'],
    careerPath: ['UI Designer', 'Product Designer', 'Freelancer'],
    bonus: 'Internship + Live Projects',
    color: 'from-[#f7f4ff] to-[#ede9fe]',
    iconEffect: iconAnimations[1],
    link: '/courses/uiux-design',
  },
  {
    title: 'Digital Marketing',
    role: 'The Wizard',
    icon: <Megaphone className="w-10 h-10 text-[#F4793E]" />,
    duration: '8 Weeks',
    certificate: 'Included',
    skills: ['SEO', 'Content Creation', 'Paid Ads', 'Analytics', 'Strategy'],
    careerPath: ['Digital Marketer', 'Content Strategist', 'Agency Owner'],
    bonus: 'Internship + Live Projects',
    color: 'from-[#fff9f2] to-[#fff4e9]',
    iconEffect: iconAnimations[2],
    link: '/courses/digital-marketing',
  }
]

export default function CoursesSection() {
  const [popupCourse, setPopupCourse] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handlePopupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    })

    setLoading(false)

    if (res.ok) {
      setSubmitted(true)
      form.reset()
      setTimeout(() => {
        setSubmitted(false)
        setPopupCourse(null)
      }, 4000)
    } else {
      alert('Failed to send message. Please try again later.')
    }
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white via-[#fff9f9] to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 dark:text-white"
        >
          Choose Your Superpower
        </motion.h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore immersive courses that shape your creativity and career path with hands-on learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {courses.map((course, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className={`rounded-3xl shadow border border-gray-200 dark:border-zinc-700 p-6 bg-gradient-to-br ${course.color} text-center hover:shadow-lg transition`}
          >
            <motion.div animate={course.iconEffect} transition={{ duration: 3, repeat: Infinity }} className="flex justify-center mb-4">
              {course.icon}
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-4">{course.role}</p>

            <div className="flex justify-center gap-6 text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">
              <span className="flex items-center gap-1">
                <CalendarClock size={14} /> Duration: {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <FileCheck2 size={14} /> Certificate: {course.certificate}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {course.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-full border border-[#E83E8C] text-xs text-[#E83E8C] font-medium hover:bg-[#fdf2f8] dark:hover:bg-[#2a1d2e] transition">
                  {skill}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
              <strong>🎓 Career Path:</strong> {course.careerPath.join(', ')}
            </p>

            <p className="text-sm text-green-600 font-medium mb-4">🎁 {course.bonus}</p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setPopupCourse(course.title)}
                className="bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] hover:brightness-110 text-white text-sm px-4 py-2 rounded-full font-medium transition"
              >
                Enroll Now
              </button>
              <Link
                href={course.link}
                className="text-[#4B3A97] dark:text-white text-sm px-4 py-2 rounded-full border border-[#4B3A97] font-medium hover:bg-[#f3f0ff] dark:hover:bg-[#32214d] transition"
              >
                View Curriculum
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {popupCourse && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-zinc-900 max-w-xl w-full p-8 rounded-2xl shadow-2xl relative">
            <button onClick={() => setPopupCourse(null)} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition">
              <X size={20} />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-[#4B3A97] dark:text-white">
              Enroll in {popupCourse}
            </h3>
            <form onSubmit={handlePopupSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Full Name" required className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-[#4B3A97] outline-none" />
              <input type="email" name="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-[#4B3A97] outline-none" />
              <input type="tel" name="mobile" placeholder="Mobile Number" required pattern="[0-9]{10}" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-[#4B3A97] outline-none" />
              <input type="hidden" name="interest" value={popupCourse} />
              <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#4B3A97] via-[#E83E8C] to-[#F4793E] text-white rounded-xl font-semibold transition hover:brightness-110">
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              {submitted && <p className="text-green-600 text-sm mt-2">✅ Thank you! Your details have been submitted.</p>}
            </form>
          </motion.div>
        </div>
      )}
    </section>
  )
}
