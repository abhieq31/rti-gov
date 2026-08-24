import Link from 'next/link';
import type { ReactNode } from 'react';

const primaryLinks = [
  ['Home', '/'], ['File Request', '/request'], ['First Appeal', '/appeal'],
  ['Track', '/status'], ['Learn', '/learn'], ['Find Authority', '/authorities'],
] as const;

const moreLinks = [
  ['View History', '/history'], ['Search Disclosures', '/search'], ['Citizen Guide', '/guide'],
  ['Payment Reconciliation', '/payments'], ['FAQ', '/faq'], ['Contact Us', '/contact'],
  ['Information Commissions', '/commissions'], ['Citizen Login', '/login'],
] as const;

export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main">Skip to main content</a>
    <div className="national-utility">
      <span><b>भारत सरकार</b><i/>Government of India</span>
      <span className="utility-prototype"><b>Independent prototype</b> · No government system is connected</span>
      <nav aria-label="Utility navigation"><Link href="/contact">Help</Link><Link href="/faq">FAQ</Link></nav>
    </div>
    <header className="national-header">
      <div className="national-masthead">
        <Link className="national-brand" href="/" aria-label="RTI Online prototype home">
          <span className="ashoka-wordmark" aria-hidden="true"><b>अशोक</b><small>सत्यमेव जयते</small></span>
          <span><strong>RTI Online</strong><small>सूचना का अधिकार · Right to Information</small><i>Department of Personnel &amp; Training</i></span>
        </Link>
        <div className="masthead-controls">
          <label><span>Language</span><select aria-label="Select language" defaultValue="English"><option>English</option><option>हिन्दी</option></select></label>
          <Link href="/authorities"><span aria-hidden="true">⌖</span> Public Authorities</Link>
        </div>
      </div>
      <div className="nav-wrap">
        <nav className="national-nav" aria-label="Primary navigation">
          {primaryLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          <details className="more-menu"><summary>More <span aria-hidden="true">⌄</span></summary><div>{moreLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div></details>
        </nav>
        <details className="mobile-menu"><summary><span>Menu</span><b aria-hidden="true">☰</b></summary><div>{primaryLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}{moreLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div></details>
      </div>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="national-footer"><div className="footer-main"><div><b>RTI Online</b><p>An independent citizen-service redesign prototype.</p></div><nav aria-label="Footer services"><Link href="/request">File Request</Link><Link href="/status">Track</Link><Link href="/appeal">First Appeal</Link><Link href="/payments">Payments</Link></nav><nav aria-label="Footer information"><Link href="/guide">Citizen Guide</Link><Link href="/authorities">Authorities</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact</Link></nav></div><div className="footer-boundary"><b>Prototype boundary:</b> This concept does not represent or connect to a Government of India system. All requests, identities, OTPs, files and payments shown are synthetic.</div></footer>;
}

export function PageShell({ children }: { children: ReactNode }) { return <><SiteHeader/><main id="main">{children}</main><SiteFooter/></>; }
export function PageHero({ eyebrow, title, intro, actions }: { eyebrow: string; title: string; intro: string; actions?: ReactNode }) { return <section className="page-hero"><span className="page-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p>{actions && <div className="page-actions">{actions}</div>}</section>; }
export function MockNotice({ children }: { children?: ReactNode }) { return <div className="mock-notice"><span>Demo</span><p>{children || 'This interaction is fully functional with synthetic data. Nothing is sent to a government system.'}</p></div>; }
