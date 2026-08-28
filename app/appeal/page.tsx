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
      <section className="fast-request-head">
        <div>
          <span>Submit first appeal</span>
          <h1>No fee. A 45-day clock starts today.</h1>
        </div>
        <p><b>First appeal is free.</b> Use the original request number. The First Appellate Authority should decide within 45 days. Demo: RTI/MORLY/2026/804271 · aarav.demo@example.in · RTI26.</p>
      </section>
      <AppealWorkflow initialRegistration={registration} />
    </PageShell>
  );
}
