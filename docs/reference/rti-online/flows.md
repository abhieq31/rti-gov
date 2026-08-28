# Citizen flows on RTI Online

Edges are `screen -> action -> next screen`. BLOCKED means this audit stopped on purpose.

```mermaid
flowchart TD
  home[Home]
  reqG[Request guidelines]
  emailGate[Email + captcha + OTP gate]
  reqForm[Request form - NOT CAPTURED]
  pay[Payment gateway - NOT CAPTURED]
  receipt[Registration number - NOT CAPTURED]
  appG[Appeal guidelines]
  appGate[Reg no + email + captcha gate]
  appForm[Appeal form - NOT CAPTURED]
  status[View status gate]
  case[Case status - NOT CAPTURED]
  hist[View history gate]
  histList[History list - NOT CAPTURED]
  payRec[Payment reconciliation gate]
  login[Login + captcha]
  account[Account - NOT CAPTURED]
  faq[FAQ]
  allpa[Public authorities 2916]
  contact[Contact us]
  policies[Policies]
  manual[User manual PDF]
  cic[CIC second appeal - EXTERNAL]
  brokenReg[registration.php 404]
  brokenForgot[forgotPassword.php 404]
  home --> reqG
  reqG -->|accept guidelines| emailGate
  emailGate -->|BLOCKED captcha OTP| reqForm
  reqForm --> pay --> receipt
  home --> appG
  appG -->|accept guidelines| appGate
  appGate -->|BLOCKED live registration no| appForm
  home --> status
  status -->|BLOCKED captcha OTP| case
  home --> hist
  hist -->|BLOCKED captcha OTP| histList
  home --> payRec
  home --> login
  login -->|BLOCKED captcha credentials| account
  home --> faq
  home --> allpa
  home --> contact
  home --> policies
  home --> manual
  home --> cic
  home -.-> brokenReg
  home -.-> brokenForgot
```

## Recorded edges

| From | Action | To |
| --- | --- | --- |
| home | Open primary navigation destinations | nav-targets |
| guidelines-request | Submit without checkbox | alert: Please select the undertaking statement! |
| guidelines-request | Accept guidelines and Submit | request-email-otp-gate |
| request-email-otp-gate | Email + captcha + OTP (BLOCKED) | request-form-not-captured |
| guidelines-appeal | Submit without checkbox | alert: Please select the undertaking statement! (`first-appeal.guidelines.unchecked`) |
| guidelines-appeal | Accept guidelines and Submit | appeal-lookup-gate |
| appeal-lookup-gate | Registration no + email + captcha (BLOCKED) | appeal-form-not-captured |
| login | Submit empty form | client-validation |
| login | Username + password + captcha (BLOCKED) | account-not-captured |
| view-status | Submit empty form | client-validation |
| view-status | Reg no + email + captcha + OTP (BLOCKED) | case-status-not-captured |
| view-history | Email + mobile + captcha + OTP (BLOCKED) | history-list-not-captured |
| payment-reconciliation | Email + captcha (BLOCKED) | payment-result-not-captured |
| faq | Expand each accordion (+) | faq-answer-visible |
| home | Public Authorities Available | allpa-directory |
| allpa-directory | Expand ministry (+) | nested-public-authorities |

