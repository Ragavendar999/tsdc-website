'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function Accordion({
  items,
}: {
  items: { title: string; content: React.ReactNode }[]
}) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isActive = activeIndex === index

        return (
          <div
            key={index}
            className="border rounded-2xl overflow-hidden bg-white/60 dark:bg-zinc-800 shadow-md"
          >
            <button
              onClick={() => setActiveIndex(isActive ? null : index)}
              className="w-full flex justify-between items-center px-6 py-4 font-semibold text-left text-gray-800 dark:text-gray-100 hover:bg-gray-100/70 dark:hover:bg-zinc-700 transition"
            >
              {item.title}
              <motion.div
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>

            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-zinc-700"
              >
                {item.content}
              </motion.div>
            )}
          </div>
        )
      })}
    </div>
  )
}
