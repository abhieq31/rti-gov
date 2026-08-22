'use client';

import { useMemo, useState } from 'react';
import { authorities, demoRequests, disclosures, faqs } from './portal-data';

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
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return disclosures;
    return disclosures.filter((item) => `${item.title} ${item.authority} ${item.topic}`.toLowerCase().includes(q));
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
        <div className="results-summary"><b>{searched || query ? results.length : disclosures.length} useful records</b><span>Newest first</span></div>
        {(searched || query ? results : disclosures.slice(0, 3)).map((item) => (
          <article key={item.title}><span className="record-type">{item.type}</span><h2>{item.title}</h2><p>{item.authority}</p><small>Updated {item.date}</small><button type="button">Open record <span>→</span></button></article>
        ))}
        {(searched || query) && results.length === 0 && <div className="empty-result"><b>No published record matched that search.</b><p>That does not mean the record does not exist. Find the likely public authority and file a precise request.</p><a href="/authorities">Find the right authority →</a></div>}
      </div>
    </div>
  );
}

export function AuthorityFinder() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All');
  const matches = authorities.filter((item) => (level === 'All' || item.level === level) && `${item.name} ${item.topics}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="tool-surface">
      <div className="authority-tool-head">
        <label><span>Search by service, subject or department</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. pension, railway station, road project" /></label>
        <div className="segment-control" aria-label="Authority level">{['All', 'Central', 'State', 'Local'].map((item) => <button className={level === item ? 'active' : ''} key={item} onClick={() => setLevel(item)} type="button">{item}</button>)}</div>
      </div>
      <div className="authority-cards">{matches.map((item) => <article key={item.code}><div className="authority-code">{item.code}</div><div><span>{item.level} public authority</span><h2>{item.name}</h2><p>{item.topics}</p></div><a href={`/request?authority=${item.code}`}>{item.route} →</a></article>)}</div>
      {!matches.length && <div className="empty-result"><b>No exact authority found.</b><p>Search by the public service instead of an office name, or use guided routing.</p></div>}
    </div>
  );
}

type RequestDraft = { authority: string; region: string; name: string; email: string; mobile: string; address: string; bpl: boolean; urgent: boolean; request: string; format: string; payment: string };
const initialDraft: RequestDraft = {
  authority: '', region: 'Delhi', name: '', email: '', mobile: '', address: '', bpl: false, urgent: false,
  request: '', format: 'Electronic copy', payment: 'UPI',
};

const regions = ['Andaman & Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Dadra & Nagar Haveli and Daman & Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu & Kashmir','Jharkhand','Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];

function authorityFor(request: string, region: string) {
  const text = request.toLowerCase();
  if (/rail|station|train|platform/.test(text)) return authorities[0];
  if (/epf|epfo|provident|pension/.test(text)) return authorities[1];
  if (/national highway|nh-|n hai|nhai/.test(text)) return authorities[2];
  if (/service rule|government employee|rti polic|dopt/.test(text)) return authorities[3];
  if (region === 'Delhi' && /road|drain|garbage|property|building|park|street/.test(text)) return authorities[4];
  return { name: `${region} public authority`, code: region.replace(/[^A-Z]/gi, '').slice(0, 4).toUpperCase() || 'STATE', level: 'State', topics: 'The department or local body holding this record', route: 'Route through the appropriate State service' };
}

export function RequestWorkflow({ initialNeed = '' }: { initialNeed?: string }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(() => ({ ...initialDraft, request: initialNeed }));
  const [confirmed, setConfirmed] = useState(false);
  const [showAuthorities, setShowAuthorities] = useState(false);
  const [registration, setRegistration] = useState('');
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);
  const labels = ['Your request', 'Your details', 'Review', 'Registered'];
  const update = <K extends keyof RequestDraft>(key: K, value: RequestDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const suggestedAuthority = useMemo(() => authorityFor(draft.request, draft.region), [draft.request, draft.region]);
  const selectedAuthority = authorities.find((item) => item.code === draft.authority) || (draft.authority === suggestedAuthority.code ? suggestedAuthority : suggestedAuthority);
  const grievanceLikely = /fix|repair|complaint|not received|delay|pending|take action/.test(draft.request.toLowerCase());
  const canContinue = [Boolean(draft.request.trim().length >= 12 && draft.region && (draft.authority || suggestedAuthority.code)), Boolean(draft.name && draft.mobile.replace(/\D/g, '').length >= 10 && draft.email.includes('@') && draft.address.trim().length >= 8), confirmed][step] ?? true;

  const dueDate = useMemo(() => {
    if (!submittedAt) return null;
    const due = new Date(submittedAt);
    due.setDate(due.getDate() + (draft.urgent ? 2 : 30));
    return due;
  }, [submittedAt, draft.urgent]);

  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  const submit = () => {
    const now = new Date();
    const id = `RTI-DEMO/${selectedAuthority.code}/${now.getFullYear()}/${String(now.getTime()).slice(-6)}`;
    const saved = { ...demoRequests[0], id, subject: draft.request.slice(0, 70), authority: selectedAuthority.name };
    localStorage.setItem('rti-gov-demo-request', JSON.stringify(saved));
    setRegistration(id); setSubmittedAt(now); setStep(3);
  };
  return (
    <div className="fast-workflow">
      <div className="fast-progress" aria-label={`Step ${step + 1} of 4`}><div style={{ width: `${((step + 1) / 4) * 100}%` }}/><span>{labels[step]}</span><b>{step < 3 ? `${step + 1} of 3 · about ${step === 0 ? '70' : step === 1 ? '40' : '15'} seconds left` : 'Complete'}</b></div>
      <div className="fast-body">
        {step === 0 && <section className="fast-step"><span className="step-label">Start with the information</span><h2>What do you want to know?</h2><p>Write it as you would say it. We&apos;ll shape the request and find the likely office.</p>
          <label className="fast-question"><span>Your information request</span><textarea autoFocus value={draft.request} onChange={(event) => update('request', event.target.value)} placeholder="Give me copies of the inspection reports for…"/><small>{draft.request.length} characters · ask for records, reports, lists, file notes or data</small></label>
          <div className="route-fields"><label><span>Where is this about?</span><select value={draft.region} onChange={(event) => update('region', event.target.value)}>{regions.map((region) => <option key={region}>{region}</option>)}</select></label><label className="urgent-toggle"><input checked={draft.urgent} onChange={(event) => update('urgent', event.target.checked)} type="checkbox"/><span><b>Life or liberty</b><small>Only for a genuine 48-hour matter</small></span></label></div>
          {draft.request.trim().length >= 12 && <div className="authority-match"><div><span>Likely record holder</span><b>{selectedAuthority.name}</b><small>{selectedAuthority.level} · {selectedAuthority.topics}</small></div><button type="button" onClick={() => setShowAuthorities((current) => !current)}>{showAuthorities ? 'Use suggestion' : 'Change'}</button></div>}
          {showAuthorities && <div className="authority-picker">{authorities.map((item) => <button className={draft.authority === item.code ? 'selected' : ''} key={item.code} onClick={() => { update('authority', item.code); setShowAuthorities(false); }} type="button"><b>{item.name}</b><small>{item.level}</small></button>)}</div>}
          {grievanceLikely && <div className="gentle-warning"><b>Need the problem fixed?</b><p>RTI can get the records behind a decision. A grievance service is better for asking an office to take action.</p><a href="/guide">Help me choose</a></div>}
        </section>}
        {step === 1 && <section className="fast-step"><span className="step-label">Contact for the response</span><h2>Where should the reply go?</h2><p>Only what the authority needs to identify you and send the response. Never Aadhaar, PAN or bank details.</p>
          <div className="fast-form"><label><span>Full name</span><input autoComplete="name" value={draft.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name"/></label><label><span>Mobile</span><input autoComplete="tel" inputMode="numeric" value={draft.mobile} onChange={(event) => update('mobile', event.target.value)} placeholder="10-digit mobile number"/></label><label><span>Email</span><input autoComplete="email" type="email" value={draft.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com"/></label><label><span>Postal address</span><textarea autoComplete="street-address" value={draft.address} onChange={(event) => update('address', event.target.value)} placeholder="House, street, city and PIN code"/></label></div>
          <div className="delivery-row"><label><span>Send records as</span><select value={draft.format} onChange={(event) => update('format', event.target.value)}><option>Electronic copy</option><option>Certified paper copy</option><option>Inspection of records</option></select></label><label className="bpl-toggle"><input checked={draft.bpl} onChange={(event) => update('bpl', event.target.checked)} type="checkbox"/><span><b>I have valid BPL proof</b><small>Application fee becomes ₹0</small></span></label></div>
        </section>}
        {step === 2 && <section className="fast-step review-step"><span className="step-label">One calm review</span><h2>Ready to register.</h2><p>Check the request once. Payment and registration happen together.</p>
          <div className="fast-review"><article><span>Request</span><p>{draft.request}</p><button type="button" onClick={() => setStep(0)}>Edit</button></article><article><span>Public authority</span><b>{selectedAuthority.name}</b><small>{selectedAuthority.level} route · transfer assistance included</small></article><article><span>Response to</span><b>{draft.name}</b><small>{draft.email} · {draft.format}</small></article></div>
          <div className="checkout-row"><div><span>Application fee</span><strong>{draft.bpl ? '₹0' : '₹10'}</strong><small>{draft.bpl ? 'BPL exemption selected' : 'One-time Central RTI fee'}</small></div>{!draft.bpl && <div className="fast-payment" role="group" aria-label="Payment method">{['UPI','Net banking','RuPay / card'].map((item) => <button className={draft.payment === item ? 'selected' : ''} onClick={() => update('payment', item)} key={item} type="button">{item}{draft.payment === item && <span>✓</span>}</button>)}</div>}</div>
          <label className="final-declaration"><input checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} type="checkbox"/><span><b>I confirm these details are correct.</b><small>This prototype creates a device-local demonstration receipt. Nothing is transmitted or charged.</small></span></label>
        </section>}
        {step === 3 && submittedAt && dueDate && <section className="fast-receipt"><div className="success-orbit"><span>✓</span></div><span className="step-label">Request registered</span><h2>You&apos;re done.</h2><p>Your proof and statutory clock are now in one place.</p>
          <div className="registration-card"><span>Prototype registration number</span><b>{registration}</b><button onClick={() => navigator.clipboard?.writeText(registration)} type="button">Copy number</button></div>
          <div className="deadline-card"><div><span>Response due</span><strong>{formatDate(dueDate)}</strong><small>{draft.urgent ? '48-hour life-or-liberty timeline selected' : '30 calendar days from registration'}</small></div><div className="deadline-count"><b>{draft.urgent ? '48' : '30'}</b><span>{draft.urgent ? 'hours' : 'days'}</span></div></div>
          <dl className="receipt-summary"><div><dt>Filed</dt><dd>{formatDate(submittedAt)}</dd></div><div><dt>Authority</dt><dd>{selectedAuthority.name}</dd></div><div><dt>Delivery</dt><dd>{draft.format}</dd></div><div><dt>Fee</dt><dd>{draft.bpl ? '₹0 · BPL' : `₹10 · ${draft.payment}`}</dd></div></dl>
          <div className="next-promise"><b>What happens next</b><p>We&apos;ll show who has the request, every transfer, days remaining, fees, the reply and the exact moment an appeal becomes available.</p></div>
          <div className="receipt-actions"><a className="button-primary" href="/status">Track this request</a><button className="button-secondary" onClick={() => window.print()} type="button">Save acknowledgement</button></div><small className="prototype-receipt-note">This is a prototype receipt and is not valid for an official RTI filing.</small>
        </section>}
      </div>
      {step < 3 && <div className="fast-actions"><button disabled={step === 0} onClick={() => setStep((current) => current - 1)} type="button">← Back</button><span><i>✓</i> Saved on this device</span>{step < 2 ? <button className="button-primary" disabled={!canContinue} onClick={() => setStep((current) => current + 1)} type="button">Continue <b>→</b></button> : <button className="button-primary" disabled={!confirmed} onClick={submit} type="button">{draft.bpl ? 'Register request' : `Pay ₹10 & register`} <b>→</b></button>}</div>}
    </div>
  );
}

export function StatusLookup() {
  const [registration, setRegistration] = useState(''); const [email, setEmail] = useState(''); const [stage, setStage] = useState(0); const [otp, setOtp] = useState('');
  return <div className="tool-surface compact-tool">{stage === 0 ? <form className="lookup-form" onSubmit={(event) => { event.preventDefault(); if (registration && email) setStage(1); }}><label><span>Registration number</span><input value={registration} onChange={(event) => setRegistration(event.target.value)} placeholder="RTI/MORLY/2026/804271" /></label><label><span>Email used to file</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="aarav.demo@example.in" /></label><button className="button-primary">Send secure code</button><button className="text-button" onClick={() => { setRegistration('RTI/MORLY/2026/804271'); setEmail('aarav.demo@example.in'); }} type="button">Use demo request</button></form> : stage === 1 ? <div className="otp-panel"><span className="step-label">Privacy check</span><h2>Enter the six-digit demo code.</h2><p>A real OTP protects personal request details. For this prototype, use <b>240805</b>.</p><input maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))} placeholder="000000" /><button className="button-primary" disabled={otp !== '240805'} onClick={() => setStage(2)} type="button">View secure status</button></div> : <CaseStatus />}</div>;
}

function CaseStatus() {
  return <div className="case-status"><div className="case-head"><div><small>RTI/MORLY/2026/804271</small><h2>Anand Vihar foot-over bridge records</h2><p>Ministry of Railways</p></div><span>With CPIO</span></div><div className="case-deadline"><div><b>24</b><span>days left</span></div><p>Statutory response due<br/><b>21 September 2026</b></p></div><ol><li className="done"><i>✓</i><div><b>Request received</b><small>22 Aug · 3:18 PM</small></div></li><li className="done"><i>✓</i><div><b>Sent to nodal officer</b><small>22 Aug · Ministry of Railways</small></div></li><li className="active"><i>2</i><div><b>Forwarded to concerned CPIO</b><small>23 Aug · Railway Board</small></div></li><li><i>3</i><div><b>Response or additional action</b><small>We will explain fees, documents or appeal options here.</small></div></li></ol><div className="case-actions"><button type="button">Download acknowledgement</button><a href="/appeal">Prepare first appeal</a></div></div>;
}

export function AppealWorkflow() {
  const [stage, setStage] = useState(0); const [reason, setReason] = useState('No response after 30 days'); const [text, setText] = useState(''); const [confirmed, setConfirmed] = useState(false);
  return <div className="workflow-shell appeal-shell"><div className="workflow-body">{stage === 0 ? <section className="workflow-step"><span className="step-label">First appeal · No fee</span><h2>Start with the original request.</h2><p>A first appeal can be filed against an eligible online RTI request using its registration number and applicant email.</p><div className="form-grid"><label><span>Original registration number</span><input defaultValue="RTI/MORLY/2026/804271" /></label><label><span>Email used to file</span><input defaultValue="aarav.demo@example.in" /></label></div><button className="button-primary standalone" onClick={() => setStage(1)} type="button">Find eligible request →</button></section> : stage === 1 ? <section className="workflow-step"><span className="step-label">Grounds for appeal</span><h2>State what went wrong.</h2><div className="form-grid"><label className="wide"><span>Ground for appeal</span><select value={reason} onChange={(event) => setReason(event.target.value)}><option>No response after 30 days</option><option>Incomplete information</option><option>Information wrongly denied</option><option>Unreasonable additional fee</option><option>Other</option></select></label><label className="wide"><span>Appeal statement</span><textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="State the response date, what is missing, and the relief requested." /></label><label className="wide"><span>Supporting PDF (optional)</span><input accept="application/pdf" type="file" /></label></div><label className="check-row declaration"><input checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} type="checkbox" /><span><b>This is a mock first appeal.</b><small>No document or appeal will be transmitted.</small></span></label><button className="button-primary standalone" disabled={!text.trim() || !confirmed} onClick={() => setStage(2)} type="button">Submit mock appeal →</button></section> : <section className="receipt-screen"><span className="receipt-check">✓</span><span className="step-label">Mock first appeal registered</span><h2>Your appeal is clear and traceable.</h2><p>There is no fee for this Central first appeal.</p><div className="receipt-id"><small>Appeal registration number</small><b>RTI/MORLY/A/2026/10842</b></div><a className="button-primary standalone" href="/history">View appeal history</a></section>}</div></div>;
}

export function HistoryDashboard() {
  const [filter, setFilter] = useState('All');
  const records = demoRequests.filter((item) => filter === 'All' || item.kind === filter || (filter === 'Pending' && !item.status.includes('received')));
  return <div className="dashboard-surface"><div className="dashboard-head"><div><span className="step-label">Demo citizen account</span><h2>Good afternoon, Aarav.</h2><p>Every request, reply, payment and appeal in one place.</p></div><a className="button-primary" href="/request">New request</a></div><div className="dashboard-metrics"><article><span>2</span><b>RTI requests</b></article><article><span>1</span><b>Active appeal</b></article><article><span>1</span><b>Reply received</b></article><article><span>24</span><b>days to next deadline</b></article></div><div className="dashboard-filter">{['All', 'Request', 'Appeal', 'Pending'].map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)} type="button">{item}</button>)}</div><div className="request-list">{records.map((item) => <article key={item.id}><div className={`case-kind ${item.kind.toLowerCase()}`}>{item.kind === 'Request' ? 'R' : 'A'}</div><div><small>{item.id}</small><h3>{item.subject}</h3><p>{item.authority}</p></div><span className="list-status">{item.status}</span><div className="list-due"><small>Next date</small><b>{item.due}</b></div><a href="/status">Open →</a></article>)}</div></div>;
}

export function PaymentReconciliation() {
  const [found, setFound] = useState(false);
  return <div className="tool-surface compact-tool"><form className="lookup-form" onSubmit={(event) => { event.preventDefault(); setFound(true); }}><label><span>Bank / gateway transaction ID</span><input defaultValue="RTIDEMO240822118" /></label><label><span>Applicant email</span><input defaultValue="aarav.demo@example.in" /></label><button className="button-primary">Check mock payment</button></form>{found && <div className="payment-result"><span className="receipt-check small">✓</span><div><span className="step-label">Payment reconciled</span><h2>₹10 received in the mock gateway.</h2><p>Registration number <b>RTI/MORLY/2026/804271</b> was generated. Do not attempt another payment.</p></div></div>}</div>;
}

export function DemoLogin() {
  const [stage, setStage] = useState(0); const [code, setCode] = useState('');
  return <div className="login-card">{stage === 0 ? <><span className="step-label">Passwordless demo account</span><h2>One account. Every RTI.</h2><p>Use the synthetic citizen profile. No real email or phone number is needed.</p><label><span>Email or mobile</span><input defaultValue="aarav.demo@example.in" /></label><button className="button-primary" onClick={() => setStage(1)} type="button">Send demo code</button></> : <><span className="step-label">Secure sign in</span><h2>Enter 240805.</h2><p>That is the fixed one-time code for this prototype.</p><label><span>Six-digit code</span><input maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))} placeholder="000000" /></label><button className="button-primary" disabled={code !== '240805'} onClick={() => { localStorage.setItem('rti-gov-demo-user', 'aarav'); window.location.href = '/history'; }} type="button">Open my RTI account</button></>}</div>;
}

export function FaqList() {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{faqs.map(([question, answer], index) => <article className={open === index ? 'open' : ''} key={question}><button onClick={() => setOpen(open === index ? -1 : index)} type="button"><span>{question}</span><i>{open === index ? '−' : '+'}</i></button>{open === index && <p>{answer}</p>}</article>)}</div>;
}
