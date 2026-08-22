# Deployment and release workflow

## Production

- Primary public URL: `https://rti-gov.vercel.app`
- Production branch: `main`
- Build command: `npm run vercel-build`
- Framework output: Next.js
- Git source: `github.com/abhieq31/rti-gov`
- Git deployment state: enabled

The Vercel project is connected to the GitHub repository and uses `main` as its production branch. GitHub Actions independently lints and builds every pull request and every push to `main`. Vercel creates a preview for pull requests and a production release for `main`.

The production URL is stable; individual deployment URLs are immutable release artifacts. Do not manually deploy routine source changes. A normal Git merge is the release mechanism.

## Release sequence

1. Create a branch and make the change.
2. Run `npm run lint` and `npm run vercel-build`.
3. Open a pull request and wait for the GitHub quality check.
4. Review the Vercel preview deployment.
5. Merge to `main`.
6. Confirm the production deployment is ready.
7. Verify the homepage, request flow, status flow, sitemap and robots policy.

## Connection audit

Verify the Vercel project before relying on automation:

- Project: `rti-gov`
- Repository: `abhieq31/rti-gov`
- Provider: GitHub
- Production branch: `main`
- Git deployments: enabled
- Canonical production alias: `rti-gov.vercel.app`

For a release to count as Git-driven, Vercel deployment metadata must identify the same commit SHA as GitHub `main`; a successful manual CLI deployment is not sufficient evidence.

## Rollback

Use Vercel's deployment history to promote the last known-good immutable deployment. Do not rewrite Git history. Follow with a normal reverting commit on `main` so repository state and production state converge again.

## Search release checks

- Page titles and descriptions match the page intent.
- The canonical origin is `https://rti-gov.vercel.app`.
- `/sitemap.xml`, `/robots.txt` and `/manifest.webmanifest` return successfully.
- Public pages are indexable; the synthetic login route is excluded from crawling.
- Structured data and the social preview resolve against the production origin.

## Prototype safety checks

- The independent-prototype disclosure remains visible.
- No personal data, secrets, real OTPs or real payment information are committed.
- No workflow claims to transmit information to a government system.
- Any new legal statement is checked against an authoritative Act, Rule or official guidance source.
