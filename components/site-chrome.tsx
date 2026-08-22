import Link from 'next/link';
import type { ReactNode } from 'react';
import { AccessibilityTools } from '@/components/accessibility-tools';

const primary = [
  ['Learn RTI', '/learn'],
  ['Search & data', '/search'],
  ['Find authority', '/authorities'],
  ['RTI library', '/resources'],
  ['Track & appeal', '/status'],
] as const;

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className="india-ribbon">
        <div className="india-identity">
          <span className="flag-mini" aria-hidden="true"><i/><i/><i/></span>
          <span><b>भारत सरकार के लिए प्रस्तावित</b><small>Proposed Government of India service</small></span>
        </div>
        <span className="prototype-label">Independent prototype · No government systems connected</span>
      </div>
      <div className="department-bar"><span>कार्मिक एवं प्रशिक्षण विभाग</span><b>Department of Personnel & Training</b><div><AccessibilityTools/><Link href="/contact">Help</Link><Link href="/login">Citizen sign in</Link></div></div>
      <header className="site-header-v2">
        <div className="brand-row">
          <Link className="brand-v2" href="/" aria-label="RTI.gov home">
            <span className="rti-mark" aria-hidden="true"><i>RTI</i><small>2005</small></span>
            <span><strong>RTI.gov</strong><small>सूचना का अधिकार · Right to Information</small></span>
          </Link>
          <div className="service-promise">
            <b>One clear path to public information</b>
            <p>Ask, register, track and appeal without learning the machinery.</p>
          </div>
        </div>
        <nav className="primary-nav" aria-label="Primary navigation">
          {primary.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link className="file-now" href="/request">Create a request <span>→</span></Link>
        </nav>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer-v2">
      <div className="footer-lead">
        <span className="rti-mark small"><i>RTI</i><small>2005</small></span>
        <div><b>RTI.gov</b><small>सूचना आपका अधिकार है · Information is your right.</small></div>
      </div>
      <div className="footer-map">
        <div><b>Use RTI.gov</b><Link href="/request">File a request</Link><Link href="/status">View status</Link><Link href="/history">Request history</Link><Link href="/payments">Payment reconciliation</Link></div>
        <div><b>Know your right</b><Link href="/learn">RTI Act explained</Link><Link href="/guide">Citizen guide</Link><Link href="/resources">Official RTI library</Link><Link href="/glossary">RTI glossary</Link></div>
        <div><b>Find the system</b><Link href="/authorities">Public authorities & CPIOs</Link><Link href="/commissions">Information Commissions</Link><Link href="/faq">Frequently asked questions</Link><Link href="/contact">Contact and help</Link></div>
      </div>
      <div className="prototype-disclosure">
        <p><b>Prototype boundary:</b> This is an independent competition concept. It does not submit to, represent, or connect with any Government of India system. All identities, requests, OTPs, files and payments shown are synthetic.</p>
        <p>Parliament photograph: Pinakpani / Wikimedia Commons, CC BY-SA 4.0.</p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <><SiteHeader /><main id="main">{children}</main><SiteFooter /></>;
}

export function PageHero({ eyebrow, title, intro, actions }: { eyebrow: string; title: string; intro: string; actions?: ReactNode }) {
  return (
    <section className="page-hero">
      <span className="page-eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{intro}</p>
      {actions && <div className="page-actions">{actions}</div>}
    </section>
  );
}

export function MockNotice({ children }: { children?: ReactNode }) {
  return <div className="mock-notice"><span>Demo</span><p>{children || 'This interaction is fully functional with synthetic data. Nothing is sent to a government system.'}</p></div>;
}
