import type { Metadata } from 'next'
import HomepageContent from './components/homepage/HomepageContent'
import { itemListSchema, jsonLd, organizationSchema } from './lib/seo'

export const metadata: Metadata = {
  title: 'Best Creative Education Institute in Chennai | Graphic Design, UI UX, Digital Marketing, Video Editing & Motion Graphics',
  description:
    'Launch your creative career with TSDC, a creative education institute in Chennai for Graphic Design, UI UX Design, Digital Marketing, Video Editing and Motion Graphics courses with live projects, portfolio building, mentorship and placement support.',
  keywords: [
    'Creative Education Institute in Chennai',
    'Best Creative Education Institute in Chennai',
    'Best Graphic Design Course in Chennai',
    'Best Graphic Design Institute in Chennai',
    'Best UI UX Design Course in Chennai',
    'Best UI UX Design Institute in Chennai',
    'Best Digital Marketing Course in Chennai',
    'Best Digital Marketing Institute in Chennai',
    'Best Video Editing Course in Chennai',
    'Best Video Editing Institute in Chennai',
    'Best Motion Graphics Course in Chennai',
    'Graphic Design Course Chennai',
    'UI UX Design Course Chennai',
    'Digital Marketing Course Chennai',
    'Video Editing Course Chennai',
    'Motion Graphics Course Chennai',
    'Design Institute Near OMR Chennai',
    'Creative Courses Perumbakkam Chennai',
    'TSDC Chennai',
  ],
}

export default function HomePage() {
  const schemas = [
    organizationSchema,
    itemListSchema({
      name: 'TSDC Creative Courses',
      items: [
        { title: 'Graphic Design Course', path: '/courses/graphic-design' },
        { title: 'UI/UX Design Course', path: '/courses/uiux-design' },
        { title: 'Digital Marketing Course', path: '/courses/digital-marketing' },
        { title: 'Video Editing Course', path: '/courses/video-editing' },
      ],
    }),
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`home-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
      <HomepageContent />
    </>
  )
}
