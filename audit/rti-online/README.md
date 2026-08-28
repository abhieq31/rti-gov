# RTI Online public audit

Playwright capture of the **public citizen-facing** portal at https://rtionline.gov.in/. Output lands in `docs/reference/rti-online/`.

This is not a clone spec. It never solves captcha, never sends OTP, never logs in, never pays, and never files a request or appeal.

## Run

```bash
npm --prefix audit/rti-online install   # first time: downloads Chromium
npm run audit:rti-online
npm run audit:rti-online -- --human-assisted   # headed Chromium; you type captcha/OTP
```

Seeds URLs from the SiteOne JSON at `/Users/abhipatel/tmp/rtionline.gov.in.output.*.json` when present, plus known public PHP routes. `pageid` and other session-like query parameters are collapsed.

## Safety

- GET navigation and in-page UI only, except the guidelines checkbox POST (it only opens the next gate).
- Login, OTP, payment, appeal-lookup and request-form POSTs are aborted at the network layer.
- Empty-form clicks are used only to surface client-side validation / alerts.
- Assets, captcha images and trailing-slash image 404s are not treated as citizen screens.
