import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, OFFGIGS_PRODUCT } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json()

    // Pour l'instant, on utilise toujours le produit offgigs
    const product = OFFGIGS_PRODUCT

    const session = await createCheckoutSession(product)

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error in create-checkout-session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
} 