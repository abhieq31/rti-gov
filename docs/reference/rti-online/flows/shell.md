# Flow: shell

```mermaid
flowchart TD
  home["home\nVERIFIED_LIVE"]
  cic["home.cic-banner\nVERIFIED_LIVE"]
  life["home.lifecycle\nVERIFIED_LIVE"]
  contact["contact\nVERIFIED_LIVE"]
  policies["policies\nVERIFIED_LIVE"]
  faq["faq\nVERIFIED_LIVE"]
  authorities["authorities\nVERIFIED_LIVE"]
  faq_expanded["faq.expanded\nVERIFIED_LIVE"]
  authorities_expanded["authorities.expanded\nVERIFIED_LIVE"]
  home --> cic
  home --> life
  home --> contact
  home --> policies
  home --> faq
  home --> authorities
  faq --> faq_expanded
  authorities --> authorities_expanded
```

| ID | Label | URL | Action in | Next | Screenshot |
| --- | --- | --- | --- | --- | --- |
| `home` | VERIFIED_LIVE | https://rtionline.gov.in/ | Open https://rtionline.gov.in/ | Submit Request; Submit First Appeal; View Status; View History; Login; Payment Reconciliation; FAQ; Contact Us; Policy; Public Authorities Available | `screenshots/desktop/home.png` |
| `home.cic-banner` | VERIFIED_LIVE | https://rtionline.gov.in/ | Land on home | Complaint & Second Appeal to CIC | `screenshots/desktop/home.png` |
| `home.lifecycle` | VERIFIED_LIVE | https://rtionline.gov.in/images/rti_lifecycle.jpg | Homepage diagram | Submit Request; First Appeal; CIC | `screenshots/desktop/home.lifecycle.png` |
| `contact` | VERIFIED_LIVE | https://rtionline.gov.in/Contactus.php | Navigate /Contactus.php | Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/contact.png` |
| `policies` | VERIFIED_LIVE | https://rtionline.gov.in/Policies.php | Navigate /Policies.php | Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/policies.png` |
| `faq` | VERIFIED_LIVE | https://rtionline.gov.in/faq.php | Navigate /faq.php | +; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/faq.png` |
| `authorities` | VERIFIED_LIVE | https://rtionline.gov.in/request/allpa.php | Navigate /request/allpa.php | Back | `screenshots/desktop/authorities.png` |
| `faq.expanded` | VERIFIED_LIVE | https://rtionline.gov.in/faq.php | Expand every FAQ accordion | -; Public Authorities Available; Home; Submit Request; Submit First Appeal; View Status; View History; Login; User Manual | `screenshots/desktop/faq.expanded.png` |
| `authorities.expanded` | VERIFIED_LIVE | https://rtionline.gov.in/request/allpa.php | Expand first three ministry rows | Back | `screenshots/desktop/authorities.expanded.png` |

## home

![home desktop](../screenshots/desktop/home.png)
![home mobile](../screenshots/mobile/home.png)

## home.lifecycle

![lifecycle](../screenshots/desktop/home.lifecycle.png)

Full homepage copy: [pages/home.md](../pages/home.md). Statutory graph: [lifecycle.md](lifecycle.md).

## contact

![contact desktop](../screenshots/desktop/contact.png)
![contact mobile](../screenshots/mobile/contact.png)

## policies

![policies desktop](../screenshots/desktop/policies.png)
![policies mobile](../screenshots/mobile/policies.png)

## faq

![faq desktop](../screenshots/desktop/faq.png)
![faq mobile](../screenshots/mobile/faq.png)

## authorities

![authorities desktop](../screenshots/desktop/authorities.png)
![authorities mobile](../screenshots/mobile/authorities.png)

## faq.expanded

![faq.expanded desktop](../screenshots/desktop/faq.expanded.png)
![faq.expanded mobile](../screenshots/mobile/faq.expanded.png)

## authorities.expanded

![authorities.expanded desktop](../screenshots/desktop/authorities.expanded.png)
![authorities.expanded mobile](../screenshots/mobile/authorities.expanded.png)

