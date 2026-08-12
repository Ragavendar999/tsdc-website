'use client'

import { ArrowDown, ArrowUp, ImagePlus, Plus, Save, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { defaultLiveProjects, type LiveProject, type LiveProjectsContent } from '@/app/lib/liveProjects'

const inputClass =
  'w-full rounded-xl border-[3px] border-[#10163a] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#10163a] outline-none transition focus:border-[#3244b5]'
const labelClass = 'mb-1.5 block text-xs font-black uppercase tracking-[0.1em] text-[#3244b5]'
const cardClass = 'rounded-2xl border-[3px] border-[#10163a] bg-white p-6 shadow-[5px_5px_0_#10163a]'
const smallBtn =
  'flex items-center gap-1.5 rounded-lg border-[3px] border-[#10163a] bg-white px-2.5 py-1.5 text-xs font-black text-[#10163a] shadow-[2px_2px_0_#10163a] transition hover:-translate-y-0.5'

let idCounter = 0
const newProjectId = () => `project-${Date.now()}-${idCounter++}`

function ProjectImageManager({ project, onChange }: { project: LiveProject; onChange: (images: string[]) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    setError('')
    try {
      const uploaded: string[] = []
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', `live-projects/${project.id}`)
        const response = await fetch('/api/admin/upload', { method: 'POST', body: formData })
        const payload = (await response.json()) as { url?: string; error?: string }
        if (!response.ok || !payload.url) throw new Error(payload.error || 'Upload failed')
        uploaded.push(payload.url)
      }
      onChange([...project.images, ...uploaded])
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const removeImage = (index: number) => onChange(project.images.filter((_, i) => i !== index))
  const moveImage = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= project.images.length) return
    const next = [...project.images]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {project.images.map((image, index) => (
          <div key={image + index} className="relative h-20 w-28 overflow-hidden rounded-lg border-[3px] border-[#10163a]">
            <Image src={image} alt="" fill className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-black/50 py-0.5">
              <button type="button" onClick={() => moveImage(index, -1)} className="text-white/80 hover:text-white">
                <ArrowUp size={12} />
              </button>
              <button type="button" onClick={() => moveImage(index, 1)} className="text-white/80 hover:text-white">
                <ArrowDown size={12} />
              </button>
              <button type="button" onClick={() => removeImage(index)} className="text-white/80 hover:text-white">
                <X size={12} />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex h-20 w-28 flex-col items-center justify-center gap-1 rounded-lg border-[3px] border-dashed border-[#10163a] text-[#3244b5] transition hover:bg-[#eef0ff] disabled:opacity-60"
        >
          <ImagePlus size={16} />
          <span className="text-[10px] font-black uppercase tracking-wide">{uploading ? 'Uploading...' : 'Add photos'}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>
      {error && <p className="mt-2 text-xs font-bold text-[#b42318]">{error}</p>}
      {project.images.length === 0 && (
        <p className="mt-2 text-xs font-medium text-[#667085]">
          No screenshots yet — &quot;View Case Study&quot; will open the enquiry popup until at least one photo is added.
        </p>
      )}
    </div>
  )
}

export default function LiveProjectsTab() {
  const [content, setContent] = useState<LiveProjectsContent>(defaultLiveProjects)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/content/liveProjects')
      .then((res) => res.json())
      .then((payload: { value?: LiveProjectsContent }) => {
        if (payload.value) setContent(payload.value)
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load live projects — showing defaults.' }))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch('/api/content/liveProjects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const payload = (await response.json()) as { value?: LiveProjectsContent; error?: string }
      if (!response.ok) throw new Error(payload.error || 'Failed to save')
      if (payload.value) setContent(payload.value)
      setMessage({ type: 'success', text: 'Live projects saved.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  const updateProject = (id: string, patch: Partial<LiveProject>) =>
    setContent({ ...content, projects: content.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)) })

  const addProject = () =>
    setContent({
      ...content,
      projects: [
        ...content.projects,
        { id: newProjectId(), title: 'New Project', category: content.filters[1] ?? 'Graphic Design', description: '', coverImage: '/Graphic%20Design.png', images: [] },
      ],
    })

  const removeProject = (id: string) => setContent({ ...content, projects: content.projects.filter((p) => p.id !== id) })

  if (loading) return <p className="text-sm font-semibold text-[#667085]">Loading live projects...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#10163a]">Live Projects</h2>
          <p className="text-sm text-[#667085]">Manage the /live-projects page, including per-project case study photos.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl border-[3px] border-[#10163a] bg-[#3244b5] px-4 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          <Save size={15} />
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      {message && (
        <p
          className={`rounded-xl border-[3px] px-4 py-2.5 text-sm font-bold shadow-[3px_3px_0] ${
            message.type === 'success'
              ? 'border-[#15803d] bg-[#f0fdf4] text-[#15803d] shadow-[#15803d]'
              : 'border-[#b42318] bg-[#fff1f2] text-[#b42318] shadow-[#b42318]'
          }`}
        >
          {message.text}
        </p>
      )}

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Hero</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Eyebrow</span>
            <input className={inputClass} value={content.hero.eyebrow} onChange={(e) => setContent({ ...content, hero: { ...content.hero, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Title line 1</span>
            <input className={inputClass} value={content.hero.titleLine1} onChange={(e) => setContent({ ...content, hero: { ...content.hero, titleLine1: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Title highlight</span>
            <input className={inputClass} value={content.hero.titleHighlight} onChange={(e) => setContent({ ...content, hero: { ...content.hero, titleHighlight: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Subtitle</span>
            <input className={inputClass} value={content.hero.subtitle} onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })} />
          </label>
        </div>
      </div>

      <div className={cardClass}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Projects</h3>
          <button onClick={addProject} className={smallBtn}>
            <Plus size={13} /> Add project
          </button>
        </div>
        <div className="space-y-5">
          {content.projects.map((project) => (
            <div key={project.id} className="rounded-xl border-[3px] border-[#10163a]/20 p-4">
              <div className="mb-3 grid gap-3 sm:grid-cols-2">
                <label>
                  <span className={labelClass}>Title</span>
                  <input className={inputClass} value={project.title} onChange={(e) => updateProject(project.id, { title: e.target.value })} />
                </label>
                <label>
                  <span className={labelClass}>Category</span>
                  <select className={inputClass} value={project.category} onChange={(e) => updateProject(project.id, { category: e.target.value })}>
                    {content.filters.filter((f) => f !== 'All Projects').map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className={labelClass}>Description</span>
                  <input className={inputClass} value={project.description} onChange={(e) => updateProject(project.id, { description: e.target.value })} />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelClass}>Cover image path</span>
                  <input className={inputClass} value={project.coverImage} onChange={(e) => updateProject(project.id, { coverImage: e.target.value })} />
                </label>
              </div>

              <span className={labelClass}>Case study photos</span>
              <ProjectImageManager project={project} onChange={(images) => updateProject(project.id, { images })} />

              <button
                onClick={() => removeProject(project.id)}
                className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#b42318] hover:underline"
              >
                <Trash2 size={13} /> Remove project
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
