import type { Metadata } from 'next';
import { PageShell } from '@/components/site-chrome';
import { StatusLookup } from '@/components/workflows';

export const metadata: Metadata = {
  title: 'Track an RTI case and its 30-day clock | RTI Online prototype',
  description: 'Securely view RTI status, deadlines, transfers, replies, additional fees and appeal options.',
};

export default async function StatusPage({ searchParams }: { searchParams: Promise<{ registration?: string; email?: string }> }) {
  const { registration, email } = await searchParams;
  return (
    <PageShell>
      <section className="file-strip">
        <span>View status</span>
        <p>The case file is below. Track <b>RTI/MORLY/2026/804271</b>. First appeal is ₹0 and starts a 45-day clock.</p>
      </section>
      <StatusLookup initialEmail={email} initialRegistration={registration} />
    </PageShell>
  );
}
