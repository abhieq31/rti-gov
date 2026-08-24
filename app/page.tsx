import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';

const serviceLinks = [
  { label: 'Track a request', detail: 'See the officer, due date and every transfer', href: '/status', icon: '⌁' },
  { label: 'Submit first appeal', detail: 'Continue from an eligible RTI request', href: '/appeal', icon: '↗' },
  { label: 'Find an authority', detail: 'Identify who is most likely to hold the record', href: '/authorities', icon: '◎' },
  { label: 'Payment help', detail: 'Check a payment before trying again', href: '/payments', icon: '₹' },
] as const;

const journey = [
  { n: '01', title: 'Understand', text: 'Use RTI to ask for an existing record—not to ask an office to solve a grievance.', href: '/learn' },
  { n: '02', title: 'Search', text: 'The answer may already be published in a report, order, budget or disclosure.', href: '/search' },
  { n: '03', title: 'Find', text: 'Choose the Central public authority most likely to hold the information.', href: '/authorities' },
  { n: '04', title: 'File', text: 'Describe the record precisely, pay the fee if applicable, and save the receipt.', href: '/request' },
] as const;

export default function HomePage() {
  return (
    <PageShell>
      <div className="rti-home">
        <section className="rti-hero">
          <div className="rti-hero-copy">
            <span className="rti-overline">Right to Information Act, 2005</span>
            <h1>Information is<br/><em>your right.</em></h1>
            <p>Request records from a Central Government public authority, follow the statutory timeline, and appeal when the response is delayed or incomplete.</p>
            <div className="rti-hero-actions">
              <Link className="rti-action rti-action-primary" href="/request">File an RTI request <span aria-hidden="true">→</span></Link>
              <Link className="rti-action rti-action-light" href="/status">Track my request</Link>
            </div>
            <ul className="rti-fact-row" aria-label="Key RTI facts">
              <li><strong>₹10</strong><span>Central application fee<br/>BPL applicants exempt</span></li>
              <li><strong>30 days</strong><span>Usual response period<br/>48 hours for life or liberty</span></li>
              <li><strong>No reason</strong><span>You do not have to explain<br/>why you want a record</span></li>
            </ul>
          </div>
          <aside className="rti-case-card" aria-label="Example RTI request progress">
            <div className="rti-case-top"><span>How a request moves</span><b>One request. A visible chain of responsibility.</b></div>
            <ol className="rti-timeline">
              <li className="done"><i>✓</i><div><b>Request registered</b><small>Receipt and statutory due date issued</small></div><span>Day 0</span></li>
              <li className="active"><i>2</i><div><b>Nodal officer routes it</b><small>Ownership checked inside the Ministry</small></div><span>Current</span></li>
              <li><i>3</i><div><b>Concerned CPIO responds</b><small>Reply, lawful transfer or fee notice</small></div><span>By day 30</span></li>
              <li><i>4</i><div><b>First appeal, if needed</b><small>The original case details carry forward</small></div><span>No Central fee</span></li>
            </ol>
            <Link href="/process">Explore the complete process <span aria-hidden="true">→</span></Link>
          </aside>
        </section>

        <section className="rti-jurisdiction" aria-labelledby="jurisdiction-title">
          <div className="rti-jurisdiction-mark" aria-hidden="true">!</div>
          <div><span>Before you file</span><h2 id="jurisdiction-title">This service is for Central Government public authorities.</h2><p>For a State Government, municipal body, State police, or local authority, use that State’s RTI portal. Filing in the wrong system can delay or return your application.</p></div>
          <Link href="/authorities">Check the right authority <span aria-hidden="true">→</span></Link>
        </section>

        <section className="rti-service-section" aria-labelledby="services-title">
          <div className="rti-section-heading"><div><span>Online services</span><h2 id="services-title">What would you like to do?</h2></div><Link href="/history">View request history →</Link></div>
          <div className="rti-service-layout">
            <Link className="rti-feature-card" href="/request"><span className="rti-card-number">01</span><div><small>Start a new application</small><h3>File an RTI request</h3><p>Ask for an identifiable record from a Central public authority. The guided form helps you describe the information and select the likely record holder.</p></div><i aria-hidden="true">→</i></Link>
            <div className="rti-service-grid">
              {serviceLinks.map((service) => <Link href={service.href} key={service.href}><i aria-hidden="true">{service.icon}</i><div><h3>{service.label}</h3><p>{service.detail}</p></div><span aria-hidden="true">→</span></Link>)}
            </div>
          </div>
        </section>

        <section className="rti-journey" aria-labelledby="journey-title">
          <div className="rti-journey-intro"><span>A better request begins before the form</span><h2 id="journey-title">Four steps to the right record.</h2><p>Research first, route carefully, then write the narrowest request that can produce the information you need.</p></div>
          <ol>{journey.map((step) => <li key={step.n}><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p><Link href={step.href}>Start here <span aria-hidden="true">↗</span></Link></li>)}</ol>
        </section>

        <section className="rti-essentials" aria-labelledby="essentials-title">
          <div className="rti-essentials-copy"><span>Know before you submit</span><h2 id="essentials-title">A precise request gets a more precise answer.</h2><p>Ask for records that already exist: orders, file notings, inspection reports, contracts, correspondence, statistics, or certified copies. RTI does not require an office to create an explanation or settle a grievance.</p><Link className="rti-text-link" href="/guide">Read the filing guide →</Link></div>
          <div className="rti-essential-list">
            <article><span>01</span><div><h3>Name the record</h3><p>Include the subject, office, place, project, and a useful date range.</p></div></article>
            <article><span>02</span><div><h3>Keep it focused</h3><p>One clear subject is easier to route, search, copy, and answer.</p></div></article>
            <article><span>03</span><div><h3>Protect your identity</h3><p>Never put Aadhaar, PAN, OTP, password, or banking details in the request text.</p></div></article>
          </div>
        </section>

        <section className="rti-help" aria-label="RTI help desk">
          <div className="rti-help-symbol" aria-hidden="true">?</div><div><span>RTI Online help desk</span><h2>Unsure where to begin?</h2><p>Support hours: Monday–Friday, 9:00 AM–5:30 PM, except public holidays.</p></div>
          <dl><div><dt>Call</dt><dd>011-24010690 / 691</dd></div><div><dt>Email</dt><dd>helprtionline-dopt[at]nic[dot]in</dd></div></dl><Link href="/contact">Get help <span aria-hidden="true">→</span></Link>
        </section>
      </div>
    </PageShell>
  );
}
