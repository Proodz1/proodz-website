# Proodz — Site Web Officiel

Site corporate de l'agence **Proodz** (transformation digitale, stratégie, création, acquisition). Construit avec **Next.js 16 (App Router)** + **TypeScript strict** + **Tailwind 4** + **Framer Motion**.

> 🌐 Production : <https://proodz.com>

---

## Sommaire

- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation locale](#installation-locale)
- [Variables d'environnement](#variables-denvironnement)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Routes](#routes)
- [API](#api)
- [Déploiement](#déploiement)
- [Bonnes pratiques](#bonnes-pratiques)

---

## Stack technique

| Couche        | Technologie                                          |
| ------------- | ---------------------------------------------------- |
| Framework     | **Next.js 16.3** (App Router, Turbopack)             |
| UI            | **React 19.2**                                       |
| Language      | **TypeScript 5** (strict)                            |
| Style         | **Tailwind CSS 4** + CSS-in-JS (style props)         |
| Animation     | **Framer Motion 12**                                 |
| Fonts         | **next/font/local** — Inter + Space Grotesk (auto-hébergés) |
| Email         | Resend / SendGrid / Mailgun (au choix, optionnel)    |
| Analytics     | **Google Analytics 4** (optionnel, opt-in cookie)    |
| Search Console| **Google Search Console** (optionnel)                |
| Déploiement   | **Vercel** (recommandé) — output: `standalone`       |

---

## Prérequis

- **Node.js ≥ 20.0.0** (testé sur 20.x et 24.x)
- **npm ≥ 10** (ou pnpm/yarn/bun équivalents)
- Un compte **Vercel** pour le déploiement
- (Optionnel) Un domaine personnalisé `proodz.com`

---

## Installation locale

```bash
# 1. Cloner le repo
git clone https://github.com/Proodz1/proodz-website.git
cd proodz-website/proodz-site-source

# 2. Installer les dépendances
npm install

# 3. Copier le fichier d'env (optionnel en dev)
cp .env.example .env.local

# 4. Lancer en dev
npm run dev
# → http://localhost:3000
```

---

## Variables d'environnement

Copier `.env.example` → `.env.local` et renseigner les valeurs souhaitées. **Aucune n'est obligatoire** pour faire tourner le site : tout est désactivé gracieusement par défaut.

| Variable                          | Requis | Description                                                                 |
| --------------------------------- | ------ | --------------------------------------------------------------------------- |
| `CONTACT_EMAIL_FROM`              | non    | Adresse expéditrice des emails (ex. `Proodz <contact@proodz.com>`)         |
| `CONTACT_EMAIL_TO`                | non    | Destinataire des leads (défaut: `contact@proodz.com`)                       |
| `RESEND_API_KEY`                  | non    | API Resend (recommandé, simple HTTP) — prioritaire si défini                |
| `SENDGRID_API_KEY`                | non    | API SendGrid (fallback)                                                     |
| `MAILGUN_API_KEY`                 | non    | API Mailgun (fallback)                                                      |
| `MAILGUN_DOMAIN`                  | non    | Domaine Mailgun (requis si `MAILGUN_API_KEY`)                               |
| `LEADS_DIR`                       | non    | Dossier de secours pour les leads (défaut: `var/leads`)                     |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`   | non    | ID GA4 (ex. `G-XXXXXXXXXX`) — vide = pas de tracking                       |
| `NEXT_PUBLIC_GSC_VERIFICATION`    | non    | Token GSC HTML tag — vide = pas de vérification                            |

> ⚠️ **Sans provider email configuré**, les leads sont sauvegardés localement dans `var/leads/diagnostic.jsonl` (le `next dev` peut écrire, sur Vercel le filesystem est éphémère). Pour la production, **configurez au moins un provider**.

---

## Scripts disponibles

```bash
npm run dev      # Serveur de dev (Turbopack, port 3000)
npm run build    # Build de production (output: .next/standalone)
npm start        # Démarre le build de production (port 3000)
npm run lint     # ESLint (next/core-web-vitals)
```

---

## Structure du projet

```
proodz-site-source/
├── app/                        # App Router (Next.js 16)
│   ├── api/contact/            # Endpoint API formulaire de contact
│   ├── secteurs/[slug]/        # Pages secteurs dynamiques (6)
│   ├── portfolio/ux-design/... # Pages études de cas UX
│   ├── a-propos/               # Page À propos
│   ├── accompagnement/         # Page Services
│   ├── contact/                # Page Contact
│   ├── methode/                # Page Méthode
│   ├── portfolio/              # Page Portfolio
│   ├── layout.tsx              # Root layout (fonts, providers, JSON-LD)
│   ├── page.tsx                # Page d'accueil
│   ├── not-found.tsx           # 404 custom
│   ├── robots.ts               # robots.txt dynamique
│   └── sitemap.ts              # sitemap.xml dynamique
│
├── components/
│   ├── analytics/              # GA4 + ConsentBanner + listener
│   ├── animations/             # LogoIntro, ScrollProgress, variants
│   ├── forms/                  # FreeDiagnosticForm (5 étapes)
│   ├── icons/                  # Icônes SVG inline (zéro dépendance)
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Hero, Partners, Services, Chatbot, etc.
│   ├── seo/                    # JsonLd, RouteMetadata
│   └── Providers.tsx           # Context i18n
│
├── i18n/                       # FR/EN (détection localStorage)
│   ├── fr.ts
│   ├── en.ts
│   ├── types.ts
│   └── LanguageContext.tsx
│
├── lib/                        # Données et helpers
│   ├── sectors.ts              # Données des 6 secteurs
│   ├── portfolio-data.ts       # Données portfolio (5 projets)
│   ├── ux-cases.ts             # Études de cas UX
│   ├── chatbot-content.ts      # Contenu chatbot FR/EN
│   ├── analytics.ts            # Helper GA4
│   └── consent.ts              # Gestion consentement cookies
│
├── hooks/                      # Hooks React personnalisés
│   └── useCountUp.ts
│
├── public/                     # Assets statiques
│   ├── logos/                  # Logos clients (28 fichiers)
│   ├── banners/                # Bannières (3 fichiers)
│   ├── portfolio/              # Médias portfolio (50+ fichiers)
├── logo-placeholder.svg    # Fallback logos
└── visual-placeholder.svg  # Fallback images
│
├── next.config.ts              # Config Next.js (security headers, standalone)
├── tsconfig.json               # TypeScript strict
├── tailwind (via @tailwindcss/postcss)
└── package.json
```

---

## Routes

| Route                                | Type  | Description                                  |
| ------------------------------------ | ----- | -------------------------------------------- |
| `/`                                  | SSG   | Page d'accueil                               |
| `/a-propos`                          | SSG   | À propos                                     |
| `/accompagnement`                    | SSG   | Services / Accompagnement                    |
| `/contact`                           | SSG   | Page de contact + formulaire                 |
| `/methode`                           | SSG   | Méthode de travail                           |
| `/portfolio`                         | SSG   | Portfolio (5 projets)                        |
| `/portfolio/ux-design/[project-slug]`| SSG   | Études de cas UX (1 projet : Thryve)         |
| `/secteurs/[slug]`                   | SSG   | Pages secteurs (6 : immobilier, sport-loisirs, conseil-strategie, restauration, sante-bienetre, education-formation) |
| `/api/contact`                       | API   | POST — Soumission formulaire diagnostic      |
| `/robots.txt`                        | SSG   | Généré par `app/robots.ts`                   |
| `/sitemap.xml`                       | SSG   | Généré par `app/sitemap.ts`                  |
| `/_not-found`                        | SSG   | 404 custom (multilingue)                     |

---

## API

### `POST /api/contact`

Accepte un JSON, valide, sanitise, puis :
1. Envoie un email via le provider configuré (Resend > SendGrid > Mailgun)
2. **Fallback** : écrit dans `var/leads/diagnostic.jsonl` et retourne `status: "recorded"`

**Body** (champs requis marqués ⚠️) :

```json
{
  "sector": "string ⚠️",
  "sectorSlug": "string",
  "objective": "string ⚠️",
  "situation": "string",
  "budget": "string",
  "name": "string ⚠️",
  "company": "string",
  "email": "email ⚠️",
  "phone": "phone ⚠️",
  "message": "string",
  "lang": "fr|en",
  "source": "string",
  "honeypot": "",     // Doit être vide (anti-spam)
  "formStart": 12345  // ms timestamp (anti-spam < 3s)
}
```

**Réponses** :
- `200 { ok: true, delivered: true|false, status: "delivered" | "recorded" | "spam" }`
- `400 { ok: false, error: "invalid_body" | "missing_fields" | "invalid_email" | "invalid_phone" }`
- `500 { ok: false, error: "fallback_failed" }`

---

## Déploiement

### Sur Vercel (recommandé)

1. **Connecter le repo** sur <https://vercel.com/new>
2. **Root directory** : `proodz-site-source` (si vous déployez le monorepo) ou le repo complet
3. **Build command** : `npm run build` (détecté auto)
4. **Output directory** : `.next` (détecté auto, ou laisser par défaut)
5. **Variables d'environnement** : ajouter celles listées ci-dessus dans Settings > Environment Variables
6. **Domain** : ajouter `proodz.com` dans Domains

Vercel détecte automatiquement Next.js 16, installe les dépendances, build, et déploie. Chaque push sur `main` déclenche un nouveau déploiement.

### Auto-push local (Windows PowerShell)

Un script `push-script.ps1` est fourni pour pusher en une commande :

```powershell
.\push-script.ps1
```

(Configure le buffer HTTP, Git LFS, et retry automatique.)

### En self-hosted (Node)

```bash
npm run build
node .next/standalone/server.js
# → http://localhost:3000
```

> Le `output: "standalone"` réduit la taille de l'image Docker en n'incluant que les dépendances utilisées.

---

## Bonnes pratiques

- **TypeScript strict** : pas de `any`, pas de `@ts-ignore`. Tout nouveau code doit typer ses props et retours.
- **Composants serveur par défaut**, `"use client"` uniquement si interaction/état/hooks navigateur.
- **Pas d'images externes** : tous les médias sont dans `public/`. Aucun téléchargement à chaud.
- **Accessibilité** : `alt` obligatoire, focus trap dans le menu mobile, `aria-live` dans le formulaire, `role="alert"` sur les erreurs.
- **Sécurité** : headers `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (caméra/micro/géoloc désactivés), honeypot anti-spam, anti-bot temporel.
- **i18n** : FR/EN via Context, choix persisté en `localStorage`. Pas de routing i18n pour rester simple.
- **SEO** : `<title>`, `<meta description>`, Open Graph, JSON-LD Organization/LocalBusiness, sitemap.xml, robots.txt.

---

## License

© Proodz. Tous droits réservés.
