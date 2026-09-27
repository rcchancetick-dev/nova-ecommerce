# NOVA — Boutique E-commerce Nouvelle Génération

Site e-commerce moderne construit avec **React 18**, **Vite**, **Tailwind CSS** et **Framer Motion**, avec un design "aurora glassmorphism" et des animations hyper-tendances (curseur lumineux, transitions de page fluides, effets de survol 3D, shimmer text, panier latéral animé, etc).

## Aperçu des fonctionnalités

- **Page d'accueil** immersive avec hero animé, halos lumineux flottants, section avantages et newsletter.
- **Boutique** avec filtres de catégories animés (pill indicator façon iOS).
- **Fiche produit** détaillée avec transitions d'entrée fluides.
- **Panier** en tiroir latéral (drawer) avec gestion des quantités en temps réel via Zustand.
- **Tunnel de commande** avec formulaire de paiement et écran de confirmation animé.
- **Curseur lumineux** qui suit la souris (glow effect).
- Design **glassmorphism** + dégradés "aurora" (violet / fuchsia / cyan).
- Entièrement **responsive** (mobile, tablette, desktop).

## Stack technique

| Techno | Usage |
|---|---|
| React 18 + Vite | Framework et bundler |
| Framer Motion | Animations et transitions |
| Tailwind CSS | Styling utilitaire |
| Zustand | State management (panier) |
| React Router v6 | Navigation SPA |
| Lucide React | Icônes |

## Installation

```bash
git clone https://github.com/rcchancetick-dev/nova-ecommerce.git
cd nova-ecommerce
npm install
npm run dev
```

Le site sera accessible sur `http://localhost:5173`.

## Build de production

```bash
npm run build
npm run preview
```

## Déploiement Vercel

1. Importer le dépôt sur [vercel.com](https://vercel.com/new).
2. Framework preset : **Vite**.
3. Build command : `npm run build` — Output directory : `dist`.
4. Déployer.

## Structure du projet

```
src/
  components/     # Navbar, Footer, CartDrawer, ProductCard, CursorGlow
  pages/          # Home, Shop, ProductDetail, Checkout, NotFound
  store/          # cartStore (Zustand)
  data/           # Produits statiques (à remplacer par une API/DB plus tard)
```

## Prochaines étapes suggérées

- Connecter une vraie base de données (Supabase) pour les produits et commandes.
- Ajouter l'authentification utilisateur.
- Intégrer un vrai fournisseur de paiement (Stripe).
- Ajouter une recherche produit et un système de wishlist.

---

Généré avec ❤️ et beaucoup d'animations Framer Motion.
