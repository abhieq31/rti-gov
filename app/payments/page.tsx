import type { Metadata } from 'next';
import { PageShell } from '@/components/site-chrome';
import { PaymentReconciliation } from '@/components/workflows';

export const metadata: Metadata = {
  title: 'Reconcile an RTI payment without paying twice | RTI Online prototype',
  description: 'Check a payment when money was deducted but an RTI registration number was not generated.',
};

export default function PaymentsPage() {
  return (
    <PageShell>
      <section className="file-strip">
        <span>Payment reconciliation</span>
        <p>Find the ₹10 once. Do not pay twice. Demo transaction <b>RTIDEMO240822118</b> · aarav.demo@example.in · RTI26.</p>
      </section>
      <PaymentReconciliation />
    </PageShell>
  );
}
