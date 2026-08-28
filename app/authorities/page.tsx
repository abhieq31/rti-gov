import type { Metadata } from 'next';
import { PageShell } from '@/components/site-chrome';
import { AuthorityFinder } from '@/components/workflows';

export const metadata: Metadata = {
  title: 'Find the public authority that holds the record | RTI Online prototype',
  description: 'Find the Central, State or local public authority likely to hold the records you need.',
};

export default function AuthoritiesPage() {
  return (
    <PageShell>
      <section className="file-strip">
        <span>Public Authorities</span>
        <p>This portal accepts filings only for Central Government public authorities. State and local offices are shown so you do not pay the wrong fee.</p>
      </section>
      <AuthorityFinder />
    </PageShell>
  );
}
