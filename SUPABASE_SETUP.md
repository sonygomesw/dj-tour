# Configuration Supabase pour DJ Tour

Ce guide détaille les étapes pour configurer Supabase pour le projet DJ Tour.

## 1. Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un compte ou se connecter
3. Cliquer sur "New Project"
4. Choisir une organisation
5. Donner un nom au projet (ex: "dj-tour")
6. Choisir un mot de passe pour la base de données
7. Sélectionner une région proche de vos utilisateurs
8. Cliquer sur "Create new project"

## 2. Récupérer les clés API

1. Dans le dashboard Supabase, aller dans **Settings** > **API**
2. Copier les valeurs suivantes :
   - **Project URL** : `https://your-project-id.supabase.co`
   - **Project API Key (anon, public)** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 3. Configurer les variables d'environnement

1. Créer un fichier `.env.local` à la racine du projet :
```bash
cp .env.example .env.local
```

2. Éditer `.env.local` avec vos vraies valeurs :
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 4. Configurer la base de données

1. Dans le dashboard Supabase, aller dans **SQL Editor**
2. Créer une nouvelle query
3. Copier-coller le contenu du fichier `supabase-setup.sql`
4. Exécuter la query (bouton "RUN")

## 5. Configurer l'authentification

1. Dans le dashboard Supabase, aller dans **Authentication** > **Settings**
2. Dans la section **Site URL**, ajouter :
   - Development: `http://localhost:3000`
   - Production: `https://your-domain.com`
3. Dans **Redirect URLs**, ajouter :
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://your-domain.com/auth/callback`

## 6. Créer un utilisateur de test

1. Aller dans **Authentication** > **Users**
2. Cliquer sur "Add user"
3. Créer l'utilisateur de démo :
   - Email: `demo@djtour.com`
   - Password: `demo123`
   - Confirm password: `demo123`
4. Cliquer sur "Create user"

## 7. Ajouter des données de test (optionnel)

1. Dans **SQL Editor**, exécuter cette query pour ajouter des missions complétées au compte de démo :

```sql
-- Récupérer l'ID de l'utilisateur de démo
SELECT id FROM auth.users WHERE email = 'demo@djtour.com';

-- Remplacer USER_ID_HERE par l'ID récupéré ci-dessus
INSERT INTO user_missions (user_id, mission_id, completed, completed_at)
VALUES 
    ('USER_ID_HERE', 1, true, NOW() - INTERVAL '5 days'),
    ('USER_ID_HERE', 2, true, NOW() - INTERVAL '3 days'),
    ('USER_ID_HERE', 3, true, NOW() - INTERVAL '1 day'),
    ('USER_ID_HERE', 26, true, NOW() - INTERVAL '2 days'),
    ('USER_ID_HERE', 51, false, NULL);
```

## 8. Tester la configuration

1. Lancer le serveur de développement :
```bash
npm run dev
```

2. Aller sur `http://localhost:3000`
3. Cliquer sur "Sign in"
4. Se connecter avec `demo@djtour.com` / `demo123`
5. Vérifier que le dashboard affiche les bonnes statistiques

## 9. Sécurité et production

### Row Level Security (RLS)
Les politiques RLS sont déjà configurées dans le script SQL pour :
- Empêcher les utilisateurs de voir les missions des autres
- Permettre uniquement la modification de ses propres données

### Variables d'environnement en production
Pour le déploiement (Vercel, Netlify, etc.), configurer les variables :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Backup
Configurer des sauvegardes automatiques dans **Settings** > **Database** > **Backups**

## 10. Monitoring et logs

1. **Logs** : Consultables dans **Logs** > **API Logs**
2. **Métriques** : Disponibles dans **Reports**
3. **Alertes** : Configurables dans **Settings** > **Alerts**

## Dépannage

### Erreur "supabaseUrl is required"
- Vérifier que les variables d'environnement sont correctement définies
- Redémarrer le serveur de développement après modification du `.env.local`

### Erreur d'authentification
- Vérifier les URLs de redirection dans les paramètres d'authentification
- S'assurer que l'utilisateur est confirmé (pas de vérification email en dev)

### Erreur de base de données
- Vérifier que les tables sont créées avec le script SQL
- Contrôler les politiques RLS dans **Authentication** > **Policies**

### Performance
- Vérifier les index dans **Database** > **Indexes**
- Monitorer les requêtes lentes dans **Logs** > **API Logs**

## Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Guide d'authentification](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs) 