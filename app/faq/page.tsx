import type { Metadata } from 'next';
import { PageShell } from '@/components/site-chrome';
import { FaqList } from '@/components/workflows';

export const metadata: Metadata = {
  title: 'RTI fees, clocks and filing questions | RTI Online prototype',
  description: 'Plain-language answers about eligibility, records, fees, timelines, transfers, status and first appeals.',
};

export default function FaqPage() {
  return (
    <PageShell>
      <section className="file-strip">
        <span>FAQ</span>
        <p>Plain answers about fees, clocks, status and first appeals before the legal language.</p>
      </section>
      <section className="narrow-content">
        <FaqList />
      </section>
    </PageShell>
  );
}
