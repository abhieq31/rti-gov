# Home — live copy

**Label:** VERIFIED_LIVE  
**URL:** https://rtionline.gov.in/  
**Source:** Playwright screenshots plus a complete homepage capture supplied 2026-08-28. The Playwright 1440×900 shot **crops** the CIC banner; the banner text below is from the full live page.

This is homepage chrome and copy. It is not a substitute for OTP/form screens.

## Chrome

- Contrast: unlabeled black / white squares
- Text size: A+ · A · A−
- Language: English | Hindi (`#lan`)
- Emblem + **RTI Online** Version 2.0
- Owner: An Initiative of Department of Personnel & Training, Government of India
- Link: Public Authorities Available → `/request/allpa.php`

## Primary nav

Home · Submit Request · Submit First Appeal · View Status · View History · Login · User Manual · Contact Us · FAQ · Payment Reconciliation (blinks “new”)

## CIC integration banner (full text; cropped in `screenshots/desktop/home.png`)

The Central Information Commission (CIC) has integrated its Second Appeal Filing Portal with the Department of Personnel and Training (DoPT) RTI Online Portal. Now, while submitting a Second Appeal, appellants can input the First Appeal Registration Number, Email ID and Date of Filing the First Appeal, thereafter, the system will automatically retrieve related details of the RTI Application and First Appeal from the RTI Online Portal. This will ensure a smooth and more streamlined Second Appeal filing process.

Footer control **Complaint & Second Appeal to CIC** opens `http://dsscic.nic.in/online-appeal-application/onlineappealapplication/` (HTTP, not HTTPS) and shows the same text as a JavaScript `alert`.

## Jurisdiction warning

Please do not file RTI applications through this portal for the public authorities under the State Governments, including Government of NCT Delhi. If filed, the application would be returned, without refund of amount.

## Service explanation

This is a portal to file RTI applications/first appeals online along with payment gateway. Payment can be made through internet banking, debit/credit cards of Master/Visa, RuPay cards and UPI. Through this portal, RTI applications/first appeals can be filed by Indian Citizens for all Ministries/Departments and other Public Authorities of Central Government. RTI applications/first appeals should not be filed for other Public authorities under State Govt. through this portal.

Please read instructions carefully while submitting request/appeal.

## Lifecycle diagram (`home.lifecycle`)

The homepage embeds `images/rti_lifecycle.jpg` (alt `image1`). A trailing-slash link `/images/rti_lifecycle.jpg/` 404s. Live diagram: `screenshots/desktop/home.lifecycle.png`. Statutory graph: `flows/lifecycle.md`.

## Help desk

011-24010690/691 · 9:00 AM to 5:30 PM, Monday to Friday except Public Holidays · helprtionline-dopt[at]nic[dot]in · high call volume / waiting.

## Footer

Home | National Portal of India (`http://india.gov.in/`) | Complaint & Second Appeal to CIC | FAQ | Policy

Copyright © 2026 · NIC New Delhi · content owned by DOP&T
