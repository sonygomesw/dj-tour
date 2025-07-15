'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Music, Star, Users, ArrowRight, Shield, Clock, CheckCircle, TrendingUp, ChevronDown, ChevronUp, Target, Globe, Play, Zap, Award, Heart, Camera, Headphones, Mic, Volume2, Radio, MessageCircle, Instagram, Smartphone, X, Calendar, BarChart3, Trophy, Mail, Phone, ExternalLink, Gift, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { CheckoutButton } from '@/components/ui/CheckoutButton'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [djCount, setDjCount] = useState(2000)
  const [lastSignup, setLastSignup] = useState(23)
  const [onlineCount, setOnlineCount] = useState(12)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Show sticky bar when scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowStickyBar(scrollPosition > 800)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Animate counters
  useEffect(() => {
    const djTimer = setInterval(() => {
      setDjCount(prev => prev + Math.floor(Math.random() * 2))
    }, 30000) // Every 30 seconds

    const signupTimer = setInterval(() => {
      setLastSignup(prev => Math.max(1, prev - 1))
    }, 60000) // Every minute

    const onlineTimer = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 3) - 1)
    }, 15000) // Every 15 seconds

    return () => {
      clearInterval(djTimer)
      clearInterval(signupTimer)
      clearInterval(onlineTimer)
    }
  }, [])

  const transformationSlides = [
    {
      title: "Spotify Listeners",
      before: "75k",
      after: "180k",
      increase: "+140%",
      color: "green"
    },
    {
      title: "Monthly Revenue",
      before: "$1,200",
      after: "$8,400",
      increase: "+600%",
      color: "blue"
    },
    {
      title: "Booking Rate",
      before: "$300",
      after: "$950",
      increase: "+217%",
      color: "purple"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Apple-Style */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
                <Music className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">offgigs</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  2,300+ DJs scaled up
                </span>
              </div>
              <CheckoutButton className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md">
                Get Started
              </CheckoutButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Sticky CTA Bar - Improvement #3 */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Ready to scale your bookings?</div>
                  <div className="text-sm text-gray-500">Join 2,300+ DJs already scaling up</div>
                </div>
              </div>
              <CheckoutButton className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Get My Personalized Plan Now
                <ArrowRight className="w-4 h-4" />
              </CheckoutButton>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Auto-Play Video - Improvement #1 */}
      <section className="pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Auto-Play Video Section */}
          <div className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600">
                <div className="aspect-video flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Play className="w-10 h-10 ml-1" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">What is offgigs?</h3>
                    <p className="text-lg opacity-90 mb-4">See how we help DJs scale from sporadic gigs to consistent bookings</p>
                    <div className="text-sm opacity-70">60 seconds • Auto-playing</div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  LIVE
                </div>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  🔊 Click to unmute
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Copy */}
            <div className="text-center lg:text-left">
              {/* Mini Hook - Improvement #1 */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full px-4 py-2 text-sm font-medium border border-blue-100">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>Used by 2,000+ DJs to scale from sporadic to consistent bookings</span>
                </div>
              </div>
              
              {/* Enhanced Killer Headline - 20/20 Version */}
              <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 leading-[0.9] tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                  Scale to Consistent Bookings
                </span>
                <br />
                — Or We Help You Until You Do.
              </h1>
              
              {/* Enhanced Subtitle */}
              <p className="text-xl text-gray-600 font-light mb-2 leading-relaxed">
                From 50k Spotify listeners to sold-out venues. From bedroom to premium stages.
              </p>
              <p className="text-base text-gray-500 mb-8 font-light">
                Most DJs scale to consistent high-paying bookings within 60-90 days. If not, we work with you until it happens.
              </p>

              {/* Trust Bubbles - Updated for all levels */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-10">
                <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-full px-4 py-2 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>All skill levels welcome</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  <span>Results guaranteed</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 text-purple-700 rounded-full px-4 py-2 text-sm font-medium">
                  <Target className="w-4 h-4" />
                  <span>Personalized to your level</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-8">
                <CheckoutButton className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                  <Headphones className="w-5 h-5" />
                  Get My Personalized Plan Now
                </CheckoutButton>
                <a href="/ai-profile-analysis" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-medium rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                  <Camera className="w-5 h-5" />
                  Analyze My Profile Free
                </a>
              </div>
              
              <p className="text-sm text-gray-400">
                Free analysis • Personalized roadmap • Support included
              </p>
            </div>

            {/* Right Side - Interactive Transformation Slider - Improvement #3 */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-medium text-gray-900 mb-2">Average Results in 90 Days</h3>
                    <p className="text-gray-600">Real metrics from our DJ community</p>
                  </div>
                  
                  {/* Slider Controls */}
                  <div className="flex items-center justify-between mb-6">
                    <button 
                      onClick={() => setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 2)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    
                    <div className="flex-1 mx-4">
                      <div className="text-center">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          {transformationSlides[currentSlide].title}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">BEFORE</div>
                            <div className="text-2xl font-bold text-red-600">
                              {transformationSlides[currentSlide].before}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">AFTER</div>
                            <div className="text-2xl font-bold text-green-600">
                              {transformationSlides[currentSlide].after}
                            </div>
                          </div>
                        </div>
                        
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                          transformationSlides[currentSlide].color === 'green' 
                            ? 'bg-green-100 text-green-700' 
                            : transformationSlides[currentSlide].color === 'blue'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          <TrendingUp className="w-4 h-4" />
                          <span>{transformationSlides[currentSlide].increase} increase</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setCurrentSlide(currentSlide < 2 ? currentSlide + 1 : 0)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Slide Indicators */}
                  <div className="flex justify-center gap-2">
                    {transformationSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Background Visual */}
              <div className="absolute inset-0 -z-10 opacity-20">
                <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full blur-xl"></div>
              </div>

              {/* Social Proof Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop" alt="DJ" width={32} height={32} className="rounded-full border-2 border-white" />
                    <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop" alt="DJ" width={32} height={32} className="rounded-full border-2 border-white" />
                    <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop" alt="DJ" width={32} height={32} className="rounded-full border-2 border-white" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">2,300+ DJs</div>
                    <div className="text-gray-500">scaled up</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">4.9/5</div>
                    <div className="text-gray-500">287 reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Activity Metrics */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Live User Count */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                LIVE
              </div>
              <div className="text-3xl font-light text-gray-900 mb-2">230</div>
              <div className="text-gray-600">DJs using the platform right now</div>
            </div>

            {/* Last Signup */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Clock className="w-4 h-4" />
                RECENT
              </div>
              <div className="text-3xl font-light text-gray-900 mb-2">3 min ago</div>
              <div className="text-gray-600">Last DJ joined</div>
            </div>

            {/* Total Transformed */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Trophy className="w-4 h-4" />
                TOTAL
              </div>
              <div className="text-3xl font-light text-gray-900 mb-2">2,300+</div>
              <div className="text-gray-600">DJs already scaled up</div>
            </div>
          </div>

          {/* Social Proof Notification */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl px-6 py-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700">
                <span className="font-medium">DJ Alex from Berlin</span> just got his personalized plan
              </span>
              <div className="text-xs text-gray-500">3 min ago</div>
            </div>
          </div>
        </div>
      </section>

      {/* Real DJ Profile Mockups - Improvement #2 */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-gray-900 mb-6">
              Your profile transformation
            </h2>
            <p className="text-xl text-gray-600 font-light">
              See exactly how your DJ profile will evolve
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* BEFORE Profile */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 text-center">
                <div className="text-lg font-medium text-gray-700">BEFORE - Your Current Profile</div>
              </div>
              
              <div className="p-8">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
                    alt="DJ Profile"
                    width={80}
                    height={80}
                    className="rounded-full grayscale"
                  />
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">DJ Marcus</h3>
                    <p className="text-gray-500">Electronic Music Producer</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-500">Inconsistent bookings</span>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-medium text-gray-600">75k</div>
                    <div className="text-xs text-gray-500">Spotify Listeners</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-medium text-gray-600">2-3</div>
                    <div className="text-xs text-gray-500">Gigs/Month</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-medium text-gray-600">$300</div>
                    <div className="text-xs text-gray-500">Avg Rate</div>
                  </div>
                </div>
                
                {/* Bio */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                  <p className="text-sm text-gray-600">
                    Electronic music producer and DJ. Love creating beats and mixing tracks. Available for gigs.
                  </p>
                </div>
                
                {/* Recent Activity */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Posted new mix 2 weeks ago</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Last gig: Local bar, 1 month ago</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">Contact for bookings</div>
                  <div className="text-sm text-gray-600">marcus.dj@email.com</div>
                </div>
              </div>
            </div>
            
            {/* AFTER Profile */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
                <div className="text-lg font-medium text-white">AFTER - Your Scaled Profile</div>
              </div>
              
              <div className="p-8">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
                    alt="DJ Profile"
                    width={80}
                    height={80}
                    className="rounded-full ring-2 ring-blue-500"
                  />
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">DJ Marcus</h3>
                    <p className="text-blue-600 font-medium">Club DJ • Touring Artist</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Fully booked</span>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-medium text-blue-600">180k</div>
                    <div className="text-xs text-blue-700">Spotify Listeners</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-medium text-green-600">12+</div>
                    <div className="text-xs text-green-700">Gigs/Month</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-medium text-purple-600">$950</div>
                    <div className="text-xs text-purple-700">Avg Rate</div>
                  </div>
                </div>
                
                {/* Bio */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Club DJ</span> with 180k+ monthly listeners. Specializing in progressive house & techno. 
                    <span className="text-blue-600"> Currently touring Europe 2024.</span> 
                    <span className="font-medium"> Bookings: management@djmarcus.com</span>
                  </p>
                </div>
                
                {/* Recent Activity */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-600">Warehouse Club - Dec 15 • $1,200</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-600">Club Paradiso - Dec 22 • $800</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-purple-600">New Year Club - Dec 31 • $1,500</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">Professional Management</div>
                  <div className="text-sm text-blue-600">management@djmarcus.com</div>
                  <div className="text-xs text-gray-500 mt-1">Booking rate: $800-1,500</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Planner Visual - Updated for all levels */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Your personalized scaling roadmap
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Adapted to your current level and goals
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left - Mission Calendar */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-medium text-gray-900">Week 3 - Scale Your Bookings</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Optimize booking rates strategy</div>
                      <div className="text-sm text-gray-500">Completed • +50 XP</div>
                    </div>
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      ✓ Done
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Pitch to 5 premium venues</div>
                      <div className="text-sm text-gray-500">In progress • 2h left</div>
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      Active
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Premium venue strategy</div>
                      <div className="text-sm text-gray-500">Unlocks tomorrow • +75 XP</div>
                    </div>
                    <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      Locked
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right - Progress Stats */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-medium text-gray-900">Your Progress</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Week 3 Progress</span>
                      <span className="text-sm font-medium text-blue-600">67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{width: '67%'}}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">275</div>
                      <div className="text-sm text-blue-700">XP Earned</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">8</div>
                      <div className="text-sm text-purple-700">Missions Done</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium text-green-800">Next Milestone</span>
                    </div>
                    <div className="text-sm text-green-700">First premium booking in 2 weeks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview - Updated for scaling DJs */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-gray-900 mb-6">
              Your complete DJ dashboard
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Track your scaling journey in real-time
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
                    alt="Alex Profile"
                    width={40}
                    height={40}
                    className="rounded-xl border-2 border-white/20"
                  />
                  <div>
                    <div className="font-medium">DJ Dashboard</div>
                    <div className="text-sm opacity-80">Welcome back, Alex!</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-80">Level 3 DJ</div>
                  <div className="font-medium">425 XP</div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats Cards - Updated for scaling metrics */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-blue-700">Bookings This Month</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">$8,400</div>
                      <div className="text-sm text-green-700">Monthly Revenue</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">180k</div>
                      <div className="text-sm text-purple-700">Spotify Listeners</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">$950</div>
                      <div className="text-sm text-orange-700">Avg Booking Rate</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-3">Upcoming Gigs</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">Premium Venue</span>
                        </div>
                        <span className="text-xs text-gray-500">Dec 15, 2024 • $1,200</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium">Club Paradiso</span>
                        </div>
                        <span className="text-xs text-gray-500">Dec 22, 2024 • $800</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mission Progress - Updated for scaling */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Missions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Negotiate higher rates</div>
                        <div className="text-xs text-gray-500">+25 XP</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Play className="w-5 h-5 text-blue-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Premium venue outreach</div>
                        <div className="text-xs text-gray-500">+50 XP</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Target className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Brand partnership outreach</div>
                        <div className="text-xs text-gray-500">+75 XP</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonial - Updated messaging */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-gray-900 mb-6">
              See the platform in action
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Real DJs scaling their careers
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Video Testimonial */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <div className="font-medium">DJ Marcus Shows His Scaling Journey</div>
                    <div className="text-sm opacity-80">2:15 min • Click to play</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  LIVE
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Image 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop" 
                    alt="DJ Marcus" 
                    width={40} 
                    height={40} 
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">DJ Marcus</div>
                    <div className="text-sm text-gray-500">Austin, TX • 3 months ago</div>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic mb-4">
                  "I had 50k Spotify listeners but was only making €1,200/month. This platform helped me scale to €8,400/month with consistent high-paying bookings."
                </blockquote>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Verified result</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>90-day scaling program</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Success Stats - Updated for scaling */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">287</div>
                    <div className="text-sm text-gray-500">DJs scaled up</div>
                  </div>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  Average results from our community of DJs who completed the 90-day scaling program.
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">73%</div>
                    <div className="text-sm text-gray-500">Scale to consistent bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">3.2x</div>
                    <div className="text-sm text-gray-500">Average revenue increase</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-900 mb-2">Ready to scale up?</div>
                  <div className="text-gray-600 mb-6">Join the DJs already scaling their careers</div>
                  <a href="/auth" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all duration-200">
                    Scale My Career
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Understanding - Updated for all levels */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              How it works for every level
            </h2>
            <p className="text-lg text-gray-600 font-light">
              From bedroom to premium venues - we meet you where you are
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">1. AI Analysis</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Our AI analyzes your current level - whether you're starting out or have 250k Spotify listeners
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">2. Personalized Roadmap</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Get missions tailored to your level - from first gigs to premium venues and higher rates
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">3. Scale Consistently</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Follow your plan and watch your bookings and rates scale to the next level
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Proof - Updated for different levels */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-gray-900 mb-6">
              Success stories from every level
            </h2>
            <p className="text-xl text-gray-600 font-light">
              From bedroom producers to established DJs scaling up
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* BEFORE */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
              <div className="bg-gray-50 p-6 text-center border-b border-gray-100">
                <div className="text-lg font-medium text-gray-700">Before offgigs</div>
              </div>
              
              <div className="p-8 text-center">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
                  alt="DJ before"
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-6 grayscale"
                />
                <h3 className="font-medium text-gray-900 mb-2">Marcus, 28</h3>
                <p className="text-sm text-gray-500 mb-6">Austin, TX</p>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4 text-gray-400" />
                      <span>Experience</span>
                    </div>
                    <span className="text-gray-600">3 years mixing</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>Spotify</span>
                    </div>
                    <span className="text-gray-600">75k monthly listeners</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mic className="w-4 h-4 text-gray-400" />
                      <span>Bookings</span>
                    </div>
                    <span className="text-gray-600">2-3 per month</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span>Monthly income</span>
                    </div>
                    <span className="text-gray-600">$800-1,200</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AFTER */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-blue-100">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 text-center border-b border-blue-100">
                <div className="text-lg font-medium text-blue-700">After offgigs (90 days)</div>
              </div>
              
              <div className="p-8 text-center">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
                  alt="DJ after"
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-6"
                />
                <h3 className="font-medium text-gray-900 mb-2">DJ Marcus</h3>
                <p className="text-sm text-blue-600 mb-6">Touring DJ • Premium Venues</p>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>Experience</span>
                    </div>
                    <span className="font-semibold text-blue-600">Full-time touring DJ</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Spotify</span>
                    </div>
                    <span className="font-semibold text-blue-600">180k monthly listeners</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mic className="w-4 h-4 text-purple-600" />
                      <span>Bookings</span>
                    </div>
                    <span className="font-semibold text-purple-600">12+ per month</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-green-600" />
                      <span>Monthly income</span>
                    </div>
                    <span className="font-semibold text-green-600">$6,000-8,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Everything they get - Complete value */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-gray-900 mb-6">
              Everything you get
            </h2>
            <p className="text-xl text-gray-600 font-light">
              A complete platform to scale your DJ career
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Personalized DJ Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Personalized Scaling Plan</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-4">
                Custom roadmap adapted to your current level - from first gigs to premium venues
              </p>
              <div className="text-sm text-gray-500">
                ✓ Level-specific missions<br/>
                ✓ Goals adapted to your profile<br/>
                ✓ Detailed progress tracking
              </div>
            </div>

            {/* Feature 2 - Gamified Missions */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Play className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Gamified Missions</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-4">
                Mission system with XP points, badges and progressive unlock of advanced strategies
              </p>
              <div className="text-sm text-gray-500">
                ✓ Daily challenges and rewards<br/>
                ✓ Level up system<br/>
                ✓ Achievement badges
              </div>
            </div>

            {/* Feature 3 - AI DJ Coach */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Headphones className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">24/7 AI DJ Coach</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-4">
                Personal AI assistant that understands your level and provides tailored guidance
              </p>
              <div className="text-sm text-gray-500">
                ✓ Level-specific advice<br/>
                ✓ Personalized strategies<br/>
                ✓ Career scaling guidance
              </div>
            </div>

            {/* Feature 4 - AI Profile Analysis */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Camera className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">AI Profile Analysis</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-4">
                Upload your socials for personalized analysis - whether you have 1k or 250k followers
              </p>
              <div className="text-sm text-gray-500">
                ✓ Level-appropriate optimization<br/>
                ✓ Scaling recommendations<br/>
                ✓ Content strategy
              </div>
            </div>

            {/* Feature 5 - Booking Strategy */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Strategic Booking Methods</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-4">
                Learn proven strategies to approach venues and secure higher-paying gigs
              </p>
              <div className="text-sm text-gray-500">
                ✓ Venue research techniques<br/>
                ✓ Level-specific approaches<br/>
                ✓ Follow-up strategies
              </div>
            </div>

            {/* Feature 6 - Progress Dashboard */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Scaling Dashboard</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-4">
                Track your revenue, booking rates, and career progression in real-time
              </p>
              <div className="text-sm text-gray-500">
                ✓ Revenue tracking<br/>
                ✓ Booking rate analytics<br/>
                ✓ Career milestones
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - High Conversion */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Clock className="w-4 h-4" />
              Limited Early Access - 47 spots left this month
            </div>
            
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Ready to Scale Your DJ Career?
            </h2>
            <p className="text-xl text-gray-600 font-light mb-8">
              Join 2,300+ DJs already scaling to consistent bookings
            </p>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
              <div className="text-6xl font-light text-gray-900 mb-2">$97</div>
              <div className="text-gray-500 mb-4">One-time payment • Lifetime access</div>
              <div className="text-sm text-gray-600">
                ✓ AI Profile Analysis<br/>
                ✓ Personalized Roadmap<br/>
                ✓ Premium Strategies<br/>
                ✓ Progress Dashboard<br/>
                ✓ 90-Day Guarantee
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <CheckoutButton className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg">
                Get My Personalized Plan Now
                <ArrowRight className="w-5 h-5" />
              </CheckoutButton>
              <div className="text-sm text-gray-500">
                🔒 90-day money-back guarantee • Start analyzing in 2 minutes
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-green-600">✓ 90-Day Guarantee:</span> Scale to consistent bookings or get your money back
              </div>
              <div className="text-xs text-gray-500">
                No questions asked. We're that confident in our system.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Visual Testimonials - Updated for different levels */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-gray-900 mb-6">
              Real DJs, Real Scaling Results
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Screenshots from our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* WhatsApp Style Testimonial 1 - With Revenue Screenshot */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">WhatsApp</div>
                  <div className="text-sm text-gray-500">Today 2:47 PM</div>
                </div>
              </div>
              
              {/* Revenue Screenshot */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 border-2 border-dashed border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">€2,500</div>
                  <div className="text-sm text-gray-600">Warehouse Club • Dec 15</div>
                  <div className="text-xs text-green-600 mt-1">✓ Payment Confirmed</div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-4 mb-4">
                <p className="text-gray-800 font-medium">
                  "Bro I just got my first premium venue booking! €2,500 for one set. Had 120k Spotify listeners but was stuck at small venues. This changed everything 🔥"
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop" alt="DJ" width={24} height={24} className="rounded-full" />
                  <span>DJ Mike • Berlin, DE</span>
                </div>
                <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Warehouse Club
                </div>
              </div>
            </div>

            {/* Instagram DM Style Testimonial 2 - With Before/After Rates */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Instagram</div>
                  <div className="text-sm text-gray-500">Yesterday 11:23 AM</div>
                </div>
              </div>
              
              {/* Before/After Rates */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <div className="text-sm text-red-600 font-medium">BEFORE</div>
                  <div className="text-xl font-bold text-red-700">€300</div>
                  <div className="text-xs text-red-600">per gig</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-sm text-green-600 font-medium">AFTER</div>
                  <div className="text-xl font-bold text-green-700">€1,200</div>
                  <div className="text-xs text-green-600">per gig</div>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-2xl p-4 mb-4">
                <p className="text-gray-800 font-medium">
                  "Went from €300 gigs to €800-1,200 bookings in 2 months! Already had followers but didn't know how to monetize properly. Game changer! 💰"
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop" alt="DJ" width={24} height={24} className="rounded-full" />
                  <span>DJ Sarah • London, UK</span>
                </div>
                <div className="flex gap-1">
                  <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Fabric</div>
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Ministry</div>
                </div>
              </div>
            </div>

            {/* iPhone Message Style Testimonial 3 - With Booking Calendar */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Messages</div>
                  <div className="text-sm text-gray-500">Today 9:15 AM</div>
                </div>
              </div>
              
              {/* Booking Calendar Preview */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">December 2024</div>
                <div className="grid grid-cols-7 gap-1 text-xs">
                  <div className="p-1 text-center text-gray-400">15</div>
                  <div className="p-1 text-center bg-green-100 text-green-800 rounded">16</div>
                  <div className="p-1 text-center text-gray-400">17</div>
                  <div className="p-1 text-center bg-blue-100 text-blue-800 rounded">18</div>
                  <div className="p-1 text-center text-gray-400">19</div>
                  <div className="p-1 text-center bg-purple-100 text-purple-800 rounded">20</div>
                  <div className="p-1 text-center bg-green-100 text-green-800 rounded">21</div>
                </div>
                <div className="text-xs text-gray-600 mt-2">15+ bookings this month</div>
              </div>
              
              <div className="bg-blue-500 text-white rounded-2xl p-4 mb-4">
                <p className="font-medium">
                  "From 2-3 random gigs to 15+ bookings/month! The system helped me turn my 80k listeners into consistent revenue. Now I'm fully booked 📅"
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=24&h=24&fit=crop" alt="DJ" width={24} height={24} className="rounded-full" />
                <span>DJ Alex • Amsterdam, NL</span>
              </div>
            </div>
          </div>
          
          {/* Additional Testimonials Row - Premium Venues */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Testimonial 4 - With Venue Logos */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Image src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=48&h=48&fit=crop" alt="DJ" width={48} height={48} className="rounded-full" />
                <div>
                  <div className="font-medium text-gray-900">DJ Marcus</div>
                  <div className="text-sm text-gray-500">180k Spotify listeners</div>
                </div>
              </div>
              
              <p className="text-gray-800 mb-4">
                "Scaled from local clubs to international venues. Revenue went from €3k to €12k/month in 6 months."
              </p>
              
              {/* Venue Logos */}
              <div className="space-y-2">
                <div className="text-xs text-gray-500 font-medium">NOW PLAYING AT:</div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-gray-100 px-3 py-1 rounded text-xs font-medium">Berghain</div>
                  <div className="bg-gray-100 px-3 py-1 rounded text-xs font-medium">Fabric London</div>
                  <div className="bg-gray-100 px-3 py-1 rounded text-xs font-medium">Warehouse Project</div>
                  <div className="bg-gray-100 px-3 py-1 rounded text-xs font-medium">Awakenings</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 5 - Revenue Growth */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Image src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=48&h=48&fit=crop" alt="DJ" width={48} height={48} className="rounded-full" />
                <div>
                  <div className="font-medium text-gray-900">DJ Luna</div>
                  <div className="text-sm text-gray-500">95k Spotify listeners</div>
                </div>
              </div>
              
              <p className="text-gray-800 mb-4">
                "The pricing strategies alone paid for the program 10x over. Now I negotiate with confidence."
              </p>
              
              {/* Growth Chart */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <div className="flex items-end gap-2 h-16">
                  <div className="bg-red-400 w-4 h-4 rounded-t"></div>
                  <div className="bg-yellow-400 w-4 h-8 rounded-t"></div>
                  <div className="bg-green-400 w-4 h-12 rounded-t"></div>
                  <div className="bg-blue-400 w-4 h-16 rounded-t"></div>
                </div>
                <div className="text-xs text-gray-600 mt-2">Monthly revenue growth</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Updated for all levels */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-gray-900 mb-6">
              Frequently asked questions
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Everything you need to know
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                question: "What if I don't have time for this?",
                answer: "Our system is designed for busy DJs. Each mission takes just 15-20 minutes to complete. You can progress at your own pace - whether that's 15 minutes a day or a few hours on weekends. Most DJs see results within the first week."
              },
              {
                question: "Is this just another generic DJ course?",
                answer: "Absolutely not! Unlike courses with generic content, our AI analyzes YOUR specific profile and creates a custom roadmap. You get personalized missions based on your current level, genre, and goals - not one-size-fits-all advice."
              },
              {
                question: "I already have 50k+ Spotify listeners. Will this help me?",
                answer: "YES! Our most successful users already had followings but couldn't monetize effectively. Having listeners is just step 1. We'll show you how to convert that audience into consistent €800-2,500 bookings."
              },
              {
                question: "What if I'm already successful? (100k+ listeners, regular gigs)",
                answer: "Perfect! You're our ideal user. We specialize in helping established DJs break through plateaus - scaling from €500 to €1,500+ per gig, accessing premium venues, and building sustainable touring careers."
              },
              {
                question: "How is this different from YouTube tutorials and free content?",
                answer: "Free content gives you random tips. We give you a complete SYSTEM. You get: AI-powered personalization, step-by-step roadmap, real-time feedback, proven templates, and a 120-day guarantee. It's like having a manager, coach, and strategy team."
              },
              {
                question: "What if I don't scale my bookings in 90 days?",
                answer: "We guarantee results or your money back. If you complete your personalized missions and don't see significant booking improvements in 90 days, we'll refund every penny. No questions asked."
              },
              {
                question: "I'm in a saturated market. Will this still work?",
                answer: "Especially yes! Saturated markets need better strategy, not more talent. We'll show you how to position yourself differently, target untapped venues, and command premium rates even in competitive cities."
              },
              {
                question: "Do I need expensive equipment or software?",
                answer: "Not at all! This is about business strategy, not gear. You can implement everything with just your existing setup and a computer. It's about smarter booking approaches, not expensive equipment."
              },
              {
                question: "How quickly will I see results?",
                answer: "Most DJs implement their first strategy within 48 hours and see initial results within 2 weeks. Full transformation typically happens in 60-90 days, but the first booking improvements start much sooner."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900 pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee - Apple Card */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Scaling Guarantee
            </h2>
            <p className="text-xl text-gray-600 font-light mb-8 max-w-2xl mx-auto">
              Scale your bookings and rates or we work with you until you do. 
              30 days to try, zero risk.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-5 h-5" />
              <span>Unconditional guarantee • Support until success</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Surprise Section - Improvement #4 */}
      <section className="py-24 px-6 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-orange-100">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Bonus Surprise After Payment
            </h2>
            <p className="text-xl text-gray-600 font-light mb-8 max-w-2xl mx-auto">
              Get instant access to exclusive resources that have generated millions in bookings
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  <h3 className="font-medium text-gray-900">Booking Rate Optimizer</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Advanced strategies to increase your booking rate from 5% to 40%+ with proven techniques
                </p>
                <div className="text-xs text-blue-600 mt-2 font-medium">Value: $297</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-6 h-6 text-purple-600" />
                  <h3 className="font-medium text-gray-900">Cold DM Templates</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Proven templates that generated 8+ bookings each, tested with 100+ venues
                </p>
                <div className="text-xs text-purple-600 mt-2 font-medium">Value: $197</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-orange-600 font-medium mb-6">
              <Gift className="w-5 h-5" />
              <span>Total Bonus Value: $494 • Yours FREE after payment</span>
            </div>
            
            <div className="text-sm text-gray-500">
              These bonuses are revealed immediately after your purchase and have helped our DJs secure premium bookings worth $2M+ combined
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Updated */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 rounded-full px-4 py-2 mb-6 text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>Limited spots available</span>
            </div>
            <h2 className="text-5xl font-light text-gray-900 mb-6">
              Your DJ career scaling starts
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                right now
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light mb-12">
              Join the 2,300+ DJs who've already scaled their careers to the next level
            </p>
          </div>

          <div className="mb-8">
            <a href="/auth" className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white text-xl font-medium rounded-full hover:bg-blue-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]">
              Get My Personalized Plan Now
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
          
          <div className="space-y-2 text-sm text-gray-500">
            <p>$97 • One-time payment • Lifetime access</p>
            <p>✓ 90-day guarantee • ✓ 24/7 support • ✓ Exclusive community</p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer - Improvement #5 */}
      <footer className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">offgigs</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The #1 platform for DJs to scale their careers to consistent bookings.
              </p>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-medium mb-4">24/7 Support</h4>
              <div className="space-y-3 text-sm">
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Headphones className="w-4 h-4" />
                  <span>DJ Coach AI</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>support@djtour.com</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>Live Chat</span>
                </a>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <div className="space-y-3 text-sm">
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Star className="w-4 h-4" />
                  <span>Success Stories</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>Community</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Camera className="w-4 h-4" />
                  <span>Free Profile Analysis</span>
                </a>
              </div>
            </div>

            {/* Guarantee */}
            <div>
              <h4 className="font-medium mb-4">Our Promise</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <Shield className="w-4 h-4" />
                  <span>90-day guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Clock className="w-4 h-4" />
                  <span>Results in 60-90 days</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <Users className="w-4 h-4" />
                  <span>2,000+ DJs scaled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-400">
                © 2024 offgigs. All rights reserved.
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a>
              </div>
            </div>
            
            {/* Final Guarantee Reminder */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-green-900/30 text-green-400 rounded-full px-4 py-2 text-sm">
                <Shield className="w-4 h-4" />
                <span>Scale your bookings in 90 days or we work with you until you do</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
