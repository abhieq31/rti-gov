'use client';

import Link from 'next/link';
import { useState, type CSSProperties } from 'react';

const oldLinks = ['Home', 'Submit Request', 'Submit First Appeal', 'View Status', 'View History', 'Login', 'User Manual', 'Contact Us', 'FAQ', 'Payment Reconciliation'];

export function DesignComparison() {
  const [position, setPosition] = useState(50);
  const style = { '--compare-position': `${position}%` } as CSSProperties;

  return (
    <div className="design-comparison" style={style}>
      <div className="comparison-stage">
        <div className="comparison-screen comparison-old" aria-hidden="true">
          <div className="old-utility">Select Language: English &nbsp; | &nbsp; Public Authorities Available</div>
          <div className="old-brand"><span>◎</span><div><b>RTI Online</b><small>Version 2.0 · Department of Personnel &amp; Training</small></div></div>
          <div className="old-nav">{oldLinks.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="old-body">
            <div className="old-notice"><b>Online RTI Information System</b><p>Please do not file RTI applications through this portal for public authorities under State Governments.</p></div>
            <div className="old-columns"><div><b>Submit RTI Request</b><p>Read the instructions carefully before submitting request.</p><button>Click here for Submit Request</button></div><div><b>Help Desk</b><p>For any query or feedback related to this portal, contact during office hours.</p></div></div>
          </div>
          <div className="old-footer">Home | National Portal of India | Complaint &amp; Second Appeal to CIC | FAQ | Policy</div>
        </div>

        <div className="comparison-screen comparison-new" aria-hidden="true">
          <div className="new-utility"><span>भारत · India</span><small>Right to Information · Citizen service</small></div>
          <div className="new-nav"><b><i>✺</i> RTI Online</b><span>File request</span><span>Track</span><span>Appeal</span><button>Citizen login →</button></div>
          <div className="new-body">
            <span className="new-kicker">ONE GUIDED PUBLIC SERVICE</span>
            <h3>Ask for the record.<br/><em>We’ll handle the route.</em></h3>
            <p>Describe what you need in your own words. Find published information first, identify the authority and leave with a visible deadline.</p>
            <div className="new-search"><span>⌕</span><b>What information are you looking for?</b><button>Start →</button></div>
            <div className="new-trust"><span><b>₹10</b> Central fee</span><span><b>30 days</b> usual reply</span><span><b>1 case</b> through appeal</span></div>
          </div>
          <div className="new-route"><span>1 · Search first</span><span>2 · Confirm authority</span><span>3 · File with proof</span></div>
        </div>

        <div className="comparison-divider" aria-hidden="true"><span>↔</span></div>
        <span className="comparison-label comparison-label-old">Current portal</span>
        <span className="comparison-label comparison-label-new">Proposed service</span>
        <input
          className="comparison-range"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Reveal proposed design compared with the current RTI Online portal"
          aria-valuetext={`${position}% proposed design revealed`}
        />
      </div>
      <div className="comparison-instruction"><span aria-hidden="true">↔</span><p><b>Drag the line.</b> The service model changes, not merely the colours.</p></div>
    </div>
  );
}

const parity = [
  ['Submit RTI request', 'Guided record description, authority routing, BPL handling, fee choice and synthetic receipt.', '/request'],
  ['Submit first appeal', 'Original-case lookup, eligibility check, grounds and a no-fee appeal receipt.', '/appeal'],
  ['View status', 'OTP demonstration, ownership, case events, reply date and next action.', '/status'],
  ['View history', 'A three-year-style case dashboard with requests, transfers, payments and appeals.', '/history'],
  ['Payment reconciliation', 'A safe transaction lookup that prevents duplicate payment in the demonstration.', '/payments'],
  ['Citizen login', 'A prototype account entry point without collecting or authenticating real credentials.', '/login'],
  ['User manual & FAQ', 'Plain-language preparation, attachment, fee, deadline and remedy guidance.', '/guide'],
  ['CIC second appeal', 'A clear handoff from first appeal to the correct Information Commission route.', '/commissions'],
] as const;

export function ServiceParity() {
  return <section className="parity-section" aria-labelledby="parity-title">
    <div className="parity-intro"><span className="page-eyebrow">Service parity</span><h2 id="parity-title">Nothing essential was cut.<br/>The confusion was.</h2><p>The current Central RTI Online functions remain visible as complete citizen journeys. Real submission, OTP, payment and CIC data exchange require Government of India APIs and authorization; this concept uses synthetic data and never claims otherwise.</p></div>
    <div className="parity-grid">{parity.map(([title, text, href], index) => <Link href={href} key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><b>{title}</b><p>{text}</p></div><i aria-hidden="true">→</i></Link>)}</div>
  </section>;
}
