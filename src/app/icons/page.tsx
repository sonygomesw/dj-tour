'use client'
import { DJSidebar } from '@/components/ui/DJSidebar'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { AllIconsPreview } from '@/components/ui/IconSelector'
import { MissionIcon } from '@/components/icons/mission-icons'
import { SpotifyIcon, InstagramIcon } from '@/components/icons/custom-icons'
import { SpotifyIcon as SpotifyBrandIcon, TikTokIcon as TikTokBrandIcon, InstagramIcon as InstagramBrandIcon } from '@/components/icons/brand-icons'
import { Palette, Target } from 'lucide-react'

export default function IconsPage() {
  
  // All available mission icons
  const missionIcons = [
    'award', 'chart', 'book', 'briefcase', 'camera', 'compass', 'disc', 'dollar',
    'film', 'globe', 'handshake', 'instagram', 'laptop', 'lightbulb', 'mail',
    'mic', 'music', 'palette', 'radio', 'rocket', 'share', 'smartphone',
    'speaker', 'star', 'target', 'trending', 'tv', 'users', 'video', 'wifi', 'zap'
  ]

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0F0F11] transition-colors duration-300 scale-50 origin-top-left">
      <DJSidebar />
      <div className="flex-1 ml-96 p-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-32 w-96 h-96 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 left-32 w-64 h-64 bg-gradient-to-tl from-blue-500/15 via-purple-500/8 to-transparent rounded-full blur-2xl"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg">
              <Palette className="w-8 h-8 text-gray-900 dark:text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-violet-600 to-fuchsia-600 dark:from-white dark:via-violet-200 dark:to-fuchsia-300 bg-clip-text text-transparent">
                Icon Gallery
              </h1>
              <p className="text-gray-600 dark:text-white/70 text-lg">
                Explore all available icons in DJ Tour
              </p>
            </div>
          </div>
        </div>

                  {/* Level icons */}
        <div className="relative z-10 mb-12">
          <AllIconsPreview />
        </div>



                  {/* Mission icons */}
        <div className="relative z-10 mb-12">
          <GlassContainer className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                <Target className="inline w-6 h-6 mr-2" />
                Mission Icons
              </h2>
              <p className="text-gray-600 dark:text-white/70">
                {missionIcons.length} icons available for missions
              </p>
            </div>
            
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {missionIcons.map(iconName => (
                <div
                  key={iconName}
                  className="group flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MissionIcon name={iconName} className="w-5 h-5 text-gray-900 dark:text-white" />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-600 dark:text-white/60 text-center">{iconName}</span>
                </div>
              ))}
            </div>
          </GlassContainer>
        </div>

                  {/* Brand icons */}
        <div className="relative z-10 mb-12">
          <GlassContainer className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Brand Icons
              </h2>
              <p className="text-gray-600 dark:text-white/70">
                Official social platform icons
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* Spotify */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#1DB954] flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <SpotifyBrandIcon className="w-8 h-8 text-gray-900 dark:text-white" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-medium">Spotify</h3>
                <p className="text-gray-500 dark:text-gray-600 dark:text-white/60 text-sm">Brand Icon</p>
              </div>
              
              {/* TikTok */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#FE2C55] flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <TikTokBrandIcon className="w-8 h-8 text-gray-900 dark:text-white" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-medium">TikTok</h3>
                <p className="text-gray-500 dark:text-gray-600 dark:text-white/60 text-sm">Brand Icon</p>
              </div>
              
              {/* Instagram */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#E4405F] to-[#C13584] flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <InstagramBrandIcon className="w-8 h-8 text-gray-900 dark:text-white" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-medium">Instagram</h3>
                <p className="text-gray-500 dark:text-gray-600 dark:text-white/60 text-sm">Brand Icon</p>
              </div>
              
              {/* Custom Spotify */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/10 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <SpotifyIcon className="w-8 h-8 text-[#1DB954]" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-medium">Spotify</h3>
                <p className="text-gray-500 dark:text-gray-600 dark:text-white/60 text-sm">Custom Icon</p>
              </div>
              
              {/* Custom Instagram */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/10 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <InstagramIcon className="w-8 h-8 text-[#E4405F]" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-medium">Instagram</h3>
                <p className="text-gray-500 dark:text-gray-600 dark:text-white/60 text-sm">Custom Icon</p>
              </div>
            </div>
          </GlassContainer>
        </div>

        {/* Statistiques */}
        <div className="relative z-10">
          <GlassContainer className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">5</div>
                <div className="text-gray-500 dark:text-gray-600 dark:text-white/60 text-sm">Level icons</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{missionIcons.length}</div>
                <div className="text-gray-500 dark:text-gray-600 dark:text-white/60 text-sm">Mission icons</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">5</div>
                <div className="text-gray-500 dark:text-gray-600 dark:text-white/60 text-sm">Brand icons</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{5 + missionIcons.length + 5}</div>
                <div className="text-gray-500 dark:text-gray-600 dark:text-white/60 text-sm">Total icons</div>
              </div>
            </div>
          </GlassContainer>
        </div>
      </div>
    </div>
  )
} 