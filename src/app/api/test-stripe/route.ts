import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET() {
  try {
    // Test de connexion Stripe
    const account = await stripe.accounts.retrieve()
    
    return NextResponse.json({
      status: 'success',
      stripeConnected: true,
      accountId: account.id,
      environment: process.env.NODE_ENV,
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      hasPublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET
    })
  } catch (error) {
    console.error('Stripe test error:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      hasPublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    }, { status: 500 })
  }
} 