-- Créer la table user_missions
CREATE TABLE user_missions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    mission_id VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    user_notes TEXT,
    unlock_missions TEXT[], -- Array of mission IDs that this mission unlocks
    steps JSONB, -- Array of steps with completion status
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer un index sur user_id pour optimiser les requêtes
CREATE INDEX idx_user_missions_user_id ON user_missions(user_id);

-- Créer un index sur mission_id pour optimiser les requêtes
CREATE INDEX idx_user_missions_mission_id ON user_missions(mission_id);

-- Créer un index sur status pour optimiser les requêtes de filtrage
CREATE INDEX idx_user_missions_status ON user_missions(status);

-- Créer un index composite pour éviter les doublons
CREATE UNIQUE INDEX idx_user_missions_unique ON user_missions(user_id, mission_id);

-- Activer Row Level Security (RLS)
ALTER TABLE user_missions ENABLE ROW LEVEL SECURITY;

-- Créer les politiques RLS
-- Les utilisateurs peuvent voir leurs propres missions
CREATE POLICY "Users can view own missions" ON user_missions
    FOR SELECT USING (auth.uid() = user_id);

-- Les utilisateurs peuvent insérer leurs propres missions
CREATE POLICY "Users can insert own missions" ON user_missions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent modifier leurs propres missions
CREATE POLICY "Users can update own missions" ON user_missions
    FOR UPDATE USING (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer leurs propres missions
CREATE POLICY "Users can delete own missions" ON user_missions
    FOR DELETE USING (auth.uid() = user_id);

-- Créer une fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Créer le trigger pour mettre à jour updated_at
CREATE TRIGGER update_user_missions_updated_at BEFORE UPDATE ON user_missions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Créer une table pour stocker les XP et niveaux des utilisateurs
CREATE TABLE user_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    total_xp INTEGER DEFAULT 0,
    current_level INTEGER DEFAULT 1,
    missions_completed INTEGER DEFAULT 0,
    missions_in_progress INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer un index sur user_id pour user_stats
CREATE INDEX idx_user_stats_user_id ON user_stats(user_id);

-- Activer RLS pour user_stats
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Créer les politiques RLS pour user_stats
CREATE POLICY "Users can view own stats" ON user_stats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON user_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON user_stats
    FOR UPDATE USING (auth.uid() = user_id);

-- Créer le trigger pour mettre à jour updated_at sur user_stats
CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Créer une fonction pour calculer le niveau basé sur l'XP
CREATE OR REPLACE FUNCTION calculate_level(xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
    -- Chaque niveau nécessite 1000 XP de plus que le précédent
    -- Niveau 1: 0-999 XP, Niveau 2: 1000-2999 XP, etc.
    RETURN FLOOR(xp / 1000) + 1;
END;
$$ language 'plpgsql';

-- Créer une fonction pour mettre à jour les stats utilisateur
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
DECLARE
    user_xp INTEGER;
    user_level INTEGER;
    completed_count INTEGER;
    in_progress_count INTEGER;
BEGIN
    -- Calculer l'XP total basé sur les missions complétées
    SELECT COALESCE(SUM(
        CASE 
            WHEN NEW.status = 'completed' THEN 
                CASE 
                    WHEN mission_id LIKE '%beginner%' THEN 100
                    WHEN mission_id LIKE '%intermediate%' THEN 200
                    ELSE 300
                END
            ELSE 0
        END
    ), 0) INTO user_xp
    FROM user_missions 
    WHERE user_id = NEW.user_id AND status = 'completed';
    
    -- Calculer le niveau
    user_level := calculate_level(user_xp);
    
    -- Compter les missions complétées
    SELECT COUNT(*) INTO completed_count
    FROM user_missions 
    WHERE user_id = NEW.user_id AND status = 'completed';
    
    -- Compter les missions en cours
    SELECT COUNT(*) INTO in_progress_count
    FROM user_missions 
    WHERE user_id = NEW.user_id AND status = 'in_progress';
    
    -- Insérer ou mettre à jour les stats
    INSERT INTO user_stats (user_id, total_xp, current_level, missions_completed, missions_in_progress)
    VALUES (NEW.user_id, user_xp, user_level, completed_count, in_progress_count)
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        total_xp = user_xp,
        current_level = user_level,
        missions_completed = completed_count,
        missions_in_progress = in_progress_count,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Créer le trigger pour mettre à jour les stats automatiquement
CREATE TRIGGER update_user_stats_trigger 
    AFTER INSERT OR UPDATE ON user_missions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_user_stats();

-- Créer la table des profils utilisateurs
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    dj_name TEXT,
    bio TEXT,
    location TEXT,
    website TEXT,
    instagram TEXT,
    tiktok TEXT,
    spotify TEXT,
    soundcloud TEXT,
    beatport TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer un index sur le nom DJ pour les recherches
CREATE INDEX idx_profiles_dj_name ON profiles(dj_name);

-- Activer Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Créer les politiques RLS
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Créer le trigger pour mettre à jour updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Créer une fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger pour créer automatiquement un profil
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insérer quelques données de test pour l'utilisateur de démo
-- (À exécuter après avoir créé le compte demo@djtour.com)
-- INSERT INTO user_missions (user_id, mission_id, completed, completed_at)
-- VALUES 
--     ('USER_ID_HERE', 1, true, NOW() - INTERVAL '2 days'),
--     ('USER_ID_HERE', 2, true, NOW() - INTERVAL '1 day'),
--     ('USER_ID_HERE', 3, false, NULL);

-- Créer une vue pour les statistiques utilisateur
CREATE OR REPLACE VIEW user_mission_stats AS
SELECT 
    user_id,
    COUNT(*) as total_missions,
    COUNT(CASE WHEN completed = true THEN 1 END) as completed_missions,
    COUNT(CASE WHEN completed = false THEN 1 END) as pending_missions,
    ROUND(
        (COUNT(CASE WHEN completed = true THEN 1 END)::decimal / COUNT(*)::decimal) * 100, 
        2
    ) as completion_percentage
FROM user_missions
GROUP BY user_id;

-- Activer RLS sur la vue
ALTER VIEW user_mission_stats ENABLE ROW LEVEL SECURITY;

-- Politique RLS pour la vue des statistiques
CREATE POLICY "Users can view own stats" ON user_mission_stats
    FOR SELECT USING (auth.uid() = user_id); 

-- Table pour les statistiques du DJ
create table public.stats (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  spotify_listeners integer not null,
  instagram_followers integer not null,
  tiktok_followers integer not null,
  gigs_played integer not null,
  revenue decimal,
  motivation integer not null check (motivation between 1 and 10),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS pour la table stats
alter table public.stats enable row level security;

create policy "Users can view their own stats"
  on public.stats for select
  using (auth.uid() = user_id);

create policy "Users can insert their own stats"
  on public.stats for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own stats"
  on public.stats for update
  using (auth.uid() = user_id);

create policy "Users can delete their own stats"
  on public.stats for delete
  using (auth.uid() = user_id);

-- Index pour améliorer les performances des requêtes
create index stats_user_id_date_idx on public.stats(user_id, date desc); 