import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';

const actions = [
  ['Submit RTI Request', 'File a new request to a Central public authority.', '/request', 'primary'],
  ['Submit First Appeal', 'Continue from an existing RTI registration.', '/appeal', ''],
  ['View Status', 'See authority, stage, due date and next action.', '/status', ''],
  ['View History', 'Open requests, replies and appeals together.', '/history', ''],
  ['Payment Reconciliation', 'Check a payment before trying again.', '/payments', ''],
] as const;

const journey = [
  ['1', 'Understand RTI', 'Check whether you need records or grievance action.', '/learn'],
  ['2', 'Search information', 'The answer may already be published.', '/search'],
  ['3', 'Find the authority', 'Identify the office most likely to hold the record.', '/authorities'],
  ['4', 'Start your request', 'Ask precisely and keep your registration number.', '/request'],
] as const;

export default function HomePage() {
  return <PageShell><div className="portal-home">
    <section className="home-intro" aria-labelledby="home-title"><div><span className="portal-kicker">Right to Information Online</span><h1 id="home-title">Access Central Government information.</h1><p>Submit, track and appeal an RTI request through a clearer, guided citizen service.</p></div><aside><b>Before you file</b><p>Ask for an existing record—such as a document, report, file noting, order or dataset. You do not need to explain why you want it.</p><Link href="/guide">Check if RTI is the right route →</Link></aside></section>

    <section className="portal-scope-alert" aria-labelledby="scope-title"><span aria-hidden="true">!</span><div><strong id="scope-title">Central Government authorities only</strong><p>Do not file here for State Governments, including the Government of NCT Delhi. An application sent to the wrong jurisdiction may be returned.</p></div><Link href="/authorities">Find the correct authority</Link></section>

    <section className="home-actions" aria-labelledby="actions-title"><div className="compact-heading"><div><span className="portal-kicker">Citizen services</span><h2 id="actions-title">What do you need to do?</h2></div><Link href="/login">Sign in to My RTI →</Link></div><div className="home-action-grid">{actions.map(([title, text, href, emphasis], index) => <Link href={href} className={emphasis ? 'featured' : ''} key={href}><span>{String(index + 1).padStart(2, '0')}</span><div><b>{title}</b><p>{text}</p></div><i aria-hidden="true">→</i></Link>)}</div></section>

    <section className="home-journey" aria-labelledby="journey-title"><div className="compact-heading"><div><span className="portal-kicker">Start your RTI journey</span><h2 id="journey-title">Find the answer with the fewest steps.</h2></div><p>Understand → Search → Find → File</p></div><ol>{journey.map(([number, title, text, href]) => <li key={href}><span>{number}</span><div><b>{title}</b><p>{text}</p><Link href={href}>Continue →</Link></div></li>)}</ol></section>

    <section className="rti-facts" aria-labelledby="facts-title"><div><span className="portal-kicker">Essential RTI facts</span><h2 id="facts-title">Know the fee, clock and next step.</h2></div><dl><div><dt>No reason needed</dt><dd>Ask for information without explaining why you need it.</dd></div><div><dt>₹10 or ₹0</dt><dd>Central application fee; eligible BPL applicants are exempt with proof.</dd></div><div><dt>30 days / 48 hours</dt><dd>Usual response period; 48 hours where life or liberty is involved.</dd></div><div><dt>After submission</dt><dd>Track receipt, transfers, additional fees and the authority&apos;s reply.</dd></div><div><dt>First appeal</dt><dd>Relevant when a reply is late, denied, incomplete or the fee is disputed.</dd></div></dl></section>

    <section className="portal-help-band"><div><span aria-hidden="true">?</span><div><b>RTI Online help desk</b><p>Get help using this prototype service. Do not share passwords, OTPs, Aadhaar, PAN or bank details.</p></div></div><nav aria-label="Help links"><Link href="/guide">Citizen Guide</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact Us</Link></nav></section>
  </div></PageShell>;
}
