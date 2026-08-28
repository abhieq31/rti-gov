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
    }));

    const selects = [...document.querySelectorAll('select')].map((el) => ({
      name: el.getAttribute('name') || '',
      id: el.id || '',
      label: labelFor(el),
      options: [...el.options].map((o) => ({ value: o.value, text: o.textContent.trim(), selected: o.selected })),
      visible: visible(el),
    }));

    const noise = /case insensitive|otp do not expire|otp will be sent|can't read the image|refresh/i;
    const errors = [];
    for (const el of document.querySelectorAll('body *')) {
      if (el.children.length) continue;
      const t = textOf(el);
      if (!t || t.length > 220 || noise.test(t)) continue;
      const color = getComputedStyle(el).color.replace(/\s/g, '');
      if (color === 'rgb(255,0,0)' || color === 'rgb(204,0,0)' || color === 'rgb(255,0,0)' || /error/i.test(el.className)) {
        errors.push(t);
      }
    }

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
  if (/OTP|ओटीपी/.test(text) && /otp/i.test(names)) return 'otp';
  if (/request_email_check/.test(url)) return 'email-gate';
  if (/firstAppeal/.test(url) && /registrationNo|Registration No/i.test(names)) return 'appeal-lookup';
  if (/status_history/.test(url)) return /OTP|ओटीपी/.test(text) && /otp/i.test(names) ? 'history-otp' : 'history-gate';
  if (/status_pendingPayment/.test(url)) return 'payment-reconciliation-gate';
  if (/status\.php/.test(url) && /registration_no/.test(names)) return 'status-gate';
  if (/Select Ministry|Public Authority Details/i.test(text) && /RTI Request Form/i.test(text)) return 'request-form';
  if (/First Appeal Form/i.test(text) && /Ground For Appeal/i.test(text)) return 'appeal-form';
  if (/Online Request Payment Form/i.test(text)) return 'payment-form';
  if (/merchant\.online-sbi|sbiepay|payment gateway/i.test(url + text)) return 'payment-gateway';
  if (/filed successfully|Registration Number/i.test(text) && /Print Application|Save/i.test(text)) return 'acknowledgement';
  if (/login\.php|Citizen Login/i.test(url + text) && /UserName/.test(names)) return 'login';
  if (/allpa\.php/.test(url)) return 'authorities';
  if (/faq\.php/.test(url)) return 'faq';
  if (/Contactus/i.test(url)) return 'contact';
  if (/Policies/i.test(url)) return 'policies';
  if (/viewPDF|um_citizen/i.test(url)) return 'user-manual';
  if (/audiofile1/.test(url)) return 'audio-captcha';
  if (/\/$|index\.php/.test(url)) return 'home';
  return 'unknown';
}
