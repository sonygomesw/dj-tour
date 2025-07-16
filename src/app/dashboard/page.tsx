'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { DJSidebar } from '@/components/ui/DJSidebar'
import { DJProfileCard } from '@/components/ui/DJProfileCard'
import { SocialStats } from '@/components/ui/SocialStats'
import { MissionCard } from '@/components/ui/MissionCard'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/button'

import missions from '@/data/missions'
import { Trophy, Target, ChevronRight, Play, Sparkles, TrendingUp, CheckCircle } from 'lucide-react'
import { getLevelIcon, getLevelInfo } from '@/components/icons/level-icons'
import { calculateBookabilityScore, formatNumber, getLevelColor, getLevelGradient } from '@/lib/bookability'

interface UserProfile {
  id: string
  full_name: string | null
  dj_name: string | null
  bio: string | null
  location: string | null
  avatar_url: string | null
  instagram: string | null
  tiktok: string | null
  spotify: string | null
  soundcloud: string | null
  beatport: string | null
}

interface UserStats {
  spotify_listeners: number
  instagram_followers: number
  tiktok_followers: number
  gigs_played: number
  date: string
}

function DashboardContent() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [paymentVerified, setPaymentVerified] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { user, loading: authLoading } = useAuth()

  // Vérification du paiement
  useEffect(() => {
    async function verifySession() {
      if (!sessionId) return

      try {
        const res = await fetch(`/api/verify-checkout?session_id=${sessionId}`)
        const data = await res.json()

        if (data.paid) {
          console.log('✅ Paiement confirmé')
          setPaymentVerified(true)
          // Nettoyer l'URL après vérification
          router.replace('/dashboard')
        } else {
          console.warn('❌ Paiement non confirmé')
          router.push('/?payment_failed=true')
        }
      } catch (err) {
        console.error('Erreur de vérification Stripe:', err)
      }
    }

    verifySession()
  }, [sessionId, router])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          router.push('/auth')
          return
        }

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Profile fetch error:', profileError)
          if (profileError.code === 'PGRST116') {
            router.push('/profile-setup')
            return
          }
        } else {
          setProfile(profileData)
        }

        // Fetch latest stats
        const { data: statsData, error: statsError } = await supabase
          .from('stats')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false })
          .limit(1)
          .single()

        if (statsError && statsError.code !== 'PGRST116') {
          console.error('Stats fetch error:', statsError)
        } else if (statsData) {
          setStats(statsData)
        }

      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchUserData()
    }
  }, [router, user, authLoading])

  if (loading || authLoading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center">
        <div className="text-gray-900 text-xl">Loading...</div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  // Calculate Bookability Score dynamically
  const bookabilityData = {
    instagramFollowers: stats?.instagram_followers || 0,
    spotifyListeners: stats?.spotify_listeners || 0
  }
  
  const bookabilityResult = calculateBookabilityScore(bookabilityData)
  const bookabilityScore = bookabilityResult.totalScore

  // Global progress based on score
  const globalProgress = bookabilityScore
  const totalPoints = 1000
  const earnedPoints = Math.round((bookabilityScore / 100) * totalPoints)

  // Next mission
  const nextMission = missions[0]

  // Social stats (with real user data)
  const socialStats = {
    spotify: {
      current: formatNumber(stats?.spotify_listeners || 0),
      trend: '+2.3%', // To be calculated later with history
      label: 'SPOTIFY'
    },
    tiktok: {
      current: formatNumber(stats?.tiktok_followers || 0),
      trend: '+12.5%', // To be calculated later with history
      label: 'TIKTOK'
    },
    instagram: {
      current: formatNumber(stats?.instagram_followers || 0),
      trend: '+5.8%', // To be calculated later with history
      label: 'INSTAGRAM'
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DJSidebar />
      <div className="flex-1 ml-96 p-16 relative overflow-hidden">
        {/* Sophisticated Background Illustration */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* Primary gradient orb */}
          <div className="absolute top-32 right-32 w-96 h-96 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent rounded-full blur-3xl"></div>
          {/* Secondary gradient orb */}
          <div className="absolute top-64 right-64 w-64 h-64 bg-gradient-to-tl from-blue-500/15 via-purple-500/8 to-transparent rounded-full blur-2xl"></div>
          {/* Tertiary accent */}
          <div className="absolute top-48 right-48 w-32 h-32 bg-gradient-to-br from-pink-500/25 to-transparent rounded-full blur-xl"></div>
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </div>

        {/* Payment Success Message */}
        {paymentVerified && (
          <div className="relative z-10 mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg border border-green-400/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6" />
                <div>
                  <h3 className="text-lg font-semibold">🎉 Paiement confirmé !</h3>
                  <p className="text-green-100">Bienvenue dans la communauté offgigs. Tu as maintenant accès à toutes les fonctionnalités premium.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative z-10 mb-20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Premium Icon Badge */}
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 flex items-center justify-center shadow-[0_8px_32px_rgba(139,92,246,0.3),0_3px_16px_rgba(139,92,246,0.2)] border border-white/10">
                    <TrendingUp className="w-10 h-10 text-white drop-shadow-sm" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-black bg-gradient-to-br from-gray-900 via-violet-700 to-violet-500 text-transparent bg-clip-text leading-none tracking-tight">
                    {profile.dj_name ? `Hey ${profile.dj_name}` : 'Dashboard'}
                  </h1>
                  <div className="h-3 w-24 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mt-2"></div>
                </div>
              </div>
              
              <p className="text-2xl text-gray-700 font-light leading-relaxed max-w-2xl">
                {profile.bio || 'Manage your career and track your progress in real-time'}
              </p>
              
              {/* Level and information */}
              <div className="mt-6 flex items-center gap-4">
                <div className={`flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 border border-violet-200/50 backdrop-blur-sm`}>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getLevelInfo(bookabilityResult.level).colors.gradient} p-0.5`}>
                    <div className="w-full h-full rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      {(() => {
                        const LevelIcon = getLevelIcon(bookabilityResult.level);
                        return <LevelIcon className="w-5 h-5 text-gray-900 drop-shadow-sm" />;
                      })()}
                    </div>
                  </div>
                  <span className={`text-sm font-medium text-gray-900`}>
                    {getLevelInfo(bookabilityResult.level).name} • {getLevelInfo(bookabilityResult.level).description}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">{bookabilityScore}</div>
                <div className="text-sm text-gray-600 font-medium">Score</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-1">{globalProgress}%</div>
                <div className="text-sm text-gray-600 font-medium">Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="relative z-10 space-y-12">
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Profile */}
            <div className="space-y-8">
              <GlassContainer className="p-0 backdrop-blur-2xl bg-white/[0.02] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(139,92,246,0.15),0_4px_24px_rgba(0,0,0,0.1)] transition-all duration-500">
                <DJProfileCard
                  name={profile.dj_name || profile.full_name || 'DJ'}
                  level={bookabilityResult.level.toString()}
                  points={earnedPoints}
                  maxPoints={totalPoints}
                  imageUrl={profile.avatar_url || '/images/profile/default-dj.svg'}
                />
              </GlassContainer>
            </div>
            
            {/* Middle Column - Stats & Progress */}
            <div className="space-y-8">
              {/* Bookability Score */}
              <GlassContainer className="p-8 backdrop-blur-2xl bg-white/[0.02] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(139,92,246,0.15),0_4px_24px_rgba(0,0,0,0.1)] transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 flex items-center justify-center shadow-[0_8px_32px_rgba(139,92,246,0.3),0_3px_16px_rgba(139,92,246,0.2)] border border-white/10">
                    <Trophy className="w-6 h-6 text-white drop-shadow-sm" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 tracking-wide">
                    Bookability Score
                  </h3>
                </div>
                <div className="flex flex-col items-center space-y-6">
                  <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
                    {bookabilityScore}
                  </span>
                  <ProgressBar 
                    progress={bookabilityScore} 
                    className="h-6 rounded-full"
                    color={getLevelGradient(bookabilityResult.level)}
                    showValue
                  />
                  
                  {/* Score breakdown */}
                  <div className="w-full space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Instagram ({formatNumber(bookabilityData.instagramFollowers)})</span>
                      <span className="text-gray-900 font-medium">{bookabilityResult.instagramScore} pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Spotify ({formatNumber(bookabilityData.spotifyListeners)})</span>
                      <span className="text-gray-900 font-medium">{bookabilityResult.spotifyScore} pts</span>
                    </div>
                  </div>
                </div>
              </GlassContainer>
              
              {/* Global Progress */}
              <GlassContainer className="p-8 backdrop-blur-2xl bg-white/[0.02] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(139,92,246,0.15),0_4px_24px_rgba(0,0,0,0.1)] transition-all duration-500">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Global Progress</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-600">Total progress</span>
                    <span className="text-4xl font-bold text-gray-900">{globalProgress}%</span>
                  </div>
                  <ProgressBar 
                    progress={globalProgress} 
                    className="h-5"
                    color={getLevelGradient(bookabilityResult.level)}
                    showValue
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{earnedPoints} points earned</span>
                    <span>{totalPoints} total points</span>
                  </div>
                </div>
              </GlassContainer>
              
              {/* Next Mission */}
              <GlassContainer className="p-8 backdrop-blur-2xl bg-white/[0.02] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(139,92,246,0.15),0_4px_24px_rgba(0,0,0,0.1)] transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Next Mission</h3>
                  <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />} className="hover:scale-105 transition-transform duration-200">
                    View all
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-violet-500/10">
                      <Trophy className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{nextMission.title}</h4>
                      <p className="text-gray-600 text-sm">{nextMission.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant="gradient"
                    className="w-full hover:scale-105 transition-transform duration-200"
                    leftIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Start mission
                  </Button>
                </div>
              </GlassContainer>
            </div>
            
            {/* Right Column - Social Stats */}
            <div className="space-y-8">
              <GlassContainer className="p-0 backdrop-blur-2xl bg-white/[0.02] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(139,92,246,0.15),0_4px_24px_rgba(0,0,0,0.1)] transition-all duration-500">
                <SocialStats 
                  stats={socialStats} 
                  onUpdateStats={() => router.push('/stats')}
                />
              </GlassContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center">
        <div className="text-gray-900 text-xl">Loading...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
