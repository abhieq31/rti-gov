export const authorities = [
  { name: 'Railway Board', code: 'MORLY', ministry: 'Ministry of Railways', level: 'Central', topics: 'Stations, safety, projects, policy and Railway Board records', route: 'File online here' },
  { name: 'Northern Railway', code: 'NR', ministry: 'Ministry of Railways', level: 'Central', topics: 'Zonal railway operations, stations and works in the northern region', route: 'File online here' },
  { name: 'Employees’ Provident Fund Organisation', code: 'EPFO', ministry: 'Ministry of Labour and Employment', level: 'Central', topics: 'EPF administration, circulars, claims policy and office records', route: 'File online here' },
  { name: 'Ministry of Road Transport & Highways', code: 'MORTH', ministry: 'Ministry of Road Transport and Highways', level: 'Central', topics: 'National highways, rules, tenders and programme records', route: 'File online here' },
  { name: 'National Highways Authority of India', code: 'NHAI', ministry: 'Ministry of Road Transport and Highways', level: 'Central', topics: 'NHAI projects, toll, contracts and highway development records', route: 'File online here' },
  { name: 'Department of Personnel & Training', code: 'DOPT', ministry: 'Ministry of Personnel, Public Grievances and Pensions', level: 'Central', topics: 'RTI policy, service rules, orders and administrative records', route: 'File online here' },
  { name: 'Department of Posts', code: 'DOP', ministry: 'Ministry of Communications', level: 'Central', topics: 'Postal services, post offices, mail and departmental records', route: 'File online here' },
  { name: 'Central Board of Direct Taxes', code: 'CBDT', ministry: 'Ministry of Finance', level: 'Central', topics: 'Income-tax administration, circulars and departmental records', route: 'File online here' },
  { name: 'Ministry of Home Affairs', code: 'MHA', ministry: 'Ministry of Home Affairs', level: 'Central', topics: 'Internal security, citizenship, census and Union Territory administration', route: 'File online here' },
  { name: 'Ministry of Education', code: 'MOE', ministry: 'Ministry of Education', level: 'Central', topics: 'School, higher education and scholarship policy records', route: 'File online here' },
  { name: 'Ministry of Health and Family Welfare', code: 'MOHFW', ministry: 'Ministry of Health and Family Welfare', level: 'Central', topics: 'Hospitals, public health programmes and health policy records', route: 'File online here' },
  { name: 'Ministry of Housing and Urban Affairs', code: 'MOHUA', ministry: 'Ministry of Housing and Urban Affairs', level: 'Central', topics: 'Urban schemes, housing programmes and municipal policy records', route: 'File online here' },
  { name: 'Municipal Corporation of Delhi', code: 'MCD', ministry: 'Government of NCT of Delhi', level: 'Local', topics: 'Property, sanitation, building permissions and public works', route: 'Route to local authority' },
  { name: 'Government of Maharashtra', code: 'MH', ministry: 'Government of Maharashtra', level: 'State', topics: 'State departments, districts and local public authorities', route: 'Continue on State portal' },
  { name: 'Government of Karnataka', code: 'KA', ministry: 'Government of Karnataka', level: 'State', topics: 'State departments, boards and municipal authorities', route: 'Continue on State portal' },
  { name: 'Government of Gujarat', code: 'GJ', ministry: 'Government of Gujarat', level: 'State', topics: 'State departments, districts and urban local bodies', route: 'Continue on State portal' },
] as const;

export const centralAuthorities = authorities.filter((item) => item.level === 'Central');
export const centralMinistries = [...new Set(centralAuthorities.map((item) => item.ministry))];

export const disclosures = [
  { title: 'Station redevelopment works: inspection and safety disclosures', authority: 'Ministry of Railways', type: 'Proactive disclosure', date: '18 July 2026', topic: 'railway station inspection safety report work' },
  { title: 'EPFO circulars and office orders, 2025–26', authority: 'Employees’ Provident Fund Organisation', type: 'Circular collection', date: '2 August 2026', topic: 'epfo pension circular office order' },
  { title: 'National highway tenders and awarded contracts', authority: 'Ministry of Road Transport & Highways', type: 'Open dataset', date: '11 August 2026', topic: 'highway tender contract project' },
  { title: 'RTI annual returns and public-authority performance', authority: 'Central Information Commission', type: 'Annual report', date: '30 June 2026', topic: 'rti annual report performance backlog' },
  { title: 'PMAY-U scheme guidelines and sanctioned project lists', authority: 'Ministry of Housing & Urban Affairs', type: 'Programme record', date: '7 May 2026', topic: 'pmay housing beneficiary sanctioned list' },
];

