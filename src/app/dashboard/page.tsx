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
import { Trophy, Target, ChevronRight, Play, Sparkles, TrendingUp, CheckCircle, User } from 'lucide-react'
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

export default function DashboardPage() {
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
          // Rediriger vers profile-setup après paiement réussi
          router.replace('/profile-setup?payment_success=true')
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
          // Vérifier si le profil est complet (dj_name, location, avatar_url sont requis)
          const isProfileComplete = profileData && 
            profileData.dj_name && 
            profileData.location && 
            profileData.avatar_url;

          if (!isProfileComplete) {
            router.push('/profile-setup')
            return
          }
          
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
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 items-center justify-center">
        <div className="text-gray-900 dark:text-white text-xl">Loading...</div>
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
      <div className="flex-1 ml-80 p-8 relative overflow-hidden">
        {/* Sophisticated Background Illustration */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* Primary gradient orb */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
          {/* Secondary gradient orb */}
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-blue-500/15 via-violet-500/10 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          {/* Accent gradient */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 flex items-center justify-center shadow-[0_8px_32px_rgba(139,92,246,0.3),0_3px_16px_rgba(139,92,246,0.2)] border border-white/10">
                  <User className="w-10 h-10 text-white drop-shadow-sm" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-gray-900">
                  Hey {profile?.dj_name || 'DJ'} 👋
                </h1>
                <p className="text-xl text-gray-600 font-light mt-2">
                  Manage your career and track your progress in real-time
                </p>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-900">Legend • Recognized DJ, ready to headline</span>
              </div>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Profile Card */}
            <div className="lg:row-span-2">
              <DJProfileCard profile={profile} />
            </div>
            
            {/* Bookability Score */}
            <GlassContainer className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Bookability Score</h3>
                  <p className="text-sm text-gray-600">Your booking potential</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">
                  {bookabilityScore}
                </div>
                <div className="text-sm text-gray-600 mb-4">out of 100</div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Instagram (2.5M)</span>
                    <span className="text-gray-900">50 pts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Spotify (47,000)</span>
                    <span className="text-gray-900">30 pts</span>
                  </div>
                </div>
              </div>
            </GlassContainer>
            
            {/* Social Stats */}
            <div>
              <SocialStats stats={stats} />
            </div>
          </div>

          {/* Progress Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Global Progress */}
            <GlassContainer className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Global Progress</h3>
                  <p className="text-sm text-gray-600">Your overall advancement</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total progress</span>
                  <span className="text-2xl font-bold text-gray-900">100%</span>
                </div>
                <ProgressBar progress={100} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">1000 points earned</span>
                  <span className="text-gray-900">1000 total points</span>
                </div>
              </div>
            </GlassContainer>
            
            {/* Next Mission */}
            <GlassContainer className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                    <Play className="w-6 h-6 text-violet-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Next Mission</h3>
                    <p className="text-sm text-gray-600">Continue your journey</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-violet-600 border-violet-600 hover:bg-violet-50"
                >
                  View all <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Instagram & TikTok Setup</h4>
                    <p className="text-sm text-gray-600">Create or optimize your Instagram & TikTok profile with a clear bio, HD profile, and music links.</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600">
                  Start Mission
                </Button>
              </div>
            </GlassContainer>
          </div>

          {/* Recent Missions */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Missions</h2>
                  <p className="text-gray-600">Your latest achievements</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="text-violet-600 border-violet-600 hover:bg-violet-50"
              >
                View all missions <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missions.slice(0, 3).map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 