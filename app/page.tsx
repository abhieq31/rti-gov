import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';
import { CitizenStart } from '@/components/workflows';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebSite', name: 'RTI.gov', url: 'https://rti-gov.vercel.app',
    description: 'An independent concept for a unified citizen-first Right to Information service in India.',
    potentialAction: { '@type': 'SearchAction', target: 'https://rti-gov.vercel.app/search?q={search_term_string}', 'query-input': 'required name=search_term_string' },
  };
  return <PageShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="instant-hero">
      <div className="instant-hero-copy">
        <span className="home-kicker">Right to Information · Made simple</span>
        <h1>Ask for information.<br/><em>We&apos;ll handle the rest.</em></h1>
        <p>Describe what you want in ordinary words. RTI.gov turns it into a clear request, finds the likely public authority and shows your legal deadline.</p>
        <CitizenStart />
      </div>
      <aside className="instant-proof" aria-label="What happens after you start">
        <span className="proof-kicker">From question to proof</span>
        <div className="proof-time"><strong>90</strong><span>seconds<br/>to register</span></div>
        <ol>
          <li><i>1</i><div><b>Say what you need</b><small>No legal language</small></div></li>
          <li><i>2</i><div><b>Confirm the right office</b><small>Central, State or local</small></div></li>
          <li><i>3</i><div><b>Review and submit</b><small>₹10 Central fee · BPL exempt</small></div></li>
          <li className="proof-result"><i>✓</i><div><b>Get your RTI number</b><small>Deadline shown immediately</small></div></li>
        </ol>
        <div className="proof-law"><span>30 days</span><p>Usual response period under the RTI Act</p></div>
      </aside>
    </section>

    <section className="invisible-service">
      <div className="invisible-intro"><span className="page-eyebrow">The service does the government work</span><h2>You ask once. The system stays accountable.</h2><p>No department maze, legal drafting or deadline arithmetic. Those belong behind the screen.</p></div>
      <div className="invisible-grid"><article><span>01</span><b>Right office, first time</b><p>Your subject and location determine the likely Central, State or local authority before payment.</p></article><article><span>02</span><b>One visible clock</b><p>Your receipt shows the due date immediately and keeps every transfer on the same timeline.</p></article><article><span>03</span><b>The next step appears</b><p>Track, pay an additional fee, download a reply or appeal—only when that action is relevant.</p></article></div>
    </section>

    <section className="quiet-actions"><div><span className="page-eyebrow">Before filing</span><h2>The answer may already be public.</h2><p>Search proactive disclosures, circulars, reports, contracts and open data first.</p><Link href="/search">Search published records →</Link></div><div><span className="page-eyebrow">Already filed</span><h2>See who has it and when it is due.</h2><p>Open the secure request trail with your registration number.</p><Link href="/status">Track my request →</Link></div></section>

    <section className="one-right"><span>RTI Act, 2005</span><blockquote>Information is not a favour. It is a citizen&apos;s right.</blockquote><p>Ask in English, Hindi or the official language of your area. You never have to explain why you want the information.</p><Link href="/learn">Know your right →</Link></section>
  </PageShell>;
}
