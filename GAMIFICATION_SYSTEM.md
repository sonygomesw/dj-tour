# 🎮 Système de Gamification DJ Tour

## Vue d'ensemble

Le système de gamification DJ Tour transforme l'apprentissage du DJing en une expérience engageante et progressive. Les utilisateurs peuvent suivre des missions, gagner de l'XP, monter de niveau et débloquer de nouveaux contenus.

## ✨ Fonctionnalités

### 🎯 Missions
- **100 missions** organisées en 5 catégories
- **Système de progression** avec étapes à cocher
- **Statuts dynamiques** : Non commencée, En cours, Terminée
- **Difficulté progressive** : Débutant, Intermédiaire, Avancé
- **Récompenses** : XP, badges, déverrouillage de nouvelles missions

### 📊 Progression
- **Système d'XP** avec calcul automatique
- **Niveaux** basés sur l'XP accumulé
- **Statistiques** en temps réel
- **Barres de progression** visuelles

### 🎨 Interface
- **Modal détaillé** pour chaque mission
- **Side panel** interactif pour les missions en cours
- **Animations de succès** avec célébration
- **Badges de statut** visuels
- **Mode sombre/clair** compatible

## 🏗️ Architecture

### Base de données (Supabase)

#### Table `user_missions`
```sql
- id (UUID) - Identifiant unique
- user_id (UUID) - Référence vers l'utilisateur
- mission_id (VARCHAR) - Identifiant de la mission
- status (VARCHAR) - Statut : 'not_started', 'in_progress', 'completed'
- progress (INTEGER) - Progression 0-100%
- completed (BOOLEAN) - Mission terminée
- completed_at (TIMESTAMP) - Date de completion
- started_at (TIMESTAMP) - Date de début
- user_notes (TEXT) - Notes personnelles
- unlock_missions (TEXT[]) - Missions débloquées
- steps (JSONB) - Étapes avec statut
- created_at/updated_at (TIMESTAMP) - Métadonnées
```

#### Table `user_stats`
```sql
- id (UUID) - Identifiant unique
- user_id (UUID) - Référence vers l'utilisateur
- total_xp (INTEGER) - XP total
- current_level (INTEGER) - Niveau actuel
- missions_completed (INTEGER) - Missions terminées
- missions_in_progress (INTEGER) - Missions en cours
- created_at/updated_at (TIMESTAMP) - Métadonnées
```

### Composants React

#### Contexte Principal
- **`MissionContext`** : Gestion globale de l'état des missions
- **`useMissions`** : Hook pour accéder aux fonctions de mission

#### Composants UI
- **`MissionModal`** : Modal détaillé pour présenter une mission
- **`MissionSidePanel`** : Panneau latéral pour les missions en cours
- **`MissionSuccess`** : Animation de célébration de réussite
- **`MissionProgress`** : Affichage compact des missions en cours

## 🚀 Installation

### 1. Base de données
```bash
# Exécuter le script SQL dans Supabase
psql -h your-host -U your-user -d your-db -f create-mission-tables.sql
```

### 2. Variables d'environnement
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Dépendances
```bash
npm install @supabase/supabase-js framer-motion lucide-react
```

## 📖 Utilisation

### Démarrer une mission
```typescript
const { startMission } = useMissions()

const handleStartMission = async (missionId: string) => {
  await startMission(missionId)
  // La mission passe automatiquement en statut "in_progress"
}
```

### Mettre à jour la progression
```typescript
const { updateMissionProgress } = useMissions()

const handleStepComplete = async (missionId: string, progress: number) => {
  await updateMissionProgress(missionId, progress)
  // Met à jour la barre de progression
}
```

### Terminer une mission
```typescript
const { completeMission } = useMissions()

const handleComplete = async (missionId: string) => {
  await completeMission(missionId)
  // Déclenche l'animation de succès et calcule l'XP
}
```

