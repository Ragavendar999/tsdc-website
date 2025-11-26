import Navbar from './components/common/Navbar'
import ScrollProgress from './components/common/ScrollProgress'
import './globals.css'
import Footer from './components/common/Footer'

export const metadata = {
  title: 'Traijon Skill Development Center (TSDC)',
  description: 'You’re more than a learner — You’re building your future.',
  keywords: ['TSDC', 'Graphic Design Course', 'UI/UX Training', 'Digital Marketing'],
  authors: [{ name: 'TSDC Team', url: 'https://traijoedu.in' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'TSDC – Launch Your Creative Career',
    description: 'Job-ready training in Graphic Design, UI/UX & Marketing.',
    url: 'https://tsdc.in',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* 🔥 Meta Pixel MUST be raw script for Meta URL Scanner */}
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
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1310792007726517&ev=PageView&noscript=1"
          />
        </noscript>
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
