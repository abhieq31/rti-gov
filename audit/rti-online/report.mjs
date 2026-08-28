import fs from 'node:fs';
import path from 'node:path';

function md(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

const LABELS = ['VERIFIED_LIVE', 'VERIFIED_HUMAN_ASSISTED', 'DOCUMENTED_ONLY', 'UNREACHABLE', 'BROKEN_OFFICIAL_SITE'];

export function writeReports(outDir, book) {
  const states = book.states;
  const counts = Object.fromEntries(LABELS.map((l) => [l, states.filter((s) => s.label === l).length]));
  const generatedAt = new Date().toISOString();

  fs.writeFileSync(path.join(outDir, 'states.json'), `${JSON.stringify({ generatedAt, humanAssisted: book.humanAssisted, states }, null, 2)}\n`);

  const inventory = [
    '# Official RTI Online — state inventory',
    '',
    `Generated: ${generatedAt}`,
    `Human-assisted run: ${book.humanAssisted ? 'yes' : 'no'}`,
    '',
    'Labels are mutually exclusive. **DOCUMENTED_ONLY** states come from `source/um_citizen.pdf` or FAQ copy and must not be treated as live UI.',
    '',
    '## Totals',
    '',
    `| Label | Count |`,
    `| --- | --- |`,
    ...LABELS.map((l) => `| ${l} | ${counts[l]} |`),
    `| **Total distinct states** | **${states.length}** |`,
    '',
    '## Inventory',
    '',
    '| ID | Flow | Label | Viewport shots | Previous | Action | Next | Title |',
    '| --- | --- | --- | --- | --- | --- | --- | --- |',
    ...states.map((s) => `| \`${s.id}\` | ${s.flow} | ${s.label} | ${viewportMark(s)} | ${md(s.previousState || '—')} | ${md(s.triggeringAction || '—')} | ${md((s.nextActions || []).join('; '))} | ${md(s.title)} |`),
    '',
    '## Official-site defects observed live',
    '',
    ...[...new Set(book.defects || [])].map((d) => `- ${d}`),
    '',
    '## Flows still incomplete',
    '',
    ...incompleteFlows(states).map((line) => `- ${line}`),
    '',
    'Coverage is **not** 100% while any material transactional state remains DOCUMENTED_ONLY or UNREACHABLE.',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(outDir, 'state-inventory.md'), `${inventory}\n`);

  const manual = [
    '# Unverified — manual / document only',
    '',
    'These states were **not** captured from a live browser session. They come from the official citizen user manual (`source/um_citizen.pdf`) or from FAQ/guidelines text. They are not screenshots of the current UI and must not be mixed with VERIFIED_LIVE records.',
    '',
    ...states.filter((s) => s.label === 'DOCUMENTED_ONLY').map((s) => [
      `## ${s.id}`,
      '',
      `- Flow: ${s.flow}`,
      `- Title: ${s.title}`,
      `- Previous: ${s.previousState || '—'}`,
      `- Trigger: ${s.triggeringAction || '—'}`,
      `- Next: ${(s.nextActions || []).join('; ') || '—'}`,
      `- Source: ${s.source || 'um_citizen.pdf'}`,
      s.fields?.length ? `- Fields: ${s.fields.join('; ')}` : '',
      s.notes ? `- Notes: ${s.notes}` : '',
      '',
    ].filter(Boolean).join('\n')),
  ].join('\n');
  fs.writeFileSync(path.join(outDir, 'unverified-manual-only.md'), `${manual}\n`);

  const flows = [...new Set(states.map((s) => s.flow))];
  for (const flow of flows) {
    const subset = states.filter((s) => s.flow === flow);
    const lines = [
      `# Flow: ${flow}`,
      '',
      '```mermaid',
      mermaid(subset, flow),
      '```',
      '',
      '| ID | Label | URL | Action in | Next | Validation observed | Screenshot |',
      '| --- | --- | --- | --- | --- | --- | --- |',
      ...subset.map((s) => `| \`${s.id}\` | ${s.label} | ${md(s.url || '—')} | ${md(s.triggeringAction || '—')} | ${md((s.nextActions || []).join('; '))} | ${md((s.validationObserved || []).join('; ') || '—')} | ${s.screenshots?.desktop ? `\`${s.screenshots.desktop}\`` : '—'} |`),
      '',
      ...subset.filter((s) => s.screenshots?.desktop || s.screenshots?.mobile).map((s) => [
        `## ${s.id}`,
        '',
        s.screenshots?.desktop ? `![${s.id} desktop](../${s.screenshots.desktop})` : '',
        s.screenshots?.mobile ? `![${s.id} mobile](../${s.screenshots.mobile})` : '',
        s.validationObserved?.length ? `\nValidation observed: ${s.validationObserved.join('; ')}` : '',
        s.notes ? `\n${s.notes}` : '',
        '',
      ].join('\n')),
    ];
    if (flow === 'shell') {
      lines.push('Full homepage copy: [pages/home.md](../pages/home.md). Statutory graph: [lifecycle.md](lifecycle.md).');
      lines.push('');
    }
    fs.writeFileSync(path.join(outDir, 'flows', `${flow}.md`), `${lines.join('\n')}\n`);
  }

  const readme = [
    '# RTI Online public reference',
    '',
    'State-by-state reconstruction of the **public citizen** portal at https://rtionline.gov.in/. Not a clone spec.',
    '',
    `Generated ${generatedAt}. Human-assisted: ${book.humanAssisted ? 'yes' : 'no'}.`,
    '',
    '## Counts',
    '',
    `| Label | Count |`,
    `| --- | --- |`,
    ...LABELS.map((l) => `| ${l} | ${counts[l]} |`),
    `| Total distinct states | ${states.length} |`,
    '',
    '## How to rerun',
    '',
    '```bash',
    'npm run audit:rti-online',
    'npm run audit:rti-online -- --human-assisted',
    '```',
    '',
    'HUMAN_ASSISTED keeps Chromium open at captcha, OTP, login, payment and registration-number gates. Enter the value in the browser; the runner resumes when the page changes or you press Enter.',
    '',
    'Captcha is never solved automatically. Wrong-captcha and empty-submit probes are VERIFIED_LIVE. Anything taken only from the PDF is DOCUMENTED_ONLY.',
    '',
    '| File | What |',
    '| --- | --- |',
    '| `state-inventory.md` | Every distinct UI state |',
    '| `states.json` | Machine-readable inventory |',
    '| `unverified-manual-only.md` | DOCUMENTED_ONLY only |',
    '| `flows/*.md` | Per-flow graphs |',
    '| `screenshots/desktop/` `screenshots/mobile/` | Live PNGs |',
    '| `feature-matrix.md` | Official vs this repository |',
    '',
    'Do not claim 100% coverage while transactional states remain DOCUMENTED_ONLY.',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(outDir, 'README.md'), `${readme}\n`);

  return counts;
}

