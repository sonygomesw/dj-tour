'use client'

import React, { useState, useEffect } from 'react'
import { DJSidebar } from '@/components/ui/DJSidebar'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { Button } from '@/components/ui/button'
import { AddTourDateModal } from '@/components/ui/AddTourDateModal'
import { supabase } from '@/lib/supabase'
import { TourDate, TourStats } from '@/types/tour'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Music, 
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Navigation,
  Star,
  DollarSign,
  CheckCircle,
  AlertCircle,
  CalendarDays,
  Euro
} from 'lucide-react'

export default function MyTourPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'calendar' | 'map' | 'list'>('calendar')
  const [tourDates, setTourDates] = useState<TourDate[]>([])
  const [stats, setStats] = useState<TourStats>({ total_dates: 0, confirmed_dates: 0, pending_dates: 0, total_revenue: 0 })
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  // Load data
  const loadTourDates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.log('No user connected')
        setLoading(false)
        return
      }

      // Load tour dates
      const { data: dates, error: datesError } = await supabase
        .from('tour_dates')
        .select('*')
        .eq('user_id', user.id)
        .order('event_date', { ascending: true })

      if (datesError) {
        console.error('Date loading error:', datesError)
        setLoading(false)
        return
      }

      setTourDates(dates || [])

      // Calculate statistics
      const confirmedDates = dates?.filter(d => d.status === 'confirmed').length || 0
      const pendingDates = dates?.filter(d => d.status === 'pending').length || 0
      const totalRevenue = dates?.filter(d => d.status === 'confirmed' && d.fee).reduce((sum, d) => sum + (d.fee || 0), 0) || 0

      setStats({
        total_dates: dates?.length || 0,
        confirmed_dates: confirmedDates,
        pending_dates: pendingDates,
        total_revenue: totalRevenue
      })

      console.log('✅ Data loaded:', dates?.length || 0, 'dates')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load on startup
  useEffect(() => {
    loadTourDates()
  }, [])

  // Delete a date
  const deleteTourDate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tour_dates')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Deletion error:', error)
        return
      }

      // Reload data
      await loadTourDates()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'from-green-500 to-emerald-500'
      case 'pending': return 'from-yellow-500 to-orange-500'
      case 'cancelled': return 'from-red-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle
      case 'pending': return Clock
      case 'cancelled': return AlertCircle
      default: return Clock
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed'
      case 'pending': return 'Pending'
      case 'cancelled': return 'Cancelled'
      default: return status
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString?: string) => {
    if (!timeString) return ''
    return timeString.substring(0, 5) // HH:MM
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-white dark:bg-[#0F0F11] scale-75 origin-top-left">
        <DJSidebar />
        <div className="flex-1 ml-96 p-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0F0F11] transition-colors duration-300 scale-75 origin-top-left">
      <DJSidebar />
      <div className="flex-1 ml-96 p-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tl from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 mb-6">
          <GlassContainer className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <Navigation className="w-6 h-6 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Tour</h1>
                  <p className="text-gray-600 dark:text-white/60">Visual management of your tour</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="h-10 bg-violet-600 hover:bg-violet-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add a date
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'default' : 'outline'}
                  onClick={() => setViewMode('calendar')}
                  className="h-10"
                >
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Calendar
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  className="h-10"
                >
                  <Music className="w-4 h-4 mr-2" />
                  List
                </Button>
              </div>
            </div>
          </GlassContainer>
        </div>

        {/* Stats Overview */}
        <div className="relative z-10 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <GlassContainer className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.confirmed_dates}</p>
                  <p className="text-gray-600 dark:text-white/60 text-sm">Confirmed</p>
                </div>
              </div>
            </GlassContainer>
            
            <GlassContainer className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending_dates}</p>
                  <p className="text-gray-600 dark:text-white/60 text-sm">Pending</p>
                </div>
              </div>
            </GlassContainer>

            <GlassContainer className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_dates}</p>
                  <p className="text-gray-600 dark:text-white/60 text-sm">Total</p>
                </div>
              </div>
            </GlassContainer>

            <GlassContainer className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <Euro className="w-5 h-5 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">€{stats.total_revenue.toLocaleString()}</p>
                  <p className="text-gray-600 dark:text-white/60 text-sm">Estimated total</p>
                </div>
              </div>
            </GlassContainer>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {tourDates.length === 0 ? (
            <GlassContainer className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-violet-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No tour dates
              </h3>
              <p className="text-gray-600 dark:text-white/60 mb-6">
                Start by adding your first tour date
              </p>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-violet-600 hover:bg-violet-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add a date
              </Button>
            </GlassContainer>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tourDates.map((date) => {
                const StatusIcon = getStatusIcon(date.status)
                return (
                  <GlassContainer key={date.id} className="p-6 border-2 border-gray-400 dark:border-gray-500">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getStatusColor(date.status)} flex items-center justify-center`}>
                        <StatusIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        <button 
                          onClick={() => deleteTourDate(date.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {date.club_name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-white/60 text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{date.city}, {date.country}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-white/60 text-sm mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(date.event_date)}</span>
                      </div>
                      {(date.start_time || date.end_time) && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-white/60 text-sm mb-2">
                          <Clock className="w-4 h-4" />
                          <span>
                            {formatTime(date.start_time)} 
                            {date.end_time && ` - ${formatTime(date.end_time)}`}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      {date.fee && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-white/60">Fee</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">€{date.fee.toLocaleString()}</span>
                        </div>
                      )}

                      {date.genre && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-white/60">Genre</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{date.genre}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-white/60">Status</span>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          date.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          date.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {getStatusText(date.status)}
                        </span>
                      </div>
                    </div>

                    {date.notes && (
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <p className="text-sm text-gray-600 dark:text-white/60">{date.notes}</p>
                      </div>
                    )}
                  </GlassContainer>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add Tour Date Modal */}
      <AddTourDateModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadTourDates}
      />
    </div>
  )
} 