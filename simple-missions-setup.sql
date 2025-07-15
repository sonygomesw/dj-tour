-- Simple missions system for DJ Tour
-- Coller ce code dans l'éditeur SQL de Supabase

-- 1. Table simple pour les missions complétées
CREATE TABLE IF NOT EXISTS completed_missions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  mission_id text NOT NULL,
  completed_at timestamp DEFAULT now(),
  UNIQUE(user_id, mission_id)
);

-- 2. Politique de sécurité (RLS)
ALTER TABLE completed_missions ENABLE ROW LEVEL SECURITY;

-- 3. Politique : les utilisateurs peuvent voir/modifier leurs propres missions
CREATE POLICY "Users can manage their own completed missions" ON completed_missions
  FOR ALL USING (auth.uid() = user_id);

-- 4. Index pour les performances
CREATE INDEX IF NOT EXISTS idx_completed_missions_user_id ON completed_missions(user_id);
CREATE INDEX IF NOT EXISTS idx_completed_missions_mission_id ON completed_missions(mission_id);

-- 5. Fonction pour obtenir les statistiques utilisateur
CREATE OR REPLACE FUNCTION get_user_mission_stats(user_uuid uuid)
RETURNS TABLE (
  total_completed bigint,
  total_xp bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::bigint as total_completed,
    -- Calcul simple des XP (100 par mission pour l'exemple)
    (COUNT(*) * 100)::bigint as total_xp
  FROM completed_missions 
  WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Créer un utilisateur de test (optionnel)
-- Remplacez 'your-email@example.com' par votre email
-- INSERT INTO auth.users (id, email, created_at, updated_at)
-- VALUES (gen_random_uuid(), 'your-email@example.com', now(), now())
-- ON CONFLICT (email) DO NOTHING;

-- Terminé ! Système ultra-simple prêt à l'emploi 🚀 