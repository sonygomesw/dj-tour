import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET() {
  try {
    console.log('🔧 Fixing coupon issue...')
    
    // 1. Lister tous les coupons existants
    const existingCoupons = await stripe.coupons.list({ limit: 100 })
    console.log('📋 Existing coupons:', existingCoupons.data.length)
    
    // 2. Vérifier si OFFGIGS1 existe comme ID ou nom
    const offgigs1Coupon = existingCoupons.data.find(c => 
      c.id === 'OFFGIGS1' || c.name === 'OFFGIGS1'
    )
    
    console.log('🔍 OFFGIGS1 coupon found:', offgigs1Coupon ? 'Yes' : 'No')
    
    // 3. Créer un nouveau coupon avec l'ID exact OFFGIGS1
    let newCoupon = null
    if (!offgigs1Coupon || offgigs1Coupon.id !== 'OFFGIGS1') {
      console.log('🆕 Creating new OFFGIGS1 coupon...')
      
      try {
        // Supprimer l'ancien coupon s'il existe
        if (offgigs1Coupon) {
          await stripe.coupons.del(offgigs1Coupon.id)
          console.log('🗑️ Deleted old coupon:', offgigs1Coupon.id)
        }
        
        // Créer le nouveau coupon avec l'ID exact OFFGIGS1
        newCoupon = await stripe.coupons.create({
          id: 'OFFGIGS1', // ID exact pour que le code fonctionne
          percent_off: 100,
          duration: 'forever',
          name: 'OFFGIGS1 - 100% Off',
          metadata: {
            description: '100% discount for offgigs.com'
          }
        })
        
        console.log('✅ New OFFGIGS1 coupon created:', newCoupon.id)
      } catch (error: any) {
        console.error('❌ Error creating coupon:', error.message)
        
        // Si l'ID existe déjà, essayer de le récupérer
        if (error.code === 'resource_already_exists') {
          newCoupon = await stripe.coupons.retrieve('OFFGIGS1')
          console.log('✅ Retrieved existing OFFGIGS1 coupon')
        }
      }
    } else {
      newCoupon = offgigs1Coupon
      console.log('✅ OFFGIGS1 coupon already exists correctly')
    }
    
    // 4. Tester la création d'une session avec le coupon
    const testSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Test Product - Coupon Fix',
              description: 'Test product for coupon validation',
            },
            unit_amount: 0, // $0.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://offgigs.com/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://offgigs.com/?canceled=true',
      allow_promotion_codes: true,
    })
    
    console.log('✅ Test session created with promotion codes')
    
    // 5. Lister tous les coupons après correction
    const finalCoupons = await stripe.coupons.list({ limit: 100 })
    
    return NextResponse.json({
      status: 'success',
      action: 'coupon_fix_applied',
      coupon: newCoupon ? {
        id: newCoupon.id,
        name: newCoupon.name,
        percent_off: newCoupon.percent_off,
        valid: newCoupon.valid,
        duration: newCoupon.duration
      } : null,
      testSession: {
        id: testSession.id,
        allow_promotion_codes: testSession.allow_promotion_codes,
        url: testSession.url
      },
      allCoupons: finalCoupons.data.map(c => ({
        id: c.id,
        name: c.name,
        percent_off: c.percent_off,
        valid: c.valid
      })),
      instructions: [
        '🎫 Le coupon OFFGIGS1 a été corrigé',
        '✅ Utilisez le code exact : OFFGIGS1',
        '💰 Réduction : 100% (gratuit)',
        '🌐 Testez sur : https://offgigs.com'
      ]
    })
    
  } catch (error: any) {
    console.error('❌ Error fixing coupon:', error)
    
    return NextResponse.json({
      status: 'error',
      error: error.message,
      code: error.code,
      type: error.type
    }, { status: 500 })
  }
} 