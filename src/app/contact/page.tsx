import React from 'react'
import Navbar from '../components/common/Navbar'
import ContactSection from '../components/contact/ContactSection'


// You can import additional sections like MissionSection, TeamSection, etc.

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main className="pt-0">
        <ContactSection />
        {/* Add more sections below as needed */}
      </main>
    </div>
  )
}
