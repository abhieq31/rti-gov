#!/usr/bin/env node
/**
 * State-by-state public audit of https://rtionline.gov.in/
 *
 *   node capture.mjs
 *   node capture.mjs --human-assisted
 *
 * Never solves captcha. Empty and wrong-captcha probes are allowed.
 * Human-assisted mode pauses at OTP/login/payment/registration gates.
 */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import { extractFunction, classifySurface } from './extract.mjs';
import { DOCUMENTED_ONLY } from './documented-states.mjs';
import { writeReports } from './report.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '../..');
const ORIGIN = 'https://rtionline.gov.in';
const OUT = path.join(REPO, 'docs/reference/rti-online');
const HUMAN = process.argv.includes('--human-assisted');
const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};
const MAX_HEIGHT = 8000;
const DUMMY = {
  email: 'rti-audit-invalid@example.invalid',
  mobile: '9000000000',
  registration: 'AUDIT/R/E/00/00000',
  username: 'audit_invalid',
  password: 'invalid',
  captcha: 'ZZZZZZ',
};

function ensureDirs() {
  for (const dir of ['screenshots/desktop', 'screenshots/mobile', 'traces', 'pages', 'flows', 'source']) {
    fs.mkdirSync(path.join(OUT, dir), { recursive: true });
  }
}

class Book {
  constructor() {
    this.states = [];
    this.defects = [];
    this.humanAssisted = HUMAN;
    this.lastDialog = '';
  }
  add(state) {
    const existing = this.states.findIndex((s) => s.id === state.id);
    if (existing >= 0) this.states[existing] = { ...this.states[existing], ...state };
    else this.states.push(state);
    return this.states.find((s) => s.id === state.id);
  }
}

function extract(page) {
  return page.evaluate(extractFunction());
}

async function screenshot(page, rel) {
  const abs = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  const size = await page.evaluate(() => ({
    width: Math.max(document.documentElement.scrollWidth, 1),
    height: Math.max(document.documentElement.scrollHeight, 1),
  }));
  const clipped = size.height > MAX_HEIGHT;
  await page.screenshot({
    path: abs,
    fullPage: !clipped,
    clip: clipped ? { x: 0, y: 0, width: Math.min(size.width, 1440), height: MAX_HEIGHT } : undefined,
    timeout: 60_000,
  });
  return rel;
}

async function captureViewports(page, id) {
  const shots = {};
  await page.setViewportSize(VIEWPORTS.desktop);
  await page.waitForTimeout(300);
  shots.desktop = await screenshot(page, `screenshots/desktop/${id}.png`);
  await page.setViewportSize(VIEWPORTS.mobile);
  await page.waitForTimeout(300);
  shots.mobile = await screenshot(page, `screenshots/mobile/${id}.png`);
  await page.setViewportSize(VIEWPORTS.desktop);
  await page.waitForTimeout(200);
  return shots;
}

async function recordLive(page, book, spec) {
  await page.waitForTimeout(400);
  const snapshot = await extract(page).catch(() => ({ url: page.url(), title: '', inputs: [], buttons: [], forms: [], errors: [], visibleText: '', headings: [] }));
  snapshot.httpStatus = spec.httpStatus;
  const screenshots = spec.skipShot ? {} : await captureViewports(page, spec.id).catch((error) => {
    console.warn(`screenshot failed ${spec.id}: ${error.message}`);
    return {};
  });
  const validation = [...(snapshot.errors || [])];
  if (book.lastDialog) validation.push(`alert: ${book.lastDialog}`);
  const state = book.add({
    id: spec.id,
    flow: spec.flow,
    label: spec.label || (HUMAN && spec.human ? 'VERIFIED_HUMAN_ASSISTED' : 'VERIFIED_LIVE'),
    url: page.url(),
    title: snapshot.title || spec.title || '',
    httpStatus: spec.httpStatus ?? 200,
    triggeringAction: spec.action,
    previousState: spec.previous,
    nextActions: spec.next || nextFrom(snapshot),
    fields: (snapshot.inputs || []).filter((i) => i.visible && i.type !== 'hidden').map((i) => `${i.label || i.name} [${i.type}]${i.required ? ' *' : ''}`),
    validationRules: spec.validationRules || [],
    validationObserved: validation,
    surface: classifySurface(snapshot),
    screenshots,
    headings: snapshot.headings,
    forms: snapshot.forms,
  });
  book.lastDialog = '';
  console.log(`  state ${state.id}  ${state.label}  ${state.url}`);
  return { state, snapshot };
}

