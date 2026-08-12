'use client'

import { useRef, useState } from 'react'

export type TrafficPoint = {
  label: string
  visitors: number
  pageViews: number
}

const WIDTH = 640
const HEIGHT = 220
const PAD_LEFT = 40
const PAD_RIGHT = 12
const PAD_TOP = 12
const PAD_BOTTOM = 28
const PLOT_W = WIDTH - PAD_LEFT - PAD_RIGHT
const PLOT_H = HEIGHT - PAD_TOP - PAD_BOTTOM

const formatCompact = (value: number) => (value >= 1000 ? `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K` : `${value}`)

const buildPath = (points: { x: number; y: number }[]) => points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')

export default function TrafficLineChart({ data }: { data: TrafficPoint[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const maxValue = Math.max(...data.map((d) => Math.max(d.visitors, d.pageViews)))
  const niceMax = Math.ceil(maxValue / 1000) * 1000 || 1000
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(niceMax * f))

  const xFor = (i: number) => PAD_LEFT + (data.length === 1 ? PLOT_W / 2 : (PLOT_W * i) / (data.length - 1))
  const yFor = (value: number) => PAD_TOP + PLOT_H - (PLOT_H * value) / niceMax

  const visitorPoints = data.map((d, i) => ({ x: xFor(i), y: yFor(d.visitors) }))
  const pageViewPoints = data.map((d, i) => ({ x: xFor(i), y: yFor(d.pageViews) }))
  const areaPath = `${buildPath(visitorPoints)} L${xFor(data.length - 1)},${PAD_TOP + PLOT_H} L${xFor(0)},${PAD_TOP + PLOT_H} Z`

  const handleMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const relativeX = ((event.clientX - rect.left) / rect.width) * WIDTH
    const step = PLOT_W / Math.max(data.length - 1, 1)
    const index = Math.round((relativeX - PAD_LEFT) / step)
    setHoverIndex(Math.min(Math.max(index, 0), data.length - 1))
  }

  const hovered = hoverIndex !== null ? data[hoverIndex] : null
  const tooltipX = hoverIndex !== null ? xFor(hoverIndex) : 0
  const tooltipOnRight = tooltipX > WIDTH - 140

  return (
    <div className="viz-root">
      <style>{`
        .viz-root {
          --surface-1: #ffffff;
          --text-primary: #10163a;
          --text-secondary: #52514e;
          --text-muted: #898781;
          --grid-line: #e1e0d9;
          --series-1: #2a78d6;
          --series-2: #eb6834;
        }
      `}</style>

      <div className="mb-4 flex items-center gap-5">
        <span className="flex items-center gap-2 text-xs font-semibold text-[color:var(--text-secondary)]">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--series-1)' }} />
          Visitors
        </span>
        <span className="flex items-center gap-2 text-xs font-semibold text-[color:var(--text-secondary)]">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--series-2)' }} />
          Page Views
        </span>
      </div>

      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full touch-none"
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIndex(null)}
          role="img"
          aria-label="Visitors and page views over the selected period"
        >
          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD_LEFT}
                x2={WIDTH - PAD_RIGHT}
                y1={yFor(tick)}
                y2={yFor(tick)}
                stroke="var(--grid-line)"
                strokeWidth={1}
              />
              <text x={PAD_LEFT - 8} y={yFor(tick) + 3} textAnchor="end" fontSize={10} fill="var(--text-muted)">
                {formatCompact(tick)}
              </text>
            </g>
          ))}

          {data.map((d, i) =>
            i % Math.ceil(data.length / 6) === 0 ? (
              <text key={d.label} x={xFor(i)} y={HEIGHT - 8} textAnchor="middle" fontSize={10} fill="var(--text-muted)">
                {d.label}
              </text>
            ) : null
          )}

          <path d={areaPath} fill="var(--series-1)" opacity={0.1} stroke="none" />
          <path d={buildPath(visitorPoints)} fill="none" stroke="var(--series-1)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          <path d={buildPath(pageViewPoints)} fill="none" stroke="var(--series-2)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          {hoverIndex !== null && (
            <>
              <line x1={tooltipX} x2={tooltipX} y1={PAD_TOP} y2={PAD_TOP + PLOT_H} stroke="var(--text-muted)" strokeWidth={1} strokeDasharray="3,3" />
              <circle cx={tooltipX} cy={visitorPoints[hoverIndex].y} r={4} fill="var(--series-1)" stroke="var(--surface-1)" strokeWidth={2} />
              <circle cx={tooltipX} cy={pageViewPoints[hoverIndex].y} r={4} fill="var(--series-2)" stroke="var(--surface-1)" strokeWidth={2} />
            </>
          )}
        </svg>

        {hovered && (
          <div
            className="pointer-events-none absolute top-1 rounded-lg border border-[#e6e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#10163a] shadow-[0_4px_14px_rgba(16,22,58,0.12)]"
            style={{
              left: `${(tooltipX / WIDTH) * 100}%`,
              transform: tooltipOnRight ? 'translateX(-108%)' : 'translateX(8%)',
            }}
          >
            <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-[#898781]">{hovered.label}</p>
            <p className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#2a78d6]" /> Visitors: {hovered.visitors.toLocaleString('en-IN')}
            </p>
            <p className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#eb6834]" /> Page views: {hovered.pageViews.toLocaleString('en-IN')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
