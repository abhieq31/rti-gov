# Official RTI Online parity register

This is a functional redesign, not a visual clone. The official citizen portal and its current 29-page citizen manual were checked on 22 August 2026. Every existing citizen capability is either demonstrated in the prototype, preserved as an official hand-off, or identified as production integration work.

## Filing

| Official capability | RTI.gov redesign |
| --- | --- |
| Choose a Central public authority | Plain-language recommendation plus a searchable snapshot of the official authority hierarchy |
| Applicant name, address, email and optional SMS mobile | Three-decision filing flow; mobile is correctly optional |
| Gender, PIN, rural/urban, education and phone fields | Preserved under an optional progressive-disclosure section instead of blocking the core task |
| Indian citizenship declaration | One clear declaration at final review |
| RTI text up to 3,000 characters | 3,000-character limit with visible count |
| Supporting PDF up to 1 MB with filename constraints | Validated PDF control, exact filename rule and safe-document warning |
| BPL exemption with certificate | BPL selection, required proof and ₹0 receipt path |
| ₹10 fee by net banking, card/RuPay or UPI | All official modes represented; payment and registration are atomic in the target design |
| Unique registration and acknowledgement | Immediate synthetic registration, printable acknowledgement and explicit 30-day date |

## After filing

| Official capability | RTI.gov redesign |
| --- | --- |
| Nodal Officer forwards to concerned CPIO | Visible event trail with current accountable owner |
| Section 6(3) transfer | Linked-office view retains the parent and transfer destination |
| Split to multiple CPIOs and child registrations | Parent case plus three linked child registrations in one view |
| Additional records fee | In-case fee notice and atomic mock confirmation |
| Replace an unreadable supporting document | In-case replacement PDF without a new request |
| Status lookup | Secure prototype lookup and detailed statutory clock |
| Request and appeal history | Filterable history dashboard |
| First appeal with no fee | Original-registration lookup, grounds, PDF and appeal receipt |
| Second appeal / complaint | Commission directory and official hand-off |
| Login optional | Direct filing remains primary; prototype account/history remains available |
| Payment reconciliation | Legacy recovery view retained, but the redesigned filing path uses an idempotent payment intent so a successful payment never waits for reconciliation |
| 21 mandatory-entry guidelines | Complete content in a one-action opening sheet; the full list is expandable and never becomes a wall before the form |
| 26 current FAQ entries | Searchable, plain-language set covering every current question; obsolete certificate-bypass advice is explicitly corrected |

## Current official source data

- Portal and citizen-service navigation: <https://rtionline.gov.in/>
- Filing guidelines and operating rules: <https://rtionline.gov.in/guidelines.php>
- Citizen manual: <https://rtionline.gov.in/viewPDF.php?file=um_citizen.pdf>
- Current public-authority hierarchy: <https://rtionline.gov.in/request/allpa.php>
- Current status entry: <https://rtionline.gov.in/request/status.php>
- Current history entry: <https://rtionline.gov.in/request/status_history.php>
- Current FAQ: <https://rtionline.gov.in/faq.php>

The imported authority snapshot contains 3,114 hierarchy rows as served by the page; the official heading currently reports a total of 2,916 public authorities. We preserve both facts instead of silently forcing them to agree. The directory is dated, attributed and can be refreshed with `scripts/sync-authorities.mjs`.

## Production boundary

The prototype does not connect to a government case-management system, CPIO accounts, a payment gateway, SMS/email delivery or an Information Commission. Those require government authority, contracts, security assessment, data protection controls and operational ownership. The interaction and state model are implemented; external integrations are deliberately simulated and labelled.
