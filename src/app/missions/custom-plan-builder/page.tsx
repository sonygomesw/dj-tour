'use client'

import React from 'react'
import { DJSidebar } from '@/components/ui/DJSidebar'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { Button } from '@/components/ui/button'
import { 
  Target, 
  Instagram, 
  FileText, 
  Mail, 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  CheckCircle,
  Clock,
  Search,
  RefreshCw,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export default function MissionBuildTourPage() {
  const missionSteps = [
    {
      id: 1,
      title: "Verify your Instagram account with Meta subscription",
      icon: Instagram,
      description: "Make sure your Instagram account is verified and connected to Meta Business",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 2,
      title: "Create your press kit",
      icon: FileText,
      description: "Prepare a professional press kit with your best photos and bio",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Choose your email template",
      icon: Mail,
      description: "Select and customize your email template to contact clubs",
      color: "from-violet-500 to-purple-500"
    },
    {
      id: 4,
      title: "Contact 100 nightclubs and add their contact to the contact page",
      icon: Users,
      description: "Find and add 100 nightclub contacts to your database",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      title: "Follow up after 4 days",
      icon: Clock,
      description: "Plan your follow-ups to maximize your response chances",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 6,
      title: "How many responses do you have",
      icon: MessageSquare,
      description: "Analyze your response statistics to optimize your strategy",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: 7,
      title: "Add booked dates to Tour",
      icon: Calendar,
      description: "Record all your confirmed dates in your tour calendar",
      color: "from-teal-500 to-green-500"
    },
    {
      id: 8,
      title: "If you have no positive responses, find other DJs or nightclubs and contact them",
      icon: Search,
      description: "Expand your network by searching for new contacts and opportunities",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 9,
      title: "If you really have 0 responses, you need to improve your profile",
      icon: TrendingUp,
      description: "Work on your brand image and content to be more attractive",
      color: "from-red-500 to-pink-500"
    },
    {
      id: 10,
      title: "Follow the missions from the missions page",
      icon: CheckCircle,
      description: "Complete all missions to develop your DJ career",
      color: "from-purple-500 to-violet-500"
    },
    {
      id: 11,
      title: "Look at booked DJs' profiles and reproduce the same content as them because they do nothing by chance",
      icon: Target,
      description: "Analyze successful DJs' profiles and adapt your strategy",
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 12,
      title: "Then recontact the clubs, always contact more. The more you contact, the more you increase your booking chances",
      icon: RefreshCw,
      description: "Persevere and multiply your contacts to maximize your opportunities",
      color: "from-emerald-500 to-teal-500"
    }
  ]

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0F0F11] transition-colors duration-300">
      <DJSidebar />
      <div className="flex-1 ml-80 p-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tl from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 mb-8">
          <GlassContainer className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <Target className="w-6 h-6 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Custom Plan Builder</h1>
                  <p className="text-gray-600 dark:text-white/60">Create your personalized DJ tour plan</p>
                </div>
              </div>
              <Link href="/missions/custom-plan-builder">
                <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
                  Start
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </GlassContainer>
        </div>

        {/* Mission Steps Grid */}
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {missionSteps.map((step) => {
              const StepIcon = step.icon
              
              return (
                <GlassContainer 
                  key={step.id}
                  className="p-6 hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Step Number & Icon */}
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <StepIcon className="w-8 h-8 text-gray-900 dark:text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                        <span className="text-gray-900 dark:text-white font-bold text-sm">{step.id}</span>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-2">
                      <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-white/60 text-xs leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r ${step.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                </GlassContainer>
              )
            })}
          </div>
        </div>

        {/* Action Section */}
        <div className="relative z-10 mt-8">
          <GlassContainer className="p-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ready to create your custom plan?</h2>
              <p className="text-gray-600 dark:text-white/60">
                Follow these steps methodically to maximize your booking chances and develop your DJ career.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/missions/custom-plan-builder">
                  <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
                    <Target className="w-4 h-4 mr-2" />
                    Start Custom Plan
                  </Button>
                </Link>
                <Link href="/my-dj-plan">
                  <Button variant="outline" className="bg-white/5">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Back to My DJ Plan
                  </Button>
                </Link>
              </div>
            </div>
          </GlassContainer>
        </div>
      </div>
    </div>
  )
} 