function nextFrom(snapshot) {
  const out = [];
  for (const b of (snapshot.buttons || []).filter((b) => b.visible && b.text)) out.push(b.text);
  for (const l of (snapshot.links || []).filter((l) => l.visible && l.text).slice(0, 8)) out.push(l.text);
  return [...new Set(out)].slice(0, 12);
}

function attachDialogs(page, book) {
  page.on('dialog', async (dialog) => {
    book.lastDialog = dialog.message();
    await dialog.dismiss();
  });
}

async function goto(page, pathOrUrl) {
  const url = pathOrUrl.startsWith('http') ? pathOrUrl : `${ORIGIN}${pathOrUrl}`;
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
  await page.waitForTimeout(700);
  return { status: response?.status() || 0, url: page.url() };
}

async function clickSubmit(page) {
  const submit = page.locator('input[type=submit], button[type=submit]').first();
  if (!(await submit.count())) return;
  await Promise.all([
    page.waitForNavigation({ timeout: 12_000 }).catch(() => null),
    submit.click({ timeout: 4000 }),
  ]).catch(() => null);
  await page.waitForTimeout(800);
}

async function fillIf(page, selector, value) {
  const loc = page.locator(selector).first();
  if (await loc.count()) await loc.fill(value);
}

async function waitForHuman(page, prompt) {
  if (!HUMAN) return false;
  const beforeUrl = page.url();
  const beforeText = await page.evaluate(() => document.body.innerText.slice(0, 400)).catch(() => '');
  console.log('\n========== HUMAN INPUT REQUIRED ==========');
  console.log(prompt);
  console.log('Complete the step in the open Chromium window.');
  console.log('Press Enter here when done (or type skip).');
  console.log('==========================================\n');
  const typed = await Promise.race([
    new Promise((resolve) => {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.question('> ', (answer) => { rl.close(); resolve(answer.trim().toLowerCase()); });
    }),
    page.waitForFunction(
      ({ url, text }) => location.href !== url || document.body.innerText.slice(0, 400) !== text,
      { url: beforeUrl, text: beforeText },
      { timeout: 15 * 60 * 1000 },
    ).then(() => 'changed').catch(() => 'timeout'),
  ]);
  if (typed === 'skip') return false;
  await page.waitForTimeout(1200);
  return true;
}

function addDocumented(book) {
  for (const item of DOCUMENTED_ONLY) {
    if (book.states.some((s) => s.id === item.id && (s.label === 'VERIFIED_LIVE' || s.label === 'VERIFIED_HUMAN_ASSISTED'))) continue;
    book.add({
      ...item,
      label: 'DOCUMENTED_ONLY',
      url: null,
      screenshots: {},
      validationObserved: [],
    });
  }
}

async function probeWrongCaptcha(page, fill) {
  if (fill) await fill(page);
  await fillIf(page, 'input[name="6_letters_code"]', DUMMY.captcha);
  await clickSubmit(page);
}

async function flowHome(page, book) {
  const nav = await goto(page, '/');
  await recordLive(page, book, {
    id: 'home',
    flow: 'shell',
    action: 'Open https://rtionline.gov.in/',
    previous: null,
    httpStatus: nav.status,
    next: ['Submit Request', 'Submit First Appeal', 'View Status', 'View History', 'Login', 'Payment Reconciliation', 'FAQ', 'Contact Us', 'Policy', 'Public Authorities Available'],
  });
}

async function flowBroken(page, book) {
  for (const [id, url] of [['registration.404', '/registration.php'], ['forgot-password.404', '/forgotPassword.php']]) {
    const nav = await goto(page, url);
    await recordLive(page, book, {
      id,
      flow: 'login',
      label: 'BROKEN_OFFICIAL_SITE',
      action: `GET ${url}`,
      previous: 'home',
      httpStatus: nav.status,
      next: [],
    });
    book.defects.push(`${url} returns HTTP ${nav.status}`);
  }
}

async function flowInfo(page, book) {
  for (const [id, url, flow] of [
    ['contact', '/Contactus.php', 'shell'],
    ['policies', '/Policies.php', 'shell'],
    ['faq', '/faq.php', 'shell'],
    ['authorities', '/request/allpa.php', 'shell'],
  ]) {
    const nav = await goto(page, url);
    await recordLive(page, book, { id, flow, action: `Navigate ${url}`, previous: 'home', httpStatus: nav.status });
  }

  await goto(page, '/faq.php');
  const plus = page.locator('input.clsbtn, input[id^=btn]');
  const n = await plus.count();
  for (let i = 0; i < Math.min(n, 26); i += 1) {
    await plus.nth(i).click({ timeout: 800 }).catch(() => null);
  }
  await recordLive(page, book, { id: 'faq.expanded', flow: 'shell', action: 'Expand every FAQ accordion', previous: 'faq' });

  await goto(page, '/request/allpa.php');
  const expanders = page.locator('.showChild.glyphicon-plus, .glyphicon-plus');
  const e = await expanders.count();
  for (let i = 0; i < Math.min(3, e); i += 1) await expanders.nth(i).click().catch(() => null);
  await recordLive(page, book, { id: 'authorities.expanded', flow: 'shell', action: 'Expand first three ministry rows', previous: 'authorities' });
}

