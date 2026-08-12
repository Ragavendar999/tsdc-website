'use client'

import ConversionHomepage from './ConversionHomepage'
import type { HomepageContentData } from '@/app/lib/homepage'

type HomepageContentProps = {
  content?: HomepageContentData
}

export default function HomepageContent({ content }: HomepageContentProps) {
  return <ConversionHomepage content={content} />
}
