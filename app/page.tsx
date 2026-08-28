import Link from 'next/link';
import { GlossaryDrawer, LearnColumns, Term } from '@/components/civic-browse';
import { PageShell } from '@/components/site-chrome';

const startCards = [
  { href: '/request?need=Inspection%20report%20for%20my%20railway%20station', title: 'Submit a request', text: 'File with a Central public authority when the record is not already online. Demo data is pre-filled.' },
  { href: '/search', title: 'See if the record is already public', text: 'Search disclosures, circulars and reports before you file a request.' },
  { href: '/learn', title: 'Learn about the RTI process', text: 'What you can ask for, what you cannot, and how long a reply should take.' },
] as const;

const moreServices = [
  ['View status', '/status'],
  ['First appeal', '/appeal'],
  ['View history', '/history'],
  ['Payment help', '/payments'],
  ['Public authorities', '/authorities'],
  ['User manual', '/guide'],
] as const;

export default function HomePage() {
  return <PageShell>
    <section className="civic-hero">
      <div className="civic-hero-copy">
        <span className="india-kicker">Right to Information Act, 2005</span>
        <h1>The Act exists so that an informed citizen can see the records a public authority already holds.</h1>
        <p>This site helps you decide whether an RTI request is the right step, find the correct Central <Term id="public-authority">public authority</Term>, and file when you are ready.</p>
        <div className="civic-demo">
          <p>Working prototype. Nothing is sent to a government system.</p>
          <Link className="india-primary-button" href="/request?need=Inspection%20report%20for%20my%20railway%20station">File a demo request in one minute <span>→</span></Link>
          <small>Then track it with <code>RTI/MORLY/2026/804271</code> · OTP <code>240805</code></small>
        </div>
      </div>
      <div className="civic-start">
        <h2>Start here</h2>
        <div className="civic-start-cards">
          {startCards.map((card, index) => (
            <Link href={card.href} key={card.href}>
              <small>{String(index + 1).padStart(2, '0')}</small>
              <b>{card.title}</b>
              <span>{card.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="civic-learn" aria-labelledby="learn-heading">
      <h2 id="learn-heading">Do a little research first. Then file only if you still need the record.</h2>
      <p className="civic-learn-lead">Hover a panel to read it. Dotted words open a short definition.</p>
      <LearnColumns />
    </section>

    <section className="civic-note" role="note">
      <p><b>Central Government only.</b> Do not file RTI applications here for State public authorities, including the Government of NCT Delhi. Those applications may be returned without refund.</p>
      <Link href="/authorities">Check the authority →</Link>
    </section>

    <section className="civic-more" aria-labelledby="more-heading">
      <div>
        <h2 id="more-heading">Other services</h2>
        <p>Track a case, file a <Term id="first-appeal">first appeal</Term>, or reconcile a payment. No account is required to file.</p>
      </div>
      <ul>
        {moreServices.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
      </ul>
    </section>

    <GlossaryDrawer />
  </PageShell>;
}
