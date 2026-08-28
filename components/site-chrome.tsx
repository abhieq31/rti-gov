import Link from 'next/link';
import type { ReactNode } from 'react';

const services = [
  ['File request', '/request'], ['First appeal', '/appeal'], ['Track request', '/status'],
  ['Request history', '/history'], ['Payment help', '/payments'],
] as const;

const information = [
  ['Current vs proposed', '/compare'],
  ['Learn about RTI', '/learn'], ['Find an authority', '/authorities'], ['Search disclosures', '/search'],
  ['User guide', '/guide'], ['FAQ', '/faq'], ['Contact', '/contact'],
] as const;

export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main">Skip to main content</a>
    <div className="rti-prototype"><div><span>Independent redesign concept</span><p>Not an official Government of India filing service. Do not enter real personal or payment information.</p><Link href="/policies">About this prototype</Link></div></div>
    <div className="rti-utility"><div>
      <span className="rti-gov-id"><i aria-hidden="true"><b/><b/><b/></i><span><strong>भारत · India</strong><small>Independent public-service concept</small></span></span>
      <nav aria-label="Utility navigation"><Link href="/guide">Help</Link><Link href="/policies">Accessibility</Link><span className="rti-language">English</span></nav>
    </div></div>
    <header className="rti-header">
      <div className="rti-masthead">
        <Link className="rti-brand" href="/" aria-label="RTI Online home"><span className="rti-chakra" aria-hidden="true">✺</span><span><strong>RTI Online</strong><small>सूचना का अधिकार · Right to Information</small></span></Link>
        <div className="rti-owner"><span>Right to Information service concept</span><b>Central, State and local routing in one guided journey</b><Link href="/authorities">Public authorities available →</Link></div>
      </div>
      <nav className="rti-nav" aria-label="Primary navigation"><Link href="/">Home</Link>{services.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link className="rti-login" href="/login">Citizen login <span aria-hidden="true">→</span></Link></nav>
      <details className="rti-mobile-menu"><summary>Menu <span aria-hidden="true">☰</span></summary><nav aria-label="Mobile navigation">{[...services, ...information].map(([label, href]) => <Link key={href} href={href}>{label}<span>→</span></Link>)}<Link href="/login">Citizen login <span>→</span></Link></nav></details>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="rti-footer">
    <div className="rti-footer-brand"><span className="rti-chakra" aria-hidden="true">✺</span><div><strong>RTI Online</strong><p>A citizen-first independent concept inspired by India’s Central RTI service.</p></div></div>
    <div className="rti-footer-links"><div><b>Use the service</b>{services.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div><div><b>Information</b>{information.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div><div><b>After the response</b><Link href="/appeal">First appeal</Link><Link href="/commissions">Information Commissions</Link><Link href="/process">How the process works</Link><Link href="/policies">Policies &amp; accessibility</Link></div></div>
    <div className="rti-footer-bottom"><p>Independent prototype · No connection to a government filing system · All example data is synthetic.</p><span>Designed toward WCAG 2.1 AA · Formal audit pending</span></div>
  </footer>;
}

export function PageShell({ children }: { children: ReactNode }) { return <div className="government-page rti-v2"><SiteHeader/><main id="main">{children}</main><SiteFooter/></div>; }
export function PageHero({ eyebrow, title, intro, actions }: { eyebrow: string; title: string; intro: string; actions?: ReactNode }) { return <section className="page-hero"><span className="page-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p>{actions && <div className="page-actions">{actions}</div>}</section>; }
export function MockNotice({ children }: { children?: ReactNode }) { return <div className="mock-notice"><span>Demo</span><p>{children || 'This interaction is fully functional with synthetic data. Nothing is sent to a government system.'}</p></div>; }
