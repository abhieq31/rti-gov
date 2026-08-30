'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from './language-provider';

type TextSize = 'sm' | 'md' | 'lg';

export function GovUtilityTools() {
  const [size, setSize] = useState<TextSize>('md');
  const { language, toggleLanguage } = useLanguage();
  const hindi = language === 'hi';

  useEffect(() => {
    const saved = window.localStorage.getItem('rti-gov-text-size');
    if (saved !== 'sm' && saved !== 'md' && saved !== 'lg') return;
    const frame = window.requestAnimationFrame(() => setSize(saved));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.textSize = size;
    window.localStorage.setItem('rti-gov-text-size', size);
  }, [size]);

  return (
    <>
      <nav aria-label={hindi ? 'सुगम्यता और भाषा' : 'Accessibility and language'}>
        <Link href="/policies">{hindi ? 'सुगम्यता' : 'Accessibility'}</Link>
        <span className="text-tools" role="group" aria-label={hindi ? 'अक्षर आकार' : 'Text size'}>
          <button aria-label="Decrease text size" aria-pressed={size === 'sm'} onClick={() => setSize('sm')} type="button">A−</button>
          <button aria-label="Default text size" aria-pressed={size === 'md'} onClick={() => setSize('md')} type="button">A</button>
          <button aria-label="Increase text size" aria-pressed={size === 'lg'} onClick={() => setSize('lg')} type="button">A+</button>
        </span>
        <button aria-pressed={hindi} onClick={toggleLanguage} type="button" aria-label={hindi ? 'Switch site to English' : 'पूरी साइट हिन्दी में करें'}>{hindi ? 'English' : 'हिन्दी'}</button>
      </nav>
      <span className="sr-only" aria-live="polite">{hindi ? 'पूरी साइट हिन्दी में दिखाई जा रही है।' : 'The full site is shown in English.'}</span>
    </>
  );
}
