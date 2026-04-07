'use client'

import { CourseLandingTemplate } from '@/app/components/courses/CourseLandingTemplate'
import type { CourseLandingData } from '@/app/components/courses/CourseLandingTemplate'

const uiuxDesignCourse: CourseLandingData = {
  title: 'UI/UX Design Mastery Program',
  eyebrow: 'Product Design Course - Chennai',
  description:
    'Learn human-first interface design, UX research, wireframes, Figma prototyping, design systems, usability thinking, and portfolio case studies.',
  image: '/UIUXDesign.png',
  imageAlt: 'UI/UX Design Course in Chennai - TSDC',
  accent: '#4562B0',
  deep: '#4B3A97',
  soft: '#f0eeff',
  duration: '10 Weeks',
  mode: 'Offline / Hybrid',
  seats: '15 seats',
  syllabusUrl: '/syllabus/uiux-design-syllabus.pdf',
  syllabusFileName: 'uiux-design-syllabus.pdf',
  popupInterest: 'UI/UX Design',
  heroPoints: ['Figma projects', 'UX case studies', 'Portfolio support'],
  outcomes: [
    {
      title: 'Think like a product designer',
      text: 'Learn user goals, user journeys, personas, problem framing, and how design decisions support real needs.',
    },
    {
      title: 'Design clean app and web interfaces',
      text: 'Practice spacing, typography, visual hierarchy, responsive layouts, components, and screen flows.',
    },
    {
      title: 'Prototype and test your ideas',
      text: 'Use Figma to create clickable prototypes, design systems, and improvements based on feedback.',
    },
    {
      title: 'Build portfolio-ready case studies',
      text: 'Document process, research, wireframes, final UI, and design decisions in a clear case-study format.',
    },
  ],
  modules: [
    {
      label: 'Research',
      title: 'UX research and product thinking',
      text: 'User interviews, personas, empathy maps, user journeys, problem statements, and competitor review.',
    },
    {
      label: 'Interface',
      title: 'UI principles and visual systems',
      text: 'Grids, typography, colors, spacing, components, accessibility basics, and responsive screen design.',
    },
    {
      label: 'Figma',
      title: 'Prototyping and design systems',
      text: 'Auto layout, reusable components, variants, clickable flows, design tokens, and handoff-ready files.',
    },
    {
      label: 'Portfolio',
      title: 'Case study presentation',
      text: 'Turn your product redesigns and app screens into structured case studies for interviews and freelance work.',
    },
  ],
  tools: ['Figma', 'FigJam', 'Maze', 'Notion', 'Design Systems'],
  project: 'Students design app and website flows, build prototypes, conduct usability improvements, and prepare portfolio case studies for product-design opportunities.',
  careerRoles: 'UI Designer, UX Designer, Product Designer, Web Designer, Freelance UI Designer',
  testimonial: {
    quote: 'The Figma mastery and design system module were incredibly detailed. I built confidence in UX research and case studies.',
    author: 'Sneha P',
    role: 'UI/UX Designer',
  },
}

export default function UiUxDesignContent() {
  return <CourseLandingTemplate course={uiuxDesignCourse} />
}
