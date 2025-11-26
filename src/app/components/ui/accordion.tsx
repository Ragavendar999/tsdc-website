'use client'

import * as React from 'react'

export function Accordion({
  items,
}: {
  items: { title: string; content: React.ReactNode }[]
}) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border rounded-xl overflow-hidden">
          <button
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            className="w-full text-left px-5 py-3 font-medium bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"
          >
            {item.title}
          </button>
          {activeIndex === index && (
            <div className="px-5 py-4 text-sm text-gray-800 dark:text-gray-300">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
