'use client'

import { useEffect, useState } from 'react'

const DEADLINE = new Date('2026-05-02T00:00:00+05:30')

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function calc(): TimeLeft {
  const diff = DEADLINE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  }
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTime(calc())
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  if (time.expired) {
    return (
      <div className="rounded-[1rem] border-[3px] border-[#b42318] bg-[#fef2f2] px-4 py-3 text-center">
        <p className="text-sm font-black text-[#b42318]">Registration Closed</p>
      </div>
    )
  }

  const isUrgent = time.days < 3
  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hrs', value: time.hours },
    { label: 'Min', value: time.minutes },
    { label: 'Sec', value: time.seconds },
  ]

  return (
    <div className={`rounded-[1rem] border-[3px] ${isUrgent ? 'border-[#b42318] bg-[#fef2f2]' : 'border-[#10163a] bg-[#10163a]'} overflow-hidden`}>
      {/* urgency bar */}
      <div className={`px-4 py-2 text-center ${isUrgent ? 'bg-[#b42318]' : 'bg-[#ff9736]'}`}>
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white">
          {isUrgent ? '🚨 Final hours — ' : '⏳ '}Registration closes May 2nd, 2026
        </p>
      </div>

      {/* timer digits */}
      <div className={`flex items-center justify-center gap-1.5 px-4 py-3 ${isUrgent ? '' : ''}`}>
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-1.5">
            <div className="flex flex-col items-center">
              <div className={`flex min-w-[3rem] items-center justify-center rounded-[0.6rem] border-[2px] px-2 py-1.5 ${isUrgent ? 'border-[#fecaca] bg-white' : 'border-white/15 bg-white/10'}`}>
                <span className={`font-black tabular-nums leading-none ${isUrgent ? 'text-[#b42318]' : 'text-[#ff9736]'} text-2xl`}>
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className={`mt-1 text-[9px] font-black uppercase tracking-[0.14em] ${isUrgent ? 'text-[#667085]' : 'text-white/45'}`}>
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className={`mb-4 text-lg font-black ${isUrgent ? 'text-[#b42318]' : 'text-[#ff9736]'}`}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
