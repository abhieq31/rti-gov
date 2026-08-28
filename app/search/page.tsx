import type { Metadata } from 'next';
import { PageShell } from '@/components/site-chrome';
import { SearchRecords } from '@/components/workflows';

export const metadata: Metadata = {
  title: 'Search published records before filing | RTI Online prototype',
  description: 'Search proactive disclosures, public records and authority topics before making an RTI request.',
};

export default function SearchPage() {
  return (
    <PageShell>
      <section className="file-strip">
        <span>Search public information</span>
        <p>The fastest RTI request is the one you do not need to file. These results are synthetic catalogue entries.</p>
      </section>
      <SearchRecords />
    </PageShell>
  );
}
