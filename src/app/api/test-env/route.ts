import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    hasBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
    allEnvVars: {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      hasPublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL
    }
  })
} 