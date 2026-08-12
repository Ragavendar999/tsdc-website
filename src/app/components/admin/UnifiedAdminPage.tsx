'use client'

import {
  Bell,
  BookOpen,
  CircleHelp,
  GraduationCap,
  Globe2,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MenuSquare,
  MonitorPlay,
  Newspaper,
  Settings,
  Sparkles,
  Trophy,
  UsersRound,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SiteSettingsTab from '@/app/components/admin/tabs/SiteSettingsTab'
import LiveProjectsTab from '@/app/components/admin/tabs/LiveProjectsTab'
import MasterclassesTab from '@/app/components/admin/tabs/MasterclassesTab'
import HomepageTab from '@/app/components/admin/tabs/HomepageTab'
import AboutPageTab from '@/app/components/admin/tabs/AboutPageTab'
import CoursesListingTab from '@/app/components/admin/tabs/CoursesListingTab'
import CourseContentTab from '@/app/components/admin/tabs/CourseContentTab'
import NavigationTab from '@/app/components/admin/tabs/NavigationTab'
import ContactPageTab from '@/app/components/admin/tabs/ContactPageTab'
import ScholarshipTab from '@/app/components/admin/tabs/ScholarshipTab'
import ConversionPagesTab from '@/app/components/admin/tabs/ConversionPagesTab'
import BlogTab from '@/app/components/admin/tabs/BlogTab'
import DashboardOverview from '@/app/components/admin/DashboardOverview'

export type AdminTab =
  | 'overview'
  | 'site-settings'
  | 'live-projects'
  | 'masterclasses'
  | 'homepage'
  | 'about'
  | 'courses-listing'
  | 'course-content'
  | 'navigation'
  | 'contact'
  | 'scholarship'
  | 'conversion'
  | 'blog'

const tabs: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'homepage', label: 'Homepage', icon: Globe2 },
  { id: 'about', label: 'About', icon: UsersRound },
  { id: 'courses-listing', label: 'Courses Listing', icon: BookOpen },
  { id: 'course-content', label: 'Course Pages', icon: BookOpen },
  { id: 'navigation', label: 'Navigation', icon: MenuSquare },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'scholarship', label: 'Scholarship', icon: Trophy },
  { id: 'conversion', label: 'Admissions/FAQ', icon: CircleHelp },
  { id: 'blog', label: 'Blog', icon: Newspaper },
  { id: 'masterclasses', label: 'Masterclasses', icon: Sparkles },
  { id: 'live-projects', label: 'Live Projects', icon: MonitorPlay },
  { id: 'site-settings', label: 'Site Settings', icon: Settings },
]

const tabLabel = (id: AdminTab) => tabs.find((tab) => tab.id === id)?.label ?? 'Overview'

type UnifiedAdminPageProps = {
  userEmail: string
}

export default function UnifiedAdminPage({ userEmail }: UnifiedAdminPageProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')
  const [loggingOut, setLoggingOut] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/admin/session-logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }

  const goToTab = (tab: AdminTab) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f6fb]">
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col bg-[#0b0f28] transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-5 py-5">
          <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
            <Image src="/logo.png" alt="TSDC Logo" width={84} height={28} />
          </div>
          <button aria-label="Close menu" onClick={() => setSidebarOpen(false)} className="text-white/70 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => goToTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition ${
                  active ? 'bg-[#3244b5] text-white shadow-[0_2px_8px_rgba(50,68,181,0.45)]' : 'text-[#a6acce] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={17} />
                {tab.label}
              </button>
            )
          })}
        </nav>

        <div className="m-3 rounded-2xl bg-gradient-to-br from-[#3244b5] to-[#1c2570] p-4 text-white">
          <GraduationCap size={22} className="text-[#ff9736]" />
          <p className="mt-2 text-sm font-black leading-tight">Build Skills. Build Future.</p>
          <p className="mt-1 text-xs font-medium text-white/70">
            Empowering learners with practical skills and real-world experience.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-[#e6e8f0] bg-white px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <button aria-label="Open menu" onClick={() => setSidebarOpen(true)} className="text-[#10163a] lg:hidden">
              <Menu size={22} />
            </button>
            <h1 className="text-base font-black tracking-[-0.01em] text-[#10163a] sm:text-lg">
              {activeTab === 'overview' ? 'TSDC Admin Panel' : tabLabel(activeTab)}
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button aria-label="Notifications" className="relative rounded-full p-2 text-[#475467] transition hover:bg-[#f5f6fb]">
              <Bell size={19} />
              <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#e34948] text-[8px] font-black text-white">
                3
              </span>
            </button>

            <div className="hidden items-center gap-2.5 border-l border-[#e6e8f0] pl-3.5 sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3244b5] text-xs font-black text-white">
                {userEmail.charAt(0).toUpperCase()}
              </span>
              <div className="leading-tight">
                <p className="text-xs font-black text-[#10163a]">Admin</p>
                <p className="text-[11px] font-medium text-[#898781]">{userEmail}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 rounded-xl border border-[#e6e8f0] bg-white px-3 py-2 text-xs font-bold text-[#10163a] shadow-[0_1px_2px_rgba(16,22,58,0.06)] transition hover:border-[#e34948] hover:text-[#e34948] disabled:opacity-60"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">{loggingOut ? 'Signing out...' : 'Sign out'}</span>
            </button>
          </div>
        </header>

        <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'overview' && <DashboardOverview userEmail={userEmail} onNavigate={goToTab} />}
          {activeTab === 'site-settings' && <SiteSettingsTab />}
          {activeTab === 'live-projects' && <LiveProjectsTab />}
          {activeTab === 'masterclasses' && <MasterclassesTab />}
          {activeTab === 'homepage' && <HomepageTab />}
          {activeTab === 'about' && <AboutPageTab />}
          {activeTab === 'courses-listing' && <CoursesListingTab />}
          {activeTab === 'course-content' && <CourseContentTab />}
          {activeTab === 'navigation' && <NavigationTab />}
          {activeTab === 'contact' && <ContactPageTab />}
          {activeTab === 'scholarship' && <ScholarshipTab />}
          {activeTab === 'conversion' && <ConversionPagesTab />}
          {activeTab === 'blog' && <BlogTab />}
        </main>
      </div>
    </div>
  )
}
