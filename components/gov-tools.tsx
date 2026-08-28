'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type TextSize = 'sm' | 'md' | 'lg';

export function GovUtilityTools() {
  const [size, setSize] = useState<TextSize>('md');
  const [hindi, setHindi] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('rti-gov-text-size');
    if (saved === 'sm' || saved === 'md' || saved === 'lg') setSize(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.textSize = size;
    window.localStorage.setItem('rti-gov-text-size', size);
  }, [size]);

  useEffect(() => {
    document.documentElement.lang = hindi ? 'hi-IN' : 'en-IN';
  }, [hindi]);

  return (
    <nav aria-label={hindi ? 'सुगम्यता और भाषा' : 'Accessibility and language'}>
      <a href="#main">{hindi ? 'मुख्य विषयवस्तु पर जाएं' : 'Skip to main content'}</a>
      <Link href="/policies">{hindi ? 'सुगम्यता' : 'Accessibility'}</Link>
      <span className="text-tools" role="group" aria-label={hindi ? 'अक्षर आकार' : 'Text size'}>
        <button aria-label="Decrease text size" aria-pressed={size === 'sm'} onClick={() => setSize('sm')} type="button">A−</button>
        <button aria-label="Default text size" aria-pressed={size === 'md'} onClick={() => setSize('md')} type="button">A</button>
        <button aria-label="Increase text size" aria-pressed={size === 'lg'} onClick={() => setSize('lg')} type="button">A+</button>
      </span>
      <button onClick={() => setHindi((current) => !current)} type="button">{hindi ? 'English' : 'हिन्दी'}</button>
    </nav>
  );
}