### Récupérer les statistiques
```typescript
const { userStats, getInProgressMissions } = useMissions()

// Statistiques globales
console.log(userStats?.total_xp, userStats?.current_level)

// Missions en cours
const activeMissions = getInProgressMissions()
```

## 🎯 Flux utilisateur

### 1. Découverte des missions
- L'utilisateur navigue sur la page `/missions`
- Il voit toutes les missions organisées par catégorie
- Les filtres permettent de trier par difficulté/catégorie

### 2. Démarrage d'une mission
- Clic sur une mission → Modal avec détails
- Bouton "Commencer la mission" → Statut passe à "En cours"
- Ouverture automatique du side panel

### 3. Progression
- Side panel avec liste des étapes
- Checkbox pour chaque étape terminée
- Barre de progression mise à jour en temps réel
- Possibilité d'ajouter des notes personnelles

### 4. Completion
- Toutes les étapes cochées → Bouton "Valider" actif
- Clic sur "Valider" → Animation de succès
- Calcul automatique de l'XP et mise à jour du niveau
- Déverrouillage de nouvelles missions

## 🎨 Personnalisation

### Thèmes
Le système supporte automatiquement les modes clair/sombre via `ThemeContext`.

### Animations
Toutes les animations utilisent `framer-motion` et peuvent être personnalisées :
```typescript
// Exemple d'animation personnalisée
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>
  {/* Contenu */}
</motion.div>
```

### Couleurs par catégorie
```typescript
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Booking': return 'violet'
    case 'Content': return 'blue'
    case 'Visibility': return 'green'
    case 'Preparation': return 'orange'
    case 'Networking': return 'purple'
  }
}
```

## 🔧 Configuration avancée

### Système de niveaux
```typescript
// Fonction de calcul du niveau (modifiable)
const calculateLevel = (xp: number) => {
  return Math.floor(xp / 1000) + 1
}
```

### Points par difficulté
```typescript
const getPointsByDifficulty = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 100
    case 'intermediate': return 200
    case 'advanced': return 300
    default: return 150
  }
}
```

### Déverrouillage de missions
```typescript
// Dans les données de mission
{
  id: 'social-setup',
  // ... autres propriétés
  rewards: {
    xp: 100,
    unlockMissions: ['spotify-setup', 'competitor-analysis']
  }
}
```

## 📊 Métriques et Analytics

### Suivi des performances
```typescript
// Événements à tracker
- mission_started
- mission_completed
- level_up
- step_completed
- time_spent_on_mission
```

### Tableaux de bord
```typescript
// Métriques utiles
- Taux de completion par mission
- Temps moyen par mission
- Missions les plus populaires
- Progression par utilisateur
```

## 🐛 Dépannage

### Problèmes courants

1. **Missions qui ne se mettent pas à jour**
   - Vérifier la connexion Supabase
   - Vérifier les politiques RLS
   - Vérifier l'authentification utilisateur

2. **Animations qui ne fonctionnent pas**
   - Vérifier l'installation de `framer-motion`
   - Vérifier les conflits CSS

3. **Calcul XP incorrect**
   - Vérifier les triggers PostgreSQL
   - Vérifier les données de mission

### Logs de débogage
```typescript
// Activer les logs détaillés
const { refreshData } = useMissions()

useEffect(() => {
  console.log('Mission state:', { userMissions, userStats })
}, [userMissions, userStats])
```

## 🚀 Prochaines fonctionnalités

### En développement
- [ ] Système de badges avancé
- [ ] Missions collaboratives
- [ ] Leaderboard global
- [ ] Notifications push
- [ ] Intégration calendrier
- [ ] Système de mentoring

### Améliorations prévues
- [ ] Mode hors ligne
- [ ] Export de progression
- [ ] Intégrations tierces (Spotify, etc.)
- [ ] Système de récompenses physiques
- [ ] Gamification des revenus

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Consulter la documentation Supabase
- Vérifier les logs de la console navigateur

---

**Développé avec ❤️ pour la communauté DJ** 