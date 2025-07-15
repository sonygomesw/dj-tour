'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Star, Zap, Gift, ArrowRight } from 'lucide-react'
import { Mission } from '@/types/mission'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface MissionSuccessProps {
  mission: Mission
  xpGained: number
  levelUp?: boolean
  newLevel?: number
  onClose: () => void
  onNextMission?: () => void
}

export function MissionSuccess({ 
  mission, 
  xpGained, 
  levelUp = false, 
  newLevel, 
  onClose, 
  onNextMission 
}: MissionSuccessProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        {/* Celebration Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          >
                          Mission Completed!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 dark:text-gray-300"
          >
                          Congratulations for completing
          </motion.p>
        </div>

        {/* Mission Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{getCategoryEmoji(mission.category)}</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {mission.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {mission.category}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rewards */}
        <div className="space-y-4 mb-6">
          {/* XP Gained */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-800 dark:text-blue-200">
                XP Earned
              </span>
            </div>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              +{xpGained}
            </span>
          </motion.div>

          {/* Level Up */}
          {levelUp && newLevel && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span className="font-medium">Level Up!</span>
              </div>
              <span className="text-xl font-bold">
                Niveau {newLevel}
              </span>
            </motion.div>
          )}

          {/* Badges */}
          {mission.rewards?.badges && mission.rewards.badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="font-medium text-green-800 dark:text-green-200">
                  Badge Unlocked
                </span>
              </div>
              <div className="flex gap-1">
                {mission.rewards.badges.map((badge, index) => (
                  <span key={index} className="text-lg">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Unlocked Missions */}
        {mission.rewards?.unlockMissions && mission.rewards.unlockMissions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-4 mb-6 border border-violet-200 dark:border-violet-800"
          >
            <h4 className="font-semibold text-violet-800 dark:text-violet-200 mb-2">
              🔓 New missions unlocked!
            </h4>
            <p className="text-sm text-violet-600 dark:text-violet-300">
              {mission.rewards.unlockMissions.length} nouvelle{mission.rewards.unlockMissions.length > 1 ? 's' : ''} mission{mission.rewards.unlockMissions.length > 1 ? 's' : ''} disponible{mission.rewards.unlockMissions.length > 1 ? 's' : ''}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Fermer
          </Button>
          
          {onNextMission && (
            <Button
              onClick={onNextMission}
              className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
            >
              Mission suivante
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
} 