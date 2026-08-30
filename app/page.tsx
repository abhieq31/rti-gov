import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';
import { CitizenStart } from '@/components/workflows';

const nextActions = [
  ['01', 'Track a request', '/status', 'Status, reply and days remaining.'],
  ['02', 'File a first appeal', '/appeal', 'Delay, denial or an incomplete reply. ₹0.'],
  ['03', 'Fix a payment', '/payments', 'Money debited but no registration number.'],
] as const;

const also = [
  ['Public Authorities', '/authorities'],
  ['User Manual', '/guide'],
  ['FAQ', '/faq'],
  ['Contact Us', '/contact'],
] as const;

const clocks = [
  ['30 days', 'Reply'],
  ['5 days', 'Transfer'],
  ['45 days', 'First appeal'],
  ['90 days', 'Second appeal to CIC'],
] as const;

export default function HomePage() {
  return (
    <PageShell>
      <section className="portal-home">
        <section className="portal-home-hero">
          <div className="portal-home-message">
            <span className="india-kicker">Right to Information · Central Government</span>
            <h1>Ask for the record.<br/><em>Leave with a due date.</em></h1>
            <p>Describe the information you want in plain language. We help identify the public authority and carry the request through payment to registration.</p>
            <ul className="home-trust" aria-label="Filing essentials">
              <li><b>₹10</b><span>application fee</span></li>
              <li><b>30 days</b><span>usual reply</span></li>
              <li><b>₹0</b><span>first appeal</span></li>
            </ul>
          </div>
          <div className="portal-start-card">
            <span>Start a Central RTI request</span>
            <h2>What record do you need?</h2>
            <CitizenStart />
            <small>Prototype filing · nothing is sent or charged</small>
          </div>
        </section>

        <p className="home-jurisdiction" role="note">
          <span aria-hidden="true">!</span>
          <b>Central Government only.</b>
          <span>For State Governments, including NCT Delhi, find the correct portal before paying.</span>
          <Link href="/authorities">Check jurisdiction →</Link>
        </p>

        <section className="home-next">
          <div className="home-section-title"><span>Already filed?</span><h2>Continue your case.</h2></div>
          <div className="home-next-grid">
            {nextActions.map(([number, label, href, text]) => (
              <Link href={href} key={href}>
                <small>{number}</small><b>{label}</b><span>{text}</span><i aria-hidden="true">→</i>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-deadlines">
          <div className="home-section-title"><span>The statutory clock</span><h2>Time should never be hidden.</h2></div>
          <ol className="home-clocks">
            {clocks.map(([time, title]) => <li key={title}><b>{time}</b><span>{title}</span></li>)}
          </ol>
        </section>

        <nav className="portal-also" aria-label="Information and help">
          {also.map(([label, href]) => <Link href={href} key={href}>{label}<span aria-hidden="true">↗</span></Link>)}
        </nav>
      </section>
    </PageShell>
  );
}
