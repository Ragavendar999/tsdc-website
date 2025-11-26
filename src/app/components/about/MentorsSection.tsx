'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function MentorsSection() {
  const mentor = {
    name: 'Ragavendar',
    role: 'Graphic Design, UI UX Design & Digital Marketing Mentor',
    image: 'ragavendar.jpg',
    description:
      'With over 8 years of experience in visual design, branding, and motion graphics, Ragavendar brings industry relevance and mentorship that inspires creativity and confidence.'
  }

  return (
    <section className="bg-[#FFF5F2] dark:bg-zinc-900 py-20 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-[#2F52A0] dark:text-[#FF8652] mb-4">
          Meet Our Mentor
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Learn from a real-world creative professional who turns passion into skill, and students into creators.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 rounded-3xl shadow-lg overflow-hidden text-center px-6 py-10"
      >
        <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-6">
          <Image
            src={mentor.image}
            alt={mentor.name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="text-2xl font-bold text-[#2F52A0] dark:text-[#FF8652] mb-2">
          {mentor.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-3">
          {mentor.role}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {mentor.description}
        </p>
      </motion.div>
    </section>
  )
}