export const glossary = {
  'public-authority': {
    title: 'Public authority',
    text: 'A ministry, department or other body of the Central Government that holds public records and must answer RTI requests.',
  },
  cpio: {
    title: 'CPIO',
    text: 'Central Public Information Officer. The officer who searches for the record, decides what can be disclosed and sends the reply.',
  },
  nodal: {
    title: 'Nodal Officer',
    text: 'Receives the online application for a public authority and transmits it to the concerned CPIO.',
  },
  'first-appeal': {
    title: 'First appeal',
    text: 'A no-fee challenge to delay, denial, incomplete information or an unreasonable additional fee. Filed with the First Appellate Authority.',
  },
  bpl: {
    title: 'Below Poverty Line',
    text: 'Eligible BPL applicants do not pay the ₹10 application fee when valid proof is attached. Do not upload Aadhaar or PAN.',
  },
  transfer: {
    title: 'Transfer',
    text: 'If a Central authority does not hold the record, it should transfer the request to the authority that does, ordinarily within five days.',
  },
  'life-liberty': {
    title: 'Life or liberty',
    text: 'Information concerning a person’s life or liberty must be provided within 48 hours. Use this only for a genuine urgent matter.',
  },
  cic: {
    title: 'Central Information Commission',
    text: 'The independent body that hears second appeals and complaints against Central public authorities after a first appeal.',
  },
  proactive: {
    title: 'Proactive disclosure',
    text: 'Records that a public authority must publish on its own under section 4 of the RTI Act, without waiting for a request.',
  },
  exemption: {
    title: 'Exemption',
    text: 'A lawful ground under the RTI Act for withholding a record, such as privacy, national security or cabinet papers. The rest of the record can still be given.',
  },
} as const;

export type GlossaryId = keyof typeof glossary;

export const faqs = [
  ['Who can file an RTI request?', 'Any citizen of India can seek records under the Right to Information Act, 2005. This prototype uses synthetic applicant details.'],
  ['What can I ask for?', 'Ask for existing records: documents, file notings, reports, data, contracts, correspondence or certified copies. A public authority is not required to create a new explanation or opinion.'],
  ['What is the application fee?', 'The prescribed Central RTI application fee is ₹10 for non-BPL applicants. Eligible Below Poverty Line applicants do not pay the fee when valid proof is provided.'],
  ['How long should a response take?', 'The usual statutory period is 30 days. Information concerning life or liberty has a 48-hour timeline. Other statutory situations can vary.'],
  ['What if I chose the wrong authority?', 'For aligned Central authorities, the request may be transferred under section 6(3). State public authorities require the appropriate State route. This concept makes that distinction before payment.'],
  ['Is an account mandatory?', 'No. The current Central portal allows direct filing. An account is useful for history, saved drafts and notifications; this concept keeps direct filing available.'],
  ['How do I file a first appeal?', 'Use the original registration number and email address, select the ground for appeal, state your case and submit. No fee is charged for a Central first appeal.'],
  ['What if payment was deducted but no registration number arrived?', 'Do not pay repeatedly. Use payment reconciliation and allow 24–48 working hours for bank reconciliation in the current system.'],
  ['How do I upload a document requested by the authority?', 'Open View Status with the registration number and the email used to file. The known demonstration does not send a code to a mailbox. When the case asks for a supporting document, upload one PDF up to the permitted size.'],
  ['Why did one request generate several registration numbers?', 'A Nodal Officer may forward different parts of one request to several CPIOs. Each part receives a child registration number, a separate status and potentially a separate reply.'],
  ['Can I appeal an application filed outside the portal?', 'An online first appeal normally begins from an online request registration number. If a physical application was later lodged in the portal and a number was issued, that number may support the online appeal flow.'],
  ['How long are cases visible online?', 'View Status and View History retain online request and first-appeal cases for three years.'],
] as const;

export const demoRequests = [
  { id: 'RTI/MORLY/2026/804271', subject: 'Inspection report for Anand Vihar railway station', authority: 'Railway Board', status: 'With CPIO', due: '21 Sep 2026', filed: '22 Aug 2026', kind: 'Request', email: 'aarav.demo@example.in' },
  { id: 'RTI/EPFO/2026/792184', subject: 'Regional office inspection circulars', authority: 'Employees’ Provident Fund Organisation', status: 'Reply received', due: 'Closed 14 Aug 2026', kind: 'Request' },
  { id: 'RTI/MORTH/A/2026/10842', subject: 'First appeal: highway tender evaluation', authority: 'Ministry of Road Transport & Highways', status: 'Appeal in review', due: '5 Sep 2026', kind: 'Appeal' },
];
