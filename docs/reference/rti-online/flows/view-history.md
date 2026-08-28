# Flow: view-history

```mermaid
flowchart TD
  view_history_gate["view-history.gate\nVERIFIED_LIVE"]
  view_history_gate_empty["view-history.gate.empty\nVERIFIED_LIVE"]
  view_history_gate_wrong_captcha["view-history.gate.wrong-captcha\nVERIFIED_LIVE"]
  view_history_otp["view-history.otp\nDOCUMENTED_ONLY"]:::doc
  view_history_dashboard["view-history.dashboard\nDOCUMENTED_ONLY"]:::doc
  view_history_list["view-history.list\nDOCUMENTED_ONLY"]:::doc
  view_history_gate --> view_history_gate_empty
  view_history_gate --> view_history_gate_wrong_captcha
  view_history_gate --> view_history_otp
  view_history_otp --> view_history_dashboard
  view_history_dashboard --> view_history_list
```

| ID | Label | URL | Action in | Next | Screenshot |
| --- | --- | --- | --- | --- | --- |
| `view-history.gate` | VERIFIED_LIVE | https://rtionline.gov.in/request/status_history.php | Home → View History | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/view-history.gate.png` |
| `view-history.gate.empty` | VERIFIED_LIVE | https://rtionline.gov.in/request/status_history.php | Submit empty history form | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/view-history.gate.empty.png` |
| `view-history.gate.wrong-captcha` | VERIFIED_LIVE | https://rtionline.gov.in/request/status_history.php | Dummy email + wrong captcha | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/view-history.gate.wrong-captcha.png` |
| `view-history.otp` | DOCUMENTED_ONLY | — | Valid email + mobile + captcha | Submit OTP → dashboard | — |
| `view-history.dashboard` | DOCUMENTED_ONLY | — | Valid OTP | Open Registered / Pending / Disposed Requests or Appeals | — |
| `view-history.list` | DOCUMENTED_ONLY | — | Click Registered Requests | Open a registration number; Search; Next page | — |

## view-history.gate

![view-history.gate desktop](../screenshots/desktop/view-history.gate.png)
![view-history.gate mobile](../screenshots/mobile/view-history.gate.png)

## view-history.gate.empty

![view-history.gate.empty desktop](../screenshots/desktop/view-history.gate.empty.png)
![view-history.gate.empty mobile](../screenshots/mobile/view-history.gate.empty.png)

## view-history.gate.wrong-captcha

![view-history.gate.wrong-captcha desktop](../screenshots/desktop/view-history.gate.wrong-captcha.png)
![view-history.gate.wrong-captcha mobile](../screenshots/mobile/view-history.gate.wrong-captcha.png)

