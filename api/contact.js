// api/contact.js — Vercel serverless function
// Receives the "Request a call" form, stores it in Supabase and emails a notification via Resend.
//
// Environment variables (Vercel > Project > Settings > Environment Variables):
//   RESEND_API_KEY             already used by the previous site
//   NOTIFY_EMAIL               already used by the previous site (where notifications go)
//   SUPABASE_URL               https://cqttmrwieanqtyzybwny.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY  Supabase > Project Settings > API keys > service_role / secret key (server only, never in the browser)
//
// The request succeeds if at least one of the two channels (database or email) works.

const SIZES = ['1-9', '10-49', '50-249', '250+'];
const LANGS = ['fr', 'en'];

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clip = (s, n) => (typeof s === 'string' ? s.trim().slice(0, n) : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const b = typeof req.body === 'string' ? safeJson(req.body) : (req.body || {});

  // Spam traps: hidden field filled, or form submitted inhumanly fast. Pretend success.
  if (b.website || (typeof b.elapsed_ms === 'number' && b.elapsed_ms < 2500)) {
    return res.status(200).json({ ok: true });
  }

  const row = {
    first_name: clip(b.first_name, 100),
    last_name: clip(b.last_name, 100),
    email: clip(b.email, 254).toLowerCase(),
    phone: clip(b.phone, 40) || null,
    company: clip(b.company, 200),
    role: clip(b.role, 200) || null,
    company_size: SIZES.includes(b.company_size) ? b.company_size : null,
    call_language: LANGS.includes(b.call_language) ? b.call_language : 'fr',
    message: clip(b.message, 5000) || null,
    site_language: LANGS.includes(b.site_language) ? b.site_language : null,
    consent_at: new Date().toISOString(),
  };

  if (!row.first_name || !row.last_name || !row.company || b.consent !== true) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(row.email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const [db, mail] = await Promise.allSettled([saveToSupabase(row), sendEmail(row)]);
  if (db.status === 'rejected') console.error('Supabase:', db.reason?.message || db.reason);
  if (mail.status === 'rejected') console.error('Resend:', mail.reason?.message || mail.reason);

  if (db.status === 'rejected' && mail.status === 'rejected') {
    return res.status(502).json({ error: 'Could not record the request' });
  }
  return res.status(200).json({ ok: true });
}

function safeJson(s) { try { return JSON.parse(s); } catch { return {}; } }

async function saveToSupabase(row) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env vars not set');
  const r = await fetch(`${url}/rest/v1/consulting_call_requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}`, Prefer: 'return=minimal' },
    body: JSON.stringify(row),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${await r.text()}`);
}

async function sendEmail(row) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) throw new Error('Resend env vars not set');
  const line = (label, v) => `<p><strong>${label} :</strong> ${esc(v || '—')}</p>`;
  const html = `
    <h2>Nouvelle demande d'appel — conseil IA</h2>
    ${line('Nom', `${row.first_name} ${row.last_name}`)}
    ${line('E-mail', row.email)}
    ${line('Téléphone', row.phone)}
    ${line('Entreprise', row.company)}
    ${line('Fonction', row.role)}
    ${line('Taille', row.company_size)}
    ${line("Langue de l'appel", row.call_language === 'en' ? 'Anglais' : 'Français')}
    <p><strong>Message :</strong></p>
    <p style="white-space:pre-wrap">${esc(row.message || '—')}</p>
    <p><em>Reçu via ai.sebrobin.com (${esc(row.site_language || '?')})</em></p>`;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'SEBROBIN AI <noreply@sebrobin.com>',
      to: [to],
      reply_to: row.email,
      subject: `📞 Demande d'appel — ${row.first_name} ${row.last_name} (${row.company})`,
      html,
    }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${await r.text()}`);
}
