'use client'

import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { defaultMasterclasses, MASTERCLASS_STORAGE_KEY, type Masterclass } from '@/app/lib/masterclasses'

const adminUsername = 'admin'
const adminPassword = 'TSDC@2026'

const emptyMasterclass = (): Masterclass => ({
  ...defaultMasterclasses[0],
  id: `masterclass-${Date.now()}`,
  slug: `new-masterclass-${Date.now()}`,
  status: 'draft',
  title: 'New Masterclass',
  backgroundStyle: 'midnight',
  backgroundImage: '',
  category: 'Creative Masterclass',
  hook: 'Add your masterclass hook here',
})

export default function MasterclassAdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>(defaultMasterclasses)
  const [activeId, setActiveId] = useState(defaultMasterclasses[0].id)
  const active = useMemo(
    () => masterclasses.find((masterclass) => masterclass.id === activeId) || masterclasses[0],
    [activeId, masterclasses]
  )

  useEffect(() => {
    setLoggedIn(window.localStorage.getItem('tsdc-admin-session') === 'active')

    const stored = window.localStorage.getItem(MASTERCLASS_STORAGE_KEY)
    if (stored) setMasterclasses(JSON.parse(stored))
  }, [])

  const saveMasterclasses = (items: Masterclass[]) => {
    setMasterclasses(items)
    window.localStorage.setItem(MASTERCLASS_STORAGE_KEY, JSON.stringify(items))
  }

  const updateActive = (patch: Partial<Masterclass>) => {
    saveMasterclasses(masterclasses.map((item) => (item.id === active.id ? { ...item, ...patch } : item)))
  }

  const updateJson = <T,>(key: keyof Masterclass, value: string) => {
    try {
      updateActive({ [key]: JSON.parse(value) } as Partial<Masterclass>)
    } catch {
      alert('Invalid JSON. Please check commas, quotes, and brackets.')
    }
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (formData.get('username') === adminUsername && formData.get('password') === adminPassword) {
      window.localStorage.setItem('tsdc-admin-session', 'active')
      setLoggedIn(true)
      setLoginError('')
      return
    }

    setLoginError('Invalid admin login.')
  }

  if (!loggedIn) {
    return (
      <main className="site-section-bg flex min-h-[80vh] items-center justify-center px-4 py-12">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-[2rem] bg-white p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#4562b0]">TSDC Admin Panel</p>
          <h1 className="mt-3 text-3xl font-black">Masterclass login</h1>
          <input name="username" placeholder="Username" className="mt-6 w-full rounded-2xl border border-[#d9e4f5] px-4 py-3 font-semibold" />
          <input name="password" type="password" placeholder="Password" className="mt-4 w-full rounded-2xl border border-[#d9e4f5] px-4 py-3 font-semibold" />
          {loginError && <p className="mt-3 text-sm font-bold text-red-600">{loginError}</p>}
          <button className="mt-5 w-full rounded-2xl bg-[#4562b0] px-5 py-3 font-black text-white">Login</button>
          <p className="mt-4 rounded-2xl bg-[#fff4eb] p-4 text-sm font-bold text-[#9a4a10]">
            Demo login: admin / TSDC@2026
          </p>
        </form>
      </main>
    )
  }

  return (
    <main className="site-section-bg px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] bg-[#081225] p-6 text-white">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#fa8a43]">Admin Panel</p>
            <h1 className="text-3xl font-black">Masterclass manager</h1>
          </div>
          <button
            onClick={() => {
              const next = emptyMasterclass()
              saveMasterclasses([next, ...masterclasses])
              setActiveId(next.id)
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#fa8a43] px-5 py-3 text-sm font-black text-white"
          >
            <Plus size={16} />
            New Masterclass
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.32fr_0.68fr]">
          <aside className="space-y-3">
            {masterclasses.map((masterclass) => (
              <button
                key={masterclass.id}
                onClick={() => setActiveId(masterclass.id)}
                className={`w-full rounded-2xl border p-4 text-left ${
                  masterclass.id === active.id ? 'border-[#4562b0] bg-[#eef4ff]' : 'border-[#d9e4f5] bg-white'
                }`}
              >
                <p className="font-black">{masterclass.title}</p>
                <p className="mt-1 text-sm font-bold text-[#667085]">{masterclass.status} / {masterclass.slug}</p>
              </button>
            ))}
          </aside>

          {active && (
            <section className="rounded-[2rem] bg-white p-6">
              <div className="mb-5 flex flex-wrap justify-between gap-3">
                <h2 className="text-2xl font-black">Edit: {active.title}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateActive({ status: active.status === 'live' ? 'draft' : 'live' })}
                    className="rounded-full bg-[#4562b0] px-4 py-2 text-sm font-black text-white"
                  >
                    {active.status === 'live' ? 'Make Draft' : 'Publish'}
                  </button>
                  <button
                    onClick={() => {
                      const copy = { ...active, id: `masterclass-${Date.now()}`, slug: `${active.slug}-copy`, title: `${active.title} Copy`, status: 'draft' as const }
                      saveMasterclasses([copy, ...masterclasses])
                      setActiveId(copy.id)
                    }}
                    className="rounded-full bg-[#fa8a43] px-4 py-2 text-sm font-black text-white"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => {
                      if (!confirm('Delete this masterclass?')) return
                      const next = masterclasses.filter((item) => item.id !== active.id)
                      saveMasterclasses(next.length ? next : defaultMasterclasses)
                      setActiveId((next[0] || defaultMasterclasses[0]).id)
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#ea6865] px-4 py-2 text-sm font-black text-white"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ['title', 'Title'],
                  ['slug', 'URL slug'],
                  ['backgroundImage', 'Background image URL'],
                  ['badge', 'Badge'],
                  ['category', 'Category'],
                  ['hook', 'Hero headline'],
                  ['date', 'Date'],
                  ['time', 'Time'],
                  ['mode', 'Mode'],
                  ['discountLabel', 'Discount label'],
                  ['whatsappLink', 'WhatsApp link'],
                ].map(([key, label]) => (
                  <label key={key} className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#4562b0]">{label}</span>
                    <input
                      value={String(active[key as keyof Masterclass] ?? '')}
                      onChange={(event) => updateActive({ [key]: event.target.value } as Partial<Masterclass>)}
                      className="w-full rounded-2xl border border-[#d9e4f5] px-4 py-3 font-semibold"
                    />
                  </label>
                ))}

                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#4562b0]">Background style</span>
                  <select
                    value={active.backgroundStyle || 'midnight'}
                    onChange={(event) => updateActive({ backgroundStyle: event.target.value as Masterclass['backgroundStyle'] })}
                    className="w-full rounded-2xl border border-[#d9e4f5] px-4 py-3 font-semibold"
                  >
                    <option value="midnight">Midnight black</option>
                    <option value="blueprint">Blueprint blue</option>
                    <option value="ember">Ember orange</option>
                    <option value="violet">Violet stage</option>
                  </select>
                </label>

                {[
                  ['price', 'Price'],
                  ['originalPrice', 'Original price'],
                  ['seatsTotal', 'Total seats'],
                  ['seatsTaken', 'Seats taken'],
                ].map(([key, label]) => (
                  <label key={key} className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#4562b0]">{label}</span>
                    <input
                      type="number"
                      value={Number(active[key as keyof Masterclass])}
                      onChange={(event) => updateActive({ [key]: Number(event.target.value) } as Partial<Masterclass>)}
                      className="w-full rounded-2xl border border-[#d9e4f5] px-4 py-3 font-semibold"
                    />
                  </label>
                ))}

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#4562b0]">Description</span>
                  <textarea
                    value={active.description}
                    onChange={(event) => updateActive({ description: event.target.value })}
                    rows={3}
                    className="w-full rounded-2xl border border-[#d9e4f5] px-4 py-3 font-semibold"
                  />
                </label>

                {[
                  ['modules', active.modules],
                  ['includes', active.includes],
                  ['audience', active.audience],
                  ['faqs', active.faqs],
                  ['instructor', active.instructor],
                ].map(([key, value]) => (
                  <label key={key as string} className="block md:col-span-2">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#4562b0]">
                      {key as string} JSON
                    </span>
                    <textarea
                      defaultValue={JSON.stringify(value, null, 2)}
                      rows={key === 'modules' ? 8 : 5}
                      onBlur={(event) => updateJson(key as keyof Masterclass, event.target.value)}
                      className="w-full rounded-2xl border border-[#d9e4f5] bg-[#f8fbff] px-4 py-3 font-mono text-sm"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-[#fff4eb] p-4 text-sm font-bold text-[#9a4a10]">
                <Save className="mr-2 inline h-4 w-4" />
                Changes are saved to this browser automatically. For production-wide admin editing, connect a database such as Supabase, Firebase, or Vercel KV.
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
