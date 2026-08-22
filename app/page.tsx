import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebSite', name: 'RTI.gov', url: 'https://rti-gov.vercel.app',
    description: 'An independent concept for a unified citizen-first Right to Information service in India.',
    potentialAction: { '@type': 'SearchAction', target: 'https://rti-gov.vercel.app/search?q={search_term_string}', 'query-input': 'required name=search_term_string' },
  };
  return <PageShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="home-hero-v2">
      <div className="home-hero-copy">
        <span className="home-kicker">The Right to Information Act, 2005</span>
        <h1>Government records.<br/><em>Within your reach.</em></h1>
        <p>Understand your right, search what is already public, find the correct authority and file a request that can be answered.</p>
        <div className="hero-actions"><Link className="button-primary large" href="/request">File an RTI request →</Link><Link className="button-secondary large" href="/learn">Understand RTI first</Link></div>
        <div className="trust-row"><span>✓ No Aadhaar or PAN</span><span>✓ Direct filing available</span><span>✓ Mobile-first</span></div>
      </div>
      <div className="home-hero-image"><div className="photo-credit">Parliament House · New Delhi</div></div>
      <div className="hero-right-card"><span>Start with the truth</span><h2>RTI is for records—not redress.</h2><p>If you need a service fixed, use a grievance. If you need to see the file behind it, use RTI.</p><Link href="/learn">Check the right route →</Link></div>
    </section>

    <section className="task-deck">
      <div className="task-intro"><span className="page-eyebrow">What do you need to do?</span><h2>One system. Four clear starts.</h2></div>
      <div className="task-grid">
        <Link href="/request"><span>01</span><b>File a request</b><p>From the right authority to a clear, trackable receipt.</p><i>→</i></Link>
        <Link href="/status"><span>02</span><b>Track a case</b><p>See the current owner, deadline, reply and next action.</p><i>→</i></Link>
        <Link href="/appeal"><span>03</span><b>File first appeal</b><p>Challenge delay, denial, incomplete information or fees.</p><i>→</i></Link>
        <Link href="/search"><span>04</span><b>Search public records</b><p>Find disclosures before spending time on a request.</p><i>→</i></Link>
      </div>
    </section>

    <section className="principle-section">
      <div><span className="page-eyebrow light">Designed around the citizen</span><h2>The form is not the service.</h2></div>
      <p>The real service begins before filing and continues after submission. RTI.gov explains the right, prevents wrong-authority payments, turns progress into plain language and makes appeals a visible part of the journey.</p>
      <div className="principle-list"><span><b>30 days</b> usual response period</span><span><b>48 hours</b> life or liberty</span><span><b>₹10</b> Central application fee</span><span><b>₹0</b> Central first appeal</span></div>
    </section>

    <section className="national-routing">
      <div className="routing-copy"><span className="page-eyebrow">One front door</span><h2>Central or State should be our problem—not yours.</h2><p>The current Central portal returns State requests without refund. This concept identifies the jurisdiction before filing, keeps a single mental model and hands citizens to the correct route with context intact.</p><Link className="button-primary" href="/authorities">Find the right public authority</Link></div>
      <div className="routing-map"><div className="route-origin"><span>You</span></div><div className="route-lines"><i/><i/><i/></div><div className="route-targets"><span><b>Central</b>Ministries & national bodies</span><span><b>State</b>Departments & state bodies</span><span><b>Local</b>Municipalities & districts</span></div></div>
    </section>

    <section className="account-preview"><div className="account-copy"><span className="page-eyebrow light">One accountable history</span><h2>Every request. Every deadline. Nothing buried.</h2><p>A citizen should not keep registration numbers in screenshots. RTI.gov provides a durable case history while preserving direct filing for people who do not want an account.</p><Link className="button-on-dark" href="/history">Open the demo account →</Link></div><div className="mini-dashboard"><div className="mini-dashboard-head"><span>My RTI</span><b>3 active cases</b></div><article><i className="dot amber"/><div><b>Foot-over bridge inspection records</b><small>Ministry of Railways · Reply due in 24 days</small></div><span>With CPIO</span></article><article><i className="dot green"/><div><b>EPFO regional-office circulars</b><small>Reply received · 14 August</small></div><span>Download</span></article><article><i className="dot blue"/><div><b>Highway tender evaluation appeal</b><small>First appeal · Decision due 5 September</small></div><span>In review</span></article></div></section>
  </PageShell>;
}
