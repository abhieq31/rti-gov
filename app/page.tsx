import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RTI Online redesign prototype',
    url: 'https://rti-gov.vercel.app',
    description: 'An independent redesign prototype for citizen-facing Right to Information services in India.',
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="portal-home">
        <section className="portal-hero">
          <div className="portal-hero-copy">
            <span className="portal-kicker">Right to Information Online</span>
            <h1>File, track and appeal your RTI request from one familiar place.</h1>
            <p>
              This redesign keeps the service model simple and recognisable: submit a request, view its status,
              access your history, or file a first appeal. The interface is cleaner, faster and easier to use on mobile.
            </p>
            <div className="portal-hero-actions">
              <Link className="portal-button" href="/request">Submit Request</Link>
              <Link className="portal-button-secondary" href="/status">View Status</Link>
            </div>
            <div className="portal-inline-links">
              <Link href="/appeal">Submit First Appeal</Link>
              <Link href="/history">View Request History</Link>
              <Link href="/guide">Read citizen guidance</Link>
            </div>
          </div>

          <aside className="portal-notice" aria-labelledby="portal-notice-title">
            <h2 id="portal-notice-title">Important before you file</h2>
            <ul>
              <li>Use RTI to request information or records held by a public authority.</li>
              <li>You do not need to give a reason for seeking information.</li>
              <li>Central RTI applications ordinarily carry a ₹10 application fee; eligible BPL applicants are exempt.</li>
              <li>This prototype does not submit a real RTI application or collect a real payment.</li>
            </ul>
          </aside>
        </section>

        <section className="portal-services" aria-labelledby="portal-services-title">
          <div className="portal-section-head">
            <h2 id="portal-services-title">Citizen services</h2>
            <p>Keep the actions where citizens expect them. Improve the experience around those actions, not the vocabulary.</p>
          </div>
          <div className="portal-service-grid">
            <Link href="/request">
              <span>01</span>
              <b>Submit Request</b>
              <p>Prepare and submit a new RTI request through a guided form.</p>
              <i>Start →</i>
            </Link>
            <Link href="/appeal">
              <span>02</span>
              <b>Submit First Appeal</b>
              <p>Use the appeal route when a response is delayed, denied or incomplete.</p>
              <i>Open appeal →</i>
            </Link>
            <Link href="/status">
              <span>03</span>
              <b>View Status</b>
              <p>Check the current stage, authority, deadline and available next action.</p>
              <i>Track request →</i>
            </Link>
            <Link href="/history">
              <span>04</span>
              <b>View History</b>
              <p>See previous requests, acknowledgements, replies and appeals in one place.</p>
              <i>Open history →</i>
            </Link>
          </div>
        </section>

        <section className="portal-guidance">
          <div className="portal-guidance-copy">
            <span className="portal-kicker">Before submitting</span>
            <h2>Three checks prevent most avoidable RTI problems.</h2>
            <p>
              A modern interface should remove friction without hiding the rules that matter. These checks stay visible before payment or registration.
            </p>
          </div>
          <div className="portal-guidance-list">
            <article>
              <span>1</span>
              <div><b>Ask for records, not explanations</b><p>Describe the document, file, report, order, inspection, note or data you want.</p></div>
            </article>
            <article>
              <span>2</span>
              <div><b>Choose the authority that holds the information</b><p>The filing flow helps identify the likely Central, State or local public authority.</p></div>
            </article>
            <article>
              <span>3</span>
              <div><b>Keep your registration number</b><p>Use it to view status, preserve the record trail and file an appeal when necessary.</p></div>
            </article>
          </div>
        </section>

        <section className="portal-support">
          <div>
            <b>Need help before filing?</b>
            <span>Use the guide, FAQ or public-authority finder before starting a request.</span>
          </div>
          <nav aria-label="Help links">
            <Link href="/guide">Citizen Guide</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/authorities">Public Authorities</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </section>
      </div>
    </PageShell>
  );
}