async function flowSubmitRequest(page, book) {
  await goto(page, '/guidelines.php?request');
  await recordLive(page, book, {
    id: 'submit-request.guidelines',
    flow: 'submit-request',
    action: 'Home → Submit Request',
    previous: 'home',
    validationRules: ['Checkbox CHECKBOX_1 required or alert: Please select the undertaking statement!'],
  });

  await page.locator('input[type=submit]').click();
  await page.waitForTimeout(400);
  await recordLive(page, book, {
    id: 'submit-request.guidelines.unchecked',
    flow: 'submit-request',
    action: 'Submit without accepting guidelines',
    previous: 'submit-request.guidelines',
    skipShot: !book.lastDialog ? false : false,
  });

  await page.locator('input[name=CHECKBOX_1]').check();
  await clickSubmit(page);
  await recordLive(page, book, {
    id: 'submit-request.email-gate',
    flow: 'submit-request',
    action: 'Accept guidelines and Submit',
    previous: 'submit-request.guidelines',
    validationRules: ['Email *', 'Mobile optional', 'Security code *', 'OTP sent after valid captcha'],
    next: ['Submit → OTP (blocked without captcha)', 'Reset'],
  });

  await clickSubmit(page);
  await recordLive(page, book, {
    id: 'submit-request.email-gate.empty',
    flow: 'submit-request',
    action: 'Submit email gate with empty fields',
    previous: 'submit-request.email-gate',
  });

  await probeWrongCaptcha(page, async (p) => {
    await fillIf(p, '#Email, input[name=Email]', DUMMY.email);
    await fillIf(p, '#cell, input[name=cell]', DUMMY.mobile);
  });
  await recordLive(page, book, {
    id: 'submit-request.email-gate.wrong-captcha',
    flow: 'submit-request',
    action: 'Submit dummy email + wrong captcha ZZZZZZ',
    previous: 'submit-request.email-gate',
  });

  const continued = await waitForHuman(page, [
    'SUBMIT REQUEST gate.',
    'Enter a real email (OTP will go there), optional mobile, and the captcha you see.',
    'Then enter the OTP on the next screen.',
    'Fill the request form if it appears. STOP before Pay unless you intend a real filing.',
  ].join('\n'));

  if (continued) {
    await recordLive(page, book, {
      id: `submit-request.${classifySurface(await extract(page))}`,
      flow: 'submit-request',
      action: 'Human completed captcha/OTP/form step',
      previous: 'submit-request.email-gate',
      human: true,
      label: 'VERIFIED_HUMAN_ASSISTED',
    });
    let hops = 0;
    while (hops < 8) {
      hops += 1;
      const snap = await extract(page);
      const surface = classifySurface(snap);
      if (['request-form', 'otp', 'payment-form', 'payment-gateway', 'acknowledgement'].includes(surface)) {
        const more = await waitForHuman(page, `Now on "${surface}". Continue in the browser, or Enter/skip.`);
        if (!more) break;
        await recordLive(page, book, {
          id: `submit-request.${surface}${hops > 1 ? `.${hops}` : ''}`,
          flow: 'submit-request',
          action: `Human advanced to ${surface}`,
          previous: 'submit-request.email-gate',
          human: true,
          label: 'VERIFIED_HUMAN_ASSISTED',
        });
        if (surface === 'acknowledgement' || surface === 'payment-gateway') break;
      } else break;
    }
  }
}

