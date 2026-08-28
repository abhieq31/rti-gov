export const authorities = [
  { name: 'Ministry of Railways', code: 'MORLY', level: 'Central', topics: 'Railway Board, stations, safety, projects and policy records', route: 'File online here' },
  { name: 'Employees’ Provident Fund Organisation', code: 'EPFO', level: 'Central', topics: 'EPF administration, circulars, claims policy and office records', route: 'File online here' },
  { name: 'Ministry of Road Transport & Highways', code: 'MORTH', level: 'Central', topics: 'National highways, rules, tenders and programme records', route: 'File online here' },
  { name: 'Department of Personnel & Training', code: 'DOP&T', level: 'Central', topics: 'RTI policy, service rules, orders and administrative records', route: 'File online here' },
  { name: 'Municipal Corporation of Delhi', code: 'MCD', level: 'Local', topics: 'Property, sanitation, building permissions and public works', route: 'Route to local authority' },
  { name: 'Government of Maharashtra', code: 'MH', level: 'State', topics: 'State departments, districts and local public authorities', route: 'Continue on State portal' },
  { name: 'Government of Karnataka', code: 'KA', level: 'State', topics: 'State departments, boards and municipal authorities', route: 'Continue on State portal' },
  { name: 'Government of Gujarat', code: 'GJ', level: 'State', topics: 'State departments, districts and urban local bodies', route: 'Continue on State portal' },
];

export const disclosures = [
  { title: 'Station redevelopment works: inspection and safety disclosures', authority: 'Ministry of Railways', type: 'Proactive disclosure', date: '18 July 2026', topic: 'railway station inspection safety report work' },
  { title: 'EPFO circulars and office orders, 2025–26', authority: 'Employees’ Provident Fund Organisation', type: 'Circular collection', date: '2 August 2026', topic: 'epfo pension circular office order' },
  { title: 'National highway tenders and awarded contracts', authority: 'Ministry of Road Transport & Highways', type: 'Open dataset', date: '11 August 2026', topic: 'highway tender contract project' },
  { title: 'RTI annual returns and public-authority performance', authority: 'Central Information Commission', type: 'Annual report', date: '30 June 2026', topic: 'rti annual report performance backlog' },
  { title: 'PMAY-U scheme guidelines and sanctioned project lists', authority: 'Ministry of Housing & Urban Affairs', type: 'Programme record', date: '7 May 2026', topic: 'pmay housing beneficiary sanctioned list' },
];

export const faqs = [
  ['Who can file an RTI request?', 'Any citizen of India can seek records under the Right to Information Act, 2005. This prototype uses synthetic applicant details.'],
  ['What can I ask for?', 'Ask for existing records: documents, file notings, reports, data, contracts, correspondence or certified copies. A public authority is not required to create a new explanation or opinion.'],
  ['What is the application fee?', 'The prescribed Central RTI application fee is ₹10 for non-BPL applicants. Eligible Below Poverty Line applicants do not pay the fee when valid proof is provided.'],
  ['How long should a response take?', 'The usual statutory period is 30 days. Information concerning life or liberty has a 48-hour timeline. Other statutory situations can vary.'],
  ['What if I chose the wrong authority?', 'For aligned Central authorities, the request may be transferred under section 6(3). State public authorities require the appropriate State route. This concept makes that distinction before payment.'],
  ['Is an account mandatory?', 'No. The current Central portal allows direct filing. An account is useful for history, saved drafts and notifications; this concept keeps direct filing available.'],
  ['How do I file a first appeal?', 'Use the original registration number and email address, select the ground for appeal, state your case and submit. No fee is charged for a Central first appeal.'],
  ['What if payment was deducted but no registration number arrived?', 'Do not pay repeatedly. Use payment reconciliation and allow 24–48 working hours for bank reconciliation in the current system.'],
] as const;

export const demoRequests = [
  { id: 'RTI/MORLY/2026/804271', subject: 'Anand Vihar foot-over bridge records', authority: 'Ministry of Railways', status: 'With CPIO', due: '21 Sep 2026', kind: 'Request' },
  { id: 'RTI/EPFO/2026/792184', subject: 'Regional office inspection circulars', authority: 'Employees’ Provident Fund Organisation', status: 'Reply received', due: 'Closed 14 Aug 2026', kind: 'Request' },
  { id: 'RTI/MORTH/A/2026/10842', subject: 'First appeal: highway tender evaluation', authority: 'Ministry of Road Transport & Highways', status: 'Appeal in review', due: '5 Sep 2026', kind: 'Appeal' },
];
