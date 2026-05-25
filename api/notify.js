// api/notify.js  — Vercel serverless function
// Sends an email notification via Resend when a form is submitted

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { type, name, email, company, app, message } = req.body;

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_TO      = process.env.NOTIFY_EMAIL; // your email address

  if (!RESEND_API_KEY || !NOTIFY_TO) {
    return res.status(500).json({ error: 'Missing env vars' });
  }

  const subjects = {
    newsletter: `🐦 Nouvelle inscription — ${name}`,
    demo:       `🎯 Nouvelle demande de démo — ${name}`,
  };

  const bodies = {
    newsletter: `
      <h2>Nouvelle inscription à la newsletter</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>E-mail :</strong> ${email}</p>
      <p><em>Reçu via la landing page SEBROBIN AI</em></p>
    `,
    demo: `
      <h2>Nouvelle demande de démo</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>E-mail :</strong> ${email}</p>
      <p><strong>Entreprise :</strong> ${company || '—'}</p>
      <p><strong>Application :</strong> ${app || '—'}</p>
      <p><strong>Message :</strong> ${message || '—'}</p>
      <p><em>Reçu via la landing page SEBROBIN AI</em></p>
    `,
  };

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SEBROBIN AI <noreply@sebrobin.com>',
        to:   [NOTIFY_TO],
        subject: subjects[type] || 'Nouvelle notification SEBROBIN AI',
        html: bodies[type] || `<p>Type: ${type}</p>`,
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      console.error('Resend error:', err);
      return res.status(500).json({ error: err });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
