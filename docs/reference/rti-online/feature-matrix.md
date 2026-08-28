# Feature matrix: rtionline.gov.in vs this repository

Live UI evidence is only `VERIFIED_LIVE` / `VERIFIED_HUMAN_ASSISTED` in `state-inventory.md`. Rows that still sit behind captcha/OTP are **DOCUMENTED_ONLY** (from `source/um_citizen.pdf`) and must not be treated as live screenshots. See `unverified-manual-only.md`.

This prototype is an independent redesign. Matching a capability does not mean cloning the official UI.

| Status | Meaning |
| --- | --- |
| COMPLETE | The current app covers the citizen outcome |
| PARTIAL | Present but thinner, demo-only, or missing a branch |
| MISSING | Official capability with no counterpart |
| INTENTIONALLY IMPROVED | Official capability replaced by a clearer or safer design |
| NOT APPLICABLE | Official artefact that should not be reproduced |

## Shell and wayfinding

| Official capability | Evidence | Current app | Classification | Notes |
| --- | --- | --- | --- | --- |
| DoPT / Government of India masthead | live home | `site-chrome` | PARTIAL | Same institutional labels, plus an independent-prototype band |
| Primary nav: Request, First Appeal, Status, History, Login, User Manual, Contact, FAQ, Payment Reconciliation | live home | `site-chrome` | COMPLETE | Labels preserved |
| Public Authorities Available | live home → `/request/allpa.php` | `/authorities` | INTENTIONALLY IMPROVED | Official dump is 2,916 rows / ~75 ministries in one accordion. Prototype is a searchable subset with Central vs State routing |
| English / Hindi language select | live `#lan` | Hindi toggle in `gov-tools` | PARTIAL | Official POSTs to `layout/getLanguage.php`. Prototype only flips `documentElement.lang`; policies say English is the only complete language |
| A+ / A / A− text size | live home | `GovUtilityTools` | COMPLETE | |
| High-contrast black/white buttons | live utility bar | MISSING | MISSING | Official contrast toggles are unlabeled icon buttons |
| Skip to main content | not on official | `site-chrome` | INTENTIONALLY IMPROVED | Official has no skip link, no `lang`, no `<main>` |
| Central-only jurisdiction warning | live home (red box) | home + request | COMPLETE | |
| RTI lifecycle diagram | live home image | `/process` | INTENTIONALLY IMPROVED | Official image 404s if linked with a trailing slash. Prototype is a readable timeline |
| CIC second-appeal integration notice | live home + footer alert | `/commissions` | INTENTIONALLY IMPROVED | Official is an HTTP link to `dsscic.nic.in`. Prototype explains the handoff |
| Help desk 011-24010690/691, helprtionline-dopt[at]nic[dot]in, 9:00–5:30 | live home/contact | footer + `/contact` | COMPLETE | |
| National Portal of India footer link | live footer | footer | COMPLETE | |
| User manual PDF (`viewPDF.php?file=um_citizen.pdf`, 1.6 MB) | downloaded | `/guide` | INTENTIONALLY IMPROVED | HTML screen-by-screen manual instead of a 29-page PDF |
| Unique page titles / Open Graph / robots.txt / canonical | SiteOne: missing | `app/layout.tsx`, `robots.ts`, `sitemap.ts` | INTENTIONALLY IMPROVED | Official SEO 3.5; duplicate titles; `robots.txt` 404 |

## Submit request

