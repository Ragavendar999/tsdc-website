'use client'

import { MessageCircle } from 'lucide-react'

const WHATSAPP_LINK = 'https://wa.me/917358116929?text=Hi%20TSDC%2C%20I%20want%20help%20choosing%20the%20right%20course.'

export default function WhatsAppFAB() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with TSDC on WhatsApp"
      className="fixed bottom-5 right-5 z-[1300] inline-flex items-center gap-3 rounded-full border-[3px] border-[#10163a] bg-[#25D366] px-4 py-3 text-sm font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-1"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#10163a] bg-white text-[#25D366]">
        <MessageCircle size={20} />
      </span>
      <span className="hidden sm:inline">WhatsApp Admissions</span>
    </a>
  )
}
