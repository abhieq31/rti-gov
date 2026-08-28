# Blocked states

Continuation was refused whenever a captcha, OTP, live registration number, login, payment or file upload was required. Nothing was solved, guessed or submitted.

Related official breakage (from SiteOne, still true in this run):

- `/audio/en/.wav` and `/request/audio/en/.wav` — audio captcha files 404. The speaker popup (`/audiofile1.php`) still opens and, in this capture, rendered the captcha characters as visible text (`VHN3D3`).
- `/images/rti_lifecycle.jpg/` — trailing-slash 404; the image without the slash is 200.
- Commented-out Home markup still points at `registration.php` and `forgotPassword.php`, both 404.

## registration-php
- URL: https://rtionline.gov.in/registration.php
- Kind: unreachable/broken
- Required for manual continuation: None — this public URL returns an error. Linked from comments or stale markup on Home.
- HTTP: 404
## forgotpassword-php
- URL: https://rtionline.gov.in/forgotPassword.php
- Kind: unreachable/broken
- Required for manual continuation: None — this public URL returns an error. Linked from comments or stale markup on Home.
- HTTP: 404
## request-request-email-check-php
- URL: https://rtionline.gov.in/request/request_email_check.php?pageid=e4da3b7fbbce2345d7772b0674a318d5
- Kind: blocked
- Required for manual continuation: Working email, optional mobile, image/audio captcha, then OTP sent to email and mobile. Do not send OTP from this audit.
- If unblocked, next screen: Online RTI Request Form (ministry, public authority, applicant details, BPL, 3000-char text, PDF upload, Make Payment). Not captured: captcha + OTP gate.
- Validation observed: Please select the undertaking statement!
## appeal-firstappeal-php
- URL: https://rtionline.gov.in/appeal/firstAppeal.php?pageid=cfcd208495d565ef66e7dff9f98764da
- Kind: blocked
- Required for manual continuation: Valid online RTI request registration number, applicant email, image/audio captcha. A live registration number is needed to open the appeal text form.
- If unblocked, next screen: First-appeal body (grounds, appeal text, optional PDF). Not captured.
- Validation observed: Please select the undertaking statement!
## login
- URL: https://rtionline.gov.in/login.php
- Kind: blocked
- Required for manual continuation: Existing citizen username, password and captcha. Registration and forgot-password URLs currently 404. Do not brute-force or fabricate credentials.
- If unblocked, next screen: Authenticated history / saved drafts (not captured).
- Validation observed: (All Characters are Case insensitive)
## view-status
- URL: https://rtionline.gov.in/request/status.php
- Kind: blocked
- Required for manual continuation: Valid registration number, applicant email, captcha, then OTP to email and mobile. OTPs do not expire until used.
- If unblocked, next screen: Case status, CPIO movement, reply, additional-fee payment, supporting-document upload, child registration numbers.
## view-history
- URL: https://rtionline.gov.in/request/status_history.php
- Kind: blocked
- Required for manual continuation: Applicant email, optional mobile, captcha, then OTP. History is retained for three years.
- If unblocked, next screen: Registered / pending / disposed requests and first appeals.
## payment-reconciliation
- URL: https://rtionline.gov.in/request/status_pendingPayment.php
- Kind: blocked
- Required for manual continuation: Applicant email, optional mobile, captcha. Do not retry a live payment from this audit.
- If unblocked, next screen: Whether a bank scroll generated a registration number.
