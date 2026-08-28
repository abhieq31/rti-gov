export function extractFunction() {
  /* this function is serialised into the page */
  return () => {
    const visible = (el) => {
      if (!(el instanceof Element)) return false;
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };
    const textOf = (el) => (el?.innerText || el?.textContent || '').replace(/\s+/g, ' ').trim();
    const labelFor = (el) => {
      if (el.labels && el.labels[0]) return textOf(el.labels[0]);
      const th = el.closest('td,th')?.previousElementSibling;
      if (th) return textOf(th);
      const parent = el.closest('label, p, tr, div');
      return parent ? textOf(parent).slice(0, 180) : '';
    };

    const reddish = (el) => {
      const raw = (window.getComputedStyle(el).color || '').replace(/\s/g, '');
      const m = raw.match(/rgba?\((\d+),(\d+),(\d+)(?:,([0-9.]+))?\)/i);
      if (!m) return false;
      const r = Number(m[1]);
      const g = Number(m[2]);
      const b = Number(m[3]);
      const a = m[4] === undefined ? 1 : Number(m[4]);
      if (a < 0.4) return false;
      return r >= 150 && r > g + 30 && r > b + 30;
    };

    const helperRe = /case insensitive|otps? do not expire|otp will be sent|can't read the image|click here to refresh|^refresh$|fields marked with/i;
    const errorPhrase = /please enter|please provide|please select the|does not match|invalid email|invalid registration|security code does not|enter correct captcha|please enter captcha|valid email id|valid email address|valid registration|valid password|please enter user name|please enter a valid|please enter security/i;

    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((el) => ({
      level: el.tagName.toLowerCase(),
      text: textOf(el),
      visible: visible(el),
    })).filter((h) => h.text);

    const links = [...document.querySelectorAll('a[href]')].map((el) => ({
      text: textOf(el) || el.getAttribute('title') || el.getAttribute('aria-label') || '',
      href: el.getAttribute('href'),
      visible: visible(el),
    }));

    const buttons = [...document.querySelectorAll('button, input[type=button], input[type=submit], input[type=reset]')].map((el) => ({
      type: el.getAttribute('type') || 'button',
      text: el.value || textOf(el) || el.getAttribute('title') || '',
      name: el.getAttribute('name') || '',
      id: el.id || '',
      visible: visible(el),
    }));

    const inputs = [...document.querySelectorAll('input, textarea')].map((el) => ({
      tag: el.tagName.toLowerCase(),
      type: (el.getAttribute('type') || (el.tagName === 'TEXTAREA' ? 'textarea' : 'text')).toLowerCase(),
      name: el.getAttribute('name') || '',
      id: el.id || '',
      placeholder: el.getAttribute('placeholder') || '',
      required: el.required || /\*/.test(el.closest('tr,label,p,div')?.innerText || ''),
      maxlength: el.getAttribute('maxlength') || '',
      label: labelFor(el),
      visible: visible(el),
      validationMessage: el.validationMessage || '',
    }));

    const selects = [...document.querySelectorAll('select')].map((el) => ({
      name: el.getAttribute('name') || '',
      id: el.id || '',
      label: labelFor(el),
      options: [...el.options].map((o) => ({ value: o.value, text: o.textContent.trim(), selected: o.selected })),
      visible: visible(el),
    }));

    const notices = [];
    const errors = [];
    const seen = new Set();
    const pushUnique = (list, value) => {
      const t = String(value || '').replace(/\s+/g, ' ').trim();
      if (!t || t.length > 280) return;
      const key = t.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      list.push(t);
    };

    const consider = (el) => {
      if (!(el instanceof Element) || !visible(el)) return;
      const t = textOf(el);
      if (!t || t.length > 280 || t === '*' || t === '×') return;
      const cls = `${el.className || ''} ${el.id || ''}`;
      const fontColor = (el.getAttribute('color') || '').toLowerCase();
      const isErrorNode = /(?:^| )error|errormsg|errmsg/.test(cls)
        || fontColor === 'red'
        || fontColor === '#ff0000'
        || fontColor === '#f00'
        || el.matches?.('label.error, .error, font[color="red"], font[color="Red"]');
      if (helperRe.test(t) && !errorPhrase.test(t)) {
        pushUnique(notices, t);
        return;
      }
      if (errorPhrase.test(t) && (isErrorNode || reddish(el) || reddish(el.closest('font, span, label, td, p') || el))) {
        pushUnique(errors, t);
        return;
      }
      if (isErrorNode && errorPhrase.test(t)) {
        pushUnique(errors, t);
      }
    };

    for (const el of document.querySelectorAll('label.error, .error, .errormsg, #errormsg, font[color], font[color="red"], font[color="Red"], span[style*="color"], p[style*="color"]')) {
      consider(el);
    }
    for (const el of document.querySelectorAll('body *')) {
      if (el.children.length > 3) continue;
      consider(el);
    }
    for (const input of inputs) {
      if (input.validationMessage) pushUnique(errors, `native: ${input.validationMessage}`);
    }

    const faqItems = [];
    if (/faq\.php/i.test(location.href)) {
      const plusButtons = [...document.querySelectorAll('input.clsbtn, input[id^=btn]')];
      if (plusButtons.length) {
        for (const btn of plusButtons) {
          const cell = btn.closest('td')?.nextElementSibling || btn.closest('tr, li, div') || btn.parentElement;
          const question = textOf(cell).replace(/^[+\-]\s*/, '').slice(0, 240);
          if (question) faqItems.push({ question, expanded: (btn.value || '') === '-' });
        }
      } else {
        const items = [...document.querySelectorAll('li')].filter((li) => visible(li) && textOf(li).length > 20);
        for (const li of items.slice(0, 30)) {
          const qEl = li.querySelector('a, b, strong, p');
          const q = (qEl ? textOf(qEl) : textOf(li).split('\n')[0]).slice(0, 240);
          if (q) faqItems.push({ question: q, expanded: true });
        }
      }
    }

    const cicNodes = [...document.querySelectorAll('div, p, span, td, font')]
      .filter((el) => /Central Information Commission \(CIC\) has integrated/i.test(textOf(el)));
    cicNodes.sort((a, b) => textOf(a).length - textOf(b).length);
    const cicBanner = textOf(cicNodes[0] || { innerText: '' });

    return {
      url: location.href,
      title: document.title,
      headings,
      links,
      buttons,
      inputs,
      selects,
      forms: [...document.querySelectorAll('form')].map((el) => ({
        name: el.getAttribute('name') || '',
        method: (el.getAttribute('method') || 'get').toLowerCase(),
        action: el.getAttribute('action') || '',
        fields: [...el.querySelectorAll('input,select,textarea')].map((f) => f.getAttribute('name') || f.id || f.getAttribute('type')),
      })),
      errors: [...new Set(errors)],
      notices: [...new Set(notices)],
      faqItems,
      cicBanner: cicBanner.slice(0, 1200),
      visibleText: textOf(document.body).slice(0, 8000),
    };
  };
}

