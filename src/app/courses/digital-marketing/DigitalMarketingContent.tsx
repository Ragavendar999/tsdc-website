'use client'

import { CourseLandingTemplate } from '@/app/components/courses/CourseLandingTemplate'
import type { CourseLandingData } from '@/app/components/courses/CourseLandingTemplate'

const digitalMarketingCourse: CourseLandingData = {
  title: 'Digital Marketing Pro Program',
  eyebrow: 'Growth Marketing Course - Chennai',
  description:
    'Learn SEO, Google Ads, Meta Ads, social media strategy, analytics, content planning, and campaign reporting through practical growth projects.',
  image: '/Digital_marketing.png',
  imageAlt: 'Digital Marketing Course in Chennai - TSDC',
  accent: '#EA6865',
  deep: '#F4793E',
  soft: '#fff3ec',
  duration: '8 Weeks',
  mode: 'Offline / Hybrid',
  seats: 'Small batch',
  syllabusUrl: '/syllabus/DM%20Syllabus.pdf',
  syllabusFileName: 'DM Syllabus.pdf',
  popupInterest: 'Digital Marketing',
  heroPoints: ['SEO + ads', 'Live campaigns', 'Growth reporting'],
  outcomes: [
    {
      title: 'Plan campaigns that make business sense',
      text: 'Understand funnels, audience targeting, content strategy, lead generation, and campaign objectives.',
    },
    {
      title: 'Run Google and Meta ads confidently',
      text: 'Learn setup, budget planning, creatives, testing, tracking, performance reading, and optimization basics.',
    },
    {
      title: 'Build organic visibility with SEO',
      text: 'Practice keyword research, on-page SEO, content planning, local SEO, and reporting workflows.',
    },
    {
      title: 'Present performance like a marketer',
      text: 'Use analytics and dashboards to explain results, insights, next steps, and business impact.',
    },
  ],
  modules: [
    {
      label: 'Strategy',
      title: 'Marketing fundamentals and funnels',
      text: 'Customer psychology, positioning, content strategy, funnel stages, and brand growth planning.',
    },
    {
      label: 'Performance',
      title: 'Google Ads and Meta Ads',
      text: 'Campaign structure, audience setup, ad creatives, budgets, testing, and performance optimization.',
    },
    {
      label: 'Organic',
      title: 'SEO and content marketing',
      text: 'Keyword research, website optimization, blog planning, local search, and organic growth systems.',
    },
    {
      label: 'Reporting',
      title: 'Analytics and campaign reports',
      text: 'Learn GA4 basics, ad reporting, campaign review, and practical client-style performance summaries.',
    },
  ],
  tools: ['Google Ads', 'Meta Ads', 'GA4', 'SEO Tools', 'Canva'],
  project: 'Students create campaign plans, ad structures, content calendars, SEO checklists, and reporting templates that mirror real marketing work.',
  careerRoles: 'Digital Marketing Executive, SEO Executive, Performance Marketer, Social Media Marketer, Growth Assistant',
  testimonial: {
    quote: 'The Google Ads live campaign training was a game changer and helped me feel ready for agency interviews.',
    author: 'Divya K',
    role: 'Social Media Strategist',
  },
}

export default function DigitalMarketingContent() {
  return <CourseLandingTemplate course={digitalMarketingCourse} />
}
