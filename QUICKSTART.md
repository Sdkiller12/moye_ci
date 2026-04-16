# 🚀 Guide de Démarrage Rapide — MOYÉ

## Installation en 5 minutes

### 1. Prérequis
```bash
# Vérifier Node.js (18+)
node --version

# Vérifier Docker
docker --version
```

### 2. Cloner et installer
```bash
git clone <repo-url>
cd moyé
npm install
```

### 3. Configuration Supabase

#### A. Créer un projet Supabase
1. Aller sur https://app.supabase.com
2. Cliquer sur "New Project"
3. Remplir les informations du projet
4. Attendre la création (2-3 minutes)

#### B. Configurer la base de données
1. Dans le dashboard Supabase, aller dans **SQL Editor**
2. Copier le contenu de `supabase/schema.sql`
3. Coller et exécuter le script
4. Optionnel : Exécuter `supabase/seed.sql` pour les données de démo

#### C. Créer le bucket Storage
1. Aller dans **Storage**
2. Créer un nouveau bucket nommé `moye-media`
3. Le rendre **public**

#### D. Récupérer les clés API
1. Aller dans **Settings > API**
2. Copier :
   - `URL` → `VITE_SUPABASE_URL`
   - `anon public` → `VITE_SUPABASE_ANON_KEY`

### 4. Configuration Gemini AI

1. Aller sur https://makersuite.google.com/app/apikey
2. Cliquer sur "Create API Key"
3. Copier la clé → `GEMINI_API_KEY`

### 5. Créer le fichier .env

```bash
cp .env.example .env
```

Éditer `.env` avec vos clés :
```env
NODE_ENV=development
PORT=3000

VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

GEMINI_API_KEY=AIzaSy...

LIBRETRANSLATE_URL=http://localhost:5000
SUPABASE_STORAGE_BUCKET=moye-media
```

### 6. Démarrer l'application

#### Terminal 1 : LibreTranslate (Docker)
```bash
npm run docker:up
```

Attendre que LibreTranslate soit prêt (30-60 secondes)

#### Terminal 2 : Serveur de développement
```bash
npm run dev
```

### 7. Ouvrir l'application

Naviguer vers : **http://localhost:5173**

---

## 🎯 Vérification

### Tester le Scanner
1. Aller sur l'onglet "Scanner"
2. Uploader une image d'objet culturel
3. Vérifier que l'IA analyse l'image

### Tester le Traducteur
1. Aller sur l'onglet "Traduire"
2. Entrer du texte en français
3. Sélectionner "Dioula" comme langue cible
4. Cliquer sur "Traduire"

### Tester la Carte Culturelle
1. Aller sur l'onglet "Culture"
2. Vérifier que les 5 ethnies s'affichent
3. Filtrer par région

---

## 🐛 Dépannage

### Erreur : "Missing Supabase environment variables"
→ Vérifier que `.env` contient `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`

### Erreur : "Translation failed"
→ Vérifier que LibreTranslate est démarré : `docker ps`

### Erreur : "Scanner processing failed"
→ Vérifier que `GEMINI_API_KEY` est valide

### Port 3000 déjà utilisé
→ Changer `PORT=3001` dans `.env`

---

## 📱 Tester en tant que PWA

### Chrome Desktop
1. Ouvrir DevTools (F12)
2. Aller dans "Application" > "Service Workers"
3. Vérifier que le SW est enregistré

### Chrome Mobile
1. Ouvrir l'app sur mobile
2. Menu > "Ajouter à l'écran d'accueil"
3. Tester le mode hors-ligne

---

## 🚢 Déploiement Production

### Build
```bash
npm run build
```

### Docker Compose
```bash
docker compose up -d
```

L'application sera accessible sur **http://localhost:3000**

---

## 📚 Prochaines étapes

- [ ] Ajouter plus d'ethnies dans Supabase
- [ ] Uploader des images dans le bucket Storage
- [ ] Créer des modules d'apprentissage personnalisés
- [ ] Configurer l'authentification email (SMTP)
- [ ] Implémenter le chat Palaver en temps réel

---

**Besoin d'aide ?** Consultez le README.md complet ou ouvrez une issue.
