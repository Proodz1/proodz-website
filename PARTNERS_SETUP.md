# Guide de Configuration des Logos des Partenaires

## 📁 Structure des fichiers

Tous les logos des partenaires doivent être placés dans le dossier `/public/partners/`.

## 🔄 Comment remplacer les logos placeholder

Les fichiers SVG actuels sont des placeholders. Pour ajouter les vrais logos :

### Option 1 : Remplacer les fichiers SVG existants
1. Placez vos fichiers PNG ou SVG dans `/public/partners/`
2. Utilisez les mêmes noms de fichiers :
   - `jasmin-travel.svg` → remplacez par votre logo
   - `global-trust-finance.svg` → remplacez par votre logo
   - `wanderlust-expeditions.svg` → remplacez par votre logo
   - `aussui.svg` → remplacez par votre logo
   - `global-insights.svg` → remplacez par votre logo

### Option 2 : Ajouter de nouveaux partenaires
1. Placez le fichier du logo dans `/public/partners/` (PNG, SVG, WebP, etc.)
2. Modifiez le fichier `app/partners.data.ts` :

```typescript
export const partners: Partner[] = [
  {
    id: "votre-partenaire-id",
    name: "Nom du Partenaire",
    logo: "/partners/votre-logo.png", // Chemin vers le logo
    url: "https://votre-site.com", // URL optionnelle
    description: "Description optionnelle",
  },
  // ... autres partenaires
];
```

## 📋 Données des partenaires

Le fichier `app/partners.data.ts` contient l'interface `Partner` :

```typescript
interface Partner {
  id: string;          // Identifiant unique (utilisé pour les animations)
  name: string;        // Nom du partenaire
  logo: string;        // Chemin vers le logo (relatif à /public)
  url?: string;        // URL du site web (optionnel)
  description?: string; // Description courte (optionnel)
}
```

## 🎨 Recommandations pour les logos

- **Format** : PNG, SVG, WebP (recommandé)
- **Dimensions** : Carrées ou rectangulaires (la hauteur sera automatiquement 80px)
- **Transparent** : Les logos avec fond transparent fonctionnent mieux
- **Taille de fichier** : Optimisez pour le web (< 100KB idéalement)
- **Ratio** : Sera automatiquement mis à l'échelle pour respecter les proportions

## ✨ Effets appliqués automatiquement

### Hover Effects
- ✓ Passage du noir/blanc (grayscale) à la couleur
- ✓ Mise à l'échelle légère (scale 1.08)
- ✓ Ombre douce avec couleur or (#C9A84C)

### Animations
- ✓ Apparition progressive lors du scroll (animation d'entrée)
- ✓ Transition fluide entre les états
- ✓ Performance optimisée avec Intersection Observer

## 🚀 Performance

- Les images utilisent le composant `Image` de Next.js
- Lazy loading automatique
- Support du responsive design
- Filtres CSS pour les effets hover (performance optimale)

## 📝 Modifier le tableau des partenaires

Le fichier `app/partners.data.ts` est la source unique de données. Pour :

**Ajouter un partenaire** :
```typescript
{
  id: "nouveau-partenaire",
  name: "Nouveau Partenaire",
  logo: "/partners/nouveau-partenaire.png",
  url: "https://example.com",
  description: "Description",
}
```

**Supprimer un partenaire** :
Supprimez simplement l'objet du tableau `partners`.

**Réorganiser** :
Changez l'ordre des partenaires dans le tableau.

## 🔧 Personnalisation du composant

Pour modifier le composant, éditez `app/Partners.tsx` :

- **Hauteur des cartes** : Changez `height: "120px"` en `PartnerCard`
- **Grille** : Modifiez `gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"`
- **Couleurs** : Les couleurs utilisent la palette existante (#C9A84C, rgba(255,255,255,...))
- **Ombres** : Modifiez les valeurs de `boxShadow` pour l'intensité

## 📱 Responsive Design

Le composant est entièrement responsive :
- Sur mobile : 1 colonne
- Sur tablette : 2-3 colonnes
- Sur desktop : 5 colonnes (avec scrolling fluide)

La grille s'ajuste automatiquement avec `auto-fit`.

## ✅ Bonnes pratiques

1. ✅ Tous les logos doivent avoir une hauteur lisible (> 40px)
2. ✅ Les proportions sont conservées automatiquement
3. ✅ Les URLs sont optionnelles (liens non-cliquables si vides)
4. ✅ Utilisez des ID uniques et descriptifs
5. ✅ Les animations démarrent au scroll pour la performance

---

**Questions ?** Consultez le composant `app/Partners.tsx` pour voir la structure complète.
