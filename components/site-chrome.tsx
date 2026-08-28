import Link from 'next/link';
import type { ReactNode } from 'react';
import { GovUtilityTools } from './gov-tools';
import { SiteNav } from './site-nav';

const coreServices = [
  ['Submit Request', '/request'], ['Submit First Appeal', '/appeal'], ['View Status', '/status'],
  ['View History', '/history'], ['Payment Reconciliation', '/payments'],
] as const;

const information = [
  ['Public Authorities', '/authorities'], ['User Manual', '/guide'], ['FAQ', '/faq'],
  ['Contact Us', '/contact'], ['About RTI', '/learn'], ['How it works', '/process'],
  ['Why this redesign', '/compare'],
] as const;

export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main">Skip to main content</a>
    <div className="india-tricolour" aria-hidden="true"><i/><i/><i/></div>
    <div className="gov-utility"><div>
      <span><b>भारत सरकार</b><i/>Government of India</span>
      <GovUtilityTools />
    </div></div>
    <div className="concept-band"><div><b>Independent redesign prototype</b><span>This is not the official RTI Online portal. Use only synthetic demonstration data.</span><Link href="/policies">About this prototype</Link></div></div>
    <header className="gov-header">
      <div className="gov-masthead">
        <Link className="gov-brand" href="/" aria-label="RTI Online home"><span className="gov-mark" aria-hidden="true">RTI</span><span><strong>RTI Online</strong><small>सूचना का अधिकार · Right to Information</small></span></Link>
        <div className="gov-owner"><span>An initiative of</span><b>Department of Personnel &amp; Training</b><small>Ministry of Personnel, Public Grievances &amp; Pensions</small></div>
        <Link className="authority-link" href="/authorities"><span aria-hidden="true">⌕</span><span><b>Public Authorities</b><small>Check availability</small></span></Link>
      </div>
      <SiteNav coreServices={coreServices} information={information} />
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="gov-footer">
    <div className="gov-footer-main">
      <div className="gov-footer-brand"><span className="gov-mark" aria-hidden="true">RTI</span><div><strong>RTI Online</strong><p>Citizen services for Central Government information requests.</p><small>Independent redesign prototype · Not an official filing service</small></div></div>
      <div className="gov-footer-links"><div><b>Citizen services</b>{coreServices.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div><div><b>Information &amp; help</b>{information.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div><div><b>Related services</b><Link href="/commissions">Information Commissions</Link><Link href="/policies">Privacy &amp; accessibility</Link><a href="https://www.india.gov.in/">National Portal of India</a></div></div>
    </div>
    <div className="gov-footer-contact"><b>Help desk</b><span>011-24010690 / 691</span><span>9:00 AM–5:30 PM, Monday–Friday except public holidays</span><span>helprtionline-dopt[at]nic[dot]in</span></div>
    <div className="gov-footer-bottom"><p>All interactions are synthetic and remain on this device.</p><span>Designed toward WCAG 2.1 AA · Formal audit pending</span></div>
  </footer>;
}

export function PageShell({ children }: { children: ReactNode }) { return <div className="government-page india-theme"><SiteHeader/><main id="main">{children}</main><SiteFooter/></div>; }
export function PageHero({ eyebrow, title, intro, actions }: { eyebrow: string; title: string; intro: string; actions?: ReactNode }) { return <section className="page-hero"><span className="page-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p>{actions && <div className="page-actions">{actions}</div>}</section>; }
export function MockNotice({ children }: { children?: ReactNode }) { return <div className="mock-notice"><span>Prototype</span><p>{children || 'This interaction uses synthetic data. Nothing is sent to a government system.'}</p></div>; }
