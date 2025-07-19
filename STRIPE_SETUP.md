# 🚀 Configuration Stripe pour offgigs

## 📋 Vue d'ensemble

Ce guide vous aide à configurer Stripe pour les paiements sur la plateforme offgigs.

## 🔧 Étapes de configuration

### 1. Créer un compte Stripe

1. Aller sur [stripe.com](https://stripe.com)
2. Créer un compte ou se connecter
3. Activer votre compte (vérification d'identité)

### 2. Récupérer les clés API

1. Dans le dashboard Stripe, aller dans **Developers** > **API keys**
2. Copier les clés suivantes :
   - **Publishable key** (commence par `pk_test_` ou `pk_live_`)
   - **Secret key** (commence par `sk_test_` ou `sk_live_`)

### 3. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://wjepasrwmkyklnxgkhsu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZXBhc3J3bWt5a2xueGdraHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMTk2MjIsImV4cCI6MjA2Nzc5NTYyMn0.8lBcgPiZ21OyIlZyLncF0P6CI3JVUxG_pWEm2syXZ90

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# OpenAI Configuration (for AI features)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Base URL for redirects
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Configurer les webhooks (OBLIGATOIRE)

Les webhooks sont essentiels pour la sécurité et la gestion automatique des paiements :

1. Dans le dashboard Stripe, aller dans **Developers** > **Webhooks**
2. Cliquer sur "Add endpoint"
3. URL : `https://your-domain.com/api/webhooks/stripe`
4. Événements à écouter :
   - `checkout.session.completed` ✅
   - `payment_intent.succeeded` ✅
   - `payment_intent.payment_failed` ✅
   - `customer.subscription.created` (pour le futur)
   - `customer.subscription.updated` (pour le futur)
   - `customer.subscription.deleted` (pour le futur)

5. **Copier le webhook secret** (commence par `whsec_`) et l'ajouter à `.env.local`

### 5. Configurer les coupons (RECOMMANDÉ)

Pour activer les codes de réduction :

1. Dans le dashboard Stripe, aller dans **Produits** > **Coupons**
2. Cliquer sur "Créer un coupon"
3. Configurer les coupons recommandés :

#### Coupon "EARLYBIRD" (20% de réduction)
- **Code** : `EARLYBIRD`
- **Type** : Pourcentage
- **Valeur** : 20%
- **Durée** : Sans limite
- **Utilisations** : Illimité

#### Coupon "WELCOME" (10$ de réduction)
- **Code** : `WELCOME`
- **Type** : Montant fixe
- **Valeur** : 10$ (ou 10€ selon votre devise)
- **Durée** : Sans limite
- **Utilisations** : Illimité

#### Coupon "LAUNCH" (50% de réduction)
- **Code** : `LAUNCH`
- **Type** : Pourcentage
- **Valeur** : 50%
- **Durée** : Limité (ex: 30 jours)
- **Utilisations** : Limité (ex: 100 utilisations)

### 6. Configurer la base de données

Exécuter le script SQL dans Supabase pour créer les tables nécessaires :

1. Aller dans le dashboard Supabase > **SQL Editor**
2. Créer une nouvelle query
3. Copier-coller le contenu du fichier `stripe-database-setup.sql`
4. Exécuter la query

### 7. Tester les paiements

#### Mode Test
- Utiliser les cartes de test Stripe
- Numéro : `4242 4242 4242 4242`
- Date : n'importe quelle date future
- CVC : n'importe quels 3 chiffres
- **Tester les coupons** : Entrer les codes créés dans le champ promo

#### Mode Production
- Changer les clés `sk_test_` vers `sk_live_`
- Changer les clés `pk_test_` vers `pk_live_`

## 🎯 Produit configuré

Le produit offgigs est configuré avec :
- **Nom** : offgigs Lifetime Access
- **Prix** : 97€ (one-time payment)
- **Devise** : EUR
- **Mode** : Payment (pas d'abonnement)
- **Codes promo** : Activés ✅

## 🔄 Fonctionnalités des webhooks

### Gestion automatique des paiements
- ✅ Création automatique d'utilisateur lors du paiement
- ✅ Attribution du statut premium
- ✅ Enregistrement des transactions
- ✅ Email de bienvenue automatique
- ✅ Gestion des échecs de paiement

### Sécurité
- ✅ Vérification de signature des webhooks
- ✅ Validation côté serveur
- ✅ Logging des événements
- ✅ Gestion des erreurs

## 🔒 Sécurité

### Variables d'environnement
- `STRIPE_SECRET_KEY` : Jamais exposée côté client
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` : Sécurisée pour le client

### Validation des paiements
- Vérification côté serveur obligatoire
- Webhooks pour confirmer les paiements
- Gestion des erreurs de paiement

## 💰 Gestion des revenus

### Dashboard Stripe
- Suivi des paiements en temps réel
- Rapports détaillés
- Gestion des remboursements
- **Suivi des coupons utilisés**

### Intégration avec Supabase
- Stockage des informations de paiement
- Suivi des utilisateurs premium
- Historique des transactions

## 🐛 Dépannage

### Erreur "Stripe not configured"
- Vérifier que les variables d'environnement sont définies
- Redémarrer le serveur après modification du `.env.local`

### Erreur de paiement
- Vérifier les clés API Stripe
- Contrôler les logs Stripe dans le dashboard
- Tester avec les cartes de test

### Erreur de redirection
- Vérifier `NEXT_PUBLIC_BASE_URL`
- Contrôler les URLs de succès/annulation

### Codes promo ne fonctionnent pas
- ✅ Vérifier que `allow_promotion_codes: true` est dans le code
- ✅ Créer des coupons dans le dashboard Stripe
- ✅ Tester avec des codes valides
- ✅ Vérifier que les coupons ne sont pas expirés

## 📊 Monitoring

### Métriques importantes
- Taux de conversion
- Taux d'abandon du panier
- Erreurs de paiement
- Revenus par jour/mois
- **Utilisation des coupons**

### Alertes
- Configurer des alertes pour les échecs de paiement
- Monitorer les webhooks
- Surveiller les tentatives de fraude

## 🚀 Déploiement

### Vercel
1. Ajouter les variables d'environnement dans le dashboard Vercel
2. Configurer les domaines autorisés dans Stripe
3. Tester en production

### Autres plateformes
- Adapter les variables d'environnement
- Configurer les webhooks avec la nouvelle URL
- Tester les paiements en production

## 📞 Support

Pour toute question :
- Documentation Stripe : [stripe.com/docs](https://stripe.com/docs)
- Support Stripe : [support.stripe.com](https://support.stripe.com)
- Issues GitHub : Ouvrir une issue sur le repo

---

**Configuration terminée !** 🎉

Votre site offgigs est maintenant prêt à accepter les paiements via Stripe avec codes de réduction. 