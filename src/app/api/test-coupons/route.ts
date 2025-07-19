import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET() {
  try {
    console.log('🔍 Testing Stripe coupons...')
    
    // Test 1: Vérifier la connexion Stripe
    const account = await stripe.accounts.retrieve()
    console.log('✅ Stripe account:', account.id)
    
    // Test 2: Lister tous les coupons
    const coupons = await stripe.coupons.list({ limit: 100 })
    console.log('📋 Found coupons:', coupons.data.length)
    
    // Test 3: Créer un coupon de test si aucun n'existe
    let testCoupon = null
    if (coupons.data.length === 0) {
      console.log('⚠️ No coupons found, creating a test coupon...')
      
      testCoupon = await stripe.coupons.create({
        id: 'TEST_COUPON',
        percent_off: 20,
        duration: 'forever',
        name: 'Test Coupon - 20% off'
      })
      
      console.log('✅ Test coupon created:', testCoupon.id)
    }
    
    // Test 4: Créer une session de test avec allow_promotion_codes
    const testSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Test Product',
              description: 'Test product for coupon validation',
            },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      allow_promotion_codes: true,
    })
    
    console.log('✅ Test session created with promotion codes enabled:', testSession.id)
    
    return NextResponse.json({
      status: 'success',
      stripeAccount: account.id,
      environment: process.env.NODE_ENV,
      existingCoupons: coupons.data.map(c => ({
        id: c.id,
        name: c.name,
        percent_off: c.percent_off,
        amount_off: c.amount_off,
        currency: c.currency,
        valid: c.valid,
        duration: c.duration
      })),
      testCouponCreated: testCoupon ? {
        id: testCoupon.id,
        name: testCoupon.name,
        percent_off: testCoupon.percent_off
      } : null,
      testSession: {
        id: testSession.id,
        allow_promotion_codes: testSession.allow_promotion_codes,
        url: testSession.url
      }
    })
    
  } catch (error: any) {
    console.error('❌ Error testing coupons:', error)
    
    return NextResponse.json({
      status: 'error',
      error: error.message,
      code: error.code,
      type: error.type,
      stripeKeyType: process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 'LIVE' : 'TEST'
    }, { status: 500 })
  }
} 