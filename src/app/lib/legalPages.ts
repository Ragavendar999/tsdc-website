export type LegalPage = {
  slug: string
  title: string
  eyebrow: string
  description: string
  sections: {
    heading: string
    body: string
  }[]
}

export const legalPages: Record<string, LegalPage> = {
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    eyebrow: 'Your data and trust',
    description:
      'This policy explains how Traijo Skill Development Center collects, uses, and protects basic enquiry and enrollment information.',
    sections: [
      {
        heading: 'Information we collect',
        body: 'We collect limited information such as name, email address, phone number, course interest, city, and messages submitted through our forms or contact flows.',
      },
      {
        heading: 'How we use information',
        body: 'We use this information to respond to enquiries, guide students toward suitable courses, support admissions, share class updates, and improve the learning experience.',
      },
      {
        heading: 'Data sharing',
        body: 'We do not sell personal information. Information may be used only by the TSDC team or trusted tools needed for communication, payment, support, and operations.',
      },
      {
        heading: 'Your choices',
        body: 'You can request corrections, updates, or deletion of your personal details by contacting support@traijoedu.in.',
      },
    ],
  },
  'refund-cancellation-policy': {
    slug: 'refund-cancellation-policy',
    title: 'Refund & Cancellation Policy',
    eyebrow: 'Payments and enrollment',
    description:
      'This policy explains how refunds and cancellations are handled for TSDC courses, workshops, and masterclasses.',
    sections: [
      {
        heading: 'Course and masterclass fees',
        body: 'Fees paid for courses, workshops, or masterclasses are generally non-refundable once payment is completed or access has been confirmed.',
      },
      {
        heading: 'Exceptional cases',
        body: 'Exceptional requests may be reviewed case-by-case by the TSDC team. Approval is not guaranteed and depends on the timing, access status, and operational circumstances.',
      },
      {
        heading: 'Cancellation by TSDC',
        body: 'If TSDC cancels or reschedules a paid session, students will be informed about the next available option or an applicable resolution.',
      },
      {
        heading: 'Support contact',
        body: 'For payment concerns, contact support@traijoedu.in with your name, phone number, payment reference, and enrolled program details.',
      },
    ],
  },
  'terms-conditions': {
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    eyebrow: 'Using TSDC services',
    description:
      'These terms outline the expected use of TSDC website content, course material, classes, and learning resources.',
    sections: [
      {
        heading: 'Learning use',
        body: 'Course materials, live sessions, recordings, templates, and resources are provided for personal learning and student development only.',
      },
      {
        heading: 'Accountability',
        body: 'Students are expected to attend sessions, complete assignments, communicate respectfully, and avoid sharing private course materials without permission.',
      },
      {
        heading: 'Intellectual property',
        body: 'TSDC content, course resources, brand assets, and training materials may not be copied, resold, redistributed, or published without written approval.',
      },
      {
        heading: 'Updates',
        body: 'TSDC may update schedules, course structure, pricing, offers, or policies when needed. Important changes will be communicated through official channels.',
      },
    ],
  },
  'cookie-consent': {
    slug: 'cookie-consent',
    title: 'Cookie Consent',
    eyebrow: 'Website experience',
    description:
      'This page explains how cookies and similar browser technologies may be used to improve the TSDC website experience.',
    sections: [
      {
        heading: 'Cookie usage',
        body: 'We may use cookies and similar technologies to understand website usage, improve performance, support analytics, and make the browsing experience smoother.',
      },
      {
        heading: 'Analytics and tracking',
        body: 'Analytics and marketing tools may help us measure campaign performance, page engagement, and enquiry flow quality.',
      },
      {
        heading: 'Managing cookies',
        body: 'You can manage or block cookies through your browser settings. Some website features may behave differently if cookies are disabled.',
      },
      {
        heading: 'Consent',
        body: 'By continuing to use the website, you acknowledge that cookie-based tools may be used as part of the site experience.',
      },
    ],
  },
}

export const legalLinks = [
  { title: 'Privacy Policy', href: '/privacy-policy' },
  { title: 'Refund & Cancellation Policy', href: '/refund-cancellation-policy' },
  { title: 'Terms & Conditions', href: '/terms-conditions' },
  { title: 'Cookie Consent', href: '/cookie-consent' },
]
