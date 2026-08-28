# Official lifecycle diagram (homepage)

**Label:** VERIFIED_LIVE (image on https://rtionline.gov.in/)  
**Screenshot:** `screenshots/desktop/home.lifecycle.png`  
**Asset URL:** `https://rtionline.gov.in/images/rti_lifecycle.jpg`

These nodes are **process outcomes drawn on the homepage**, not separate URLs. Do not treat them as captured form screens. Form/OTP/payment states remain DOCUMENTED_ONLY until human-assisted capture.

![Official RTI lifecycle](../screenshots/desktop/home.lifecycle.png)

## Graph (as drawn)

```mermaid
flowchart TD
  REQ[RTI REQUEST]
  REQ -->|30 days| REPLY[REPLY]
  REQ -->|5 days| TRANSFER[TRANSFER]
  REQ -->|30 days| NOREPLY[NO REPLY]

  REPLY --> SAT1[SATISFIED]
  REPLY --> NS1[Not Satisfied]

  TRANSFER -->|30 days| TREPLY[REPLY]
  TRANSFER -->|30 days| TNOREPLY[No REPLY]
  TREPLY --> NS1
  TNOREPLY -->|30 days| FA[FIRST APPEAL]
  TNOREPLY -->|AND no time limit| S18[SECTION 18 COMPLAINT TO CIC]

  NS1 -->|30 days| FA
  NOREPLY --> FA
  NOREPLY -->|AND no time limit| S18

  FA -->|45 days| DEC[DECISION]
  FA -->|45 days| NOD[NO DECISION]
  DEC --> SAT2[SATISFIED]
  DEC --> NS2[Not Satisfied]
  NS2 -->|90 days| SA[SECOND APPEAL TO CIC / SIC]
  NOD -->|90 days| SA
```

## Statutory times shown on the diagram

| Edge | Days shown | Meaning on the official graphic |
| --- | --- | --- |
| Request → Reply | 30 | Usual reply clock |
| Request → Transfer | 5 | Transfer to another public authority |
| After transfer → Reply / No reply | 30 | Clock at the receiving authority |
| Request → No reply | 30 | Silence |
| Not satisfied / no reply → First appeal | 30 | Time to file first appeal (as drawn) |
| No reply **and** no time limit | — | Section 18 complaint to CIC (parallel, not instead of, first appeal) |
| First appeal → Decision / no decision | 45 | First appellate authority |
| Not satisfied or no decision → Second appeal CIC/SIC | 90 | |

The diagram does **not** show the 48-hour life-or-liberty clock. That clock is in the Act and in this prototype; it is not a homepage control.

## Related live screens

- First appeal **filing** starts at `first-appeal.guidelines` (VERIFIED_LIVE), then captcha lookup.
- Second appeal is **external**: CIC portal, not a page on rtionline.gov.in.
- Section 18 complaint is the same external CIC path.
