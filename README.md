# 🛒 Aura Commerce

Une application e-commerce moderne et performante construite avec les dernières technologies web.

## 📋 Table des matières

- [Technologies utilisées](#-technologies-utilisées)
- [Architecture du projet](#-architecture-du-projet)
- [Installation](#-installation)
- [Commandes de démarrage](#-commandes-de-démarrage)
- [Structure des fichiers](#-structure-des-fichiers)
- [Développement](#-développement)

---

## 🛠️ Technologies utilisées

### Framework & Runtime
- **TanStack Start** (v1.167.50) - Framework React full-stack moderne avec SSR (Server-Side Rendering)
- **React** (v19.2.0) - Bibliothèque UI avec JSX
- **TypeScript** (v5.8.3) - Langage typé pour JavaScript
- **Vite** (v7.3.1) - Bundler ultra-rapide et dev server

### Routage & État
- **TanStack Router** (v1.168.25) - Routeur type-safe pour React
- **TanStack React Query** (v5.83.0) - Gestion des requêtes API et du cache
- **React Hook Form** (v7.71.2) - Gestion efficace des formulaires

### UI & Styling
- **Tailwind CSS** (v4.2.1) - Framework CSS utilitaire
- **Radix UI** (multiple composants) - Composants unstyled accessibles (Accordion, Dialog, Dropdown, Select, etc.)
- **Lucide React** (v0.575.0) - Bibliothèque d'icônes

### Composants spécialisés
- **Recharts** (v2.15.4) - Graphiques interactifs
- **Embla Carousel** (v8.6.0) - Carrousel image haute performance
- **Sonner** (v2.0.7) - Notifications toast élégantes
- **React Day Picker** (v9.14.0) - Sélecteur de date
- **Input OTP** (v1.4.2) - Champ OTP accessible
- **React Resizable Panels** (v4.6.5) - Panneaux redimensionnables
- **Vaul** (v1.1.2) - Drawer/Sidebar accessible

### Validation & Utilitaires
- **Zod** (v3.24.2) - Validation de schémas TypeScript
- **Hook Form Resolvers** (v5.2.2) - Intégration Zod + React Hook Form
- **clsx & tailwind-merge** - Gestion intelligente des classes CSS

### Déploiement & Build
- **Cloudflare Vite Plugin** (v1.25.5) - Plugin pour déployer sur Cloudflare Workers
- **Wrangler** - CLI Cloudflare (configuré via wrangler.jsonc)

### Outils de développement
- **ESLint** (v9.32.0) - Linting du code JavaScript/TypeScript
- **Prettier** (v3.7.3) - Formatage du code
- **TypeScript ESLint** (v8.56.1) - Linting TypeScript

---

## 🏗️ Architecture du projet

### Structure générale
```
aura-commerce/
├── src/
│   ├── routes/              # Routes de l'application (TanStack Router)
│   ├── components/          # Composants React réutilisables
│   ├── lib/                 # Logique métier et utilitaires
│   ├── hooks/               # Hooks React personnalisés
│   ├── server.ts            # Entrée serveur SSR
│   ├── start.ts             # Point d'entrée client
│   ├── router.tsx           # Définition du routeur
│   └── styles.css           # Styles globaux
├── vite.config.ts           # Configuration Vite
├── tsconfig.json            # Configuration TypeScript
├── eslint.config.js         # Configuration ESLint
├── wrangler.jsonc           # Configuration Cloudflare Workers
└── bunfig.toml              # Configuration Bun (optionnel)
```

### Stack technologique
- **Frontend** : React 19 + TypeScript
- **Styling** : Tailwind CSS 4 + Radix UI
- **Routage** : TanStack Router (type-safe)
- **Requêtes** : TanStack React Query
- **Formulaires** : React Hook Form + Zod
- **Serveur** : TanStack Start (SSR avec Cloudflare Workers)
- **Build** : Vite + Cloudflare Vite Plugin

---

## 📦 Installation

### Prérequis
- **Node.js** ≥ 18.x (recommandé 20.x ou supérieur)
- **npm**, **yarn**, **pnpm** ou **bun** (gestionnaire de paquets)

### Étapes d'installation

1. **Clonez le repository** :
   ```bash
   git clone <url-du-repo>
   cd aura-commerce
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   # ou avec yarn/pnpm/bun
   yarn install
   pnpm install
   bun install
   ```

3. **Configuration optionnelle** :
   - Vérifiez `wrangler.jsonc` pour la configuration Cloudflare (si déploiement prévu)
   - Créez un fichier `.env.local` si des variables d'environnement sont nécessaires

---

## 🚀 Commandes de démarrage

### Développement local

#### Mode développement (Vite + HMR)
```bash
npm run dev
```
- Lance le serveur de développement sur `http://localhost:5173`
- Hot Module Replacement (HMR) activé
- Recompilation automatique des fichiers modifiés

#### Preview production (localement)
```bash
npm run preview
```
- Simule le build de production en local
- Utile pour vérifier les performances avant déploiement

### Build & Déploiement

#### Build production
```bash
npm run build
```
- Génère les fichiers optimisés dans le dossier `dist/`
- Minification et tree-shaking automatiques

#### Build en mode développement
```bash
npm run build:dev
```
- Build avec variables de développement
- Utile pour déboguer des problèmes de build

### Qualité du code

#### Linting ESLint
```bash
npm run lint
```
- Vérifie la qualité du code TypeScript/JavaScript
- Détecte les erreurs et incohérences de style

#### Formatage Prettier
```bash
npm run format
```
- Formate tout le code du projet selon les règles Prettier
- Applique un style de code cohérent

---

## 📂 Structure des fichiers détaillée

### `/src/routes/` - Routeur
- `__root.tsx` - Layout racine
- `index.tsx` - Page d'accueil
- `products.tsx` - Listing des produits
- `products.$slug.tsx` - Détail d'un produit
- `cart.tsx` - Panier
- `checkout.tsx` - Paiement
- `admin.tsx` - Panel administrateur
- `vendor.tsx` - Page vendeur

### `/src/components/` - Composants
- `product-card.tsx` - Carte produit réutilisable
- `layout/` - Composants de layout (header, footer)
- `ui/` - Composants Radix UI stylisés (29 composants disponibles)

### `/src/lib/` - Logique métier
- `cart-store.ts` - Gestion du panier
- `products.ts` - Logique et appels API produits
- `error-capture.ts` - Capture d'erreurs SSR
- `error-page.ts` - Rendu de page d'erreur
- `utils.ts` - Utilitaires générales

### `/src/hooks/` - Hooks React
- `use-mobile.tsx` - Détection viewport mobile

---

## 🛠️ Développement

### Configuration de l'éditeur
Ce projet utilise :
- **ESLint** pour la détection des erreurs (voir `eslint.config.js`)
- **Prettier** pour le formatage automatique
- **TypeScript** pour la vérification des types

**Recommandation** : Installez les extensions VS Code :
```
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- TypeScript Vue Plugin (Vue.vscode-typescript-vue-plugin)
```

### Conventions de développement
- Utiliser TypeScript strictement (mode strict activé)
- Composants fonctionnels avec hooks uniquement
- Utiliser Zod pour la validation de données
- Styles via Tailwind CSS + Radix UI
- Formulaires avec React Hook Form + Zod

### Variables d'environnement
Créez un fichier `.env.local` à la racine si nécessaire :
```env
VITE_API_URL=http://localhost:3000/api
VITE_ENVIRONMENT=development
```

Les variables préfixées par `VITE_` sont injected dans le code client par Vite.

### Déploiement sur Cloudflare Workers
1. Configurer `wrangler.jsonc` avec vos paramètres Cloudflare
2. Authentifiez-vous :
   ```bash
   wrangler login
   ```
3. Déployez :
   ```bash
   npm run build && wrangler deploy
   ```

---

## 📝 Points clés

✅ **Type-safe** : TypeScript strict + Zod  
✅ **Performance** : Vite, TanStack Start avec SSR, React Query  
✅ **Accessibilité** : Radix UI accessible  
✅ **Modern UI** : Tailwind CSS 4 + Composants Radix  
✅ **Scalable** : Architecture modulaire  
✅ **Prêt production** : Cloudflare Workers integration  

---

## 📚 Ressources utiles

- [TanStack Start Documentation](https://tanstack.com/start)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://radix-ui.com)
- [TypeScript](https://www.typescriptlang.org)
- [Vite Guide](https://vitejs.dev)
- [Cloudflare Workers](https://developers.cloudflare.com/workers)

---

## 📄 Licence

À définir selon votre configuration.

---

**Créé avec ❤️ pour une e-commerce moderne**
