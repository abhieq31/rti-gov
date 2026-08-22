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
    <section className="instant-hero gov-hero">
      <div className="instant-hero-copy">
        <span className="home-kicker">National Right to Information Portal</span>
        <h1>Your right to know.<br/><em>One clear public service.</em></h1>
        <p>Ask for an existing government record in ordinary words. The service finds the likely public authority, registers the request and keeps every officer, transfer and deadline visible.</p>
        <CitizenStart />
      </div>
      <aside className="instant-proof" aria-label="What happens after you start">
        <span className="proof-kicker">Citizen service standard</span>
        <div className="proof-time"><strong>90</strong><span>seconds<br/>to register</span></div>
        <ol>
          <li><i>1</i><div><b>Say what you need</b><small>No legal language</small></div></li>
          <li><i>2</i><div><b>Confirm jurisdiction</b><small>Central, State or local</small></div></li>
          <li><i>3</i><div><b>Review and submit</b><small>₹10 Central fee · BPL exempt</small></div></li>
          <li className="proof-result"><i>✓</i><div><b>Get your RTI number</b><small>Deadline shown immediately</small></div></li>
        </ol>
        <div className="proof-law"><span>Track every step</span><p>Nodal Officer → CPIO → reply → appeal</p></div>
      </aside>
    </section>

    <section className="service-directory" aria-label="Primary RTI services"><Link href="/request"><span>01</span><div><b>File an RTI request</b><small>Create, pay and receive acknowledgement</small></div><i>→</i></Link><Link href="/status"><span>02</span><div><b>Track request or appeal</b><small>See officer, transfer, clock and reply</small></div><i>→</i></Link><Link href="/appeal"><span>03</span><div><b>File first appeal</b><small>Use the original registration number</small></div><i>→</i></Link><Link href="/process"><span>04</span><div><b>How the system works</b><small>Citizen and department views</small></div><i>→</i></Link></section>

    <section className="invisible-service">
      <div className="invisible-intro"><span className="page-eyebrow">The administrative chain, made visible</span><h2>The citizen should never lose the case inside government.</h2><p>Registration is only the start. The redesigned service exposes Nodal Officer routing, CPIO ownership, record collection, fee notices, transfers and appeal eligibility.</p></div>
      <div className="invisible-grid"><article><span>01</span><b>Nodal Officer routing</b><p>Every online request first reaches the selected Ministry or Department&apos;s Nodal Officer for triage.</p></article><article><span>02</span><b>Named CPIO ownership</b><p>The case shows the responsible public information officer and every linked split or transfer.</p></article><article><span>03</span><b>One statutory record</b><p>Deadlines, additional fees, supporting documents, replies and appeals remain attached to the same parent case.</p></article></div><Link className="process-link" href="/process">See the complete operating model →</Link>
    </section>

    <section className="quiet-actions"><div><span className="page-eyebrow">Before filing</span><h2>The answer may already be public.</h2><p>Search proactive disclosures, circulars, reports, contracts and open data first.</p><Link href="/search">Search published records →</Link></div><div><span className="page-eyebrow">Already filed</span><h2>See who has it and when it is due.</h2><p>Open the secure request trail with your registration number.</p><Link href="/status">Track my request →</Link></div></section>

    <section className="national-hub"><div className="hub-heading"><span className="page-eyebrow">Information and oversight</span><h2>Everything required to exercise the right.</h2><p>Authoritative law and guidance, public-authority discovery, proactive disclosures and independent appeal routes.</p></div><div className="hub-grid"><Link href="/resources"><span>01</span><b>Official RTI library</b><p>Acts, Rules, guides, circulars, reports and learning resources.</p><i>Open library →</i></Link><Link href="/authorities"><span>02</span><b>Find the record holder</b><p>Choose the public authority, then reach the correct CPIO path.</p><i>Find authority →</i></Link><Link href="/commissions"><span>03</span><b>Information Commissions</b><p>Central and State oversight, appeals and complaint routes.</p><i>View directory →</i></Link><Link href="/policies"><span>04</span><b>Trust and accessibility</b><p>GIGW readiness, privacy, security and content governance.</p><i>Review policies →</i></Link></div></section>

    <section className="one-right"><span>RTI Act, 2005</span><blockquote>Information is not a favour. It is a citizen&apos;s right.</blockquote><p>Ask in English, Hindi or the official language of your area. You never have to explain why you want the information.</p><Link href="/learn">Know your right →</Link></section>
  </PageShell>;
}
