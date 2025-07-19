import { CouponTestGuide } from '@/components/ui/CouponTestGuide'

export default function TestCouponsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Test des Codes de Réduction
          </h1>
          <p className="text-xl text-gray-600">
            Diagnostic et guide d'utilisation des coupons Stripe
          </p>
        </div>
        
        <CouponTestGuide />
        
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Résumé du Diagnostic</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">✅ Ce qui fonctionne :</h3>
              <ul className="list-disc list-inside space-y-1 text-green-700">
                <li>Votre compte Stripe est connecté et fonctionnel</li>
                <li>Un coupon existe : <code className="bg-green-100 px-1 rounded">OFFGIGS1</code> (100% de réduction)</li>
                <li>Les codes promotionnels sont activés dans les sessions de paiement</li>
                <li>L'API de création de session fonctionne correctement</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">🎯 Comment utiliser le code :</h3>
              <ol className="list-decimal list-inside space-y-1 text-blue-700">
                <li>Allez sur votre page d'accueil</li>
                <li>Cliquez sur "Acheter maintenant" ou "Get My Personalized Plan Now"</li>
                <li>Vous serez redirigé vers la page de paiement Stripe</li>
                <li>Cherchez le champ "Code promo" ou "Coupon" (il apparaît automatiquement)</li>
                <li>Entrez le code <code className="bg-blue-100 px-1 rounded">OFFGIGS1</code></li>
                <li>Le prix passera de 100$ à 0$ (gratuit)</li>
              </ol>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Points importants :</h3>
              <ul className="list-disc list-inside space-y-1 text-yellow-700">
                <li>Le champ "Code promo" apparaît automatiquement sur la page Stripe</li>
                <li>Si vous ne le voyez pas, faites défiler la page ou cherchez dans les options</li>
                <li>Le code <code className="bg-yellow-100 px-1 rounded">OFFGIGS1</code> donne 100% de réduction</li>
                <li>Vous utilisez des clés Stripe LIVE, donc les paiements sont réels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 