# Product architecture

## The problem

The existing RTI transaction portal begins with administrative choices. A citizen first needs to know whether RTI is the right route, whether the information is already public, which authority holds it, what a precise request looks like and what happens after submission.

RTI.gov treats that entire journey as the service. The main flow starts with the citizen's own sentence, infers a likely authority from subject and location, asks only for contact details, combines payment with registration and ends with visible proof and a calculated deadline.

## Information architecture

| Route | Citizen outcome |
| --- | --- |
| `/` | State the information need immediately or choose search/track |
| `/learn` | Understand rights, limits, fees, timelines and remedies |
| `/guide` | Follow the request process from research to reply |
| `/search` | Search synthetic proactive disclosures before filing |
| `/authorities` | Identify a likely Central, State or local public authority |
| `/resources` | Use one curated library for official Acts, Rules, circulars, guides, reports, open data and training |
| `/commissions` | Reach the Central or appropriate State Information Commission for oversight and second-stage remedies |
| `/glossary` | Understand RTI administrative terms in plain language |
| `/request` | Complete a three-decision mock RTI application and receive a registration number with an exact due date |
| `/status` | View ownership, transfers, deadlines, fees and replies securely |
| `/appeal` | Prepare a mock first appeal without a fee |
| `/history` | See requests and appeals in one citizen history |
| `/payments` | Reconcile a mock payment before paying again |
| `/login` | Enter the synthetic passwordless citizen account |
| `/faq` | Resolve common procedural questions |
| `/contact` | Find the right kind of support |

## Legal rules represented

- Every citizen has a right to information.
- Requests may be made in English, Hindi or the official language of the area.
- An applicant is not required to give a reason for requesting information.
- A request that belongs with another Central authority should be transferred within five days.
- The usual response period is 30 days; life-or-liberty information is due within 48 hours.
- The Central application fee is ₹10, with a BPL exemption on valid proof.
- Information is free when the authority misses the statutory time limit.
- First and second appeals are treated as visible parts of the same case journey.

The interface explains these rules in plain language; it is not legal advice.

## Source architecture

The portal deliberately separates explanation from authority. RTI.gov provides the citizen-facing structure; DoPT, RTI Online, the Central Information Commission, State Information Commissions and the Open Government Data Platform remain the sources of record. Official external destinations are labelled and open separately. The curated links were checked on 22 August 2026 and should be monitored in production because government URLs change.

## Primary interaction contract

1. The citizen starts with the information they want, not an authority name.
2. The service recommends a likely Central, State or local route from the subject and selected State/UT; the citizen can override it.
3. The service asks for contact and delivery details without requesting Aadhaar, PAN or banking information.
4. Review is one screen. Fee selection, declaration and registration are one final action.
5. Success is not “submitted.” It is a visible prototype registration number, filing date, authority, fee, delivery format and statutory due date.

The demo calculates 30 calendar days for an ordinary request and 48 hours when the citizen explicitly selects the life-or-liberty condition. Production deadline logic would need to represent every statutory exception and authority-specific rule.

## Technical model

The site uses the Next.js App Router and React client components. All demonstrations run against synthetic in-memory data and device-local browser storage. There is no production authentication, database, upload store, payment gateway or government API integration.

Moving from prototype to an official service would require government ownership, a verified domain, security and privacy assessment, accessible multilingual content, production identity and payment systems, signed integrations with Central and State RTI services, durable audit logs, records retention rules and operational support.
