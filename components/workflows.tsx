'use client';

import { useEffect, useMemo, useState } from 'react';
import { authorities, centralAuthorities, centralMinistries, demoRequests, disclosures, faqs } from './portal-data';

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

export function CitizenStart() {
  const [need, setNeed] = useState('');
  const examples = [
    'Road repair estimate near my home',
    'Inspection report for my railway station',
    'Status and file noting of my pension case',
  ];
  return (
    <form className="citizen-start" action="/request">
      <label htmlFor="citizen-need">What information do you want?</label>
      <textarea
        id="citizen-need"
        name="need"
        value={need}
        onChange={(event) => setNeed(event.target.value)}
        placeholder="For example: Give me the inspection reports for the road repaired outside my home last year."
        rows={3}
      />
      <div className="citizen-start-actions">
        <span><i aria-hidden="true">✓</i> No reason. No Aadhaar. Plain language is enough.</span>
        <button disabled={need.trim().length < 12}>Start my request <b>→</b></button>
      </div>
      <div className="example-prompts"><span>Try an example</span>{examples.map((example) => <button key={example} type="button" onClick={() => setNeed(example)}>{example}</button>)}</div>
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
        <div><span aria-hidden="true">⌕</span><input id="records-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “railway safety inspection report”" /><button>Search records</button></div>
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
  return <section className="portal-guidelines"><div className="guidelines-title"><span>Before you continue</span><h2>Guidelines for use of RTI Online Portal</h2><p>Read the filing conditions once. They protect your fee, your privacy and the validity of the application.</p></div><ol>
    <li><b>Central Government only.</b><span>Do not use this service for State Government public authorities, including the Government of NCT Delhi.</span></li>
    <li><b>{appeal ? 'Use the original online request.' : 'Ask for an existing record.'}</b><span>{appeal ? 'An online first appeal needs the request registration number and applicant email.' : 'Select the Ministry, Department or Central public authority that holds the information.'}</span></li>
    <li><b>Protect personal information.</b><span>Do not upload Aadhaar, PAN or other identity documents. A valid BPL certificate is the only exception.</span></li>
    <li><b>Text and attachment limits.</b><span>Application text is limited to 3,000 characters. Longer text or evidence may be attached as one PDF up to 1 MB.</span></li>
    <li><b>{appeal ? 'No first-appeal fee.' : 'Pay only once.'}</b><span>{appeal ? 'No fee is charged for a Central first appeal.' : 'Non-BPL applicants pay ₹10 by UPI, net banking, card or RuPay. Wait 24–48 working hours before retrying a failed payment.'}</span></li>
  </ol><label className="guidelines-check"><input checked={accepted} onChange={(event) => onAccepted(event.target.checked)} type="checkbox"/><span><b>I have read and understood the guidelines.</b><small>This remains a synthetic prototype; nothing is filed or charged.</small></span></label></section>;
}

export function RequestWorkflow({ initialNeed = '', initialAuthority = '' }: { initialNeed?: string; initialAuthority?: string }) {
  const seeded = findAuthority(initialAuthority);
  const [step, setStep] = useState(0);
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);
  const [draft, setDraft] = useState(() => ({
    ...initialDraft,
    request: initialNeed,
    authority: seeded?.level === 'Central' ? seeded.code : '',
    ministry: seeded?.level === 'Central' ? seeded.ministry : '',
  }));
  const [authorityQuery, setAuthorityQuery] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [registration, setRegistration] = useState('');
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);
  const [draftReady, setDraftReady] = useState(Boolean(initialNeed || initialAuthority));
  const labels = ['Guidelines', 'Request form', 'Payment', 'Registered'];
  const update = <K extends keyof RequestDraft>(key: K, value: RequestDraft[K]) => {
    setConfirmed(false);
    setDraft((current) => ({ ...current, [key]: value }));
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
  const emailsMatch = draft.email === draft.emailConfirm;
  const pinValid = !draft.pin || /^\d{6}$/.test(draft.pin);
  const formComplete = Boolean(
    draft.ministry
    && selectedAuthority?.level === 'Central'
    && draft.name.trim().length >= 2
    && draft.gender
    && emailValid
    && emailsMatch
    && draft.address.trim().length >= 8
    && draft.country === 'India'
    && pinValid
    && draft.bpl
    && draft.request.trim().length >= 12
    && draft.request.length <= 3000
    && securityCode.trim().toUpperCase() === 'RTI26',
  );
  const canContinue = [guidelinesAccepted, formComplete, confirmed][step] ?? true;
  const bplExempt = draft.bpl === 'yes';
  const grievanceLikely = /fix|repair|complaint|not received|delay|pending|take action/.test(draft.request.toLowerCase());

  useEffect(() => {
    if (initialNeed || initialAuthority) return;
    const timer = window.setTimeout(() => {
      const savedDraft = readStored<RequestDraft>('rti-gov-demo-draft');
      if (savedDraft) setDraft({ ...initialDraft, ...savedDraft });
      setDraftReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialNeed, initialAuthority]);

  useEffect(() => {
    if (draftReady && step < 3) storeValue('rti-gov-demo-draft', draft);
  }, [draft, draftReady, step]);

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
    const id = `RTI-DEMO/${selectedAuthority.code}/${now.getFullYear()}/${String(now.getTime()).slice(-6)}`;
    const due = new Date(now); due.setDate(due.getDate() + (draft.urgent ? 2 : 30));
    const saved = { ...demoRequests[0], id, subject: draft.request.slice(0, 70), authority: selectedAuthority.name, email: draft.email, status: 'Registered', due: formatDate(due), filed: formatDate(now) };
    storeValue('rti-gov-demo-request', saved);
    removeStored('rti-gov-demo-draft');
    setRegistration(id); setSubmittedAt(now); setStep(3);
  };

  return (
    <div className="fast-workflow">
      <div className="fast-progress" aria-label={`Step ${step + 1} of 4`}><div style={{ width: `${((step + 1) / 4) * 100}%` }}/><span>{labels[step]}</span><b>{step < 3 ? `Step ${step + 1} of 3` : 'Complete'}</b></div>
      <div className="fast-body">
        {step === 0 && <PortalGuidelines kind="request" accepted={guidelinesAccepted} onAccepted={setGuidelinesAccepted}/>}
        {step === 1 && <section className="fast-step official-form">
          <span className="step-label">Online RTI request form</span>
          <h2>File a request with a Central public authority.</h2>
          <p>Fields marked <b>*</b> are mandatory. Only Indian citizens can file. Do not use this form for State Government authorities, including NCT Delhi.</p>

          <fieldset className="form-fieldset">
            <legend>Public authority details</legend>
            <label className="wide"><span>Search public authority</span><input value={authorityQuery} onChange={(event) => setAuthorityQuery(event.target.value)} placeholder="Type a ministry, department or public authority"/></label>
            {searchHits.length > 0 && <div className="authority-picker">{searchHits.map((item) => <button className={draft.authority === item.code ? 'selected' : ''} key={item.code} onClick={() => { setDraft((current) => ({ ...current, ministry: item.ministry, authority: item.code })); setAuthorityQuery(''); setConfirmed(false); }} type="button"><b>{item.name}</b><small>{item.ministry}</small></button>)}</div>}
            <div className="fast-form">
              <label><span>Select ministry / department / apex body *</span><select value={draft.ministry} onChange={(event) => setDraft((current) => ({ ...current, ministry: event.target.value, authority: '' }))}><option value="">Select</option>{centralMinistries.map((ministry) => <option key={ministry}>{ministry}</option>)}</select></label>
              <label><span>Select public authority *</span><select value={draft.authority} disabled={!draft.ministry} onChange={(event) => update('authority', event.target.value)}><option value="">Select</option>{ministryAuthorities.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label>
            </div>
            {selectedAuthority && <div className="authority-match"><div><span>Request will be filed with</span><b>{selectedAuthority.name}</b><small>{selectedAuthority.ministry} · {selectedAuthority.topics}</small></div></div>}
            {!selectedAuthority && suggestedAuthority && draft.request.trim().length >= 12 && <div className="authority-match"><div><span>Suggested from request text</span><b>{suggestedAuthority.name}</b><small>{suggestedAuthority.ministry}</small></div><button type="button" onClick={() => setDraft((current) => ({ ...current, ministry: suggestedAuthority.ministry, authority: suggestedAuthority.code }))}>Use this authority</button></div>}
          </fieldset>

          <fieldset className="form-fieldset">
            <legend>Personal details of RTI applicant</legend>
            <div className="fast-form">
              <label><span>Email ID *</span><input autoComplete="email" type="email" value={draft.email} onChange={(event) => update('email', event.target.value)}/></label>
              <label><span>Confirm email ID *</span><input autoComplete="email" type="email" value={draft.emailConfirm} onChange={(event) => update('emailConfirm', event.target.value)}/></label>
              <label><span>Name *</span><input autoComplete="name" value={draft.name} onChange={(event) => update('name', event.target.value)}/></label>
              <label><span>Mobile number</span><input autoComplete="tel" inputMode="numeric" maxLength={10} value={draft.mobile} onChange={(event) => update('mobile', event.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile for SMS alerts"/></label>
              <label className="wide"><span>Gender *</span><div className="choice-row" role="radiogroup">{(['Male', 'Female', 'Third Gender'] as const).map((item) => <label key={item}><input checked={draft.gender === item} name="gender" onChange={() => update('gender', item)} type="radio"/>{item}</label>)}</div></label>
              <label className="wide"><span>Address *</span><textarea autoComplete="street-address" value={draft.address} onChange={(event) => update('address', event.target.value)} placeholder="House, street, city"/></label>
              <label><span>PIN code</span><input inputMode="numeric" maxLength={6} value={draft.pin} onChange={(event) => update('pin', event.target.value.replace(/\D/g, ''))}/></label>
              <label><span>Country</span><select value={draft.country} onChange={(event) => update('country', event.target.value as RequestDraft['country'])}><option>India</option><option>Other</option></select></label>
              <label><span>State</span><select value={draft.state} onChange={(event) => update('state', event.target.value)}>{regions.map((region) => <option key={region}>{region}</option>)}</select></label>
              <label><span>Status</span><select value={draft.locality} onChange={(event) => update('locality', event.target.value as RequestDraft['locality'])}><option value="">Select</option><option>Rural</option><option>Urban</option></select></label>
              <label><span>Educational status</span><select value={draft.education} onChange={(event) => update('education', event.target.value as RequestDraft['education'])}><option value="">Select</option><option>Literate</option><option>Illiterate</option></select></label>
              <label><span>Phone number</span><input inputMode="numeric" value={draft.phone} onChange={(event) => update('phone', event.target.value)}/></label>
            </div>
            {draft.email && !emailsMatch && <p className="form-hint">Email ID and confirm email ID must match.</p>}
            {draft.country === 'Other' && <p className="form-error" role="alert">Only Indian citizens can file an RTI request through this portal.</p>}
          </fieldset>

          <fieldset className="form-fieldset">
            <legend>Request details</legend>
            <div className="fast-form">
              <label><span>Citizenship</span><input readOnly value="Indian citizen"/></label>
              <label><span>Is the applicant Below Poverty Line? *</span><div className="choice-row" role="radiogroup">{(['no', 'yes'] as const).map((item) => <label key={item}><input checked={draft.bpl === item} name="bpl" onChange={() => update('bpl', item)} type="radio"/>{item === 'yes' ? 'Yes' : 'No'}</label>)}</div></label>
              <label><span>Send records as</span><select value={draft.format} onChange={(event) => update('format', event.target.value)}><option>Electronic copy</option><option>Certified paper copy</option><option>Inspection of records</option></select></label>
              <label className="urgent-toggle"><input checked={draft.urgent} onChange={(event) => update('urgent', event.target.checked)} type="checkbox"/><span><b>Life or liberty</b><small>Use only for a genuine 48-hour matter</small></span></label>
            </div>
            {bplExempt && <label className="supporting-upload"><span>BPL certificate *</span><input accept="application/pdf" type="file"/><small>Valid BPL proof · PDF up to 1 MB. Do not upload Aadhaar or PAN.</small></label>}
            <label className="fast-question"><span>Text for RTI request application *</span><textarea maxLength={3000} value={draft.request} onChange={(event) => update('request', event.target.value)} placeholder="Provide copies of the inspection reports for…"/><small>{draft.request.length} / 3,000 characters · only A–Z, 0–9 and , . - _ ( ) / @ : &amp; ? \ % in a live filing</small></label>
            {grievanceLikely && <div className="gentle-warning"><b>Need the problem fixed?</b><p>RTI obtains existing records. A grievance service is the route for asking an office to take action.</p><a href="/guide">Read the user manual</a></div>}
            <label className="supporting-upload"><span>Supporting document (optional)</span><input accept="application/pdf" type="file"/><small>One PDF up to 1 MB. PDF name should be under 12 characters, with no spaces. Do not upload Aadhaar or PAN.</small></label>
            <label><span>Enter security code *</span><div className="captcha-row"><b aria-label="Demonstration security code">RTI26</b><input value={securityCode} onChange={(event) => setSecurityCode(event.target.value)} placeholder="Enter RTI26"/></div></label>
          </fieldset>
        </section>}
        {step === 2 && selectedAuthority && <section className="fast-step review-step"><span className="step-label">Make payment</span><h2>Confirm and pay the prescribed fee.</h2><p>Non-BPL applicants pay ₹10 once by UPI, net banking, debit/credit card or RuPay. Do not pay again if a previous attempt is pending.</p>
          <div className="fast-review"><article><span>Request</span><p>{draft.request}</p><button type="button" onClick={() => setStep(1)}>Edit</button></article><article><span>Public authority</span><b>{selectedAuthority.name}</b><small>{selectedAuthority.ministry}</small></article><article><span>Applicant</span><b>{draft.name}</b><small>{draft.email} · {draft.gender} · {draft.format}</small></article></div>
          <div className="checkout-row"><div><span>Application fee</span><strong>{bplExempt ? '₹0' : '₹10'}</strong><small>{bplExempt ? 'BPL exemption selected' : 'One-time Central RTI fee'}</small></div>{!bplExempt && <div className="fast-payment" role="group" aria-label="Payment method">{['UPI','Net banking','RuPay / card'].map((item) => <button aria-pressed={draft.payment === item} className={draft.payment === item ? 'selected' : ''} onClick={() => update('payment', item)} key={item} type="button">{item}{draft.payment === item && <span>✓</span>}</button>)}</div>}</div>
          <label className="final-declaration"><input checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} type="checkbox"/><span><b>I confirm these details are correct.</b><small>This prototype creates a device-local demonstration receipt. Nothing is transmitted or charged.</small></span></label>
        </section>}
        {step === 3 && submittedAt && dueDate && selectedAuthority && <section className="fast-receipt"><div className="success-orbit"><span>✓</span></div><span className="step-label">Request registered</span><h2>Application submitted.</h2><p>A unique registration number has been generated. In the live portal this is also sent by email and SMS.</p>
          <div className="registration-card"><span>Prototype registration number</span><b>{registration}</b><button onClick={() => navigator.clipboard?.writeText(registration)} type="button">Copy number</button></div>
          <div className="deadline-card"><div><span>Response due</span><strong>{formatDate(dueDate)}</strong><small>{draft.urgent ? '48-hour life-or-liberty timeline selected' : '30 calendar days from registration'}</small></div><div className="deadline-count"><b>{draft.urgent ? '48' : '30'}</b><span>{draft.urgent ? 'hours' : 'days'}</span></div></div>
          <dl className="receipt-summary"><div><dt>Filed</dt><dd>{formatDate(submittedAt)}</dd></div><div><dt>Authority</dt><dd>{selectedAuthority.name}</dd></div><div><dt>Delivery</dt><dd>{draft.format}</dd></div><div><dt>Fee</dt><dd>{bplExempt ? '₹0 · BPL' : `₹10 · ${draft.payment}`}</dd></div></dl>
          <div className="next-promise"><b>What happens next</b><p>The Nodal Officer transmits the request to the concerned CPIO. Use View Status to see movement, additional fees, replies and first-appeal options.</p></div>
          <div className="receipt-actions"><a className="button-primary" href={`/status?registration=${encodeURIComponent(registration)}&email=${encodeURIComponent(draft.email)}`}>View status</a><button className="button-secondary" onClick={() => window.print()} type="button">Save acknowledgement</button></div><small className="prototype-receipt-note">This is a prototype receipt and is not valid for an official RTI filing.</small>
        </section>}
      </div>
      {step < 3 && <div className="fast-actions"><button disabled={step === 0} onClick={() => setStep((current) => current - 1)} type="button">← Back</button><span><i>✓</i> Draft stays in this browser</span>{step < 2 ? <button className="button-primary" disabled={!canContinue} onClick={() => setStep((current) => current + 1)} type="button">{step === 0 ? 'Proceed to form' : 'Make payment'} <b>→</b></button> : <button className="button-primary" disabled={!confirmed} onClick={submit} type="button">{bplExempt ? 'Submit application' : 'Pay and submit'} <b>→</b></button>}</div>}
    </div>
  );
}

type StatusRecord = { id: string; subject: string; authority: string; status: string; due: string; filed?: string; kind?: string; email?: string };

export function StatusLookup({ initialRegistration = '', initialEmail = '' }: { initialRegistration?: string; initialEmail?: string }) {
  const [registration, setRegistration] = useState(initialRegistration);
  const [email, setEmail] = useState(initialEmail);
  const [securityCode, setSecurityCode] = useState('');
  const [stage, setStage] = useState(0);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [record, setRecord] = useState<StatusRecord>(demoRequests[0]);

  const findRequest = () => {
    if (securityCode.trim().toUpperCase() !== 'RTI26') { setError('Enter the demonstration security code RTI26.'); return; }
    const normalizedId = registration.trim().toUpperCase();
    const normalizedEmail = email.trim().toLowerCase();
    const savedRecords = [readStored<StatusRecord>('rti-gov-demo-request'), readStored<StatusRecord>('rti-gov-demo-appeal')];
    const saved = savedRecords.find((item) => item?.id.toUpperCase() === normalizedId && item.email?.toLowerCase() === normalizedEmail);
    if (saved) {
      setRecord(saved); setError(''); setStage(1); return;
    }
    const demoRecord = demoRequests.find((item) => item.id === normalizedId);
    if (demoRecord && normalizedEmail === 'aarav.demo@example.in') {
      setRecord(demoRecord); setError(''); setStage(1); return;
    }
    setError('No matching prototype request. Use the demo request or enter the details from a receipt created on this device.');
  };

  return <div className="tool-surface compact-tool">{stage === 0 ? <form className="lookup-form" onSubmit={(event) => { event.preventDefault(); findRequest(); }}><div className="service-form-intro"><span className="step-label">View status</span><h2>Enter the application details.</h2><p>An OTP will be sent to the applicant email and mobile number after verification.</p></div><label><span>Registration number *</span><input required value={registration} onChange={(event) => setRegistration(event.target.value)} placeholder="RTI/MORLY/2026/804271" /></label><label><span>Email used to file *</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="aarav.demo@example.in" /></label><label><span>Security code *</span><div className="captcha-row"><b aria-label="Demonstration security code">RTI26</b><input required value={securityCode} onChange={(event) => setSecurityCode(event.target.value)} placeholder="Enter RTI26" /></div></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button-primary">Send OTP</button><button className="text-button" onClick={() => { setRegistration('RTI/MORLY/2026/804271'); setEmail('aarav.demo@example.in'); setSecurityCode('RTI26'); setError(''); }} type="button">Use demonstration details</button></form> : stage === 1 ? <div className="otp-panel"><span className="step-label">Applicant verification</span><h2>Enter the six-digit OTP.</h2><p>For this prototype, use <b>240805</b>. The demonstration OTP remains valid until used.</p><label><span className="sr-only">Six-digit demo code</span><input aria-invalid={otp.length === 6 && otp !== '240805'} inputMode="numeric" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))} placeholder="000000" /></label><button className="button-primary" disabled={otp !== '240805'} onClick={() => setStage(2)} type="button">View secure status</button><button className="text-button" onClick={() => { setStage(0); setOtp(''); }} type="button">Use different details</button></div> : <CaseStatus record={record} />}</div>;
}

function CaseStatus({ record }: { record: StatusRecord }) {
  const [action, setAction] = useState<'none' | 'fee' | 'document' | 'parts'>('none');
  const closed = record.due.startsWith('Closed');
  const dueTimestamp = Date.parse(record.due.replace(/^Closed\s+/, ''));
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const daysLeft = Number.isNaN(dueTimestamp) ? null : Math.max(0, Math.ceil((dueTimestamp - today.getTime()) / 86_400_000));
  const isPrimaryDemo = record.id === demoRequests[0].id;
  return <div className="case-status"><div className="case-head"><div><small>{record.id}</small><h2>{record.subject}</h2><p>{record.authority}</p></div><span>{record.status}</span></div><div className="case-deadline"><div><b>{closed ? '✓' : daysLeft ?? '—'}</b><span>{closed ? 'closed' : daysLeft === null ? 'next date' : 'days left'}</span></div><p>{record.kind === 'Appeal' ? 'Appeal decision due' : closed ? 'Case disposition' : 'Statutory response due'}<br/><b>{record.due}</b></p></div><ol><li className="done"><i>✓</i><div><b>{record.kind === 'Appeal' ? 'Appeal received' : 'Request received'}</b><small>{record.filed || '22 Aug 2026 · 3:18 PM'}</small></div></li>{isPrimaryDemo ? <><li className="done"><i>✓</i><div><b>Sent to nodal officer</b><small>22 Aug · Railway Board</small></div></li><li className="active"><i>2</i><div><b>Forwarded to concerned CPIO</b><small>23 Aug · Railway Board</small></div></li></> : <li className="active"><i>2</i><div><b>{closed ? 'Case completed' : record.status === 'Routed' ? 'Continue in the receiving service' : 'Routing to the responsible officer'}</b><small>{closed ? 'A prototype reply is available in the case history.' : record.status === 'Routed' ? 'State and local applications use their appropriate RTI service and fee rules.' : 'The prototype case is active on this device.'}</small></div></li>}<li><i>3</i><div><b>Response or additional action</b><small>Fees, documents and appeal options appear here.</small></div></li></ol>{isPrimaryDemo && <div className="status-actions"><span>Demonstrate portal actions</span><div><button onClick={() => setAction('fee')} type="button">Pay additional fee</button><button onClick={() => setAction('document')} type="button">Upload requested PDF</button><button onClick={() => setAction('parts')} type="button">View split CPIO cases</button></div>{action === 'fee' && <section><b>Additional fee: ₹12</b><p>Six A4 pages at ₹2 per page. Select UPI, net banking or card to make a synthetic payment.</p><button className="button-primary" onClick={() => setAction('none')} type="button">Pay mock fee</button></section>}{action === 'document' && <section><b>Supporting document required</b><p>Upload the requested PDF from the applicant. Maximum size: 1 MB.</p><input accept="application/pdf" type="file"/></section>}{action === 'parts' && <section><b>Forwarded to multiple CPIOs</b><p>{record.id}/1 · Railway Board<br/>{record.id}/2 · Northern Railway<br/>{record.id}/3 · Station Development Directorate</p></section>}</div>}<div className="case-actions"><button onClick={() => window.print()} type="button">Print acknowledgement</button>{record.kind !== 'Appeal' && record.status !== 'Routed' && <a href={`/appeal?registration=${encodeURIComponent(record.id)}`}>Prepare first appeal</a>}</div></div>;
}

export function AppealWorkflow({ initialRegistration = '' }: { initialRegistration?: string }) {
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);
  const [guidelinesComplete, setGuidelinesComplete] = useState(false);
  const [stage, setStage] = useState(0);
  const [registration, setRegistration] = useState(initialRegistration || 'RTI/MORLY/2026/804271');
  const [email, setEmail] = useState(initialRegistration ? '' : 'aarav.demo@example.in');
  const [lookupError, setLookupError] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [reason, setReason] = useState('No response after 30 days');
  const [text, setText] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [sourceRecord, setSourceRecord] = useState<StatusRecord | null>(null);
  const [appealRegistration, setAppealRegistration] = useState('');
  const findEligible = () => {
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
      setSourceRecord(localMatch ? localRecord : demoRecord || null); setLookupError(''); setStage(1); return;
    }
    setLookupError('That prototype request was not found. Use the demo details or a receipt created on this device.');
  };
  const submitAppeal = () => {
    const now = new Date();
    const due = new Date(now); due.setDate(due.getDate() + 30);
    const authorityCode = registration.split('/').find((part) => /^[A-Z]{2,8}$/.test(part) && part !== 'RTI') || 'DEMO';
    const appealId = `RTI/${authorityCode}/A/${now.getFullYear()}/${String(now.getTime()).slice(-5)}`;
    const formatDate = (date: Date) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
    const savedAppeal: StatusRecord = { id: appealId, subject: `First appeal: ${sourceRecord?.subject || registration}`, authority: sourceRecord?.authority || 'Original public authority', status: 'Appeal registered', due: formatDate(due), filed: formatDate(now), kind: 'Appeal', email };
    storeValue('rti-gov-demo-appeal', { ...savedAppeal, sourceRegistration: registration, reason, text });
    setAppealRegistration(appealId); setStage(2);
  };
  if (!guidelinesComplete) return <div className="workflow-shell appeal-shell"><div className="workflow-body"><PortalGuidelines kind="appeal" accepted={guidelinesAccepted} onAccepted={setGuidelinesAccepted}/></div><div className="workflow-actions"><span>Step 1 of 3</span><button className="button-primary" disabled={!guidelinesAccepted} onClick={() => setGuidelinesComplete(true)} type="button">Proceed to appeal form →</button></div></div>;
  return <div className="workflow-shell appeal-shell"><div className="workflow-body">{stage === 0 ? <section className="workflow-step"><span className="step-label">Online RTI first appeal form</span><h2>Start with the original request.</h2><p>An online first appeal requires the original request registration number, applicant email and security code.</p><div className="form-grid"><label><span>RTI request registration number *</span><input required value={registration} onChange={(event) => setRegistration(event.target.value)} /></label><label><span>Email used to file *</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label className="wide"><span>Security code *</span><div className="captcha-row"><b>RTI26</b><input value={securityCode} onChange={(event) => setSecurityCode(event.target.value)} placeholder="Enter RTI26"/></div></label></div>{lookupError && <p className="form-error" role="alert">{lookupError}</p>}<button className="button-primary standalone" disabled={!registration.trim() || !email.trim()} onClick={findEligible} type="button">Retrieve request →</button></section> : stage === 1 ? <section className="workflow-step"><span className="step-label">Grounds for appeal</span><h2>Complete the first appeal.</h2><div className="appeal-source"><span>Original request</span><b>{sourceRecord?.id}</b><p>{sourceRecord?.subject}</p></div><div className="form-grid"><label className="wide"><span>Ground for appeal *</span><select value={reason} onChange={(event) => { setReason(event.target.value); setConfirmed(false); }}><option>No response after 30 days</option><option>Incomplete information</option><option>Information wrongly denied</option><option>Unreasonable additional fee</option><option>Other</option></select></label><label className="wide"><span>Text for RTI first appeal application *</span><textarea maxLength={3000} value={text} onChange={(event) => { setText(event.target.value); setConfirmed(false); }} placeholder="State the response date, what is missing, and the relief requested." /><small>{text.length} / 3,000 characters</small></label><label className="wide"><span>Supporting PDF (optional)</span><input accept="application/pdf" type="file" /><small>One PDF up to 1 MB</small></label></div><label className="check-row declaration"><input checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} type="checkbox" /><span><b>I confirm the appeal details are correct.</b><small>No fee is charged for a Central first appeal. This prototype transmits nothing.</small></span></label><button className="button-primary standalone" disabled={text.trim().length < 20 || !confirmed} onClick={submitAppeal} type="button">Submit first appeal →</button><button className="text-button standalone" onClick={() => { setStage(0); setConfirmed(false); }} type="button">Use a different request</button></section> : <section className="receipt-screen"><span className="receipt-check">✓</span><span className="step-label">First appeal registered</span><h2>Appeal submitted.</h2><p>The appeal has been routed to the First Appellate Authority. No fee was charged.</p><div className="receipt-id"><small>Appeal registration number</small><b>{appealRegistration}</b></div><a className="button-primary standalone" href="/history">View appeal history</a></section>}</div></div>;
}

export function HistoryDashboard() {
  const [accessStage, setAccessStage] = useState(0);
  const [historyEmail, setHistoryEmail] = useState('aarav.demo@example.in');
  const [historyMobile, setHistoryMobile] = useState('9876543210');
  const [historySecurity, setHistorySecurity] = useState('');
  const [historyOtp, setHistoryOtp] = useState('');
  const [historyError, setHistoryError] = useState('');
  const [filter, setFilter] = useState('All');
  const [localRecords, setLocalRecords] = useState<StatusRecord[]>([]);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const records = [readStored<StatusRecord>('rti-gov-demo-request'), readStored<StatusRecord>('rti-gov-demo-appeal')].filter((item): item is StatusRecord => Boolean(item));
      setLocalRecords(records);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const allRecords: StatusRecord[] = [...localRecords, ...demoRequests].filter((item, index, records) => records.findIndex((candidate) => candidate.id === item.id) === index);
  const records = allRecords.filter((item) => filter === 'All' || item.kind === filter || (filter === 'Pending' && !/reply received|closed/i.test(`${item.status} ${item.due}`)));
  const requestCount = allRecords.filter((item) => item.kind === 'Request').length;
  const appealCount = allRecords.filter((item) => item.kind === 'Appeal' && !/closed/i.test(`${item.status} ${item.due}`)).length;
  const replyCount = allRecords.filter((item) => /reply received/i.test(item.status)).length;
  const upcoming = allRecords.filter((item) => !item.due.startsWith('Closed') && !Number.isNaN(Date.parse(item.due))).sort((a, b) => Date.parse(a.due) - Date.parse(b.due))[0]?.due || '—';
  if (accessStage === 0) return <div className="tool-surface compact-tool"><form className="lookup-form" onSubmit={(event) => { event.preventDefault(); if (historyEmail.toLowerCase() === 'aarav.demo@example.in' && historySecurity.toUpperCase() === 'RTI26') { setHistoryError(''); setAccessStage(1); } else setHistoryError('Use the demonstration email and security code RTI26.'); }}><div className="service-form-intro"><span className="step-label">View history</span><h2>Verify the applicant.</h2><p>Requests and appeals filed with these contact details will appear after OTP verification.</p></div><label><span>Email ID for receiving OTP *</span><input required type="email" value={historyEmail} onChange={(event) => setHistoryEmail(event.target.value)}/></label><label><span>Mobile number</span><input inputMode="numeric" value={historyMobile} onChange={(event) => setHistoryMobile(event.target.value)} /></label><label><span>Security code *</span><div className="captcha-row"><b>RTI26</b><input required value={historySecurity} onChange={(event) => setHistorySecurity(event.target.value)} placeholder="Enter RTI26"/></div></label>{historyError && <p className="form-error">{historyError}</p>}<button className="button-primary">Send OTP</button><button className="text-button" onClick={() => setHistorySecurity('RTI26')} type="button">Use demonstration security code</button></form></div>;
  if (accessStage === 1) return <div className="tool-surface compact-tool"><div className="otp-panel"><span className="step-label">Applicant verification</span><h2>Enter the OTP.</h2><p>Use the demonstration OTP <b>240805</b>.</p><label><span className="sr-only">Six-digit OTP</span><input inputMode="numeric" maxLength={6} value={historyOtp} onChange={(event) => setHistoryOtp(event.target.value.replace(/\D/g, ''))}/></label><button className="button-primary" disabled={historyOtp !== '240805'} onClick={() => setAccessStage(2)} type="button">View three-year history</button></div></div>;
  return <div className="dashboard-surface"><div className="dashboard-head"><div><span className="step-label">Demo citizen account</span><h2>Welcome, Aarav.</h2><p>Every request, reply, payment and appeal in one place.</p></div><a className="button-primary" href="/request">New request</a></div><div className="dashboard-metrics"><article><span>{requestCount}</span><b>RTI requests</b></article><article><span>{appealCount}</span><b>Active appeals</b></article><article><span>{replyCount}</span><b>Replies received</b></article><article><span>{upcoming.replace(/\s+2026$/, '')}</span><b>next deadline</b></article></div><div className="dashboard-filter">{['All', 'Request', 'Appeal', 'Pending'].map((item) => <button aria-pressed={filter === item} className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)} type="button">{item}</button>)}</div><div className="request-list">{records.map((item) => { const kind = item.kind || 'Request'; const itemEmail = item.email || 'aarav.demo@example.in'; return <article key={item.id}><div className={`case-kind ${kind.toLowerCase()}`}>{kind === 'Request' ? 'R' : 'A'}</div><div><small>{item.id}</small><h3>{item.subject}</h3><p>{item.authority}</p></div><span className="list-status">{item.status}</span><div className="list-due"><small>Next date</small><b>{item.due}</b></div><a href={`/status?registration=${encodeURIComponent(item.id)}&email=${encodeURIComponent(itemEmail)}`}>Open →</a></article>; })}</div></div>;
}

