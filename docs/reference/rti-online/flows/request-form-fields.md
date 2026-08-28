# Request and appeal form fields (from the official user manual)

The live request body, payment gateway, appeal body and case-status variants were **not opened in the browser**. They sit behind captcha + OTP or a live registration number. Field lists below come from `source/um_citizen.pdf` (Citizen Module user manual, 29 pages), cross-checked against guidelines copy captured live.

Do not treat this as a live screenshot of the current form. The portal has added an email-OTP gate in front of the request form since the manual’s screenshots were taken.

## Online RTI Request Form

### Public authority

| Field | Required | Control |
| --- | --- | --- |
| Search Public Authority | no | text search |
| Select Ministry/Department/Apex body | yes | dropdown, first |
| Select Public Authority | yes | dropdown, filtered by ministry |

### Personal details

| Field | Required | Control |
| --- | --- | --- |
| Email-ID | yes | email |
| Confirm Email-ID | yes | email |
| Name | yes | text |
| Gender | yes | Male / Female / Third Gender |
| Address | yes | 3-line text |
| Pin code | no | text |
| Country | no | India / Other radios |
| State | no | dropdown |
| Status | no | Rural / Urban |
| Educational Status | no | Literate / Illiterate |
| Phone number | no | +91 |
| Mobile number | no | +91, SMS alerts |

### Request details

| Field | Required | Control |
| --- | --- | --- |
| Citizenship | locked | Indian only |
| Is the Applicant Below Poverty Line? | yes | Yes / No |
| BPL Card No. / Year of Issue / Issuing Authority | if BPL | text |
| Text for RTI Request application | yes | 3000 characters; `A–Z a–z 0–9 , . - _ ( ) / @ : & ? \ %` |
| Supporting document | BPL: yes; else optional | PDF ≤ 1 MB, no spaces in filename, no Aadhaar/PAN |
| Enter security code | yes | image captcha + refresh |

### Branching

- **BPL = Yes** → Submit (no ₹10). Certificate PDF required.
- **BPL = No** → “You are required to pay the RTI fee of ₹10” → **Make Payment**.
- Make Payment → Online Request Payment Form (`/request/payment.php`) → SBI Payment Gateway (net banking, debit/credit/RuPay, UPI). Warning: do not refresh or re-register.
- Success → registration number, Save / Print / Print Application, email and SMS.

## Online RTI First Appeal Form (after lookup)

Lookup gate (captured live): Request Registration No.*, Email*, Security code*.

Body (from manual; personal fields pre-filled from the original request):

| Field | Required | Notes |
| --- | --- | --- |
| Ministry/Department/Apex body | yes | pre-filled |
| Request Registration Number / Date | yes | pre-filled |
| Name, gender, address, pin, country, state, status, education, phone, mobile, email | mixed | pre-filled |
| Citizenship | locked | Indian |
| BPL | yes | Yes / No |
| Ground For Appeal | yes | Refused access; No response within time limit; Unreasonable amount of fee; Provided incomplete, misleading or false information; Any other ground |
| Text for RTI first appeal application | yes | manual says 500 in one caption and 3000 in another; live guidelines use 3000 |
| Supporting document | no | PDF ≤ 1 MB |
| Security code | yes | captcha |
| Submit | — | no fee |

## View Status result variants (from manual)

- Reply / remarks with Print RTI Application, Print Status, Go Back
- Additional payment required → Make Payment → same SBI gateway
- Supporting document required → Choose File + Attached
- Returned to applicant (State / NCT Delhi) — no refund
- Transferred to another public authority — new registration number
- Forwarded to multiple CPIOs — child numbers `…/1`, `…/2`, `…/3`

## Registration number format (manual p.29)

`AAAAA/B/C/DD/EEEEE`

- `AAAAA` public-authority code
- `B` = `R` request or `A` appeal
- `C` = `E` online, `P` physical, `T` transfer, `X` part-transfer, `L` legacy
- `DD` year
- `EEEEE` serial
