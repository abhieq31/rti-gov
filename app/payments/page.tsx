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
        <span>Payment Reconciliation</span>
        <p>Use this if money was debited but no registration number arrived. Do not pay twice. Security code <b>RTI26</b>.</p>
      </section>
      <PaymentReconciliation />
    </PageShell>
  );
}
