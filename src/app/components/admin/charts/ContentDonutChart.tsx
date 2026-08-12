'use client'

import { useState } from 'react'

export type DonutSegment = {
  label: string
  value: number
  color: string
}

const SIZE = 200
const RADIUS = 78
const STROKE = 26
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const GAP_DEG = 3

export default function ContentDonutChart({ segments }: { segments: DonutSegment[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const total = segments.reduce((sum, s) => sum + s.value, 0)

  let cumulativeDeg = 0
  const arcs = segments.map((segment, index) => {
    const fraction = total === 0 ? 0 : segment.value / total
    const segmentDeg = fraction * 360
    const startDeg = cumulativeDeg
    cumulativeDeg += segmentDeg

    const visibleDeg = Math.max(segmentDeg - GAP_DEG, 0)
    const dash = (visibleDeg / 360) * CIRCUMFERENCE
    const offset = -((startDeg / 360) * CIRCUMFERENCE)

    return { ...segment, index, dash, offset, percent: Math.round(fraction * 100) }
  })

  return (
    <div className="viz-root flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <style>{`
        .viz-root {
          --text-primary: #10163a;
          --text-secondary: #52514e;
          --text-muted: #898781;
          --surface-1: #ffffff;
        }
      `}</style>

      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} role="img" aria-label="Content items by type">
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="#eef0f7" strokeWidth={STROKE} />
          <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
            {arcs.map((arc) => (
              <circle
                key={arc.label}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={arc.color}
                strokeWidth={activeIndex === arc.index ? STROKE + 4 : STROKE}
                strokeDasharray={`${arc.dash} ${CIRCUMFERENCE - arc.dash}`}
                strokeDashoffset={arc.offset}
                strokeLinecap="round"
                onMouseEnter={() => setActiveIndex(arc.index)}
                onMouseLeave={() => setActiveIndex(null)}
                className="cursor-pointer transition-all"
              />
            ))}
          </g>
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-black text-[color:var(--text-primary)]">{total.toLocaleString('en-IN')}</p>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[color:var(--text-muted)]">Total</p>
        </div>
      </div>

      <ul className="w-full space-y-2.5">
        {arcs.map((arc) => (
          <li
            key={arc.label}
            onMouseEnter={() => setActiveIndex(arc.index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm transition ${
              activeIndex === arc.index ? 'bg-[#f5f6fb]' : ''
            }`}
          >
            <span className="flex items-center gap-2 font-semibold text-[color:var(--text-secondary)]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: arc.color }} />
              {arc.label}
            </span>
            <span className="font-black text-[color:var(--text-primary)]">
              {arc.value} <span className="font-semibold text-[color:var(--text-muted)]">({arc.percent}%)</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
