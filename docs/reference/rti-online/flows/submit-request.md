# Flow: submit-request

```mermaid
flowchart TD
  submit_request_guidelines["submit-request.guidelines\nVERIFIED_LIVE"]
  submit_request_guidelines_unchecked["submit-request.guidelines.unchecked\nVERIFIED_LIVE"]
  submit_request_email_gate["submit-request.email-gate\nVERIFIED_LIVE"]
  submit_request_email_gate_empty["submit-request.email-gate.empty\nVERIFIED_LIVE"]
  submit_request_email_gate_wrong_captcha["submit-request.email-gate.wrong-captcha\nVERIFIED_LIVE"]
  submit_request_otp["submit-request.otp\nDOCUMENTED_ONLY"]:::doc
  submit_request_form["submit-request.form\nDOCUMENTED_ONLY"]:::doc
  submit_request_form_bpl_yes["submit-request.form.bpl-yes\nDOCUMENTED_ONLY"]:::doc
  submit_request_form_bpl_no["submit-request.form.bpl-no\nDOCUMENTED_ONLY"]:::doc
  submit_request_payment_form["submit-request.payment-form\nDOCUMENTED_ONLY"]:::doc
  submit_request_sbi_gateway["submit-request.sbi-gateway\nDOCUMENTED_ONLY"]:::doc
  submit_request_payment_success["submit-request.payment-success\nDOCUMENTED_ONLY"]:::doc
  submit_request_payment_failure["submit-request.payment-failure\nDOCUMENTED_ONLY"]:::doc
  submit_request_payment_cancel["submit-request.payment-cancel\nDOCUMENTED_ONLY"]:::doc
  submit_request_acknowledgement["submit-request.acknowledgement\nDOCUMENTED_ONLY"]:::doc
  submit_request_guidelines --> submit_request_guidelines_unchecked
  submit_request_guidelines --> submit_request_email_gate
  submit_request_email_gate --> submit_request_email_gate_empty
  submit_request_email_gate --> submit_request_email_gate_wrong_captcha
  submit_request_email_gate --> submit_request_otp
  submit_request_otp --> submit_request_form
  submit_request_form --> submit_request_form_bpl_yes
  submit_request_form --> submit_request_form_bpl_no
  submit_request_form_bpl_no --> submit_request_payment_form
  submit_request_payment_form --> submit_request_sbi_gateway
  submit_request_sbi_gateway --> submit_request_payment_success
  submit_request_sbi_gateway --> submit_request_payment_failure
  submit_request_sbi_gateway --> submit_request_payment_cancel
  submit_request_payment_success --> submit_request_acknowledgement
```

| ID | Label | URL | Action in | Next | Screenshot |
| --- | --- | --- | --- | --- | --- |
| `submit-request.guidelines` | VERIFIED_LIVE | https://rtionline.gov.in/guidelines.php?request | Home → Submit Request | Submit; Cancel | `screenshots/desktop/submit-request.guidelines.png` |
| `submit-request.guidelines.unchecked` | VERIFIED_LIVE | https://rtionline.gov.in/guidelines.php?request | Submit without accepting guidelines | Submit; Cancel | `screenshots/desktop/submit-request.guidelines.unchecked.png` |
| `submit-request.email-gate` | VERIFIED_LIVE | https://rtionline.gov.in/request/request_email_check.php?pageid=e4da3b7fbbce2345d7772b0674a318d5 | Accept guidelines and Submit | Submit → OTP (blocked without captcha); Reset | `screenshots/desktop/submit-request.email-gate.png` |
| `submit-request.email-gate.empty` | VERIFIED_LIVE | https://rtionline.gov.in/request/request_email_check.php?pageid=e4da3b7fbbce2345d7772b0674a318d5 | Submit email gate with empty fields | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/submit-request.email-gate.empty.png` |
| `submit-request.email-gate.wrong-captcha` | VERIFIED_LIVE | https://rtionline.gov.in/request/request_email_check.php | Submit dummy email + wrong captcha ZZZZZZ | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/submit-request.email-gate.wrong-captcha.png` |
| `submit-request.otp` | DOCUMENTED_ONLY | — | Correct captcha + email submit; OTP mailed/SMS | Submit OTP → request form | — |
| `submit-request.form` | DOCUMENTED_ONLY | — | Valid OTP | Select ministry/authority; Fill applicant details; BPL Yes → submit; BPL No → Make Payment | — |
| `submit-request.form.bpl-yes` | DOCUMENTED_ONLY | — | BPL = Yes | Upload BPL PDF; Submit (no payment) | — |
| `submit-request.form.bpl-no` | DOCUMENTED_ONLY | — | BPL = No | Make Payment | — |
| `submit-request.payment-form` | DOCUMENTED_ONLY | — | Make Payment | Select Payment Gateway radio; Pay; Back | — |
| `submit-request.sbi-gateway` | DOCUMENTED_ONLY | — | Pay | Net banking / cards / UPI; CANCEL | — |
| `submit-request.payment-success` | DOCUMENTED_ONLY | — | Successful gateway payment | Save; Print; Print Application | — |
| `submit-request.payment-failure` | DOCUMENTED_ONLY | — | Gateway decline / timeout / UPI not completed | Payment Reconciliation; Do not pay again | — |
| `submit-request.payment-cancel` | DOCUMENTED_ONLY | — | CANCEL on SBI page | Return to portal; Payment Reconciliation if debited | — |
| `submit-request.acknowledgement` | DOCUMENTED_ONLY | — | Redirect after payment or BPL submit | Save; Print; Print Application; View Status | — |

## submit-request.guidelines

![submit-request.guidelines desktop](../screenshots/desktop/submit-request.guidelines.png)
![submit-request.guidelines mobile](../screenshots/mobile/submit-request.guidelines.png)

## submit-request.guidelines.unchecked

![submit-request.guidelines.unchecked desktop](../screenshots/desktop/submit-request.guidelines.unchecked.png)
![submit-request.guidelines.unchecked mobile](../screenshots/mobile/submit-request.guidelines.unchecked.png)

## submit-request.email-gate

![submit-request.email-gate desktop](../screenshots/desktop/submit-request.email-gate.png)
![submit-request.email-gate mobile](../screenshots/mobile/submit-request.email-gate.png)

## submit-request.email-gate.empty

![submit-request.email-gate.empty desktop](../screenshots/desktop/submit-request.email-gate.empty.png)
![submit-request.email-gate.empty mobile](../screenshots/mobile/submit-request.email-gate.empty.png)

## submit-request.email-gate.wrong-captcha

![submit-request.email-gate.wrong-captcha desktop](../screenshots/desktop/submit-request.email-gate.wrong-captcha.png)
![submit-request.email-gate.wrong-captcha mobile](../screenshots/mobile/submit-request.email-gate.wrong-captcha.png)

