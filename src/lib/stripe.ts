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
  id: 'offgigs-lifetime',
  name: 'offgigs Lifetime Access',
  description: 'Accès à vie à la plateforme offgigs avec toutes les fonctionnalités',
  price: 97, // Prix réduit pour test
  currency: 'eur',
  features: [
    'Accès à vie à toutes les missions',
    'Coach IA personnalisé',
    'Constructeur de tournée guidé',
    'Outils de booking et templates d\'emails',
    'Groupe Telegram privé',
    'Assistant IA 24/7',
    'Garantie de 90 jours'
  ]
}

// Fonction pour créer une session de paiement
export async function createCheckoutSession(product: Product) {
  try {
    const session = await stripe.checkout.sessions.create({
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
      success_url: 'https://offgigs.com/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://offgigs.com/?canceled=true',
      metadata: {
        product_id: product.id,
      },
      billing_address_collection: 'auto',
      customer_creation: 'always',
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
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