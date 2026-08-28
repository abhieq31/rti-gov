import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, PageShell } from '@/components/site-chrome';

export const metadata: Metadata = { title: 'Citizen manual: file, pay, track, appeal | RTI Online prototype', description: 'Front-end guide to submitting, paying, tracking and appealing a Central Government RTI application online.' };

const flows = [
  { title: 'Submit RTI request', href: '/request', steps: ['Read and accept portal guidelines', 'Select the Ministry, Department or Central public authority', 'Enter applicant contact and postal details', 'Choose BPL status and attach valid proof if applicable', 'Write up to 3,000 characters and attach an optional PDF up to 1 MB', 'Choose UPI, net banking, card or RuPay and make payment', 'Save the unique registration number sent by email and SMS'] },
  { title: 'Submit first appeal', href: '/appeal', steps: ['Read and accept the appeal guidelines', 'Enter the original online request registration number', 'Verify the applicant email and security code', 'Select the ground for appeal', 'Enter appeal text and attach an optional PDF', 'Submit without a fee and save the appeal number'] },
  { title: 'View status and reply', href: '/status', steps: ['Enter registration number, applicant email and security code', 'Verify the OTP sent to email and mobile', 'View current owner, movement history and reply', 'Pay an additional information fee when requested', 'Upload a replacement supporting PDF when requested', 'Open each child number if the request was split across CPIOs'] },
  { title: 'View three-year history', href: '/history', steps: ['Enter the filing email, optional mobile number and security code', 'Verify the OTP', 'Review registered, pending and disposed requests', 'Review registered, pending and disposed first appeals', 'Open an individual case through View Status'] },
  { title: 'Reconcile a payment', href: '/payments', steps: ['Do not submit or pay again', 'Enter the payment transaction ID and applicant email', 'Check whether the bank scroll generated a registration number', 'Allow 24–48 working hours for final reconciliation', 'Contact the help desk with transaction details only if no number arrives'] },
] as const;

export default function GuidePage(){return <PageShell><PageHero eyebrow="Citizen user manual" title="Every RTI Online service, screen by screen" intro="Use this guide to complete the same front-end journeys available on the Central Government RTI Online portal." actions={<Link className="button-primary" href="/request">Submit RTI request</Link>}/><section className="manual-flows">{flows.map((flow, index)=><article key={flow.title}><div className="manual-flow-head"><span>{String(index+1).padStart(2,'0')}</span><h2>{flow.title}</h2><Link href={flow.href}>Open service →</Link></div><ol>{flow.steps.map((step, stepIndex)=><li key={step}><i>{stepIndex+1}</i><span>{step}</span></li>)}</ol></article>)}</section></PageShell>}
