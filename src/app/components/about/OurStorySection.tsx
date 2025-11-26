'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function OurStorySection() {
  return (
    <section className="relative bg-gradient-to-br from-white via-[#FFF5F2] to-[#FFFAF5] dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 pt-6 pb-16 overflow-hidden">

      {/* Floating Gradient Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#F6416C] rounded-full blur-[120px] opacity-30 -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#403EAA] rounded-full blur-[120px] opacity-25 -z-10" />

      {/* About Us Title */}
      <div className="text-center mb-16 relative z-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2F52A0] dark:text-[#FF8652] tracking-tight">
          About Us
        </h1>
        <p className="mt-4 text-base md:text-lg text-[#2B2B2B] dark:text-gray-400 max-w-xl mx-auto">
          Discover who we are, what drives us, and how we’re shaping the future of creative learning.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:flex lg:items-center lg:gap-16 relative z-10">

        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 mb-10 lg:mb-0"
        >
          <div className="border-4 border-[#2F52A0] dark:border-[#FF8652] rounded-3xl overflow-hidden">
            <Image
              src="/our-story.png"
              alt="TSDC Classroom"
              width={600}
              height={400}
              className="rounded-2xl object-cover w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Right: Story */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2F52A0] dark:text-[#FF8652]">
            Our Story
          </h2>
          <p className="text-base md:text-lg text-[#2B2B2B] dark:text-gray-300 mb-5 leading-relaxed">
            <strong>Traijo Skill Development Center</strong> was born with a powerful mission — to empower the next generation of creators, thinkers, and doers.
          </p>
          <p className="text-[#403EAA] dark:text-gray-400 mb-5 leading-relaxed">
            Our founder imagined a place where learning feels real, relevant, and personal. Where creativity isn't a subject — it's a superpower.
          </p>
          <p className="text-[#2B2B2B] dark:text-gray-400 mb-5">
            We said goodbye to boring textbooks and hello to hands-on projects, real-world mentorship, and a culture that puts students first.
          </p>
          <p className="italic text-[#F6416C] dark:text-[#FF8652] text-lg font-medium">
            Because real education doesn’t just teach you what to do — it inspires who you can become.
          </p>

          <div className="mt-6">
            <a
              href="https://wa.me/917358116929?text=Hi%20TSDC!%20I'm%20interested%20in%20joining%20your%20courses.%20Can%20you%20share%20more%20details?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#2F52A0] via-[#FF8652] to-[#F6416C] text-white text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
            >
              Start Your Journey
            </a>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
