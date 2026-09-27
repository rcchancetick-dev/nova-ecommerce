# NOVA — Boutique E-commerce Nouvelle Génération

Site e-commerce moderne construit avec **React 18**, **Vite**, **Tailwind CSS**, **Framer Motion** et **Supabase** (base de données PostgreSQL), avec un design "aurora glassmorphism" et des animations hyper-tendances.

## Aperçu des fonctionnalités

- **Produits dynamiques** stockés dans Supabase (PostgreSQL) et chargés en temps réel.
- **Page d'accueil** immersive avec hero animé, halos lumineux flottants, section avantages et newsletter.
- **Boutique** avec filtres de catégories animés (pill indicator façon iOS).
- **Fiche produit** détaillée avec transitions d'entrée fluides.
- **Panier** en tiroir latéral (drawer) avec gestion des quantités en temps réel via Zustand.
- **Tunnel de commande** qui enregistre réellement la commande et ses articles dans Supabase.
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
| Supabase | Base de données PostgreSQL + API (produits, commandes) |

## Base de données Supabase

Le projet utilise 3 tables :

- `products` — catalogue produits (nom, prix, catégorie, image, badge, note).
- `orders` — commandes clients (nom, email, adresse, total, statut).
- `order_items` — lignes de commande liées à `orders` et `products`.

La Row Level Security (RLS) est activée avec des policies publiques permettant la lecture des produits et l'insertion de commandes (adapté à une démo ; à restreindre en production avec une vraie authentification).

## Installation

```bash
git clone https://github.com/rcchancetick-dev/nova-ecommerce.git
cd nova-ecommerce
npm install
cp .env.example .env
npm run dev
```

Le fichier `.env.example` contient déjà l'URL et la clé publique (anon) du projet Supabase de démo. Pour votre propre instance, remplacez les valeurs dans `.env`.

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
4. Ajouter les variables d'environnement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
5. Déployer.

## Structure du projet

```
src/
  components/     # Navbar, Footer, CartDrawer, ProductCard, CursorGlow
  pages/          # Home, Shop, ProductDetail, Checkout, NotFound
  store/          # cartStore (Zustand)
  hooks/          # useProducts (fetch Supabase)
  lib/            # supabaseClient
  data/           # categories statiques (fallback)
```

## Prochaines étapes suggérées

- Ajouter l'authentification utilisateur (Supabase Auth).
- Intégrer un vrai fournisseur de paiement (Stripe).
- Ajouter une recherche produit et un système de wishlist.
- Créer un back-office pour gérer les produits et commandes.

---

Généré avec ❤️ et beaucoup d'animations Framer Motion.
