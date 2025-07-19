'use client'

import { useState } from 'react'
import { Button } from './button'
import { Card } from './card'
import { Gift, Copy, CheckCircle, Info } from 'lucide-react'

export function CouponDisplay() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">🎉 Code de Réduction Spécial</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">OFFGIGS1</span>
              </div>
              <p className="text-sm text-green-700">100% de réduction - Gratuit !</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard('OFFGIGS1')}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copier
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Comment utiliser :</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Cliquez sur "Acheter maintenant"</li>
                <li>Sur la page de paiement, cherchez "Code promo"</li>
                <li>Entrez <code className="bg-blue-100 px-1 rounded">OFFGIGS1</code></li>
                <li>Le prix passera à 0$ !</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          ⚡ Code valide en permanence • Utilisations illimitées
        </div>
      </div>
    </Card>
  )
} 