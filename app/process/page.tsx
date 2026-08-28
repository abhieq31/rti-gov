import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, PageShell } from '@/components/site-chrome';

export const metadata: Metadata = { title: 'How an RTI request moves | RTI.gov', description: 'Understand registration, routing, response, fees and appeals in one clear timeline.' };

const steps = [
  ['Day 0', 'Request registered', 'You receive a registration number, filing date and usual statutory due date.'],
  ['Routing', 'Nodal officer checks ownership', 'The request goes to the CPIO who controls the record; an aligned transfer should happen promptly.'],
  ['By day 30', 'CPIO responds', 'You receive the record, a lawful exemption, a transfer or a notice for additional fees.'],
  ['If needed', 'First appeal', 'Challenge delay, denial, an incomplete reply or an unreasonable fee without starting the case again.'],
] as const;

export default function ProcessPage(){return <PageShell><PageHero eyebrow="The complete process" title="A visible chain of responsibility." intro="A request should never disappear into a portal. Every hand-off, deadline and remedy belongs to the same case." actions={<Link className="button-primary" href="/request">Start a mock request</Link>}/><section className="guide-steps">{steps.map(([time,title,copy])=><article key={title}><span>{time}</span><div><h2>{title}</h2><p>{copy}</p></div></article>)}</section></PageShell>}
