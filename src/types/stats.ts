export interface StatsEntry {
  id: string
  user_id: string
  date: string
  spotify_listeners: number
  instagram_followers: number
  tiktok_followers: number
  gigs_played: number
  revenue?: number
  motivation: number
  notes: string
  created_at: string
}

export interface StatsProgress {
  spotify_growth: number
  instagram_growth: number
  tiktok_growth: number
  gigs_this_month: number
  revenue_growth: number
  avg_motivation: number
} 