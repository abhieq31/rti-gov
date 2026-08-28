import type { Metadata } from 'next'; import { PageShell } from '@/components/site-chrome'; import { RequestWorkflow } from '@/components/workflows';
export const metadata: Metadata = { title: 'Submit a Central RTI request in one minute | RTI Online prototype', description: 'Complete the Central Government RTI request flow from guidelines and applicant details through payment and registration.' };
export default async function RequestPage({ searchParams }: { searchParams: Promise<{ need?: string; authority?: string }> }) {
  const { need, authority } = await searchParams;
  const demo = Boolean(need);
  return (
    <PageShell>
      <section className="file-strip">
        <span>Submit RTI request</span>
        <p>{demo ? 'Accept the guidelines. The request text is ready; you choose the office and type the applicant details.' : 'Central Government only. Write the record you want; the prototype recommends the office.'}</p>
      </section>
      <RequestWorkflow initialAuthority={authority} initialNeed={need} />
    </PageShell>
  );
}
