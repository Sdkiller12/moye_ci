# 🚀 Guide d'Installation — MOYÉ

## Installation Automatique (Recommandé)

### Linux/macOS
```bash
chmod +x setup.sh
./setup.sh
```

### Windows (PowerShell)
```powershell
.\setup.ps1
```

Le script va :
- ✅ Vérifier Node.js et Docker
- ✅ Installer les dépendances npm
- ✅ Créer le fichier .env
- ✅ Démarrer LibreTranslate (Docker)

---

## Installation Manuelle

### 1. Prérequis

#### Node.js 18+
```bash
node --version  # Doit être >= 18
```

Si non installé : https://nodejs.org

#### Docker & Docker Compose
```bash
docker --version
docker compose version
```

Si non installé : https://docs.docker.com/get-docker/

### 2. Cloner le Projet

```bash
git clone <repo-url>
cd moyé
```

### 3. Installer les Dépendances

```bash
npm install
```

### 4. Configuration Supabase

#### A. Créer un Projet Supabase

1. Aller sur https://app.supabase.com
2. Cliquer sur **"New Project"**
3. Remplir :
   - **Name:** MOYÉ
   - **Database Password:** (générer un mot de passe fort)
   - **Region:** Choisir le plus proche
4. Cliquer sur **"Create new project"**
5. Attendre 2-3 minutes

#### B. Configurer la Base de Données

1. Dans le dashboard, aller dans **SQL Editor**
2. Cliquer sur **"New query"**
3. Copier tout le contenu de `supabase/schema.sql`
4. Coller dans l'éditeur
5. Cliquer sur **"Run"**
6. Vérifier qu'il n'y a pas d'erreurs

#### C. Charger les Données de Démonstration (Optionnel)

1. Toujours dans **SQL Editor**
2. Nouvelle requête
3. Copier tout le contenu de `supabase/seed.sql`
4. Coller et exécuter
5. Vérifier : 5 ethnies doivent être créées

#### D. Créer le Bucket Storage

1. Aller dans **Storage**
2. Cliquer sur **"New bucket"**
3. Nom : `moye-media`
4. **Public bucket** : ✅ Cocher
5. Cliquer sur **"Create bucket"**

#### E. Récupérer les Clés API

1. Aller dans **Settings** > **API**
2. Copier :
   - **URL** → Vous en aurez besoin pour `VITE_SUPABASE_URL`
   - **anon public** → Vous en aurez besoin pour `VITE_SUPABASE_ANON_KEY`

### 5. Configuration Gemini AI

1. Aller sur https://makersuite.google.com/app/apikey
2. Se connecter avec un compte Google
3. Cliquer sur **"Create API Key"**
4. Sélectionner un projet Google Cloud (ou en créer un)
5. Copier la clé → Vous en aurez besoin pour `GEMINI_API_KEY`

### 6. Créer le Fichier .env

```bash
cp .env.example .env
```

Éditer `.env` avec vos clés :

```env
NODE_ENV=development
PORT=3000

# Supabase (depuis étape 4.E)
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxxx

# Gemini AI (depuis étape 5)
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# LibreTranslate (local Docker)
LIBRETRANSLATE_URL=http://localhost:5000

# Supabase Storage
SUPABASE_STORAGE_BUCKET=moye-media
```

### 7. Démarrer LibreTranslate

```bash
npm run docker:up
```

Attendre 30-60 secondes que LibreTranslate démarre.

Vérifier : http://localhost:5000 doit répondre

### 8. Lancer le Serveur de Développement

```bash
npm run dev
```

L'application sera accessible sur : **http://localhost:5173**

---

## 🧪 Vérification de l'Installation

### Test 1 : Page d'Accueil
- Ouvrir http://localhost:5173
- Vérifier que le hero "MOYÉ" s'affiche
- Vérifier que les animations fonctionnent

### Test 2 : Carte Culturelle
- Cliquer sur l'onglet "Culture"
- Vérifier que 5 ethnies s'affichent (si seed data chargée)
- Tester les filtres par région

### Test 3 : Scanner
- Cliquer sur l'onglet "Scanner"
- Uploader une image
- Vérifier que l'analyse démarre
- Vérifier le résultat

### Test 4 : Traducteur
- Cliquer sur l'onglet "Traduire"
- Entrer "Bonjour" en français
- Sélectionner "Dioula" comme cible
- Cliquer sur "Traduire"
- Vérifier que la traduction s'affiche

### Test 5 : Académie
- Cliquer sur l'onglet "Académie"
- Vérifier que les modules s'affichent

---

## 🐛 Dépannage

### Erreur : "Missing Supabase environment variables"

**Cause :** Variables d'environnement non configurées

**Solution :**
1. Vérifier que `.env` existe
2. Vérifier que `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont remplis
3. Redémarrer le serveur : `Ctrl+C` puis `npm run dev`

### Erreur : "Translation failed"

**Cause :** LibreTranslate n'est pas démarré

**Solution :**
```bash
# Vérifier que Docker tourne
docker ps

# Si LibreTranslate n'apparaît pas, le démarrer
npm run docker:up

# Attendre 30 secondes puis réessayer
```

### Erreur : "Scanner processing failed"

**Cause :** Clé API Gemini invalide ou quota dépassé

**Solution :**
1. Vérifier que `GEMINI_API_KEY` est correct dans `.env`
2. Vérifier les quotas sur https://makersuite.google.com
3. Régénérer une nouvelle clé si nécessaire

### Erreur : Port 3000 déjà utilisé

**Cause :** Un autre processus utilise le port 3000

**Solution :**
```bash
# Changer le port dans .env
PORT=3001

# Ou tuer le processus sur le port 3000
# Linux/macOS
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Erreur : "Cannot find module"

**Cause :** Dépendances non installées

**Solution :**
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreur : Docker ne démarre pas

**Cause :** Docker Desktop n'est pas lancé

**Solution :**
1. Lancer Docker Desktop
2. Attendre qu'il soit prêt (icône verte)
3. Réessayer `npm run docker:up`

---

## 📱 Installation PWA (Mobile)

### Android (Chrome)
1. Ouvrir l'app sur mobile
2. Menu (⋮) > **"Ajouter à l'écran d'accueil"**
3. Confirmer
4. L'icône MOYÉ apparaît sur l'écran d'accueil

### iOS (Safari)
1. Ouvrir l'app sur mobile
2. Bouton Partager (□↑)
3. **"Sur l'écran d'accueil"**
4. Confirmer

---

## 🚢 Déploiement Production

### Build Local

```bash
npm run build
```

Les fichiers de production seront dans `dist/`

### Docker Compose

```bash
# Build et démarrer
docker compose up -d

# Vérifier les logs
npm run docker:logs

# Arrêter
npm run docker:down
```

L'application sera accessible sur **http://localhost:3000**

---

## 📚 Prochaines Étapes

Après l'installation :

1. **Lire la documentation**
   - `README.md` - Vue d'ensemble
   - `QUICKSTART.md` - Guide rapide
   - `ARCHITECTURE.md` - Architecture technique

2. **Personnaliser**
   - Ajouter vos propres ethnies
   - Uploader des images dans Supabase Storage
   - Créer des modules d'apprentissage

3. **Contribuer**
   - Lire `CONTRIBUTING.md`
   - Ouvrir des issues
   - Soumettre des Pull Requests

---

## 🆘 Besoin d'Aide ?

- 📖 **Documentation :** Voir les fichiers .md à la racine
- 💬 **Issues :** Ouvrir une issue sur GitHub
- 📧 **Contact :** Contacter les mainteneurs

---

**Bon développement avec MOYÉ !** 🌅
