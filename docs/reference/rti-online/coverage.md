# RTI Online public-site coverage

**Superseded for state-level work:** use `state-inventory.md` (labels VERIFIED_LIVE vs DOCUMENTED_ONLY). This file is the earlier route-level coverage table.

Generated: 2026-08-28T06:32:18.988Z

This is a public-citizen audit of https://rtionline.gov.in/. It is **not** 100% coverage. Screens behind captcha, OTP, a live registration number, login, payment or upload were recorded as BLOCKED and not forced.

## Counts

| Status | Count |
| --- | --- |
| interactively tested | 5 |
| blocked | 6 |
| captured | 5 |
| unreachable/broken | 2 |
| blocked states (gates) | 8 |

## Legend

- **discovered** — URL known from SiteOne or in-page links, not fully opened in this run
- **captured** — visited, snapshotted, controls extracted
- **interactively tested** — safe UI actions run (accordion, empty validation, guidelines checkbox)
- **blocked** — a public gate was reached; continuation needs captcha, OTP, credentials, a live registration number, payment or upload
- **unreachable/broken** — HTTP 4xx/5xx or navigation failure
- **not yet investigated** — implied by guidelines or FAQ but never served as a GET URL in this audit (request body, payment gateway, authenticated dashboard)

## Screens

| ID | Route | HTTP | Coverage | Blockers | Title |
| --- | --- | --- | --- | --- | --- |
| home | `/` | 200 | interactively tested | — | RTI Online :: Home \| Submit RTI Request \| Submit RTI First Appeal \| View RTI Status \| RTI FAQ |
| request-status-php | `/request/status.php` | 200 | blocked | captcha, valid-registration-number, otp, real-submission-gate | RTI Online :: View Status Form |
| login-php | `/login.php` | 200 | blocked | captcha, login, real-submission-gate | RTI Online :: Citizen Login Form |
| guidelines-php-appeal | `/guidelines.php?appeal` | 200 | interactively tested | — | RTI Online :: Guidelines for use of RTI Online Portal |
| request-status-pendingpayment-php | `/request/status_pendingPayment.php` | 200 | blocked | captcha, otp, real-submission-gate | RTI Online :: Online RTI Information System |
| contactus-php | `/Contactus.php` | 200 | captured | — | RTI Online :: Online RTI Information System |
| registration-php | `/registration.php` | 404 | unreachable/broken | — | HTTP 404 |
| guidelines-php-request | `/guidelines.php?request` | 200 | interactively tested | — | RTI Online :: Guidelines for use of RTI Online Portal |
| viewpdf-php-file-um-citizen-pdf | `/viewPDF.php?file=um_citizen.pdf` | 200 | captured | — | Citizen user manual PDF |
| request-allpa-php | `/request/allpa.php` | 200 | interactively tested | — | RTI Online :: Public Authorities available in portal |
| request-status-history-php | `/request/status_history.php` | 200 | blocked | captcha, otp, real-submission-gate | RTI Online :: Online RTI Information System |
| forgotpassword-php | `/forgotPassword.php` | 404 | unreachable/broken | — | HTTP 404 |
| faq-php | `/faq.php` | 200 | interactively tested | — | RTI Online :: Frequently Asked Questions |
| policies-php | `/Policies.php` | 200 | captured | — | RTI Online :: Online RTI Information System |
| request-audiofile1-php | `/request/audiofile1.php` | 200 | captured | — |  |
| audiofile1-php | `/audiofile1.php` | 200 | captured | — |  |
| request-request-email-check-php | `/request/request_email_check.php` | 200 | blocked | captcha, otp, real-submission-gate | RTI Online :: Online RTI Information System |
| appeal-firstappeal-php | `/appeal/firstAppeal.php` | 200 | blocked | captcha, valid-registration-number, real-submission-gate | RTI Online :: Submit First Appeal Form |

## Not yet investigated (implied, not served as a public GET)

- Full RTI request form after email OTP (ministry, public authority, applicant, BPL, 3000-char text, PDF, Make Payment)
- Payment gateway (internet banking / card / UPI / RuPay)
- Registration-number receipt and SMS/email notice
- First-appeal body after successful lookup
- Authenticated account dashboard / drafts
- Additional-fee payment from View Status
- Supporting-document upload from View Status
- Child registration numbers when a request is split across CPIOs
- Hindi-language full page set (control exists; language POST was not followed site-wide)

Request / appeal / status **body** fields for those blocked screens are documented from `source/um_citizen.pdf` in `flows/request-form-fields.md`. That is documentary coverage, not interactive capture.

