import Navbar from './components/common/Navbar';
import ScrollProgress from './components/common/ScrollProgress';
import './globals.css';
import Footer from './components/common/Footer';

export const metadata = {
  title: 'Traijon Skill Development Center (TSDC)',
  description:
    'TSDC – Traijon Skill Development Center offers job-ready Graphic Design, UI/UX, and Digital Marketing training with certificates, internships & real-world projects.',
  keywords: [
    'TSDC',
    'Traijo',
    'Traijon Skill Development Center',
    'Graphic Design Course',
    'UI/UX Design Training',
    'Digital Marketing Course',
    'Best Design Institute Chennai',
    'Live Project Training',
    'Job Ready Courses'
  ],
  authors: [{ name: 'TSDC Team', url: 'https://traijoedu.in' }],

  icons: {
    icon: '/favicon.ico',
  },

  // 🔥 OPEN GRAPH — Social Sharing Preview
  openGraph: {
    title: 'TSDC – Launch Your Creative Career',
    description:
      'Job-ready training in Graphic Design, UI/UX & Digital Marketing with live projects and certificates.',
    url: 'https://traijoedu.in',
    siteName: 'TSDC',
    images: [
      {
        url: '/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'TSDC Creative Courses',
      },
    ],
    type: 'website',
  },

  // 🔥 Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'TSDC – Kickstart Your Creative Career',
    description:
      'Graphic Design, UI/UX & Digital Marketing Courses with real-world live projects.',
    images: ['/og-banner.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ---------------------------------------------- */}
        {/* 🔥 Meta Pixel (Facebook Ads) */}
        {/* ---------------------------------------------- */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '1310792007726517');
              fbq('track', 'PageView');
            `,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1310792007726517&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* ---------------------------------------------- */}
        {/* 🔥 Google Ads (gtag.js) */}
        {/* ---------------------------------------------- */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11403134953"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11403134953');
            `,
          }}
        />
      </head>

      <body className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100 transition-colors duration-300">
        <ScrollProgress />
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
