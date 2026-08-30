'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { authorities, centralAuthorities, centralMinistries, demoRequests, disclosures, faqs } from './portal-data';

const DEMO_EMAIL = 'aarav.demo@example.in';
const DEMO_DUE = '21 September 2026';
const DEMO_SECURITY = 'RTI26';
const DEMO_PAYMENT_ID = 'RTIDEMO240822118';
const DEMO_REQUEST_ID = 'RTI/MORLY/2026/804271';
const DEMO_APPEAL_ID = 'RTI/MORLY/A/2026/804271';
const demoAppeal: StatusRecord = {
  id: DEMO_APPEAL_ID,
  subject: 'First appeal: Inspection report for Anand Vihar railway station',
  authority: 'Railway Board',
  status: 'Appeal registered',
  due: '12 Oct 2026',
  filed: '28 Aug 2026',
  kind: 'Appeal',
  email: DEMO_EMAIL,
};

function readStored<T>(key: string): T | null {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  } catch {
    return null;
  }
}

function storeValue(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The prototype must remain usable when browser storage is unavailable.
  }
}

function removeStored(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Nothing to remove when browser storage is unavailable.
  }
}

const monthIndex: Record<string, number> = {
  jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3,
  may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7, sep: 8, sept: 8, september: 8,
  oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11,
};

function parseDue(value: string): number {
  const cleaned = value.replace(/^Closed\s+/i, '').trim();
  const match = cleaned.match(/^(\d{1,2})\s+([A-Za-z]+)\.?\,?\s+(\d{4})$/);
  if (match) {
    const month = monthIndex[match[2].toLowerCase()];
    if (month != null) return new Date(Number(match[3]), month, Number(match[1])).setHours(0, 0, 0, 0);
  }
  const native = Date.parse(cleaned);
  return Number.isNaN(native) ? Number.NaN : native;
}

export function CitizenStart() {
  const [need, setNeed] = useState('');
  const [attempted, setAttempted] = useState(false);
  const examples = [
    'Road repair estimate near my home',
    'Inspection report for my railway station',
    'Status and file noting of my pension case',
  ];
  return (
    <form className="citizen-start" action="/request" onSubmit={(event) => { if (need.trim().length < 12) { event.preventDefault(); setAttempted(true); } }}>
      <label htmlFor="citizen-need">What information do you want?</label>
      <textarea
        aria-describedby={attempted ? 'citizen-need-error' : undefined}
        aria-invalid={attempted && need.trim().length < 12}
        id="citizen-need"
        name="need"
        value={need}
        onChange={(event) => { setNeed(event.target.value); if (event.target.value.trim().length >= 12) setAttempted(false); }}
        placeholder="For example: Give me the inspection reports for the road repaired outside my home last year."
        rows={3}
      />
      {attempted && need.trim().length < 12 && <p className="citizen-start-error" id="citizen-need-error" role="alert">Describe the record in at least 12 characters.</p>}
      <div className="citizen-start-actions">
        <span><i aria-hidden="true">✓</i> No reason. No Aadhaar. Plain language is enough.</span>
        <button type="submit">Start my request <b>→</b></button>
      </div>
      <div className="example-prompts"><span>Try an example</span>{examples.map((example) => <button key={example} type="button" onClick={() => { setNeed(example); setAttempted(false); }}>{example}</button>)}</div>
    </form>
  );
}

export function SearchRecords() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [openRecord, setOpenRecord] = useState<string | null>(null);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return disclosures;
    const terms = q.split(/\s+/).filter(Boolean);
    return disclosures.filter((item) => {
      const searchable = `${item.title} ${item.authority} ${item.type} ${item.topic}`.toLowerCase();
      return terms.every((term) => searchable.includes(term));
    });
  }, [query]);
  return (
    <div className="tool-surface">
      <form className="search-tool" onSubmit={(event) => { event.preventDefault(); setSearched(true); }}>
        <label htmlFor="records-query">What information are you looking for?</label>
        <div><span aria-hidden="true">⌕</span><input id="records-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “railway safety inspection report”" /><button type="submit">Search records</button></div>
        <small>Searches synthetic proactive disclosures and authority topics in this prototype.</small>
      </form>
      <div className="quick-queries"><span>Try:</span>{['EPFO circulars', 'Highway tenders', 'RTI annual report'].map((item) => <button key={item} onClick={() => { setQuery(item); setSearched(true); }} type="button">{item}</button>)}</div>
      <div className="record-results" aria-live="polite">
        <div className="results-summary"><b>{searched || query ? results.length : disclosures.length} useful records</b><span>{searched || query ? 'Best matches' : 'Featured records'}</span></div>
        {(searched || query ? results : disclosures.slice(0, 3)).map((item) => (
          <article key={item.title}><span className="record-type">{item.type}</span><h2>{item.title}</h2><p>{item.authority}</p><small>Updated {item.date}</small><button aria-expanded={openRecord === item.title} onClick={() => setOpenRecord((current) => current === item.title ? null : item.title)} type="button">{openRecord === item.title ? 'Close record' : 'Open record'} <span>{openRecord === item.title ? '×' : '→'}</span></button>{openRecord === item.title && <div className="record-preview"><b>Prototype record preview</b><p>This synthetic catalogue entry demonstrates a published record. In a live service, the document, source URL, file format and accessibility details would appear here.</p><a href={`/request?need=${encodeURIComponent(`Provide the records related to ${item.title}`)}`}>Request related records →</a></div>}</article>
        ))}
        {(searched || query) && results.length === 0 && <div className="empty-result"><b>No published record matched that search.</b><p>That does not mean the record does not exist. Find the likely public authority and file a precise request.</p><a href="/authorities">Find the right authority →</a></div>}
      </div>
    </div>
  );
}

