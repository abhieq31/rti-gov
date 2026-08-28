import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: '30, 5, 45 and 90-day RTI clocks | RTI Online prototype',
  description: 'The official citizen clocks: 30 days to reply, 5 days to transfer, 45 days for a first appeal, 90 days for a second appeal to the CIC.',
};

const spine = [
  { time: 'Day 0', title: 'Request registered', copy: 'You leave with a registration number, the filing date and the usual statutory due date on the same screen.' },
  { time: '48 hours', title: 'Life or liberty', copy: 'Use only for a genuine emergency. The CPIO must reply in two days, not thirty. The prototype marks this on the receipt when selected.', urgent: true },
  { time: '30 days', title: 'Reply', copy: 'The CPIO sends the record, a lawful exemption, an extra-fee notice or a transfer. If you are satisfied, the case ends.' },
  { time: '5 days', title: 'Transfer', copy: 'If another Central authority holds the record, the request should move within five days. That office then has its own 30-day clock.' },
  { time: '45 days', title: 'First appeal · ₹0', copy: 'Silence, denial or an incomplete reply is enough. No fee. The First Appellate Authority should decide within 45 days.' },
  { time: '90 days', title: 'Second appeal', copy: 'Central cases go to the Central Information Commission. That filing sits outside this portal.' },
] as const;

export default function ProcessPage() {
  return (
    <PageShell>
      <section className="file-strip">
        <span>How the service works</span>
        <p>These clocks match the official RTI Online homepage diagram. The prototype shows them as a file, not a missing image.</p>
      </section>
      <section className="process-file" aria-label="Statutory clocks after an RTI request">
        <ol className="clock-spine">
          {spine.map((item) => (
            <li className={'urgent' in item && item.urgent ? 'urgent' : undefined} key={item.title}>
              <b>{item.time}</b>
              <div>
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="clock-note">A Section 18 complaint to the CIC is a separate remedy when there is no applicable time limit. Second appeals are not filed through this portal.</p>
        <p className="clock-note"><Link className="button-primary" href="/request?need=Inspection%20report%20for%20my%20railway%20station">File a demo request</Link></p>
      </section>
    </PageShell>
  );
}
