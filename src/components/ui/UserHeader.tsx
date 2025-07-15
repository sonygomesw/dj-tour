'use client'

import { Music2, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { GlassContainer } from './GlassContainer'

interface UserHeaderProps {
  name: string
  level: string
  profilePicUrl?: string
}

export function UserHeader({ name, level, profilePicUrl }: UserHeaderProps) {
  return (
    <GlassContainer className="mb-8">
      <div className="flex items-center gap-6">
        {/* Photo de profil */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          {profilePicUrl ? (
            <Image
              src={profilePicUrl}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <Music2 className="w-12 h-12 text-gray-900 dark:text-white" />
          )}
        </div>

        {/* Infos DJ */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{name}</h1>
            <div className="px-3 py-1 rounded-full bg-white/10 text-gray-700 dark:text-white/80 text-sm font-medium">
              DJ
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-gray-600 dark:text-white/60">En ligne</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-[10px] text-gray-900 dark:text-white font-bold">2</span>
              </div>
              <span className="text-gray-600 dark:text-white/60">{level}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <button className="p-3 rounded-full hover:bg-white/5 transition-colors">
          <ChevronRight className="w-6 h-6 text-gray-600 dark:text-white/60" />
        </button>
      </div>
    </GlassContainer>
  )
} 