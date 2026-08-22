# Deployment and release workflow

## Production

- Primary public URL: `https://rti-gov.vercel.app`
- Production branch: `main`
- Build command: `npm run vercel-build`
- Framework output: Next.js

GitHub Actions already validates the repository. Automatic Vercel deployment requires one account-level prerequisite: connect the GitHub identity in Vercel **Account Settings → Authentication**, then connect `https://github.com/abhieq31/rti-gov` to the existing `rti-gov` project. After that connection, a merged or direct push to `main` triggers production and pull requests create isolated preview deployments.

## Release sequence

1. Create a branch and make the change.
2. Run `npm run vercel-build`.
3. Open a pull request and wait for the GitHub quality check.
4. Review the Vercel preview deployment.
5. Merge to `main`.
6. Confirm the production deployment is ready.
7. Verify the homepage, request flow, status flow, sitemap and robots policy.

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
