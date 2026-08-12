import type { Metadata } from 'next'
import LiveProjectsContent from './LiveProjectsContent'
import { liveProjectsStore } from '@/lib/stores/live-projects-store'

export const metadata: Metadata = {
  title: 'Live Projects | TSDC – Real Student Work',
  description:
    'Explore real projects created by TSDC students across Graphic Design, UI/UX Design, Digital Marketing, Video Editing, and Motion Graphics.',
}

export const dynamic = 'force-dynamic'

export default async function LiveProjectsPage() {
  const content = await liveProjectsStore.get()
  return <LiveProjectsContent content={content} />
}
