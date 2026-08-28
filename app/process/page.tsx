import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, PageShell } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'How an RTI request moves | RTI Online',
  description: 'The official citizen clocks: 30 days to reply, 5 days to transfer, 45 days for a first appeal, 90 days for a second appeal to the CIC.',
};

const branches = [
  {
    time: '30 days',
    title: 'Reply',
    copy: 'The CPIO sends the record, a lawful exemption, extra-fee notice or a transfer. If you are satisfied, the case ends.',
  },
  {
    time: '5 days',
    title: 'Transfer',
    copy: 'If another Central authority holds the record, the request should move within five days. That office then has its own 30-day clock.',
  },
  {
    time: '30 days',
    title: 'No reply',
    copy: 'Silence is a ground for first appeal. If there is also no applicable time limit, a Section 18 complaint may go to the CIC.',
  },
] as const;

const later = [
  { time: '30 days', title: 'First appeal', copy: 'No fee. Challenge delay, denial, an incomplete reply or an unreasonable extra fee with the First Appellate Authority.' },
  { time: '45 days', title: 'Appeal decision', copy: 'The First Appellate Authority should decide. No decision, or a decision you reject, opens the next remedy.' },
  { time: '90 days', title: 'Second appeal to CIC / SIC', copy: 'Central cases go to the Central Information Commission. State authorities use the State Information Commission. That filing is outside this portal.' },
] as const;

export default function ProcessPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="How the service works"
        title="From registration number to reply, appeal and CIC."
        intro="These clocks match the official RTI Online homepage diagram: 30 days for a usual reply, 5 days for a Central transfer, 45 days for a first-appeal decision, and 90 days for a second appeal."
        actions={<Link className="button-primary" href="/request?need=Inspection%20report%20for%20my%20railway%20station">Submit a demo request</Link>}
      />
      <section className="clock-board" aria-label="Statutory clocks after an RTI request">
        <article className="clock-origin">
          <span>Day 0</span>
          <h2>RTI request registered</h2>
          <p>You receive a registration number, filing date and the usual statutory due date. Life-or-liberty requests are due in 48 hours.</p>
        </article>
        <div className="clock-row">
          {branches.map((item) => (
            <article key={item.title}>
              <b>{item.time}</b>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <div className="clock-row later">
          {later.map((item) => (
            <article key={item.title}>
              <b>{item.time}</b>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <p className="clock-note">Not satisfied after a reply, or after a first-appeal decision, continues down this path. A Section 18 complaint to the CIC is a separate remedy when there is no applicable time limit.</p>
      </section>
    </PageShell>
  );
}
