import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { couponCode } = await request.json()

    if (!couponCode) {
      return NextResponse.json(
        { error: 'Coupon code is required' },
        { status: 400 }
      )
    }

    // Récupérer le coupon depuis Stripe
    const coupon = await stripe.coupons.retrieve(couponCode)

    if (!coupon.valid) {
      return NextResponse.json(
        { error: 'Invalid coupon code' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      valid: true,
      coupon: {
        id: coupon.id,
        name: coupon.name,
        percent_off: coupon.percent_off,
        amount_off: coupon.amount_off,
        currency: coupon.currency,
        duration: coupon.duration,
        max_redemptions: coupon.max_redemptions,
        times_redeemed: coupon.times_redeemed
      }
    })
  } catch (error: any) {
    console.error('Error validating coupon:', error)
    
    if (error.code === 'resource_missing') {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to validate coupon' },
      { status: 500 }
    )
  }
} 