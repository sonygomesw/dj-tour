'use client'

import React from 'react'
import { Play, CheckCircle, Clock, Trophy } from 'lucide-react'
import { useMissions } from '@/contexts/MissionContext'
import missions from '@/data/missions'
import { cn } from '@/lib/utils'

interface MissionProgressProps {
  limit?: number
  showTitle?: boolean
  className?: string
}

export function MissionProgress({ limit = 3, showTitle = true, className }: MissionProgressProps) {
  const { getInProgressMissions, getMissionProgress } = useMissions()
  
  const inProgressMissions = getInProgressMissions().slice(0, limit)

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'Booking': return '🎯'
      case 'Content': return '📸'
      case 'Visibility': return '📈'
      case 'Preparation': return '📅'
      case 'Networking': return '👥'
      default: return '🎵'
    }
  }

  if (inProgressMissions.length === 0) {
    return null
  }

  return (
    <div className={cn("space-y-3", className)}>
      {showTitle && (
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Missions en cours
          </h3>
        </div>
      )}
      
      <div className="space-y-2">
        {inProgressMissions.map((userMission) => {
          const mission = missions.find(m => m.id === userMission.mission_id)
          if (!mission) return null
          
          return (
            <div
              key={mission.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-blue-200 dark:border-blue-800 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{getCategoryEmoji(mission.category)}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                    {mission.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {mission.category}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                  <Clock className="w-3 h-3" />
                  <span>{userMission.progress}%</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${userMission.progress}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
      
      {inProgressMissions.length === limit && (
        <div className="text-center">
          <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            Voir toutes les missions →
          </button>
        </div>
      )}
    </div>
  )
} 