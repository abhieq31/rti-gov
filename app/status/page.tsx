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
        <span>View Status</span>
        <p>Enter the registration number and email from the receipt. Security code <b>RTI26</b>. First appeal is ₹0.</p>
      </section>
      <StatusLookup initialEmail={email} initialRegistration={registration} />
    </PageShell>
  );
}
