'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type NavLink = readonly [string, string];

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
  const setOpen = (value: boolean) => setOpenPath(value ? pathname : null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenPath(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="gov-primary-nav" aria-label="Primary navigation">
        <Link aria-current={isCurrent(pathname, '/') ? 'page' : undefined} href="/">Home</Link>
        {coreServices.map(([label, href]) => (
          <Link aria-current={isCurrent(pathname, href) ? 'page' : undefined} href={href} key={href}>{label}</Link>
        ))}
        <Link aria-current={isCurrent(pathname, '/login') ? 'page' : undefined} className="gov-login" href="/login">Citizen Login <span>→</span></Link>
      </nav>
      <div className="gov-mobile-bar">
        <span>Citizen services</span>
        <button aria-controls={drawerId} aria-expanded={open} className="gov-menu-toggle" onClick={() => setOpen(true)} type="button">
          Menu <span aria-hidden="true">☰</span>
        </button>
      </div>
      {open && (
        <>
          <button aria-label="Dismiss menu" className="gov-drawer-backdrop" onClick={() => setOpen(false)} type="button" />
          <div aria-labelledby={`${drawerId}-title`} aria-modal="true" className="gov-drawer" id={drawerId} role="dialog">
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
              <p>Information</p>
              {information.map(([label, href]) => (
                <Link aria-current={isCurrent(pathname, href) ? 'page' : undefined} href={href} key={href} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">→</span></Link>
              ))}
              <Link aria-current={isCurrent(pathname, '/login') ? 'page' : undefined} className="gov-drawer-login" href="/login" onClick={() => setOpen(false)}>Citizen Login<span aria-hidden="true">→</span></Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
