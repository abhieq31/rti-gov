import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';

const DEMO_NEED = '/request?need=Inspection%20report%20for%20my%20railway%20station';

export default function HomePage() {
  return (
    <PageShell>
      <section className="civic-hero civic-hero-split">
        <div className="civic-hero-photo" aria-hidden="true" />
        <div className="civic-hero-copy">
          <span className="india-kicker">Right to Information Act, 2005</span>
          <h1>Ask for a record. Leave with a number and a due date.</h1>
          <p>An independent prototype for Central public authorities. Nothing is sent to a government system.</p>
          <div className="civic-demo">
            <Link className="india-primary-button" href={DEMO_NEED}>File a demo request <span>→</span></Link>
            <small>Starts with a railway inspection request. You fill the form. Code <code>RTI26</code></small>
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
            <div><dt>Fee</dt><dd>₹10</dd></div>
            <div><dt>Due</dt><dd>21 September 2026</dd></div>
            <div><dt>Clock</dt><dd>30 days</dd></div>
          </dl>
          <Link className="civic-ack-track" href="/status?registration=RTI%2FMORLY%2F2026%2F804271&email=aarav.demo%40example.in">Track this case →</Link>
        </aside>
      </section>
      <p className="civic-note" role="note">
        <b>Central Government only.</b> State authorities, including NCT Delhi, cannot be filed here.
        <Link href="/authorities">Check the authority</Link>
      </p>
    </PageShell>
  );
}
