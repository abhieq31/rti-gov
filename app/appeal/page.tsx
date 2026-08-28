import type { Metadata } from 'next';
import { PageShell } from '@/components/site-chrome';
import { AppealWorkflow } from '@/components/workflows';

export const metadata: Metadata = {
  title: 'File a no-fee first RTI appeal | RTI Online prototype',
  description: 'Prepare a no-fee first appeal for delay, denial, incomplete information or unreasonable fees.',
};

export default async function AppealPage({ searchParams }: { searchParams: Promise<{ registration?: string }> }) {
  const { registration } = await searchParams;
  return (
    <PageShell>
      <section className="file-strip">
        <span>Submit first appeal</span>
        <p><b>No fee.</b> The First Appellate Authority has 45 days. Demo: RTI/MORLY/2026/804271 · aarav.demo@example.in · RTI26.</p>
      </section>
      <AppealWorkflow initialRegistration={registration} />
    </PageShell>
  );
}
