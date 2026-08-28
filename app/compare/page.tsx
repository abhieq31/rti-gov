import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Official RTI Online versus this civic prototype',
  description: 'Side-by-side of the live rtionline.gov.in citizen portal and this independent redesign.',
};

const rows = [
  { moment: 'The first question', official: 'Ministry and public-authority names. Citizens who only know the record they want are stuck.', ours: 'The information the citizen wants. The authority is recommended from the sentence.' },
  { moment: 'Finding the office', official: 'A 2,916-row HTML dump of public authorities, about 674 kB.', ours: 'Search, with Central versus State routing before anyone pays ₹10.' },
  { moment: 'The clocks', official: 'A lifecycle flowchart image. The trailing-slash URL 404s.', ours: 'Readable 30 / 5 / 45 / 90-day clocks, plus the 48-hour life-or-liberty rule.' },
  { moment: 'Getting in', official: 'Email check, captcha and OTP before the form. Audio captcha 404s.', ours: 'Guidelines, then the form. The known demonstration uses code RTI26 and skips a fake mailbox.' },
  { moment: 'Success', official: 'A registration number after the payment gateway.', ours: 'Number, authority, fee and statutory due date together.' },
  { moment: 'First appeal', official: 'Another lookup, another captcha, and a fee confusion.', ours: '₹0. A 45-day FAA clock. Continue stays blocked until you confirm.' },
] as const;

export default function ComparePage() {
  return (
    <PageShell>
      <section className="file-strip">
        <span>Why this prototype exists</span>
        <p>Captured 28 August 2026 from rtionline.gov.in. This is not a clone. It keeps the official service names and replaces the failure points.</p>
      </section>
      <section className="civic-why" aria-label="Official portal compared with this prototype">
        <div>
          <span className="india-kicker">Official today / this prototype</span>
          <h2>The live portal is a transaction system. Citizens arrive with a sentence.</h2>
          <p>Use the one-minute Railway Board walk, then come back if you want the ledger.</p>
          <Link href="/request?need=Inspection%20report%20for%20my%20railway%20station">File a demo request →</Link>
        </div>
        <ul>
          {rows.map((row) => (
            <li key={row.moment}>
              <div>
                <span>rtionline.gov.in</span>
                <b>{row.official}</b>
              </div>
              <div>
                <span>{row.moment}</span>
                <strong>{row.ours}</strong>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
