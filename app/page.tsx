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
    <section className="home-hero-v3">
      <div className="hero-photo" aria-hidden="true" />
      <div className="constitutional-card">
        <span className="home-kicker">The Right to Information Act, 2005 · Act No. 22 of 2005</span>
        <h1>An informed citizenry strengthens democracy.</h1>
        <i className="saffron-rule" />
        <p>RTI gives every Indian citizen the right to ask public authorities for records—and to receive a reasoned, time-bound response.</p>
        <div className="hero-actions"><Link className="button-primary large" href="/request">Create an RTI request →</Link><Link className="button-on-image large" href="/learn">Understand your right</Link></div>
        <div className="trust-row"><span>No reason required</span><span>30-day response</span><span>₹10 Central fee</span></div>
      </div>
      <div className="photo-credit">Parliament House · New Delhi</div>
      <div className="journey-panel">
        <div className="journey-title"><span>Begin with the right step</span><b>Your RTI journey</b></div>
        <div className="journey-links">
          <Link href="/learn"><span>01</span><div><b>Learn</b><small>Know what RTI can reveal</small></div><i>→</i></Link>
          <Link href="/search"><span>02</span><div><b>Search first</b><small>Find information already public</small></div><i>→</i></Link>
          <Link href="/request"><span>03</span><div><b>Create a request</b><small>Find the authority and file clearly</small></div><i>→</i></Link>
        </div>
      </div>
    </section>

    <section className="public-duty">
      <div className="public-duty-copy"><span className="page-eyebrow">Section 4 · Proactive disclosure</span><h2>The best RTI request is the one you never need to file.</h2><p>Public authorities are required to publish core records, decisions, budgets, rules and responsibilities. Search first. Request only what is still missing.</p><Link className="text-link" href="/search">Search government disclosures →</Link></div>
      <div className="public-duty-list"><span><b>Organisation</b><small>Functions, duties and decision channels</small></span><span><b>Public money</b><small>Budgets, expenditure, subsidies and beneficiaries</small></span><span><b>Decisions</b><small>Rules, orders, reasons and file records</small></span><span><b>People</b><small>Officers, directories and PIO contacts</small></span></div>
    </section>

    <section className="task-deck">
      <div className="task-intro"><div><span className="page-eyebrow">After you file</span><h2>A right needs a visible trail.</h2></div><p>Every status should answer three questions: who has it, when is it due, and what can I do next?</p></div>
      <div className="task-grid civic-actions">
        <Link href="/status"><span>01</span><b>Track a request</b><p>See transfers, the current CPIO, deadlines, fees and replies.</p><i>→</i></Link>
        <Link href="/history"><span>02</span><b>Keep one history</b><p>Requests, acknowledgements, replies and appeals in one place.</p><i>→</i></Link>
        <Link href="/payments"><span>03</span><b>Resolve a payment</b><p>Reconcile a debit before attempting another ₹10 payment.</p><i>→</i></Link>
        <Link href="/appeal"><span>04</span><b>Use your remedy</b><p>Appeal delay, denial, incomplete information or unreasonable fees.</p><i>→</i></Link>
      </div>
    </section>

    <section className="principle-section">
      <div><span className="page-eyebrow light">Your rights at the moment you file</span><h2>The law asks less of the citizen—and more of the system.</h2></div>
      <p>You may apply in English, Hindi or the official language of the area. You do not need to explain why you want the information. If you cannot write, the PIO must reasonably assist you.</p>
      <div className="principle-list"><span><b>30 days</b> usual response period</span><span><b>48 hours</b> life or liberty</span><span><b>5 days</b> transfer to the right authority</span><span><b>₹0</b> if the authority misses the deadline</span></div>
    </section>

    <section className="national-routing">
      <div className="routing-copy"><span className="page-eyebrow">One front door</span><h2>Central or State should be our problem—not yours.</h2><p>The current Central portal returns State requests without refund. This concept identifies the jurisdiction before filing, keeps a single mental model and hands citizens to the correct route with context intact.</p><Link className="button-primary" href="/authorities">Find the right public authority</Link></div>
      <div className="routing-map"><div className="route-origin"><span>You</span></div><div className="route-lines"><i/><i/><i/></div><div className="route-targets"><span><b>Central</b>Ministries & national bodies</span><span><b>State</b>Departments & state bodies</span><span><b>Local</b>Municipalities & districts</span></div></div>
    </section>

    <section className="account-preview"><div className="account-copy"><span className="page-eyebrow light">One accountable history</span><h2>Every request. Every deadline. Nothing buried.</h2><p>A citizen should not keep registration numbers in screenshots. RTI.gov provides a durable case history while preserving direct filing for people who do not want an account.</p><Link className="button-on-dark" href="/history">Open the demo account →</Link></div><div className="mini-dashboard"><div className="mini-dashboard-head"><span>My RTI</span><b>3 active cases</b></div><article><i className="dot amber"/><div><b>Foot-over bridge inspection records</b><small>Ministry of Railways · Reply due in 24 days</small></div><span>With CPIO</span></article><article><i className="dot green"/><div><b>EPFO regional-office circulars</b><small>Reply received · 14 August</small></div><span>Download</span></article><article><i className="dot blue"/><div><b>Highway tender evaluation appeal</b><small>First appeal · Decision due 5 September</small></div><span>In review</span></article></div></section>
  </PageShell>;
}
