'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { DJSidebar } from '@/components/ui/DJSidebar'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { TrendingUp, Save, RotateCcw, Trophy, Sparkles, BarChart3 } from 'lucide-react'
import { SpotifyIcon, TikTokIcon, InstagramIcon } from '@/components/icons/brand-icons'
import { calculateBookabilityScore, formatNumber, getLevelColor, getLevelGradient, BookabilityResult } from '@/lib/bookability'

interface UserStats {
  spotify_listeners: number
  instagram_followers: number
  tiktok_followers: number
  gigs_played: number
  motivation: number
  notes: string | null
  date: string
}

export default function StatsPage() {
  const [user, setUser] = useState<any>(null)
  const [currentStats, setCurrentStats] = useState<UserStats | null>(null)
  const [formData, setFormData] = useState({
    instagram_followers: 0,
    spotify_listeners: 0,
    tiktok_followers: 0,
    gigs_played: 0,
    motivation: 8,
    notes: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [bookabilityResult, setBookabilityResult] = useState<BookabilityResult | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserAndStats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push('/auth')
          return
        }

        setUser(user)

        // Get latest statistics
        const { data: statsData, error: statsError } = await supabase
          .from('stats')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false })
          .limit(1)
          .single()

        if (statsData) {
          setCurrentStats(statsData)
          setFormData({
            instagram_followers: statsData.instagram_followers,
            spotify_listeners: statsData.spotify_listeners,
            tiktok_followers: statsData.tiktok_followers,
            gigs_played: statsData.gigs_played,
            motivation: statsData.motivation,
            notes: statsData.notes || ''
          })
        }

      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndStats()
  }, [router])

      // Recalculate score on each change
  useEffect(() => {
    const result = calculateBookabilityScore({
      instagramFollowers: formData.instagram_followers,
      spotifyListeners: formData.spotify_listeners
    })
    setBookabilityResult(result)
  }, [formData.instagram_followers, formData.spotify_listeners])

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    setMessage('')

    try {
      const today = new Date().toISOString().split('T')[0]

      // Check if entry already exists for today
      const { data: existingData } = await supabase
        .from('stats')
        .select('id')
        .eq('user_id', user.id)
        .eq('date', today)
        .single()

      if (existingData) {
        // Update existing entry
        const { error } = await supabase
          .from('stats')
          .update({
            instagram_followers: formData.instagram_followers,
            spotify_listeners: formData.spotify_listeners,
            tiktok_followers: formData.tiktok_followers,
            gigs_played: formData.gigs_played,
            motivation: formData.motivation,
            notes: formData.notes || null
          })
          .eq('id', existingData.id)

        if (error) throw error
      } else {
        // Create new entry
        const { error } = await supabase
          .from('stats')
          .insert([{
            user_id: user.id,
            date: today,
            instagram_followers: formData.instagram_followers,
            spotify_listeners: formData.spotify_listeners,
            tiktok_followers: formData.tiktok_followers,
            gigs_played: formData.gigs_played,
            motivation: formData.motivation,
            notes: formData.notes || null
          }])

        if (error) throw error
      }

              setMessage('Statistics updated successfully!')
      
              // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error) {
      console.error('Save error:', error)
      setMessage('Error during save')
    } finally {
      setSaving(false)
    }
  }

  const resetToCurrentStats = () => {
    if (currentStats) {
      setFormData({
        instagram_followers: currentStats.instagram_followers,
        spotify_listeners: currentStats.spotify_listeners,
        tiktok_followers: currentStats.tiktok_followers,
        gigs_played: currentStats.gigs_played,
        motivation: currentStats.motivation,
        notes: currentStats.notes || ''
      })
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-white items-center justify-center transition-colors duration-300">
        <div className="text-gray-900 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white transition-colors duration-300">
      <DJSidebar />
      <div className="flex-1 ml-80 p-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-blue-500/8 via-violet-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 flex items-center justify-center shadow-[0_8px_32px_rgba(139,92,246,0.3),0_3px_16px_rgba(139,92,246,0.2)] border border-white/10">
                <TrendingUp className="w-8 h-8 text-white drop-shadow-sm" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Update my statistics</h1>
              <div className="h-0.5 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mt-2"></div>
            </div>
          </div>
          <p className="text-xl text-gray-600 font-light">
            Keep your statistics up to date to track your progress accurately
          </p>
        </div>

        {/* Stats Form */}
        <div className="relative z-10">
          <GlassContainer className="p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-violet-400" />
              Current Statistics
            </h3>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white shadow-sm border border-gray-200 flex items-center justify-center">
                      <SpotifyIcon className="w-4 h-4" />
                    </div>
                    Spotify Monthly Listeners
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.spotify_listeners}
                    onChange={(e) => setFormData(prev => ({ ...prev, spotify_listeners: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white shadow-sm border border-gray-200 flex items-center justify-center">
                      <InstagramIcon className="w-4 h-4 text-pink-500" />
                    </div>
                    Instagram Followers
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.instagram_followers}
                    onChange={(e) => setFormData(prev => ({ ...prev, instagram_followers: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white shadow-sm border border-gray-200 flex items-center justify-center">
                      <TikTokIcon className="w-4 h-4 text-gray-900" />
                    </div>
                    TikTok Followers
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.tiktok_followers}
                    onChange={(e) => setFormData(prev => ({ ...prev, tiktok_followers: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Gigs Played (This Month)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.gigs_played}
                    onChange={(e) => setFormData(prev => ({ ...prev, gigs_played: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Motivation Level (1-10)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.motivation}
                    onChange={(e) => setFormData(prev => ({ ...prev, motivation: parseInt(e.target.value) }))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center text-gray-900 text-lg font-semibold mt-2">
                    {formData.motivation}/10
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                  placeholder="Any additional notes about your progress..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600"
              >
                {loading ? 'Saving...' : 'Update Statistics'}
              </Button>
            </form>
          </GlassContainer>

          {/* Bookability Score Preview */}
          {bookabilityResult && (
            <GlassContainer className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-violet-400" />
                Your Bookability Score
              </h3>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">
                  {bookabilityResult.totalScore}
                </div>
                <div className="text-lg text-gray-600">out of 100</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Instagram ({formatNumber(bookabilityResult.instagramFollowers)})
                  </span>
                  <span className="text-gray-900 font-medium">
                    {bookabilityResult.instagramScore} pts
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Spotify ({formatNumber(bookabilityResult.spotifyListeners)})
                  </span>
                  <span className="text-gray-900 font-medium">
                    {bookabilityResult.spotifyScore} pts
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">{bookabilityResult.totalScore} pts</span>
                  </div>
                </div>
              </div>
            </GlassContainer>
          )}
        </div>
      </div>
    </div>
  )
} 