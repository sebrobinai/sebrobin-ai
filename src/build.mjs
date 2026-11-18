// Generates the static FR + EN pages from src/content.mjs.
// Usage:  node src/build.mjs   (run from the repo root, then commit the generated .html files)
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, t, ventures, PLATFORM } from './content.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://ai.sebrobin.com';
const YEAR = new Date().getFullYear();

const AIDAN_SVG = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'aidan.svg'), 'utf8')
  .replace(/role="img" aria-label="Aidan"/, 'aria-hidden="true" focusable="false"').trim();
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const other = (lang) => (lang === 'fr' ? 'en' : 'fr');
const href = (key, lang) => pages[key][lang];
const CAL_USER = 'sebrobinai';
const CAL_EVENTS = ['30min', '1-hour-meeting'];
const go = (to, lang) => (to === 'platform' ? `${PLATFORM}?lang=${lang}` : href(to, lang));
const ext = (to) => (to === 'platform' ? ' rel="noopener"' : '');
function aidan(c, talk) {
  const a = c.aidan;
  if (!talk) return `<div class="aidan" data-state="idle"></div>`;
  return `<div class="aidan-stage" data-aidan-lines="${esc(JSON.stringify(a.lines))}">
      <p class="aidan-say" aria-live="polite"><span class="who">${esc(a.who)}</span><span class="txt">${esc(a.lines[0])}</span></p>
      <div class="aidan" data-state="idle"></div>
      <button type="button" class="aidan-next">${esc(a.next)}</button>
    </div>`;
}
const fileFor = (path) => (path === '/' ? 'index.html' : path === '/en' ? 'en/index.html' : path.slice(1) + '.html');

