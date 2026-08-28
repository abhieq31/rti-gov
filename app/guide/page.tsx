import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Citizen manual: file, pay, track, appeal | RTI Online prototype',
  description: 'Front-end guide to submitting, paying, tracking and appealing a Central Government RTI application online.',
};

const flows = [
  {
    title: 'Submit RTI request',
    href: '/request?need=Inspection%20report%20for%20my%20railway%20station',
    steps: [
      'Accept the guidelines',
      'Review the recommended public authority and applicant',
      'Confirm and pay ₹10, or attach BPL proof',
      'Save the registration number and the statutory due date',
    ],
  },
  {
    title: 'Submit first appeal',
    href: '/appeal',
    steps: [
      'Accept the appeal guidelines',
      'Review the original request, ground and ₹0 fee',
      'Confirm. Continue stays blocked until you do',
      'Save the appeal number and the 45-day FAA clock',
    ],
  },
  {
    title: 'View status',
    href: '/status',
    steps: [
      'The known demonstration opens without an extra mailbox code',
      'Read the number, due date and days left together',
      'File a first appeal at ₹0 if there is silence or an incomplete reply',
    ],
  },
  {
    title: 'View history',
    href: '/history',
    steps: [
      'Aarav’s demonstration history opens on this device',
      'Each row shows how many days remain',
      'Open a case to see status, reply or appeal options',
    ],
  },
  {
    title: 'Reconcile a payment',
    href: '/payments',
    steps: [
      'Do not pay again',
      'Check transaction RTIDEMO240822118 against the applicant email',
      'If a number was issued, open that case',
    ],
  },
] as const;

export default function GuidePage() {
  return (
    <PageShell>
      <section className="file-strip">
        <span>Citizen user manual</span>
        <p>The same walk as the one-minute demonstration: guidelines, Railway Board, ₹10, number and due date, then a free first appeal.</p>
      </section>
      <section className="manual-flows">
        {flows.map((flow, index) => (
          <article key={flow.title}>
            <div className="manual-flow-head">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{flow.title}</h2>
              <Link href={flow.href}>Open →</Link>
            </div>
            <ol>
              {flow.steps.map((step, stepIndex) => (
                <li key={step}><i>{stepIndex + 1}</i><span>{step}</span></li>
              ))}
            </ol>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
