export interface DJProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  dj_name: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  instagram: string | null;
  tiktok: string | null;
  spotify: string | null;
  soundcloud: string | null;
  beatport: string | null;
  created_at: string;
  updated_at: string;
}

export interface DJStats {
  id: string;
  user_id: string;
  date: string;
  spotify_listeners: number;
  instagram_followers: number;
  tiktok_followers: number;
  gigs_played: number;
  revenue: number | null;
  motivation: number;
  notes: string | null;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt: string;
}

export enum MissionCategory {
  VISIBILITY = 'visibility',
  STRATEGY = 'strategy',
  CONTENT = 'content',
  BOOKING = 'booking',
  PROFESSIONAL = 'professional',
  SKILLS = 'skills'
}

export enum MissionStatus {
  LOCKED = 'locked',
  AVAILABLE = 'available',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

export interface MissionRewards {
  points: number;
  badge: string;
  unlocks: number[];
}

export interface Mission {
  id: number;
  title: string;
  description: string;
  steps: string[];
  rewards: MissionRewards;
  timeEstimate: string;
  category: MissionCategory;
  status: MissionStatus;
  requiredMissions: number[];
} 