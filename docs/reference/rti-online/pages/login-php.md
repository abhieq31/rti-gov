# RTI Online :: Citizen Login Form
- Route: `/login.php`
- URL: https://rtionline.gov.in/login.php
- HTTP: 200
- Coverage: blocked
- Blockers: captcha, login, real-submission-gate
## Headings
- h1: RTI Online
- h4: Citizen Login
## Screenshots
![desktop](../screenshots/login-php--desktop.png)
![mobile](../screenshots/login-php--mobile.png)
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
    "name": "FrmLogin",
    "id": "Form_1787898723",
    "method": "post",
    "action": "validLogin.php",
    "fields": [
      "UserName",
      "password",
      "hndPassword",
      "6_letters_code",
      "Login",
      "reset"
    ]
  }
]
```
