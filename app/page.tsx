import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';

export default function HomePage() {
  return <PageShell><div className="citizen-home">
    <section className="citizen-hero" aria-labelledby="hero-title">
      <div className="hero-message">
        <span className="section-eyebrow">Right to Information Act, 2005</span>
        <h1 id="hero-title">Ask the government.<br/><em>Track every step.</em></h1>
        <p>Request existing records from Central Government public authorities, follow the statutory timeline, and appeal when you need to.</p>
        <div className="hero-ctas"><Link className="action-primary" href="/request">File an RTI Request <span>→</span></Link><Link className="action-secondary" href="/status">Track a Request</Link></div>
        <ul className="hero-facts"><li><b>₹10</b><span>Central application fee</span></li><li><b>30 days</b><span>Usual response period</span></li><li><b>No reason</b><span>required to ask</span></li></ul>
      </div>
      <div className="lifecycle-card" aria-labelledby="lifecycle-title">
        <div className="lifecycle-head"><span>YOUR REQUEST JOURNEY</span><h2 id="lifecycle-title">From filing to a lawful response</h2></div>
        <ol>
          <li className="complete"><i>✓</i><div><b>Request filed</b><small>Registration number issued</small></div><time>Day 0</time></li>
          <li><i>2</i><div><b>Nodal Officer</b><small>Routes to the record-holding office</small></div><time>Transfer<br/>up to 5 days</time></li>
          <li><i>3</i><div><b>CPIO reviews</b><small>Central Public Information Officer</small></div><time>Responsible<br/>officer</time></li>
          <li><i>4</i><div><b>Reply available</b><small>Records, decision, or additional fee</small></div><time>Usually by<br/>day 30</time></li>
        </ol>
        <div className="appeal-route"><span>IF THE REPLY IS LATE OR INADEQUATE</span><Link href="/appeal"><b>First Appeal</b><small>Continue with the same case →</small></Link></div>
      </div>
    </section>

    <section className="jurisdiction-alert" aria-labelledby="jurisdiction-title"><span aria-hidden="true">!</span><div><b id="jurisdiction-title">This service is for Central Government public authorities only.</b><p>For State Governments—including the Government of NCT Delhi—use the relevant State RTI portal.</p></div><Link href="/authorities">Check the authority before filing →</Link></section>

    <section className="service-section" aria-labelledby="services-title"><div className="section-heading"><span className="section-eyebrow">Citizen services</span><h2 id="services-title">What do you need to do?</h2><p>Start with the task that matches where you are in the RTI process.</p></div><div className="service-layout">
      <Link className="service-feature" href="/request"><span className="service-icon" aria-hidden="true">✎</span><div><small>START A NEW APPLICATION</small><h3>File an RTI Request</h3><p>Describe the records in plain language. We&apos;ll help identify the likely authority, explain the fee, and give you one calm review before submission.</p><b>Begin your request <i>→</i></b></div></Link>
      <div className="service-secondary"><Link href="/status"><span className="service-icon" aria-hidden="true">◎</span><div><small>EXISTING REQUEST</small><h3>Track Request</h3><p>See the responsible authority, transfer history, due date, reply and next lawful action.</p><b>Check status →</b></div></Link><Link href="/appeal"><span className="service-icon" aria-hidden="true">↗</span><div><small>RESPONSE OR DELAY</small><h3>File First Appeal</h3><p>Connect to the original case without entering everything again.</p><b>Check appeal eligibility →</b></div></Link></div>
      <nav className="service-support" aria-label="Related citizen services"><Link href="/history"><span>▤</span><b>View History</b><i>Requests, replies and appeals</i><em>→</em></Link><Link href="/payments"><span>₹</span><b>Payment Reconciliation</b><i>Check before paying again</i><em>→</em></Link><Link href="/authorities"><span>⌖</span><b>Find Public Authority</b><i>Send the request where records live</i><em>→</em></Link></nav>
    </div></section>

    <section className="journey-section" aria-labelledby="journey-title"><div className="journey-intro"><span className="section-eyebrow light">Before you file</span><h2 id="journey-title">A better request starts before the form.</h2><p>Follow the shortest route to the information you need.</p></div><ol><li><span>01</span><div><b>Understand</b><p>Check whether RTI applies, or whether you need a grievance service.</p><Link href="/learn">Is RTI right for this? →</Link></div></li><li><span>02</span><div><b>Search</b><p>Look for reports, circulars and records already published online.</p><Link href="/search">Search disclosures →</Link></div></li><li><span>03</span><div><b>Find</b><p>Identify the Central authority most likely to hold the record.</p><Link href="/authorities">Find the authority →</Link></div></li><li><span>04</span><div><b>File &amp; track</b><p>Ask precisely, save the number, and follow every step.</p><Link href="/request">Start a request →</Link></div></li></ol></section>

    <section className="information-section" aria-labelledby="information-title"><div className="information-lead"><span className="section-eyebrow">RTI essentials</span><h2 id="information-title">Know what the law can do for you.</h2><p>Clear answers before you spend time on an application.</p><Link href="/guide">Read the full citizen guide →</Link></div><div className="information-editorial"><article><span>ASK FOR RECORDS</span><h3>What can I request?</h3><p>Documents, file notings, orders, reports, contracts, inspection records, correspondence, datasets and other existing information held by a public authority.</p></article><article><span>CHOOSE THE RIGHT ROUTE</span><h3>RTI does not resolve a grievance.</h3><p>It can reveal records behind a decision. It cannot force an office to repair, approve, pay, investigate or provide a service.</p></article><details open><summary>Fees, exemptions and time limits <i>+</i></summary><div><b>₹10</b><p>Central application fee. Eligible Below Poverty Line applicants are exempt with valid proof.</p><b>30 days</b><p>Usual response period. Information concerning life or liberty is subject to a 48-hour provision.</p></div></details><details><summary>What happens after filing? <i>+</i></summary><div><p>Keep the registration number. Track routing, transfers, additional-fee notices and the authority&apos;s reply from the status service.</p></div></details><details><summary>When can I file a first appeal? <i>+</i></summary><div><p>A first appeal may be relevant when no timely reply arrives, information is denied or incomplete, or an additional fee is disputed.</p></div></details></div></section>

    <section className="home-help"><div><span>?</span><div><b>Need help with RTI Online?</b><p>Use the step-by-step guide or speak to the prototype help desk.</p></div></div><nav><Link href="/guide">Citizen Guide</Link><Link href="/faq">Frequently Asked Questions</Link><Link href="/contact">Contact Us</Link></nav></section>
  </div></PageShell>;
}
