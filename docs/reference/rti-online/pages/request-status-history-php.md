# RTI Online :: Online RTI Information System
- Route: `/request/status_history.php`
- URL: https://rtionline.gov.in/request/status_history.php
- HTTP: 200
- Coverage: blocked
- Blockers: captcha, otp, real-submission-gate
## Headings
- h1: RTI Online
- h4: View History
## Screenshots
![desktop](../screenshots/request-status-history-php--desktop.png)
![mobile](../screenshots/request-status-history-php--mobile.png)
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
    "id": "Form_1787898698",
    "method": "post",
    "action": "/request/status_history.php",
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
