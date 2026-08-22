import type { Metadata } from 'next';
import { PageHero, PageShell } from '@/components/site-chrome';
import { glossary } from '@/components/official-data';

export const metadata: Metadata = { title: 'RTI glossary in plain language | RTI.gov', description: 'Understand CPIO, SPIO, Section 4, transfer, first appeal, Information Commissions, BPL and RTI exemptions.' };

export default function GlossaryPage(){return <PageShell><PageHero eyebrow="Plain-language glossary" title="Government words, translated into human words." intro="You should not need to learn administrative shorthand to exercise a constitutional democratic right."/><section className="glossary-list">{glossary.map(([term,meaning],index)=><article key={term}><span>{String(index+1).padStart(2,'0')}</span><div><h2>{term}</h2><p>{meaning}</p></div></article>)}</section></PageShell>}
