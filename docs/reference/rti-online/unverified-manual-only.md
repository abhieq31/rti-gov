# Unverified — manual / document only

These states were **not** captured from a live browser session. They come from the official citizen user manual (`source/um_citizen.pdf`) or from FAQ/guidelines text. They are not screenshots of the current UI and must not be mixed with VERIFIED_LIVE records.

## submit-request.otp
- Flow: submit-request
- Title: OTP entry after email/captcha (request)
- Previous: submit-request.email-gate
- Trigger: Correct captcha + email submit; OTP mailed/SMS
- Next: Submit OTP → request form
- Source: um_citizen.pdf p.27 (history OTP analog); live copy on email-gate says OTP is sent
- Fields: OTP (received in email / mobile)
## submit-request.form
- Flow: submit-request
- Title: Online RTI Request Form
- Previous: submit-request.otp
- Trigger: Valid OTP
- Next: Select ministry/authority; Fill applicant details; BPL Yes → submit; BPL No → Make Payment
- Source: um_citizen.pdf pp.5–8
- Fields: Search Public Authority; Select Ministry/Department/Apex body *; Select Public Authority *; Email-ID *; Confirm Email-ID *; Name *; Gender * (Male/Female/Third Gender); Address *; Pin code; Country (India/Other); State; Status (Rural/Urban); Educational Status (Literate/Illiterate); Phone +91; Mobile +91 (SMS); Citizenship = Indian (locked); BPL * Yes/No; Text for RTI Request application * (3000 chars, restricted charset); Supporting document PDF ≤ 1 MB; Security code *
## submit-request.form.bpl-yes
- Flow: submit-request
- Title: Request form — BPL branch (no ₹10, extra certificate fields)
- Previous: submit-request.form
- Trigger: BPL = Yes
- Next: Upload BPL PDF; Submit (no payment)
- Source: um_citizen.pdf p.6
- Fields: BPL Card No.; Year of Issue; Issuing Authority; Supporting document *; Submit
## submit-request.form.bpl-no
- Flow: submit-request
- Title: Request form — non-BPL (₹10, Make Payment)
- Previous: submit-request.form
- Trigger: BPL = No
- Next: Make Payment
- Source: um_citizen.pdf pp.7–8
- Fields: Notice: You are required to pay the RTI fee of ₹10; Make Payment; Reset
## submit-request.payment-form
- Flow: submit-request
- Title: Online Request Payment Form
- Previous: submit-request.form.bpl-no
- Trigger: Make Payment
- Next: Select Payment Gateway radio; Pay; Back
- Source: um_citizen.pdf p.9 — URL pattern /request/payment.php?requestFromid=
- Fields: NAME; RTI Fee ₹10; Payment Mode (Internet banking / card / RuPay / UPI); Payment Gateway radio; Pay; Back
- Notes: Red banner: do not refresh or register the same request again. Wait 24–48 working hours.
## submit-request.sbi-gateway
- Flow: submit-request
- Title: State Bank Multi Option Payment System
- Previous: submit-request.payment-form
- Trigger: Pay
- Next: Net banking / cards / UPI; CANCEL
- Source: um_citizen.pdf p.10 — merchant.online-sbi.com
- Fields: SBI Net Banking; Other Banks; State Bank Debit Cards; Other Bank Debit Cards; Credit Cards; UPI; CANCEL
## submit-request.payment-success
- Flow: submit-request
- Title: Payment success → request registered
- Previous: submit-request.sbi-gateway
- Trigger: Successful gateway payment
- Next: Save; Print; Print Application
- Source: um_citizen.pdf pp.7, 11
- Fields: Registration Number; Name; Date of Filing; Request filed with; Contact Details; Save; Print; Print Application
## submit-request.payment-failure
- Flow: submit-request
- Title: Payment failure (reasons listed in FAQ)
- Previous: submit-request.sbi-gateway
- Trigger: Gateway decline / timeout / UPI not completed
- Next: Payment Reconciliation; Do not pay again
- Source: FAQ item 25 (live accordion) + guidelines point 11
## submit-request.payment-cancel
- Flow: submit-request
- Title: Payment cancelled on SBI gateway
- Previous: submit-request.sbi-gateway
- Trigger: CANCEL on SBI page
- Next: Return to portal; Payment Reconciliation if debited
- Source: um_citizen.pdf p.10 CANCEL control
- Fields: CANCEL
## submit-request.acknowledgement
- Flow: submit-request
- Title: Your RTI Request filed successfully
- Previous: submit-request.payment-success
- Trigger: Redirect after payment or BPL submit
- Next: Save; Print; Print Application; View Status
- Source: um_citizen.pdf pp.7, 11
- Fields: Registration Number (AAAAA/B/C/DD/EEEEE); email + SMS alert
## first-appeal.form
- Flow: first-appeal
- Title: Online RTI First Appeal Form (body, after lookup)
- Previous: first-appeal.lookup
- Trigger: Valid registration number + email + captcha
- Next: Select ground; Enter appeal text; Submit (no fee)
- Source: um_citizen.pdf pp.15–16
- Fields: Ministry/Department/Apex body (pre-filled); Request Registration Number / Date (pre-filled); Appellant personal details (pre-filled); BPL; Ground For Appeal * (Refused access; No response within time limit; Unreasonable fee; Incomplete/misleading/false; Any other); Text for RTI first appeal application * (manual says 500 and 3000); Supporting document PDF ≤ 1 MB; Security code *; Submit / Reset
## first-appeal.acknowledgement
- Flow: first-appeal
- Title: Your RTI Appeal filed successfully
- Previous: first-appeal.form
- Trigger: Submit appeal (no fee)
- Next: Save; Print; Print Application
- Source: um_citizen.pdf p.17
- Fields: Appeal registration number; Name; Date of Filing; Request filed with
## view-status.otp
- Flow: view-status
- Title: OTP after status lookup
- Previous: view-status.gate
- Trigger: Valid registration + email + captcha
- Next: Submit OTP → case card
- Source: Live gate copy + um_citizen.pdf p.27 analog
- Fields: OTP
## view-status.case
- Flow: view-status
- Title: Case status card
- Previous: view-status.otp
- Trigger: Valid OTP
- Next: Print RTI Application; Print Status; Go Back
- Source: um_citizen.pdf p.19
- Fields: Registration Number; Name; Date of filing; Public Authority; Status; Date of action; Reply / Remarks; Nodal Officer Details
## view-status.additional-fee
- Flow: view-status
- Title: Additional payment required
- Previous: view-status.case
- Trigger: CPIO requests extra fee
- Next: Make Payment → payment form / SBI
- Source: um_citizen.pdf p.20
- Fields: Additional Payment amount; Make Payment link; Remarks
## view-status.upload-required
- Flow: view-status
- Title: Supporting document required from applicant
- Previous: view-status.case
- Trigger: CPIO cannot open original attachment
- Next: Choose File; Attached
- Source: um_citizen.pdf p.21
- Fields: Upload document PDF ≤ 1 MB; Attached
## view-status.returned-state
- Flow: view-status
- Title: Returned to applicant (State / NCT Delhi) — no refund
- Previous: view-status.case
- Trigger: Filed against a State public authority
- Next: Go Back
- Source: um_citizen.pdf p.22
- Fields: Status: RTI REQUEST APPLICATION RETURNED TO APPLICANT
## view-status.transferred
- Flow: view-status
- Title: Transferred to another public authority (new number)
- Previous: view-status.case
- Trigger: Section 6(3) transfer
- Next: Open new registration number in View Status
- Source: um_citizen.pdf p.23
- Fields: New registration number; Destination authority
## view-status.split-cpio
- Flow: view-status
- Title: Forwarded to multiple CPIOs (child numbers)
- Previous: view-status.case
- Trigger: Nodal officer splits the request
- Next: Click here to view details; Appeal against a child number
- Source: um_citizen.pdf pp.24–25
- Fields: Child numbers …/1 …/2 …/3; CPIO phone/email; Current status
## view-history.otp
- Flow: view-history
- Title: History OTP form
- Previous: view-history.gate
- Trigger: Valid email + mobile + captcha
- Next: Submit OTP → dashboard
- Source: um_citizen.pdf p.27
- Fields: OTP (Received in Email ONLY)
## view-history.dashboard
- Flow: view-history
- Title: Registered / pending / disposed counts
- Previous: view-history.otp
- Trigger: Valid OTP
- Next: Open Registered / Pending / Disposed Requests or Appeals
- Source: um_citizen.pdf p.28
- Fields: Requests: Registered, Disposed of, Pending; Appeals: Registered, Disposed of, Pending
## view-history.list
- Flow: view-history
- Title: List of Requests Registered (search + pagination)
- Previous: view-history.dashboard
- Trigger: Click Registered Requests
- Next: Open a registration number; Search; Next page
- Source: um_citizen.pdf p.29
- Fields: Show N entries; Search; S.No.; Registration Number; Name; Date of Receipt; Status
- Notes: Number format AAAAA/B/C/DD/EEEEE documented on the same page.
## login.authenticated
- Flow: login
- Title: Authenticated citizen account / drafts
- Previous: login.gate
- Trigger: Valid username + password + captcha
- Next: History; Saved drafts (if any)
- Source: Login form posts to validLogin.php; destination not captured live
## payment-reconciliation.result
- Flow: payment-reconciliation
- Title: Reconciliation result (number generated or still pending)
- Previous: payment-reconciliation.gate
- Trigger: Valid email + captcha (and likely OTP)
- Next: Open View Status if number exists; Wait 24–48 working hours; Mail help desk
- Source: FAQ item 13 + live gate; result page not captured live
