'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Music, Camera, Search, FileText, Target, Zap, Globe, Users, Circle } from 'lucide-react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden animate-fadeIn bg-white">
      {/* Navbar - Style CoreShift */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900 tracking-tight">DJ Tour</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
            Success Stories
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
            Login
          </button>
          <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-all duration-200 shadow-sm">
            Join Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto animate-slideUp relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div className="text-center lg:text-left">
              {/* Titre principal */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight animate-fadeInUp"
                  style={{ 
                    fontFamily: 'Inter, system-ui, sans-serif',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                    letterSpacing: '-0.025em'
                  }}>
                Start Your DJ Tour –
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                  Get Booked or Stay Broke
                </span>
              </h1>
              
              {/* Sous-titre */}
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto lg:mx-0 mb-16 leading-relaxed font-light animate-fadeInUp"
                 style={{ 
                   fontFamily: 'Inter, system-ui, sans-serif',
                   animationDelay: '0.2s',
                   lineHeight: '1.6'
                 }}>
                🔥 The only system that helps DJs get real bookings, build real momentum & finally live from their music.
              </p>
              
              {/* Bouton CTA avec urgence */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <button className="group inline-flex items-center justify-center px-12 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                   style={{ 
                     boxShadow: '0 15px 35px rgba(147, 51, 234, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                   }}>
                  <span className="relative z-10">Join Now - Save 100€ Today →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>
            
            {/* Right side - Tour Poster Visual */}
            <div className="relative lg:flex hidden justify-end">
              <div className="relative h-[700px] lg:h-[800px] w-[550px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/tourdj.png"
                  alt="DJ Tour Poster Example"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-900">👆 This could be YOU in 90 days</p>
                    <p className="text-xs text-gray-600">Real DJ Tour Poster</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Visual Carousel "Imagine This" */}
      <div className="relative z-20 py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
              <Camera className="w-12 h-12 text-purple-600" />
              Imagine This...
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Your life in 90 days with DJ Tour
            </p>
          </div>
          
          {/* Carousel visuel */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="h-[400px] w-full relative rounded-2xl overflow-hidden shadow-lg border-4 border-purple-300">
                <Image
                  src="/djlive.png"
                  alt="DJ Live Performance Instagram Story"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Instagram Story</h3>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="text-base text-gray-600 italic font-medium">"Tonight: DJ [YOUR NAME] live at Club XYZ 🔥"</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="h-[400px] w-full relative rounded-2xl overflow-hidden shadow-lg border-4 border-blue-300">
                <Image
                  src="/djbooth.png"
                  alt="DJ Booth POV with crowd"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your DJ Booth</h3>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="text-base text-gray-600 italic font-medium">"VIP table, packed crowd, your music"</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="h-[400px] w-full relative rounded-2xl overflow-hidden shadow-lg border-4 border-green-300">
                <Image
                  src="/dminsta.png"
                  alt="Instagram DM Success Story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your DMs</h3>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="text-base text-gray-600 italic font-medium">"Bro your set was insane last night 🔥"</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="h-[400px] w-full relative rounded-2xl overflow-hidden shadow-lg border-4 border-orange-300">
                <Image
                  src="/djshow.png"
                  alt="DJ Show Performance"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your DJ Show</h3>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="text-base text-gray-600 italic font-medium">"The crowd goes wild as you drop the beat 🎵"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Vidéo/Preuve dynamique */}
      <div className="relative z-20 py-24 bg-gradient-to-br from-purple-900 to-purple-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            🎬 See DJ Tour in Action
          </h2>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            Watch real DJs get their first bookings using our exact system
          </p>
          
          {/* Video placeholder */}
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl mb-8">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-l-[12px] border-l-purple-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>
                <p className="text-white text-lg font-semibold">Watch: From 0 to Booked in 90 Days</p>
                <p className="text-gray-400 text-sm mt-2">Real DJ success story • 2:30 min</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="text-white font-bold mb-2">AI Coach Demo</h3>
              <p className="text-purple-200 text-sm">See how our AI gives personalized advice</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-2xl mb-3">📱</div>
              <h3 className="text-white font-bold mb-2">Platform Walkthrough</h3>
              <p className="text-purple-200 text-sm">Complete tour of all features & tools</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="text-white font-bold mb-2">Real Results</h3>
              <p className="text-purple-200 text-sm">DJs sharing their actual bookings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section "Aperçu de la plateforme" */}
      <div className="relative z-20 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              👀 Inside DJ Tour Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Real screenshots, real results, real product
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Screenshot 1 - Analysis */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <div className="text-center">
                  <Search className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <p className="text-sm text-purple-700 font-semibold">AI Profile Analysis</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free Analysis Screenshot</h3>
                <p className="text-gray-600 text-sm">See exactly how our AI analyzes your Spotify, Instagram & TikTok to find your strengths</p>
              </div>
            </div>
            
            {/* Screenshot 2 - PDF Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-sm text-blue-700 font-semibold">Custom PDF Plan</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Roadmap</h3>
                <p className="text-gray-600 text-sm">Your exact step-by-step plan to get from 0 bookings to touring DJ</p>
              </div>
            </div>
            
            {/* Screenshot 3 - AI Coach */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">AI</span>
                  </div>
                  <p className="text-sm text-green-700 font-semibold">AI Coach Chat</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 AI Assistant</h3>
                <p className="text-gray-600 text-sm">Get instant answers, booking templates, and personalized advice anytime</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 mb-6">
              ✅ This is not just promises - it's a real, working platform
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              See Full Platform Demo →
            </button>
          </div>
        </div>
      </div>

      {/* Section "Build Your Tour in 3 Steps" */}
      <div className="relative z-20 py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🧭 Build Your Tour in 3 Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Simple, guided, guaranteed results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200 relative">
              <div className="absolute -top-4 left-8 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
              <div className="text-center">
                <div className="mb-4">
                  <Search className="w-16 h-16 text-purple-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Free Profile Analysis</h3>
                <p className="text-gray-600 mb-6">We scan your Spotify, TikTok & Instagram to find your strengths and gaps</p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-700 font-semibold">✅ Takes 2 minutes</p>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-200 relative">
              <div className="absolute -top-4 left-8 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
              <div className="text-center">
                <div className="mb-4">
                  <FileText className="w-16 h-16 text-blue-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Custom Plan</h3>
                <p className="text-gray-600 mb-6">Personalized PDF + platform access with your exact roadmap to touring</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700 font-semibold">✅ Instant access</p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200 relative">
              <div className="absolute -top-4 left-8 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
              <div className="text-center">
                <div className="mb-4">
                  <Target className="w-16 h-16 text-green-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Tour Poster</h3>
                <p className="text-gray-600 mb-6">In 90 days, you'll have real bookings and your own tour poster</p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700 font-semibold">✅ Guaranteed result</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Start My Free Analysis →
            </button>
          </div>
        </div>
      </div>

      {/* Section Problème */}
      <div className="relative z-20 py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-3">
            <Zap className="w-12 h-12 text-orange-600" />
            "Why are other DJs touring… and I'm still stuck?"
          </h2>
          
          <div className="text-left max-w-2xl mx-auto space-y-6 text-lg leading-relaxed">
            <p className="text-gray-600">Let's be honest.</p>
            <p className="text-gray-600">
              If you're not touring, not making money, not getting booked…<br />
              It's not because you're not talented.
            </p>
            <p className="text-gray-900 font-semibold text-xl">
              It's because you don't have the right system.
            </p>
          </div>
        </div>
      </div>

      {/* Section "Are you this DJ?" */}
      <div className="relative z-20 py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Are you this DJ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              We know exactly where you are in your journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/bedroom.jpg"
                  alt="Bedroom DJ"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">The Bedroom DJ</h3>
                <div className="space-y-2 text-gray-600">
                  <p>• 0 gigs, just bedroom mixes</p>
                  <p>• Amazing skills, zero bookings</p>
                  <p>• No idea how to get your first gig</p>
                  <p>• Watching others blow up on social</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/spotifydj.jpg"
                  alt="Spotify DJ"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">The Spotify DJ</h3>
                <div className="space-y-2 text-gray-600">
                  <p>• 100k+ Spotify listeners</p>
                  <p>• Viral tracks but no live shows</p>
                  <p>• Can't convert streams to bookings</p>
                  <p>• Stuck in the "online only" trap</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/club.jpg"
                  alt="Party DJ"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">The Party DJ</h3>
                <div className="space-y-2 text-gray-600">
                  <p>• Few local gigs, same venues</p>
                  <p>• Can't scale beyond your city</p>
                  <p>• No real tour or big bookings</p>
                  <p>• Stuck in the local scene</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <p className="text-2xl font-bold text-gray-900 mb-8">
              If you're one of these DJs, DJ Tour is for you.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                  <h3 className="font-bold text-xl text-gray-900">Bedroom mixes → International shows</h3>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                  <h3 className="font-bold text-xl text-gray-900">Unknown → Signing collabs with artists they love</h3>
                </div>
              </div>
            </div>
            
            <p className="text-xl font-semibold mt-12 text-gray-900">
              And you can do the same.
            </p>
          </div>
        </div>
      </div>

      {/* Section Différenciation */}
      <div className="relative z-20 py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            Why DJ Tour vs. Everyone Else?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-red-600 mb-4">❌ Everyone Else</h3>
              <div className="space-y-3 text-gray-600">
                <p>• Gives you vague "networking" advice</p>
                <p>• "Just be yourself and create good music"</p>
                <p>• Generic courses with no real contacts</p>
                <p>• No system, no structure, no results</p>
              </div>
            </div>
            
            <div className="text-left">
              <h3 className="text-2xl font-bold text-green-600 mb-4">✅ DJ Tour</h3>
              <div className="space-y-3 text-gray-600">
                <p>• Exact plan + real booking contacts</p>
                <p>• Copy-paste templates that work</p>
                <p>• AI assistant for personalized guidance</p>
                <p>• Complete system from 0 to touring</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 p-8 bg-white rounded-2xl border-2 border-purple-300">
            <p className="text-2xl font-bold mb-4 text-gray-900 flex items-center justify-center gap-3">
              <Circle className="w-8 h-8 text-purple-600" />
              The Truth:
            </p>
            <p className="text-xl text-gray-700">
              "Tous les autres te donnent des conseils flous.<br />
              Nous, on te donne le plan exact + les bons contacts + un assistant AI."
            </p>
          </div>
        </div>
      </div>

      {/* Section Tour Poster Mockup */}
      <div className="relative z-20 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Tour Poster Image */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/tourdj.png"
                  alt="DJ Tour Poster Mockup"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Right side - Content */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                Imagine Your DJ Tour Poster in 90 Days
              </h2>
              
              <div className="space-y-4 text-xl text-gray-600">
                <p>This is not a real tour — but it could be yours.</p>
                <p>We help DJs build their tour, step-by-step, even if they're starting from scratch.</p>
              </div>
              
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center justify-center px-12 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                style={{ 
                  boxShadow: '0 15px 35px rgba(147, 51, 234, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                }}
              >
                <span className="relative z-10">Build My Tour</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Pricing */}
      <div id="pricing" className="relative z-20 py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            💸 100€ — One-Time Payment
          </h2>
          <p className="text-red-600 font-bold text-xl mb-12 line-through">
            Prix normal: 200€
          </p>
          
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg mb-8">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <span className="text-green-600 font-bold text-xl">✅</span>
                <span className="text-lg text-gray-700">Lifetime access</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-600 font-bold text-xl">✅</span>
                <span className="text-lg text-gray-700">Guided tour builder</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-600 font-bold text-xl">✅</span>
                <span className="text-lg text-gray-700">Booking tools & email templates</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-600 font-bold text-xl">✅</span>
                <span className="text-lg text-gray-700">Private Telegram group</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-600 font-bold text-xl">✅</span>
                <span className="text-lg text-gray-700">AI assistant 24/7</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border-2 border-yellow-400 p-6 rounded-2xl mb-8">
            <p className="text-lg font-semibold text-gray-900">
              🛡️ Risk-free — If you don't get any tour in 1 year, we'll refund you.
            </p>
            <p className="text-yellow-600 mt-2">We're that confident.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center">
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">DJ Tour</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 DJ Tour. All rights reserved.</p>
        </div>
      </footer>

      {/* Bandeau sticky mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-red-600 text-white p-4 md:hidden animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            <span className="font-bold text-sm">🔥 27 accès restants</span>
          </div>
          <button className="bg-white text-red-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors">
            Rejoins DJ Tour →
          </button>
        </div>
      </div>

      {/* Styles CSS personnalisés */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
} 