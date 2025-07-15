-- Stripe Database Setup for offgigs - Compatible avec toutes les tables existantes
-- Exécuter ce script dans l'éditeur SQL de Supabase

-- 1. Ajouter les colonnes premium au tableau profiles existant (sans conflit)
DO $$ 
BEGIN
    -- Vérifier si les colonnes existent déjà
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'is_premium') THEN
        ALTER TABLE profiles ADD COLUMN is_premium BOOLEAN DEFAULT FALSE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'premium_since') THEN
        ALTER TABLE profiles ADD COLUMN premium_since TIMESTAMP WITH TIME ZONE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'stripe_customer_id') THEN
        ALTER TABLE profiles ADD COLUMN stripe_customer_id TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'stripe_session_id') THEN
        ALTER TABLE profiles ADD COLUMN stripe_session_id TEXT;
    END IF;
END $$;

-- 2. Créer la table des transactions (si elle n'existe pas)
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

-- 3. Créer la table des webhooks Stripe (pour le logging)
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

-- 5. Activer Row Level Security (RLS) - seulement si pas déjà activé
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'transactions') THEN
        ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'stripe_webhooks') THEN
        ALTER TABLE stripe_webhooks ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'refunds') THEN
        ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- 6. Politiques RLS pour transactions (seulement si elles n'existent pas)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'transactions' AND policyname = 'Users can view their own transactions') THEN
        CREATE POLICY "Users can view their own transactions"
          ON transactions FOR SELECT
          USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'transactions' AND policyname = 'Admins can view all transactions') THEN
        CREATE POLICY "Admins can view all transactions"
          ON transactions FOR ALL
          USING (auth.jwt() ->> 'role' = 'admin');
    END IF;
END $$;

-- 7. Politiques RLS pour webhooks (lecture seule pour les admins)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'stripe_webhooks' AND policyname = 'Admins can view webhooks') THEN
        CREATE POLICY "Admins can view webhooks"
          ON stripe_webhooks FOR SELECT
          USING (auth.jwt() ->> 'role' = 'admin');
    END IF;
END $$;

-- 8. Politiques RLS pour remboursements
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'refunds' AND policyname = 'Users can view their own refunds') THEN
        CREATE POLICY "Users can view their own refunds"
          ON refunds FOR SELECT
          USING (
            auth.uid() IN (
              SELECT user_id FROM transactions WHERE id = refunds.transaction_id
            )
          );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'refunds' AND policyname = 'Admins can manage refunds') THEN
        CREATE POLICY "Admins can manage refunds"
          ON refunds FOR ALL
          USING (auth.jwt() ->> 'role' = 'admin');
    END IF;
END $$;

-- 9. Index pour les performances (seulement s'ils n'existent pas)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'transactions' AND indexname = 'idx_transactions_user_id') THEN
        CREATE INDEX idx_transactions_user_id ON transactions(user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'transactions' AND indexname = 'idx_transactions_stripe_session_id') THEN
        CREATE INDEX idx_transactions_stripe_session_id ON transactions(stripe_session_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'transactions' AND indexname = 'idx_transactions_status') THEN
        CREATE INDEX idx_transactions_status ON transactions(status);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'transactions' AND indexname = 'idx_transactions_created_at') THEN
        CREATE INDEX idx_transactions_created_at ON transactions(created_at);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'stripe_webhooks' AND indexname = 'idx_stripe_webhooks_event_id') THEN
        CREATE INDEX idx_stripe_webhooks_event_id ON stripe_webhooks(event_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'stripe_webhooks' AND indexname = 'idx_stripe_webhooks_event_type') THEN
        CREATE INDEX idx_stripe_webhooks_event_type ON stripe_webhooks(event_type);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'stripe_webhooks' AND indexname = 'idx_stripe_webhooks_processed') THEN
        CREATE INDEX idx_stripe_webhooks_processed ON stripe_webhooks(processed);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'refunds' AND indexname = 'idx_refunds_transaction_id') THEN
        CREATE INDEX idx_refunds_transaction_id ON refunds(transaction_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'refunds' AND indexname = 'idx_refunds_stripe_refund_id') THEN
        CREATE INDEX idx_refunds_stripe_refund_id ON refunds(stripe_refund_id);
    END IF;
END $$;

-- 10. Fonction pour mettre à jour updated_at (seulement si elle n'existe pas)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 11. Triggers pour updated_at (seulement s'ils n'existent pas)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_transactions_updated_at') THEN
        CREATE TRIGGER update_transactions_updated_at
          BEFORE UPDATE ON transactions
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

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

-- 14. Vue pour les transactions avec détails utilisateur
CREATE OR REPLACE VIEW transaction_details AS
SELECT 
  t.id,
  t.user_id,
  p.dj_name,
  p.full_name,
  t.stripe_session_id,
  t.amount,
  t.currency,
  t.status,
  t.product_id,
  t.created_at,
  t.updated_at
FROM transactions t
LEFT JOIN profiles p ON t.user_id = p.id;

-- 15. Vue pour les transactions avec détails utilisateur (pas de politique RLS sur les vues)
-- La sécurité est gérée au niveau des tables sous-jacentes

-- 16. Fonction pour nettoyer les anciens webhooks (maintenance)
CREATE OR REPLACE FUNCTION cleanup_old_webhooks()
RETURNS void AS $$
BEGIN
  DELETE FROM stripe_webhooks 
  WHERE created_at < NOW() - INTERVAL '30 days'
  AND processed = TRUE;
END;
$$ LANGUAGE plpgsql;

-- 17. Fonction pour obtenir le revenu total
CREATE OR REPLACE FUNCTION get_total_revenue()
RETURNS numeric AS $$
BEGIN
  RETURN COALESCE(
    (SELECT SUM(amount) / 100.0 FROM transactions WHERE status = 'completed'),
    0
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 18. Fonction pour obtenir les statistiques globales
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

-- 19. Fonction pour intégrer avec les stats existantes
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

-- 20. Fonction pour obtenir les stats complètes d'un utilisateur
CREATE OR REPLACE FUNCTION get_user_complete_stats(user_uuid uuid)
RETURNS TABLE (
  total_xp integer,
  current_level integer,
  missions_completed integer,
  is_premium boolean,
  total_payments numeric,
  last_payment_date timestamp
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(us.total_xp, 0) as total_xp,
    COALESCE(us.current_level, 1) as current_level,
    COALESCE(us.missions_completed, 0) as missions_completed,
    COALESCE(p.is_premium, false) as is_premium,
    COALESCE(SUM(t.amount) / 100.0, 0) as total_payments,
    MAX(t.created_at) as last_payment_date
  FROM profiles p
  LEFT JOIN user_stats us ON p.id = us.user_id
  LEFT JOIN transactions t ON p.id = t.user_id AND t.status = 'completed'
  WHERE p.id = user_uuid
  GROUP BY us.total_xp, us.current_level, us.missions_completed, p.is_premium;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ✅ Configuration Stripe terminée et compatible avec toutes les tables existantes ! 