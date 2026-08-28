# Official RTI Online — state inventory

Generated: 2026-08-28T07:40:20.201Z
Human-assisted run: no

Labels are mutually exclusive. **DOCUMENTED_ONLY** states come from `source/um_citizen.pdf` or FAQ copy and must not be treated as live UI.

## Totals

| Label | Count |
| --- | --- |
| VERIFIED_LIVE | 32 |
| VERIFIED_HUMAN_ASSISTED | 0 |
| DOCUMENTED_ONLY | 24 |
| UNREACHABLE | 0 |
| BROKEN_OFFICIAL_SITE | 2 |
| **Total distinct states** | **58** |

## Inventory

| ID | Flow | Label | Viewport shots | Previous | Action | Next | Title |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `home` | shell | VERIFIED_LIVE | yes | — | Open https://rtionline.gov.in/ | Submit Request; Submit First Appeal; View Status; View History; Login; Payment Reconciliation; FAQ; Contact Us; Policy; Public Authorities Available | RTI Online :: Home \| Submit RTI Request \| Submit RTI First Appeal \| View RTI Status \| RTI FAQ |
| `home.cic-banner` | shell | VERIFIED_LIVE | yes | home | Land on home (CIC integration notice) | Complaint & Second Appeal to CIC (external dsscic.nic.in); Submit First Appeal | CIC second-appeal integration notice |
| `home.lifecycle` | shell | VERIFIED_LIVE | yes | home | Homepage embeds images/rti_lifecycle.jpg (alt image1) | Submit Request; Submit First Appeal; Complaint & Second Appeal to CIC | RTI request lifecycle diagram |
| `registration.404` | login | BROKEN_OFFICIAL_SITE | yes | home | GET /registration.php |  |  |
| `forgot-password.404` | login | BROKEN_OFFICIAL_SITE | yes | home | GET /forgotPassword.php |  |  |
| `contact` | shell | VERIFIED_LIVE | yes | home | Navigate /Contactus.php | Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Online RTI Information System |
| `policies` | shell | VERIFIED_LIVE | yes | home | Navigate /Policies.php | Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Online RTI Information System |
| `faq` | shell | VERIFIED_LIVE | yes | home | Navigate /faq.php | +; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Frequently Asked Questions |
| `authorities` | shell | VERIFIED_LIVE | yes | home | Navigate /request/allpa.php | Back | RTI Online :: Public Authorities available in portal |
| `faq.expanded` | shell | VERIFIED_LIVE | yes | faq | Expand every FAQ accordion | -; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Frequently Asked Questions |
| `authorities.expanded` | shell | VERIFIED_LIVE | yes | authorities | Expand first three ministry rows | Back | RTI Online :: Public Authorities available in portal |
| `submit-request.guidelines` | submit-request | VERIFIED_LIVE | yes | home | Home → Submit Request | Submit; Cancel | RTI Online :: Guidelines for use of RTI Online Portal |
| `submit-request.guidelines.unchecked` | submit-request | VERIFIED_LIVE | yes | submit-request.guidelines | Submit without accepting guidelines | Submit; Cancel | RTI Online :: Guidelines for use of RTI Online Portal |
| `submit-request.email-gate` | submit-request | VERIFIED_LIVE | yes | submit-request.guidelines | Accept guidelines and Submit | Submit → OTP (blocked without captcha); Reset | RTI Online :: Online RTI Information System |
| `submit-request.email-gate.empty` | submit-request | VERIFIED_LIVE | yes | submit-request.email-gate | Submit email gate with empty fields | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Online RTI Information System |
| `submit-request.email-gate.wrong-captcha` | submit-request | VERIFIED_LIVE | yes | submit-request.email-gate | Submit dummy email + wrong captcha ZZZZZZ | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Online RTI Information System |
| `first-appeal.guidelines` | first-appeal | VERIFIED_LIVE | yes | home | Home → Submit First Appeal | Submit; Cancel | RTI Online :: Guidelines for use of RTI Online Portal |
| `first-appeal.guidelines.unchecked` | first-appeal | VERIFIED_LIVE | yes | first-appeal.guidelines | Submit without accepting guidelines | Submit; Cancel | RTI Online :: Guidelines for use of RTI Online Portal |
| `first-appeal.lookup` | first-appeal | VERIFIED_LIVE | yes | first-appeal.guidelines | Accept guidelines | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Submit First Appeal Form |
| `first-appeal.lookup.empty` | first-appeal | VERIFIED_LIVE | yes | first-appeal.lookup | Submit lookup empty | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Submit First Appeal Form |
| `first-appeal.lookup.wrong-captcha` | first-appeal | VERIFIED_LIVE | yes | first-appeal.lookup | Dummy registration number + wrong captcha | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Submit First Appeal Form |
| `view-status.gate` | view-status | VERIFIED_LIVE | yes | home | Home → View Status | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: View Status Form |
| `view-status.gate.empty` | view-status | VERIFIED_LIVE | yes | view-status.gate | Submit empty status form | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: View Status Form |
| `view-status.gate.wrong-captcha` | view-status | VERIFIED_LIVE | yes | view-status.gate | Dummy registration + wrong captcha | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: View Status Form |
| `view-history.gate` | view-history | VERIFIED_LIVE | yes | home | Home → View History | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Online RTI Information System |
| `view-history.gate.empty` | view-history | VERIFIED_LIVE | yes | view-history.gate | Submit empty history form | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Online RTI Information System |
| `view-history.gate.wrong-captcha` | view-history | VERIFIED_LIVE | yes | view-history.gate | Dummy email + empty mobile + wrong captcha ZZZZZZ | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Online RTI Information System |
| `login.gate` | login | VERIFIED_LIVE | yes | home | Home → Login | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Citizen Login Form |
| `login.gate.empty` | login | VERIFIED_LIVE | yes | login.gate | Submit empty login | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Citizen Login Form |
| `login.gate.wrong-captcha` | login | VERIFIED_LIVE | yes | login.gate | Invalid username + wrong captcha (single attempt, not brute-force) | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Citizen Login Form |
| `login.audio-captcha` | login | VERIFIED_LIVE | yes | login.gate | Open audio captcha popup |  | Audio captcha popup |
| `payment-reconciliation.gate` | payment-reconciliation | VERIFIED_LIVE | yes | home | Home → Payment Reconciliation | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Online RTI Information System |
| `payment-reconciliation.gate.empty` | payment-reconciliation | VERIFIED_LIVE | yes | payment-reconciliation.gate | Submit empty reconciliation form | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | RTI Online :: Online RTI Information System |
| `payment-reconciliation.gate.wrong-captcha` | payment-reconciliation | VERIFIED_LIVE | yes | payment-reconciliation.gate | Dummy email + empty mobile + wrong captcha ZZZZZZ | Public Authorities Available | RTI Online :: Online RTI Information System |
| `submit-request.otp` | submit-request | DOCUMENTED_ONLY | — | submit-request.email-gate | Correct captcha + email submit; OTP mailed/SMS | Submit OTP → request form | OTP entry after email/captcha (request) |
| `submit-request.form` | submit-request | DOCUMENTED_ONLY | — | submit-request.otp | Valid OTP | Select ministry/authority; Fill applicant details; BPL Yes → submit; BPL No → Make Payment | Online RTI Request Form |
| `submit-request.form.bpl-yes` | submit-request | DOCUMENTED_ONLY | — | submit-request.form | BPL = Yes | Upload BPL PDF; Submit (no payment) | Request form — BPL branch (no ₹10, extra certificate fields) |
| `submit-request.form.bpl-no` | submit-request | DOCUMENTED_ONLY | — | submit-request.form | BPL = No | Make Payment | Request form — non-BPL (₹10, Make Payment) |
| `submit-request.payment-form` | submit-request | DOCUMENTED_ONLY | — | submit-request.form.bpl-no | Make Payment | Select Payment Gateway radio; Pay; Back | Online Request Payment Form |
| `submit-request.sbi-gateway` | submit-request | DOCUMENTED_ONLY | — | submit-request.payment-form | Pay | Net banking / cards / UPI; CANCEL | State Bank Multi Option Payment System |
| `submit-request.payment-success` | submit-request | DOCUMENTED_ONLY | — | submit-request.sbi-gateway | Successful gateway payment | Save; Print; Print Application | Payment success → request registered |
| `submit-request.payment-failure` | submit-request | DOCUMENTED_ONLY | — | submit-request.sbi-gateway | Gateway decline / timeout / UPI not completed | Payment Reconciliation; Do not pay again | Payment failure (reasons listed in FAQ) |
| `submit-request.payment-cancel` | submit-request | DOCUMENTED_ONLY | — | submit-request.sbi-gateway | CANCEL on SBI page | Return to portal; Payment Reconciliation if debited | Payment cancelled on SBI gateway |
| `submit-request.acknowledgement` | submit-request | DOCUMENTED_ONLY | — | submit-request.payment-success | Redirect after payment or BPL submit | Save; Print; Print Application; View Status | Your RTI Request filed successfully |
| `first-appeal.form` | first-appeal | DOCUMENTED_ONLY | — | first-appeal.lookup | Valid registration number + email + captcha | Select ground; Enter appeal text; Submit (no fee) | Online RTI First Appeal Form (body, after lookup) |
| `first-appeal.acknowledgement` | first-appeal | DOCUMENTED_ONLY | — | first-appeal.form | Submit appeal (no fee) | Save; Print; Print Application | Your RTI Appeal filed successfully |
| `view-status.otp` | view-status | DOCUMENTED_ONLY | — | view-status.gate | Valid registration + email + captcha | Submit OTP → case card | OTP after status lookup |
| `view-status.case` | view-status | DOCUMENTED_ONLY | — | view-status.otp | Valid OTP | Print RTI Application; Print Status; Go Back | Case status card |
| `view-status.additional-fee` | view-status | DOCUMENTED_ONLY | — | view-status.case | CPIO requests extra fee | Make Payment → payment form / SBI | Additional payment required |
| `view-status.upload-required` | view-status | DOCUMENTED_ONLY | — | view-status.case | CPIO cannot open original attachment | Choose File; Attached | Supporting document required from applicant |
| `view-status.returned-state` | view-status | DOCUMENTED_ONLY | — | view-status.case | Filed against a State public authority | Go Back | Returned to applicant (State / NCT Delhi) — no refund |
| `view-status.transferred` | view-status | DOCUMENTED_ONLY | — | view-status.case | Section 6(3) transfer | Open new registration number in View Status | Transferred to another public authority (new number) |
| `view-status.split-cpio` | view-status | DOCUMENTED_ONLY | — | view-status.case | Nodal officer splits the request | Click here to view details; Appeal against a child number | Forwarded to multiple CPIOs (child numbers) |
| `view-history.otp` | view-history | DOCUMENTED_ONLY | — | view-history.gate | Valid email + mobile + captcha | Submit OTP → dashboard | History OTP form |
| `view-history.dashboard` | view-history | DOCUMENTED_ONLY | — | view-history.otp | Valid OTP | Open Registered / Pending / Disposed Requests or Appeals | Registered / pending / disposed counts |
| `view-history.list` | view-history | DOCUMENTED_ONLY | — | view-history.dashboard | Click Registered Requests | Open a registration number; Search; Next page | List of Requests Registered (search + pagination) |
| `login.authenticated` | login | DOCUMENTED_ONLY | — | login.gate | Valid username + password + captcha | History; Saved drafts (if any) | Authenticated citizen account / drafts |
| `payment-reconciliation.result` | payment-reconciliation | DOCUMENTED_ONLY | — | payment-reconciliation.gate | Valid email + captcha (and likely OTP) | Open View Status if number exists; Wait 24–48 working hours; Mail help desk | Reconciliation result (number generated or still pending) |

## Official-site defects observed live

- Home CIC notice overflows the layout (“The C” / “The Centra”).
- /images/rti_lifecycle.jpg/ trailing-slash returns HTTP 404 (image without slash is 200).
- /registration.php returns HTTP 404
- /forgotPassword.php returns HTTP 404
- Audio captcha page /audiofile1.php loads; SiteOne recorded /audio/en/.wav as 404. Popup may render captcha glyphs as visible text.
- POST of dummy email + ZZZZZZ on /request/status_pendingPayment.php returned HTTP 200 but dropped the reconciliation form (chrome + language select only).

## Flows still incomplete

- submit-request: still otp, form, payment-form, acknowledgement (not live-verified)
- first-appeal: still form, acknowledgement (not live-verified)
- view-status: still otp, case (not live-verified)
- view-history: still otp, dashboard (not live-verified)
- login: still authenticated (not live-verified)
- payment-reconciliation: still result (not live-verified)

Coverage is **not** 100% while any material transactional state remains DOCUMENTED_ONLY or UNREACHABLE.

