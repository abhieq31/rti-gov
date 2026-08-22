# Product architecture

## The problem

The existing RTI transaction portal begins with administrative choices. A citizen first needs to know whether RTI is the right route, whether the information is already public, which authority holds it, what a precise request looks like and what happens after submission.

RTI.gov treats that entire journey as the service.

## Information architecture

| Route | Citizen outcome |
| --- | --- |
| `/` | Understand the national purpose and choose the right first step |
| `/learn` | Understand rights, limits, fees, timelines and remedies |
| `/guide` | Follow the request process from research to reply |
| `/search` | Search synthetic proactive disclosures before filing |
| `/authorities` | Identify a likely Central, State or local public authority |
| `/request` | Complete a guided mock RTI application and receive a receipt |
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

## Technical model

The site uses the Next.js App Router and React client components. All demonstrations run against synthetic in-memory data and device-local browser storage. There is no production authentication, database, upload store, payment gateway or government API integration.

Moving from prototype to an official service would require government ownership, a verified domain, security and privacy assessment, accessible multilingual content, production identity and payment systems, signed integrations with Central and State RTI services, durable audit logs, records retention rules and operational support.

