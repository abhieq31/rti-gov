# Contributing to RTI.gov

The product standard is simple: make a citizen's path to public information clearer without weakening legal accuracy, accessibility or the prototype boundary.

## Change workflow

1. Create a short-lived branch from `main`.
2. Make one coherent citizen-facing change.
3. Run `npm run lint` and `npm run vercel-build`.
4. Test the affected route at desktop and `390 × 844` mobile dimensions.
5. Open a pull request using the repository template.
6. Wait for the GitHub production-build check and inspect the Vercel preview.
7. Merge to `main`; Vercel then publishes the production release.

## Review gates

- Preserve the independent-prototype disclosure.
- Never commit real applicant data, credentials, OTPs or payment information.
- Check legal claims against the Act, Rules or official government guidance and update `docs/SOURCES.md` when a new source is introduced.
- Keep the primary filing path to three citizen decisions before registration.
- Show a registration number and exact due date together.
- Use semantic HTML, keyboard operation, visible focus and reduced-motion support.
- Do not introduce an externally hosted font into the critical path.

## Commit and pull-request quality

Describe the citizen problem, not just the files changed. A strong pull request includes the affected journey, screenshots when layout changes, validation performed and the authoritative source for any legal or procedural claim.
