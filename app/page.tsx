'use client';

import { useMemo, useState } from 'react';

const authorities = [
  { name: 'Ministry of Railways', type: 'Central authority', hint: 'Railway Board, zones, projects and policy records' },
  { name: 'Employees’ Provident Fund Organisation', type: 'Central authority', hint: 'EPF administration, circulars and office records' },
  { name: 'Municipal Corporation of Delhi', type: 'Local authority', hint: 'Property, sanitation, works and municipal records' },
  { name: 'Ministry of Road Transport & Highways', type: 'Central authority', hint: 'National highways, rules and programme records' },
];

const journeyLabels = ['Check', 'Authority', 'Request', 'Review', 'Receipt'];

export default function Home() {
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [fit, setFit] = useState<'records' | 'service' | 'opinion' | null>(null);
  const [authorityQuery, setAuthorityQuery] = useState('');
  const [authority, setAuthority] = useState('');
  const [requestText, setRequestText] = useState('Copies of inspection reports and completion certificates for the foot-over bridge work at Anand Vihar railway station between April 2024 and March 2025.');
  const [drafted, setDrafted] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [recordQuery, setRecordQuery] = useState('');

  const filteredAuthorities = useMemo(() => {
    const query = authorityQuery.toLowerCase().trim();
    return query ? authorities.filter((item) => `${item.name} ${item.hint}`.toLowerCase().includes(query)) : authorities;
  }, [authorityQuery]);

  const openJourney = () => {
    setJourneyOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeJourney = () => {
    setJourneyOpen(false);
    document.body.style.overflow = '';
  };

  const submitMockRequest = () => {
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setStep(4);
    }, 1100);
  };

  return (
    <main id="top">
      <div className="prototype-ribbon">
        <span><b>Concept prototype</b> for a unified Government of India RTI service</span>
        <span className="not-live">Not a live government website</span>
      </div>

      <header className="government-header">
        <div className="identity-row">
          <a className="identity" href="#top" aria-label="RTI.gov home">
            <span className="rti-seal" aria-hidden="true">RTI</span>
            <span><strong>RTI.gov</strong><small>Right to Information</small></span>
          </a>
          <div className="ministry-copy"><b>Government of India</b><span>Department of Personnel & Training</span></div>
        </div>
        <nav aria-label="Primary navigation">
          <a href="#learn">Learn about RTI</a>
          <a href="#before">Before you request</a>
          <a href="#search">Search public records</a>
          <button className="nav-request" onClick={openJourney} type="button">Create a request</button>
          <a href="#track">Track & appeal</a>
        </nav>
      </header>

      <section className="hero-official">
        <div className="hero-photo" role="img" aria-label="Parliament House in New Delhi" />
        <div className="hero-wash" />
        <div className="hero-statement">
          <span className="act-label">The Right to Information Act, 2005</span>
          <h1>Information is your right.<br/>Accountability is its purpose.</h1>
          <div className="statement-rule" />
          <p>RTI gives every Indian citizen the power to request existing records from public authorities. This site helps you learn, search, find the right authority and make a clear request.</p>
        </div>

        <div className="journey-launcher">
          <div className="launcher-title"><span>Start your RTI journey</span><small>Choose where you are today</small></div>
          <div className="launcher-grid">
            <a href="#learn"><span className="launcher-num">01</span><b>Learn how RTI works</b><small>What you can ask for, timelines and fees</small><i>→</i></a>
            <a href="#search"><span className="launcher-num">02</span><b>Search before you file</b><small>Find published records or the right authority</small><i>→</i></a>
            <button onClick={openJourney} type="button"><span className="launcher-num">03</span><b>Create an RTI request</b><small>A guided request from start to receipt</small><i>→</i></button>
          </div>
        </div>
      </section>

      <section className="mission" id="learn">
        <div className="section-intro">
          <span className="section-kicker">Know your right</span>
          <h2>A public record should not feel out of reach.</h2>
          <p>The RTI Act opens government records to citizens. It is for information that already exists—not for opinions, explanations or fixing an individual service complaint.</p>
        </div>
        <div className="fact-grid">
          <article><span>30</span><b>days for a usual response</b><p>Most requests should receive a decision within 30 days.</p></article>
          <article><span>48</span><b>hours for life or liberty</b><p>Urgent requests involving life or liberty have a shorter statutory window.</p></article>
          <article><span>₹10</span><b>standard Central RTI fee</b><p>No application fee for eligible Below Poverty Line citizens with proof.</p></article>
          <article><span>₹0</span><b>for a Central first appeal</b><p>If there is no response or the response is inadequate, the first appeal has no fee.</p></article>
        </div>
      </section>

      <section className="before-section" id="before">
        <div className="before-copy">
          <span className="section-kicker light">Before you request</span>
          <h2>First, make sure RTI is the right route.</h2>
          <p>A narrower, well-directed request gets a better answer. Three checks prevent most failed applications.</p>
          <button className="outline-light" onClick={openJourney} type="button">Check my request <span>→</span></button>
        </div>
        <div className="before-list">
          <article><b>01</b><div><h3>Look for records already online</h3><p>Budgets, tenders, circulars and reports may already be published. Search first and save the fee.</p></div></article>
          <article><b>02</b><div><h3>Ask for records, not an explanation</h3><p>Request copies, data, notes or correspondence. RTI cannot compel an authority to create an answer.</p></div></article>
          <article><b>03</b><div><h3>Choose the correct public authority</h3><p>Central and State authorities use different filing routes. This prototype routes both from one search.</p></div></article>
        </div>
      </section>

      <section className="records-search" id="search">
        <div className="search-heading">
          <span className="section-kicker">Search tool</span>
          <h2>Search public information first.</h2>
          <p>One search across proactive disclosures, frequently requested records and public authorities.</p>
        </div>
        <label className="big-search">
          <span aria-hidden="true">⌕</span>
          <input value={recordQuery} onChange={(event) => setRecordQuery(event.target.value)} placeholder="Try “railway station inspection report”" />
          <button type="button" onClick={() => setRecordQuery(recordQuery || 'railway station inspection report')}>Search</button>
        </label>
        {recordQuery && (
          <div className="search-results" aria-live="polite">
            <article><span className="result-type">Published record</span><h3>Station redevelopment: public works disclosures</h3><p>Ministry of Railways · Updated 18 July 2026</p><button type="button">View record →</button></article>
            <article><span className="result-type authority-tag">Public authority</span><h3>Ministry of Railways</h3><p>Railway Board, zones, policy and project records</p><button type="button" onClick={() => { setAuthority('Ministry of Railways'); openJourney(); setStep(2); }}>Start request →</button></article>
          </div>
        )}
        <div className="popular-searches"><span>Popular:</span><button onClick={() => setRecordQuery('PMAY beneficiary data')} type="button">PMAY beneficiary data</button><button onClick={() => setRecordQuery('Highway tender')} type="button">Highway tenders</button><button onClick={() => setRecordQuery('EPFO circulars')} type="button">EPFO circulars</button></div>
      </section>

      <section className="process-section">
        <div className="section-intro compact"><span className="section-kicker">A complete public service</span><h2>From question to accountable answer.</h2></div>
        <div className="process-line">
          {['Learn', 'Search', 'Find authority', 'Write clearly', 'Submit', 'Track', 'Appeal'].map((label, index) => <div key={label}><span>{String(index + 1).padStart(2, '0')}</span><b>{label}</b></div>)}
        </div>
      </section>

      <section className={`track-section ${submitted ? 'active-case' : ''}`} id="track">
        <div className="track-copy">
          <span className="section-kicker light">Track & appeal</span>
          <h2>{submitted ? 'Your mock request is on its way.' : 'No more guessing what happens next.'}</h2>
          <p>Every request gets a plain-language status, a visible statutory deadline and a clear next action.</p>
          {!submitted && <button className="outline-light" onClick={openJourney} type="button">Try the complete journey <span>→</span></button>}
        </div>
        <div className="status-card">
          <div className="status-top"><div><small>RTI registration number</small><b>{submitted ? 'RTI/MORLY/2026/804271' : 'DEMO / SAMPLE CASE'}</b></div><span className="status-pill">In review</span></div>
          <div className="deadline"><span><b>24</b> days left</span><div><small>Reply due by</small><strong>21 September 2026</strong></div></div>
          <ol className="timeline">
            <li className="done"><i /> <div><b>Request received</b><small>22 August · 3:18 PM</small></div></li>
            <li className="current"><i /> <div><b>Sent to the CPIO</b><small>Ministry of Railways</small></div></li>
            <li><i /> <div><b>Response due</b><small>We’ll explain your appeal options if it is late</small></div></li>
          </ol>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="rti-seal small">RTI</span><div><b>RTI.gov</b><small>A concept for informed citizenship</small></div></div>
        <div className="footer-links"><a href="#learn">RTI Act</a><a href="#before">Guidance</a><a href="#search">Public records</a><a href="#track">Status & appeals</a><a href="#top">Accessibility</a></div>
        <p>This independent competition prototype does not connect to any government system. All accounts, payments, records and tracking events are synthetic.</p>
        <p className="credit">Parliament photograph: Pinakpani / Wikimedia Commons, CC BY-SA 4.0.</p>
      </footer>

      {journeyOpen && (
        <div className="journey-overlay" role="dialog" aria-modal="true" aria-label="Create an RTI request">
          <div className="journey-shell">
            <header className="journey-header">
              <div className="mini-brand"><span className="rti-seal small">RTI</span><b>Create a request</b><em>Mock journey</em></div>
              <button className="close-button" onClick={closeJourney} type="button" aria-label="Close request journey">×</button>
            </header>
            <div className="stepper">
              {journeyLabels.map((label, index) => <div className={`${index === step ? 'current' : ''} ${index < step ? 'done' : ''}`} key={label}><span>{index < step ? '✓' : index + 1}</span><small>{label}</small></div>)}
            </div>
            <div className="journey-body">
              {step === 0 && (
                <section className="journey-step"><span className="step-kicker">Step 1 of 5 · Find the right route</span><h2>What outcome do you need?</h2><p>RTI works best when you ask for records that a public authority already holds.</p>
                  <div className="choice-stack">
                    <button className={fit === 'records' ? 'selected' : ''} onClick={() => setFit('records')} type="button"><span>▤</span><div><b>Get an existing record or document</b><small>Reports, files, notes, contracts, data or correspondence</small></div><i>✓</i></button>
                    <button className={fit === 'service' ? 'selected warning' : ''} onClick={() => setFit('service')} type="button"><span>↻</span><div><b>Fix a service or personal complaint</b><small>Use a grievance portal; RTI cannot order corrective action</small></div><i>!</i></button>
                    <button className={fit === 'opinion' ? 'selected warning' : ''} onClick={() => setFit('opinion')} type="button"><span>?</span><div><b>Ask “why” or seek an opinion</b><small>Reframe this as a request for the file noting or decision record</small></div><i>!</i></button>
                  </div>
                  {fit && fit !== 'records' && <div className="route-note"><b>RTI is not the strongest route yet.</b><span>{fit === 'service' ? 'A grievance can ask the authority to fix the problem. RTI can only reveal the records behind it.' : 'Ask for the recorded reasons, file noting or documents used to reach the decision.'}</span></div>}
                </section>
              )}
              {step === 1 && (
                <section className="journey-step"><span className="step-kicker">Step 2 of 5 · Public authority</span><h2>Who is likely to hold the record?</h2><p>Search by department, service or the subject of your information.</p>
                  <label className="authority-search"><span>⌕</span><input autoFocus value={authorityQuery} onChange={(event) => setAuthorityQuery(event.target.value)} placeholder="e.g. railway station, EPF, road project" /></label>
                  <div className="authority-results">{filteredAuthorities.map((item) => <button className={authority === item.name ? 'selected' : ''} key={item.name} onClick={() => setAuthority(item.name)} type="button"><div><span>{item.type}</span><b>{item.name}</b><small>{item.hint}</small></div><i>{authority === item.name ? '✓' : '→'}</i></button>)}</div>
                </section>
              )}
              {step === 2 && (
                <section className="journey-step"><span className="step-kicker">Step 3 of 5 · Describe the records</span><h2>Say exactly what you want.</h2><p>Specific records, a clear place and a date range help the CPIO search quickly.</p>
                  <div className="draft-meta"><span><small>To</small><b>{authority || 'Ministry of Railways'}</b></span><span><small>Character guide</small><b>{requestText.length} / 3,000</b></span></div>
                  <label className="textarea-label"><span>Your request</span><textarea value={requestText} onChange={(event) => { setRequestText(event.target.value); setDrafted(false); }} /></label>
                  <button className="draft-button" onClick={() => { setDrafted(true); setRequestText(`Please provide the following records under the Right to Information Act, 2005:\n\n1. Copies of inspection reports for the foot-over bridge work at Anand Vihar railway station between 1 April 2024 and 31 March 2025.\n2. A copy of the completion certificate issued for this work.\n3. The name and designation of the office that approved the completion certificate.\n\nI prefer to receive these records electronically.`); }} type="button"><span>✦</span>{drafted ? 'Draft clarified · mock assistant' : 'Make this request clearer'}<small>No new facts will be added</small></button>
                  {drafted && <div className="quality-checks"><span>✓ Asks for existing records</span><span>✓ Includes a date range</span><span>✓ No Aadhaar or PAN</span></div>}
                </section>
              )}
              {step === 3 && (
                <section className="journey-step"><span className="step-kicker">Step 4 of 5 · Review & submit</span><h2>One honest review before filing.</h2><p>This demo uses a synthetic citizen profile and a mock ₹10 payment. Nothing reaches a government system.</p>
                  <div className="review-grid"><article><small>Applicant</small><b>Aarav Demo</b><span>aarav.demo@example.in</span></article><article><small>Public authority</small><b>{authority || 'Ministry of Railways'}</b><span>Central Government</span></article><article className="review-request"><small>Records requested</small><p>{requestText}</p></article><article><small>Application fee</small><b>₹10</b><span>Mock UPI payment</span></article></div>
                  <label className="declaration"><input checked={declaration} onChange={(event) => setDeclaration(event.target.checked)} type="checkbox" /><span><b>I confirm this is a demonstration.</b><small>The identity, payment and submission are synthetic.</small></span></label>
                </section>
              )}
              {step === 4 && (
                <section className="receipt-step"><div className="success-mark">✓</div><span className="step-kicker">Mock request submitted</span><h2>Your request has a clear next step.</h2><p>No real request or payment was sent. This is how a citizen-facing receipt should work.</p>
                  <div className="receipt-number"><small>Registration number</small><b>RTI/MORLY/2026/804271</b><button type="button">Copy</button></div>
                  <div className="receipt-facts"><span><small>Submitted</small><b>22 August 2026</b></span><span><small>Response due</small><b>21 September 2026</b></span><span><small>Authority</small><b>{authority || 'Ministry of Railways'}</b></span></div>
                  <button className="primary-button wide" onClick={() => { closeJourney(); document.querySelector('#track')?.scrollIntoView({ behavior: 'smooth' }); }} type="button">View request status →</button>
                </section>
              )}
            </div>
            {step < 4 && <footer className="journey-actions"><button className="back-button" disabled={step === 0} onClick={() => setStep(step - 1)} type="button">← Back</button><div className="privacy-note">No Aadhaar or PAN required</div>{step < 3 ? <button className="primary-button" disabled={(step === 0 && fit !== 'records') || (step === 1 && !authority) || (step === 2 && !requestText.trim())} onClick={() => setStep(step + 1)} type="button">Continue →</button> : <button className="primary-button" disabled={!declaration || submitting} onClick={submitMockRequest} type="button">{submitting ? 'Submitting mock request…' : 'Pay ₹10 & submit →'}</button>}</footer>}
          </div>
        </div>
      )}
    </main>
  );
}