export function AuthorityFinder() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All');
  const matches = authorities.filter((item) => (level === 'All' || item.level === level) && `${item.name} ${item.ministry} ${item.topics}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="tool-surface">
      <div className="authority-tool-head">
        <label><span>Search public authorities available on this portal</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. Railway Board, EPFO, national highway" /></label>
        <div className="segment-control" aria-label="Authority level">{['All', 'Central', 'State', 'Local'].map((item) => <button aria-pressed={level === item} className={level === item ? 'active' : ''} key={item} onClick={() => setLevel(item)} type="button">{item}</button>)}</div>
      </div>
      <div className="authority-cards">{matches.map((item) => <article key={item.code}><div className="authority-code">{item.code}</div><div><span>{item.level} · {item.ministry}</span><h2>{item.name}</h2><p>{item.topics}</p></div><a href={item.level === 'Central' ? `/request?authority=${item.code}` : '/guide'}>{item.route} →</a></article>)}</div>
      {!matches.length && <div className="empty-result"><b>No matching public authority.</b><p>Search by ministry, department or the public service that holds the record. State and local authorities cannot be filed through this portal.</p></div>}
    </div>
  );
}

type RequestDraft = {
  ministry: string; authority: string; name: string; gender: '' | 'Male' | 'Female' | 'Third Gender';
  email: string; emailConfirm: string; mobile: string; phone: string; address: string; pin: string;
  country: 'India' | 'Other'; state: string; locality: '' | 'Rural' | 'Urban'; education: '' | 'Literate' | 'Illiterate';
  bpl: '' | 'yes' | 'no'; urgent: boolean; request: string; format: string; payment: string;
};
const initialDraft: RequestDraft = {
  ministry: '', authority: '', name: '', gender: '', email: '', emailConfirm: '', mobile: '', phone: '',
  address: '', pin: '', country: 'India', state: 'Delhi', locality: '', education: '', bpl: '', urgent: false,
  request: '', format: 'Electronic copy', payment: 'UPI',
};

function scrollStepIntoView(node: HTMLElement | null) {
  if (!node) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

function CopyNumber({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value);
          else {
            const input = document.createElement('textarea');
            input.value = value;
            input.style.position = 'fixed'; input.style.opacity = '0';
            document.body.appendChild(input); input.select(); document.execCommand('copy'); input.remove();
          }
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch { setCopied(false); }
      }}
    >
      {copied ? 'Copied' : 'Copy number'}
      <span className="sr-only" role="status">{copied ? `Copied ${value}` : ''}</span>
    </button>
  );
}

function PaperKeep({
  number, numberLabel, dueLabel, due, dueHint, clock, clockUnit,
}: {
  number: string; numberLabel: string; dueLabel: string; due: string; dueHint: string; clock: string; clockUnit: string;
}) {
  return (
    <div className="paper-keep">
      <div className="registration-card">
        <span>{numberLabel}</span>
        <b>{number}</b>
        <CopyNumber value={number} />
      </div>
      <div className="deadline-card">
        <div>
          <span>{dueLabel}</span>
          <strong>{due}</strong>
          <small>{dueHint}</small>
        </div>
        <div className="deadline-count"><b>{clock}</b><span>{clockUnit}</span></div>
      </div>
    </div>
  );
}

const regions = ['Andaman & Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Dadra & Nagar Haveli and Daman & Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu & Kashmir','Jharkhand','Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];

function findAuthority(code: string) {
  return authorities.find((item) => item.code === code);
}

function suggestAuthority(request: string) {
  const text = request.toLowerCase();
  if (/rail|station|train|platform/.test(text)) return findAuthority('MORLY');
  if (/epf|epfo|provident|pension/.test(text)) return findAuthority('EPFO');
  if (/national highway|nh-|nhai/.test(text)) return findAuthority('NHAI');
  if (/service rule|government employee|rti polic|dopt/.test(text)) return findAuthority('DOPT');
  if (/post office|speed post|postal/.test(text)) return findAuthority('DOP');
  if (/income tax|pan|cbdt/.test(text)) return findAuthority('CBDT');
  if (/hospital|health|vaccine/.test(text)) return findAuthority('MOHFW');
  if (/pmay|housing|urban/.test(text)) return findAuthority('MOHUA');
  return undefined;
}

function PortalGuidelines({ kind, accepted, onAccepted }: { kind: 'request' | 'appeal'; accepted: boolean; onAccepted: (value: boolean) => void }) {
  const appeal = kind === 'appeal';
  return <section className="portal-guidelines"><ol>
    <li><b>Central Government only.</b><span>Not for State authorities, including NCT Delhi.</span></li>
    <li><b>{appeal ? 'Original request.' : 'An existing record.'}</b><span>{appeal ? 'Use the request number and the email used to file.' : 'Write what you want. The office is recommended from those words.'}</span></li>
    <li><b>No identity documents.</b><span>Do not upload Aadhaar or PAN. A valid BPL certificate is the only exception.</span></li>
    <li><b>Length limits.</b><span>3,000 characters. One optional PDF, up to 1 MB.</span></li>
    <li><b>{appeal ? 'No first-appeal fee.' : 'Pay once.'}</b><span>{appeal ? 'A Central first appeal is free.' : '₹10 by UPI, net banking or card, unless BPL proof is attached.'}</span></li>
  </ol><label className="guidelines-check"><input checked={accepted} onChange={(event) => onAccepted(event.target.checked)} type="checkbox"/><span><b>I have read and understood the guidelines.</b><small>This remains a synthetic prototype; nothing is filed or charged.</small></span></label></section>;
}

export function RequestWorkflow({ initialAuthority = '', initialRequest = '' }: { initialAuthority?: string; initialRequest?: string }) {
  const seeded = findAuthority(initialAuthority);
  const [step, setStep] = useState(0);
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);
  const [draft, setDraft] = useState(() => ({
    ...initialDraft,
    request: initialRequest.slice(0, 3000),
    authority: seeded?.level === 'Central' ? seeded.code : '',
    ministry: seeded?.level === 'Central' ? seeded.ministry : '',
  }));
  const [authorityQuery, setAuthorityQuery] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [bplDocument, setBplDocument] = useState('');
  const [supportingDocument, setSupportingDocument] = useState('');
  const [fileError, setFileError] = useState('');
  const [fileVersion, setFileVersion] = useState(0);
  const [draftRestored, setDraftRestored] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [registration, setRegistration] = useState('');
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const didStep = useRef(false);
  const didRestoreDraft = useRef(Boolean(initialRequest || initialAuthority));
  const labels = ['Guidelines', 'Request form', 'Payment', 'Registered'];
  const update = <K extends keyof RequestDraft>(key: K, value: RequestDraft[K]) => {
    setConfirmed(false);
    setDraft((current) => {
      const next = { ...current, [key]: value };
      if (key === 'email') next.emailConfirm = String(value);
      return next;
    });
  };
  const selectedAuthority = findAuthority(draft.authority);
  const ministryAuthorities = centralAuthorities.filter((item) => item.ministry === draft.ministry);
  const suggestedAuthority = useMemo(() => suggestAuthority(draft.request), [draft.request]);
  const searchHits = useMemo(() => {
    const q = authorityQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return centralAuthorities.filter((item) => `${item.name} ${item.ministry} ${item.topics}`.toLowerCase().includes(q)).slice(0, 6);
  }, [authorityQuery]);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email);
  const pinValid = !draft.pin || /^\d{6}$/.test(draft.pin);
  const formComplete = Boolean(
    draft.ministry
    && selectedAuthority?.level === 'Central'
    && draft.name.trim().length >= 2
    && emailValid
    && draft.address.trim().length >= 8
    && draft.country === 'India'
    && pinValid
    && draft.bpl
    && (draft.bpl !== 'yes' || Boolean(bplDocument))
    && draft.request.trim().length >= 12
    && draft.request.length <= 3000
    && securityCode.trim().toUpperCase() === DEMO_SECURITY,
  );
  const canContinue = [guidelinesAccepted, formComplete, confirmed][step] ?? true;
  const bplExempt = draft.bpl === 'yes';
  const grievanceLikely = /fix|repair|complaint|not received|delay|pending|take action/.test(draft.request.toLowerCase());
  const missingItems = [
    !draft.request.trim() && 'Describe the record you want',
    draft.request.trim().length > 0 && draft.request.trim().length < 12 && 'Add more detail to the request',
    !draft.ministry && 'Select a ministry or department',
    !selectedAuthority && 'Select a public authority',
    draft.name.trim().length < 2 && 'Enter your name',
    !emailValid && 'Enter a valid email address',
    draft.address.trim().length < 8 && 'Enter your full address',
    !pinValid && 'Enter a 6-digit PIN code',
    !draft.bpl && 'Choose BPL status',
    draft.bpl === 'yes' && !bplDocument && 'Attach a valid BPL certificate',
    securityCode.trim().toUpperCase() !== DEMO_SECURITY && `Enter security code ${DEMO_SECURITY}`,
  ].filter(Boolean) as string[];

  const fillDemoRequest = () => {
    const authority = findAuthority('MORLY');
    setDraft({
      ...initialDraft,
      request: 'Provide copies of inspection reports for Anand Vihar railway station completed during 2025.',
      ministry: authority?.ministry || 'Ministry of Railways',
      authority: authority?.code || 'MORLY',
      name: 'Aarav Sharma', email: DEMO_EMAIL, emailConfirm: DEMO_EMAIL,
      mobile: '9876543210', address: '12 Janpath Road, New Delhi', pin: '110001', bpl: 'no',
    });
    setSecurityCode(DEMO_SECURITY); setConfirmed(false);
    setBplDocument(''); setSupportingDocument(''); setFileError('');
    setFileVersion((current) => current + 1); setDraftRestored(false);
  };
  const choosePdf = (file: File | undefined, kind: 'bpl' | 'supporting') => {
    setFileError('');
    if (!file) {
      if (kind === 'bpl') setBplDocument(''); else setSupportingDocument('');
      return;
    }
    if (file.type !== 'application/pdf' || file.size > 1_000_000) {
      setFileError('Choose a PDF no larger than 1 MB.');
      if (kind === 'bpl') setBplDocument(''); else setSupportingDocument('');
      return;
    }
    if (kind === 'bpl') setBplDocument(file.name); else setSupportingDocument(file.name);
  };

  useEffect(() => {
    if (!didRestoreDraft.current) return;
    if (step < 3) storeValue('rti-gov-demo-draft', draft);
  }, [draft, step]);

  useEffect(() => {
    if (initialRequest || initialAuthority) return;
    const timer = window.setTimeout(() => {
      const saved = readStored<RequestDraft>('rti-gov-demo-draft');
      didRestoreDraft.current = true;
      if (!saved?.request) return;
      setDraft({ ...initialDraft, ...saved });
      setDraftRestored(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialAuthority, initialRequest]);

  useEffect(() => {
    if (!didStep.current) {
      didStep.current = true;
      return;
    }
    const root = workflowRef.current;
    const target = root?.querySelector(step === 3 ? '.fast-receipt' : '.fast-body, .review-step') || root;
    scrollStepIntoView(target instanceof HTMLElement ? target : root);
  }, [step]);

  const dueDate = useMemo(() => {
    if (!submittedAt) return null;
    const due = new Date(submittedAt);
    due.setDate(due.getDate() + (draft.urgent ? 2 : 30));
    return due;
  }, [submittedAt, draft.urgent]);

  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  const submit = () => {
    if (!selectedAuthority) return;
    const now = new Date();
    const canonicalDemo = selectedAuthority.code === 'MORLY' && draft.email.trim().toLowerCase() === DEMO_EMAIL && draft.name.trim() === 'Aarav Sharma';
    const id = canonicalDemo ? DEMO_REQUEST_ID : `RTI-DEMO/${selectedAuthority.code}/${now.getFullYear()}/${String(now.getTime()).slice(-6)}`;
    const due = new Date(now); due.setDate(due.getDate() + (draft.urgent ? 2 : 30));
    const saved = {
      ...demoRequests[0],
      id,
      subject: draft.request.slice(0, 70),
      authority: selectedAuthority.name,
      email: draft.email,
      status: 'Registered',
      due: formatDate(due),
      filed: formatDate(now),
      paymentId: bplExempt ? 'BPL' : DEMO_PAYMENT_ID,
    };
    storeValue('rti-gov-demo-request', saved);
    removeStored('rti-gov-demo-draft');
    setRegistration(id); setSubmittedAt(now); setStep(3);
  };

  return (
    <div className="fast-workflow" ref={workflowRef}>
      <div className="fast-progress" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={Math.min(step + 1, 3)} aria-label={step < 3 ? `Step ${step + 1} of 3, ${labels[step]}` : 'Request registered'}><div style={{ width: `${((step + 1) / 4) * 100}%` }}/><span>{labels[step]}</span><b>{step < 3 ? `Step ${step + 1} of 3` : 'Complete'}</b></div>
      <div className="fast-body">
        {step === 0 && <PortalGuidelines kind="request" accepted={guidelinesAccepted} onAccepted={setGuidelinesAccepted}/>}
        {step === 1 && <section className="fast-step official-form">
          <span className="step-label">Online RTI request form</span>
          <h2>Start with the record you want.</h2>
          <p>Indian citizens only. Type the record, use the suggested office if it is right, then name, email, address, BPL and security code <b>{DEMO_SECURITY}</b>.</p>
          {draftRestored && <div className="draft-restored" role="status"><span>✓</span><div><b>Draft restored from this browser.</b><small>Review the details before continuing.</small></div><button onClick={() => { setDraft({ ...initialDraft }); setSecurityCode(''); removeStored('rti-gov-demo-draft'); setDraftRestored(false); }} type="button">Discard draft</button></div>}
          <div className="form-utility-actions">
            <button className="text-button" onClick={fillDemoRequest} type="button">Fill demonstration details</button>
            <button className="text-button" onClick={() => { setDraft({ ...initialDraft }); setSecurityCode(''); setBplDocument(''); setSupportingDocument(''); setFileError(''); setFileVersion((current) => current + 1); setDraftRestored(false); removeStored('rti-gov-demo-draft'); setConfirmed(false); }} type="button">Clear form</button>
          </div>

          <fieldset className="form-fieldset">
            <legend>The record you want</legend>
            <label className="fast-question"><span>Text for RTI request application *</span><textarea maxLength={3000} value={draft.request} onChange={(event) => update('request', event.target.value)} placeholder="Provide copies of the inspection reports for…"/><small>{draft.request.length} / 3,000 characters · only A–Z, 0–9 and , . - _ ( ) / @ : &amp; ? \ % in a live filing</small></label>
            {grievanceLikely && <div className="gentle-warning"><b>Need the problem fixed?</b><p>RTI obtains existing records. A grievance service is the route for asking an office to take action.</p><a href="/guide">Read the user manual</a></div>}
            {suggestedAuthority && draft.request.trim().length >= 12 && suggestedAuthority.code !== selectedAuthority?.code && <div className="authority-match authority-suggest"><div><span>Suggested from request text</span><b>{suggestedAuthority.name}</b><small>{suggestedAuthority.ministry}</small></div><button type="button" onClick={() => { setDraft((current) => ({ ...current, ministry: suggestedAuthority.ministry, authority: suggestedAuthority.code })); setConfirmed(false); }}>Use {suggestedAuthority.name}</button></div>}
          </fieldset>

          <fieldset className="form-fieldset">
            <legend>Public authority details</legend>
            <label className="wide"><span>Search public authority</span><input value={authorityQuery} onChange={(event) => setAuthorityQuery(event.target.value)} placeholder="Type a ministry, department or public authority"/></label>
            {searchHits.length > 0 && <div className="authority-picker">{searchHits.map((item) => <button className={draft.authority === item.code ? 'selected' : ''} key={item.code} onClick={() => { setDraft((current) => ({ ...current, ministry: item.ministry, authority: item.code })); setAuthorityQuery(''); setConfirmed(false); }} type="button"><b>{item.name}</b><small>{item.ministry}</small></button>)}</div>}
            <div className="fast-form">
              <label><span>Select ministry / department / apex body *</span><select value={draft.ministry} onChange={(event) => setDraft((current) => ({ ...current, ministry: event.target.value, authority: '' }))}><option value="">Select</option>{centralMinistries.map((ministry) => <option key={ministry}>{ministry}</option>)}</select></label>
              <label><span>Select public authority *</span><select value={draft.authority} disabled={!draft.ministry} onChange={(event) => update('authority', event.target.value)}><option value="">Select</option>{ministryAuthorities.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label>
            </div>
            {selectedAuthority && <div className="authority-match"><div><span>Request will be filed with</span><b>{selectedAuthority.name}</b><small>{selectedAuthority.ministry} · {selectedAuthority.topics}</small></div></div>}
          </fieldset>

          <fieldset className="form-fieldset">
            <legend>Personal details of RTI applicant</legend>
            <div className="fast-form">
              <label><span>Name *</span><input autoComplete="name" value={draft.name} onChange={(event) => update('name', event.target.value)}/></label>
              <label><span>Email ID *</span><input autoComplete="email" type="email" value={draft.email} onChange={(event) => update('email', event.target.value)}/></label>
              <label><span>Mobile number</span><input autoComplete="tel" inputMode="numeric" maxLength={10} value={draft.mobile} onChange={(event) => update('mobile', event.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile for SMS alerts"/></label>
              <label className="wide"><span>Gender</span><div className="choice-row" role="radiogroup">{(['Male', 'Female', 'Third Gender'] as const).map((item) => <label key={item}><input checked={draft.gender === item} name="gender" onChange={() => update('gender', item)} type="radio"/>{item}</label>)}</div></label>
              <label className="wide"><span>Address *</span><textarea autoComplete="street-address" value={draft.address} onChange={(event) => update('address', event.target.value)} placeholder="House, street, city"/></label>
              <label><span>PIN code</span><input inputMode="numeric" maxLength={6} value={draft.pin} onChange={(event) => update('pin', event.target.value.replace(/\D/g, ''))}/></label>
              <label><span>State</span><select value={draft.state} onChange={(event) => update('state', event.target.value)}>{regions.map((region) => <option key={region}>{region}</option>)}</select></label>
            </div>
            <details className="optional-details">
              <summary>Optional: locality, education and phone</summary>
              <div className="fast-form">
                <label><span>Status</span><select value={draft.locality} onChange={(event) => update('locality', event.target.value as RequestDraft['locality'])}><option value="">Select</option><option>Rural</option><option>Urban</option></select></label>
                <label><span>Educational status</span><select value={draft.education} onChange={(event) => update('education', event.target.value as RequestDraft['education'])}><option value="">Select</option><option>Literate</option><option>Illiterate</option></select></label>
                <label><span>Phone number</span><input inputMode="numeric" value={draft.phone} onChange={(event) => update('phone', event.target.value)}/></label>
              </div>
            </details>
          </fieldset>

          <fieldset className="form-fieldset">
            <legend>Request details</legend>
            <div className="fast-form">
              <label><span>Is the applicant Below Poverty Line? *</span><div className="choice-row" role="radiogroup">{(['no', 'yes'] as const).map((item) => <label key={item}><input checked={draft.bpl === item} name="bpl" onChange={() => update('bpl', item)} type="radio"/>{item === 'yes' ? 'Yes' : 'No'}</label>)}</div></label>
              <label><span>Send records as</span><select value={draft.format} onChange={(event) => update('format', event.target.value)}><option>Electronic copy</option><option>Certified paper copy</option><option>Inspection of records</option></select></label>
              <label className="urgent-toggle"><input checked={draft.urgent} onChange={(event) => update('urgent', event.target.checked)} type="checkbox"/><span><b>Life or liberty</b><small>Use only for a genuine 48-hour matter</small></span></label>
            </div>
            {bplExempt && <label className="supporting-upload"><span>BPL certificate *</span><input accept="application/pdf" key={`bpl-${fileVersion}`} onChange={(event) => choosePdf(event.target.files?.[0], 'bpl')} type="file"/><small>{bplDocument ? `Attached: ${bplDocument}` : 'Valid BPL proof · PDF up to 1 MB. Do not upload Aadhaar or PAN.'}</small></label>}
            <label className="supporting-upload"><span>Supporting document (optional)</span><input accept="application/pdf" key={`support-${fileVersion}`} onChange={(event) => choosePdf(event.target.files?.[0], 'supporting')} type="file"/><small>{supportingDocument ? `Attached: ${supportingDocument}` : 'One PDF up to 1 MB. PDF name should be under 12 characters, with no spaces. Do not upload Aadhaar or PAN.'}</small></label>
            {fileError && <p className="form-error" role="alert">{fileError}</p>}
            <label><span>Enter security code *</span><div className="captcha-row"><b aria-label="Demonstration security code">RTI26</b><input value={securityCode} onChange={(event) => setSecurityCode(event.target.value)} placeholder="Enter RTI26"/></div></label>
          </fieldset>
          <div className={missingItems.length ? 'completion-panel' : 'completion-panel complete'} aria-live="polite">
            <b>{missingItems.length ? `${missingItems.length} required items remaining` : 'Required details complete'}</b>
            {missingItems.length > 0 && <ul>{missingItems.map((item) => <li key={item}>{item}</li>)}</ul>}
          </div>
        </section>}
        {step === 2 && selectedAuthority && <section className="fast-step review-step"><span className="step-label">Make payment</span><h2>{bplExempt ? 'Confirm the BPL exemption.' : 'Confirm and pay ₹10.'}</h2><p>{bplExempt ? 'Eligible BPL applicants do not pay the application fee when valid proof is attached.' : 'Non-BPL applicants pay ₹10 once. Do not pay again if a previous attempt is pending. This demonstration does not charge a bank or UPI account.'}</p>
          <div className="fast-review"><article><span>Request</span><p>{draft.request}</p><button type="button" onClick={() => setStep(1)}>Edit</button></article><article><span>Public authority</span><b>{selectedAuthority.name}</b><small>{selectedAuthority.ministry}</small></article><article><span>Applicant</span><b>{draft.name}</b><small>{draft.email} · {draft.format}</small></article></div>
          <div className="demo-pay-slip">
            <div>
              <span>Prescribed fee</span>
              <strong>{bplExempt ? '₹0' : '₹10'}</strong>
              <small>{bplExempt ? 'BPL exemption selected' : `Pay by ${draft.payment} · transaction ${DEMO_PAYMENT_ID}`}</small>
            </div>
            {!bplExempt && <div className="fast-payment" role="group" aria-label="Payment method">{['UPI','Net banking','RuPay / card'].map((item) => <button aria-pressed={draft.payment === item} className={draft.payment === item ? 'selected' : ''} onClick={() => update('payment', item)} key={item} type="button">{item}{draft.payment === item && <span>✓</span>}</button>)}</div>}
          </div>
          <label className="final-declaration"><input checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} type="checkbox"/><span><b>I confirm these details are correct.</b><small>This prototype creates a device-local demonstration receipt. Nothing is transmitted or charged.</small></span></label>
        </section>}
        {step === 3 && submittedAt && dueDate && selectedAuthority && <section className="fast-receipt"><div className="success-orbit"><span>✓</span></div><span className="step-label">Request registered</span><h2>Your number and due date.</h2><p>Save both. The statutory clock starts today. Status and first appeal use this same number.</p>
          <PaperKeep number={registration} numberLabel="Prototype registration number" dueLabel="Response due" due={formatDate(dueDate)} dueHint={draft.urgent ? '48-hour life-or-liberty timeline selected' : '30 calendar days from registration'} clock={draft.urgent ? '48' : '30'} clockUnit={draft.urgent ? 'hours' : 'days'} />
          <dl className="receipt-summary"><div><dt>Filed</dt><dd>{formatDate(submittedAt)}</dd></div><div><dt>Authority</dt><dd>{selectedAuthority.name}<small> · {selectedAuthority.ministry}</small></dd></div><div><dt>Fee</dt><dd>{bplExempt ? '₹0 · BPL' : `₹10 · ${draft.payment}`}</dd></div><div><dt>Payment reference</dt><dd>{bplExempt ? 'Not charged' : DEMO_PAYMENT_ID}</dd></div></dl>
          <div className="next-promise"><b>What happens next</b><p>The Nodal Officer transmits the request to the concerned CPIO. Open status for the days left, then file a first appeal at ₹0 if there is no reply.</p></div>
          <div className="receipt-actions"><a className="button-primary" href={`/status?registration=${encodeURIComponent(registration)}&email=${encodeURIComponent(draft.email)}`}>View status</a><a className="button-secondary" href={`/appeal?registration=${encodeURIComponent(registration)}`}>Prepare first appeal</a></div><small className="prototype-receipt-note">This is a prototype receipt and is not valid for an official RTI filing.</small>
        </section>}
      </div>
      {step < 3 && <div className="fast-actions"><button disabled={step === 0} onClick={() => setStep((current) => current - 1)} type="button">← Back</button><span><i>✓</i> Draft stays in this browser</span>{step < 2 ? <button className="button-primary" disabled={!canContinue} onClick={() => setStep((current) => current + 1)} type="button">{step === 0 ? (guidelinesAccepted ? <>Proceed to form <b>→</b></> : 'Accept guidelines to continue') : <>{bplExempt ? 'Review request' : 'Pay ₹10'} <b>→</b></>}</button> : <button className="button-primary" disabled={!confirmed} onClick={submit} type="button">{confirmed ? (bplExempt ? 'Register without fee' : 'Pay ₹10 and register') : 'Confirm details to pay'}{confirmed && <b>→</b>}</button>}</div>}
    </div>
  );
}

type StatusRecord = { id: string; subject: string; authority: string; status: string; due: string; filed?: string; kind?: string; email?: string };

function matchKnownRecord(id: string, mail: string): StatusRecord | null {
  const normalizedId = id.trim().toUpperCase();
  const normalizedEmail = mail.trim().toLowerCase();
  const saved = [readStored<StatusRecord>('rti-gov-demo-request'), readStored<StatusRecord>('rti-gov-demo-appeal')]
    .find((item) => item?.id.toUpperCase() === normalizedId && item.email?.toLowerCase() === normalizedEmail);
  if (saved) return saved;
  const demoRecord = [...demoRequests, demoAppeal].find((item) => item.id === normalizedId);
  if (demoRecord && normalizedEmail === DEMO_EMAIL) return demoRecord;
  return null;
}

export function StatusLookup({ initialRegistration = '', initialEmail = '' }: { initialRegistration?: string; initialEmail?: string }) {
  const knownRecords = [...demoRequests, demoAppeal];
  const linkedDemo = knownRecords.find((item) => item.id === initialRegistration.trim().toUpperCase())
    && initialEmail.trim().toLowerCase() === DEMO_EMAIL
    ? knownRecords.find((item) => item.id === initialRegistration.trim().toUpperCase())
    : null;
  const [registration, setRegistration] = useState(initialRegistration);
  const [email, setEmail] = useState(initialEmail);
  const [securityCode, setSecurityCode] = useState('');
  const [stage, setStage] = useState(linkedDemo ? 2 : 0);
  const [error, setError] = useState('');
  const [record, setRecord] = useState<StatusRecord>(linkedDemo || demoRequests[0]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!initialRegistration || !initialEmail) return;
      const found = matchKnownRecord(initialRegistration, initialEmail);
      if (found) {
        setRecord(found);
        setStage(2);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialRegistration, initialEmail]);

  const findRequest = () => {
    if (securityCode.trim().toUpperCase() !== DEMO_SECURITY) { setError(`Enter the demonstration security code ${DEMO_SECURITY}.`); return; }
    const normalizedId = registration.trim().toUpperCase();
    const normalizedEmail = email.trim().toLowerCase();
    const savedRecords = [readStored<StatusRecord>('rti-gov-demo-request'), readStored<StatusRecord>('rti-gov-demo-appeal')];
    const saved = savedRecords.find((item) => item?.id.toUpperCase() === normalizedId && item.email?.toLowerCase() === normalizedEmail);
    if (saved) {
      setRecord(saved); setError(''); setStage(2); return;
    }
    const demoRecord = knownRecords.find((item) => item.id === normalizedId);
    if (demoRecord && normalizedEmail === DEMO_EMAIL) {
      setRecord(demoRecord); setError(''); setStage(2); return;
    }
    setError('No matching prototype request. Use the demo request or enter the details from a receipt created on this device.');
  };

  const openDemoCase = () => {
    setRegistration(DEMO_REQUEST_ID);
    setEmail(DEMO_EMAIL);
    setSecurityCode(DEMO_SECURITY);
    setRecord(demoRequests[0]);
    setError('');
    setStage(2);
  };

  return <div className="tool-surface compact-tool">{stage === 0 ? <form className="lookup-form" onSubmit={(event) => { event.preventDefault(); findRequest(); }}><div className="service-form-intro"><span className="step-label">View status</span><h2>Enter the application details.</h2><p>Use the registration number and email from the receipt. The known demonstration does not send a code to a mailbox.</p></div><label><span>Registration number *</span><input required value={registration} onChange={(event) => setRegistration(event.target.value)} placeholder={DEMO_REQUEST_ID} /></label><label><span>Email used to file *</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={DEMO_EMAIL} /></label><label><span>Security code *</span><div className="captcha-row"><b aria-label="Demonstration security code">{DEMO_SECURITY}</b><input required value={securityCode} onChange={(event) => setSecurityCode(event.target.value)} placeholder={`Enter ${DEMO_SECURITY}`} /></div></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button-primary" type="submit">View status</button><button className="text-button" onClick={openDemoCase} type="button">Open demonstration case</button></form> : <CaseStatus onChangeDetails={() => setStage(0)} record={record} />}</div>;
}

function CaseStatus({ record, onChangeDetails }: { record: StatusRecord; onChangeDetails?: () => void }) {
  const [action, setAction] = useState<'none' | 'fee' | 'document' | 'parts'>('none');
  const [actionStatus, setActionStatus] = useState('');
  const [linkedAppeal, setLinkedAppeal] = useState<StatusRecord | null>(null);
  const closed = record.due.startsWith('Closed');
  const dueTimestamp = parseDue(record.due);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const daysLeft = Number.isNaN(dueTimestamp) ? null : Math.max(0, Math.ceil((dueTimestamp - today.getTime()) / 86_400_000));
  const isAppeal = record.kind === 'Appeal';
  const isPrimaryDemo = record.id === demoRequests[0].id || record.id === DEMO_REQUEST_ID || record.id === DEMO_APPEAL_ID;
  const dueLabel = isAppeal ? 'Appeal decision due' : closed ? 'Case disposition' : 'Statutory response due';
  const appealDays = linkedAppeal ? daysRemaining(linkedAppeal.due) : null;
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = readStored<StatusRecord & { sourceRegistration?: string }>('rti-gov-demo-appeal');
      if (!saved) return;
      if (saved.id === record.id || saved.sourceRegistration === record.id) setLinkedAppeal(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [record.id]);
  return (
    <div className="case-status case-file">
      <div className="case-file-head">
        <small>Prototype {isAppeal ? 'appeal' : 'request'}</small>
        <b>{record.id}</b>
        <span>{record.status}</span>
      </div>
      <h2>{record.subject}</h2>
      <p className="case-authority">{record.authority}</p>
      <div className="deadline-card">
        <div>
          <span>{dueLabel}</span>
          <strong>{record.due}</strong>
          <small>{isAppeal ? '45 days from first-appeal registration' : closed ? 'A prototype reply is on file' : 'Usual 30-day CPIO clock'}</small>
        </div>
        <div className="deadline-count">
          <b>{closed ? '✓' : daysLeft ?? '—'}</b>
          <span>{closed ? 'closed' : daysLeft === null ? 'date' : 'days left'}</span>
        </div>
      </div>
      {!isAppeal && record.status !== 'Routed' && linkedAppeal && (
        <div className="appeal-strip">
          <div>
            <span>First appeal registered</span>
            <b>{linkedAppeal.id}</b>
            <small>Decision due {linkedAppeal.due}{appealDays === null ? '' : ` · ${appealDays} days left`} · ₹0</small>
          </div>
          <a className="button-primary" href={`/status?registration=${encodeURIComponent(linkedAppeal.id)}&email=${encodeURIComponent(linkedAppeal.email || DEMO_EMAIL)}`}>View appeal</a>
        </div>
      )}
      {!isAppeal && record.status !== 'Routed' && !linkedAppeal && (
        <div className="appeal-strip">
          <div>
            <span>First appeal</span>
            <b>₹0 · 45-day FAA clock</b>
            <small>Silence or an incomplete reply is enough. Continue stays blocked until you confirm.</small>
          </div>
          <a className="button-primary" href={`/appeal?registration=${encodeURIComponent(record.id)}`}>Prepare first appeal</a>
        </div>
      )}
      <ol>
        <li className="done"><i>✓</i><div><b>{isAppeal ? 'Appeal received' : 'Request received'}</b><small>{record.filed || '22 Aug 2026'}</small></div></li>
        {isPrimaryDemo ? (
          <>
            <li className="done"><i>✓</i><div><b>Sent to nodal officer</b><small>Railway Board</small></div></li>
            <li className="active"><i>2</i><div><b>{isAppeal ? 'With First Appellate Authority' : 'Forwarded to concerned CPIO'}</b><small>{isAppeal ? 'Waiting for a decision on the 45-day clock' : 'Waiting for the record or a lawful exemption'}</small></div></li>
          </>
        ) : (
          <li className="active"><i>2</i><div><b>{closed ? 'Case completed' : record.status === 'Routed' ? 'Continue in the receiving service' : 'Routing to the responsible officer'}</b><small>{closed ? 'A prototype reply is available in the case history.' : record.status === 'Routed' ? 'State and local applications use their appropriate RTI service and fee rules.' : 'The prototype case is active on this device.'}</small></div></li>
        )}
        <li><i>3</i><div><b>{isAppeal ? 'FAA decision' : 'Response or first appeal'}</b><small>{isAppeal ? 'The First Appellate Authority should decide within 45 days.' : 'Silence, denial or an incomplete reply opens a ₹0 first appeal.'}</small></div></li>
      </ol>
      {isPrimaryDemo && !isAppeal && (
        <details className="optional-details extra-actions">
          <summary>Additional fee, PDF or split CPIO numbers</summary>
          <div className="status-actions">
            <div>
              <button onClick={() => { setAction('fee'); setActionStatus(''); }} type="button">Pay additional fee</button>
              <button onClick={() => { setAction('document'); setActionStatus(''); }} type="button">Upload requested PDF</button>
              <button onClick={() => { setAction('parts'); setActionStatus(''); }} type="button">View split CPIO cases</button>
            </div>
            {action === 'fee' && <section><b>Additional fee: ₹12</b><p>Six A4 pages at ₹2 per page. This is a synthetic payment.</p><button className="button-primary" onClick={() => setActionStatus('Mock fee paid. The case can continue.')} type="button">Pay mock fee</button></section>}
            {action === 'document' && <section><b>Supporting document required</b><p>Upload the requested PDF from the applicant. Maximum size: 1 MB.</p><input accept="application/pdf" onChange={(event) => { const file = event.target.files?.[0]; setActionStatus(file ? (file.type === 'application/pdf' && file.size <= 1_000_000 ? `${file.name} uploaded to this prototype case.` : 'Choose a PDF no larger than 1 MB.') : ''); }} type="file"/></section>}
            {action === 'parts' && <section><b>Forwarded to multiple CPIOs</b><p>{record.id}/1 · Railway Board<br/>{record.id}/2 · Northern Railway<br/>{record.id}/3 · Station Development Directorate</p></section>}
            {actionStatus && <p className="status-action-result" role="status">✓ {actionStatus}</p>}
          </div>
        </details>
      )}
      <div className="case-actions">
        {onChangeDetails && <button onClick={onChangeDetails} type="button">Look up a different case</button>}
        <button onClick={() => window.print()} type="button">Print acknowledgement</button>
        <a href="/history">Open history</a>
      </div>
    </div>
  );
}

export function AppealWorkflow({ initialRegistration = '' }: { initialRegistration?: string }) {
  const [step, setStep] = useState(0);
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);
  const [registration, setRegistration] = useState(initialRegistration);
  const [email, setEmail] = useState('');
  const [lookupError, setLookupError] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [reason, setReason] = useState('No response after 30 days');
  const [text, setText] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [appealFile, setAppealFile] = useState('');
  const [appealFileError, setAppealFileError] = useState('');
  const [appealDraftRestored, setAppealDraftRestored] = useState(false);
  const [sourceRecord, setSourceRecord] = useState<StatusRecord | null>(null);
  const [appealRegistration, setAppealRegistration] = useState('');
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const didStep = useRef(false);
  const didRestoreAppeal = useRef(Boolean(initialRegistration));
  const labels = ['Guidelines', 'Retrieve request', 'Appeal form', 'Registered'];
  const progressNow = step === 3 ? 1 : (step + 1) / 3;
  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  const dueDate = useMemo(() => {
    if (!submittedAt) return null;
    const due = new Date(submittedAt);
    due.setDate(due.getDate() + 45);
    return due;
  }, [submittedAt]);
  const canContinue = [
    guidelinesAccepted,
    Boolean(registration.trim() && email.trim() && securityCode.trim()),
    text.trim().length >= 20 && confirmed,
  ][step] ?? true;
  const appealMissingItems = [
    text.trim().length < 20 && 'Write at least 20 characters explaining the appeal',
    !confirmed && 'Confirm that the appeal details are correct',
  ].filter(Boolean) as string[];

  useEffect(() => {
    if (initialRegistration) return;
    const timer = window.setTimeout(() => {
      const saved = readStored<{ registration: string; email: string; securityCode: string; reason: string; text: string }>('rti-gov-demo-appeal-draft');
      didRestoreAppeal.current = true;
      if (!saved?.registration && !saved?.text) return;
      setRegistration(saved.registration || ''); setEmail(saved.email || ''); setSecurityCode(saved.securityCode || '');
      setReason(saved.reason || 'No response after 30 days'); setText(saved.text || ''); setAppealDraftRestored(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialRegistration]);

  useEffect(() => {
    if (!didRestoreAppeal.current || step === 3) return;
    storeValue('rti-gov-demo-appeal-draft', { registration, email, securityCode, reason, text });
  }, [email, reason, registration, securityCode, step, text]);

  const findEligible = () => {
    if (!registration.trim() || !email.trim() || !securityCode.trim()) {
      setLookupError('Enter the registration number, applicant email and security code.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setLookupError('Enter a valid applicant email address.');
      return;
    }
    if (securityCode.trim().toUpperCase() !== 'RTI26') { setLookupError('Enter the demonstration security code RTI26.'); return; }
    const normalizedId = registration.trim().toUpperCase();
    const normalizedEmail = email.trim().toLowerCase();
    const demoRecord = demoRequests.find((item) => item.kind === 'Request' && item.id === normalizedId);
    const localRecord = readStored<StatusRecord>('rti-gov-demo-request');
    const localMatch = localRecord?.id.toUpperCase() === normalizedId && localRecord.email?.toLowerCase() === normalizedEmail;
    if (localMatch && localRecord?.status === 'Routed') {
      setLookupError('This request was routed to a State or local service. Continue the appeal in that receiving service.');
      return;
    }
    if ((demoRecord && normalizedEmail === 'aarav.demo@example.in') || localMatch) {
      setSourceRecord(localMatch ? localRecord : demoRecord || null);
      setLookupError('');
      setStep(2);
      return;
    }
    setLookupError('That prototype request was not found. Use the demo details or a receipt created on this device.');
  };

  useEffect(() => {
    if (!didStep.current) {
      didStep.current = true;
      return;
    }
    const root = workflowRef.current;
    const target = root?.querySelector(step === 3 ? '.fast-receipt' : '.fast-body, .review-step') || root;
    scrollStepIntoView(target instanceof HTMLElement ? target : root);
  }, [step]);

  const submitAppeal = () => {
    const now = new Date();
    const due = new Date(now); due.setDate(due.getDate() + 45);
    const canonical = registration.trim().toUpperCase() === DEMO_REQUEST_ID && email.trim().toLowerCase() === DEMO_EMAIL;
    const authorityCode = registration.split('/').find((part) => /^[A-Z]{2,8}$/.test(part) && part !== 'RTI') || 'DEMO';
    const appealId = canonical ? DEMO_APPEAL_ID : `RTI/${authorityCode}/A/${now.getFullYear()}/${String(now.getTime()).slice(-5)}`;
    const savedAppeal: StatusRecord = { id: appealId, subject: `First appeal: ${sourceRecord?.subject || registration}`, authority: sourceRecord?.authority || 'Original public authority', status: 'Appeal registered', due: formatDate(due), filed: formatDate(now), kind: 'Appeal', email };
    storeValue('rti-gov-demo-appeal', { ...savedAppeal, sourceRegistration: registration, reason, text });
    removeStored('rti-gov-demo-appeal-draft');
    setAppealRegistration(appealId);
    setSubmittedAt(now);
    setStep(3);
  };

  return (
    <div className="fast-workflow" ref={workflowRef}>
      <div className="fast-progress" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step === 3 ? 3 : step + 1} aria-label={step === 3 ? 'Appeal registered' : `Step ${step + 1} of 3, ${labels[step]}`}><div style={{ width: `${progressNow * 100}%` }}/><span>{labels[step]}</span><b>{step === 3 ? 'Complete' : `Step ${step + 1} of 3`}</b></div>
      <div className="fast-body">
        {step === 0 && <PortalGuidelines kind="appeal" accepted={guidelinesAccepted} onAccepted={setGuidelinesAccepted}/>}
        {step === 1 && <section className="fast-step">
          <span className="step-label">Online RTI first appeal form</span>
          <h2>Start with the original request.</h2>
          <p>An online first appeal needs the original registration number, applicant email and security code. No fee is charged for a Central first appeal.</p>
          {appealDraftRestored && <div className="draft-restored" role="status"><span>✓</span><div><b>Appeal draft restored.</b><small>Review the original request details before retrieving it.</small></div><button onClick={() => { setRegistration(''); setEmail(''); setSecurityCode(''); setReason('No response after 30 days'); setText(''); setAppealDraftRestored(false); removeStored('rti-gov-demo-appeal-draft'); }} type="button">Discard draft</button></div>}
          <div className="fast-form">
            <label><span>RTI request registration number *</span><input required value={registration} onChange={(event) => setRegistration(event.target.value)} placeholder={DEMO_REQUEST_ID} /></label>
            <label><span>Email used to file *</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={DEMO_EMAIL} /></label>
            <label className="wide"><span>Security code *</span><div className="captcha-row"><b aria-label="Demonstration security code">RTI26</b><input value={securityCode} onChange={(event) => setSecurityCode(event.target.value)} placeholder="Enter RTI26"/></div></label>
          </div>
          {lookupError && <p className="form-error" role="alert">{lookupError}</p>}
          <button className="text-button" onClick={() => { setRegistration(DEMO_REQUEST_ID); setEmail(DEMO_EMAIL); setSecurityCode(DEMO_SECURITY); setLookupError(''); }} type="button">Fill demonstration request</button>
        </section>}
        {step === 2 && <section className="fast-step">
          <span className="step-label">Grounds for appeal</span>
          <h2>Complete the first appeal.</h2>
          <p>State what went wrong and the relief you want. The First Appellate Authority should decide within 45 days.</p>
          <div className="appeal-source"><span>Original request</span><b>{sourceRecord?.id}</b><p>{sourceRecord?.subject}</p></div>
          <div className="demo-pay-slip appeal-fee-slip">
            <div>
              <span>First appeal fee</span>
              <strong>₹0</strong>
              <small>No fee for a Central first appeal</small>
            </div>
            <div className="deadline-count"><b>45</b><span>days</span></div>
          </div>
          <div className="fast-form">
            <label className="wide"><span>Ground for appeal *</span><select value={reason} onChange={(event) => { setReason(event.target.value); setConfirmed(false); }}><option>No response after 30 days</option><option>Incomplete information</option><option>Information wrongly denied</option><option>Unreasonable additional fee</option><option>Other</option></select></label>
            <label className="wide fast-question"><span>Text for RTI first appeal application *</span><textarea maxLength={3000} value={text} onChange={(event) => { setText(event.target.value); setConfirmed(false); }} placeholder="State the response date, what is missing, and the relief requested." /><small>{text.length} / 3,000 characters</small></label>
            <label className="wide supporting-upload"><span>Supporting PDF (optional)</span><input accept="application/pdf" onChange={(event) => { const file = event.target.files?.[0]; setAppealFileError(''); if (!file) { setAppealFile(''); return; } if (file.type !== 'application/pdf' || file.size > 1_000_000) { setAppealFile(''); setAppealFileError('Choose a PDF no larger than 1 MB.'); return; } setAppealFile(file.name); }} type="file" /><small>{appealFile ? `Attached: ${appealFile}` : 'One PDF up to 1 MB. Do not upload Aadhaar or PAN.'}</small></label>
          </div>
          {appealFileError && <p className="form-error" role="alert">{appealFileError}</p>}
          <div className={appealMissingItems.length ? 'completion-panel' : 'completion-panel complete'} aria-live="polite"><b>{appealMissingItems.length ? `${appealMissingItems.length} required items remaining` : 'Required details complete'}</b>{appealMissingItems.length > 0 && <ul>{appealMissingItems.map((item) => <li key={item}>{item}</li>)}</ul>}</div>
          <label className="final-declaration"><input checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} type="checkbox" /><span><b>I confirm the appeal details are correct.</b><small>No fee is charged for a Central first appeal. This prototype transmits nothing.</small></span></label>
        </section>}
        {step === 3 && submittedAt && dueDate && <section className="fast-receipt">
          <div className="success-orbit"><span>✓</span></div>
          <span className="step-label">First appeal registered</span>
          <h2>Your appeal number and 45-day clock.</h2>
          <p>The appeal has been routed to the First Appellate Authority. No fee was charged.</p>
          <PaperKeep number={appealRegistration} numberLabel="Prototype appeal number" dueLabel="Appeal decision due" due={formatDate(dueDate)} dueHint="45 days from registration" clock="45" clockUnit="days" />
          <dl className="receipt-summary">
            <div><dt>Filed</dt><dd>{formatDate(submittedAt)}</dd></div>
            <div><dt>Original request</dt><dd>{sourceRecord?.id || registration}</dd></div>
            <div><dt>Authority</dt><dd>{sourceRecord?.authority || 'Original public authority'}</dd></div>
            <div><dt>Fee</dt><dd>₹0 · first appeal</dd></div>
          </dl>
          <div className="next-promise"><b>What happens next</b><p>The First Appellate Authority should decide within 45 days. If there is no decision, or you reject it, a second appeal may go to the Central Information Commission.</p></div>
          <div className="receipt-actions"><a className="button-primary" href={`/status?registration=${encodeURIComponent(appealRegistration)}&email=${encodeURIComponent(email)}`}>View appeal status</a><a className="button-secondary" href="/history">Open history</a></div>
          <small className="prototype-receipt-note">This is a prototype receipt and is not valid for an official RTI appeal.</small>
        </section>}
      </div>
      {step < 3 && <div className="fast-actions">
        <button disabled={step === 0} onClick={() => setStep((current) => current - 1)} type="button">← Back</button>
        <span><i>✓</i> {step === 2 ? 'No first-appeal fee' : 'Draft stays in this browser'}</span>
        {step === 0 && <button className="button-primary" disabled={!canContinue} onClick={() => setStep(1)} type="button">{guidelinesAccepted ? <>Proceed to appeal form <b>→</b></> : 'Accept guidelines to continue'}</button>}
        {step === 1 && <button className="button-primary" onClick={findEligible} type="button">Retrieve request <b>→</b></button>}
        {step === 2 && <button className="button-primary" disabled={!canContinue} onClick={submitAppeal} type="button">{confirmed ? <>Submit first appeal <b>→</b></> : 'Confirm details to submit'}</button>}
      </div>}
    </div>
  );
}

function daysRemaining(due: string) {
  if (due.startsWith('Closed')) return null;
  const dueTimestamp = parseDue(due);
  if (Number.isNaN(dueTimestamp)) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((dueTimestamp - today.getTime()) / 86_400_000));
}

export function HistoryDashboard() {
  const [accessStage, setAccessStage] = useState(0);
  const [historyEmail, setHistoryEmail] = useState('');
  const [historyMobile, setHistoryMobile] = useState('');
  const [historySecurity, setHistorySecurity] = useState('');
  const [historyError, setHistoryError] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [filter, setFilter] = useState('All');
  const [localRecords, setLocalRecords] = useState<StatusRecord[]>([]);
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const records = [readStored<StatusRecord>('rti-gov-demo-request'), readStored<StatusRecord>('rti-gov-demo-appeal')].filter((item): item is StatusRecord => Boolean(item));
      setLocalRecords(records);
      if (readStored<string>('rti-gov-demo-user') === 'aarav') {
        setSignedIn(true); setHistoryEmail(DEMO_EMAIL); setVerifiedEmail(DEMO_EMAIL); setAccessStage(2);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const verifyHistory = () => {
    if (historySecurity.trim().toUpperCase() !== DEMO_SECURITY) { setHistoryError(`Enter the security code ${DEMO_SECURITY}.`); return; }
    const normalizedEmail = historyEmail.trim().toLowerCase();
    const stored = [readStored<StatusRecord>('rti-gov-demo-request'), readStored<StatusRecord>('rti-gov-demo-appeal')].filter((item): item is StatusRecord => Boolean(item));
    if (normalizedEmail !== DEMO_EMAIL && !stored.some((item) => item.email?.toLowerCase() === normalizedEmail)) {
      setHistoryError('No cases were found for that email on this device.'); return;
    }
    setLocalRecords(stored); setVerifiedEmail(normalizedEmail); setHistoryError(''); setAccessStage(2);
  };
  const eligibleRecords = verifiedEmail === DEMO_EMAIL
    ? [...localRecords, ...demoRequests]
    : localRecords.filter((item) => item.email?.toLowerCase() === verifiedEmail);
  const allRecords: StatusRecord[] = eligibleRecords.filter((item, index, records) => records.findIndex((candidate) => candidate.id === item.id) === index);
  const records = allRecords.filter((item) => filter === 'All' || item.kind === filter || (filter === 'Pending' && !/reply received|closed/i.test(`${item.status} ${item.due}`)));
  const requestCount = allRecords.filter((item) => item.kind === 'Request').length;
  const appealCount = allRecords.filter((item) => item.kind === 'Appeal' && !/closed/i.test(`${item.status} ${item.due}`)).length;
  const replyCount = allRecords.filter((item) => /reply received/i.test(item.status)).length;
  const upcoming = allRecords.filter((item) => !item.due.startsWith('Closed') && !Number.isNaN(parseDue(item.due))).sort((a, b) => parseDue(a.due) - parseDue(b.due))[0]?.due || '—';
  if (accessStage === 0) return <div className="tool-surface compact-tool"><form className="lookup-form" onSubmit={(event) => { event.preventDefault(); verifyHistory(); }}><div className="service-form-intro"><span className="step-label">View history</span><h2>Verify the applicant.</h2><p>Enter the email used to file. Security code is RTI26. Requests and appeals with these details stay on this device for three years.</p></div><label><span>Email ID *</span><input required type="email" value={historyEmail} onChange={(event) => setHistoryEmail(event.target.value)} placeholder="aarav.demo@example.in"/></label><label><span>Mobile number</span><input inputMode="numeric" value={historyMobile} onChange={(event) => setHistoryMobile(event.target.value)} placeholder="10-digit mobile"/></label><label><span>Security code *</span><div className="captcha-row"><b>RTI26</b><input required value={historySecurity} onChange={(event) => setHistorySecurity(event.target.value)} placeholder="Enter RTI26"/></div></label>{historyError && <p className="form-error" role="alert">{historyError}</p>}<button className="button-primary" type="submit">View history</button><button className="text-button" onClick={() => { setHistoryEmail(DEMO_EMAIL); setHistoryMobile('9876543210'); setHistorySecurity(DEMO_SECURITY); setVerifiedEmail(DEMO_EMAIL); setHistoryError(''); setAccessStage(2); }} type="button">Open demonstration history</button></form></div>;
  return (
    <div className="dashboard-surface history-ledger">
      <div className="dashboard-head">
        <div>
          <span className="step-label">{verifiedEmail === DEMO_EMAIL ? 'Demo citizen account' : 'Device-local history'}</span>
          <h2>{verifiedEmail === DEMO_EMAIL ? 'Aarav’s cases' : 'Your cases'}</h2>
        </div>
        <div className="dashboard-head-actions"><a className="button-primary" href="/request">New request</a>{signedIn && <button onClick={() => { removeStored('rti-gov-demo-user'); setSignedIn(false); setVerifiedEmail(''); setAccessStage(0); }} type="button">Sign out</button>}</div>
      </div>
      <div className="dashboard-filter">{['All', 'Request', 'Appeal', 'Pending'].map((item) => <button aria-pressed={filter === item} className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)} type="button">{item}</button>)}</div>
      <div className="request-list">{records.map((item) => {
        const kind = item.kind || 'Request';
        const itemEmail = item.email || 'aarav.demo@example.in';
        const left = daysRemaining(item.due);
        const closed = item.due.startsWith('Closed');
        return (
          <article key={item.id}>
            <div className={`case-kind ${kind.toLowerCase()}`}>{kind === 'Request' ? 'R' : 'A'}</div>
            <div>
              <small>{item.id}</small>
              <h3>{item.subject}</h3>
              <p>{item.authority}</p>
            </div>
            <span className="list-status">{item.status}</span>
            <div className="list-due">
              <small>{closed ? 'Closed' : left === null ? 'Next date' : `${left} days left`}</small>
              <b>{item.due}</b>
            </div>
            <a href={`/status?registration=${encodeURIComponent(item.id)}&email=${encodeURIComponent(itemEmail)}`}>Open →</a>
          </article>
        );
      })}{records.length === 0 && <div className="history-empty" role="status"><b>No cases match this filter.</b><p>Choose All to see every case on this device.</p></div>}</div>
      <div className="dashboard-metrics">
        <article><span>{requestCount}</span><b>RTI requests</b></article>
        <article><span>{appealCount}</span><b>Active appeals</b></article>
        <article><span>{replyCount}</span><b>Replies received</b></article>
        <article><span>{upcoming.replace(/\s+2026$/, '')}</span><b>next deadline</b></article>
      </div>
      <p className="history-switch"><button className="text-button" onClick={() => { setAccessStage(0); setVerifiedEmail(''); setHistoryError(''); }} type="button">Look up a different applicant</button></p>
    </div>
  );
}

export function PaymentReconciliation() {
  const [transaction, setTransaction] = useState('');
  const [email, setEmail] = useState('');
  const [security, setSecurity] = useState('');
  const [result, setResult] = useState<'idle' | 'found' | 'missing'>('idle');
  const demoPaymentRecord: StatusRecord & { paymentId: string } = { ...demoRequests[0], paymentId: DEMO_PAYMENT_ID };
  const [matchedRequest, setMatchedRequest] = useState<StatusRecord & { paymentId?: string }>(demoPaymentRecord);
  const check = () => {
    if (security.trim().toUpperCase() !== DEMO_SECURITY) { setResult('missing'); return; }
    const normalizedTransaction = transaction.trim().toUpperCase();
    const normalizedEmail = email.trim().toLowerCase();
    const stored = readStored<StatusRecord & { paymentId?: string }>('rti-gov-demo-request');
    if (stored?.paymentId?.toUpperCase() === normalizedTransaction && stored.email?.toLowerCase() === normalizedEmail) {
      setMatchedRequest(stored); setResult('found'); return;
    }
    if (normalizedTransaction === DEMO_PAYMENT_ID && normalizedEmail === DEMO_EMAIL) {
      setMatchedRequest(demoPaymentRecord); setResult('found'); return;
    }
    setResult('missing');
  };
  return (
    <div className="tool-surface compact-tool">
      {result === 'found' && (
        <div className="fast-receipt payment-receipt" role="status">
          <div className="success-orbit"><span>✓</span></div>
          <span className="step-label">Payment reconciled</span>
          <h2>₹10 received. Number issued.</h2>
          <p>Do not pay again. Status uses this same registration number.</p>
          <PaperKeep number={matchedRequest.id} numberLabel="Prototype registration number" dueLabel="Response due" due={matchedRequest.due || DEMO_DUE} dueHint="30 calendar days from registration" clock="30" clockUnit="days" />
          <dl className="receipt-summary">
            <div><dt>Amount</dt><dd>₹10 · UPI</dd></div>
            <div><dt>Transaction</dt><dd>{matchedRequest.paymentId || transaction}</dd></div>
            <div><dt>Applicant</dt><dd>{matchedRequest.email || email}</dd></div>
            <div><dt>Authority</dt><dd>{matchedRequest.authority}</dd></div>
          </dl>
          <div className="receipt-actions">
            <a className="button-primary" href={`/status?registration=${encodeURIComponent(matchedRequest.id)}&email=${encodeURIComponent(matchedRequest.email || email)}`}>View status</a>
            <button className="button-secondary" onClick={() => setResult('idle')} type="button">Look up a different payment</button>
          </div>
        </div>
      )}
      {result !== 'found' && (
        <form className="lookup-form" onSubmit={(event) => { event.preventDefault(); check(); }}>
          <div className="service-form-intro">
            <span className="step-label">Payment reconciliation</span>
            <h2>Find the ₹10 once.</h2>
            <p>Use this only when money was debited but no registration number was generated. Do not pay again.</p>
          </div>
          <label><span>Bank / gateway transaction ID *</span><input required value={transaction} onChange={(event) => setTransaction(event.target.value)} placeholder={DEMO_PAYMENT_ID} /></label>
          <label><span>Applicant email *</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={DEMO_EMAIL} /></label>
          <label><span>Security code *</span><div className="captcha-row"><b>{DEMO_SECURITY}</b><input required value={security} onChange={(event) => setSecurity(event.target.value)} placeholder={`Enter ${DEMO_SECURITY}`}/></div></label>
          {result === 'missing' && <p className="form-error" role="alert">No matching prototype payment. Use the demonstration transaction, email and security code {DEMO_SECURITY}.</p>}
          <button className="button-primary" type="submit">Check payment</button>
          <button className="text-button" onClick={() => { setTransaction(DEMO_PAYMENT_ID); setEmail(DEMO_EMAIL); setSecurity(DEMO_SECURITY); setMatchedRequest(demoPaymentRecord); setResult('found'); }} type="button">Open demonstration payment</button>
        </form>
      )}
    </div>
  );
}

export function DemoLogin() {
  const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [security, setSecurity] = useState(''); const [error, setError] = useState('');
  const login = () => { if (username === 'aarav.demo' && password === 'rti@2026' && security.toUpperCase() === 'RTI26') { storeValue('rti-gov-demo-user', 'aarav'); window.location.href = '/history'; } else setError('Use the demonstration username, password and security code RTI26.'); };
  return <form className="login-card" onSubmit={(event) => { event.preventDefault(); login(); }}><span className="step-label">Login</span><h2>Sign in to view history.</h2><p>An account is not required to file. Security code is <b>RTI26</b>.</p><label><span>Username *</span><input autoComplete="username" required value={username} onChange={(event) => setUsername(event.target.value)} placeholder="aarav.demo" /></label><label><span>Password *</span><input autoComplete="current-password" required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" /></label><label><span>Security code *</span><div className="captcha-row"><b>RTI26</b><input required value={security} onChange={(event) => setSecurity(event.target.value)} placeholder="Enter RTI26"/></div></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button-primary" type="submit">Login</button><button className="text-button" onClick={() => { setUsername('aarav.demo'); setPassword('rti@2026'); setSecurity('RTI26'); setError(''); }} type="button">Fill demonstration account</button><a className="login-history-link" href="/history">View history without login →</a></form>;
}

export function FeedbackForm() {
  const [message, setMessage] = useState(''); const [sent, setSent] = useState(false);
  if (sent) return <div className="feedback-success" role="status"><b>Feedback saved on this device.</b><p>Thank you. Nothing was transmitted from this prototype.</p><button className="text-button" onClick={() => { setSent(false); setMessage(''); }} type="button">Write another note</button></div>;
  return <form className="feedback-form" onSubmit={(event) => { event.preventDefault(); if (message.trim().length < 10) return; storeValue('rti-gov-demo-feedback', message.trim()); setSent(true); }}><label><span>Your feedback</span><textarea required minLength={10} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What was unclear or did not work?" /></label><button className="button-primary" type="submit">Save prototype feedback</button></form>;
}

export function FaqList() {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{faqs.map(([question, answer], index) => { const answerId = `faq-answer-${index}`; return <article className={open === index ? 'open' : ''} key={question}><button aria-controls={answerId} aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)} type="button"><span>{question}</span><i aria-hidden="true">{open === index ? '−' : '+'}</i></button>{open === index && <p id={answerId}>{answer}</p>}</article>; })}</div>;
}
