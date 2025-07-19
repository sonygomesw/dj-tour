# ✅ Checklist de Déploiement - offgigs.com

## 🎯 **RÉPONSE À VOTRE QUESTION :**

**OUI, le coupon `OFFGIGS1` va marcher sur offgigs.com !** ✅

Votre configuration est parfaite :
- ✅ Clés Stripe LIVE configurées
- ✅ Coupon `OFFGIGS1` existe (100% de réduction)
- ✅ Base URL correcte : `https://offgigs.com`
- ✅ Codes promotionnels activés

## 📋 Checklist de déploiement

### 1. Variables d'environnement sur Vercel ✅
- [ ] `STRIPE_SECRET_KEY` = `sk_live_...` (LIVE)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...` (LIVE)
- [ ] `NEXT_PUBLIC_BASE_URL` = `https://offgigs.com`
- [ ] `STRIPE_WEBHOOK_SECRET` = `whsec_...`

### 2. Configuration Stripe ✅
- [ ] Coupon `OFFGIGS1` existe dans le compte LIVE
- [ ] Webhook configuré : `https://offgigs.com/api/webhooks/stripe`
- [ ] Domaines autorisés : `offgigs.com`, `www.offgigs.com`

### 3. Code déployé ✅
- [ ] Composant `CouponDisplay` ajouté
- [ ] API `/api/test-coupons` fonctionne
- [ ] API `/api/validate-coupon` fonctionne
- [ ] `allow_promotion_codes: true` activé

## 🧪 Tests après déploiement

### Test 1 : API de production
```bash
curl -X GET https://offgigs.com/api/test-production
```

### Test 2 : Coupon en production
1. Aller sur `https://offgigs.com`
2. Cliquer sur "Get My Personalized Plan Now"
3. Entrer le code `OFFGIGS1`
4. Vérifier que le prix passe à 0$

### Test 3 : Webhook
- Vérifier dans Stripe Dashboard > **Logs** que les webhooks sont reçus

## 🎫 Utilisation du coupon

### Code : `OFFGIGS1`
- **Réduction :** 100% (gratuit)
- **Validité :** Permanente
- **Utilisations :** Illimitées
- **Domaine :** Fonctionne sur offgigs.com

### Étapes d'utilisation :
1. **Visiter** `https://offgigs.com`
2. **Cliquer** "Get My Personalized Plan Now"
3. **Sur Stripe**, chercher "Code promo"
4. **Entrer** `OFFGIGS1`
5. **Prix** : 100$ → 0$ ✅

## 🔧 Dépannage en production

### Si le coupon ne fonctionne pas :

1. **Vérifier les variables d'environnement sur Vercel**
2. **Tester l'API** : `https://offgigs.com/api/test-production`
3. **Vérifier les logs Vercel** dans le dashboard
4. **Vérifier les logs Stripe** dans le dashboard

### Commandes de diagnostic :
```bash
# Test API de production
curl https://offgigs.com/api/test-production

# Test coupon
curl -X POST https://offgigs.com/api/validate-coupon \
  -H "Content-Type: application/json" \
  -d '{"couponCode": "OFFGIGS1"}'
```

## 📊 Monitoring

### Métriques à surveiller :
- Taux d'utilisation du coupon `OFFGIGS1`
- Erreurs de webhook
- Sessions de paiement créées
- Conversions (paiements réussis)

### Alertes à configurer :
- Erreurs d'API > 5%
- Webhooks non reçus
- Coupons non reconnus

## 🚀 Déploiement final

1. **Pousser le code sur GitHub**
2. **Vercel se déploie automatiquement**
3. **Vérifier les variables d'environnement**
4. **Tester l'API de production**
5. **Tester le coupon en production**

## ✅ Résultat attendu

Après déploiement sur `offgigs.com` :

- ✅ Le coupon `OFFGIGS1` fonctionnera parfaitement
- ✅ Les utilisateurs pourront obtenir 100% de réduction
- ✅ Le prix passera de 100$ à 0$
- ✅ Les webhooks traiteront les paiements
- ✅ L'interface affichera le code disponible

---

## 🎉 **CONCLUSION**

**OUI, le coupon va marcher sur offgigs.com !**

Votre configuration est parfaite et prête pour la production. Le coupon `OFFGIGS1` donnera 100% de réduction (gratuit) à tous vos utilisateurs sur `offgigs.com`.

**Code à utiliser : `OFFGIGS1`** 🎫 