async function flowAppeal(page, book) {
  await goto(page, '/guidelines.php?appeal');
  await recordLive(page, book, {
    id: 'first-appeal.guidelines',
    flow: 'first-appeal',
    action: 'Home → Submit First Appeal',
    previous: 'home',
  });
  await page.locator('input[name=CHECKBOX_1]').check();
  await clickSubmit(page);
  await recordLive(page, book, {
    id: 'first-appeal.lookup',
    flow: 'first-appeal',
    action: 'Accept guidelines',
    previous: 'first-appeal.guidelines',
    validationRules: ['RTI Request Registration No. *', 'Email *', 'Security code *'],
  });
  await clickSubmit(page);
  await recordLive(page, book, {
    id: 'first-appeal.lookup.empty',
    flow: 'first-appeal',
    action: 'Submit lookup empty',
    previous: 'first-appeal.lookup',
  });
  await probeWrongCaptcha(page, async (p) => {
    await fillIf(p, '#registrationNo, input[name=registrationNo]', DUMMY.registration);
    await fillIf(p, '#Email, input[name=Email]', DUMMY.email);
  });
  await recordLive(page, book, {
    id: 'first-appeal.lookup.wrong-captcha',
    flow: 'first-appeal',
    action: 'Dummy registration number + wrong captcha',
    previous: 'first-appeal.lookup',
  });
  const continued = await waitForHuman(page, 'FIRST APPEAL lookup. Enter a real registration number, email and captcha. Do not submit an appeal unless intended.');
  if (continued) {
    await recordLive(page, book, {
      id: `first-appeal.${classifySurface(await extract(page))}`,
      flow: 'first-appeal',
      action: 'Human completed appeal lookup',
      previous: 'first-appeal.lookup',
      human: true,
      label: 'VERIFIED_HUMAN_ASSISTED',
    });
  }
}

async function flowStatus(page, book) {
  await goto(page, '/request/status.php');
  await recordLive(page, book, {
    id: 'view-status.gate',
    flow: 'view-status',
    action: 'Home → View Status',
    previous: 'home',
    validationRules: ['Registration number *', 'Email *', 'Security code *', 'Then OTP'],
  });
  await clickSubmit(page);
  await recordLive(page, book, {
    id: 'view-status.gate.empty',
    flow: 'view-status',
    action: 'Submit empty status form',
    previous: 'view-status.gate',
  });
  await probeWrongCaptcha(page, async (p) => {
    await fillIf(p, '#registration_no, input[name=registration_no]', DUMMY.registration);
    await fillIf(p, '#Email, input[name=Email]', DUMMY.email);
  });
  await recordLive(page, book, {
    id: 'view-status.gate.wrong-captcha',
    flow: 'view-status',
    action: 'Dummy registration + wrong captcha',
    previous: 'view-status.gate',
  });
  const continued = await waitForHuman(page, 'VIEW STATUS. Enter a real registration number, email and captcha, then OTP.');
  if (continued) {
    await recordLive(page, book, {
      id: `view-status.${classifySurface(await extract(page))}`,
      flow: 'view-status',
      action: 'Human completed status lookup',
      previous: 'view-status.gate',
      human: true,
      label: 'VERIFIED_HUMAN_ASSISTED',
    });
  }
}

async function flowHistory(page, book) {
  await goto(page, '/request/status_history.php');
  await recordLive(page, book, {
    id: 'view-history.gate',
    flow: 'view-history',
    action: 'Home → View History',
    previous: 'home',
    validationRules: ['Email *', 'Mobile', 'Security code *', 'Then OTP'],
  });
  await clickSubmit(page);
  await recordLive(page, book, {
    id: 'view-history.gate.empty',
    flow: 'view-history',
    action: 'Submit empty history form',
    previous: 'view-history.gate',
  });
  await probeWrongCaptcha(page, async (p) => {
    await fillIf(p, '#Email, input[name=Email]', DUMMY.email);
    await fillIf(p, '#cell, input[name=cell]', DUMMY.mobile);
  });
  await recordLive(page, book, {
    id: 'view-history.gate.wrong-captcha',
    flow: 'view-history',
    action: 'Dummy email + wrong captcha',
    previous: 'view-history.gate',
  });
  const continued = await waitForHuman(page, 'VIEW HISTORY. Enter the filing email, mobile and captcha, then OTP.');
  if (continued) {
    await recordLive(page, book, {
      id: `view-history.${classifySurface(await extract(page))}`,
      flow: 'view-history',
      action: 'Human completed history lookup',
      previous: 'view-history.gate',
      human: true,
      label: 'VERIFIED_HUMAN_ASSISTED',
    });
  }
}

