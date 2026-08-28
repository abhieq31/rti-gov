import type { Metadata } from 'next';
import { PageShell } from '@/components/site-chrome';
import { DemoLogin } from '@/components/workflows';

export const metadata: Metadata = {
  title: 'Citizen login with demonstration account | RTI Online prototype',
  description: 'Sign in to the synthetic citizen account with username, password and security code.',
};

export default function LoginPage() {
  return (
    <PageShell>
      <section className="file-strip">
        <span>Login</span>
        <p>An account is not required to file. Demo username <b>aarav.demo</b>, password <b>rti@2026</b>, security code <b>RTI26</b>.</p>
      </section>
      <DemoLogin />
    </PageShell>
  );
}
