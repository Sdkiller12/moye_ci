# MOYÉ — La Lumière

Plateforme de préservation culturelle de Côte d'Ivoire combinant IA, traduction NLP, apprentissage gamifié et carte interactive.

## 🌅 Fonctionnalités

- **Scanner IA** : Reconnaissance d'objets culturels via Gemini Vision
- **Traducteur** : Traduction FR ↔ langues locales (LibreTranslate)
- **Carte culturelle** : Exploration interactive des ethnies
- **Académie** : Apprentissage gamifié avec système XP/badges
- **Palaver Chat** : Chat multilingue en temps réel
- **PWA** : Support hors-ligne avec cache SQLite

## 🛠️ Stack Technique

### Frontend
- React 19 + TypeScript 5.8
- Vite 6
- TailwindCSS 4
- Framer Motion 12
- React Router 7
- React Hook Form + Zod
- React Leaflet
- Lucide React

### Backend
- Node.js + Express 4
- Supabase (PostgreSQL + Auth + Storage)
- Gemini 2.0 Flash (IA)
- LibreTranslate (Docker)
- Better-SQLite3 (cache offline)

## 📦 Installation

### Prérequis
- Node.js 18+
- Docker & Docker Compose
- Compte Supabase
- Clé API Gemini

### Étapes

1. **Cloner le projet**
```bash
git clone <repo-url>
cd moyé
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Remplir `.env` avec vos clés :
- `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` depuis [Supabase](https://app.supabase.com)
- `GEMINI_API_KEY` depuis [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Configurer Supabase**
- Créer un nouveau projet Supabase
- Exécuter le script `supabase/schema.sql` dans l'éditeur SQL
- Créer un bucket Storage nommé `moye-media` (public)

5. **Démarrer les services Docker**
```bash
npm run docker:up
```

6. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Docker Compose (production)
```bash
docker compose up -d
```

## 📱 PWA

L'application est installable comme PWA :
- Support offline via Service Worker
- Cache Supabase avec stratégie NetworkFirst
- Manifest configuré pour mobile

## 🗄️ Structure du projet

```
moyé/
├── src/
│   ├── components/     # Composants réutilisables
│   ├── pages/          # Pages de l'application
│   ├── hooks/          # Hooks personnalisés
│   ├── lib/            # Utilitaires et clients API
│   ├── store/          # État global Zustand
│   └── types/          # Types TypeScript
├── supabase/           # Schéma PostgreSQL
├── server.ts           # Serveur Express
└── docker-compose.yml  # Services Docker
```

## 🎨 Design System

- **Primaire** : `#C8953A` (or chaud — soleil)
- **Secondaire** : `#2D5016` (vert forêt)
- **Accent** : `#E8F4E8` (menthe claire)
- **Police titres** : Philosopher
- **Police corps** : Inter

## 📝 Données de démonstration

5 ethnies pré-configurées :
1. Agni (Sanwi)
2. N'Zima (Krindjabo)
3. Baoulé
4. Bété
5. Dioula

Chacune avec rites, gastronomie, langue et traductions.

## 🔐 Authentification

- Magic Link (email uniquement)
- Session anonyme autorisée
- Routes protégées : Académie, Chat, Profil

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit (`git commit -m 'Ajout fonctionnalité'`)
4. Push (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT

## 🙏 Remerciements

Projet dédié à la préservation du patrimoine culturel ivoirien.

---

**MOYÉ** — Éclairons notre héritage 🌅
