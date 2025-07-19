import Stripe from 'stripe'

// Configuration Stripe côté serveur
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

// Configuration côté client
export const stripePromise = import('@stripe/stripe-js').then(({ loadStripe }) =>
  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
)

// Types pour les produits
export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  features: string[]
}

// Produit offgigs
export const OFFGIGS_PRODUCT: Product = {
  id: 'Offgigs-lifetime',
  name: 'DJ Tour Pro - Lifetime Access',
  description: 'Lifetime access to DJ Tour platform with all premium features',
  price: 0, // Free access
  currency: 'usd',
  features: [
    'Accès à vie à toutes les missions',
    'Coach IA personnalisé',
    'Constructeur de tournée guidé',
    'Outils de booking et templates d\'emails',
    'Groupe Telegram privé',
    'Assistant IA 24/7',
    'Accès permanent'
  ]
}

// Fonction pour créer une session de paiement
export async function createCheckoutSession(product: Product, couponCode?: string) {
  try {
    console.log('🟡 Creating Stripe checkout session...')
    console.log('💰 Product details:', {
      name: product.name,
      price: product.price,
      currency: product.currency
    })
    console.log('🎫 Coupon code:', couponCode || 'None')
    
    const sessionConfig: any = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price * 100, // Stripe utilise les centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://dj-tour-ic4gw0mbl-geoviomgmt-7021s-projects.vercel.app'}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://dj-tour-ic4gw0mbl-geoviomgmt-7021s-projects.vercel.app'}/?canceled=true`,
      allow_promotion_codes: true, // Active le champ promo code
      metadata: {
        product_id: product.id,
        coupon_used: couponCode || 'none'
      },
      billing_address_collection: 'auto',
    }

    // Si un coupon est fourni, l'appliquer directement
    if (couponCode) {
      sessionConfig.discounts = [
        {
          coupon: couponCode,
        },
      ]
      console.log('🎫 Applying coupon directly:', couponCode)
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)

    console.log('✅ Stripe session created successfully:', session.id)
    console.log('🎫 Promotion codes enabled:', session.allow_promotion_codes)
    console.log('💰 Amount total:', session.amount_total)
    console.log('💰 Amount subtotal:', session.amount_subtotal)
    
    return session
  } catch (error: any) {
    console.error('❌ Error creating checkout session:', error)
    console.error('❌ Stripe error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      decline_code: error.decline_code,
      payment_intent: error.payment_intent
    })
    throw error
  }
}

// Fonction pour récupérer une session
export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session
  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    throw error
  }
} 