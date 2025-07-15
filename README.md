# DJ Tour - Build your DJ career with gamified missions

Un site web pour les DJs qui veulent développer leur carrière avec 100 missions gamifiées. Booste tes bookings, ta visibilité et tes revenus étape par étape.

## 🎯 Fonctionnalités

- **100 missions gamifiées** réparties en 4 catégories :
  - 🎤 **Booking** : Décrocher des contrats et développer son réseau
  - 📈 **Visibilité** : Construire sa présence en ligne et sa marque
  - 💰 **Revenus** : Monétiser son talent et diversifier ses sources de revenus
  - 🎛️ **Compétences** : Perfectionner ses techniques de DJ

- **Système d'authentification** avec email/mot de passe
- **Dashboard personnalisé** avec progression et statistiques
- **Système de points et niveaux** pour gamifier l'expérience
- **Suivi des missions** avec checklist interactive
- **Design moderne** avec animations fluides
- **Responsive** pour tous les appareils

## 🚀 Tech Stack

- **Frontend** : Next.js 14, React, TypeScript
- **Styling** : TailwindCSS
- **Animations** : Framer Motion
- **Backend** : Supabase (Auth + Database)
- **Icons** : Lucide React
- **Deployment** : Vercel (recommandé)

## 📦 Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd dj-tour
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer Supabase**
   - Créer un compte sur [Supabase](https://supabase.com)
   - Créer un nouveau projet
   - Aller dans Settings > API pour récupérer :
     - `Project URL`
     - `Project API Key (anon, public)`

4. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```

Éditer `.env.local` avec tes clés Supabase :
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

5. **Configurer la base de données**
   - Aller dans l'éditeur SQL de Supabase
   - Exécuter le contenu du fichier `supabase-setup.sql`

6. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🗄️ Structure de la base de données

### Table `user_missions`
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key vers auth.users)
- mission_id (INTEGER, référence aux missions)
- completed (BOOLEAN, défaut: false)
- completed_at (TIMESTAMP, nullable)
- created_at (TIMESTAMP, défaut: NOW())
- updated_at (TIMESTAMP, défaut: NOW())
```

### Sécurité
- **Row Level Security (RLS)** activé
- Les utilisateurs ne peuvent voir que leurs propres missions
- Politiques de sécurité pour SELECT, INSERT, UPDATE, DELETE

## 🎮 Comment ça marche

1. **Inscription/Connexion** : Créer un compte ou se connecter
2. **Dashboard** : Voir sa progression globale et par catégorie
3. **Missions** : Parcourir les 100 missions disponibles
4. **Checklist** : Compléter les étapes de chaque mission
5. **Validation** : Marquer les missions comme terminées
6. **Progression** : Gagner des points et monter de niveau

## 🎨 Design

Le design s'inspire de l'esthétique moderne avec :
- **Dégradés** purple/blue/indigo pour l'ambiance nocturne
- **Glassmorphism** avec des effets de transparence
- **Animations fluides** avec Framer Motion
- **Cartes interactives** avec hover effects
- **Système de couleurs** par catégorie

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connecter le repo GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Netlify
1. Build command: `npm run build`
2. Publish directory: `out`
3. Configurer les variables d'environnement

## 📱 Responsive Design

Le site est entièrement responsive avec :
- **Mobile First** approach
- **Breakpoints** : sm, md, lg, xl
- **Navigation adaptative**
- **Grilles flexibles**

## 🎯 Missions par catégorie

### Booking (25 missions)
- Créer son EPK
- Identifier les venues
- Négocier ses cachets
- Développer son réseau
- Organiser ses événements

### Visibilité (25 missions)
- Optimiser ses réseaux sociaux
- Créer du contenu vidéo
- Développer sa marque
- Référencement local
- Relations presse

### Revenus (25 missions)
- Vendre ses productions
- Créer des cours
- Merchandising
- Streaming revenue
- Collaborations payantes

### Compétences (25 missions)
- Techniques de mix
- Nouveaux genres musicaux
- Production musicale
- Performance live
- Équipement professionnel

## 🔧 Développement

### Scripts disponibles
```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run start      # Serveur de production
npm run lint       # Linting du code
```

### Structure des fichiers
```
src/
├── app/                 # Pages Next.js 14 (App Router)
├── components/          # Composants réutilisables
├── contexts/           # Contextes React (Auth)
├── data/               # Données statiques (missions)
├── lib/                # Utilitaires (Supabase config)
├── types/              # Types TypeScript
└── styles/             # Styles globaux
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🎵 Compte de démonstration

Pour tester l'application :
- **Email** : demo@djtour.com
- **Mot de passe** : demo123

## 🐛 Bugs connus

- [ ] Les couleurs dynamiques Tailwind peuvent ne pas s'afficher correctement
- [ ] Optimisation des images à implémenter
- [ ] PWA à configurer pour l'expérience mobile

## 🚀 Roadmap

- [ ] Système de notifications
- [ ] Partage social des accomplissements
- [ ] Classements entre utilisateurs
- [ ] Missions personnalisées
- [ ] Intégration Stripe pour la monétisation
- [ ] Application mobile React Native
- [ ] Mode hors ligne avec PWA

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Email : support@djtour.com

---

**Fait avec ❤️ pour la communauté DJ**
