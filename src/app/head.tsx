export default function Head() {
  return (
    <>
      {/* BASIC SEO */}
      <title>Traijon Skill Development Center (TSDC) – Best Graphic Design, UI/UX & Digital Marketing Courses</title>

      <meta
        name="description"
        content="TSDC – Traijon Skill Development Center offers job-ready Graphic Design, UI/UX, and Digital Marketing courses with live projects, certificates, internships & 100% guidance."
      />

      <meta
        name="keywords"
        content="TSDC, Traijo, Traijon Skill Development Center, Graphic Design Course, UI UX Design Course, Digital Marketing Course, Best Design Institute Chennai, Job Ready Courses, Live Project Training"
      />

      <meta name="author" content="TSDC Team" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* FAVICON */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />

      {/* CANONICAL URL */}
      <link rel="canonical" href="https://traijoedu.in" />

      {/* OPEN GRAPH */}
      <meta property="og:title" content="TSDC – Launch Your Creative Career" />
      <meta
        property="og:description"
        content="Job-ready training in Graphic Design, UI/UX & Digital Marketing with live projects and certificates."
      />
      <meta property="og:url" content="https://traijoedu.in" />
      <meta property="og:site_name" content="TSDC" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/og-banner.png" />

      {/* TWITTER CARD */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="TSDC – Kickstart Your Creative Career" />
      <meta
        name="twitter:description"
        content="Graphic Design, UI/UX & Digital Marketing Courses with real-world projects."
      />
      <meta name="twitter:image" content="/og-banner.png" />

      {/* META PIXEL RAW SCRIPT */}
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
    </>
  );
}