function viewportMark(s) {
  const d = Boolean(s.screenshots?.desktop);
  const m = Boolean(s.screenshots?.mobile);
  if (d && m) return 'yes';
  if (d) return 'desktop only';
  if (m) return 'mobile only';
  return '—';
}

function incompleteFlows(states) {
  const need = {
    'submit-request': ['otp', 'form', 'payment-form', 'acknowledgement'],
    'first-appeal': ['form', 'acknowledgement'],
    'view-status': ['otp', 'case'],
    'view-history': ['otp', 'dashboard'],
    'login': ['authenticated'],
    'payment-reconciliation': ['result'],
  };
  const lines = [];
  for (const [flow, keys] of Object.entries(need)) {
    const subset = states.filter((s) => s.flow === flow);
    const missing = keys.filter((k) => {
      const hit = subset.find((s) => s.id.endsWith(`.${k}`) || s.id.includes(`.${k}`));
      return !hit || hit.label === 'DOCUMENTED_ONLY' || hit.label === 'UNREACHABLE';
    });
    if (missing.length) lines.push(`${flow}: still ${missing.join(', ')} (not live-verified)`);
    else lines.push(`${flow}: live-complete`);
  }
  return lines;
}

function mermaid(subset, flow) {
  const id = (s) => s.id.replace(/[^a-zA-Z0-9]/g, '_');
  const lines = ['flowchart TD'];
  for (const s of subset) {
    const tag = s.label === 'VERIFIED_LIVE' || s.label === 'VERIFIED_HUMAN_ASSISTED' ? '' : ':::doc';
    lines.push(`  ${id(s)}["${s.id}\\n${s.label}"]${tag}`);
  }
  for (const s of subset) {
    if (s.previousState) {
      const prev = subset.find((p) => p.id === s.previousState);
      if (prev) lines.push(`  ${id(prev)} --> ${id(s)}`);
    }
  }
  return lines.join('\n');
}
