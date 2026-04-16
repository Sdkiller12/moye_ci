# 🏗️ Architecture — MOYÉ

## Vue d'ensemble

MOYÉ est une application fullstack moderne construite avec une architecture client-serveur découplée.

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (React)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Pages   │  │Components│  │  Hooks   │  │  Store  │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬────┘ │
│       │             │              │             │       │
│       └─────────────┴──────────────┴─────────────┘       │
│                         │                                │
│                    ┌────▼────┐                           │
│                    │   Lib   │                           │
│                    └────┬────┘                           │
└─────────────────────────┼─────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼────┐      ┌─────▼─────┐    ┌─────▼─────┐
   │ Express │      │ Supabase  │    │  Gemini   │
   │  API    │      │ PostgreSQL│    │    AI     │
   └────┬────┘      └───────────┘    └───────────┘
        │
   ┌────▼────────┐
   │LibreTranslate│
   │   (Docker)   │
   └──────────────┘
```

## 📁 Structure des dossiers

### `/src` - Frontend React

```
src/
├── components/          # Composants réutilisables
│   ├── layout/         # Layout (TopBar, BottomNav, PageTransition)
│   ├── ui/             # Composants UI de base (Button, Card, Badge)
│   ├── map/            # Composants carte Leaflet
│   ├── scanner/        # Composants scanner IA
│   └── academy/        # Composants académie
│
├── pages/              # Pages de l'application
│   ├── Home.tsx        # Page d'accueil avec hero
│   ├── Culture.tsx     # Carte culturelle + liste ethnies
│   ├── EthniePage.tsx  # Détail d'une ethnie
│   ├── Scanner.tsx     # Scanner IA d'objets
│   ├── Translator.tsx  # Traducteur multilingue
│   ├── Academy.tsx     # Hub d'apprentissage
│   ├── Chat.tsx        # Palaver Chat (à venir)
│   └── Profile.tsx     # Profil utilisateur
│
├── hooks/              # Hooks React personnalisés
│   ├── useEthnies.ts   # Fetch ethnies depuis Supabase
│   ├── useScanner.ts   # Scanner IA avec Gemini
│   ├── useTranslator.ts# Traduction LibreTranslate
│   ├── useAcademy.ts   # Modules et progression
│   └── useAuth.ts      # Authentification Supabase
│
├── lib/                # Utilitaires et clients
│   ├── supabase.ts     # Client Supabase configuré
│   ├── gemini.ts       # Wrapper API Gemini
│   ├── translate.ts    # Client LibreTranslate
│   ├── db.ts           # Cache SQLite offline
│   └── utils.ts        # Fonctions utilitaires (cn, formatDate)
│
├── store/              # État global
│   └── useAppStore.ts  # Zustand store (tab, user, XP)
│
├── types/              # Types TypeScript
│   └── index.ts        # Toutes les interfaces
│
├── App.tsx             # Composant racine
├── main.tsx            # Point d'entrée React
└── index.css           # Styles globaux + Tailwind
```

### `/supabase` - Base de données

```
supabase/
├── schema.sql          # Schéma PostgreSQL complet
└── seed.sql            # Données de démonstration (5 ethnies)
```

### Racine

```
/
├── server.ts           # Serveur Express + API routes
├── vite.config.ts      # Configuration Vite + PWA
├── tailwind.config.ts  # Configuration Tailwind
├── tsconfig.json       # Configuration TypeScript
├── docker-compose.yml  # Services Docker
└── package.json        # Dépendances et scripts
```

## 🔄 Flux de données

### 1. Chargement des ethnies

```
User → Culture Page
         ↓
    useEthnies hook
         ↓
    Supabase Client
         ↓
    PostgreSQL (ethnies table)
         ↓
    Cache SQLite (offline)
         ↓
    Display in UI
```

### 2. Scanner d'objets

```
User uploads image
         ↓
    Scanner Page
         ↓
    useScanner hook
         ↓
    POST /api/scanner
         ↓
    Express Server
         ↓
    Gemini Vision API
         ↓
    JSON Response
         ↓
    Display result
```

### 3. Traduction

```
User enters text
         ↓
    Translator Page
         ↓
    useTranslator hook
         ↓
    POST /api/translate
         ↓
    Express Server
         ↓
    LibreTranslate (Docker)
         ↓
    Translated text
         ↓
    Display result
