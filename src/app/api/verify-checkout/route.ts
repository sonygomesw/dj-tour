import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return NextResponse.json({ 
      paid: session.payment_status === 'paid',
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_details?.email,
        amount_total: session.amount_total,
        currency: session.currency
      }
    })
  } catch (err) {
    console.error('Error retrieving session:', err)
    return NextResponse.json({ error: 'Error retrieving session' }, { status: 500 })
  }
} 