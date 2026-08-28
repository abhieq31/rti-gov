'use client';

import Link from 'next/link';
import { useId, useState, type ReactNode } from 'react';
import { glossary, type GlossaryId } from './portal-data';

export function Term({ id, children }: { id: GlossaryId; children: ReactNode }) {
  const term = glossary[id];
  const tooltipId = useId();
  const [pinned, setPinned] = useState(false);
  return (
    <span className={pinned ? 'glossary-term is-open' : 'glossary-term'}>
      <span
        aria-describedby={tooltipId}
        className="glossary-word"
        onBlur={() => setPinned(false)}
        onClick={() => setPinned((current) => !current)}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setPinned((current) => !current); } }}
        role="button"
        tabIndex={0}
      >
        {children}
      </span>
      <span className="glossary-tip" id={tooltipId} role="tooltip">
        <strong>{term.title}</strong>
        <span>{term.text}</span>
      </span>
    </span>
  );
}

const learnPanels = [
  {
    title: 'Look before you file',
    body: (
      <>
        <p>Many records are already public. Search <Term id="proactive">proactive disclosures</Term>, circulars and reports before you pay a fee.</p>
        <p>If the record is not published, an RTI request can ask a <Term id="public-authority">public authority</Term> for the existing file — not for a new explanation or a grievance to be fixed.</p>
        <Link href="/search">Search published records →</Link>
      </>
    ),
  },
  {
    title: 'Identify the right authority',
    body: (
      <>
        <p>Each Central ministry and department answers only for the records it holds. A request sent to the wrong office may be <Term id="transfer">transferred</Term>, delayed or returned.</p>
        <p>Do not file here for State Governments, including NCT Delhi. Use the authority list to check before you pay.</p>
        <Link href="/authorities">Check public authorities →</Link>
      </>
    ),
  },
  {
    title: 'What happens next',
    body: (
      <>
        <p>The <Term id="nodal">Nodal Officer</Term> sends your application to the concerned <Term id="cpio">CPIO</Term>, who searches, applies any <Term id="exemption">exemption</Term> and replies. The usual time is 30 days, or 48 hours for <Term id="life-liberty">life or liberty</Term>.</p>
        <p>If there is no reply, or the reply is incomplete, file a <Term id="first-appeal">first appeal</Term>. A later second appeal goes to the <Term id="cic">Central Information Commission</Term>.</p>
        <Link href="/process">See the full process →</Link>
      </>
    ),
  },
] as const;

export function LearnColumns() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="learn-columns">
      {learnPanels.map((panel, index) => {
        const expanded = open === index;
        const panelId = `learn-panel-${index}`;
        return (
          <article className={expanded ? 'learn-column is-open' : 'learn-column'} key={panel.title} onMouseEnter={() => setOpen(index)}>
            <button aria-controls={panelId} aria-expanded={expanded} onClick={() => setOpen(expanded ? null : index)} type="button">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{panel.title}</strong>
              <i aria-hidden="true">{expanded ? '−' : '+'}</i>
            </button>
            <div hidden={!expanded} id={panelId}>{panel.body}</div>
          </article>
        );
      })}
    </div>
  );
}

export function GlossaryDrawer() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const terms = Object.entries(glossary).filter(([, term]) => `${term.title} ${term.text}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <section className="glossary-drawer">
      <button aria-expanded={open} className="glossary-toggle" onClick={() => setOpen((current) => !current)} type="button">
        <span>Glossary</span>
        <small>{open ? 'Hide terms' : 'Hover any dotted word, or open the full list'}</small>
        <i aria-hidden="true">{open ? '−' : '+'}</i>
      </button>
      {open && (
        <div className="glossary-panel">
          <label>
            <span className="sr-only">Filter glossary terms</span>
            <input onChange={(event) => setQuery(event.target.value)} placeholder="Filter terms" value={query} />
          </label>
          <dl>
            {terms.map(([id, term]) => (
              <div key={id}>
                <dt>{term.title}</dt>
                <dd>{term.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
