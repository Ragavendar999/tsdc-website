'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Phone } from 'lucide-react'

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setFormSubmitted(true)
      form.reset()
      setTimeout(() => setFormSubmitted(false), 4000)
    } else {
      alert('Failed to send message. Please try again later.')
    }
  }

  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-white via-[#fef6f2] to-[#ffece6] dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 py-10 px-4 flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl font-extrabold text-[#2F52A0] dark:text-[#FF8652]">
              Let’s Connect with Traijo
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300 text-base">
              Future Creators, Designers, and Marketers — this is your moment!
              Reach out and let’s start building your dream career together.
            </p>
          </div>

          <div className="h-[300px] rounded-2xl overflow-hidden shadow-lg relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4043768777274!2d80.20013457403127!3d12.881699316845065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525b9bc3c5abe1%3A0x319e95489c67101a!2sTraijo%20Skill%20Development%20Center!5e0!3m2!1sen!2sin!4v1752409406800!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-zinc-800/80 px-4 py-2 rounded-xl flex items-center gap-2 text-[#2F52A0] dark:text-[#FF8652] shadow-md text-sm font-medium">
              <Phone size={16} />
              <span>+91 73581 16929</span>
            </div>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-zinc-700"
        >
          <h3 className="text-xl font-semibold text-[#2F52A0] dark:text-[#FF8652] mb-2">
            Start Your Creative Journey
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Tell us where you want to go — we’ll help you get there.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                pattern="[0-9]{10}"
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Interested In</label>
              <select
                name="interest"
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
              >
                <option value="">Select a course</option>
                <option>Graphic Design</option>
                <option>UI/UX Design</option>
                <option>Digital Marketing</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                name="message"
                rows={3}
                required
                placeholder="Tell us how we can support your goals..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-[#2F52A0] via-[#FF8652] to-[#F6416C] text-white font-semibold hover:shadow-md transition-all"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {formSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mt-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 p-3 rounded-lg text-sm"
            >
              ✅ Thank you! Your message has been sent.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
