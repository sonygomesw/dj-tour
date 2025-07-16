'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { User, Mail, MapPin, Music, Upload, ArrowRight, Sparkles, TrendingUp, CheckCircle } from 'lucide-react'
import { SpotifyIcon, TikTokIcon, InstagramIcon } from '@/components/icons/brand-icons'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function ProfileSetupPage() {
  const searchParams = useSearchParams()
  const paymentSuccess = searchParams.get('payment_success') === 'true'
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    dj_name: '',
    location: '',
    instagram: '',
    tiktok: '',
    spotify: '',
    avatar_url: '',
    // Statistiques de followers (seulement les 3 plateformes du dashboard)
    instagram_followers: 0,
    tiktok_followers: 0,
    spotify_listeners: 0
  })

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
      } else {
        setUser(user)
        
        // Vérifier si l'utilisateur a déjà un profil complet
        const { data: profileData } = await supabase
          .from('profiles')
          .select('dj_name, location, avatar_url')
          .eq('id', user.id)
          .single()
        
        // Si le profil n'est pas complet, rester sur profile-setup
        if (!profileData || !profileData.dj_name || !profileData.location || !profileData.avatar_url) {
          // Rester sur la page profile-setup pour compléter le profil
          console.log('Profil incomplet, rester sur profile-setup')
        }
      }
    }
    getUser()
  }, [router])

  // Nettoyer l'URL après avoir affiché le message de succès
  useEffect(() => {
    if (paymentSuccess) {
      const timer = setTimeout(() => {
        router.replace('/profile-setup')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [paymentSuccess, router])

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image')
      }

      const file = event.target.files[0]
      
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File is too large (max 5MB)')
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image')
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${user?.id}.${fileExt}`
      const filePath = fileName

      try {
        // Essayer d'uploader vers Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file, { upsert: true })

        if (uploadError) {
          console.error('Supabase Storage Error:', uploadError)
          throw new Error('Storage not available')
        }

        const { data } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath)

        setFormData(prev => ({ ...prev, avatar_url: data.publicUrl }))
        
      } catch (storageError) {
        console.warn('Fallback vers Base64:', storageError)
        
        // Fallback vers Base64 si Supabase Storage échoue
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setFormData(prev => ({ ...prev, avatar_url: e.target!.result as string }))
          }
        }
        reader.onerror = () => {
          throw new Error('File reading error')
        }
        reader.readAsDataURL(file)
      }
      
    } catch (error) {
      console.error('Complete upload error:', error)
      setMessage(error instanceof Error ? error.message : 'Image upload error')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
          // Update profile
    const { error: profileError } = await supabase
      .from('profiles')
        .update({
          dj_name: formData.dj_name,
          location: formData.location,
          instagram: formData.instagram,
          tiktok: formData.tiktok,
          spotify: formData.spotify,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id)

      if (profileError) throw profileError

      // Create initial statistics entry
      const { error: statsError } = await supabase
        .from('stats')
        .insert([{
          user_id: user?.id,
          date: new Date().toISOString().split('T')[0], // Date du jour
          spotify_listeners: formData.spotify_listeners || 0,
          instagram_followers: formData.instagram_followers || 0,
          tiktok_followers: formData.tiktok_followers || 0,
          gigs_played: 0, // Initialisé à 0
          motivation: 8, // Motivation par défaut
          notes: 'Initial statistics during profile creation'
        }])

      if (statsError) {
        // If error is due to duplicate (same date), update
        if (statsError.code === '23505') {
          const { error: updateError } = await supabase
            .from('stats')
            .update({
              spotify_listeners: formData.spotify_listeners || 0,
              instagram_followers: formData.instagram_followers || 0,
              tiktok_followers: formData.tiktok_followers || 0,
              notes: 'Statistics updated during profile configuration'
            })
            .eq('user_id', user?.id)
            .eq('date', new Date().toISOString().split('T')[0])
          
          if (updateError) throw updateError
        } else {
          throw statsError
        }
      }

      router.push('/dashboard')
    } catch (error) {
      console.error('Profile update error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Payment Success Message */}
        {paymentSuccess && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg border border-green-400/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6" />
                <div>
                  <h3 className="text-lg font-semibold">🎉 Payment confirmed!</h3>
                  <p className="text-green-100">Welcome to the offgigs community. Now configure your profile to start your DJ journey.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 flex items-center justify-center shadow-[0_8px_32px_rgba(139,92,246,0.3),0_3px_16px_rgba(139,92,246,0.2)] border border-white/10">
                <User className="w-8 h-8 text-white drop-shadow-sm" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Configure your profile</h1>
              <div className="h-0.5 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mt-2"></div>
            </div>
          </div>
          <p className="text-xl text-gray-600 font-light">
            Complete your profile to personalize your DJ journey
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile photo */}
            <div className="lg:col-span-2">
              <GlassContainer className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <Upload className="w-6 h-6 text-violet-400" />
                  Profile Photo
                </h3>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    {formData.avatar_url ? (
                      <Image
                        src={formData.avatar_url}
                        alt="Avatar"
                        width={120}
                        height={120}
                        className="w-32 h-32 rounded-2xl object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={uploadAvatar}
                      className="hidden"
                    />
                    <label 
                      htmlFor="avatar" 
                      className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-gray-300 bg-white text-gray-900 font-medium transition-all duration-200 cursor-pointer ${
                        uploading 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-gray-50 hover:scale-105'
                      }`}
                    >
                      {uploading ? 'Uploading...' : 'Choose a photo'}
                    </label>
                                          <p className="text-sm text-gray-600 mt-2">
                        Recommended format: JPG, PNG (max 5MB)
                      </p>
                  </div>
                </div>
              </GlassContainer>
            </div>

            {/* Error message */}
            {message && (
              <div className="lg:col-span-2">
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700">
                  {message}
                </div>
              </div>
            )}

            {/* Informations personnelles */}
            <div className="lg:col-span-2">
              <GlassContainer className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-violet-400" />
                                     Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                             DJ Name *
                    </label>
                    <input
                      type="text"
                      value={formData.dj_name}
                      onChange={(e) => setFormData({...formData, dj_name: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                      placeholder="Ex: DJ Snake"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                             Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                        placeholder="Ex: Paris, France"
                        required
                      />
                    </div>
                  </div>
                </div>
              </GlassContainer>
            </div>

            {/* Réseaux sociaux */}
            <div className="lg:col-span-2">
              <GlassContainer className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <Music className="w-6 h-6 text-violet-400" />
                                     Social Media
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <InstagramIcon className="w-5 h-5 text-pink-500" />
                      Instagram
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">@</span>
                      <input
                        type="text"
                        value={formData.instagram}
                        onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                                                 placeholder="your_instagram_handle"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <TikTokIcon className="w-5 h-5 text-gray-900" />
                      TikTok
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">@</span>
                      <input
                        type="text"
                        value={formData.tiktok}
                        onChange={(e) => setFormData({...formData, tiktok: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                                                 placeholder="your_tiktok_handle"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Spotify
                    </label>
                    <div className="relative">
                      <SpotifyIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                      <input
                        type="url"
                        value={formData.spotify}
                        onChange={(e) => setFormData({...formData, spotify: e.target.value})}
                        className="w-full pl-14 pr-4 py-3 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                        placeholder="https://open.spotify.com/artist/..."
                      />
                    </div>
                  </div>
                </div>
              </GlassContainer>
            </div>

            {/* Statistiques */}
            <div className="lg:col-span-2">
              <GlassContainer className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-violet-400" />
                                     Current Statistics
                </h3>
                                 <p className="text-gray-600 mb-6">
                   This information helps us personalize your experience and track your progress.
                 </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <SpotifyIcon className="w-5 h-5" />
                                             Spotify Monthly Listeners
                    </label>
                    <input
                      type="number"
                      value={formData.spotify_listeners}
                      onChange={(e) => setFormData({...formData, spotify_listeners: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <InstagramIcon className="w-5 h-5 text-pink-500" />
                                             Instagram Followers
                    </label>
                    <input
                      type="number"
                      value={formData.instagram_followers}
                      onChange={(e) => setFormData({...formData, instagram_followers: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <TikTokIcon className="w-5 h-5 text-gray-900" />
                                             TikTok Followers
                    </label>
                    <input
                      type="number"
                      value={formData.tiktok_followers}
                      onChange={(e) => setFormData({...formData, tiktok_followers: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                      placeholder="0"
                    />
                  </div>
                </div>
              </GlassContainer>
            </div>
          </div>

          <div className="mt-12 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard')}
              className="hover:scale-105 transition-transform duration-200"
            >
              Skip this step
            </Button>
            <Button
              type="submit"
              variant="gradient"
              disabled={loading || !formData.dj_name}
              className="hover:scale-105 transition-transform duration-200"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {loading ? 'Saving...' : 'Complete setup'}
            </Button>
          </div>
        </form>

        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-violet-500/5 via-fuchsia-500/3 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-blue-500/5 via-violet-500/3 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-pink-500/8 to-transparent rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  )
} 