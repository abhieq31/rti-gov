'use client';

import { useMemo, useState } from 'react';
import directory from '@/data/central-authorities.json';

type AuthorityRecord = { id: string; parentId: string | null; level: number; name: string };

export function OfficialAuthorityDirectory() {
  const [query, setQuery] = useState('');
  const records = directory.authorities as AuthorityRecord[];
  const parentNames = useMemo(() => new Map(records.map((record) => [record.id, record.name])), [records]);
  const matches = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return records.filter((record) => record.level === 0).slice(0, 24);
    return records.filter((record) => terms.every((term) => `${record.name} ${parentNames.get(record.parentId || '') || ''}`.toLowerCase().includes(term))).slice(0, 40);
  }, [parentNames, query, records]);

  return <section className="official-directory" aria-labelledby="official-directory-title">
    <div className="official-directory-head"><div><span className="page-eyebrow">Current Central directory</span><h2 id="official-directory-title">Search the real RTI Online authority registry.</h2><p>{directory.count.toLocaleString('en-IN')} hierarchy records captured from the official portal on 22 August 2026. The official page labels its current authority total as 2,916.</p></div><a href={directory.source} target="_blank" rel="noreferrer">Verify official source ↗</a></div>
    <label className="directory-search"><span>Ministry, department, office, PSU or institution</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Railway Board, AIIMS, EPFO or CAG" /></label>
    <div className="directory-results" aria-live="polite"><div className="results-summary"><b>{matches.length}{query ? ' matches shown' : ' top-level bodies'}</b><span>Search narrows across parent and child offices</span></div>{matches.map((record) => <article key={`${record.id}-${record.parentId || 'root'}`}><div><small>{record.parentId ? parentNames.get(record.parentId) || 'Central public authority' : 'Central public authority'}</small><b>{record.name}</b></div><a href={`/request?authorityName=${encodeURIComponent(record.name)}`}>File with this authority →</a></article>)}</div>
    {query && !matches.length && <div className="empty-result"><b>No authority matched every word.</b><p>Use fewer words or search by the service or organisation name.</p></div>}
  </section>;
}
