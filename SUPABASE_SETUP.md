# Configuration Supabase CLI - Guide Complet

## 1. Installation du CLI

### Windows (choisis une méthode)

**Via Scoop (recommandé):**
```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

**Via npm:**
```bash
npm install -g supabase
```

## 2. Initialisation du projet local

```bash
# Initialise Supabase dans ton projet
supabase init

# Cela va créer un dossier supabase/ avec:
# - config.toml (configuration)
# - migrations/ (pour les migrations de base de données)
```

## 3. Lier ton projet Supabase existant

```bash
# Login à Supabase
supabase login

# Lier ton projet (tu auras besoin de ton Project ID)
supabase link --project-ref <ton-project-id>
```

**Pour trouver ton Project ID:**
- Va sur https://app.supabase.com
- Sélectionne ton projet
- Settings > General > Reference ID

## 4. Appliquer ton schéma existant

Tu as déjà un fichier `supabase/schema.sql`. Pour l'appliquer:

```bash
# Créer une migration depuis ton schéma existant
supabase db diff --file initial_schema --use-migra

# Ou appliquer directement ton schema.sql
supabase db push
```

## 5. Commandes utiles

### Développement local
```bash
# Démarrer Supabase localement (Docker requis)
supabase start

# Arrêter
supabase stop

# Reset la base de données locale
supabase db reset
```

### Migrations
```bash
# Créer une nouvelle migration
supabase migration new <nom_migration>

# Appliquer les migrations
supabase db push

# Voir le statut des migrations
supabase migration list
```

### Base de données
```bash
# Générer les types TypeScript depuis ta DB
supabase gen types typescript --local > src/types/supabase.ts

# Voir les différences entre local et remote
supabase db diff

# Exécuter du SQL
supabase db execute --file supabase/schema.sql
```

### Seed data
```bash
# Appliquer les données de test
supabase db seed
```

## 6. Configuration des variables d'environnement

Après `supabase start`, tu obtiendras des URLs locales:

```env
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=<clé-générée>
```

## 7. Workflow recommandé

1. **Développement local:**
   ```bash
   supabase start
   npm run dev
   ```

2. **Créer des changements de schéma:**
   ```bash
   supabase migration new add_new_table
   # Édite le fichier de migration créé
   supabase db reset  # Applique localement
   ```

3. **Déployer en production:**
   ```bash
   supabase db push  # Pousse vers ton projet Supabase
   ```

## 8. Troubleshooting

### Docker requis
Le CLI Supabase nécessite Docker pour le développement local:
- Installe Docker Desktop: https://www.docker.com/products/docker-desktop

### Erreur de connexion
```bash
# Vérifie ton login
supabase projects list

# Re-login si nécessaire
supabase login
```

### Port déjà utilisé
```bash
# Change les ports dans supabase/config.toml
# Ou arrête les services conflictuels
```

## 9. Ressources

- Documentation: https://supabase.com/docs/guides/cli
- GitHub: https://github.com/supabase/cli
- Discord: https://discord.supabase.com
