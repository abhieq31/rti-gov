import Link from 'next/link';
import type { ReactNode } from 'react';

const serviceLinks = [
  ['Submit Request', '/request'], ['Submit First Appeal', '/appeal'], ['View Status', '/status'],
  ['View History', '/history'], ['Payment Reconciliation', '/payments'], ['Login', '/login'],
] as const;

const informationLinks = [
  ['Citizen Guide', '/guide'], ['FAQ', '/faq'], ['Contact Us', '/contact'],
  ['Find Public Authority', '/authorities'], ['Search Disclosures', '/search'],
  ['RTI Process', '/learn'], ['Information Commissions', '/commissions'],
] as const;

export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main">Skip to main content</a>
    <div className="gov-utility"><div className="gov-utility-left"><b>भारत सरकार</b><span>Government of India</span></div><div className="gov-utility-right"><Link href="/contact">Help desk</Link><Link href="/faq">FAQ</Link><span>Text size: A− A A+</span></div></div>
    <div className="prototype-strip" role="note"><b>INDEPENDENT PROTOTYPE</b><span>Not an official Government of India website. No live RTI, identity or payment service is connected.</span></div>
    <header className="portal-header">
      <div className="portal-brand-row">
        <Link className="portal-brand" href="/" aria-label="RTI Online prototype home"><span className="portal-seal" aria-hidden="true"><b>भारत</b><small>सत्यमेव जयते</small></span><span className="portal-brand-copy"><strong>RTI Online</strong><span>सूचना का अधिकार · Right to Information</span><small>An initiative of Department of Personnel &amp; Training, Government of India</small></span></Link>
        <div className="portal-header-tools"><label><span>Select language</span><select aria-label="Select language" defaultValue="English"><option>English</option><option>हिन्दी</option></select></label><Link href="/authorities">Public Authorities Available</Link></div>
      </div>
      <nav className="portal-nav desktop-nav" aria-label="Primary navigation"><Link href="/">Home</Link>{serviceLinks.map(([label, href]) => <Link className={href === '/request' ? 'portal-nav-primary' : ''} href={href} key={href}>{label}</Link>)}</nav>
      <nav className="portal-subnav desktop-nav" aria-label="Information navigation">{informationLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
      <details className="mobile-nav"><summary>Menu <span aria-hidden="true">☰</span></summary><div><Link href="/">Home</Link>{serviceLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}<hr/>{informationLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div></details>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="site-footer-v2"><div className="footer-lead"><span className="rti-mark small"><i>RTI</i><small>2005</small></span><div><b>RTI Online · independent redesign prototype</b><small>सूचना आपका अधिकार है · Information is your right.</small></div></div><div className="footer-map"><div><b>Citizen services</b><Link href="/request">Submit request</Link><Link href="/appeal">Submit first appeal</Link><Link href="/status">View status</Link><Link href="/history">View history</Link></div><div><b>Information</b><Link href="/learn">RTI process</Link><Link href="/search">Search disclosures</Link><Link href="/authorities">Public authorities</Link><Link href="/commissions">Information commissions</Link></div><div><b>Support</b><Link href="/guide">Citizen guide</Link><Link href="/faq">Frequently asked questions</Link><Link href="/contact">Contact and help</Link><Link href="/payments">Payment reconciliation</Link></div></div><div className="prototype-disclosure"><p><b>Prototype boundary:</b> This independent concept does not submit to, represent, or connect with any Government of India system. All identities, requests, OTPs, files and payments shown are synthetic.</p></div></footer>;
}

export function PageShell({ children }: { children: ReactNode }) { return <><SiteHeader/><main id="main">{children}</main><SiteFooter/></>; }

export function PageHero({ eyebrow, title, intro, actions }: { eyebrow: string; title: string; intro: string; actions?: ReactNode }) { return <section className="page-hero"><span className="page-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p>{actions && <div className="page-actions">{actions}</div>}</section>; }

export function MockNotice({ children }: { children?: ReactNode }) { return <div className="mock-notice"><span>Demo</span><p>{children || 'This interaction is fully functional with synthetic data. Nothing is sent to a government system.'}</p></div>; }
