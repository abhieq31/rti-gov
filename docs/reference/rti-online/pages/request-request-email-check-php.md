# RTI Online :: Online RTI Information System
- Route: `/request/request_email_check.php`
- URL: https://rtionline.gov.in/request/request_email_check.php?pageid=e4da3b7fbbce2345d7772b0674a318d5
- HTTP: 200
- Coverage: blocked
- Blockers: captcha, otp, real-submission-gate
## Headings
- h1: RTI Online
- h4: Online RTI Request Form
## Screenshots
![desktop](../screenshots/request-request-email-check-php--desktop.png)
![mobile](../screenshots/request-request-email-check-php--mobile.png)
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
    "id": "Form_1787898717",
    "method": "post",
    "action": "/request/request_email_check.php",
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
