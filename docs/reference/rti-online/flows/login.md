# Flow: login

```mermaid
flowchart TD
  registration_404["registration.404\nBROKEN_OFFICIAL_SITE"]:::doc
  forgot_password_404["forgot-password.404\nBROKEN_OFFICIAL_SITE"]:::doc
  login_gate["login.gate\nVERIFIED_LIVE"]
  login_gate_empty["login.gate.empty\nVERIFIED_LIVE"]
  login_gate_wrong_captcha["login.gate.wrong-captcha\nVERIFIED_LIVE"]
  login_audio_captcha["login.audio-captcha\nVERIFIED_LIVE"]
  login_authenticated["login.authenticated\nDOCUMENTED_ONLY"]:::doc
  login_gate --> login_gate_empty
  login_gate --> login_gate_wrong_captcha
  login_gate --> login_audio_captcha
  login_gate --> login_authenticated
```

| ID | Label | URL | Action in | Next | Screenshot |
| --- | --- | --- | --- | --- | --- |
| `registration.404` | BROKEN_OFFICIAL_SITE | https://rtionline.gov.in/registration.php | GET /registration.php |  | `screenshots/desktop/registration.404.png` |
| `forgot-password.404` | BROKEN_OFFICIAL_SITE | https://rtionline.gov.in/forgotPassword.php | GET /forgotPassword.php |  | `screenshots/desktop/forgot-password.404.png` |
| `login.gate` | VERIFIED_LIVE | https://rtionline.gov.in/login.php | Home → Login | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/login.gate.png` |
| `login.gate.empty` | VERIFIED_LIVE | https://rtionline.gov.in/login.php | Submit empty login | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/login.gate.empty.png` |
| `login.gate.wrong-captcha` | VERIFIED_LIVE | https://rtionline.gov.in/login.php?error=QlFtaEo3dU9QNlhuRGhRVTFKMjBXWmZXQzR4Uzdwak1lalhpNWxOTXMxTkFVTElNTFJsOVNuNmJmajJya3Qzcjo6QtN7%2BrDSyPa1FLBcF25X1g%3D%3D | Invalid username + wrong captcha (single attempt, not brute-force) | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/login.gate.wrong-captcha.png` |
| `login.audio-captcha` | VERIFIED_LIVE | https://rtionline.gov.in/audiofile1.php | Open audio captcha popup |  | `screenshots/desktop/login.audio-captcha.png` |
| `login.authenticated` | DOCUMENTED_ONLY | — | Valid username + password + captcha | History; Saved drafts (if any) | — |

## registration.404

![registration.404 desktop](../screenshots/desktop/registration.404.png)
![registration.404 mobile](../screenshots/mobile/registration.404.png)

## forgot-password.404

![forgot-password.404 desktop](../screenshots/desktop/forgot-password.404.png)
![forgot-password.404 mobile](../screenshots/mobile/forgot-password.404.png)

## login.gate

![login.gate desktop](../screenshots/desktop/login.gate.png)
![login.gate mobile](../screenshots/mobile/login.gate.png)

## login.gate.empty

![login.gate.empty desktop](../screenshots/desktop/login.gate.empty.png)
![login.gate.empty mobile](../screenshots/mobile/login.gate.empty.png)

## login.gate.wrong-captcha

![login.gate.wrong-captcha desktop](../screenshots/desktop/login.gate.wrong-captcha.png)
![login.gate.wrong-captcha mobile](../screenshots/mobile/login.gate.wrong-captcha.png)

## login.audio-captcha

![login.audio-captcha desktop](../screenshots/desktop/login.audio-captcha.png)
![login.audio-captcha mobile](../screenshots/mobile/login.audio-captcha.png)

