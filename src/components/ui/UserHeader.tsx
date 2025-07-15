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
      <div className="flex items-center gap-4">
        {/* Photo de profil */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          {profilePicUrl ? (
            <Image
              src={profilePicUrl}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <Music2 className="w-8 h-8 text-gray-900 dark:text-white" />
          )}
        </div>

        {/* Infos DJ */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h1>
            <div className="px-2 py-0.5 rounded-full bg-white/10 text-gray-700 dark:text-white/80 text-xs font-medium">
              DJ
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-gray-600 dark:text-white/60">En ligne</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-[8px] text-gray-900 dark:text-white font-bold">2</span>
              </div>
              <span className="text-gray-600 dark:text-white/60">{level}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-white/60" />
        </button>
      </div>
    </GlassContainer>
  )
} 