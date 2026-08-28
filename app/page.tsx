import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';

const services = [
  ['Submit Request', '/request', 'File an RTI application with a Central public authority. Fee ₹10, unless BPL.'],
  ['Submit First Appeal', '/appeal', 'Appeal delay, denial or an incomplete reply. No fee.'],
  ['View Status', '/status', 'See the case, due date, extra fees and replies.'],
  ['View History', '/history', 'Requests and appeals filed with the same email, kept for three years.'],
  ['Payment Reconciliation', '/payments', 'Use this if money was debited but no registration number arrived.'],
  ['Login', '/login', 'Optional. You can file without an account.'],
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
        <header className="portal-home-lead">
          <span className="india-kicker">RTI Online</span>
          <h1>File RTI applications and first appeals online for Central Government public authorities.</h1>
          <p>Indian citizens only. Payment by UPI, net banking, debit/credit or RuPay. Read the guidelines before you submit.</p>
        </header>

        <ul className="service-options">
          {services.map(([label, href, text]) => (
            <li key={href}>
              <Link href={href}>
                <b>{label}</b>
                <span>{text}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="portal-also">
          {also.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </p>

        <p className="civic-note" role="note">
          <b>Do not file here for State Governments, including NCT Delhi.</b> Those applications would be returned without refund.
        </p>

        <ol className="home-clocks">
          {clocks.map(([time, title]) => (
            <li key={title}>
              <b>{time}</b>
              <span>{title}</span>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
