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
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className="india-tricolour" aria-hidden="true"><i /><i /><i /></div>
      <div className="concept-band">
        <div>
          <b>Independent redesign prototype</b>
          <span>Not the official RTI Online portal. Synthetic data only.</span>
          <GovUtilityTools />
        </div>
      </div>
      <header className="gov-header">
        <div className="gov-masthead">
          <Link className="gov-brand" href="/" aria-label="RTI Online home">
            <span className="gov-mark" aria-hidden="true">RTI</span>
            <span>
              <strong>RTI Online</strong>
              <small>सूचना का अधिकार · Right to Information</small>
            </span>
          </Link>
          <span className="gov-owner">
            <span>Independent prototype</span>
            <b>Not a Government of India service</b>
          </span>
        </div>
        <SiteNav coreServices={coreServices} information={information} />
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="gov-footer">
      <div className="gov-footer-main">
        <div className="gov-footer-brand">
          <span className="gov-mark" aria-hidden="true">RTI</span>
          <div>
            <strong>RTI Online</strong>
            <p>Independent redesign prototype. Nothing is filed or charged.</p>
          </div>
        </div>
        <div className="gov-footer-links">
          <div>
            {coreServices.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </div>
          <div>
            <Link href="/process">How it works</Link>
            <Link href="/compare">Why this redesign</Link>
            <Link href="/policies">About this prototype</Link>
          </div>
        </div>
      </div>
      <div className="gov-footer-bottom">
        <p>Official RTI Online help desk (rtionline.gov.in): 011-24010690 / 691.</p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="government-page india-theme"><SiteHeader /><main id="main">{children}</main><SiteFooter /></div>;
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
  return (
    <div className="mock-notice">
      <span>Prototype</span>
      <p>{children || 'This interaction uses synthetic data. Nothing is sent to a government system.'}</p>
    </div>
  );
}
