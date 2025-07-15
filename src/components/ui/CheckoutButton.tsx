'use client'

import { useState } from 'react'
import { Button } from './button'
import { Loader2, CreditCard } from 'lucide-react'

interface CheckoutButtonProps {
  productId?: string
  className?: string
  children?: React.ReactNode
}

export function CheckoutButton({ productId, className, children }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    
    try {
      // Rediriger vers la page d'authentification avec un paramètre pour indiquer l'intention de paiement
      window.location.href = '/auth?mode=signup&redirect=checkout'
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Erreur lors du paiement. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Traitement...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4 mr-2" />
          {children || 'Acheter maintenant'}
        </>
      )}
    </Button>
  )
} 