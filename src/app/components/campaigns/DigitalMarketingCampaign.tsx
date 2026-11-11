'use client'

import * as React from 'react'
import './digital-marketing-campaign.css'

type Variant = 'program' | 'masterclass'
type Props = { variant: Variant; live?: boolean; started?: boolean }
type Status = 'idle' | 'sending' | 'success' | 'error' | 'preview'
type State = { audience: number; status: Status; error: string; expired: boolean }
const PROGRAM = '/ai-digital-marketing/'
const MASTERCLASS = '/ai-digital-marketing-masterclass/'
const ATTRIBUTION = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
const audiences = [
  ['Starting my career', 'Build something you can explain in an interview.', 'Move beyond tool names. Learn to explain a campaign objective, an audience choice, a creative idea and what you would measure.', 'A marketing project you can explain.'],
  ['Growing my business', 'Understand where your next enquiry could come from.', 'Connect your offer, content, advertising and follow-up. Ask better questions before spending on another campaign.', 'A clearer customer acquisition plan.'],
  ['Freelancing', 'Present a strategy. Not just a list of services.', 'Translate a client brief into a campaign plan, content ideas and a reporting structure. Know what you can promise—and what you cannot.', 'A credible client-ready proposal.'],
]
const modules = [
  ['Strategy before tools', 'Audience research, positioning, customer journeys and campaign objectives.', 'An audience and offer brief.'],
  ['AI-assisted content', 'Research, hooks, copy variations and content planning. Check facts and refine every AI output.', 'A content calendar and creative brief.'],
  ['SEO & discovery', 'Search intent, keyword research, on-page content and local discovery fundamentals.', 'A keyword map and SEO action plan.'],
  ['Meta advertising', 'Campaign objectives, audiences, creative testing and budget planning.', 'A campaign plan with test hypotheses.'],
  ['Google advertising', 'Search campaign structure, intent-led keywords, ad copy and landing-page relevance.', 'A search campaign blueprint.'],
  ['Landing pages & enquiries', 'Message match, useful offers, form friction and thoughtful follow-up.', 'A landing-page and enquiry-flow outline.'],
  ['Analytics & decisions', 'Conversion events, campaign reporting and the difference between activity and outcomes.', 'A measurement and reporting plan.'],
  ['Your campaign project', 'Bring the brief, content, channels and measurement together. Explain the decisions behind your work.', 'A presentation-ready marketing case study.'],
]
const agenda = [
  ['Why more posts are not a strategy', 'Start with the business objective, the right audience and a clear offer.'],
  ['Where AI actually helps', 'Connect a brief with research questions, content angles and draft copy—with human review.'],
  ['Connect content to enquiries', 'Map the journey from a post or ad to a focused page and a useful follow-up.'],
  ['What to learn next', 'Understand the full program pathway and bring your questions about getting started.'],
]
function Icon({ name = 'arrow', size = 20 }: { name?: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    star: <path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z" />,
    clock: <g><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
    calendar: <g><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4m10-4v4M3 11h18m-13 5h3" /></g>,
    target: <g><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></g>,
    shield: <g><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z" /><path d="m8 12 3 3 5-6" /></g>,
    chart: <g><path d="M4 3v17h17M8 16v-4m5 4V8m5 8V5" /></g>,
    layers: <g><path d="m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5" /></g>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.arrow}</svg>
}
export default class DigitalMarketingCampaign extends React.Component<Props, State> {
  state: State = { audience: 0, status: 'idle', error: '', expired: Boolean(this.props.started) }
  private timer?: ReturnType<typeof setInterval>
  private controller?: AbortController
  private submitting = false
  private unmounted = false
  private get mc() { return this.props.variant === 'masterclass' }
  componentDidMount() {
    this.updateExpired()
    this.timer = setInterval(this.updateExpired, 60000)
    this.track('campaign_view')
    const params = new URLSearchParams(window.location.search)
    document.querySelectorAll<HTMLAnchorElement>('[data-dm-crosslink]').forEach((a) => {
      const url = new URL(a.href, window.location.href)
      ATTRIBUTION.forEach((key) => { const value = params.get(key); if (value) url.searchParams.set(key, value.slice(0, 160)) })
      a.href = url.toString()
    })
  }
  componentWillUnmount() { this.unmounted = true; clearInterval(this.timer); this.controller?.abort() }
  private updateExpired = () => this.setState({ expired: Date.now() >= Date.parse(this.mc ? '2026-12-04T07:00:00+05:30' : '2026-12-14T00:00:00+05:30') })
  private track = (event: string) => {
    if (!this.props.live || !['traijoedu.in', 'www.traijoedu.in'].includes(window.location.hostname)) return
    const w = window as Window & { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void }
    const campaign = `dm-december-2026-${this.props.variant}`
    w.gtag?.('event', event, { campaign, lead_type: this.props.variant })
    if (event === 'generate_lead') w.fbq?.('track', 'Lead', { content_name: campaign })
  }
  private onCta = () => this.track('campaign_cta_click')
  private onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (this.submitting || this.state.status === 'success') return
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const f = new FormData(form)
    const phone = String(f.get('phone') || '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
    if (!/^[6-9]\d{9}$/.test(phone)) { this.setState({ status: 'error', error: 'Enter a valid Indian mobile number, with or without +91.' }); return }
    if (String(f.get('name') || '').trim().length < 2) { this.setState({ status: 'error', error: 'Please enter your name.' }); return }
    if (!this.props.live) { this.setState({ status: 'preview', error: '' }); return }
    this.submitting = true
    this.setState({ status: 'sending', error: '' })
    this.controller = new AbortController()
    const timeout = setTimeout(() => this.controller?.abort(), 15000)
    const params = new URLSearchParams(window.location.search)
    try {
      const response = await fetch('/api/campaign-enquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: this.controller.signal,
        body: JSON.stringify({ campaign: this.props.variant, name: String(f.get('name') || '').trim(), email: String(f.get('email') || '').trim(), phone, audience: String(f.get('audience') || ''), consent: f.get('consent') === 'on', website: String(f.get('website') || ''), attribution: Object.fromEntries(ATTRIBUTION.map((key) => [key, (params.get(key) || '').slice(0, 160)])) }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || result.success !== true) throw new Error(result.error || 'Your enquiry could not be sent. Please try again or contact admissions.')
      if (this.unmounted) return
      this.setState({ status: 'success', error: '' }); this.track('generate_lead'); form.reset()
    } catch (error) {
      if (!this.unmounted) this.setState({ status: 'error', error: error instanceof Error && error.name !== 'AbortError' ? error.message : 'The request timed out. Please try again or contact admissions.' })
    } finally { clearTimeout(timeout); this.submitting = false }
  }
  render() {
    const mc = this.mc
    const { audience, status, expired } = this.state
    const cta = expired ? (mc ? 'Ask about the next masterclass' : 'Ask about the next batch') : (mc ? 'Get masterclass details' : 'Get December batch details')
    const other = mc ? PROGRAM : MASTERCLASS
    const faqs = mc ? [
      ['When is the masterclass?', 'Friday, 4 December 2026 at 7:00 AM IST. This is a morning session, not 7:00 PM.'],
      ['Is it free or paid?', 'Request the registration details for the fee, duration and joining instructions before you commit. This form does not take payment.'],
      ['Do I need marketing experience?', 'The session is an introduction for students, career switchers, freelancers and business owners. Bring your questions and your interest in marketing.'],
      ['Will I receive a recording?', 'Recording availability is not yet confirmed. Ask admissions before relying on a replay.'],
      ['Does this enrol me in the full program?', 'No. The masterclass and the December 14 program are separate. An enquiry is not a confirmed booking, payment or course admission.'],
      ['Where will the session happen?', 'The platform or venue and session duration will be shared by admissions with the registration details.'],
    ] : [
      ['When does the new batch start?', 'Monday, 14 December 2026. Admissions will confirm your class timetable before enrolment.'],
      ['What are the fee and class timings?', 'Request the December batch details for the complete fee, payment terms and timetable. Older course offers are not assumed to apply to this batch.'],
      ['How long is the program?', 'Ask admissions for the confirmed duration, class hours and delivery format for the December batch. The eight-part pathway here describes learning topics, not a confirmed number of weeks.'],
      ['Do I need prior experience?', 'The pathway begins with fundamentals. Tell admissions about your background so they can help you assess the fit. Ask about laptop and software requirements before enrolling.'],
      ['Are jobs, clients or income guaranteed?', 'No. The focus is learning, practice and explaining your work. Employment, clients, campaign results and income depend on your skills, effort, experience and market conditions.'],
      ['Are paid tools and advertising budgets included?', 'Do not assume platform subscriptions, advertising spend or other third-party costs are included. Request the full fee breakdown before paying.'],
      ['Can I experience the topic first?', 'The introductory masterclass is scheduled for 4 December 2026 at 7:00 AM IST. Request its separate registration details on the masterclass page.'],
    ]
    return <div className={`dm-page ${mc ? 'dm-masterclass' : 'dm-program'}`}>
      {!this.props.live && <div className="dm-preview" role="note">DESIGN PREVIEW <span>Review version · forms do not send enquiries</span></div>}
      <div className="dm-announcement"><span className="dm-status-dot" />{expired ? 'Explore your next learning opportunity with TSDC' : mc ? 'A fresh perspective. A fresh start to your morning.' : 'Your next chapter in marketing starts 14 December 2026.'}<a href="#enquire" onClick={this.onCta}>Explore {mc ? 'the session' : 'the batch'}<Icon size={14} /></a></div>
      <header className="dm-nav"><a className="dm-brand" href="/" aria-label="TSDC home"><span aria-hidden="true" className="dm-brand-fallback">TSDC<small>SKILL DEVELOPMENT CENTER</small></span><img src="/logo.png" width="128" height="46" alt="Traijo Skill Development Center" onError={(e) => { e.currentTarget.style.display = 'none' }} /></a><nav aria-label="Campaign navigation"><a href="#learn">{mc ? 'The session' : 'The curriculum'}</a><a href="#fit">Who it is for</a><a href="#questions">FAQs</a></nav><a className="dm-button dm-button-small dm-button-dark" href="#enquire" onClick={this.onCta}>{mc ? 'Get session details' : 'Talk to admissions'}<Icon size={16} /></a></header>
      <section className="dm-hero dm-wrap"><div className="dm-hero-copy"><p className="dm-eyebrow"><span className="dm-spark"><Icon name="star" size={14} /></span>{mc ? 'AI-POWERED DIGITAL MARKETING MASTERCLASS' : 'AI-POWERED DIGITAL MARKETING PROGRAM'}</p><h1>{mc ? <React.Fragment>Stop just posting.<br />Start <span>thinking<br className="dm-desktop-break" /> like a marketer.</span></React.Fragment> : <React.Fragment>Learn the strategy.<br />Use the AI.<br /><span>Build the campaign.</span></React.Fragment>}</h1><p className="dm-lede">{mc ? 'Discover how strategy, content and AI fit together—so your next marketing move has a purpose, not just a prompt.' : 'Turn scattered tutorials into a connected marketing skill set. Bring content, SEO, ads and analytics together—with AI supporting your thinking, not replacing it.'}</p><div className="dm-hero-facts"><div><Icon name="calendar" /><span><small>{mc ? 'FRIDAY' : 'NEW BATCH · MONDAY'}</small><strong>{mc ? '04 December 2026' : '14 December 2026'}</strong></span></div><div><Icon name={mc ? 'clock' : 'layers'} /><span><small>{mc ? 'INDIA STANDARD TIME' : 'THE LEARNING PATH'}</small><strong>{mc ? '7:00 AM · Morning' : 'Learn → Build → Explain'}</strong></span></div></div><a className="dm-button dm-button-primary" href="#enquire" onClick={this.onCta}>{cta}<Icon /></a><p className="dm-micro"><Icon name="shield" size={14} />{mc ? 'Know the fee and session details before you commit.' : 'Get the syllabus, fee and timetable before you decide.'}</p></div>
        {mc ? <div className="dm-session-visual" aria-label="Masterclass schedule and overview"><div className="dm-orbit dm-orbit-one" /><div className="dm-orbit dm-orbit-two" /><span className="dm-floating-note"><Icon name="star" size={16} />THINK CLEARER. CREATE SMARTER.</span><article className="dm-ticket"><div className="dm-ticket-top"><span>TSDC / MASTERCLASS</span><Icon name="star" size={26} /></div><p className="dm-ticket-caption">YOUR MORNING.<br />A DIFFERENT PERSPECTIVE.</p><div className="dm-ticket-date"><strong>04</strong><div>DECEMBER<br /><b>2026</b><span>FRIDAY</span></div></div><div className="dm-ticket-time"><Icon name="clock" size={28} /><strong>7:00 AM</strong><span>IST<br />MORNING SESSION</span></div><div className="dm-ticket-bottom"><span>STRATEGY</span><span>CONTENT</span><span>AI WORKFLOWS</span></div><div className="dm-ticket-cut" /></article><div className="dm-visual-label"><span className="dm-status-dot" />AI is the assistant. You are the strategist.</div></div>
        : <div className="dm-workspace" aria-label="Illustrative marketing workflow"><div className="dm-workspace-head"><span><i /><i /><i /></span><b>YOUR MARKETING WORKSPACE</b><Icon name="layers" size={18} /></div><div className="dm-workspace-body"><span className="dm-workspace-label">ONE BRIEF. A CONNECTED CAMPAIGN.</span><h2>From “what do I post?”<br />to <em>“what is the plan?”</em></h2><div className="dm-flow">{[['Research', 'Understand the audience', 'target'], ['Create', 'Shape a useful message', 'star'], ['Launch', 'Choose your channels', 'layers'], ['Measure', 'Make the next decision', 'chart']].map(([title, text, icon], i) => <div key={title}><span>0{i + 1}</span><Icon name={icon} /><b>{title}</b><small>{text}</small></div>)}</div><div className="dm-prompt"><span>AI ASSISTANT</span><p>“Give me three content angles for this audience.”</p><b><Icon name="check" size={14} />Your judgement makes it useful.</b></div></div><div className="dm-workspace-foot"><span>BRIEF → CONTENT → CAMPAIGN → INSIGHT</span><Icon size={16} /></div><span className="dm-sticker">DON’T JUST<br />LEARN TOOLS.<br /><b>CONNECT THEM.</b></span></div>}
      </section>
      <section className="dm-toolstrip" aria-label="Learning topics"><div className="dm-wrap"><p>{mc ? 'A CLEARER PICTURE OF' : 'CONNECT THE SKILLS'}</p><span>AI workflows</span><i>✦</i><span>Content strategy</span><i>✦</i><span>Meta Ads</span><i>✦</i><span>Google Ads</span><i>✦</i><span>SEO & Analytics</span></div></section>
      <section className="dm-section dm-wrap dm-problem"><div><p className="dm-eyebrow">THE REAL SHIFT</p><h2>{mc ? 'More tools won’t fix\na missing strategy.' : 'Knowing the buttons\nis not the same as\nknowing marketing.'}</h2></div><div className="dm-problem-copy"><p>{mc ? 'A prompt can give you a caption. It cannot decide who your customer is, why they should care or what should happen next.' : 'You can generate a hundred captions and still not know what to publish. You can launch an ad and still not know why it worked.'}</p><p>{mc ? 'This session connects those dots. Understand the thinking behind a campaign before you choose another tool.' : 'Start with the decisions behind the tools: the audience, the offer, the message, the channel and the measurement.'}</p><div className="dm-principle"><Icon name="star" /><strong>Learn the why. Practise the how. Explain your work.</strong></div></div></section>
      <section id="learn" className="dm-learning"><div className="dm-wrap dm-section"><div className="dm-section-heading"><div><p className="dm-eyebrow">{mc ? 'INSIDE THE MASTERCLASS' : 'THE LEARNING PATHWAY'}</p><h2>{mc ? 'Four ideas.\nOne connected picture.' : 'From the first brief\nto the final presentation.'}</h2></div><p>{mc ? 'An introduction to the marketing system—not a promise to master a profession in one session.' : 'Eight connected areas of strategy, execution and measurement. Every part connects to something you can build.'}</p></div>{mc ? <div className="dm-agenda">{agenda.map(([title, desc], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{desc}</p></div><Icon /></article>)}</div> : <div className="dm-modules">{modules.map(([title, desc, output], i) => <details key={title} open={i === 0}><summary><span>{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><b aria-hidden="true">+</b></summary><div><p>{desc}</p><strong><Icon name="check" size={16} />Build: {output}</strong></div></details>)}</div>}<div className="dm-inline-cta"><span>{mc ? 'Start with perspective. Choose your next step.' : 'Ask for the full syllabus, class calendar and fees.'}</span><a href="#enquire" onClick={this.onCta}>Send me the {mc ? 'session' : 'program'} details<Icon size={17} /></a></div></div></section>
      <section id="fit" className="dm-wrap dm-section dm-fit"><div className="dm-section-heading"><div><p className="dm-eyebrow">DIFFERENT GOALS. THE SAME FOUNDATIONS.</p><h2>Where do you want\nmarketing to take you?</h2></div><p>You do not need the same starting point to benefit from a clearer way of thinking.</p></div><div className="dm-audience-tabs" role="group" aria-label="Choose your learning goal">{audiences.map(([label], i) => <button type="button" key={label} aria-pressed={audience === i} className={audience === i ? 'dm-selected' : ''} onClick={() => { this.setState({ audience: i }); this.track('campaign_audience_select') }}>{label}<Icon size={17} /></button>)}</div><div className="dm-audience-panel" aria-live="polite"><div className="dm-audience-symbol" aria-hidden="true"><Icon name={['layers', 'target', 'chart'][audience]} size={70} /><span>0{audience + 1}</span></div><div><h3>{audiences[audience][1]}</h3><p>{audiences[audience][2]}</p><strong><Icon name="check" size={18} />Your focus: {audiences[audience][3]}</strong></div></div></section>
      <section className="dm-project-band"><div className="dm-wrap dm-section dm-project-grid"><div><p className="dm-eyebrow">{mc ? 'SEE THE CONNECTION' : 'BUILD, DON’T JUST WATCH'}</p><h2>One business brief.\nA whole new way\nto think.</h2><p>{mc ? 'A simple business scenario can reveal how a message becomes a customer journey.' : 'Practise turning a business problem into a campaign you can present. The value is in the decisions you can explain.'}</p><span className="dm-example-note">Illustrative learning brief · not a client result</span></div><article className="dm-brief-card"><div className="dm-brief-head"><span>THE PRACTICE BRIEF</span><Icon name="target" /></div><h3>A neighbourhood café.<br />A new weekday offer.</h3><p>How would you help the right people discover it?</p>{[['THE AUDIENCE', 'Who needs a reason to visit?'], ['THE MESSAGE', 'What makes this offer worth noticing?'], ['THE JOURNEY', 'What should someone do after the ad?'], ['THE MEASUREMENT', 'What would tell you it is working?']].map(([label, text], i) => <div key={label}><span>0{i + 1} / {label}</span><b>{text}</b></div>)}</article></div></section>
      <section className="dm-wrap dm-section dm-mentor"><div className="dm-mentor-card"><span className="dm-mentor-initials">T<span><Icon name="star" size={22} /></span></span><div><p className="dm-eyebrow">THE TSDC APPROACH</p><h3>Understand. Practise. Explain.</h3><p>A more connected way to learn marketing.</p></div></div><div><h2>Not just “which tool?”<br /><span>Ask “why this approach?”</span></h2><p>Bring your questions, challenge the first idea and develop a point of view you can explain. Ask admissions about the trainer and teaching format.</p></div></section>
      <section id="enquire" className="dm-enquiry-section"><div className="dm-wrap dm-section dm-enquiry-grid"><div className="dm-enquiry-copy"><p className="dm-eyebrow">{expired ? 'LET’S FIND YOUR NEXT STEP' : mc ? 'MAKE ROOM FOR A NEW PERSPECTIVE' : 'YOUR NEXT CHAPTER STARTS HERE'}</p><h2>{expired ? 'This date has passed.\nYour learning does not\nhave to wait.' : mc ? 'A better marketing\nmindset starts with\na better question.' : 'A clearer plan.\nA practical skill set.\nYour next move.'}</h2><p>{mc ? 'Request the registration details. Review the fee, format and joining instructions before deciding.' : 'Ask about the December batch. Get the syllabus, fee, class schedule and delivery details before making a commitment.'}</p><div className="dm-enquiry-date"><Icon name="calendar" /><div><small>{expired ? 'ORIGINAL SCHEDULE' : mc ? 'MASTERCLASS' : 'NEW PROGRAM BATCH'}</small><strong>{mc ? '04 December 2026 · 7:00 AM IST' : '14 December 2026 · Monday'}</strong></div></div><ul><li><Icon name="check" />No payment collected on this form.</li><li><Icon name="check" />No obligation to enrol.</li><li><Icon name="check" />Ask questions before you commit.</li></ul><a className="dm-contact-link" href={`https://wa.me/919566656909?text=${encodeURIComponent(`Hello TSDC, please share details for the AI-Powered Digital Marketing ${mc ? 'masterclass on 4 December 2026 at 7 AM IST' : 'program starting 14 December 2026'}.`)}`} target="_blank" rel="noopener noreferrer">WhatsApp admissions<Icon size={17} /></a></div><div className="dm-form-card"><span className="dm-form-kicker">{mc ? 'MASTERCLASS ENQUIRY' : 'DECEMBER BATCH ENQUIRY'}</span><h3>{expired ? 'Explore the next opportunity' : 'Let’s plan your next step.'}</h3><p>Get the {mc ? 'fee, format and joining details.' : 'syllabus, fees and class timetable.'}</p>{status === 'success' ? <div className="dm-form-feedback dm-success" role="status"><Icon name="check" size={32} /><h4>Your enquiry has been sent.</h4><p>Admissions will contact you using the details provided. Your place is not confirmed by this enquiry.</p><a data-dm-crosslink href={other}>Explore the {mc ? 'full program' : 'masterclass'}<Icon size={16} /></a></div> : <form onSubmit={this.onSubmit}><label>Full name<input name="name" autoComplete="name" placeholder="Your name" required minLength={2} maxLength={80} /></label><label>WhatsApp number<div className="dm-phone-input"><span>IN +91</span><input name="phone" type="tel" autoComplete="tel-national" inputMode="tel" placeholder="Your mobile number" required maxLength={16} aria-describedby="dm-phone-hint" /></div><small id="dm-phone-hint">Indian mobile number, with or without +91.</small></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label><label>I’m currently<select name="audience" defaultValue=""><option value="">Choose one (optional)</option><option value="student">A student or job seeker</option><option value="professional">A working professional</option><option value="freelancer">A freelancer</option><option value="business">A business owner</option><option value="other">Exploring my options</option></select></label><div className="dm-honeypot" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div><label className="dm-consent"><input type="checkbox" name="consent" required /><span>I agree to be contacted by TSDC about this enquiry by phone, WhatsApp or email. <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy policy</a>.</span></label><button className="dm-button dm-button-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending your enquiry…' : cta}<Icon size={19} /></button>{status === 'error' && <p className="dm-form-feedback dm-error" role="alert">{this.state.error}</p>}{status === 'preview' && <p className="dm-form-feedback" role="status">Preview only: form checks passed. Nothing was sent or saved, and no booking was made.</p>}<p className="dm-form-note"><Icon name="shield" size={14} />An enquiry, not a confirmed booking.</p></form>}</div></div></section>
      <section id="questions" className="dm-wrap dm-section dm-faq"><div><p className="dm-eyebrow">GOOD QUESTIONS. CLEAR ANSWERS.</p><h2>Before you\ntake the next step.</h2><p>Clarity first. Commitment second.</p></div><div>{faqs.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section><section className="dm-crosslink dm-wrap"><div><span>{mc ? 'GO BEYOND THE INTRODUCTION' : 'NOT READY FOR THE FULL PROGRAM?'}</span><h2>{mc ? 'Discover the full program.\nNew batch: 14 December.' : 'Experience the thinking first.\nMasterclass: 4 December, 7 AM IST.'}</h2></div><a data-dm-crosslink className="dm-button dm-button-dark" href={other}>Explore the {mc ? 'program' : 'masterclass'}<Icon /></a></section><footer className="dm-footer dm-wrap"><div><strong>TSDC</strong><p>Traijo Skill Development Center<br />Design · Marketing · Innovation</p></div><div><a href="mailto:support@traijoedu.in">support@traijoedu.in</a><a href="tel:+919566656909">+91 95666 56909</a></div><div><a href="/privacy-policy/">Privacy policy</a><a href="/terms-conditions/">Terms & conditions</a><a href="/refund-cancellation-policy/">Refund policy</a></div><p className="dm-footer-note">© 2026 Traijo Skill Development Center. Outcomes depend on participation and practice. No job, income or campaign-performance guarantee. Tool names describe learning topics, not endorsements or partnerships.</p></footer><div className="dm-mobile-bar"><div><small>{expired ? 'ASK ABOUT THE NEXT DATE' : mc ? '04 DEC · 7:00 AM IST' : 'BATCH STARTS 14 DEC 2026'}</small><strong>{mc ? 'AI Marketing Masterclass' : 'AI Marketing Program'}</strong></div><a href="#enquire" className="dm-button dm-button-primary" onClick={this.onCta}>Get details<Icon size={16} /></a></div>
    </div>
  }
}
