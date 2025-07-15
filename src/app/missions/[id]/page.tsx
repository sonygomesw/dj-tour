'use client'

import { useEffect, useState } from 'react'
import { missions } from '@/data/missions'
import { Mission } from '@/types/mission'
import { GlassContainer, Button } from '@/components/ui'
import { 
  Clock, 
  Trophy, 
  Star, 
  Download,
  Upload,
  ExternalLink,
  ChevronLeft,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function MissionDetailPage({ params }: { params: { id: string } }) {
  const [mission, setMission] = useState<Mission | null>(null)

  useEffect(() => {
    const foundMission = missions.find(m => m.id === params.id)
    if (foundMission) {
      setMission(foundMission)
    }
  }, [params.id])

  if (!mission) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center scale-50 origin-top-left">
        <p className="text-gray-900 dark:text-white">Mission not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] py-12 scale-50 origin-top-left">
      <div className="container mx-auto px-6">
        {/* Back button */}
        <Link href="/missions" className="inline-flex items-center text-gray-400 hover:text-gray-900 dark:text-white mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Missions
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassContainer className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{mission.title}</h1>
                <p className="text-gray-400 text-lg">{mission.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  mission.difficulty === 'beginner' ? 'bg-green-900/30 text-green-400' :
                  mission.difficulty === 'intermediate' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-red-900/30 text-red-400'
                }`}>
                  {mission.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-900/30 text-purple-400 text-sm font-medium">
                  {mission.category}
                </span>
              </div>
            </div>
          </GlassContainer>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mission Stats */}
            <GlassContainer>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p className="text-gray-900 dark:text-white font-medium">{mission.duration}</p>
                </div>
                <div className="text-center p-4 border-x border-white/10">
                  <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Points</p>
                  <p className="text-gray-900 dark:text-white font-medium">{mission.points} pts</p>
                </div>
                <div className="text-center p-4">
                  <Star className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Badge</p>
                  <p className="text-gray-900 dark:text-white font-medium">DJ Badge</p>
                </div>
              </div>
            </GlassContainer>

            {/* Instructions */}
            <GlassContainer>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Mission Steps</h2>
              <div className="space-y-6">
                {mission.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center border border-white/20">
                      <span className="text-gray-900 dark:text-white font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassContainer>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resources */}
            <GlassContainer>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Resources</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Example
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </GlassContainer>

            {/* Submission */}
            <GlassContainer>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Submit Your Work</h2>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Button>
                <Button className="w-full">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Completed
                </Button>
              </div>
            </GlassContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 