export function PaymentReconciliation() {
  const [transaction, setTransaction] = useState('RTIDEMO240822118'); const [email, setEmail] = useState('aarav.demo@example.in'); const [security, setSecurity] = useState(''); const [result, setResult] = useState<'idle' | 'found' | 'missing'>('idle');
  const check = () => setResult(transaction.trim().toUpperCase() === 'RTIDEMO240822118' && email.trim().toLowerCase() === 'aarav.demo@example.in' && security.toUpperCase() === 'RTI26' ? 'found' : 'missing');
  return <div className="tool-surface compact-tool"><form className="lookup-form" onSubmit={(event) => { event.preventDefault(); check(); }}><div className="service-form-intro"><span className="step-label">Payment reconciliation</span><h2>Find the payment once.</h2><p>Use this only when money was debited but no registration number was generated. Do not pay again.</p></div><label><span>Bank / gateway transaction ID *</span><input required value={transaction} onChange={(event) => setTransaction(event.target.value)} /></label><label><span>Applicant email *</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label><span>Security code *</span><div className="captcha-row"><b>RTI26</b><input required value={security} onChange={(event) => setSecurity(event.target.value)} placeholder="Enter RTI26"/></div></label>{result === 'missing' && <p className="form-error" role="alert">No matching prototype payment. Use the pre-filled details and security code RTI26.</p>}<button className="button-primary">Check payment</button><button className="text-button" onClick={() => setSecurity('RTI26')} type="button">Use demonstration security code</button></form>{result === 'found' && <div className="payment-result" role="status"><span className="receipt-check small">✓</span><div><span className="step-label">Payment reconciled</span><h2>₹10 received in the mock gateway.</h2><p>Registration number <b>RTI/MORLY/2026/804271</b> was generated. Do not attempt another payment.</p><a className="rti-text-link" href="/status?registration=RTI%2FMORLY%2F2026%2F804271&email=aarav.demo%40example.in">Open request status →</a></div></div>}</div>;
}

