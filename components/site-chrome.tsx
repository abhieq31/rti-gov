import Link from 'next/link';
import type { ReactNode } from 'react';

const primaryServices = [
  ['File request', '/request'],
  ['Track request', '/status'],
  ['First appeal', '/appeal'],
] as const;

const supportLinks = [
  ['Learn about RTI', '/learn'],
  ['Find an authority', '/authorities'],
  ['User guide', '/guide'],
  ['FAQ', '/faq'],
  ['Contact', '/contact'],
] as const;

export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main">Skip to main content</a>
    <div className="concept-notice"><div><b>Independent redesign concept</b><span>Not an official Government of India service. Do not enter real personal or payment information.</span><Link href="/policies">Learn more</Link></div></div>
    <header className="new-site-header">
      <div className="new-header-inner">
        <Link className="new-brand" href="/" aria-label="RTI Online home">
          <span className="new-emblem" aria-hidden="true">अ</span>
          <span><strong>RTI Online</strong><small>Right to Information</small></span>
        </Link>
        <nav className="new-desktop-nav" aria-label="Primary navigation">
          {primaryServices.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link href="/guide">Help</Link>
        </nav>
        <Link className="new-login-link" href="/login">My RTI <span aria-hidden="true">→</span></Link>
        <details className="new-mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">{[...primaryServices, ...supportLinks].map(([label, href]) => <Link key={href} href={href}>{label}<span>→</span></Link>)}<Link href="/login">My RTI <span>→</span></Link></nav>
        </details>
      </div>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="new-footer">
    <div className="new-footer-top">
      <div className="new-footer-brand"><span className="new-emblem" aria-hidden="true">अ</span><div><strong>RTI Online</strong><p>A clearer way to exercise your right to information.</p></div></div>
      <div className="new-footer-links"><div><b>Use the service</b>{primaryServices.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/history">Request history</Link><Link href="/payments">Payment help</Link></div><div><b>Understand RTI</b>{supportLinks.slice(0, 4).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/process">How it works</Link></div></div>
    </div>
    <div className="new-footer-bottom"><p>Independent prototype. No connection to a government filing or payment system.</p><div><Link href="/policies">Privacy &amp; accessibility</Link><Link href="/commissions">Information commissions</Link></div></div>
  </footer>;
}

export function PageShell({ children }: { children: ReactNode }) { return <div className="government-page new-rti"><SiteHeader/><main id="main">{children}</main><SiteFooter/></div>; }
export function PageHero({ eyebrow, title, intro, actions }: { eyebrow: string; title: string; intro: string; actions?: ReactNode }) { return <section className="page-hero"><span className="page-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p>{actions && <div className="page-actions">{actions}</div>}</section>; }
export function MockNotice({ children }: { children?: ReactNode }) { return <div className="mock-notice"><span>Demo</span><p>{children || 'This interaction is fully functional with synthetic data. Nothing is sent to a government system.'}</p></div>; }
