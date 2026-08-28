'use client';

import { useState } from 'react';

export function CicHandoff() {
  const [registration, setRegistration] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [retrieved, setRetrieved] = useState(false);

  const fillDemo = () => {
    setRegistration('RTI/DOPT/A/2026/10482');
    setEmail('aarav.demo@example.in');
    setDate('2026-08-28');
    setRetrieved(false);
  };

  return <section className="cic-handoff" aria-labelledby="cic-handoff-title">
    <div className="cic-handoff-intro"><span className="page-eyebrow light">CIC integration concept</span><h2 id="cic-handoff-title">Carry the case forward.<br/>Never type it twice.</h2><p>The official RTI Online portal says its first-appeal details can be retrieved in the CIC second-appeal filing portal. This demonstration shows how that handoff should feel.</p><button type="button" onClick={fillDemo}>Fill demonstration details</button></div>
    <div className="cic-retrieval">
      {!retrieved ? <form onSubmit={(event) => { event.preventDefault(); setRetrieved(true); }}>
        <div><span>Retrieve first appeal</span><b>Three details. One continuous case.</b></div>
        <label><span>First appeal registration number</span><input required value={registration} onChange={(event) => setRegistration(event.target.value)} /></label>
        <label><span>Email used for the appeal</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label><span>Date first appeal was filed</span><input required type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
        <button className="button-primary" type="submit">Retrieve mock case →</button>
        <small>No CIC or government system is contacted.</small>
      </form> : <div className="cic-case">
        <span className="receipt-check">✓</span><small>Mock case retrieved</small><h3>The record is ready for second appeal.</h3>
        <dl><div><dt>First appeal</dt><dd>{registration}</dd></div><div><dt>Applicant</dt><dd>{email}</dd></div><div><dt>Filed</dt><dd>{date}</dd></div><div><dt>Authority</dt><dd>Department of Personnel &amp; Training</dd></div></dl>
        <p>In a production integration, the CIC portal would receive the verified RTI request, reply and first-appeal record through an authorized data exchange.</p>
        <button className="button-secondary" type="button" onClick={() => setRetrieved(false)}>Start again</button>
      </div>}
    </div>
  </section>;
}