function head(c, key, page) {
  const lang = c.lang;
  const url = SITE + (href(key, lang) === '/' ? '/' : href(key, lang));
  const alt = (l) => SITE + (href(key, l) === '/' ? '/' : href(key, l));
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="fr" href="${alt('fr')}">
<link rel="alternate" hreflang="en" href="${alt('en')}">
<link rel="alternate" hreflang="x-default" href="${alt('fr')}">
<meta name="robots" content="index, follow">
<meta name="author" content="Seb Robin">
<meta property="og:type" content="website">
<meta property="og:site_name" content="SEBROBIN AI">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:image" content="${SITE}/apple-touch-icon.png">
<meta property="og:locale" content="${c.locale}">
<meta name="twitter:card" content="summary">
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Archivo:wdth,wght@62..125,100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
<script>document.documentElement.classList.add('js')</script>
${key === 'home' ? jsonLd(c) : ''}
</head>
<body>
<a class="skip" href="#main">${lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}</a>`;
}

function jsonLd(c) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SEBROBIN AI',
    url: SITE + (c.lang === 'fr' ? '/' : '/en'),
    logo: SITE + '/icon-192.png',
    description: c.home.description,
    email: 'sr@sebrobin.com',
    areaServed: 'Worldwide',
    availableLanguage: ['fr', 'en'],
    founder: { '@type': 'Person', name: 'Seb Robin' },
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function header(c, key) {
  const lang = c.lang;
  const item = (k) => `<li><a href="${href(k, lang)}"${k === key ? ' aria-current="page"' : ''}>${esc(c.nav[k])}</a></li>`;
  return `<header class="site-head">
  <div class="wrap head-row">
    <a class="brand" href="${href('home', lang)}" aria-label="SEBROBIN AI">
      <img src="/assets/bird.png" alt="" width="40" height="27">
      <span class="wordmark">SEBROBIN<b>AI</b></span>
    </a>
    <nav class="nav-wrap" id="nav-wrap" aria-label="${lang === 'fr' ? 'Navigation principale' : 'Main navigation'}">
      <ul class="nav">
        ${item('consulting')}
        ${item('clinic')}
        ${item('ventures')}
        ${item('about')}
        <li class="m-only"><a href="${go('platform', lang)}"${ext('platform')}>${esc(c.nav.cta)}</a></li>
      </ul>
    </nav>
    <a class="lang" href="${href(key || 'home', other(lang))}" hreflang="${other(lang)}" lang="${other(lang)}" title="${esc(c.nav.switchLabel)}">${c.nav.switchShort}</a>
    <a class="btn small head-cta" href="${go('platform', lang)}"${ext('platform')}>${esc(c.nav.cta)}</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-wrap">Menu</button>
  </div>
</header>
<main id="main">`;
}

function ctaBand(c) {
  return `<section class="cta-band">
  <div class="wrap">
    <h2>${esc(c.ctaBand.title)}</h2>
    <div class="cta-actions">
      <a class="btn light" href="${go('platform', c.lang)}"${ext('platform')}>${esc(c.ctaBand.button)}</a>
      <a class="btn ghost-light" href="${href('clinic', c.lang)}">${esc(c.ctaBand.second)}</a>
    </div>
  </div>
</section>`;
}

function footer(c) {
  const lang = c.lang;
  return `</main>
<footer class="site-foot">
  <div class="wrap">
    <div class="foot-row">
      <div>
        <a class="brand" href="${href('home', lang)}" aria-label="SEBROBIN AI">
          <img src="/assets/bird.png" alt="" width="34" height="23">
          <span class="wordmark">SEBROBIN<b>AI</b></span>
        </a>
        <p class="foot-tag">${esc(c.footer.tagline)}</p>
      </div>
      <ul class="foot-nav">
        <li><a href="${href('consulting', lang)}">${esc(c.nav.consulting)}</a></li>
        <li><a href="${href('clinic', lang)}">${esc(c.nav.clinic)}</a></li>
        <li><a href="${href('ventures', lang)}">${esc(c.nav.ventures)}</a></li>
        <li><a href="${href('about', lang)}">${esc(c.nav.about)}</a></li>
        <li><a href="${href('contact', lang)}">${esc(c.nav.contact)}</a></li>
      </ul>
      <ul class="foot-nav">
        <li><a href="mailto:sr@sebrobin.com">sr@sebrobin.com</a></li>
        <li><a href="${href('home', other(lang))}" hreflang="${other(lang)}" lang="${other(lang)}">${esc(c.nav.switchLabel)}</a></li>
      </ul>
    </div>
    <div class="foot-legal">
      <span>© ${YEAR} SEBROBIN AI · ${esc(c.footer.rights)}</span>
      <a href="/confidentialite.html">${esc(c.footer.privacy)}</a>
      <a href="/cgu.html">${esc(c.footer.terms)}</a>
    </div>
  </div>
</footer>
<script src="/assets/site.js" defer></script>
<script src="/assets/aidan.js" defer></script>
</body>
</html>
`;
}

/* ---------------- pages ---------------- */

function stagesList(c) {
  return `<ol class="stages">
      ${c.stages.map((x) => `<li><span class="k">${esc(x.k)}</span><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p><ul>${x.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul><span class="avail ${x.cls}">${esc(x.avail)}</span></li>`).join('\n      ')}
    </ol>`;
}

function home(c) {
  const h = c.home;
  return `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">${esc(h.eyebrow)}</p>
      <h1 class="display">${esc(h.h1)}</h1>
      <p class="sub-h1">${esc(h.sub)}</p>
      <p class="lead">${esc(h.lead)}</p>
      <div class="actions">
        <a class="btn" href="${go('platform', c.lang)}"${ext('platform')}>${esc(h.ctaPrimary)}</a>
        <a class="btn ghost" href="${href('clinic', c.lang)}">${esc(h.ctaSecondary)}</a>
      </div>
      <p class="small-note">${esc(h.ctaNote)}</p>
    </div>
    ${aidan(c, true)}
  </div>
</section>

<section class="block mist">
  <div class="wrap">
    <div class="section-head"><h2>${esc(h.econTitle)}</h2><p>${esc(h.econLead)}</p></div>
    <div class="qs">
      ${h.econ.map((q, i) => `<div><span class="n">0${i + 1}</span><h3>${esc(q.t)}</h3><p>${esc(q.d)}</p></div>`).join('\n      ')}
    </div>
    <div class="gap-note"><p>${esc(h.gap)}</p></div>
  </div>
</section>

<section class="block">
  <div class="wrap">
    <div class="section-head"><h2>${esc(h.stagesTitle)}</h2></div>
    ${stagesList(c)}
    <p style="margin-top:22px"><a class="text-link" href="${href('consulting', c.lang)}">${esc(h.stagesLink)}</a></p>
  </div>
</section>

<section class="block mist">
  <div class="wrap hero-grid">
    <div>
      <h2>${esc(h.robotTitle)}</h2>
      <p class="lead">${esc(h.robotText)}</p>
    </div>
    <figure class="week" style="margin:0">
      <figcaption class="week-title">${esc(h.week.title)}</figcaption>
      <ul>
        ${h.week.robot.map((x) => `<li class="robot"><span class="strike"><s>${esc(x)}</s></span></li>`).join('\n        ')}
        ${h.week.human.map((x) => `<li class="human">${esc(x)}</li>`).join('\n        ')}
      </ul>
      <p class="week-legend">${esc(h.week.legend)}</p>
    </figure>
  </div>
</section>

<section class="stance">
  <div class="wrap"><p>${esc(h.stance)}</p></div>
</section>

<section class="block">
  <div class="wrap split">
    <div style="max-width:300px">${aidan(c, false)}</div>
    <div>
      <h2 style="margin-bottom:18px">${esc(h.aidanTitle)}</h2>
      ${h.aidanText.map((x) => `<p>${esc(x)}</p>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="block mist">
  <div class="wrap">
    <div class="section-head"><h2>${esc(h.waysTitle)}</h2></div>
    <div class="offers">
      ${h.ways.map((w) => `<div class="offer"><h3>${esc(w.t)}</h3><span class="price">${esc(w.price)}</span><p>${esc(w.d)}</p><a class="btn ${w.to === 'platform' ? '' : 'ghost'} small" href="${go(w.to, c.lang)}"${ext(w.to)}>${esc(w.cta)}</a></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="block">
  <div class="wrap split">
    <h2>${esc(h.builderTitle)}</h2>
    <div>
      <p>${esc(h.builderText)}</p>
      <a class="text-link" href="${href('ventures', c.lang)}">${esc(h.builderLink)}</a>
    </div>
  </div>
</section>
${ctaBand(c)}`;
}

function consulting(c) {
  const p = c.consulting;
  return `
<section class="page-hero">
  <div class="wrap">
    <h1 class="page-title">${esc(p.h1)}</h1>
    <p class="lead">${esc(p.lead)}</p>
    <div class="actions">
      <a class="btn" href="${go('platform', c.lang)}"${ext('platform')}>${esc(c.nav.cta)}</a>
      <a class="btn ghost" href="${href('clinic', c.lang)}">${esc(c.ctaBand.second)}</a>
    </div>
  </div>
</section>

<section class="block mist" id="method">
  <div class="wrap">
    <div class="section-head"><h2>${esc(p.methodTitle)}</h2><p>${esc(p.methodLead)}</p></div>
    ${stagesList(c)}
    <div class="gate-note"><span class="diamond" aria-hidden="true"></span><p>${esc(p.gate)}</p></div>
  </div>
</section>

<section class="block">
  <div class="wrap">
    <div class="section-head"><h2>${esc(p.teamTitle)}</h2></div>
    <div class="three">
      ${p.team.map((x) => `<div><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="block mist">
  <div class="wrap">
    <div class="section-head"><h2>${esc(p.valueTitle)}</h2></div>
    <div class="value-list">
      ${p.value.map((v) => `<div><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="block">
  <div class="wrap split">
    <h2>${esc(p.forTitle)}</h2>
    <div><p>${esc(p.forText)}</p></div>
  </div>
</section>
${ctaBand(c)}`;
}

function clinic(c) {
  const p = c.clinic;
  return `
<section class="page-hero">
  <div class="wrap hero-grid">
    <div>
      <h1 class="page-title">${esc(p.h1)}</h1>
      <p class="lead">${esc(p.lead)}</p>
      <div class="actions"><a class="btn" href="#book">${esc(p.bookTitle)}</a></div>
    </div>
    <div style="max-width:260px;justify-self:center">${aidan(c, false)}</div>
  </div>
</section>

<section class="block tight-top">
  <div class="wrap">
    <div class="section-head"><h2>${esc(p.formatsTitle)}</h2></div>
    <div class="formats">
      ${p.formats.map((f) => `<div class="format"><span class="dur">${esc(f.dur)}</span><span class="amt">${esc(f.amt)}</span><p>${esc(f.d)}</p><a class="btn small ${f.book ? '' : 'ghost'}" href="${f.book ? '#book' : href('contact', c.lang)}">${esc(f.cta)}</a></div>`).join('\n      ')}
    </div>
    <p class="vat">${esc(p.vat)}</p>
  </div>
</section>

<section class="block mist">
  <div class="wrap split">
    <h2>${esc(p.howTitle)}</h2>
    <ol class="how">${p.how.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>
  </div>
</section>

<section class="block" id="book">
  <div class="wrap">
    <div class="section-head"><h2>${esc(p.bookTitle)}</h2><p>${esc(p.bookLead)}</p></div>
    <div class="book-tabs" role="tablist">
      ${p.bookTabs.map((x, i) => `<button type="button" role="tab" class="book-tab" aria-selected="${i === 0}" data-cal="${CAL_USER}/${CAL_EVENTS[i]}">${esc(x)}</button>`).join('')}
    </div>
    <div id="cal-inline" class="cal-inline" data-lang="${c.lang}"></div>
    <p class="vat">${esc(p.bookFallback)} <a href="https://cal.com/${CAL_USER}" rel="noopener">cal.com/${CAL_USER}</a></p>
  </div>
</section>

<section class="block mist">
  <div class="wrap split">
    <h2>${esc(p.forTitle)}</h2>
    <div><p>${esc(p.forText)}</p></div>
  </div>
</section>
${ctaBand(c)}`;
}

function venturesPage(c) {
  const v = c.ventures;
  const item = (x) => {
    const L = x[c.lang];
    const link = x.url
      ? `<a class="text-link" href="${x.url}" target="_blank" rel="noopener">${esc(v.visit)} ${esc(x.url.replace('https://', ''))}</a>`
      : `<span class="soon">${esc(v.soon)}</span>`;
    return `<article class="v-item"><h3>${esc(x.name)}</h3><p class="v-tag">${esc(L.tag)}</p><p class="d">${esc(L.d)}</p>${link}</article>`;
  };
  const live = ventures.filter((x) => x.status === 'live');
  const dev = ventures.filter((x) => x.status !== 'live');
  return `
<section class="page-hero">
  <div class="wrap">
    <h1 class="page-title">${esc(v.h1)}</h1>
    <p class="lead">${esc(v.lead)}</p>
  </div>
</section>
<section class="block tight-top">
  <div class="wrap">
    <div class="v-group">
      <h2><span class="v-dot" aria-hidden="true"></span>${esc(v.liveTitle)}</h2>
      <div class="v-list">${live.map(item).join('\n')}</div>
    </div>
    <div class="v-group">
      <h2><span class="v-dot dev" aria-hidden="true"></span>${esc(v.devTitle)}</h2>
      <div class="v-list">${dev.map(item).join('\n')}</div>
    </div>
  </div>
</section>
${ctaBand(c)}`;
}

function about(c) {
  const a = c.about;
  return `
<section class="page-hero">
  <div class="wrap about-hero">
    <div>
      <h1 class="page-title">${esc(a.h1)}</h1>
      <p class="lead">${esc(a.lead)}</p>
    </div>
    <div class="portrait"><img src="/assets/seb.jpg" alt="Seb Robin" width="560" height="560"></div>
  </div>
</section>
<section class="block tight-top">
  <div class="wrap split">
    <div>
      <h2 style="margin-bottom:20px">${esc(a.credTitle)}</h2>
      <ul class="creds">${a.creds.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
    <div>
      <h2 style="margin-bottom:20px">${esc(a.bioTitle)}</h2>
      ${a.bio.map((x) => `<p>${esc(x)}</p>`).join('\n      ')}
    </div>
  </div>
</section>
<section class="block mist">
  <div class="wrap">
    <div class="section-head"><h2>${esc(a.principlesTitle)}</h2></div>
    <div class="principles">
      ${a.principles.map((x) => `<div><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></div>`).join('\n      ')}
    </div>
    <p class="based">${esc(a.based)}</p>
  </div>
</section>
${ctaBand(c)}`;
}

function contact(c) {
  const p = c.contact;
  const f = p.f;
  const i18n = esc(JSON.stringify({ errRequired: f.errRequired, errEmail: f.errEmail, errNetwork: f.errNetwork, sending: f.sending, success: f.success }));
  const req = ' <span class="req" aria-hidden="true">*</span>';
  return `
<section class="page-hero">
  <div class="wrap">
    <h1 class="page-title">${esc(p.h1)}</h1>
    <p class="lead">${esc(p.lead)}</p>
  </div>
</section>
<section class="block tight-top">
  <div class="wrap contact-grid">
    <form class="form" id="call-form" novalidate data-i18n="${i18n}">
      <div class="field"><label for="f-first">${esc(f.first)}${req}</label><input class="input" id="f-first" name="first_name" autocomplete="given-name" required maxlength="100"></div>
      <div class="field"><label for="f-last">${esc(f.last)}${req}</label><input class="input" id="f-last" name="last_name" autocomplete="family-name" required maxlength="100"></div>
      <div class="field"><label for="f-email">${esc(f.email)}${req}</label><input class="input" id="f-email" name="email" type="email" autocomplete="email" required maxlength="254"></div>
      <div class="field"><label for="f-phone">${esc(f.phone)}</label><input class="input" id="f-phone" name="phone" type="tel" autocomplete="tel" maxlength="40"></div>
      <div class="field"><label for="f-company">${esc(f.company)}${req}</label><input class="input" id="f-company" name="company" autocomplete="organization" required maxlength="200"></div>
      <div class="field"><label for="f-role">${esc(f.role)}</label><input class="input" id="f-role" name="role" autocomplete="organization-title" maxlength="200"></div>
      <div class="field"><label for="f-size">${esc(f.size)}</label>
        <select class="input" id="f-size" name="company_size">
          <option value="">${esc(f.sizeChoose)}</option>
          ${Object.entries(f.sizes).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('')}
        </select>
      </div>
      <fieldset class="field"><legend>${esc(f.callLang)}</legend>
        <div class="radios">
          <label><input type="radio" name="call_language" value="fr"${c.lang === 'fr' ? ' checked' : ''}> ${esc(f.langFr)}</label>
          <label><input type="radio" name="call_language" value="en"${c.lang === 'en' ? ' checked' : ''}> ${esc(f.langEn)}</label>
        </div>
      </fieldset>
      <div class="field full"><label for="f-msg">${esc(f.message)}</label><textarea class="input" id="f-msg" name="message" maxlength="5000" placeholder="${esc(f.messagePh)}"></textarea></div>
      <div class="hp" aria-hidden="true"><label for="f-web">Website</label><input id="f-web" name="website" tabindex="-1" autocomplete="off"></div>
      <label class="consent"><input type="checkbox" name="consent" value="1" required> <span>${esc(f.consent)} <a href="/confidentialite.html">${esc(f.privacyLink)}</a>.</span></label>
      <p class="form-msg error" id="form-msg" role="alert" tabindex="-1" hidden></p>
      <div class="form-foot"><button class="btn" type="submit">${esc(f.submit)}</button></div>
    </form>
    <aside>
      <ul class="side-list">${p.side.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <p class="side-mail"><a href="mailto:sr@sebrobin.com">sr@sebrobin.com</a></p>
    </aside>
  </div>
</section>`;
}

function notFound() {
  const fr = t.fr.notFound, en = t.en.notFound;
  return `
<section class="block nf">
  <div class="wrap">
    <h1 class="page-title">${esc(fr.title)}</h1>
    <p class="lead">${esc(fr.text)}</p>
    <div class="actions"><a class="btn" href="/">${esc(fr.back)}</a></div>
    <p class="lead" lang="en" style="margin-top:48px">${esc(en.text)} <a class="text-link" href="/en">${esc(en.back)}</a></p>
  </div>
</section>`;
}

/* ---------------- write ---------------- */

const renderers = { home, consulting, clinic, ventures: venturesPage, about, contact };
const written = [];
for (const lang of ['fr', 'en']) {
  const c = t[lang];
  for (const key of Object.keys(pages)) {
    const html = head(c, key, c[key]) + header(c, key) + renderers[key](c) + footer(c);
    const out = join(ROOT, fileFor(href(key, lang)));
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
    written.push(fileFor(href(key, lang)));
  }
}
const nfPage = { title: t.fr.notFound.title + ' · SEBROBIN AI', description: t.fr.notFound.text };
writeFileSync(join(ROOT, '404.html'),
  head(t.fr, 'home', nfPage).replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="noindex">') + header(t.fr, '') + notFound() + footer(t.fr));
written.push('404.html');

// sitemap
const today = new Date().toISOString().slice(0, 10);
const urls = Object.keys(pages).flatMap((key) => ['fr', 'en'].map((lang) => {
  const loc = SITE + (href(key, lang) === '/' ? '/' : href(key, lang));
  const alts = ['fr', 'en'].map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE + (href(key, l) === '/' ? '/' : href(key, l))}"/>`).join('');
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod>${alts}</url>`;
}));
urls.push(`  <url><loc>${SITE}/confidentialite.html</loc><lastmod>${today}</lastmod></url>`, `  <url><loc>${SITE}/cgu.html</loc><lastmod>${today}</lastmod></url>`);
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`);
console.log('Built:', written.join(', '), '+ sitemap.xml');
