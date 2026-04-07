'use client'

import { CourseLandingTemplate } from '@/app/components/courses/CourseLandingTemplate'
import type { CourseLandingData } from '@/app/components/courses/CourseLandingTemplate'

const graphicDesignCourse: CourseLandingData = {
  title: 'Graphic Design Mastery Program',
  eyebrow: 'Creative Education Institute - Chennai',
  description:
    "Become a commercial graphic designer with branding, typography, Adobe tools, packaging, social media creatives, and a job-ready portfolio built through practical projects.",
  image: '/Gd1.jpeg',
  imageAlt: 'Graphic Design Course in Chennai - TSDC',
  accent: '#F4793E',
  deep: '#4B3A97',
  soft: '#fff3ec',
  duration: '12 Weeks',
  mode: 'Offline / Hybrid',
  seats: 'Limited seats',
  syllabusUrl: '/syllabus/graphic-design-syllabus.pdf',
  syllabusFileName: 'graphic-design-syllabus.pdf',
  popupInterest: 'Graphic Design',
  heroPoints: ['Beginner-friendly', '5+ brand projects', 'Portfolio review'],
  outcomes: [
    {
      title: 'Design professional brand visuals',
      text: 'Learn layout, composition, color, typography, logo direction, packaging, and social media creative systems.',
    },
    {
      title: 'Master Adobe design tools',
      text: 'Build confidence in Photoshop, Illustrator, and InDesign through weekly practical assignments and mentor corrections.',
    },
    {
      title: 'Build a portfolio that sells your skill',
      text: 'Create real-looking brand projects, posters, campaigns, and Behance-style case studies that show your thinking.',
    },
    {
      title: 'Prepare for freelance and job work',
      text: 'Understand client briefs, design quality checks, revisions, presentation, and creative career next steps.',
    },
  ],
  modules: [
    {
      label: 'Foundation',
      title: 'Design thinking and visual basics',
      text: 'Principles of design, visual hierarchy, grids, spacing, contrast, and color psychology for commercial work.',
    },
    {
      label: 'Tools',
      title: 'Photoshop, Illustrator, InDesign',
      text: 'Photo editing, vector design, logos, posters, brochures, layout systems, and export-ready design workflows.',
    },
    {
      label: 'Portfolio',
      title: 'Brand project and case study',
      text: 'Create a portfolio-ready brand identity and campaign system with feedback from mentors.',
    },
    {
      label: 'Career',
      title: 'Freelance and placement support',
      text: 'Learn how to present your work, handle design briefs, and move toward interviews or freelance projects.',
    },
  ],
  tools: ['Photoshop', 'Illustrator', 'InDesign', 'Behance'],
  project: 'Students work on logo direction, poster campaigns, social creatives, packaging layouts, and portfolio presentation so the course output looks ready for employers and clients.',
  careerRoles: 'Graphic Designer, Brand Designer, Social Media Designer, Packaging Designer, Freelancer',
  testimonial: {
    quote: 'The real branding projects completely transformed my skills. I got my first design job in 45 days!',
    author: 'Dinesh',
    role: 'Branding Designer',
  },
}

export default function GraphicDesignContent() {
  return <CourseLandingTemplate course={graphicDesignCourse} />
}
