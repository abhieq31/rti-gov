import Link from 'next/link';
import type { ReactNode } from 'react';

const primary = [
  ['Learn', '/learn'],
  ['Search records', '/search'],
  ['Find authority', '/authorities'],
  ['Track', '/status'],
  ['First appeal', '/appeal'],
] as const;

export function SiteHeader() {
  return (
    <>
      <div className="gov-ribbon">
        <span><b>RTI.gov</b> · A proposed unified public service for India</span>
        <span className="prototype-label">Independent prototype · No government systems connected</span>
      </div>
      <header className="site-header-v2">
        <div className="brand-row">
          <Link className="brand-v2" href="/" aria-label="RTI.gov home">
            <span className="rti-mark" aria-hidden="true">RTI</span>
            <span><strong>RTI.gov</strong><small>Right to Information</small></span>
          </Link>
          <div className="header-tools">
            <Link href="/guide">Citizen guide</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Help</Link>
            <Link className="sign-in" href="/login">Sign in</Link>
          </div>
        </div>
        <nav className="primary-nav" aria-label="Primary navigation">
          {primary.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link className="file-now" href="/request">File an RTI request <span>→</span></Link>
        </nav>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer-v2">
      <div className="footer-lead">
        <span className="rti-mark small">RTI</span>
        <div><b>RTI.gov</b><small>Information is your right.</small></div>
      </div>
      <div className="footer-map">
        <div><b>Use RTI.gov</b><Link href="/request">File a request</Link><Link href="/status">View status</Link><Link href="/history">Request history</Link><Link href="/payments">Payment reconciliation</Link></div>
        <div><b>Know your right</b><Link href="/learn">RTI Act explained</Link><Link href="/guide">Citizen guide</Link><Link href="/faq">Frequently asked questions</Link><Link href="/authorities">Public authorities</Link></div>
        <div><b>Support</b><Link href="/contact">Contact and help</Link><Link href="/appeal">First appeal</Link><Link href="/login">Demo citizen login</Link><a href="#accessibility">Accessibility</a></div>
      </div>
      <div className="prototype-disclosure">
        <p><b>Prototype boundary:</b> This is an independent competition concept. It does not submit to, represent, or connect with any Government of India system. All identities, requests, OTPs, files and payments shown are synthetic.</p>
        <p>Parliament photograph: Pinakpani / Wikimedia Commons, CC BY-SA 4.0.</p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <><SiteHeader /><main>{children}</main><SiteFooter /></>;
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
