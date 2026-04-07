export default function Head() {
  return (
    <>
      {/* BASIC SEO */}
      <title>Best Creative Education Institute in Chennai | TSDC Graphic Design, UI/UX, Digital Marketing, Video Editing & Motion Graphics</title>

      <meta
        name="description"
        content="TSDC - Traijo Skill Development Center offers job-ready Graphic Design, UI/UX Design, Digital Marketing, Video Editing and Motion Graphics courses in Chennai with live projects, certificates, internships and career guidance."
      />

      <meta
        name="keywords"
        content="Creative Education Institute in Chennai, Best Creative Education Institute in Chennai, Best Graphic Design Course in Chennai, Best Graphic Design Institute in Chennai, Best UI UX Design Course in Chennai, Best UI UX Design Institute in Chennai, Best Digital Marketing Course in Chennai, Best Digital Marketing Institute in Chennai, Best Video Editing Course in Chennai, Best Video Editing Institute in Chennai, Best Motion Graphics Course in Chennai, Motion Graphics Course Chennai, TSDC, Traijo Skill Development Center"
      />

      <meta name="author" content="TSDC Team" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* FAVICON */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />

      {/* CANONICAL URL */}
      <link rel="canonical" href="https://traijoedu.in" />

      {/* OPEN GRAPH */}
      <meta property="og:title" content="TSDC - Best Creative Education Institute in Chennai" />
      <meta
        property="og:description"
        content="Job-ready Graphic Design, UI/UX, Digital Marketing, Video Editing and Motion Graphics courses in Chennai with live projects and certificates."
      />
      <meta property="og:url" content="https://traijoedu.in" />
      <meta property="og:site_name" content="TSDC" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/og-banner.png" />

      {/* TWITTER CARD */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="TSDC - Best Creative Education Institute in Chennai" />
      <meta
        name="twitter:description"
        content="Graphic Design, UI/UX, Digital Marketing, Video Editing and Motion Graphics courses with real-world projects."
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

            fbq('init', '1202164335139349');
            fbq('track', 'PageView');
          `,
        }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1202164335139349&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}
