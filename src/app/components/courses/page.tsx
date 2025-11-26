'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const courses = [
  {
    title: 'Graphic Design',
    desc: 'Learn the art of visual communication with hands-on design projects and real-world branding tasks.',
    image: '/images/courses/graphic-design.jpg',
    href: '/courses/graphic-design',
    duration: '12 Weeks',
    batches: ['Aug 1, 2025', 'Sep 5, 2025'],
    projects: '3 Live Projects + 1 Portfolio Build',
  },
  {
    title: 'UI/UX Design',
    desc: 'Master user experience and interface design with industry-standard tools and design systems.',
    image: '/images/courses/uiux-design.jpg',
    href: '/courses/uiux-design',
    duration: '10 Weeks',
    batches: ['Jul 25, 2025', 'Aug 29, 2025'],
    projects: '4 Product Redesigns + Internship Option',
  },
  {
    title: 'Digital Marketing',
    desc: 'From SEO to paid ads, learn to grow businesses online using digital strategies and campaign tools.',
    image: '/images/courses/digital-marketing.jpg',
    href: '/courses/digital-marketing',
    duration: '8 Weeks',
    batches: ['Aug 10, 2025', 'Sep 15, 2025'],
    projects: 'Campaign Simulations + 2 Live Clients',
  },
]

export default function CoursesPage() {
  return (
    <section className="pt-28 pb-20 px-6 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          All Courses at TSDC
        </motion.h1>

        <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-300">
          Choose from our job-ready, practical skill courses designed for career transformation.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-zinc-700"
            >
              <Image
                src={course.image}
                alt={course.title}
                width={400}
                height={240}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1 text-[#4B3A97]">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{course.desc}</p>

                <div className="text-xs space-y-1 mb-4">
                  <p>📅 Duration: <strong>{course.duration}</strong></p>
                  <p>🚀 Upcoming Batches: <strong>{course.batches.join(', ')}</strong></p>
                  <p>📁 Project Availability: <strong>{course.projects}</strong></p>
                </div>

                <Link
                  href={course.href}
                  className="inline-block mt-2 px-4 py-2 bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] text-white rounded-xl text-sm font-medium hover:brightness-110"
                >
                  View Curriculum
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
