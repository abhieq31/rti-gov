# RTI Online :: View Status Form
- Route: `/request/status.php`
- URL: https://rtionline.gov.in/request/status.php
- HTTP: 200
- Coverage: blocked
- Blockers: captcha, valid-registration-number, otp, real-submission-gate
## Headings
- h1: RTI Online
- h4: View Status
## Screenshots
![desktop](../screenshots/request-status-php--desktop.png)
![mobile](../screenshots/request-status-php--mobile.png)
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
    "id": "",
    "method": "post",
    "action": "/request/status.php",
    "fields": [
      "registration_no",
      "Email",
      "6_letters_code",
      "Submit",
      "reset"
    ]
  }
]
```
