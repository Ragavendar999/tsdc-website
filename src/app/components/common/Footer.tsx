'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const legalLinks = [
  { title: 'Privacy Policy', id: 'privacy' },
  { title: 'Terms of Service', id: 'terms' },
  { title: 'Refund & Cancellation Policy', id: 'refund' },
  { title: 'Cookie Consent', id: 'cookie' },
]

const policyContent: Record<string, string> = {
  privacy: `We collect limited personal data (name, email, phone) only for course enrollment and support.
We never share your data with third parties. All communication is secured with HTTPS encryption.
You have the right to request, modify, or delete your data anytime by contacting support@tsdc.in.`,

  terms: `By accessing our website or enrolling in a course, you agree to:
1. Use our content for personal learning only
2. Not share credentials or reproduce our materials without consent
3. Behave respectfully in community discussions and live sessions`,

  refund: `No refund will be issued once the course fee is paid.
Please ensure your decision before enrollment. Exceptional cases will be handled case-by-case by management.
To raise a concern, contact support@tsdc.in with details.`,

  cookie: `We use cookies to personalize your experience, track usage for analytics, and improve our content.
By continuing to use this site, you consent to our cookie usage. You can manage cookies in your browser settings.`,
}

export default function Footer() {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const closeModal = () => setOpenModal(null)

  return (
    <footer className="relative z-10 bg-gradient-to-tr from-[#fff9f9] to-[#f5f8ff] dark:from-zinc-900 dark:to-zinc-950 border-t border-gray-200 dark:border-zinc-800 px-6 sm:px-8 py-12 text-sm text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 sm:gap-6">

        {/* Logo & About */}
        <div className="col-span-2 space-y-3">
          <Image src="/logo.png" alt="TSDC Logo" width={150} height={40} className="dark:invert" />
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Your Skill Development Partner.<br />
            100% Placement Assistance with Real Projects.<br />
            Empowering students through hands-on learning and mentorship.
          </p>
        </div>

        {/* Courses */}
        <div>
          <h5 className="font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">Courses</h5>
          <ul className="space-y-2">
            {['graphic-design', 'uiux-design', 'digital-marketing'].map((slug) => (
              <li key={slug}>
                <a href={`/courses/${slug}`} className="hover:underline hover:text-[#E83E8C] transition">
                  {slug.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h5 className="font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">Legal</h5>
          <ul className="space-y-2">
            {legalLinks.map(link => (
              <li key={link.id}>
                <button
                  onClick={() => setOpenModal(link.id)}
                  className="hover:underline hover:text-[#E83E8C] transition text-left w-full"
                >
                  {link.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">Contact</h5>
          <p>Email: <a href="mailto:support@tsdc.in" className="hover:text-[#E83E8C]">support@tsdc.in</a></p>
          <p>Phone: <a href="tel:+917358116929" className="hover:text-[#E83E8C]">+91-73581-16929</a></p>
          <p>Hours: Mon–Sat, 9AM – 6PM</p>

          {/* Desktop: Address */}
          <div className="hidden sm:block mt-4 text-gray-700 dark:text-gray-300">
            <strong>Address:</strong><br />
            Villa 20, Bollineni Iris, Block 52,<br />
            Bollineni Hillside Rd,<br />
            Nookampalayam, Arasankalani,<br />
            Perumbakkam, Chennai, Tamil Nadu 600119
          </div>

          {/* Mobile: Google Map */}
          <div className="mt-4 sm:hidden">
            <iframe
              title="TSDC Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.017830253116!2d80.19748417595414!3d12.8927413874186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f8e9d9f1505%3A0xe943804a32991d25!2sBollineni%20Iris%2C%20Block%2052%2C%20Bollineni%20Hillside%20Rd%2C%20Nookampalayam%2C%20Arasankalani%2C%20Perumbakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600119!5e0!3m2!1sen!2sin!4v1720877660000!5m2!1sen!2sin"
              width="100%"
              height="180"
              className="rounded-lg border border-gray-300"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Traijo Skill Development Center. All rights reserved.
      </div>

      {/* Legal Modal */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-900 max-w-lg w-full p-6 rounded-2xl shadow-xl text-left space-y-4 border border-[#E83E8C]"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {legalLinks.find(l => l.id === openModal)?.title}
                </h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-xl">&times;</button>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 max-h-[300px] overflow-y-auto whitespace-pre-line">
                {policyContent[openModal]}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
