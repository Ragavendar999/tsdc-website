'use client'

import { CourseLandingTemplate } from '@/app/components/courses/CourseLandingTemplate'
import type { CourseLandingData } from '@/app/components/courses/CourseLandingTemplate'

const videoEditingCourse: CourseLandingData = {
  title: 'Video Editing Mastery Program',
  eyebrow: 'Creative Video Course - Chennai',
  description:
    'Learn Premiere Pro, After Effects, DaVinci Resolve, color grading, reels, shorts, brand videos, motion graphics, and showreel-building workflows.',
  image: '/graphicdesign.png',
  imageAlt: 'Video Editing Course in Chennai - TSDC',
  accent: '#EA6865',
  deep: '#4B3A97',
  soft: '#f2f0ff',
  duration: '12 Weeks',
  mode: 'Offline / Hybrid',
  seats: 'Limited seats',
  syllabusUrl: '/syllabus/VE%20Syllabus.pdf',
  syllabusFileName: 'VE Syllabus.pdf',
  popupInterest: 'Video Editing',
  heroPoints: ['3 pro tools', 'Commercial edits', 'Showreel support'],
  outcomes: [
    {
      title: 'Edit videos with professional structure',
      text: 'Understand timelines, cuts, pacing, audio cleanup, transitions, export settings, and social media formats.',
    },
    {
      title: 'Create reels, ads, and brand videos',
      text: 'Practice short-form edits, commercial cuts, product videos, YouTube workflows, and creator-style content.',
    },
    {
      title: 'Add motion graphics and polish',
      text: 'Learn titles, lower thirds, logo reveals, keyframes, effects, and motion elements using After Effects.',
    },
    {
      title: 'Build a showreel for opportunities',
      text: 'Create a portfolio reel that helps you approach freelance clients, content teams, and production houses.',
    },
  ],
  modules: [
    {
      label: 'Editing',
      title: 'Premiere Pro workflow',
      text: 'Timeline editing, audio sync, cuts, transitions, speed ramps, captions, reels, shorts, and export settings.',
    },
    {
      label: 'Color',
      title: 'Color correction and grading',
      text: 'Lumetri basics, LUT workflows, skin tone matching, cinematic mood, and DaVinci Resolve fundamentals.',
    },
    {
      label: 'Motion',
      title: 'After Effects motion graphics',
      text: 'Text animation, logo reveals, lower thirds, keyframing, easing, and brand motion assets.',
    },
    {
      label: 'Showreel',
      title: 'Portfolio and freelance launch',
      text: 'Commercial edits, showreel planning, client brief understanding, pricing basics, and interview preparation.',
    },
  ],
  tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition'],
  project: 'Students edit reels, product videos, commercial cuts, motion graphics, and a final showreel to prove real video-production skill.',
  careerRoles: 'Video Editor, Content Editor, Motion Graphics Artist, YouTube Editor, Freelance Video Editor',
  testimonial: {
    quote: 'From not knowing what a timeline is to editing commercial ads, TSDC made it happen in three months.',
    author: 'Vishal M',
    role: 'Junior Video Editor',
  },
}

export default function VideoEditingContent() {
  return <CourseLandingTemplate course={videoEditingCourse} />
}