export function classifySurface(snapshot) {
  const url = snapshot.url || '';
  const text = snapshot.visibleText || '';
  const names = (snapshot.inputs || []).map((i) => `${i.name} ${i.id} ${i.label}`).join(' ');
  if (/registration\.php|forgotPassword/i.test(url) && snapshot.httpStatus >= 400) return 'broken';
  if (/guidelines\.php/.test(url)) return 'guidelines';
  if (/request_email_check/.test(url)) return 'email-gate';
  if (/firstAppeal/.test(url) && /registrationNo|Registration No/i.test(names + text)) return 'appeal-lookup';
  if (/status_history/.test(url)) return 'history-gate';
  if (/status_pendingPayment/.test(url)) return 'payment-reconciliation-gate';
  if (/\/status\.php/.test(url) && /registration_no/.test(names)) return 'status-gate';
  if (/login\.php/.test(url)) return 'login';
  if (/allpa\.php/.test(url)) return 'authorities';
  if (/faq\.php/.test(url)) return 'faq';
  if (/Contactus/i.test(url)) return 'contact';
  if (/Policies/i.test(url)) return 'policies';
  if (/viewPDF|um_citizen/i.test(url)) return 'user-manual';
  if (/audiofile1/.test(url)) return 'audio-captcha';
  if (/rti_lifecycle/.test(url)) return 'lifecycle';
  if (/merchant\.online-sbi|sbiepay/i.test(url)) return 'payment-gateway';
  if (/Select Ministry|Public Authority Details/i.test(text) && /RTI Request Form/i.test(text)) return 'request-form';
  if (/First Appeal Form/i.test(text) && /Ground For Appeal/i.test(text)) return 'appeal-form';
  if (/Online Request Payment Form/i.test(text)) return 'payment-form';
  if (/filed successfully/i.test(text) && /Print Application|Save/i.test(text)) return 'acknowledgement';
  if (/OTP|ओटीपी/.test(text) && /\botp\b/i.test(names)) return 'otp';
  if (/\/$|index\.php/.test(url)) return 'home';
  return 'unknown';
}
