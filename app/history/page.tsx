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
        <span>View history</span>
        <p>Aarav’s cases open on this page. Each row shows how many days remain. Demo: aarav.demo@example.in · RTI26.</p>
      </section>
      <HistoryDashboard />
    </PageShell>
  );
}
