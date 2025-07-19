'use client'

import { useState } from 'react'
import { Button } from './button'
import { Card } from './card'
import { CheckCircle, AlertCircle, Info, Copy } from 'lucide-react'

export function CouponTestGuide() {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testCoupons = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-coupons')
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      console.error('Error testing coupons:', error)
      setTestResult({ status: 'error', error: 'Failed to test coupons' })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Guide des Codes de Réduction</h3>
        </div>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Code Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-green-100 px-2 py-1 rounded text-green-800 font-mono">
                OFFGIGS1
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard('OFFGIGS1')}
                className="text-green-600 hover:text-green-700"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-green-700 mt-2">
              Ce code donne 100% de réduction (gratuit) sur votre achat !
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Comment utiliser le code :</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
              <li>Cliquez sur "Acheter maintenant"</li>
              <li>Vous serez redirigé vers la page de paiement Stripe</li>
              <li>Cherchez le champ "Code promo" ou "Coupon"</li>
              <li>Entrez <code className="bg-blue-100 px-1 rounded">OFFGIGS1</code></li>
              <li>La réduction s'appliquera automatiquement</li>
            </ol>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">Important</span>
            </div>
            <p className="text-sm text-yellow-700">
              Le champ "Code promo" apparaît automatiquement sur la page de paiement Stripe. 
              Si vous ne le voyez pas, essayez de faire défiler la page ou cherchez dans les options.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Test de Diagnostic</h3>
          <Button onClick={testCoupons} disabled={loading}>
            {loading ? 'Test en cours...' : 'Tester les Coupons'}
          </Button>
        </div>

        {testResult && (
          <div className="space-y-4">
            {testResult.status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Test Réussi</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p><strong>Compte Stripe :</strong> {testResult.stripeAccount}</p>
                  <p><strong>Environnement :</strong> {testResult.environment}</p>
                  <p><strong>Coupons trouvés :</strong> {testResult.existingCoupons.length}</p>
                  
                  {testResult.existingCoupons.map((coupon: any) => (
                    <div key={coupon.id} className="bg-white p-2 rounded border">
                      <p><strong>Code :</strong> {coupon.id}</p>
                      <p><strong>Nom :</strong> {coupon.name}</p>
                      <p><strong>Réduction :</strong> {coupon.percent_off}%</p>
                      <p><strong>Valide :</strong> {coupon.valid ? 'Oui' : 'Non'}</p>
                    </div>
                  ))}
                  
                  <p><strong>Codes promo activés :</strong> {testResult.testSession.allow_promotion_codes ? 'Oui' : 'Non'}</p>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-800">Erreur de Test</span>
                </div>
                <p className="text-sm text-red-700">{testResult.error}</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
} 