```

## 🗄️ Modèle de données

### Tables principales

```sql
ethnies
├── id (UUID)
├── nom (TEXT)
├── region (TEXT)
├── description (TEXT)
├── histoire (TEXT)
├── carte_coords (JSONB)
└── tags (TEXT[])

rites
├── id (UUID)
├── ethnie_id (FK → ethnies)
├── nom (TEXT)
├── type (ENUM)
└── description (TEXT)

objets_culturels
├── id (UUID)
├── ethnie_id (FK → ethnies)
├── nom (TEXT)
├── type (ENUM)
└── gemini_labels (TEXT[])

langues
├── id (UUID)
├── ethnie_id (FK → ethnies)
├── nom (TEXT)
└── code (TEXT)

mots_traductions
├── id (UUID)
├── langue_id (FK → langues)
├── mot_fr (TEXT)
├── mot_local (TEXT)
└── phonetique (TEXT)

modules_apprentissage
├── id (UUID)
├── langue_id (FK → langues)
├── titre (TEXT)
├── niveau (ENUM)
└── xp_reward (INT)

user_progress
├── id (UUID)
├── user_id (FK → auth.users)
├── module_id (FK → modules)
├── score (INT)
└── completed (BOOLEAN)
```

### Relations

```
ethnies (1) ──→ (N) rites
ethnies (1) ──→ (N) objets_culturels
ethnies (1) ──→ (N) gastronomie
ethnies (1) ──→ (N) langues
langues (1) ──→ (N) mots_traductions
langues (1) ──→ (N) modules_apprentissage
modules (1) ──→ (N) questions_quiz
users   (1) ──→ (N) user_progress
users   (1) ──→ (N) user_badges
```

## 🔐 Sécurité

### Row Level Security (RLS)

```sql
-- Lecture publique pour le contenu culturel
ethnies, rites, objets_culturels, langues → SELECT public

-- Données utilisateur privées
user_progress → SELECT/INSERT/UPDATE WHERE auth.uid() = user_id
user_badges   → SELECT WHERE auth.uid() = user_id
```

### API Routes

```typescript
// Rate limiting
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Helmet pour headers sécurisés
app.use(helmet());

// CORS configuré
app.use(cors());
```

## 🚀 Performance

### Frontend

- **Code splitting** : Pages lazy-loaded via React Router
- **Image optimization** : WebP + lazy loading
- **Bundle size** : < 500KB gzipped
- **Lighthouse score** : > 90

### Backend

- **Caching** : SQLite cache pour offline
- **Connection pooling** : Supabase gère automatiquement
- **CDN** : Assets statiques via Vercel/Netlify

### Database

- **Indexes** : Sur `ethnies.nom`, `langues.code`
- **Pagination** : Limite 50 résultats par défaut
- **Eager loading** : Joins optimisés

## 📱 PWA

### Service Worker

```javascript
// Stratégie de cache
NetworkFirst → Supabase API (toujours frais si online)
CacheFirst  → Assets statiques (images, fonts)
StaleWhileRevalidate → Pages HTML
```

### Offline Support

1. **SQLite cache** : Dernières ethnies consultées
2. **Service Worker** : Assets en cache
3. **Fallback UI** : Message "Mode hors-ligne"

## 🧪 Tests (à implémenter)

### Unit Tests
- Hooks personnalisés
- Fonctions utilitaires
- Composants UI

### Integration Tests
- API endpoints
- Flux utilisateur complets

### E2E Tests
- Parcours utilisateur critiques
- Scanner + Traducteur

## 🔄 CI/CD (à configurer)

```yaml
# .github/workflows/deploy.yml
on: [push]
jobs:
  build:
    - npm install
    - npm run type-check
    - npm run build
  deploy:
    - Deploy to Vercel/Netlify
```

## 📊 Monitoring (recommandé)

- **Sentry** : Error tracking
- **Vercel Analytics** : Performance
- **Supabase Dashboard** : Database metrics
- **Google Analytics** : Usage stats

## 🔮 Évolutions futures

### Phase 2
- [ ] Chat Palaver en temps réel (Supabase Realtime)
- [ ] Reconnaissance vocale pour traducteur
- [ ] Mode AR pour scanner d'objets
- [ ] Système de favoris

### Phase 3
- [ ] API publique REST
- [ ] Application mobile native (React Native)
- [ ] Marketplace d'artisanat
- [ ] Événements culturels

---

**Dernière mise à jour :** Avril 2026
