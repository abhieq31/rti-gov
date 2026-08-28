import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';

const essentials = [
  { value: '₹10', label: 'application fee', note: 'No fee for eligible BPL applicants' },
  { value: '30', label: 'days to reply', note: 'The usual statutory response period' },
  { value: '24×7', label: 'online access', note: 'File, track and appeal from one place' },
] as const;

const services = [
  { number: '01', title: 'File a request', copy: 'Ask a Central Government public authority for an existing record.', href: '/request', action: 'Start request' },
  { number: '02', title: 'Track a request', copy: 'See the current owner, timeline and next action for your application.', href: '/status', action: 'Check status' },
  { number: '03', title: 'File a first appeal', copy: 'Challenge a delay, denial, incomplete reply or unreasonable fee.', href: '/appeal', action: 'Start appeal' },
] as const;

export default function HomePage() {
  return (
    <PageShell>
      <section className="new-home-hero">
        <div className="new-home-hero-copy">
          <span className="new-kicker">Right to Information · India</span>
          <h1>Information is your right.<br/><em>Getting it should be simple.</em></h1>
          <p>Ask the Central Government for the records you need. We’ll guide you to the right authority, help shape the request and keep every deadline visible.</p>
          <form className="new-request-box" action="/request">
            <label htmlFor="home-need">What information are you looking for?</label>
            <div>
              <input id="home-need" name="need" placeholder="e.g. inspection report for a railway station" />
              <button type="submit">Start request <span aria-hidden="true">→</span></button>
            </div>
          </form>
          <div className="new-hero-links">
            <Link href="/authorities">Find a public authority</Link>
            <Link href="/learn">What can I ask for?</Link>
          </div>
        </div>
        <aside className="new-home-card" aria-label="How the service works">
          <span>One clear path</span>
          <ol>
            <li><i>1</i><div><b>Describe the record</b><small>Use ordinary language. No legal wording needed.</small></div></li>
            <li><i>2</i><div><b>Confirm the authority</b><small>Know exactly who will receive your request.</small></div></li>
            <li><i>3</i><div><b>Save your proof</b><small>Get a registration number and response date.</small></div></li>
          </ol>
          <p><span aria-hidden="true">✓</span> Your reason for asking is never required.</p>
        </aside>
      </section>

      <section className="new-jurisdiction" aria-labelledby="jurisdiction-heading">
        <span className="new-jurisdiction-icon" aria-hidden="true">i</span>
        <div>
          <span>Check before you pay</span>
          <h2 id="jurisdiction-heading">This service is for Central Government authorities only.</h2>
          <p>State Governments—including the Government of NCT Delhi—use separate RTI services. A request sent to the wrong portal may be returned without a refund.</p>
        </div>
        <Link href="/authorities">Check the authority <span aria-hidden="true">→</span></Link>
      </section>

      <section className="new-facts" aria-label="RTI essentials">
        {essentials.map((item) => <article key={item.label}><strong>{item.value}</strong><div><b>{item.label}</b><p>{item.note}</p></div></article>)}
      </section>

      <section className="new-services" aria-labelledby="services-heading">
        <div className="new-section-heading">
          <span className="new-kicker">The essentials</span>
          <h2 id="services-heading">One service. Three things to do.</h2>
          <p>Everything else is guidance.</p>
        </div>
        <div className="new-service-grid">
          {services.map((item) => <Link key={item.href} href={item.href}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p><b>{item.action} <i aria-hidden="true">→</i></b></Link>)}
        </div>
      </section>

      <section className="new-process" aria-labelledby="process-heading">
        <div>
          <span className="new-kicker">Designed around the citizen</span>
          <h2 id="process-heading">Your case should never disappear into a portal.</h2>
        </div>
        <div className="new-process-copy">
          <p>From filing to final reply, the service keeps one continuous record: who owns the request, what happened, when the reply is due and whether you can appeal.</p>
          <Link href="/process">See how an RTI request moves <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="new-help" aria-label="Help and supporting services">
        <div><span>Already filed?</span><h2>Pick up exactly where you left off.</h2><p>Sign in to see requests, replies, payments and appeals together.</p><Link href="/login">Open my RTI account →</Link></div>
        <nav aria-label="Supporting services">
          <Link href="/search"><span>Search public records first</span><i>→</i></Link>
          <Link href="/payments"><span>Resolve a payment issue</span><i>→</i></Link>
          <Link href="/faq"><span>Read common questions</span><i>→</i></Link>
          <Link href="/contact"><span>Get help</span><i>→</i></Link>
        </nav>
      </section>
    </PageShell>
  );
}
