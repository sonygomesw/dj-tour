# 🔧 Guide de Dépannage - Codes de Réduction

## 🎯 Diagnostic Complet

### ✅ **Ce qui fonctionne :**
- Votre compte Stripe est connecté : `acct_1RgYxjIzY4X7ME0S`
- Un coupon existe : `OFFGIGS1` avec 100% de réduction
- Les codes promotionnels sont activés dans les sessions
- L'API de création de session fonctionne correctement

### 🎫 **Code disponible :**
**`OFFGIGS1`** - 100% de réduction (gratuit)

## 📋 Instructions d'utilisation

### Méthode 1 : Utilisation manuelle
1. **Allez sur votre site** : `http://localhost:3000`
2. **Cliquez sur "Get My Personalized Plan Now"**
3. **Vous serez redirigé vers Stripe**
4. **Cherchez le champ "Code promo"** (il apparaît automatiquement)
5. **Entrez** : `OFFGIGS1`
6. **Le prix passera de 100$ à 0$**

### Méthode 2 : Application automatique
Le code peut être appliqué automatiquement via l'API.

## 🔍 Dépannage étape par étape

### Problème : "Le champ code promo n'apparaît pas"

**Solutions :**
1. **Faites défiler la page** - Le champ peut être plus bas
2. **Cherchez "Coupon" ou "Code promo"** - Les termes peuvent varier
3. **Vérifiez que vous êtes sur la page Stripe** - URL doit contenir `checkout.stripe.com`
4. **Rafraîchissez la page** - Parfois le champ met du temps à apparaître

### Problème : "Le code ne fonctionne pas"

**Solutions :**
1. **Vérifiez l'orthographe** : `OFFGIGS1` (en majuscules)
2. **Assurez-vous que le code est valide** : Testez via `/api/test-coupons`
3. **Vérifiez que vous utilisez les bonnes clés Stripe** : LIVE vs TEST

### Problème : "Erreur lors de la création de session"

**Solutions :**
1. **Vérifiez les variables d'environnement** :
   ```bash
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```
2. **Redémarrez le serveur** après modification du `.env.local`
3. **Vérifiez les logs** dans la console du navigateur

## 🧪 Tests de diagnostic

### Test 1 : Vérifier l'API
```bash
curl -X GET http://localhost:3000/api/test-coupons
```

**Résultat attendu :**
```json
{
  "status": "success",
  "existingCoupons": [
    {
      "id": "uRCxgBHC",
      "name": "OFFGIGS1",
      "percent_off": 100,
      "valid": true
    }
  ]
}
```

### Test 2 : Créer une session de test
```bash
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"productId": "offgigs-lifetime"}'
```

### Test 3 : Valider un coupon
```bash
curl -X POST http://localhost:3000/api/validate-coupon \
  -H "Content-Type: application/json" \
  -d '{"couponCode": "OFFGIGS1"}'
```

## 🎨 Interface utilisateur

### Composants ajoutés :
1. **CouponDisplay** : Affiche le code disponible sur la page d'accueil
2. **CouponTestGuide** : Page de diagnostic complète
3. **API de test** : `/api/test-coupons` pour diagnostiquer

### Pages de test :
- **Page principale** : `http://localhost:3000` (avec affichage du coupon)
- **Page de diagnostic** : `http://localhost:3000/test-coupons`

## 🔧 Configuration technique

### Code côté serveur :
```typescript
// src/lib/stripe.ts
allow_promotion_codes: true, // ✅ Activé
```

### API de création de session :
```typescript
// src/app/api/create-checkout-session/route.ts
const session = await createCheckoutSession(product, couponCode)
```

### Validation des coupons :
```typescript
// src/app/api/validate-coupon/route.ts
const coupon = await stripe.coupons.retrieve(couponCode)
```

## 🚨 Problèmes courants

### 1. Clés Stripe incorrectes
**Symptôme :** Erreur "Stripe not configured"
**Solution :** Vérifier les variables d'environnement

### 2. Coupon expiré
**Symptôme :** Code non reconnu
**Solution :** Créer un nouveau coupon dans Stripe Dashboard

### 3. Mode test vs production
**Symptôme :** Codes ne fonctionnent pas
**Solution :** Utiliser les bonnes clés (LIVE vs TEST)

### 4. Webhook non configuré
**Symptôme :** Paiements non confirmés
**Solution :** Configurer les webhooks Stripe

## 📞 Support

### Logs utiles :
- **Console navigateur** : Erreurs JavaScript
- **Terminal serveur** : Logs Next.js
- **Dashboard Stripe** : Logs de paiement

### Commandes de diagnostic :
```bash
# Tester l'API
curl http://localhost:3000/api/test-coupons

# Vérifier les variables d'environnement
grep -i stripe .env.local

# Redémarrer le serveur
npm run dev
```

## ✅ Checklist de vérification

- [ ] Serveur Next.js en cours d'exécution
- [ ] Variables d'environnement Stripe configurées
- [ ] Coupon `OFFGIGS1` existe dans Stripe Dashboard
- [ ] API `/api/test-coupons` retourne "success"
- [ ] Page d'accueil affiche le composant CouponDisplay
- [ ] Redirection vers Stripe fonctionne
- [ ] Champ "Code promo" apparaît sur la page Stripe

## 🎯 Résolution finale

Si tous les tests passent mais que le code ne fonctionne toujours pas :

1. **Vérifiez que vous êtes sur la bonne page Stripe**
2. **Essayez de copier-coller le code** au lieu de le taper
3. **Vérifiez que le code est en majuscules** : `OFFGIGS1`
4. **Contactez le support Stripe** si le problème persiste

---

**Le code `OFFGIGS1` devrait fonctionner parfaitement !** 🎉 