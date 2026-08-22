'use client';

import { useMemo, useState } from 'react';
import { authorities, demoRequests, disclosures, faqs } from './portal-data';

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

type RequestDraft = { authority: string; name: string; email: string; mobile: string; address: string; bpl: boolean; urgent: boolean; request: string; format: string; payment: string };
const initialDraft: RequestDraft = {
  authority: '', name: 'Aarav Demo', email: 'aarav.demo@example.in', mobile: '90000 00000', address: '42 Demo Road, New Delhi 110001', bpl: false, urgent: false,
  request: 'Please provide copies of inspection reports and the completion certificate for the foot-over bridge work at Anand Vihar railway station between 1 April 2024 and 31 March 2025.', format: 'Electronic copy', payment: 'UPI',
};

export function RequestWorkflow() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(initialDraft);
  const [fit, setFit] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const labels = ['Right route', 'Authority', 'Applicant', 'Records', 'Fee', 'Receipt'];
  const update = <K extends keyof RequestDraft>(key: K, value: RequestDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const selectedAuthority = authorities.find((item) => item.code === draft.authority);
  const canContinue = [fit === 'records', Boolean(draft.authority), Boolean(draft.name && draft.email && draft.address), draft.request.trim().length > 20, confirmed][step] ?? true;
  const submit = () => {
    const saved = { ...demoRequests[0], id: 'RTI/MORLY/2026/804271', subject: draft.request.slice(0, 70), authority: selectedAuthority?.name || 'Ministry of Railways' };
    localStorage.setItem('rti-gov-demo-request', JSON.stringify(saved));
    setSubmitted(true); setStep(5);
  };
  return (
    <div className="workflow-shell">
      <div className="workflow-progress">{labels.map((label, index) => <div className={`${index === step ? 'active' : ''} ${index < step ? 'complete' : ''}`} key={label}><span>{index < step ? '✓' : index + 1}</span><small>{label}</small></div>)}</div>
      <div className="workflow-body">
        {step === 0 && <section className="workflow-step"><span className="step-label">Step 1 · Check the route</span><h2>What do you need from the authority?</h2><p>RTI gives you existing government records. It does not order an office to fix a service.</p><div className="choice-grid vertical">
          <button className={fit === 'records' ? 'selected' : ''} onClick={() => setFit('records')} type="button"><b>Copies of existing records</b><small>Files, reports, data, contracts, notes or correspondence</small><i>Best fit</i></button>
          <button className={fit === 'grievance' ? 'selected warning' : ''} onClick={() => setFit('grievance')} type="button"><b>A service problem fixed</b><small>Pension delay, certificate, refund or individual grievance</small><i>Use grievance</i></button>
          <button className={fit === 'opinion' ? 'selected warning' : ''} onClick={() => setFit('opinion')} type="button"><b>An explanation or opinion</b><small>Reframe it as the recorded reasons or file noting</small><i>Reframe</i></button>
        </div>{fit && fit !== 'records' && <div className="decision-advice"><b>Do not file yet.</b><p>{fit === 'grievance' ? 'A grievance portal can seek corrective action. Use RTI only if you want the records behind that action.' : 'Ask for the documents, file noting or recorded reasons used to make the decision.'}</p></div>}</section>}
        {step === 1 && <section className="workflow-step"><span className="step-label">Step 2 · Public authority</span><h2>Who is likely to hold the record?</h2><p>The right destination matters more than legal language.</p><div className="choice-grid authority-choices">{authorities.slice(0, 5).map((item) => <button className={draft.authority === item.code ? 'selected' : ''} key={item.code} onClick={() => update('authority', item.code)} type="button"><span>{item.level}</span><b>{item.name}</b><small>{item.topics}</small></button>)}</div></section>}
        {step === 2 && <section className="workflow-step"><span className="step-label">Step 3 · Applicant details</span><h2>Who should receive the response?</h2><p>Only details required to identify and contact the applicant. Never enter Aadhaar, PAN, bank or card information here.</p><div className="form-grid"><label><span>Full name</span><input value={draft.name} onChange={(event) => update('name', event.target.value)} /></label><label><span>Email</span><input type="email" value={draft.email} onChange={(event) => update('email', event.target.value)} /></label><label><span>Mobile for alerts</span><input value={draft.mobile} onChange={(event) => update('mobile', event.target.value)} /></label><label className="wide"><span>Postal address</span><textarea value={draft.address} onChange={(event) => update('address', event.target.value)} /></label></div><label className="check-row"><input checked={draft.bpl} onChange={(event) => update('bpl', event.target.checked)} type="checkbox" /><span><b>I am eligible for the Below Poverty Line fee exemption</b><small>A valid certificate would be required in production.</small></span></label></section>}
        {step === 3 && <section className="workflow-step"><span className="step-label">Step 4 · Describe the records</span><h2>Specific beats formal.</h2><p>Describe the record, place and date range. The authority needs a search instruction—not a legal speech.</p><div className="request-toolbar"><span>To <b>{selectedAuthority?.name}</b></span><span>{draft.request.length} / 3,000 characters</span></div><label className="big-textarea"><span>Information requested</span><textarea value={draft.request} onChange={(event) => update('request', event.target.value)} /></label><button className="clarify-button" onClick={() => update('request', 'Please provide the following records under the Right to Information Act, 2005:\n\n1. Copies of inspection reports for the foot-over bridge work at Anand Vihar railway station between 1 April 2024 and 31 March 2025.\n2. A copy of the completion certificate issued for this work.\n3. The name and designation of the office that approved that certificate.\n\nI prefer to receive these records electronically.')} type="button">✦ Clarify this request <small>Mock writing assistance · adds no new facts</small></button><div className="form-grid mini"><label><span>Preferred format</span><select value={draft.format} onChange={(event) => update('format', event.target.value)}><option>Electronic copy</option><option>Certified paper copy</option><option>Inspection of records</option></select></label><label><span>Supporting PDF (optional)</span><input accept="application/pdf" type="file" /></label></div><label className="check-row"><input checked={draft.urgent} onChange={(event) => update('urgent', event.target.checked)} type="checkbox" /><span><b>This concerns life or liberty</b><small>Use only when the 48-hour statutory condition genuinely applies.</small></span></label></section>}
        {step === 4 && <section className="workflow-step"><span className="step-label">Step 5 · Review and mock payment</span><h2>Know exactly what will be sent.</h2><p>Production would hand off to an approved payment gateway. This prototype never collects financial details.</p><div className="review-panel"><div><small>Public authority</small><b>{selectedAuthority?.name}</b></div><div><small>Applicant</small><b>{draft.name}</b><span>{draft.email}</span></div><div className="wide"><small>Request</small><p>{draft.request}</p></div><div><small>Application fee</small><b>{draft.bpl ? '₹0 · BPL exemption' : '₹10'}</b></div><div><small>Delivery</small><b>{draft.format}</b></div></div>{!draft.bpl && <div className="payment-methods">{['UPI', 'Net banking', 'Card / RuPay'].map((item) => <button className={draft.payment === item ? 'selected' : ''} onClick={() => update('payment', item)} key={item} type="button">{item}<span>{draft.payment === item ? '✓' : ''}</span></button>)}</div>}<label className="check-row declaration"><input checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} type="checkbox" /><span><b>I understand this is a synthetic demonstration.</b><small>No identity, payment, file or request will leave this prototype.</small></span></label></section>}
        {step === 5 && <section className="receipt-screen"><span className="receipt-check">✓</span><span className="step-label">Mock request submitted</span><h2>Now you know what happens next.</h2><p>A real service should never end at “submitted.” It should give proof, a deadline and the next action.</p><div className="receipt-id"><small>Registration number</small><b>RTI/MORLY/2026/804271</b><button type="button">Copy</button></div><div className="receipt-details"><div><small>Submitted</small><b>22 August 2026</b></div><div><small>Response due</small><b>21 September 2026</b></div><div><small>Authority</small><b>{selectedAuthority?.name}</b></div></div><div className="receipt-actions"><a className="button-primary" href="/status">Track this request</a><a className="button-secondary" href="/history">Open request history</a></div>{submitted && <p className="save-note">Saved to this device for the demo.</p>}</section>}
      </div>
      {step < 5 && <div className="workflow-actions"><button disabled={step === 0} onClick={() => setStep((current) => current - 1)} type="button">← Back</button><span>Draft saved on this device</span>{step < 4 ? <button className="button-primary" disabled={!canContinue} onClick={() => setStep((current) => current + 1)} type="button">Continue →</button> : <button className="button-primary" disabled={!confirmed} onClick={submit} type="button">{draft.bpl ? 'Submit mock request →' : `Pay ₹10 & submit →`}</button>}</div>}
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
