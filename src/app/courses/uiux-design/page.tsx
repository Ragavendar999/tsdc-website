import type { Metadata } from 'next'
import UiUxDesignContent from './UiUxDesignContent'

export const metadata: Metadata = {
  title: 'UI/UX Design Course in Chennai | Figma, Prototyping & Product Design Training',
  description:
    'Enroll in TSDC\'s UI/UX Design Course in Chennai — learn Figma, UX research, wireframing, prototyping & design systems with real product projects. Best UI/UX design institute in Chennai with ISO-certified certificates.',
  keywords: [
    'UI UX Design Course Chennai',
    'UI/UX Design Training Chennai',
    'UX Design Course Chennai',
    'Figma Course Chennai',
    'Figma Training Chennai',
    'Product Design Course Chennai',
    'User Experience Design Chennai',
    'User Interface Design Course Chennai',
    'Best UI UX Course Chennai',
    'UI UX Design Institute Chennai',
    'UX Research Course Chennai',
    'Prototyping Course Chennai',
    'TSDC UI UX Design',
  ],
  alternates: {
    canonical: '/courses/uiux-design',
  },
  openGraph: {
    title: 'UI/UX Design Course in Chennai | TSDC Creative Education Institute',
    description:
      'Learn Figma, UX research & product design with real projects at Chennai\'s top UI/UX design course. Apply now at TSDC.',
    url: 'https://traijoedu.in/courses/uiux-design',
    images: [{ url: '/UIUXDesign.png', width: 1200, height: 630, alt: 'UI/UX Design Course Chennai – TSDC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UI/UX Design Course Chennai | TSDC',
    description: 'Master Figma, UX research & prototyping with real product projects. Best UI/UX course in Chennai.',
    images: ['/UIUXDesign.png'],
  },
}

export default function UiUxDesignCoursePage() {
  return <UiUxDesignContent />
}
