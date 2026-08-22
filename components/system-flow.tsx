'use client';

import { useState } from 'react';

const stages = [
  { public: 'Request registered', office: 'Portal receipt', owner: 'RTI Online', detail: 'Payment is confirmed, a registration number is created and the citizen receives email/SMS acknowledgement.' },
  { public: 'Being routed', office: 'Nodal triage', owner: 'Ministry Nodal Officer', detail: 'The Ministry-level Nodal Officer checks subject ownership and selects one or more CPIOs.' },
  { public: 'With concerned CPIO', office: 'CPIO examination', owner: 'Designated CPIO', detail: 'The CPIO tests jurisdiction, locates records, asks record custodians for material and checks statutory exemptions.' },
  { public: 'Records being compiled', office: 'Section response due', owner: 'Record-holding section', detail: 'Internal sections provide files, notes, data or certified copies to the CPIO. Accountability remains with the CPIO.' },
  { public: 'Reply issued', office: 'Case disposed', owner: 'CPIO', detail: 'The reply, denial reasons, additional-fee notice or transfer details are recorded and delivered through the portal.' },
] as const;

const exceptions = [
  ['Wrong Central authority', 'Nodal Officer transfers electronically under Section 6(3) when the receiving authority is on the portal; otherwise the transfer may be physical.', 'Transfer trail and new owner stay visible'],
  ['Several CPIOs hold parts', 'The Nodal Officer splits the application. Each part gets a linked registration number and may produce a separate reply.', 'One parent case, linked child cases'],
  ['Additional copying fee', 'The CPIO issues an itemised fee intimation. The citizen pays from status tracking before records are released.', 'Clock and payment event are recorded'],
  ['Supporting file cannot be read', 'The portal asks the citizen to upload a replacement document against the same registration.', 'No fresh application or payment'],
  ['No reply or unsatisfactory reply', 'The citizen files a first appeal against the relevant registration number to the designated First Appellate Authority.', 'Appeal remains attached to the original case'],
] as const;

export function SystemFlow() {
  const [stage, setStage] = useState(0);
  const [view, setView] = useState<'citizen' | 'office'>('citizen');
  const current = stages[stage];
  return <>
    <section className="flow-simulator" aria-label="RTI lifecycle demonstration">
      <div className="sim-head">
        <div><span className="section-tag">Live case model</span><h2>One case. Two truthful views.</h2><p>The citizen sees ownership and the next action. The department sees the work queue, accountable officer and statutory clock.</p></div>
        <div className="view-switch" role="group" aria-label="Choose case view"><button className={view === 'citizen' ? 'active' : ''} onClick={() => setView('citizen')} type="button">Citizen view</button><button className={view === 'office' ? 'active' : ''} onClick={() => setView('office')} type="button">Department view</button></div>
      </div>
      <div className="sim-casebar"><div><small>Demonstration case</small><b>RTI/MORLY/2026/804271</b></div><div><small>Authority</small><b>Ministry of Railways</b></div><div><small>Statutory due date</small><b>21 September 2026</b></div><span className="case-live">Day 6 of 30</span></div>
      <div className="sim-body">
        <ol className="sim-timeline">{stages.map((item,index)=><li key={item.public} className={index < stage ? 'done' : index === stage ? 'active' : ''}><button onClick={() => setStage(index)} type="button"><i>{index < stage ? '✓' : index+1}</i><span><b>{view === 'citizen' ? item.public : item.office}</b><small>{item.owner}</small></span></button></li>)}</ol>
        <article className="sim-detail">
          <span className="section-tag">{view === 'citizen' ? 'What the citizen sees' : 'What the office must do'}</span>
          <h3>{view === 'citizen' ? current.public : current.office}</h3>
          <p>{current.detail}</p>
          <dl><div><dt>Accountable owner</dt><dd>{current.owner}</dd></div><div><dt>Public timestamp</dt><dd>{stage === 0 ? '22 Aug · 3:18 PM' : `${23 + stage} Aug · 10:${10 + stage} AM`}</dd></div><div><dt>Clock</dt><dd>{stage === 4 ? 'Disposed on day 18' : `${30 - (stage * 4 + 2)} days remaining`}</dd></div></dl>
          <div className="sim-actions"><button disabled={stage === 0} onClick={() => setStage(stage-1)} type="button">← Previous</button><button disabled={stage === stages.length-1} onClick={() => setStage(stage+1)} type="button">Advance case →</button></div>
        </article>
      </div>
    </section>

    <section className="exception-section"><div className="section-heading"><span className="section-tag">Real cases branch</span><h2>The system must handle the exceptions without losing the citizen.</h2><p>The old portal exposes separate numbers and disconnected events. The proposed service keeps them under one parent case while preserving every statutory record.</p></div><div className="exception-table" role="table" aria-label="RTI case exceptions"><div className="exception-row table-head" role="row"><b role="columnheader">Situation</b><b role="columnheader">Official handling</b><b role="columnheader">Redesigned citizen record</b></div>{exceptions.map(([situation,handling,record])=><div className="exception-row" role="row" key={situation}><b role="cell">{situation}</b><p role="cell">{handling}</p><span role="cell">{record}</span></div>)}</div></section>
  </>;
}
