'use client'

import {
  BookOpen,
  Briefcase,
  Database,
  FileText,
  Globe2,
  Mail,
  MonitorPlay,
  Newspaper,
  PlusCircle,
  Settings,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import type { AdminTab } from './UnifiedAdminPage'
import ContentDonutChart, { type DonutSegment } from './charts/ContentDonutChart'
import TrafficLineChart, { type TrafficPoint } from './charts/TrafficLineChart'

const statTiles: { label: string; value: string; sub: string; icon: typeof BookOpen; bg: string; fg: string }[] = [
  { label: 'Total Courses', value: '24', sub: 'Published: 20 · Draft: 4', icon: BookOpen, bg: '#eaf2fc', fg: '#2a78d6' },
  { label: 'Total Students', value: '1,245', sub: '+18% this month', icon: UsersRound, bg: '#e8f8f0', fg: '#1baf7a' },
  { label: 'Masterclasses', value: '16', sub: 'Upcoming: 3', icon: Sparkles, bg: '#fdf0e7', fg: '#eb6834' },
  { label: 'Live Projects', value: '28', sub: 'Active: 8', icon: MonitorPlay, bg: '#fdf4e0', fg: '#c98500' },
  { label: 'Blog Posts', value: '54', sub: 'Published', icon: Newspaper, bg: '#fceef4', fg: '#e87ba4' },
  { label: 'Enquiries', value: '98', sub: 'New: 12', icon: Mail, bg: '#eeecfb', fg: '#4a3aa7' },
]

const trafficData: TrafficPoint[] = [
  { label: 'May 1', visitors: 1120, pageViews: 2480 },
  { label: 'May 8', visitors: 1860, pageViews: 3320 },
  { label: 'May 15', visitors: 1540, pageViews: 2960 },
  { label: 'May 22', visitors: 2210, pageViews: 3680 },
  { label: 'May 29', visitors: 1980, pageViews: 3410 },
  { label: 'Jun 5', visitors: 2540, pageViews: 4120 },
]

const contentSegments: DonutSegment[] = [
  { label: 'Courses', value: 24, color: '#2a78d6' },
  { label: 'Masterclasses', value: 16, color: '#eb6834' },
  { label: 'Live Projects', value: 28, color: '#1baf7a' },
  { label: 'Blog Posts', value: 54, color: '#eda100' },
  { label: 'Pages', value: 30, color: '#e87ba4' },
]

const recentEnquiries = [
  { name: 'Arun Kumar', subject: 'Course Enquiry - UI/UX Design', time: '10 min ago' },
  { name: 'Priya Sharma', subject: 'Scholarship Information', time: '1 hour ago' },
  { name: 'Vignesh R', subject: 'General Enquiry', time: '2 hours ago' },
  { name: 'Karthik S', subject: 'Admission Process', time: '3 hours ago' },
  { name: 'Ananya R', subject: 'Course Enquiry - Digital Marketing', time: '5 hours ago' },
]

type RecentContentKey = 'courses' | 'masterclasses' | 'liveProjects' | 'blog' | 'pages'

const recentContentTabs: { key: RecentContentKey; label: string }[] = [
  { key: 'courses', label: 'Courses' },
  { key: 'masterclasses', label: 'Masterclasses' },
  { key: 'liveProjects', label: 'Live Projects' },
  { key: 'blog', label: 'Blog Posts' },
  { key: 'pages', label: 'Pages' },
]

const recentContentRows: Record<RecentContentKey, { title: string; status: 'Published' | 'Draft'; updated: string }[]> = {
  courses: [
    { title: 'UI/UX Design - Complete Course', status: 'Published', updated: 'May 30, 2026' },
    { title: 'Graphic Design Fundamentals', status: 'Published', updated: 'May 28, 2026' },
  ],
  masterclasses: [
    { title: 'Logo Design Masterclass', status: 'Published', updated: 'May 29, 2026' },
    { title: 'Summer Bootcamp for AI Graphic Design', status: 'Published', updated: 'May 27, 2026' },
  ],
  liveProjects: [
    { title: 'E-commerce Website Redesign', status: 'Published', updated: 'May 28, 2026' },
    { title: 'Brand Identity for a Cafe', status: 'Draft', updated: 'May 25, 2026' },
  ],
  blog: [
    { title: 'SEO Strategies for 2026', status: 'Published', updated: 'May 27, 2026' },
    { title: 'A Beginner Guide to Motion Graphics', status: 'Published', updated: 'May 24, 2026' },
  ],
  pages: [
    { title: 'About Us', status: 'Published', updated: 'May 20, 2026' },
    { title: 'Contact', status: 'Published', updated: 'May 18, 2026' },
  ],
}

const quickActions: { label: string; icon: typeof PlusCircle; tab?: AdminTab; href?: string }[] = [
  { label: 'Add Course', icon: BookOpen, tab: 'course-content' },
  { label: 'New Blog', icon: FileText, tab: 'blog' },
  { label: 'Add Masterclass', icon: Sparkles, tab: 'masterclasses' },
  { label: 'Add Project', icon: Briefcase, tab: 'live-projects' },
  { label: 'View Website', icon: Globe2, href: '/' },
  { label: 'Site Settings', icon: Settings, tab: 'site-settings' },
]

export default function DashboardOverview({ userEmail, onNavigate }: { userEmail: string; onNavigate: (tab: AdminTab) => void }) {
  const [activeContentTab, setActiveContentTab] = useState<RecentContentKey>('courses')
  const firstName = userEmail.split('@')[0]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 rounded-2xl border border-[#e6e8f0] bg-gradient-to-br from-[#eef1ff] to-white p-6 shadow-[0_1px_3px_rgba(16,22,58,0.06)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#3244b5]">Welcome back</p>
          <h1 className="mt-1 text-2xl font-black tracking-[-0.02em] text-[#10163a]">Hey {firstName}, here&apos;s what&apos;s happening.</h1>
          <p className="mt-1.5 text-sm font-medium text-[#667085]">A quick look at courses, masterclasses, projects, and enquiries across the site.</p>
        </div>
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            const content = (
              <>
                <Icon size={15} />
                <span className="hidden sm:inline">{action.label}</span>
              </>
            )
            return action.href ? (
              <Link
                key={action.label}
                href={action.href}
                target="_blank"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-[#e6e8f0] bg-white px-3 py-2.5 text-xs font-bold text-[#10163a] shadow-[0_1px_2px_rgba(16,22,58,0.06)] transition hover:border-[#3244b5] hover:text-[#3244b5]"
              >
                {content}
              </Link>
            ) : (
              <button
                key={action.label}
                onClick={() => action.tab && onNavigate(action.tab)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-[#e6e8f0] bg-white px-3 py-2.5 text-xs font-bold text-[#10163a] shadow-[0_1px_2px_rgba(16,22,58,0.06)] transition hover:border-[#3244b5] hover:text-[#3244b5]"
              >
                {content}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {statTiles.map((tile) => {
          const Icon = tile.icon
          return (
            <div key={tile.label} className="rounded-2xl border border-[#e6e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(16,22,58,0.06)]">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: tile.bg, color: tile.fg }}>
                <Icon size={17} />
              </span>
              <p className="mt-3 text-2xl font-black text-[#10163a]">{tile.value}</p>
              <p className="text-xs font-bold text-[#475467]">{tile.label}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-[#898781]">{tile.sub}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-[#e6e8f0] bg-white p-5 shadow-[0_1px_3px_rgba(16,22,58,0.06)]">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-sm font-black text-[#10163a]">Traffic Overview</h2>
            <span className="rounded-lg border border-[#e6e8f0] px-2.5 py-1 text-[11px] font-bold text-[#667085]">Last 30 days</span>
          </div>
          <TrafficLineChart data={trafficData} />
        </div>

        <div className="rounded-2xl border border-[#e6e8f0] bg-white p-5 shadow-[0_1px_3px_rgba(16,22,58,0.06)]">
          <h2 className="mb-4 text-sm font-black text-[#10163a]">Content Overview</h2>
          <ContentDonutChart segments={contentSegments} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-[#e6e8f0] bg-white p-5 shadow-[0_1px_3px_rgba(16,22,58,0.06)]">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {recentContentTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveContentTab(tab.key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  activeContentTab === tab.key ? 'bg-[#3244b5] text-white' : 'bg-[#f5f6fb] text-[#475467] hover:bg-[#eef1ff]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e6e8f0] text-[11px] font-black uppercase tracking-wide text-[#898781]">
                  <th className="pb-2 pr-4">Title</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2">Last updated</th>
                </tr>
              </thead>
              <tbody>
                {recentContentRows[activeContentTab].map((row) => (
                  <tr key={row.title} className="border-b border-[#f0f1f6] last:border-0">
                    <td className="py-2.5 pr-4 font-semibold text-[#10163a]">{row.title}</td>
                    <td className="py-2.5 pr-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          row.status === 'Published' ? 'bg-[#e8f8f0] text-[#0f7a4f]' : 'bg-[#f5f6fb] text-[#667085]'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2.5 font-medium text-[#667085]">{row.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e6e8f0] bg-white p-5 shadow-[0_1px_3px_rgba(16,22,58,0.06)]">
          <h2 className="mb-3 text-sm font-black text-[#10163a]">Recent Enquiries</h2>
          <ul className="space-y-3">
            {recentEnquiries.map((enquiry) => (
              <li key={`${enquiry.name}-${enquiry.time}`} className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3244b5]" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#10163a]">{enquiry.name}</p>
                  <p className="truncate text-xs font-medium text-[#667085]">{enquiry.subject}</p>
                </div>
                <span className="ml-auto shrink-0 text-[11px] font-semibold text-[#898781]">{enquiry.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e6e8f0] bg-white p-5 shadow-[0_1px_3px_rgba(16,22,58,0.06)]">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-black text-[#10163a]">
          <ShieldCheck size={16} className="text-[#1baf7a]" /> System Overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-[#898781]">Website status</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-[#0f7a4f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0f7a4f]" /> Live
            </p>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-[#898781]">SSL certificate</p>
            <p className="mt-1 text-sm font-bold text-[#0f7a4f]">Valid</p>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-[#898781]">Last backup</p>
            <p className="mt-1 text-sm font-bold text-[#10163a]">May 30, 2026, 02:30 AM</p>
          </div>
          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-[#898781]">
              <Database size={12} /> Storage usage
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#eef0f7]">
              <div className="h-full rounded-full bg-[#3244b5]" style={{ width: '43%' }} />
            </div>
            <p className="mt-1 text-xs font-semibold text-[#667085]">42.6 GB / 100 GB</p>
          </div>
        </div>
      </div>
    </div>
  )
}
