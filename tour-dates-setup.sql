-- Tour dates system for DJ Tour
-- Coller ce code dans l'éditeur SQL de Supabase

-- 1. Table pour les dates de tournée
CREATE TABLE IF NOT EXISTS tour_dates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  club_name text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  event_date date NOT NULL,
  start_time time,
  end_time time,
  fee numeric(10,2), -- Cachet en euros
  genre text,
  status text DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
  capacity integer,
  notes text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 2. Politique de sécurité (RLS)
ALTER TABLE tour_dates ENABLE ROW LEVEL SECURITY;

-- 3. Politique : les utilisateurs peuvent voir/modifier leurs propres dates
CREATE POLICY "Users can manage their own tour dates" ON tour_dates
  FOR ALL USING (auth.uid() = user_id);

-- 4. Index pour les performances
CREATE INDEX IF NOT EXISTS idx_tour_dates_user_id ON tour_dates(user_id);
CREATE INDEX IF NOT EXISTS idx_tour_dates_event_date ON tour_dates(event_date);
CREATE INDEX IF NOT EXISTS idx_tour_dates_status ON tour_dates(status);

-- 5. Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Trigger pour mettre à jour updated_at
CREATE TRIGGER update_tour_dates_updated_at
  BEFORE UPDATE ON tour_dates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Fonction pour obtenir les statistiques de tournée
CREATE OR REPLACE FUNCTION get_tour_stats(user_uuid uuid)
RETURNS TABLE (
  total_dates bigint,
  confirmed_dates bigint,
  pending_dates bigint,
  total_revenue numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::bigint as total_dates,
    COUNT(CASE WHEN status = 'confirmed' THEN 1 END)::bigint as confirmed_dates,
    COUNT(CASE WHEN status = 'pending' THEN 1 END)::bigint as pending_dates,
    COALESCE(SUM(CASE WHEN status = 'confirmed' THEN fee ELSE 0 END), 0) as total_revenue
  FROM tour_dates 
  WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Terminé ! Système de dates de tournée prêt 🎤 