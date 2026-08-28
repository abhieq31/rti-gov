import Link from 'next/link';
import { GlossaryDrawer, LearnColumns, Term } from '@/components/civic-browse';
import { PageShell } from '@/components/site-chrome';

const needExamples = [
  'Road repair estimate near my home',
  'Inspection report for my railway station',
  'Status and file noting of my pension case',
] as const;

const DEMO_NEED = '/request?need=Inspection%20report%20for%20my%20railway%20station';

const pathSteps = [
  { n: '01', title: 'Your sentence', text: 'Start with the record you want. The form never asks for an authority name first.' },
  { n: '02', title: 'The right office', text: 'The prototype recommends a Central public authority from the words you used.' },
  { n: '03', title: '₹10 or BPL', text: 'Pay once, or attach a BPL certificate. First appeals stay free.' },
  { n: '04', title: 'Number + clock', text: 'You leave with a registration number and the statutory due date on the same screen.' },
] as const;

const clocks = [
  { time: '30 days', title: 'Reply', text: 'Usual time for the CPIO to send the record, an exemption, a fee notice or a transfer.' },
  { time: '5 days', title: 'Transfer', text: 'If another Central authority holds the file, the request should move within five days.' },
  { time: '45 days', title: 'First appeal', text: 'No fee. The First Appellate Authority should decide after delay, denial or an incomplete reply.' },
  { time: '90 days', title: 'Second appeal', text: 'Central cases go to the CIC. That filing sits outside this portal.' },
] as const;

const contrasts = [
  { official: 'Ministry and public-authority names first', ours: 'The information the citizen already has in mind' },
  { official: '2,916-row HTML dump of authorities', ours: 'Search, with Central versus State routing' },
  { official: 'Lifecycle flowchart image 404s', ours: 'Readable 30 / 5 / 45 / 90-day clocks' },
] as const;

const moreServices = [
  ['View status', '/status'],
  ['First appeal', '/appeal'],
  ['View history', '/history'],
  ['Payment help', '/payments'],
  ['Public authorities', '/authorities'],
  ['User manual', '/guide'],
  ['Why this redesign', '/compare'],
] as const;

export default function HomePage() {
  return <PageShell>
    <section className="civic-hero civic-hero-split">
      <div className="civic-hero-photo" aria-hidden="true" />
      <div className="civic-hero-copy">
        <span className="india-kicker">Right to Information Act, 2005</span>
        <h1>Ask for a record the public authority already holds. Leave with a number and a due date.</h1>
        <p>This independent prototype helps you decide whether an RTI request is the right step, find the correct Central <Term id="public-authority">public authority</Term>, and file when you are ready.</p>
        <div className="civic-demo">
          <p>Working prototype · nothing is sent to a government system</p>
          <Link className="india-primary-button" href={DEMO_NEED}>File a demo request in one minute <span>→</span></Link>
          <small>Opens Railway Board with Aarav’s details. Track with <code>RTI/MORLY/2026/804271</code> · code <code>RTI26</code></small>
        </div>
      </div>
      <aside aria-label="Demonstration acknowledgement" className="civic-ack">
        <div className="civic-ack-head">
          <span>Prototype acknowledgement</span>
          <b>RTI/MORLY/2026/804271</b>
        </div>
        <p>Inspection report for Anand Vihar railway station</p>
        <dl>
          <div><dt>Authority</dt><dd>Railway Board</dd></div>
          <div><dt>Fee</dt><dd>₹10 · UPI</dd></div>
          <div><dt>Filed</dt><dd>22 August 2026</dd></div>
          <div><dt>Due</dt><dd>21 September 2026</dd></div>
        </dl>
        <div className="civic-ack-stamp" aria-hidden="true"><b>30</b><small>days</small></div>
        <Link className="civic-ack-track" href="/status?registration=RTI%2FMORLY%2F2026%2F804271&email=aarav.demo%40example.in">Track this demonstration →</Link>
        <small>Synthetic demonstration · not a valid RTI filing</small>
      </aside>
      <div className="civic-start">
        <h2>Start with the record you want</h2>
        <form className="citizen-start" action="/request">
          <label htmlFor="home-need">What information do you want?</label>
          <textarea id="home-need" name="need" minLength={12} placeholder="For example: Give me the inspection reports for the road repaired outside my home last year." required rows={3} />
          <div className="citizen-start-actions">
            <span><i aria-hidden="true">✓</i> No reason. No Aadhaar. Plain language is enough.</span>
            <button>Start my request <b>→</b></button>
          </div>
          <div className="example-prompts">
            <span>Try an example</span>
            {needExamples.map((example) => (
              <Link href={`/request?need=${encodeURIComponent(example)}`} key={example}>{example}</Link>
            ))}
          </div>
        </form>
      </div>
    </section>

    <section aria-labelledby="path-heading" className="civic-path">
      <div className="civic-path-copy">
        <span className="india-kicker">The one-minute path</span>
        <h2 id="path-heading">Three decisions. Then a number and a due date.</h2>
        <p>Guidelines, the recommended office, ₹10, then a registration number and the statutory due date on the same screen.</p>
      </div>
      <ol>
        {pathSteps.map((step) => (
          <li key={step.n}>
            <small>{step.n}</small>
            <b>{step.title}</b>
            <span>{step.text}</span>
          </li>
        ))}
      </ol>
    </section>

    <section aria-labelledby="clock-heading" className="civic-clocks">
      <div>
        <span className="india-kicker">Statutory clocks</span>
        <h2 id="clock-heading">The Act already wrote the calendar. The portal should show it.</h2>
        <p>These match the official RTI Online homepage diagram. Life-or-liberty requests are due in 48 hours.</p>
        <Link href="/process">See the full process →</Link>
      </div>
      <aside className="clock-urgent" role="note">
        <b>48 hours</b>
        <div>
          <strong>Life or liberty</strong>
          <p>A genuine emergency is due in two days, not thirty. Tick that only when a person’s life or liberty is at stake.</p>
        </div>
      </aside>
      <div className="clock-row civic-clock-grid">
        {clocks.map((item) => (
          <Link href="/process" key={item.title}>
            <article>
              <b>{item.time}</b>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>

    <section aria-labelledby="why-heading" className="civic-why">
      <div>
        <span className="india-kicker">Why this redesign</span>
        <h2 id="why-heading">The live portal is a transaction system. Citizens arrive with a sentence.</h2>
        <p>Captured 28 August 2026 from rtionline.gov.in. This is not a clone. It keeps the official service names and replaces the failure points.</p>
        <Link href="/compare">Open the full comparison →</Link>
      </div>
      <ul>
        {contrasts.map((row) => (
          <li key={row.ours}>
            <div>
              <span>Official today</span>
              <b>{row.official}</b>
            </div>
            <div>
              <span>This prototype</span>
              <strong>{row.ours}</strong>
            </div>
          </li>
        ))}
      </ul>
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
