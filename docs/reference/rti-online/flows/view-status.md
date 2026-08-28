# Flow: view-status

```mermaid
flowchart TD
  view_status_gate["view-status.gate\nVERIFIED_LIVE"]
  view_status_gate_empty["view-status.gate.empty\nVERIFIED_LIVE"]
  view_status_gate_wrong_captcha["view-status.gate.wrong-captcha\nVERIFIED_LIVE"]
  view_status_otp["view-status.otp\nDOCUMENTED_ONLY"]:::doc
  view_status_case["view-status.case\nDOCUMENTED_ONLY"]:::doc
  view_status_additional_fee["view-status.additional-fee\nDOCUMENTED_ONLY"]:::doc
  view_status_upload_required["view-status.upload-required\nDOCUMENTED_ONLY"]:::doc
  view_status_returned_state["view-status.returned-state\nDOCUMENTED_ONLY"]:::doc
  view_status_transferred["view-status.transferred\nDOCUMENTED_ONLY"]:::doc
  view_status_split_cpio["view-status.split-cpio\nDOCUMENTED_ONLY"]:::doc
  view_status_gate --> view_status_gate_empty
  view_status_gate --> view_status_gate_wrong_captcha
  view_status_gate --> view_status_otp
  view_status_otp --> view_status_case
  view_status_case --> view_status_additional_fee
  view_status_case --> view_status_upload_required
  view_status_case --> view_status_returned_state
  view_status_case --> view_status_transferred
  view_status_case --> view_status_split_cpio
```

| ID | Label | URL | Action in | Next | Validation observed | Screenshot |
| --- | --- | --- | --- | --- | --- | --- |
| `view-status.gate` | VERIFIED_LIVE | https://rtionline.gov.in/request/status.php | Home → View Status | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | — | `screenshots/desktop/view-status.gate.png` |
| `view-status.gate.empty` | VERIFIED_LIVE | https://rtionline.gov.in/request/status.php | Submit empty status form | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | Please Enter Registration Number.; Please provide a valid email address; Please Enter security code | `screenshots/desktop/view-status.gate.empty.png` |
| `view-status.gate.wrong-captcha` | VERIFIED_LIVE | https://rtionline.gov.in/request/status.php | Dummy registration + wrong captcha | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | Security code does not match | `screenshots/desktop/view-status.gate.wrong-captcha.png` |
| `view-status.otp` | DOCUMENTED_ONLY | — | Valid registration + email + captcha | Submit OTP → case card | — | — |
| `view-status.case` | DOCUMENTED_ONLY | — | Valid OTP | Print RTI Application; Print Status; Go Back | — | — |
| `view-status.additional-fee` | DOCUMENTED_ONLY | — | CPIO requests extra fee | Make Payment → payment form / SBI | — | — |
| `view-status.upload-required` | DOCUMENTED_ONLY | — | CPIO cannot open original attachment | Choose File; Attached | — | — |
| `view-status.returned-state` | DOCUMENTED_ONLY | — | Filed against a State public authority | Go Back | — | — |
| `view-status.transferred` | DOCUMENTED_ONLY | — | Section 6(3) transfer | Open new registration number in View Status | — | — |
| `view-status.split-cpio` | DOCUMENTED_ONLY | — | Nodal officer splits the request | Click here to view details; Appeal against a child number | — | — |

## view-status.gate

![view-status.gate desktop](../screenshots/desktop/view-status.gate.png)
![view-status.gate mobile](../screenshots/mobile/view-status.gate.png)



## view-status.gate.empty

![view-status.gate.empty desktop](../screenshots/desktop/view-status.gate.empty.png)
![view-status.gate.empty mobile](../screenshots/mobile/view-status.gate.empty.png)

Validation observed: Please Enter Registration Number.; Please provide a valid email address; Please Enter security code


## view-status.gate.wrong-captcha

![view-status.gate.wrong-captcha desktop](../screenshots/desktop/view-status.gate.wrong-captcha.png)
![view-status.gate.wrong-captcha mobile](../screenshots/mobile/view-status.gate.wrong-captcha.png)

Validation observed: Security code does not match


