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
      <section className="fast-request-head">
        <div>
          <span>View history</span>
          <h1>Every request and appeal on one page.</h1>
        </div>
        <p>Aarav’s demonstration history opens on this page. Each row shows the next statutory date. Demo: aarav.demo@example.in · RTI26.</p>
      </section>
      <HistoryDashboard />
    </PageShell>
  );
}
