# Flow: first-appeal

```mermaid
flowchart TD
  first_appeal_guidelines["first-appeal.guidelines\nVERIFIED_LIVE"]
  first_appeal_lookup["first-appeal.lookup\nVERIFIED_LIVE"]
  first_appeal_lookup_empty["first-appeal.lookup.empty\nVERIFIED_LIVE"]
  first_appeal_lookup_wrong_captcha["first-appeal.lookup.wrong-captcha\nVERIFIED_LIVE"]
  first_appeal_form["first-appeal.form\nDOCUMENTED_ONLY"]:::doc
  first_appeal_acknowledgement["first-appeal.acknowledgement\nDOCUMENTED_ONLY"]:::doc
  first_appeal_guidelines --> first_appeal_lookup
  first_appeal_lookup --> first_appeal_lookup_empty
  first_appeal_lookup --> first_appeal_lookup_wrong_captcha
  first_appeal_lookup --> first_appeal_form
  first_appeal_form --> first_appeal_acknowledgement
```

| ID | Label | URL | Action in | Next | Screenshot |
| --- | --- | --- | --- | --- | --- |
| `first-appeal.guidelines` | VERIFIED_LIVE | https://rtionline.gov.in/guidelines.php?appeal | Home → Submit First Appeal | Submit; Cancel | `screenshots/desktop/first-appeal.guidelines.png` |
| `first-appeal.lookup` | VERIFIED_LIVE | https://rtionline.gov.in/appeal/firstAppeal.php?pageid=1679091c5a880faf6fb5e6087eb1b2dc | Accept guidelines | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/first-appeal.lookup.png` |
| `first-appeal.lookup.empty` | VERIFIED_LIVE | https://rtionline.gov.in/appeal/firstAppeal.php?pageid=1679091c5a880faf6fb5e6087eb1b2dc | Submit lookup empty | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/first-appeal.lookup.empty.png` |
| `first-appeal.lookup.wrong-captcha` | VERIFIED_LIVE | https://rtionline.gov.in/appeal/firstAppeal.php?pageid=1679091c5a880faf6fb5e6087eb1b2dc | Dummy registration number + wrong captcha | Submit; Reset; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/first-appeal.lookup.wrong-captcha.png` |
| `first-appeal.form` | DOCUMENTED_ONLY | — | Valid registration number + email + captcha | Select ground; Enter appeal text; Submit (no fee) | — |
| `first-appeal.acknowledgement` | DOCUMENTED_ONLY | — | Submit appeal (no fee) | Save; Print; Print Application | — |

## first-appeal.guidelines

![first-appeal.guidelines desktop](../screenshots/desktop/first-appeal.guidelines.png)
![first-appeal.guidelines mobile](../screenshots/mobile/first-appeal.guidelines.png)

## first-appeal.lookup

![first-appeal.lookup desktop](../screenshots/desktop/first-appeal.lookup.png)
![first-appeal.lookup mobile](../screenshots/mobile/first-appeal.lookup.png)

## first-appeal.lookup.empty

![first-appeal.lookup.empty desktop](../screenshots/desktop/first-appeal.lookup.empty.png)
![first-appeal.lookup.empty mobile](../screenshots/mobile/first-appeal.lookup.empty.png)

## first-appeal.lookup.wrong-captcha

![first-appeal.lookup.wrong-captcha desktop](../screenshots/desktop/first-appeal.lookup.wrong-captcha.png)
![first-appeal.lookup.wrong-captcha mobile](../screenshots/mobile/first-appeal.lookup.wrong-captcha.png)

