import type { Metadata } from 'next'; import { PageShell } from '@/components/site-chrome'; import { RequestWorkflow } from '@/components/workflows';
export const metadata: Metadata = { title: 'Submit Request | RTI Online prototype', description: 'File a Central Government RTI request: guidelines, record, public authority, applicant, payment and registration.' };
export default async function RequestPage({ searchParams }: { searchParams: Promise<{ need?: string; authority?: string }> }) {
  const { need, authority } = await searchParams;
  return (
    <PageShell>
      <section className="file-strip">
        <span>Submit Request</span>
        <p>Central Government only. Write the record you want. The prototype suggests the public authority. Security code RTI26.</p>
      </section>
      <RequestWorkflow initialAuthority={authority} initialNeed={need} />
    </PageShell>
  );
}
