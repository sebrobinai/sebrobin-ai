// Generates the static FR + EN pages from src/content.mjs.
// Usage:  node src/build.mjs   (run from the repo root, then commit the generated .html files)
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, t, ventures } from './content.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://ai.sebrobin.com';
const YEAR = new Date().getFullYear();

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const other = (lang) => (lang === 'fr' ? 'en' : 'fr');
const href = (key, lang) => pages[key][lang];
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
    areaServed: ['FR', 'Worldwide'],
    availableLanguage: ['fr', 'en'],
    address: { '@type': 'PostalAddress', addressLocality: 'Breteuil', addressRegion: 'Oise', addressCountry: 'FR' },
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
        ${item('ventures')}
        ${item('about')}
        ${item('consulting')}
        <li class="m-only"><a href="${href('contact', lang)}">${esc(c.nav.cta)}</a></li>
      </ul>
    </nav>
    <a class="lang" href="${href(key || 'home', other(lang))}" hreflang="${other(lang)}" lang="${other(lang)}" title="${esc(c.nav.switchLabel)}">${c.nav.switchShort}</a>
    <a class="btn small head-cta" href="${href('contact', lang)}">${esc(c.nav.cta)}</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-wrap">Menu</button>
  </div>
</header>
<main id="main">`;
}

function ctaBand(c) {
  return `<section class="cta-band">
  <div class="wrap">
    <h2>${esc(c.ctaBand.title)}</h2>
    <a class="btn light" href="${href('contact', c.lang)}">${esc(c.ctaBand.button)}</a>
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
        <li><a href="${href('ventures', lang)}">${esc(c.nav.ventures)}</a></li>
        <li><a href="${href('about', lang)}">${esc(c.nav.about)}</a></li>
        <li><a href="${href('consulting', lang)}">${esc(c.nav.consulting)}</a></li>
        <li><a href="${href('contact', lang)}">${esc(c.nav.cta)}</a></li>
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
</body>
</html>
`;
}

/* ---------------- pages ---------------- */

function home(c) {
  const h = c.home;
  return `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <h1 class="display">${esc(h.h1)}</h1>
      <p class="lead">${esc(h.lead)}</p>
      <div class="actions">
        <a class="btn" href="${href('contact', c.lang)}">${esc(h.ctaPrimary)}</a>
        <a class="btn ghost" href="${href('consulting', c.lang)}#method">${esc(h.ctaSecondary)}</a>
      </div>
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
  <div class="wrap">
    <div class="section-head"><h2>${esc(h.gainsTitle)}</h2></div>
    <div class="three">
      ${h.gains.map((g) => `<div><h3>${esc(g.t)}</h3><p>${esc(g.d)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="block mist">
  <div class="wrap split">
    <h2>${esc(h.builderTitle)}</h2>
    <div>
      <p>${esc(h.builderText)}</p>
      <a class="text-link" href="${href('ventures', c.lang)}">${esc(h.builderLink)}</a>
    </div>
  </div>
</section>

<section class="block">
  <div class="wrap">
    <ul class="doors">
      ${h.doors.map((d) => `<li><a href="${href(d.key, c.lang)}"><h3>${esc(d.t)}</h3><p>${esc(d.d)}</p><span class="go" aria-hidden="true">›</span></a></li>`).join('\n      ')}
    </ul>
  </div>
</section>
${ctaBand(c)}`;
}

function consulting(c) {
  const p = c.consulting;
  const phaseOf = (i) => p.phases[Math.floor(i / 2)];
  const steps = p.steps.map((s, i) => {
    const gate = i === 5;
    return `<li class="step${gate ? ' gate' : ''}">
        <div class="marker" aria-hidden="true"><span>${gate ? '?' : i + 1}</span></div>
        <span class="phase-tag">${i % 2 === 0 ? esc(phaseOf(i)) : ''}</span>
        <h3>${esc(s.t)}</h3>
        <p class="q">${esc(s.q)}</p>
        <p class="out"><span>${esc(p.outLabel)}</span>${esc(s.out)}</p>
      </li>`;
  }).join('\n      ');
  return `
<section class="page-hero">
  <div class="wrap">
    <h1 class="page-title">${esc(p.h1)}</h1>
    <p class="lead">${esc(p.lead)}</p>
    <div class="actions"><a class="btn" href="${href('contact', c.lang)}">${esc(c.nav.cta)}</a></div>
  </div>
</section>

<section class="block tight-top">
  <div class="wrap">
    <div class="section-head"><h2>${esc(p.valueTitle)}</h2></div>
    <div class="value-list">
      ${p.value.map((v) => `<div><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="block mist" id="method">
  <div class="wrap method">
    <div class="section-head"><h2>${esc(p.methodTitle)}</h2><p>${esc(p.methodLead)}</p></div>
    <div class="phases" aria-hidden="true">
      ${p.phases.map((ph) => `<div class="phase">${esc(ph)}</div>`).join('')}
      <div class="phase phase-deliver">${esc(p.deliver.t.split('.')[0])}</div>
    </div>
    <ol class="track">
      ${steps}
      <li class="step deliver">
        <div class="marker" aria-hidden="true"><span>✓</span></div>
        <span class="phase-tag"></span>
        <h3>${esc(p.deliver.t)}</h3>
        <p class="q">${esc(p.deliver.d)}</p>
      </li>
    </ol>
    <div class="gate-note"><span class="diamond" aria-hidden="true"></span><p>${esc(p.gate)}</p></div>
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
    <!-- TODO: replace with a photo: <img src="/assets/seb.jpg" alt="Seb Robin"> -->
    <div class="portrait"><span class="initials" aria-hidden="true">SR</span></div>
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

const renderers = { home, consulting, ventures: venturesPage, about, contact };
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
