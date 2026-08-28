import type { Metadata } from 'next';
import Link from 'next/link';
import { DesignComparison, ServiceParity } from '@/components/design-comparison';
import { PageShell } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Current vs proposed RTI Online redesign',
  description: 'Drag to compare the current RTI Online service with a citizen-first redesign concept and review functional parity.',
};

const changes = [
  ['Starts with navigation', 'Starts with the citizen’s need'],
  ['Choose an authority first', 'Describe the record; confirm the route'],
  ['Separate forms and lookups', 'One case from request through appeal'],
  ['Status as a result page', 'Owner, events, deadline and next action'],
] as const;

export default function ComparePage() {
  return <PageShell>
    <section className="compare-hero">
      <span className="page-eyebrow">The redesign case</span>
      <h1>Same right.<br/><em>A radically clearer service.</em></h1>
      <p>A beautiful portal is not the goal. A citizen reaching the right authority, preserving proof and knowing the next move is the goal. Drag the line to see the shift.</p>
    </section>
    <section className="comparison-showcase" aria-label="Interactive design comparison"><DesignComparison/></section>
    <section className="change-ledger" aria-labelledby="change-title"><div><span className="page-eyebrow">What changed</span><h2 id="change-title">This is a service redesign, not a reskin.</h2></div><div>{changes.map(([oldText, newText]) => <article key={oldText}><span>{oldText}</span><i aria-hidden="true">→</i><b>{newText}</b></article>)}</div></section>
    <ServiceParity/>
    <section className="compare-close"><span>Ready to experience it?</span><h2>Judge the proposal by the journey.</h2><p>Start with a plain-language information need and finish with a synthetic registration number, authority and deadline.</p><Link href="/request">Try the complete request flow <span aria-hidden="true">→</span></Link></section>
  </PageShell>;
}
