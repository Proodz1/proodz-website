# Prompt pour Kilocode — audit avant mise en ligne

Colle ce prompt tel quel à Kilocode, à la racine de ce dossier (`Proodz web iyed`) :

---

Fais un audit complet de ce projet Next.js 16 (App Router, TypeScript) avant sa mise en ligne. Le projet est déjà buildé et vérifié une première fois (lint clean, `tsc --noEmit` clean, `npm audit` = 0 vulnérabilité, `npm run build` réussi). Je veux une seconde passe indépendante pour attraper ce que j'aurais pu manquer.

Vérifie précisément :

1. **Bugs fonctionnels** : logique cassée, états React incohérents, effets avec dépendances manquantes, conditions de course, gestion d'erreurs manquante sur les appels réseau (`fetch`).
2. **Liens et routes** : chaque `href` interne (`app/**/page.tsx`, `Navbar.tsx`, `Footer.tsx`, `Chatbot.tsx`, `lib/chatbot-content.ts`) pointe vers une route qui existe réellement dans `app/`. Signale tout lien mort ou route orpheline (page sans lien qui pointe vers elle).
3. **Images et médias** : chaque `src` d'`<Image>` ou `<video>` correspond à un fichier réel dans `public/`. Attention particulière à `components/sections/Partners.tsx` (24 logos) et `lib/portfolio-data.ts` (vidéos/images du portfolio).
4. **i18n** : `i18n/fr.ts` et `i18n/en.ts` ont exactement les mêmes clés que `i18n/types.ts` (aucune clé manquante dans une langue, aucune clé orpheline non utilisée dans le code).
5. **SEO** : chaque route sous `app/*/` a un `layout.tsx` avec `export const metadata` (title, description, openGraph, canonical) — sauf les routes dynamiques qui utilisent `generateMetadata`.
6. **Accessibilité** : boutons/liens avec `aria-label` quand ils n'ont pas de texte visible, formulaires avec `<label htmlFor>` correctement associés, focus visible au clavier.
7. **Sécurité** : aucune clé secrète en dur dans le code (grep `API_KEY`, `SECRET`, `TOKEN` dans `app/`, `components/`, `lib/`), toutes les variables sensibles passent par `process.env`.
8. **Performance** : `next/image` utilisé partout où c'est pertinent (pas de balises `<img>` natives), pas d'images non compressées de plusieurs dizaines de Mo dans `public/` en dehors des vidéos assumées.
9. **Cohérence build** : relance toi-même `npm install && npm run lint && npx tsc --noEmit && npm run build` et confirme que les trois commandes sortent sans erreur.

Donne-moi une liste priorisée (bloquant / important / mineur) des problèmes trouvés, avec le fichier et la ligne concernés — pas de corrections automatiques sans me les montrer d'abord.

---

## Contexte utile pour Kilocode

- `docs/ANALYTICS.md` : configuration Google Analytics 4 / Search Console déjà en place.
- `README.md` : instructions d'installation et de déploiement.
- `.env.example` : liste des variables d'environnement attendues (aucune n'est requise pour que le site fonctionne — les fonctionnalités liées se désactivent proprement si absentes).
