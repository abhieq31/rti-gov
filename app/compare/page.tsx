import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, PageShell } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Official RTI Online versus this civic prototype',
  description: 'Side-by-side of the live rtionline.gov.in citizen portal and this independent redesign.',
};

const highlights = [
  {
    moment: 'The first question',
    official: 'Ministry and public-authority names. Citizens who only know the record they want are stuck.',
    ours: 'The information the citizen wants. The authority is recommended from the sentence.',
  },
  {
    moment: 'Finding the office',
    official: 'A 2,916-row HTML dump of public authorities, about 674 kB.',
    ours: 'Search, with Central versus State routing before anyone pays ₹10.',
  },
  {
    moment: 'The clocks',
    official: 'A lifecycle flowchart image. The trailing-slash URL 404s.',
    ours: 'Readable 30 / 5 / 45 / 90-day clocks, plus the 48-hour life-or-liberty rule.',
  },
] as const;

const rows = [
  ['Starts with', 'Ministry and public-authority names', 'The information the citizen wants'],
  ['Registration / forgot password', 'Linked from Home, both 404', 'OTP history if credentials are missing'],
  ['Request form', 'Hidden behind email, captcha and OTP', 'Guidelines, then the form on the next screen'],
  ['Public authorities', '2,916-row HTML dump (~674 kB)', 'Search, with Central versus State routing'],
  ['Audio captcha', 'WAV 404; popup can show the code', 'Visible demonstration code RTI26'],
  ['Success', 'Registration number after payment gateway', 'Number, authority, fee and statutory due date together'],
  ['Lifecycle clocks', 'Image on Home (trailing-slash 404)', 'Readable 30 / 5 / 45 / 90-day clocks'],
  ['Account', 'Not required to file (same here)', 'Not required to file'],
] as const;

export default function ComparePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Why this prototype exists"
        title="The live portal is a transaction system. Citizens arrive with a sentence."
        intro="Captured 28 August 2026 from rtionline.gov.in. This is not a clone. It keeps the official service names and replaces the failure points."
        actions={
          <>
            <Link className="button-primary" href="/request?need=Inspection%20report%20for%20my%20railway%20station">File a demo request</Link>
            <Link className="button-secondary" href="/process">See the clocks</Link>
          </>
        }
      />
      <section className="compare-highlights" aria-label="Three differences that matter">
        {highlights.map((item) => (
          <article key={item.moment}>
            <span>{item.moment}</span>
            <div>
              <small>rtionline.gov.in today</small>
              <p>{item.official}</p>
            </div>
            <div>
              <small>This prototype</small>
              <p>{item.ours}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="compare-table" aria-label="Official portal compared with this prototype">
        <table>
          <thead>
            <tr>
              <th>Citizen moment</th>
              <th>rtionline.gov.in today</th>
              <th>This prototype</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([moment, official, ours]) => (
              <tr key={moment}>
                <th scope="row">{moment}</th>
                <td>{official}</td>
                <td>{ours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageShell>
  );
}