| Official capability | Evidence | Current app | Classification | Notes |
| --- | --- | --- | --- | --- |
| Guidelines (21 points) + “I have read…” checkbox | live `/guidelines.php?request` | `PortalGuidelines` | COMPLETE | Unchecked Submit alerts “Please select the undertaking statement!” |
| Cancel guidelines → home | live | Back on step 0 | COMPLETE | |
| Email + optional mobile + captcha + OTP **before** the request form | live `/request/request_email_check.php` | MISSING as a hard gate | INTENTIONALLY IMPROVED | Prototype files with a demonstration security code and does not send OTP. Official OTPs do not expire until used |
| Search public authority, then ministry dropdown, then authority dropdown | manual p.5 | request step 1 | COMPLETE | Prototype also suggests an authority from the request text |
| Email, confirm email, name, gender (incl. Third Gender), address, pin, country, state, rural/urban, literate/illiterate, phone, mobile | manual p.5 | request step 1 | COMPLETE | Country = Other is rejected (Indian citizens only) |
| Citizenship locked to Indian | manual p.5 | read-only “Indian citizen” | COMPLETE | |
| BPL yes/no; if yes, certificate PDF ≤ 1 MB and no ₹10 | manual p.6 | BPL radios + PDF input + ₹0 path | PARTIAL | Official also asks BPL card no., year of issue, issuing authority. Prototype does not |
| Request text 3000 chars, restricted charset | live guidelines + manual | 3000-char textarea + count | PARTIAL | Prototype does not enforce the official charset filter |
| Supporting PDF ≤ 1 MB, no spaces in filename, no Aadhaar/PAN | live guidelines | optional PDF input + warning | COMPLETE | |
| Image captcha + audio captcha | live gates | demonstration code `RTI26` | INTENTIONALLY IMPROVED | Official audio WAV 404s (`/audio/en/.wav`). Audio popup also prints the captcha text (`VHN3D3` observed) |
| Non-BPL: Make Payment → SBI gateway (net banking, card, UPI, RuPay) | manual pp.8–10 | synthetic UPI / net banking / RuPay choice | INTENTIONALLY IMPROVED | No live payment. Official warns not to refresh or pay twice |
| BPL: Submit without payment | manual p.6 | Submit application when BPL | COMPLETE | |
| Registration number + Save/Print/Print Application + email/SMS | manual pp.7, 11 | prototype number, due date, copy, print | PARTIAL | Prototype number format differs from official `AAAAA/B/C/DD/EEEEE`. No email/SMS |
| Life-or-liberty 48-hour flag | not on official request form | urgent checkbox | INTENTIONALLY IMPROVED | Official does not expose this on the public form; the Act still requires it |
| Start from the citizen’s information need | not on official | home / request seed | INTENTIONALLY IMPROVED | Official starts at ministry name |

## Submit first appeal

| Official capability | Evidence | Current app | Classification | Notes |
| --- | --- | --- | --- | --- |
| Same guidelines + checkbox | live `/guidelines.php?appeal` | appeal step 0 | COMPLETE | |
| Lookup by original registration number + email + captcha | live `/appeal/firstAppeal.php` | appeal stage 0 + `RTI26` | PARTIAL | Prototype uses a demo security code, not a captcha |
| Pre-filled personal details from the original request | manual p.15 | source-request card | PARTIAL | Official re-shows the full applicant block; prototype shows id + subject |
| Ground for appeal dropdown | manual p.16 | select | COMPLETE | Official: refused; no response; unreasonable fee; incomplete/misleading/false; other. Prototype: no response; incomplete; wrongly denied; unreasonable fee; other |
| Appeal text + optional PDF + no fee | manual pp.16–17 | textarea 3000 + PDF + no-fee submit | COMPLETE | Manual contradicts itself (500 vs 3000). Prototype uses 3000 |
| Appeal registration number + print | manual p.17 | synthetic appeal id | PARTIAL | |

## View status

| Official capability | Evidence | Current app | Classification | Notes |
| --- | --- | --- | --- | --- |
| Registration number + email + captcha + OTP | live `/request/status.php` | `/status` + `RTI26` + demo OTP `240805` | PARTIAL | Same citizen outcome, synthetic credentials only |
| Case card: number, name, date, authority, status, remarks, nodal contacts | manual p.19 | case head + timeline | PARTIAL | Prototype timeline is demonstration, not CPIO remarks |
| Print application / print status | manual p.19 | Print acknowledgement | PARTIAL | |
| Additional fee → Make Payment | manual p.20 | “Pay additional fee” demo | PARTIAL | No SBI gateway |
| Supporting document required → upload PDF | manual p.21 | “Upload requested PDF” demo | PARTIAL | |
| Returned to applicant (State / NCT Delhi), no refund | manual p.22 | State route warning before payment | INTENTIONALLY IMPROVED | Prototype tries to prevent this misfile |
| Transfer → new registration number | manual p.23 | transfer copy on status | PARTIAL | |
| Split across CPIOs (`…/1`, `…/2`, `…/3`) | manual pp.24–25 | “View split CPIO cases” demo | PARTIAL | |

