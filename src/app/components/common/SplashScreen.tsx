'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock, Home, Tag, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  defaultMasterclasses,
  formatPrice,
  getMasterclassBackgroundClass,
  MASTERCLASS_STORAGE_KEY,
  type Masterclass,
} from '@/app/lib/masterclasses'

/* ─────────────────────────────────────────────
   Phase 1 — Logo loader
───────────────────────────────────────────── */
function LogoLoader() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Pulse rings */}
      <motion.div
        animate={{ scale: [0.6, 1.9], opacity: [0.45, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
        className="pointer-events-none absolute h-52 w-52 rounded-full border-[3px] border-[#3244b5]/30"
      />
      <motion.div
        animate={{ scale: [0.6, 2.5], opacity: [0.25, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
        className="pointer-events-none absolute h-52 w-52 rounded-full border-2 border-[#ff9736]/22"
      />

      {/* Logo card */}
      <motion.div
        initial={{ opacity: 0, y: -55, scale: 0.6, rotate: -6 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 0.68, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative"
      >
        {/* Float shadow */}
        <motion.div
          animate={{ scaleX: [1, 1.1, 1], opacity: [0.16, 0.26, 0.16] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-3 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-full"
          style={{ background: '#10163a', filter: 'blur(10px)' }}
        />

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[8px_8px_0_#10163a]"
        >
          {/* Corner dots */}
          <span className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[#ff9736]" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#3244b5]" />
          <span className="absolute bottom-3 left-3 h-2 w-2 rounded-full bg-[#db4b87]" />
          <span className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-[#ffcb53]" />

          {/* Shimmer */}
          <motion.span
            initial={{ x: '-110%' }}
            animate={{ x: '210%' }}
            transition={{ duration: 0.9, delay: 0.65, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />

          <Image src="/logo.png" alt="TSDC" width={140} height={50} priority className="relative h-[50px] w-auto" />
        </motion.div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="mt-5 text-[11px] font-black tracking-[0.32em] uppercase text-[#3244b5]"
      >
        Traijo Skill Development Center
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-7 h-[3px] w-32 overflow-hidden rounded-full bg-[#10163a]/10"
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, delay: 0.75, ease: 'linear' }}
          className="h-full rounded-full bg-[#3244b5]"
        />
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Phase 2 — Masterclass popup ad
───────────────────────────────────────────── */
function MasterclassAd({
  masterclasses,
  onDismiss,
}: {
  masterclasses: Masterclass[]
  onDismiss: () => void
}) {
  const live = masterclasses.filter((m) => m.status === 'live')

  return (
    <motion.div
      key="ad"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex h-full w-full flex-col items-center justify-center px-4 py-6"
      style={{ background: 'linear-gradient(160deg, #07091e 0%, #0e1338 45%, #0b0f2e 100%)' }}
    >
      {/* ── Texture layer 1: fine dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* ── Texture layer 2: diagonal lines ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 14px)',
        }}
      />

      {/* ── Animated glow orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-16 top-1/4 h-80 w-80 rounded-full bg-[#3244b5]"
        style={{ filter: 'blur(72px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="pointer-events-none absolute -right-16 bottom-1/4 h-72 w-72 rounded-full bg-[#ff9736]"
        style={{ filter: 'blur(68px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="pointer-events-none absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full bg-[#db4b87]"
        style={{ filter: 'blur(60px)' }}
      />

      {/* ── Comic starburst shapes ── */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="comic-burst pointer-events-none absolute left-[6%] top-[12%] h-24 w-24 opacity-10"
        style={{ background: 'linear-gradient(135deg, #ffcb53, #ff9736)' }}
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="comic-burst pointer-events-none absolute bottom-[14%] right-[7%] h-20 w-20 opacity-10"
        style={{ background: 'linear-gradient(135deg, #3244b5, #db4b87)' }}
      />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="comic-burst pointer-events-none absolute bottom-[30%] left-[4%] h-12 w-12 opacity-8"
        style={{ background: '#ffcb53' }}
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="comic-burst pointer-events-none absolute right-[5%] top-[22%] h-14 w-14 opacity-8"
        style={{ background: '#fa8a43' }}
      />

      {/* ── Floating geometric shapes ── */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-[10%] top-[18%] h-10 w-10 rounded-[0.6rem] border-2 border-white/10 bg-white/5"
      />
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="pointer-events-none absolute right-[11%] top-[14%] h-7 w-7 rounded-full border-2 border-[#ffcb53]/20 bg-[#ffcb53]/8"
      />
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="pointer-events-none absolute bottom-[20%] right-[13%] h-8 w-8 rounded-[0.5rem] border-2 border-[#3244b5]/25 bg-[#3244b5]/10"
        style={{ transform: 'rotate(22deg)' }}
      />
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="pointer-events-none absolute bottom-[28%] left-[8%] h-6 w-6 rounded-full border-2 border-[#db4b87]/20 bg-[#db4b87]/8"
      />

      {/* ── Ring accent ── */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute right-[8%] top-[40%] h-32 w-32 rounded-full border border-dashed border-white/8"
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute bottom-[38%] left-[6%] h-24 w-24 rounded-full border border-dashed border-white/6"
      />

      {/* Popup card */}
      <motion.div
        initial={{ y: 60, scale: 0.94, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border-[3px] border-white/15 bg-white/5 shadow-[0_24px_64px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="overflow-hidden rounded-[0.75rem] border-2 border-white/20 bg-white px-3 py-1.5">
              <Image src="/logo.png" alt="TSDC" width={60} height={22} className="h-[22px] w-auto" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Live Now</p>
              <p className="text-sm font-black text-white">Upcoming Masterclasses</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>

        {/* Masterclass cards */}
        <div className="flex flex-col gap-3 p-4">
          {live.length === 0 ? (
            <p className="py-6 text-center text-sm text-white/40">No live masterclasses right now. Check back soon!</p>
          ) : (
            live.map((mc, i) => {
              const bgClass = getMasterclassBackgroundClass(mc.backgroundStyle)
              const discount = Math.round(((mc.originalPrice - mc.price) / mc.originalPrice) * 100)
              const seatsLeft = mc.seatsTotal - mc.seatsTaken

              return (
                <motion.div
                  key={mc.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/masterclasses/${mc.slug}`}
                    onClick={onDismiss}
                    className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/12 p-4 transition hover:border-white/30 ${bgClass}`}
                  >
                    {/* Shimmer on hover */}
                    <motion.span
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.55 }}
                      className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    />

                    {/* Badge row */}
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full border border-white/20 bg-white/15 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] text-white/80">
                        {mc.badge}
                      </span>
                      {seatsLeft <= 10 && (
                        <span className="rounded-full bg-[#fa8a43]/90 px-2.5 py-0.5 text-[9px] font-black text-white">
                          {seatsLeft} seats left
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-black leading-tight text-white">{mc.title}</h3>
                    <p className="mt-1 text-[11px] font-medium text-white/55">{mc.hook}</p>

                    {/* Meta row */}
                    <div className="mt-3 flex flex-wrap gap-2.5 text-[11px] font-semibold text-white/60">
                      <span className="flex items-center gap-1"><Calendar size={11} />{mc.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{mc.time}</span>
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-white">{formatPrice(mc.price)}</span>
                        <span className="text-[11px] font-semibold text-white/40 line-through">{formatPrice(mc.originalPrice)}</span>
                        <span className="flex items-center gap-0.5 rounded-full bg-[#22c55e]/25 px-2 py-0.5 text-[9px] font-black text-[#4ade80]">
                          <Tag size={8} />
                          {discount}% OFF
                        </span>
                      </div>
                      <span className="flex items-center gap-1.5 rounded-[0.75rem] border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-black text-white transition group-hover:bg-white group-hover:text-[#10163a]">
                        Register
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-4 pb-5 pt-3">
          <Link
            href="/"
            onClick={onDismiss}
            className="flex w-full items-center justify-center gap-2 rounded-[1.1rem] border border-white/15 bg-white/8 py-3 text-sm font-black text-white/70 transition hover:bg-white/15 hover:text-white"
          >
            <Home size={15} />
            Go to Homepage
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function SplashScreen() {
  const [phase, setPhase] = useState<'logo' | 'ad' | 'hidden'>('hidden')
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>(defaultMasterclasses)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('tsdc_splash')) return
    sessionStorage.setItem('tsdc_splash', '1')

    try {
      const stored = window.localStorage.getItem(MASTERCLASS_STORAGE_KEY)
      if (stored) setMasterclasses(JSON.parse(stored))
    } catch { /* use defaults */ }

    setPhase('logo')

    // After logo plays, switch to ad
    const t = setTimeout(() => setPhase('ad'), 2000)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => setPhase('hidden')

  if (phase === 'hidden') return null

  return (
    <AnimatePresence mode="wait">
      {phase === 'logo' && (
        <motion.div
          key="logo"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(155deg, #fffdf7 0%, #fff8ed 55%, #eef1ff 100%)' }}
        >
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(50,68,181,0.12) 1.2px, transparent 1.2px)',
              backgroundSize: '28px 28px',
            }}
          />
          <LogoLoader />
        </motion.div>
      )}

      {phase === 'ad' && (
        <motion.div
          key="ad-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] overflow-y-auto"
        >
          <MasterclassAd masterclasses={masterclasses} onDismiss={dismiss} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
