'use client';

import { useState } from 'react';

export function AccessibilityTools() {
  const [large, setLarge] = useState(false);
  const [contrast, setContrast] = useState(false);
  function toggleLarge() {
    const next = !large; setLarge(next); document.documentElement.classList.toggle('large-type', next);
  }
  function toggleContrast() {
    const next = !contrast; setContrast(next); document.documentElement.classList.toggle('high-contrast', next);
  }
  return <div className="access-tools" aria-label="Accessibility controls">
    <button type="button" aria-pressed={large} onClick={toggleLarge} title="Increase text size">A+</button>
    <button type="button" aria-pressed={contrast} onClick={toggleContrast} title="High contrast"><span aria-hidden="true">◐</span><span className="sr-only">High contrast</span></button>
  </div>;
}