## View history and account

| Official capability | Evidence | Current app | Classification | Notes |
| --- | --- | --- | --- | --- |
| History via email + mobile + captcha + OTP | live `/request/status_history.php` | `/history` + demo OTP | PARTIAL | |
| Dashboard: registered / pending / disposed requests and appeals | manual p.28 | history metrics + filter | COMPLETE | |
| Searchable three-year list | manual p.29 + FAQ | history list | PARTIAL | Official uses DataTables pagination; prototype is a short synthetic list |
| Citizen login (username, password, hashed client-side, captcha) | live `/login.php` | `/login` demo `aarav.demo` / `rti@2026` | PARTIAL | Official hashes password in the browser (`md5.js` / `sha.js`). Prototype does not |
| Registration | `/registration.php` **404** | no sign-up | NOT APPLICABLE | Official advertises then 404s. Account is not required to file |
| Forgot password | `/forgotPassword.php` **404** | “View history with OTP” | INTENTIONALLY IMPROVED | Official recovery is dead |

## Payment reconciliation

| Official capability | Evidence | Current app | Classification | Notes |
| --- | --- | --- | --- | --- |
| Email + optional mobile + captcha to find a deducted payment | live `/request/status_pendingPayment.php` | `/payments` | COMPLETE | Same “do not pay again / wait 24–48 working hours” rule |
| Show whether a registration number was generated | FAQ + contact | demo transaction `RTIDEMO240822118` | PARTIAL | Synthetic match only |

## Information pages

| Official capability | Evidence | Current app | Classification | Notes |
| --- | --- | --- | --- | --- |
| FAQ (26 questions, accordion) | live `/faq.php` expanded | `/faq` | PARTIAL | Prototype covers the same topics in fewer, plainer items |
| Contact: help desk then Under Secretary (IR-1), Kartavya Bhavan 3 | live `/Contactus.php` | `/contact` | COMPLETE | |
| Policies: disclaimer, copyright, hyperlink, privacy | live `/Policies.php` | `/policies` | PARTIAL | Prototype adds prototype-boundary, accessibility and language honesty the official page lacks |
| Learn / search-before-filing / process timeline | not on official | `/learn`, `/search`, `/process` | INTENTIONALLY IMPROVED | Official has no education or disclosure search |
| Hindi full UI | language control exists; not crawled | not a complete Hindi UI | NOT APPLICABLE | Official language POST was not followed site-wide in this audit |

## Quality / defects on the official site that the prototype should not copy

| Official defect | Classification for this app |
| --- | --- |
| `registration.php` and `forgotPassword.php` 404 | NOT APPLICABLE |
| `/images/rti_lifecycle.jpg/` 404 (trailing slash) | NOT APPLICABLE |
| Audio captcha `/audio/en/.wav` 404 | NOT APPLICABLE |
| Audio popup reveals captcha text in the page | NOT APPLICABLE |
| 2,916-authority HTML dump (~674 kB, ~900 ms) | INTENTIONALLY IMPROVED |
| Session `pageid` MD5 query params duplicating every URL | NOT APPLICABLE |
| No `lang`, no `<main>`, unlabeled contrast buttons, missing form labels | INTENTIONALLY IMPROVED |
| Cookies / CSP / missing `robots.txt` (SiteOne security + SEO) | NOT APPLICABLE to this prototype host, but do not regress |

## Honest gaps in this prototype relative to a live filing service

These are **not** missing because of a redesign choice; they are out of scope until there is a real backend.

- Live captcha, OTP, email and SMS
- SBI (or other) payment gateway and bank scroll
- Full Central public-authority list (2,916)
- Durable case store, CPIO remarks, signed replies
- Hindi (and other Eighth Schedule languages) as complete UI
- Working account registration, if accounts remain part of the service
