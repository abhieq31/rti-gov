'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type NavLink = readonly [string, string];

const caseServices = [
  ['View History', '/history'],
  ['Payment Reconciliation', '/payments'],
] as const;

function isCurrent(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav({
  coreServices,
  information,
}: {
  coreServices: readonly NavLink[];
  information: readonly NavLink[];
}) {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const drawerId = 'citizen-menu';
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const setOpen = (value: boolean) => setOpenPath(value ? pathname : null);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : menuRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenPath(null);
      if (event.key !== 'Tab') return;
      const focusable = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') || []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      previousFocus.current?.focus();
    };
  }, [open]);

  return (
    <>
      <nav className="gov-primary-nav" aria-label="Primary navigation">
        <Link aria-current={isCurrent(pathname, '/') ? 'page' : undefined} href="/">Home</Link>
        {coreServices.map(([label, href]) => (
          <Link aria-current={isCurrent(pathname, href) ? 'page' : undefined} href={href} key={href}>{label}</Link>
        ))}
        <Link aria-current={isCurrent(pathname, '/login') ? 'page' : undefined} className="gov-login" href="/login">Login</Link>
      </nav>
      <div className="gov-mobile-bar">
        <span>Citizen services</span>
        <button aria-controls={drawerId} aria-expanded={open} className="gov-menu-toggle" onClick={() => setOpen(true)} ref={menuRef} type="button">
          Menu <span aria-hidden="true">☰</span>
        </button>
      </div>
      {open && (
        <>
          <button aria-label="Dismiss menu" className="gov-drawer-backdrop" onClick={() => setOpen(false)} type="button" />
          <div aria-labelledby={`${drawerId}-title`} aria-modal="true" className="gov-drawer" id={drawerId} ref={drawerRef} role="dialog">
            <div className="gov-drawer-head">
              <div>
                <small>RTI Online</small>
                <b id={`${drawerId}-title`}>Citizen menu</b>
              </div>
              <button aria-label="Close menu" onClick={() => setOpen(false)} ref={closeRef} type="button">Close</button>
            </div>
            <nav aria-label="Mobile">
              <p>Services</p>
              <Link aria-current={isCurrent(pathname, '/') ? 'page' : undefined} href="/" onClick={() => setOpen(false)}>Home<span aria-hidden="true">→</span></Link>
              {coreServices.map(([label, href]) => (
                <Link aria-current={isCurrent(pathname, href) ? 'page' : undefined} href={href} key={href} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">→</span></Link>
              ))}
              <p>Manage existing cases</p>
              {caseServices.map(([label, href]) => (
                <Link aria-current={isCurrent(pathname, href) ? 'page' : undefined} href={href} key={href} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">→</span></Link>
              ))}
              <p>Information</p>
              {information.map(([label, href]) => (
                <Link aria-current={isCurrent(pathname, href) ? 'page' : undefined} href={href} key={href} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">→</span></Link>
              ))}
              <Link aria-current={isCurrent(pathname, '/login') ? 'page' : undefined} className="gov-drawer-login" href="/login" onClick={() => setOpen(false)}>Login<span aria-hidden="true">→</span></Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
