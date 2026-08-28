# RTI Online public reference

State-by-state reconstruction of the **public citizen** portal at https://rtionline.gov.in/. Not a clone spec.

Generated 2026-08-28T07:40:20.201Z. Human-assisted: no.

## Counts

| Label | Count |
| --- | --- |
| VERIFIED_LIVE | 32 |
| VERIFIED_HUMAN_ASSISTED | 0 |
| DOCUMENTED_ONLY | 24 |
| UNREACHABLE | 0 |
| BROKEN_OFFICIAL_SITE | 2 |
| Total distinct states | 58 |

## How to rerun

```bash
npm run audit:rti-online
npm run audit:rti-online -- --human-assisted
```

HUMAN_ASSISTED keeps Chromium open at captcha, OTP, login, payment and registration-number gates. Enter the value in the browser; the runner resumes when the page changes or you press Enter.

Captcha is never solved automatically. Wrong-captcha and empty-submit probes are VERIFIED_LIVE. Anything taken only from the PDF is DOCUMENTED_ONLY.

| File | What |
| --- | --- |
| `state-inventory.md` | Every distinct UI state |
| `states.json` | Machine-readable inventory |
| `unverified-manual-only.md` | DOCUMENTED_ONLY only |
| `flows/*.md` | Per-flow graphs |
| `screenshots/desktop/` `screenshots/mobile/` | Live PNGs |
| `feature-matrix.md` | Official vs this repository |

Do not claim 100% coverage while transactional states remain DOCUMENTED_ONLY.

