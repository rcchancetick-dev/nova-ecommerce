# Guide de déploiement Vercel — NOVA

Ce guide explique comment déployer le site NOVA sur Vercel avec la base Supabase déjà configurée.

## 1. Prérequis

- Un compte [Vercel](https://vercel.com).
- Le dépôt [rcchancetick-dev/nova-ecommerce](https://github.com/rcchancetick-dev/nova-ecommerce) déjà à jour (fait ✅).
- Le projet Supabase `nova-ecommerce` déjà créé et seedé (fait ✅).

## 2. Importer le projet

1. Allez sur [vercel.com/new](https://vercel.com/new).
2. Cliquez sur **Import Git Repository** et sélectionnez `rcchancetick-dev/nova-ecommerce`.
3. Vercel détecte automatiquement le framework **Vite** grâce au fichier `vercel.json` inclus dans le dépôt.

## 3. Configurer les variables d'environnement

Dans l'écran de configuration du projet (ou dans **Settings → Environment Variables** après import), ajoutez :

| Nom | Valeur |
|---|---|
| `VITE_SUPABASE_URL` | `https://jfmubwoqvbkpkcjocvmo.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | (clé anon du projet, voir `.env.example` dans le dépôt) |

Appliquez ces variables aux environnements **Production**, **Preview** et **Development**.

## 4. Déployer

Cliquez sur **Deploy**. Le build utilise :

- Build command : `npm run build`
- Output directory : `dist`

Vercel vous donnera une URL du type `nova-ecommerce.vercel.app` une fois le déploiement terminé.

## 5. Déploiements automatiques

Une fois connecté, chaque `git push` sur la branche `main` déclenche un nouveau déploiement de production. Les autres branches génèrent des déploiements de preview.

## 6. Domaine personnalisé (optionnel)

Dans **Settings → Domains**, vous pouvez ajouter un nom de domaine personnalisé et suivre les instructions DNS affichées par Vercel.

---

Ce dépôt est déployé directement via l'intégration Vercel connectée à cet assistant.
