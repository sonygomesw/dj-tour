import { supabase } from './supabase'
import { StatsEntry, StatsProgress } from '@/types/stats'

export async function saveStats(stats: Omit<StatsEntry, 'id' | 'user_id' | 'created_at'>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('stats')
    .insert([
      {
        ...stats,
        user_id: user.id
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getStats(userId: string) {
  const { data, error } = await supabase
    .from('stats')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })

  if (error) throw error
  return data as StatsEntry[]
}

export async function getLatestStats(userId: string): Promise<StatsEntry | null> {
  const { data, error } = await supabase
    .from('stats')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
  return data as StatsEntry | null
}

export async function calculateProgress(userId: string): Promise<StatsProgress> {
  const stats = await getStats(userId)
  if (stats.length < 2) {
    return {
      spotify_growth: 0,
      instagram_growth: 0,
      tiktok_growth: 0,
      gigs_this_month: 0,
      revenue_growth: 0,
      avg_motivation: stats[0]?.motivation || 0
    }
  }

  const latest = stats[0]
  const previous = stats[1]
  const thisMonth = new Date(latest.date).getMonth()

  const gigsThisMonth = stats
    .filter(s => new Date(s.date).getMonth() === thisMonth)
    .reduce((sum, s) => sum + s.gigs_played, 0)

  const avgMotivation = stats
    .slice(0, 30)
    .reduce((sum, s) => sum + s.motivation, 0) / Math.min(stats.length, 30)

  return {
    spotify_growth: latest.spotify_listeners - previous.spotify_listeners,
    instagram_growth: latest.instagram_followers - previous.instagram_followers,
    tiktok_growth: latest.tiktok_followers - previous.tiktok_followers,
    gigs_this_month: gigsThisMonth,
    revenue_growth: latest.revenue && previous.revenue 
      ? (latest.revenue / previous.revenue) - 1 
      : 0,
    avg_motivation: avgMotivation
  }
} 