export function DemoLogin() {
  const [username, setUsername] = useState('aarav.demo'); const [password, setPassword] = useState('rti@2026'); const [security, setSecurity] = useState(''); const [error, setError] = useState('');
  const login = () => { if (username === 'aarav.demo' && password === 'rti@2026' && security.toUpperCase() === 'RTI26') { storeValue('rti-gov-demo-user', 'aarav'); window.location.href = '/history'; } else setError('Use the demonstration username, password and security code RTI26.'); };
  return <div className="login-card"><span className="step-label">Citizen login</span><h2>Sign in to RTI Online.</h2><p>The demonstration credentials are pre-filled. Enter security code <b>RTI26</b>.</p><label><span>Username *</span><input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} /></label><label><span>Password *</span><input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label><label><span>Security code *</span><div className="captcha-row"><b>RTI26</b><input value={security} onChange={(event) => setSecurity(event.target.value)} placeholder="Enter RTI26"/></div></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button-primary" onClick={login} type="button">Login</button><a className="login-history-link" href="/history">Forgot credentials? View history with OTP →</a></div>;
}

export function FeedbackForm() {
  const [message, setMessage] = useState(''); const [sent, setSent] = useState(false);
  if (sent) return <div className="feedback-success" role="status"><b>Feedback saved on this device.</b><p>Thank you. Nothing was transmitted from this prototype.</p><button className="text-button" onClick={() => { setSent(false); setMessage(''); }} type="button">Write another note</button></div>;
  return <form className="feedback-form" onSubmit={(event) => { event.preventDefault(); storeValue('rti-gov-demo-feedback', message.trim()); setSent(true); }}><label><span>Your feedback</span><textarea required minLength={10} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What was unclear or did not work?" /></label><button className="button-primary" disabled={message.trim().length < 10}>Save prototype feedback</button></form>;
}

export function FaqList() {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{faqs.map(([question, answer], index) => { const answerId = `faq-answer-${index}`; return <article className={open === index ? 'open' : ''} key={question}><button aria-controls={answerId} aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)} type="button"><span>{question}</span><i aria-hidden="true">{open === index ? '−' : '+'}</i></button>{open === index && <p id={answerId}>{answer}</p>}</article>; })}</div>;
}
