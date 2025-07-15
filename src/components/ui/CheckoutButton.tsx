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
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Rediriger vers Stripe Checkout
      const stripe = await import('@stripe/stripe-js').then(({ loadStripe }) =>
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      )

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          throw error
        }
      }
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