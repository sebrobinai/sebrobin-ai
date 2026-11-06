# SEBROBIN AI — ai.sebrobin.com

Bilingual (FR/EN) static site. Stack: HTML/CSS/JS · Vercel · Supabase · Resend.

## Pages

| FR | EN |
|---|---|
| `/` | `/en` |
| `/ventures` | `/en/ventures` |
| `/a-propos` | `/en/about` |
| `/conseil` | `/en/consulting` |
| `/contact` | `/en/contact` |

Legal pages `confidentialite.html` and `cgu.html` are French only.

## Editing content

All text lives in **`src/content.mjs`** (French and English side by side; the ventures list is at the bottom).

1. Edit `src/content.mjs`
2. Run `node src/build.mjs` from the repo root
3. Commit the regenerated `.html` files and `sitemap.xml`, then push

Don't edit the generated `.html` files by hand: the next build overwrites them.
Layout lives in `src/build.mjs`, styles in `assets/site.css`, behaviour in `assets/site.js`.

## Call-request form

`/contact` posts to `api/contact.js` (Vercel function), which:
- stores the request in the Supabase table `consulting_call_requests` (project `sebrobinai`), and
- emails a notification through Resend (reply-to = the requester).

Vercel environment variables:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `NOTIFY_EMAIL` | Where notifications go |
| `SUPABASE_URL` | `https://cqttmrwieanqtyzybwny.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase › Project Settings › API keys › secret / service_role key (server only) |

The table has RLS on and no public policies, so only the server function can write to it.

## Vercel

Framework preset "Other", no build command (the HTML is pre-built and committed). `vercel.json` enables clean URLs.
