# RTI Online :: Online RTI Information System
- Route: `/request/status_pendingPayment.php`
- URL: https://rtionline.gov.in/request/status_pendingPayment.php
- HTTP: 200
- Coverage: blocked
- Blockers: captcha, otp, real-submission-gate
## Headings
- h1: RTI Online
- h4: Reconciliation of unsuccessful RTI request payments
## Screenshots
![desktop](../screenshots/request-status-pendingpayment-php--desktop.png)
![mobile](../screenshots/request-status-pendingpayment-php--mobile.png)
## Forms
```json
[
  {
    "name": "frmLang",
    "id": "frmLang",
    "method": "post",
    "action": "",
    "fields": [
      "lan",
      "hndbaseurl",
      "hndactionurl"
    ]
  },
  {
    "name": "FrmStatus",
    "id": "Form_1787898685",
    "method": "post",
    "action": "/request/status_pendingPayment.php",
    "fields": [
      "Email",
      "cell",
      "6_letters_code",
      "Submit",
      "reset"
    ]
  }
]
```
