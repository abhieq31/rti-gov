import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';
import { CitizenStart } from '@/components/workflows';
import { DesignComparison } from '@/components/design-comparison';

const directActions = [
  { n: '01', title: 'Search first', text: 'Check whether the record is already public.', href: '/search' },
  { n: '02', title: 'Track a request', text: 'See who owns it and when the reply is due.', href: '/status' },
  { n: '03', title: 'File an appeal', text: 'Continue an eligible case without starting over.', href: '/appeal' },
] as const;

export default function HomePage() {
  return (
    <PageShell>
      <section className="instant-hero">
        <div className="instant-hero-copy">
          <span className="page-eyebrow">Right to Information · India</span>
          <h1>Ask for the record.<br/><em>We’ll handle the route.</em></h1>
          <p>Describe the information in your own words. This prototype finds the likely public authority, shapes the request and shows the legal deadline.</p>
          <CitizenStart />
        </div>
        <aside className="instant-proof" aria-label="What the service produces">
          <span className="proof-kicker">One guided application</span>
          <div className="proof-time"><strong>3</strong><span>clear<br/>decisions</span></div>
          <ol>
            <li><i>1</i><div><b>Describe the record</b><small>No department name required</small></div></li>
            <li><i>2</i><div><b>Confirm the route</b><small>Central, State or local</small></div></li>
            <li className="proof-result"><i>✓</i><div><b>Leave with proof</b><small>Registration number and due date</small></div></li>
          </ol>
          <div className="proof-law"><span>₹10</span><p>Usual Central application fee. Eligible BPL applicants are exempt.</p></div>
        </aside>
      </section>

      <section className="rti-jurisdiction" aria-labelledby="jurisdiction-title">
        <div className="rti-jurisdiction-mark" aria-hidden="true">!</div>
        <div><span>Before you file</span><h2 id="jurisdiction-title">The filing route depends on who holds the record.</h2><p>Central, State and local authorities use different systems. This prototype identifies that before payment.</p></div>
        <Link href="/authorities">Check an authority <span aria-hidden="true">→</span></Link>
      </section>

      <section className="home-comparison" aria-labelledby="home-compare-title">
        <div className="home-comparison-head"><div><span className="page-eyebrow">Current portal → proposed service</span><h2 id="home-compare-title">Don’t promise the upgrade.<br/>Let them feel it.</h2></div><p>Drag across the interface. The new design keeps the official service map, then reorganises it around the citizen’s actual journey.</p></div>
        <DesignComparison />
        <Link className="home-comparison-link" href="/compare">See the complete redesign case and functional parity <span aria-hidden="true">→</span></Link>
      </section>

      <section className="invisible-service" aria-labelledby="service-title">
        <div className="invisible-intro">
          <span className="page-eyebrow">Everything else should disappear</span>
          <h2 id="service-title">A public service should feel obvious.</h2>
          <p>No legal scavenger hunt. No fake certainty. Every screen answers one question and gives one clear next action.</p>
        </div>
        <div className="invisible-grid">
          {directActions.map((item) => <article key={item.href}><span>{item.n}</span><b>{item.title}</b><p>{item.text}</p><Link className="rti-text-link" href={item.href}>Open <span aria-hidden="true">→</span></Link></article>)}
        </div>
      </section>

      <section className="quiet-actions" aria-label="RTI guidance">
        <div><span className="page-eyebrow">Not sure RTI is right?</span><h2>Start with the outcome you need.</h2><p>RTI retrieves existing records. It does not force an office to fix a service complaint.</p><Link href="/learn">Understand RTI in plain language →</Link></div>
        <div><span className="page-eyebrow">Already know the department?</span><h2>Go straight to the record holder.</h2><p>Search a focused demonstration directory of Central, State and local authorities.</p><Link href="/authorities">Find the authority →</Link></div>
      </section>

      <section className="one-right">
        <span>The essential promise</span>
        <blockquote>One request. One owner. One visible deadline.</blockquote>
        <p>This is an independent prototype. It creates synthetic receipts on this device and never sends data to a government system.</p>
        <Link href="/request">Start a mock request →</Link>
      </section>
    </PageShell>
  );
}
