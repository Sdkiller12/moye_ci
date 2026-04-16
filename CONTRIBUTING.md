# 🤝 Guide de Contribution — MOYÉ

Merci de votre intérêt pour contribuer à MOYÉ ! Ce guide vous aidera à démarrer.

## 🎯 Comment contribuer

### Types de contributions acceptées

- 🐛 **Corrections de bugs** : Signaler ou corriger des bugs
- ✨ **Nouvelles fonctionnalités** : Proposer ou implémenter de nouvelles features
- 📝 **Documentation** : Améliorer la documentation
- 🌍 **Traductions** : Ajouter des langues locales
- 🎨 **Design** : Améliorer l'UI/UX
- 📊 **Données culturelles** : Enrichir la base de données

## 🚀 Processus de contribution

### 1. Fork et Clone

```bash
# Fork le repo sur GitHub
# Puis cloner votre fork
git clone https://github.com/VOTRE-USERNAME/moye.git
cd moye
```

### 2. Créer une branche

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
# ou
git checkout -b fix/correction-bug
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Faire vos modifications

- Suivre les conventions de code existantes
- Écrire du code TypeScript typé
- Utiliser TailwindCSS pour le styling
- Tester vos modifications localement

### 5. Commit

```bash
git add .
git commit -m "feat: ajouter traduction en langue Baoulé"
```

**Convention de commit :**
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, CSS
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Maintenance

### 6. Push et Pull Request

```bash
git push origin feature/ma-nouvelle-fonctionnalite
```

Puis créer une Pull Request sur GitHub avec :
- Titre clair et descriptif
- Description détaillée des changements
- Screenshots si changements visuels
- Référence aux issues liées

## 📋 Standards de code

### TypeScript

```typescript
// ✅ Bon
interface Ethnie {
  id: string;
  nom: string;
  region: string;
}

function getEthnie(id: string): Promise<Ethnie> {
  // ...
}

// ❌ Mauvais
function getEthnie(id: any): any {
  // ...
}
```

### React Components

```tsx
// ✅ Bon
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick: () => void;
  children: ReactNode;
}

export function Button({ variant = 'primary', onClick, children }: ButtonProps) {
  return (
    <button className={cn('btn', variant)} onClick={onClick}>
      {children}
    </button>
  );
}

// ❌ Mauvais
export function Button(props: any) {
  return <button {...props} />;
}
```

### Styling

```tsx
// ✅ Bon - Utiliser TailwindCSS
<div className="flex items-center gap-4 p-4 rounded-lg bg-primary">

// ❌ Mauvais - Éviter le CSS inline
<div style={{ display: 'flex', padding: '16px' }}>
```

## 🌍 Ajouter une nouvelle ethnie

### 1. Données SQL

Créer un fichier `supabase/migrations/add-ethnie-xxx.sql` :

```sql
INSERT INTO ethnies (nom, region, description, histoire, carte_coords, tags)
VALUES (
  'Nom Ethnie',
  'Région',
  'Description...',
  'Histoire...',
  '{"lat": 0.0, "lng": 0.0}',
  ARRAY['tag1', 'tag2']
);

-- Ajouter langue, rites, objets culturels, gastronomie
```

### 2. Images

- Ajouter les images dans le bucket Supabase Storage `moye-media`
- Utiliser des images libres de droits
- Format : JPG/PNG, max 2MB
- Nommer : `ethnie-nom-type.jpg`

### 3. Documentation

Mettre à jour `README.md` avec la nouvelle ethnie dans la liste.

## 🐛 Signaler un bug

Créer une issue avec :

**Titre :** Description courte du bug

**Description :**
- Comportement attendu
- Comportement actuel
- Étapes pour reproduire
- Screenshots si applicable
- Environnement (OS, navigateur, version)

## 💡 Proposer une fonctionnalité

Créer une issue avec :

**Titre :** [Feature] Nom de la fonctionnalité

**Description :**
- Problème à résoudre
- Solution proposée
- Alternatives considérées
- Mockups/wireframes si applicable

## 🧪 Tests

Avant de soumettre une PR :

```bash
# Vérifier les types TypeScript
npm run type-check

# Tester l'application
npm run dev
```

Tester manuellement :
- [ ] Scanner fonctionne
- [ ] Traducteur fonctionne
- [ ] Navigation entre pages
- [ ] Responsive mobile
- [ ] Mode sombre

## 📝 Documentation

Si vous ajoutez une nouvelle fonctionnalité :

1. Mettre à jour `README.md`
2. Ajouter des commentaires dans le code
3. Créer des exemples d'utilisation
4. Mettre à jour `QUICKSTART.md` si nécessaire

## 🎨 Design Guidelines

### Couleurs

- **Primary** : `#C8953A` (or chaud)
- **Secondary** : `#2D5016` (vert forêt)
- **Accent** : `#E8F4E8` (menthe)

### Typographie

- **Titres** : Philosopher (Google Fonts)
- **Corps** : Inter (Google Fonts)

### Accessibilité

- Tous les boutons : min 44px × 44px
- Contraste texte : WCAG AA minimum
- Images : toujours avec `aria-label` en français
- Navigation clavier supportée

## 🌟 Bonnes pratiques

### Performance

- Lazy load des images
- Optimiser les requêtes Supabase
- Utiliser React.memo pour composants lourds
- Debounce les appels API

### Sécurité

- Ne jamais commit de clés API
- Valider toutes les entrées utilisateur
- Utiliser Zod pour validation
- Sanitizer les données avant affichage

### Mobile-First

- Toujours tester sur mobile d'abord
- Utiliser les breakpoints Tailwind
- Touch targets ≥ 44px
- Tester sur iOS Safari

## 📞 Besoin d'aide ?

- 💬 Ouvrir une discussion sur GitHub
- 📧 Contacter les mainteneurs
- 📖 Consulter la documentation

## 🙏 Remerciements

Toutes les contributions sont appréciées ! Merci de participer à la préservation du patrimoine culturel ivoirien.

---

**Code of Conduct :** Soyez respectueux, inclusif et constructif dans toutes vos interactions.
