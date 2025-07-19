# 🚀 Déploiement Vercel - Configuration des Coupons

## 📋 Configuration requise pour offgigs.com

### 1. Variables d'environnement sur Vercel

Dans le dashboard Vercel, aller dans **Settings** > **Environment Variables** et ajouter :

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration (LIVE - Production)
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Base URL for redirects (Production)
NEXT_PUBLIC_BASE_URL=https://offgigs.com

# OpenAI Configuration (for AI features)
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### 2. Configuration des webhooks Stripe (CRITIQUE)

Dans le dashboard Stripe, aller dans **Developers** > **Webhooks** et configurer :

**URL du webhook :**
```
https://offgigs.com/api/webhooks/stripe
```

**Événements à écouter :**
- ✅ `checkout.session.completed`
- ✅ `payment_intent.succeeded`
- ✅ `payment_intent.payment_failed`

### 3. Domaines autorisés dans Stripe

Dans le dashboard Stripe, aller dans **Settings** > **Checkout** et ajouter :

**Domaines autorisés :**
- `offgigs.com`
- `www.offgigs.com`

**URLs de redirection :**
- Success: `https://offgigs.com/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`
- Cancel: `https://offgigs.com/?canceled=true`

## 🧪 Tests de production

### Test 1 : Vérifier l'API de production
```bash
curl -X GET https://offgigs.com/api/test-coupons
```

### Test 2 : Créer une session de production
```bash
curl -X POST https://offgigs.com/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"productId": "offgigs-lifetime"}'
```

### Test 3 : Valider le coupon en production
```bash
curl -X POST https://offgigs.com/api/validate-coupon \
  -H "Content-Type: application/json" \
  -d '{"couponCode": "OFFGIGS1"}'
```

## 🎯 Coupon OFFGIGS1 en production

### Vérification dans Stripe Dashboard :
1. Aller dans **Produits** > **Coupons**
2. Vérifier que `OFFGIGS1` existe et est valide
3. Vérifier qu'il n'a pas de restrictions de domaine

### Utilisation en production :
1. Aller sur `https://offgigs.com`
2. Cliquer sur "Get My Personalized Plan Now"
3. Sur la page Stripe, entrer le code `OFFGIGS1`
4. Le prix passera de 100$ à 0$

## 🔧 Dépannage en production

### Problème : "Coupon non reconnu"
**Solution :** Vérifier que le coupon existe dans le compte Stripe LIVE (pas TEST)

### Problème : "Erreur de redirection"
**Solution :** Vérifier `NEXT_PUBLIC_BASE_URL=https://offgigs.com`

### Problème : "Webhook non reçu"
**Solution :** Vérifier l'URL du webhook : `https://offgigs.com/api/webhooks/stripe`

### Problème : "Session non créée"
**Solution :** Vérifier les clés Stripe LIVE dans Vercel

## 📊 Monitoring en production

### Logs Vercel :
- Aller dans le dashboard Vercel > **Functions** > **Logs**
- Surveiller les erreurs d'API

### Logs Stripe :
- Aller dans le dashboard Stripe > **Logs**
- Surveiller les tentatives de paiement

### Métriques importantes :
- Taux de conversion des coupons
- Erreurs de webhook
- Sessions de paiement créées

## ✅ Checklist de déploiement

- [ ] Variables d'environnement configurées sur Vercel
- [ ] Webhook Stripe configuré avec l'URL de production
- [ ] Domaines autorisés dans Stripe
- [ ] Coupon `OFFGIGS1` existe dans le compte LIVE
- [ ] URLs de redirection configurées
- [ ] Tests d'API en production réussis
- [ ] Page d'accueil affiche le composant CouponDisplay
- [ ] Redirection vers Stripe fonctionne
- [ ] Champ "Code promo" apparaît sur la page Stripe

## 🚀 Déploiement

1. **Pousser le code sur GitHub**
2. **Vercel se déploie automatiquement**
3. **Vérifier les variables d'environnement**
4. **Tester l'API de production**
5. **Tester le coupon en production**

---

**Le coupon OFFGIGS1 devrait fonctionner parfaitement sur offgigs.com !** 🎉 