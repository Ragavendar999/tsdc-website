import type { Metadata } from "next";
import "./globals.css";
import { ContactPopupProvider } from "./components/common/ContactPopupProvider";
import SiteChrome from "./components/common/SiteChrome";

export const metadata: Metadata = {
  title: {
    default: "Best Design Institute in Chennai | TSDC Graphic Design, UI UX, Digital Marketing & Video Editing",
    template: "%s | Best Design Institute in Chennai - TSDC",
  },
  description:
    "Join TSDC, a job-focused creative institute in Chennai for Graphic Design, UI UX Design, Digital Marketing and Video Editing courses. Build a portfolio, work on live projects, learn from mentors, and become career-ready faster.",
  keywords: [
    "Best Design Institute in Chennai",
    "Best Graphic Design Institute in Chennai",
    "Best UI UX Institute in Chennai",
    "Best Digital Marketing Institute in Chennai",
    "Best Video Editing Institute in Chennai",
    "Creative Education Institute Chennai",
    "TSDC",
    "Traijo Skill Development Center",
    "Graphic Design Course Chennai",
    "Graphic Design Training Chennai",
    "Graphic Design Classes Chennai",
    "UI UX Design Course Chennai",
    "UI UX Design Training Chennai",
    "UI UX Course with Placement Chennai",
    "Digital Marketing Course Chennai",
    "Digital Marketing Training Chennai",
    "SEO and Google Ads Course Chennai",
    "Video Editing Course Chennai",
    "Video Editing Training Chennai",
    "Design Courses Chennai",
    "Creative Courses Chennai",
    "Adobe Photoshop Course Chennai",
    "Figma Course Chennai",
    "After Effects Course Chennai",
    "Premiere Pro Course Chennai",
    "DaVinci Resolve Training Chennai",
    "Job Ready Design Courses",
    "Live Project Design Training",
    "Internship Graphic Design Chennai",
    "Placement Focused Creative Courses Chennai",
  ],
  metadataBase: new URL("https://traijoedu.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/tsdc-fav-icon.jpg",
  },
  openGraph: {
    title: "Best Design Institute in Chennai | TSDC Creative Courses",
    description:
      "Explore Graphic Design, UI UX Design, Digital Marketing and Video Editing courses in Chennai with live projects, internships, mentorship and strong placement support.",
    url: "https://traijoedu.in",
    siteName: "TSDC - Traijo Skill Development Center",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "TSDC Creative Courses Chennai",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Design, Marketing & Video Editing Courses in Chennai | TSDC",
    description:
      "Join Chennai's job-focused creative courses with portfolio building, live projects, internship exposure and career guidance at TSDC.",
    images: ["/og-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WSX6BHQD');
            `,
          }}
        />

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
            alt=""
          />
        </noscript>

        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11403134953"></script>

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

      <body
        suppressHydrationWarning={true}
        className="bg-transparent text-gray-900 transition-colors duration-300"
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WSX6BHQD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ContactPopupProvider>
          <SiteChrome>{children}</SiteChrome>
        </ContactPopupProvider>
      </body>
    </html>
  );
}
