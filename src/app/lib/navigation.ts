export type NavLink = { label: string; href: string }

export type NavigationContent = {
  navbar: {
    links: NavLink[]
    courseDropdown: NavLink[]
    counsellingButtonLabel: string
    mobileExtraLinks: NavLink[]
  }
  footer: {
    ctaEyebrow: string
    ctaHeading: string
    ctaButtonLabel: string
    whatsappLinkLabel: string
    brandTagline: string
    courseLinks: NavLink[]
    tsdcLinks: NavLink[]
    supportLinks: NavLink[]
    whatsappAdmissionsLabel: string
    disclaimerText: string
  }
}

export const defaultNavigation: NavigationContent = {
  navbar: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'Courses', href: '/courses' },
      { label: 'Projects', href: '/live-projects' },
      { label: 'Masterclass', href: '/masterclasses' },
      { label: 'About Us', href: '/about' },
      { label: 'Resources', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
    courseDropdown: [
      { label: 'Graphic Design', href: '/courses/graphic-design' },
      { label: 'UI/UX Design', href: '/courses/uiux-design' },
      { label: 'Digital Marketing', href: '/courses/digital-marketing' },
      { label: 'Video Editing', href: '/courses/video-editing' },
      { label: 'Motion Graphics', href: '/courses/motion-graphics' },
    ],
    counsellingButtonLabel: 'Book Counselling',
    mobileExtraLinks: [
      { label: 'Admissions', href: '/admissions' },
      { label: 'Free Career Counselling', href: '/career-counselling' },
    ],
  },
  footer: {
    ctaEyebrow: 'READY TO START?',
    ctaHeading: 'Build skills that move your career forward.',
    ctaButtonLabel: 'Book Free Counselling',
    whatsappLinkLabel: 'Chat on WhatsApp',
    brandTagline: 'Practical, career-focused learning for aspiring creative professionals in Chennai.',
    courseLinks: [
      { label: 'Graphic Design', href: '/courses/graphic-design' },
      { label: 'UI/UX Design', href: '/courses/uiux-design' },
      { label: 'Digital Marketing', href: '/courses/digital-marketing' },
      { label: 'Video Editing', href: '/courses/video-editing' },
      { label: 'Motion Graphics', href: '/courses/motion-graphics' },
    ],
    tsdcLinks: [
      { label: 'About Us', href: '/about' },
      { label: 'Student Projects', href: '/live-projects' },
      { label: 'Masterclasses', href: '/masterclasses' },
      { label: 'Blog & Resources', href: '/blog' },
      { label: 'Admissions', href: '/admissions' },
    ],
    supportLinks: [
      { label: 'Career Counselling', href: '/career-counselling' },
      { label: 'Frequently Asked Questions', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-conditions' },
      { label: 'Refund Policy', href: '/refund-cancellation-policy' },
    ],
    whatsappAdmissionsLabel: 'WhatsApp admissions',
    disclaimerText: 'Career outcomes vary based on individual skills, experience and employer requirements.',
  },
}

export const fetchNavigation = async (): Promise<NavigationContent> => {
  try {
    const response = await fetch('/api/content/navigation', { cache: 'no-store' })
    if (!response.ok) throw new Error(`Failed to fetch navigation: ${response.status}`)
    const payload = (await response.json()) as { value?: NavigationContent }
    return payload.value ?? defaultNavigation
  } catch (error) {
    console.error('[fetchNavigation] falling back to default:', error)
    return defaultNavigation
  }
}