async function flowLogin(page, book) {
  await goto(page, '/login.php');
  await recordLive(page, book, {
    id: 'login.gate',
    flow: 'login',
    action: 'Home → Login',
    previous: 'home',
    validationRules: ['Username *', 'Password * (client-hashed)', 'Security code *'],
  });
  await clickSubmit(page);
  await recordLive(page, book, {
    id: 'login.gate.empty',
    flow: 'login',
    action: 'Submit empty login',
    previous: 'login.gate',
  });
  await probeWrongCaptcha(page, async (p) => {
    await fillIf(p, '#UserName, input[name=UserName]', DUMMY.username);
    await fillIf(p, '#password, input[name=password]', DUMMY.password);
  });
  await recordLive(page, book, {
    id: 'login.gate.wrong-captcha',
    flow: 'login',
    action: 'Invalid username + wrong captcha (single attempt, not brute-force)',
    previous: 'login.gate',
  });
  const continued = await waitForHuman(page, 'LOGIN. Enter real credentials and captcha if you have an account. Do not brute-force.');
  if (continued) {
    await recordLive(page, book, {
      id: `login.${classifySurface(await extract(page))}`,
      flow: 'login',
      action: 'Human completed login',
      previous: 'login.gate',
      human: true,
      label: 'VERIFIED_HUMAN_ASSISTED',
    });
  }

  await goto(page, '/audiofile1.php');
  await recordLive(page, book, {
    id: 'login.audio-captcha',
    flow: 'login',
    action: 'Open audio captcha popup',
    previous: 'login.gate',
  });
  book.defects.push('Audio captcha page /audiofile1.php loads; SiteOne recorded /audio/en/.wav as 404. Popup may render captcha glyphs as visible text.');
}

async function flowPayments(page, book) {
  await goto(page, '/request/status_pendingPayment.php');
  await recordLive(page, book, {
    id: 'payment-reconciliation.gate',
    flow: 'payment-reconciliation',
    action: 'Home → Payment Reconciliation',
    previous: 'home',
    validationRules: ['Email *', 'Mobile', 'Security code *'],
  });
  await clickSubmit(page);
  await recordLive(page, book, {
    id: 'payment-reconciliation.gate.empty',
    flow: 'payment-reconciliation',
    action: 'Submit empty reconciliation form',
    previous: 'payment-reconciliation.gate',
  });
  await probeWrongCaptcha(page, async (p) => {
    await fillIf(p, '#Email, input[name=Email]', DUMMY.email);
    await fillIf(p, '#cell, input[name=cell]', DUMMY.mobile);
  });
  await recordLive(page, book, {
    id: 'payment-reconciliation.gate.wrong-captcha',
    flow: 'payment-reconciliation',
    action: 'Dummy email + wrong captcha',
    previous: 'payment-reconciliation.gate',
  });
  const continued = await waitForHuman(page, 'PAYMENT RECONCILIATION. Enter email used for a real payment and captcha. Do not initiate a new payment.');
  if (continued) {
    await recordLive(page, book, {
      id: `payment-reconciliation.${classifySurface(await extract(page))}`,
      flow: 'payment-reconciliation',
      action: 'Human completed reconciliation lookup',
      previous: 'payment-reconciliation.gate',
      human: true,
      label: 'VERIFIED_HUMAN_ASSISTED',
    });
  }
}

async function main() {
  ensureDirs();
  const book = new Book();
  book.defects.push('/images/rti_lifecycle.jpg/ is a trailing-slash 404 (image without slash is 200).');
  book.defects.push('Home CIC notice overflows the layout (“The C” / “The Centra”).');

  const browser = await chromium.launch({
    headless: !HUMAN,
    slowMo: HUMAN ? 80 : 0,
  });
  const context = await browser.newContext({
    locale: 'en-IN',
    viewport: VIEWPORTS.desktop,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    acceptDownloads: true,
  });
  const page = await context.newPage();
  attachDialogs(page, book);

  const runners = [
    ['home', flowHome],
    ['broken', flowBroken],
    ['info', flowInfo],
    ['submit-request', flowSubmitRequest],
    ['first-appeal', flowAppeal],
    ['view-status', flowStatus],
    ['view-history', flowHistory],
    ['login', flowLogin],
    ['payment-reconciliation', flowPayments],
  ];

  for (const [name, fn] of runners) {
    console.log(`\nflow ${name}`);
    try {
      await fn(page, book);
    } catch (error) {
      console.error(`flow ${name} failed:`, error.message);
      book.add({
        id: `${name}.capture-error`,
        flow: name,
        label: 'UNREACHABLE',
        title: error.message,
        triggeringAction: 'runner exception',
        nextActions: [],
        screenshots: {},
      });
    }
  }

  addDocumented(book);
  await browser.close();
  const counts = writeReports(OUT, book);
  console.log('\nCounts', counts, 'total', book.states.length);
  console.log(`Wrote ${OUT}`);
  if (!HUMAN) {
    console.log('\nTransactional bodies remain DOCUMENTED_ONLY. Re-run with:');
    console.log('  npm run audit:rti-online -- --human-assisted');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
