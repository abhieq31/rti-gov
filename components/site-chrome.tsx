import Link from 'next/link';
import type { ReactNode } from 'react';

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className="gov-utility">
        <div className="gov-utility-left">
          <b>भारत सरकार</b>
          <span>Government of India</span>
        </div>
        <div className="gov-utility-right">
          <Link href="/contact">Help</Link>
          <Link href="/faq">FAQ</Link>
          <span aria-label="Hindi language option">हिन्दी</span>
        </div>
      </div>
      <div className="prototype-strip" role="note">
        Independent redesign prototype · Not an official Government of India website · No live RTI, identity or payment systems are connected
      </div>
      <header className="portal-header">
        <div className="portal-brand-row">
          <Link className="portal-brand" href="/" aria-label="RTI Online prototype home">
            <span className="portal-seal" aria-hidden="true"><b>RTI</b><small>2005</small></span>
            <span className="portal-brand-copy">
              <strong>RTI ONLINE</strong>
              <span>सूचना का अधिकार · Right to Information</span>
              <small>Department of Personnel &amp; Training</small>
            </span>
          </Link>
          <div className="portal-help">
            <span>Citizen services for Right to Information</span>
            <Link href="/guide">How to use this service →</Link>
          </div>
        </div>
        <nav className="portal-nav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link className="portal-nav-primary" href="/request">Submit Request</Link>
          <Link href="/appeal">Submit First Appeal</Link>
          <Link href="/status">View Status</Link>
          <Link href="/history">View History</Link>
          <Link href="/login">Login</Link>
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
        <div><b>RTI Online · redesign prototype</b><small>सूचना आपका अधिकार है · Information is your right.</small></div>
      </div>
      <div className="footer-map">
        <div><b>Citizen services</b><Link href="/request">Submit request</Link><Link href="/appeal">Submit first appeal</Link><Link href="/status">View status</Link><Link href="/history">View history</Link></div>
        <div><b>Information</b><Link href="/learn">RTI Act explained</Link><Link href="/guide">Citizen guide</Link><Link href="/faq">Frequently asked questions</Link><Link href="/authorities">Public authorities</Link></div>
        <div><b>Support</b><Link href="/contact">Contact and help</Link><Link href="/payments">Payment reconciliation</Link><Link href="/login">Citizen login</Link><a href="#accessibility">Accessibility</a></div>
      </div>
      <div className="prototype-disclosure">
        <p><b>Prototype boundary:</b> This is an independent redesign concept. It does not submit to, represent, or connect with any Government of India system. All identities, requests, OTPs, files and payments shown are synthetic.</p>
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
