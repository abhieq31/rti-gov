import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Citizen manual: file, pay, track, appeal | RTI Online prototype',
  description: 'Front-end guide to submitting, paying, tracking and appealing a Central Government RTI application online.',
};

const flows = [
  {
    title: 'Submit Request',
    href: '/request',
    steps: [
      'Accept the guidelines',
      'Type the record you want',
      'Use the suggested public authority if it is right',
      'Type applicant details, BPL and security code RTI26',
      'Pay ₹10, then save the number and due date',
    ],
  },
  {
    title: 'Submit First Appeal',
    href: '/appeal',
    steps: [
      'Accept the appeal guidelines',
      'Review the original request, ground and ₹0 fee',
      'Confirm. Continue stays blocked until you do',
      'Save the appeal number and the 45-day FAA clock',
    ],
  },
  {
    title: 'View Status',
    href: '/status',
    steps: [
      'Enter registration number, email and security code RTI26',
      'Read the number, due date and days left together',
      'File a first appeal at ₹0 if there is silence or an incomplete reply',
    ],
  },
  {
    title: 'View History',
    href: '/history',
    steps: [
      'Enter the filing email and security code RTI26',
      'Each row shows how many days remain',
      'Open a case to see status, reply or appeal options',
    ],
  },
  {
    title: 'Payment Reconciliation',
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
        <span>User Manual</span>
        <p>Guidelines, the record, the public authority, applicant details, RTI26, then the number and due date. First appeal has no fee.</p>
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
