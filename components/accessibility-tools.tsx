'use client';

import { useState } from 'react';

export function AccessibilityTools() {
  const [size, setSize] = useState(1);
  const [contrast, setContrast] = useState(false);
  function setTextSize(next: number) {
    setSize(next); document.documentElement.classList.toggle('small-type', next === 0); document.documentElement.classList.toggle('large-type', next === 2);
  }
  function toggleContrast() {
    const next = !contrast; setContrast(next); document.documentElement.classList.toggle('high-contrast', next);
  }
  return <div className="access-tools" aria-label="Accessibility controls">
    <button type="button" aria-pressed={size === 0} onClick={() => setTextSize(0)} title="Decrease text size">A−</button>
    <button type="button" aria-pressed={size === 1} onClick={() => setTextSize(1)} title="Normal text size">A</button>
    <button type="button" aria-pressed={size === 2} onClick={() => setTextSize(2)} title="Increase text size">A+</button>
    <button type="button" aria-pressed={contrast} onClick={toggleContrast} title="High contrast"><span aria-hidden="true">◐</span><span className="sr-only">High contrast</span></button>
  </div>;
}
