# RTI.gov — a citizen-first Right to Information service

[![Production build](https://github.com/abhieq31/rti-gov/actions/workflows/quality.yml/badge.svg)](https://github.com/abhieq31/rti-gov/actions/workflows/quality.yml)

[Live site](https://rti-gov.vercel.app/) · [GitHub repository](https://github.com/abhieq31/rti-gov) · [Product rationale](docs/PRODUCT.md) · [Official-source register](docs/SOURCES.md) · [Deployment guide](docs/DEPLOYMENT.md)

RTI.gov is an independent working concept for a unified Indian Right to Information service. It is designed around the citizen's complete journey: understand the Act, search proactive disclosures, find the correct public authority, create a precise request, track the statutory clock, reconcile payments and file a first appeal.

The primary interaction has one measurable promise: a citizen can move from “I want this information” to a prototype registration number and exact statutory due date in under 90 seconds on a mid-range phone.

> **Prototype boundary:** This repository is not an official Government of India service. It does not connect to government identity, payment, RTI or records systems. All people, requests, OTPs, documents and transactions are synthetic.

## What works

- Plain-language education grounded in the Right to Information Act, 2005 and the Right to Information Rules, 2012
- Central, State and local authority routing
- Searchable public-disclosure and authority demonstrations
- Official RTI library for Acts, Rules, guides, circulars, reports, data and multilingual source material
- Live Government of India CPIO paths and a Central/State Information Commission directory
- Plain-language RTI glossary and functional text-size/high-contrast controls
- Three-decision RTI request workflow: describe, identify, review and register
- Plain-language authority recommendation across Central, State and local routes
- Immediate prototype registration number and calculated 30-day or 48-hour deadline
- Mobile autofill support, BPL exemption handling and a printable acknowledgement
- OTP-protected request status, transfer history and statutory deadlines
- First appeal, request history, payment reconciliation and passwordless sign-in demonstrations
- Responsive, keyboard-friendly interface with a bilingual Indian public-service identity
- No externally hosted webfont dependency in the critical rendering path
- Search metadata, structured data, sitemap, robots policy, web manifest and social preview

## Demo access

| Purpose | Value |
| --- | --- |
| Registration number | `RTI/MORLY/2026/804271` |
| Citizen email | `aarav.demo@example.in` |
| One-time code | `240805` |
| Payment transaction | `RTIDEMO240822118` |

## Run locally

Requirements: Node.js 22.13 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

The project supports two production targets:

```bash
# Sites / Vinext production build
npm run build

# Vercel / Next.js production build
npm run vercel-build
```

GitHub Actions runs the Vercel-compatible production build for every pull request and push to `main`.

## Project map

```text
app/                     Next.js routes, metadata, sitemap and manifest
components/site-chrome   Shared national masthead, footer and page shells
components/workflows     Interactive citizen workflows
components/portal-data   Synthetic authorities, disclosures, FAQs and cases
components/official-data Curated links to official RTI sources and Commissions
public/                  Parliament and social-preview media
docs/                    Product and release documentation
```

The complete route map is documented in [docs/PRODUCT.md](docs/PRODUCT.md).

## Usability acceptance

The filing journey is designed and tested at a `390 × 844` mobile viewport. The current instrumented browser run completed the full path—starting from a sample information need, confirming the authority, entering synthetic contact details, reviewing, registering and receiving the deadline—in **43 seconds**, with no browser console errors. This is a regression benchmark, not a substitute for moderated testing with citizens.

See [docs/USABILITY.md](docs/USABILITY.md) for the test protocol and non-negotiable experience rules.

## Continuous deployment

`main` is the production branch. The existing Vercel project is connected to `abhieq31/rti-gov`, with Git deployments enabled and `main` selected as the production branch. Every push and pull request is linted and built by GitHub Actions; pushes to `main` create production deployments at [rti-gov.vercel.app](https://rti-gov.vercel.app/), while pull requests receive isolated previews. The independent owner-only Sites release is maintained as a second hosting target.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the release workflow and verification checklist.

## Design principles

1. Start with the constitutional right, not the form.
2. Search before asking a citizen to file.
3. Prevent wrong-authority and duplicate-payment errors before they happen.
4. Make ownership, deadlines and remedies visible.
5. Ask the citizen only for information the law actually requires.
6. Separate plain-language guidance from the official source of record.

## Contributing

Keep changes citizen-facing, evidence-based and accessible. Do not add real personal data, credentials or government marks that could make this prototype appear official. Open a pull request, describe the citizen problem being solved and include the validation performed.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the branch, verification and review contract.
