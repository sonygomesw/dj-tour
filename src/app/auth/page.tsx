'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, Lock, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { Button } from '@/components/ui/button'

export default function AuthPage() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const redirect = searchParams.get('redirect')
  
  const [isLogin, setIsLogin] = useState(mode !== 'signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleCheckoutAfterSignup = async () => {
    try {
      setLoading(true)
      setMessage('Redirecting to payment...')
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: 'offgigs-lifetime' }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Rediriger vers Stripe Checkout
      const { loadStripe } = await import('@stripe/stripe-js')
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          throw error
        }
      } else {
        throw new Error('Failed to load Stripe')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setMessage('Error processing payment. Please try again.')
      setLoading(false)
    }
  }

  useEffect(() => {
    // Update mode if URL parameter changes
    setIsLogin(mode !== 'signup')
  }, [mode])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) throw error
        
        if (data.user) {
          // Si l'utilisateur vient pour un paiement, rediriger vers checkout
          if (redirect === 'checkout') {
            setTimeout(() => {
              handleCheckoutAfterSignup()
            }, 1000)
          } else {
            // Sinon, rediriger vers dashboard
            setTimeout(() => {
              router.push('/dashboard')
            }, 500)
          }
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        })
        
        if (error) throw error
        
        if (data.user?.identities?.length === 0) {
          setMessage('An account already exists with this email. Please log in.')
          setIsLogin(true)
        } else if (data.user) {
          // Si l'utilisateur vient pour un paiement, rediriger vers checkout
          if (redirect === 'checkout') {
            setTimeout(() => {
              handleCheckoutAfterSignup()
            }, 1000)
          } else {
            // Sinon, rediriger vers profile-setup
            setTimeout(() => {
              router.push('/profile-setup')
            }, 500)
          }
        }
      }
    } catch (error: unknown) {
      console.error('Auth error:', error)
      if (error instanceof Error) {
        console.error('Error message:', error.message)
        console.error('Error details:', error)
        setMessage(error.message)
      } else {
        console.error('Unknown error:', error)
        setMessage('An error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F0F11] transition-colors duration-300">
      <div className="relative z-10 max-w-lg mx-auto px-6 py-8">
        {/* Header with improved spacing */}
        <div className="flex flex-col gap-8 mb-12">
          {/* Back link */}
          <div className="flex justify-start">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-gray-900 dark:text-white transition-colors hover:scale-105 transition-transform duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Link>
          </div>
          
          {/* Centered logo and title */}
          <div className="flex flex-col items-center text-center gap-6">
            {/* Title and description */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {isLogin ? 'Login' : 'Sign Up'}
              </h1>
              <p className="text-lg text-gray-600 dark:text-white/70 font-light leading-relaxed">
                {redirect === 'checkout' 
                  ? (isLogin 
                      ? 'Log in to continue with your purchase'
                      : 'Create your account to access DJ Tour Pro'
                    )
                  : (isLogin 
                      ? 'Log in to access your missions'
                      : 'Create your account to start your DJ journey'
                    )
                }
              </p>
            </div>
          </div>
        </div>

        {/* Auth Form with improved shadow */}
        <GlassContainer className="p-8 backdrop-blur-2xl bg-white/[0.02] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(139,92,246,0.1)] hover:shadow-[0_12px_48px_rgba(139,92,246,0.15),0_4px_24px_rgba(0,0,0,0.1)] transition-all duration-500">
          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-700 dark:text-white/80 mb-3">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 dark:text-white/40 w-5 h-5" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200 backdrop-blur-xl"
                    placeholder="Your DJ name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-700 dark:text-white/80 mb-3">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 dark:text-white/40 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200 backdrop-blur-xl"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-700 dark:text-white/80 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 dark:text-white/40 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200 backdrop-blur-xl"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-2xl backdrop-blur-xl ${
                message.includes('Check') 
                  ? 'bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-200' 
                  : 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-200'
              }`}>
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              variant="gradient"
              className="w-full py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200"
            >
              {loading ? 'Loading...' : (isLogin ? 'Log In' : 'Sign Up')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage('');
                setEmail('');
                setPassword('');
                setName('');
              }}
              className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
            >
              {isLogin 
                ? 'Don\'t have an account? Sign up'
                : 'Already have an account? Log in'
              }
            </button>
          </div>
        </GlassContainer>

        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-violet-500/20 via-fuchsia-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-blue-500/20 via-violet-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-pink-500/25 to-transparent rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  )
} 