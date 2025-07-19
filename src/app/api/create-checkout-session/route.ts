import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, OFFGIGS_PRODUCT } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    console.log('🟡 Starting checkout session creation...')
    
    // Vérifier les variables d'environnement
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ STRIPE_SECRET_KEY not found')
      return NextResponse.json(
        { error: 'Stripe configuration missing' },
        { status: 500 }
      )
    }
    
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      console.error('❌ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY not found')
      return NextResponse.json(
        { error: 'Stripe publishable key missing' },
        { status: 500 }
      )
    }
    
    console.log('✅ Stripe keys found')

    const { productId, couponCode } = await request.json()
    console.log('📦 Product ID:', productId)
    console.log('🎫 Coupon Code:', couponCode)

    // Pour l'instant, on utilise toujours le produit offgigs
    const product = OFFGIGS_PRODUCT
    console.log('🎯 Using product:', product)

    // Créer la session avec le coupon pré-appliqué si fourni
    const session = await createCheckoutSession(product, couponCode)
    console.log('✅ Checkout session created:', session.id)

    return NextResponse.json({ 
      sessionId: session.id,
      allowPromotionCodes: session.allow_promotion_codes,
      availableCoupons: ['OFFGIGS1'] // Liste des coupons disponibles
    })
  } catch (error: any) {
    console.error('❌ Error in create-checkout-session:', error)
    console.error('❌ Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode
    })
    
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
} 