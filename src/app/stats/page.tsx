'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { DJSidebar } from '@/components/ui/DJSidebar'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { TrendingUp, Save, RotateCcw, Trophy, Sparkles } from 'lucide-react'
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
      <div className="flex min-h-screen bg-white dark:bg-[#0F0F11] items-center justify-center transition-colors duration-300 scale-75 origin-top-left">
        <div className="text-gray-900 dark:text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0F0F11] transition-colors duration-300 scale-75 origin-top-left">
      <DJSidebar />
      <div className="flex-1 ml-96 p-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-32 right-32 w-96 h-96 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 left-32 w-64 h-64 bg-gradient-to-tl from-blue-500/15 via-purple-500/8 to-transparent rounded-full blur-2xl"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 mb-12">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 flex items-center justify-center shadow-[0_8px_32px_rgba(139,92,246,0.3),0_3px_16px_rgba(139,92,246,0.2)] border border-white/10">
                <TrendingUp className="w-8 h-8 text-gray-900 dark:text-white drop-shadow-sm" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-2.5 h-2.5 text-gray-900 dark:text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Update my statistics</h1>
              <div className="h-0.5 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mt-2"></div>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-white/70 font-light">
            Update your statistics to recalculate your Bookability Score
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Update form */}
          <div className="space-y-8">
            <GlassContainer className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-violet-400" />
                </div>
                                  Platform statistics
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-700 dark:text-white/80 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white shadow-sm border border-white/20 flex items-center justify-center">
                      <InstagramIcon className="w-4 h-4 text-[#E4405F]" />
                    </div>
                    Followers Instagram
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.instagram_followers}
                    onChange={(e) => setFormData(prev => ({ ...prev, instagram_followers: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-700 dark:text-white/80 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white shadow-sm border border-white/20 flex items-center justify-center">
                      <SpotifyIcon className="w-4 h-4 text-[#1DB954]" />
                    </div>
                    Spotify monthly listeners
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.spotify_listeners}
                    onChange={(e) => setFormData(prev => ({ ...prev, spotify_listeners: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-700 dark:text-white/80 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white shadow-sm border border-white/20 flex items-center justify-center">
                      <TikTokIcon className="w-4 h-4 text-[#FE2C55]" />
                    </div>
                    Followers TikTok
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.tiktok_followers}
                    onChange={(e) => setFormData(prev => ({ ...prev, tiktok_followers: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-700 dark:text-white/80 mb-3">
                    Gigs played
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.gigs_played}
                    onChange={(e) => setFormData(prev => ({ ...prev, gigs_played: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-700 dark:text-white/80 mb-3">
                    Motivation (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.motivation}
                    onChange={(e) => setFormData(prev => ({ ...prev, motivation: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-center text-gray-900 dark:text-white text-lg font-semibold mt-2">
                    {formData.motivation}/10
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-700 dark:text-white/80 mb-3">
                    Notes (optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                    placeholder="Add notes about your progress..."
                  />
                </div>
              </div>
            </GlassContainer>

            {/* Action buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleSave}
                disabled={saving}
                variant="gradient"
                className="flex-1 hover:scale-105 transition-transform duration-200"
                leftIcon={<Save className="w-4 h-4" />}
              >
                {saving ? 'Saving...' : 'Save'}
              </Button>
              
              <Button
                onClick={resetToCurrentStats}
                variant="outline"
                className="hover:scale-105 transition-transform duration-200"
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Reset
              </Button>
            </div>

            {/* Message */}
            {message && (
              <div className={`p-4 rounded-2xl ${
                message.includes('successfully') 
                  ? 'bg-green-500/10 border border-green-500/20 text-green-200' 
                  : 'bg-red-500/10 border border-red-500/20 text-red-200'
              }`}>
                {message}
              </div>
            )}
          </div>

                      {/* Real-time score preview */}
          <div className="space-y-8">
            {bookabilityResult && (
              <GlassContainer className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                                      Bookability Score Preview
                </h3>
                
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <div className="text-6xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
                      {bookabilityResult.totalScore}
                    </div>
                    <div className={`text-lg font-medium ${getLevelColor(bookabilityResult.level)}`}>
                      Level {bookabilityResult.level} • {bookabilityResult.levelName}
                    </div>
                  </div>

                  <ProgressBar 
                    progress={bookabilityResult.totalScore} 
                    className="h-4 rounded-full"
                    color={getLevelGradient(bookabilityResult.level)}
                    showValue
                  />

                  {/* Score breakdown */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-white/60">
                        Instagram ({formatNumber(formData.instagram_followers)})
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {bookabilityResult.instagramScore} pts
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-white/60">
                        Spotify ({formatNumber(formData.spotify_listeners)})
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {bookabilityResult.spotifyScore} pts
                      </span>
                    </div>
                    <hr className="border-white/20" />
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-gray-900 dark:text-white">{bookabilityResult.totalScore} pts</span>
                    </div>
                  </div>

                  {/* Tips to improve score */}
                  <div className="mt-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-2xl text-left">
                                          <h4 className="text-violet-200 font-medium mb-2">💡 Tips to improve your score:</h4>
                    <ul className="text-violet-200/80 text-sm space-y-1">
                      {bookabilityResult.instagramScore < 30 && (
                                                  <li>• Develop your Instagram presence (goal: 10k+ followers)</li>
                      )}
                      {bookabilityResult.spotifyScore < 25 && (
                        <li>• Augmentez vos auditeurs Spotify (objectif : 150k+ listeners)</li>
                      )}
                      {bookabilityResult.totalScore >= 80 && (
                                                  <li>• Excellent score! Keep up the momentum 🚀</li>
                      )}
                    </ul>
                  </div>
                </div>
              </GlassContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 