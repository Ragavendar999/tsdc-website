import 'server-only'
import { createDocStore } from '@/lib/content-store'
import { defaultLiveProjects, type LiveProjectsContent } from '@/app/lib/liveProjects'

const isLiveProjectsContent = (value: unknown): value is LiveProjectsContent =>
  typeof value === 'object' &&
  value !== null &&
  'hero' in value &&
  'projects' in value &&
  Array.isArray((value as { projects?: unknown }).projects)

export const liveProjectsStore = createDocStore('liveProjects', defaultLiveProjects, isLiveProjectsContent)
