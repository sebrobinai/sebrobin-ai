# SEBROBIN AI — Landing Page

Stack: HTML · Vercel · Supabase · Resend

## Setup rapide

### 1. GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/VOTRE_USERNAME/sebrobin-ai.git
git push -u origin main
```

### 2. Supabase
- Créer un projet sur supabase.com
- Exécuter dans l'éditeur SQL :
```sql
create table newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  source text,
  created_at timestamptz default now()
);

create table demo_requests (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  app_interest text,
  message text,
  created_at timestamptz default now()
);
```
- Copier Project URL et anon key dans .env.local

### 3. Resend
- Créer un compte sur resend.com
- Vérifier le domaine sebrobin.com
- Créer une API key → copier dans .env.local

### 4. Vercel
- Connecter le repo GitHub sur vercel.com
- Ajouter les variables d'environnement depuis .env.example
- Déployer

### 5. GoDaddy DNS
Ajouter dans GoDaddy > Mes Domaines > sebrobin.com > DNS :
```
Type   : CNAME
Nom    : ai
Valeur : cname.vercel-dns.com
TTL    : 1 heure
```
Puis dans Vercel > Project > Settings > Domains :
Ajouter : ai.sebrobin.com

### 6. index.html — remplacer les placeholders
```js
const SUPABASE_URL  = 'https://xxxx.supabase.co';
const SUPABASE_ANON = 'eyJ...';
```
