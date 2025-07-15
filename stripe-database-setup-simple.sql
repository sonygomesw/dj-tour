-- Stripe Database Setup for offgigs - Version simplifiée
-- Exécuter ce script dans l'éditeur SQL de Supabase

-- 1. Ajouter les colonnes premium au tableau profiles existant
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS premium_since TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_session_id TEXT;

-- 2. Créer la table des transactions
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  amount INTEGER NOT NULL, -- Montant en centimes
  currency TEXT NOT NULL DEFAULT 'eur',
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  product_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Créer la table des webhooks Stripe
CREATE TABLE IF NOT EXISTS stripe_webhooks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id TEXT UNIQUE,
  event_type TEXT NOT NULL,
  stripe_object_id TEXT,
  processed BOOLEAN DEFAULT FALSE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Créer la table des remboursements
CREATE TABLE IF NOT EXISTS refunds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
  stripe_refund_id TEXT UNIQUE,
  amount INTEGER NOT NULL, -- Montant remboursé en centimes
  reason TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Activer Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;

-- 6. Politiques RLS pour transactions
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all transactions"
  ON transactions FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- 7. Politiques RLS pour webhooks
CREATE POLICY "Admins can view webhooks"
  ON stripe_webhooks FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

-- 8. Politiques RLS pour remboursements
CREATE POLICY "Users can view their own refunds"
  ON refunds FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM transactions WHERE id = refunds.transaction_id
    )
  );

CREATE POLICY "Admins can manage refunds"
  ON refunds FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- 9. Index pour les performances
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_stripe_session_id ON transactions(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);

CREATE INDEX IF NOT EXISTS idx_stripe_webhooks_event_id ON stripe_webhooks(event_id);
CREATE INDEX IF NOT EXISTS idx_stripe_webhooks_event_type ON stripe_webhooks(event_type);
CREATE INDEX IF NOT EXISTS idx_stripe_webhooks_processed ON stripe_webhooks(processed);

CREATE INDEX IF NOT EXISTS idx_refunds_transaction_id ON refunds(transaction_id);
CREATE INDEX IF NOT EXISTS idx_refunds_stripe_refund_id ON refunds(stripe_refund_id);

-- 10. Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 11. Trigger pour updated_at
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 12. Fonction pour obtenir les statistiques de paiement
CREATE OR REPLACE FUNCTION get_payment_stats(user_uuid uuid)
RETURNS TABLE (
  total_transactions bigint,
  total_amount numeric,
  successful_transactions bigint,
  failed_transactions bigint,
  last_payment_date timestamp
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_transactions,
    COALESCE(SUM(amount) / 100.0, 0) as total_amount,
    COUNT(*) FILTER (WHERE status = 'completed') as successful_transactions,
    COUNT(*) FILTER (WHERE status = 'failed') as failed_transactions,
    MAX(created_at) as last_payment_date
  FROM transactions 
  WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 13. Fonction pour vérifier le statut premium
CREATE OR REPLACE FUNCTION is_user_premium(user_uuid uuid)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_uuid AND is_premium = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 14. Fonction pour nettoyer les anciens webhooks
CREATE OR REPLACE FUNCTION cleanup_old_webhooks()
RETURNS void AS $$
BEGIN
  DELETE FROM stripe_webhooks 
  WHERE created_at < NOW() - INTERVAL '30 days'
  AND processed = TRUE;
END;
$$ LANGUAGE plpgsql;

-- 15. Fonction pour obtenir le revenu total
CREATE OR REPLACE FUNCTION get_total_revenue()
RETURNS numeric AS $$
BEGIN
  RETURN COALESCE(
    (SELECT SUM(amount) / 100.0 FROM transactions WHERE status = 'completed'),
    0
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 16. Fonction pour obtenir les statistiques globales
CREATE OR REPLACE FUNCTION get_global_stats()
RETURNS TABLE (
  total_users bigint,
  premium_users bigint,
  total_revenue numeric,
  total_transactions bigint,
  conversion_rate numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM auth.users) as total_users,
    (SELECT COUNT(*) FROM profiles WHERE is_premium = TRUE) as premium_users,
    get_total_revenue() as total_revenue,
    (SELECT COUNT(*) FROM transactions WHERE status = 'completed') as total_transactions,
    CASE 
      WHEN (SELECT COUNT(*) FROM auth.users) > 0 
      THEN (SELECT COUNT(*) FROM profiles WHERE is_premium = TRUE)::numeric / (SELECT COUNT(*) FROM auth.users)::numeric * 100
      ELSE 0 
    END as conversion_rate;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 17. Fonction pour intégrer avec les stats existantes
CREATE OR REPLACE FUNCTION update_user_stats_with_payment(user_uuid uuid)
RETURNS void AS $$
BEGIN
  -- Mettre à jour les stats utilisateur existantes avec les infos de paiement
  UPDATE user_stats 
  SET 
    total_xp = total_xp + 500, -- Bonus XP pour paiement
    updated_at = NOW()
  WHERE user_id = user_uuid;
  
  -- Si l'utilisateur n'a pas de stats, en créer
  IF NOT FOUND THEN
    INSERT INTO user_stats (user_id, total_xp, current_level, missions_completed, missions_in_progress)
    VALUES (user_uuid, 500, 1, 0, 0);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ✅ Configuration Stripe terminée ! 