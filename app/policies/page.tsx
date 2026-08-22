import type { Metadata } from 'next';
import { PageHero, PageShell } from '@/components/site-chrome';

export const metadata: Metadata = { title: 'Website policies and GIGW readiness | RTI.gov', description: 'Draft government website policies, accessibility commitments, security boundaries and content governance for the RTI.gov prototype.' };

const policies = [
  ['Accessibility', 'The service targets WCAG 2.1 Level AA and GIGW 3.0: semantic structure, keyboard access, visible focus, contrast controls, responsive forms and assistive-technology compatibility. Formal STQC evaluation is required before an official launch.'],
  ['Privacy', 'A production service should collect only data necessary to identify the citizen and deliver the reply. Aadhaar, PAN and banking data do not belong in an ordinary RTI application. Status access must be protected because applications may contain personal information.'],
  ['Content ownership', 'For official adoption, RTI policy content would be owned and reviewed by the Department of Personnel & Training. Each public authority remains responsible for its officer directory, disclosures and case records.'],
  ['Content review', 'Legal and procedural pages require a named content owner, review date, next review date and an archival process. Broken links and stale officer records must create operational alerts.'],
  ['Hyperlinking', 'External government links identify the owning authority and open separately. RTI.gov explains a process but never silently replaces the source of record.'],
  ['Security', 'Government deployment requires CERT-In/STQC-aligned security audit, safe-to-host certification, encryption, role-based access, immutable audit events, retention rules and tested incident response.'],
] as const;

export default function PoliciesPage(){return <PageShell><PageHero eyebrow="Governance before launch" title="A trusted service needs policies, owners and proof." intro="A polished interface is not government-ready until accessibility, privacy, content review, security and institutional accountability are explicit."/><section className="policy-list">{policies.map(([title,copy],index)=><article key={title}><span>{String(index+1).padStart(2,'0')}</span><div><h2>{title}</h2><p>{copy}</p></div></article>)}</section><section className="certification-note"><b>Certification boundary</b><p>This independent prototype is designed toward GIGW 3.0 requirements. It is not GIGW-certified, STQC-certified or authorised as a Government of India service.</p><a href="https://guidelines.india.gov.in/" target="_blank" rel="noreferrer">Review GIGW 3.0 ↗</a></section></PageShell>}
