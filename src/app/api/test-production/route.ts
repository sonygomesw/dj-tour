import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET() {
  try {
    console.log('🔍 Testing production configuration...')
    
    // Test 1: Vérifier la connexion Stripe
    const account = await stripe.accounts.retrieve()
    console.log('✅ Stripe account:', account.id)
    
    // Test 2: Vérifier l'environnement
    const isLive = process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_')
    console.log('🌍 Environment:', isLive ? 'LIVE (Production)' : 'TEST')
    
    // Test 3: Vérifier les coupons
    const coupons = await stripe.coupons.list({ limit: 100 })
    console.log('📋 Found coupons:', coupons.data.length)
    
    // Test 4: Vérifier la base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    console.log('🌐 Base URL:', baseUrl)
    
    // Test 5: Créer une session de test avec le coupon
    const testSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Test Product - Production',
              description: 'Test product for production validation',
            },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?canceled=true`,
      allow_promotion_codes: true,
    })
    
    console.log('✅ Production session created:', testSession.id)
    
    return NextResponse.json({
      status: 'success',
      production: {
        stripeAccount: account.id,
        environment: isLive ? 'LIVE' : 'TEST',
        baseUrl: baseUrl,
        domain: 'offgigs.com',
        webhookUrl: `${baseUrl}/api/webhooks/stripe`
      },
      coupons: {
        count: coupons.data.length,
        available: coupons.data.map(c => ({
          id: c.id,
          name: c.name,
          percent_off: c.percent_off,
          valid: c.valid,
          duration: c.duration
        }))
      },
      testSession: {
        id: testSession.id,
        allow_promotion_codes: testSession.allow_promotion_codes,
        success_url: testSession.success_url,
        cancel_url: testSession.cancel_url,
        url: testSession.url
      },
      recommendations: [
        isLive ? '✅ Utilise les clés Stripe LIVE' : '⚠️ Utilise les clés Stripe TEST',
        baseUrl === 'https://offgigs.com' ? '✅ Base URL correcte' : '⚠️ Base URL incorrecte',
        coupons.data.length > 0 ? '✅ Coupons disponibles' : '⚠️ Aucun coupon trouvé',
        '🎫 Code à utiliser: OFFGIGS1'
      ]
    })
    
  } catch (error: any) {
    console.error('❌ Error testing production:', error)
    
    return NextResponse.json({
      status: 'error',
      error: error.message,
      code: error.code,
      type: error.type,
      environment: process.env.NODE_ENV,
      stripeKeyType: process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 'LIVE' : 'TEST',
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    }, { status: 500 })
  }
} 