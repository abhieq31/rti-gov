import type { Metadata } from 'next';
import { PageShell } from '@/components/site-chrome';
import { HistoryDashboard } from '@/components/workflows';

export const metadata: Metadata = {
  title: 'View three-year RTI request history | RTI Online prototype',
  description: 'View pending and disposed RTI requests, replies, appeals and statutory deadlines in one citizen account.',
};

export default function HistoryPage() {
  return (
    <PageShell>
      <section className="file-strip">
        <span>View History</span>
        <p>Enter the email used to file. History is kept for three years. Demo: aarav.demo@example.in · RTI26.</p>
      </section>
      <HistoryDashboard />
    </PageShell>
  );
}
