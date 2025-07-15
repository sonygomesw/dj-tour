import { Mission, MissionCategory, MissionStatus } from '@/types/mission'

const missions: Mission[] = [
  // PHASE 1: PREPARATION & POSITIONING
  {
    id: 'social-setup',
    title: 'Instagram & TikTok Setup',
    description: 'Create or optimize your Instagram + TikTok profile with a clear bio, HD photo, and music links.',
    category: MissionCategory.PREPARATION,
    status: MissionStatus.AVAILABLE,
    difficulty: 'beginner',
    points: 100,
    duration: '1-2 days',
    icon: 'instagram',
    steps: [
      'Create/optimize Instagram profile',
      'Create/optimize TikTok profile',
      'Add professional bio',
      'Upload HD photo'
    ],
    rewards: {
      xp: 100,
      badges: ['🎵'],
      unlockMissions: ['spotify-setup']
    },
    tips: [
      'Use a professional photo that shows your personality',
      'Include your music genre and location in your bio',
      'Add links to your music on streaming platforms'
    ]
  },
  {
    id: 'spotify-setup',
    title: 'Spotify for Artists',
    description: 'Create a Spotify for Artists account with a pro photo, bio, and at least 1 track/mix.',
    category: MissionCategory.PREPARATION,
    status: MissionStatus.LOCKED,
    difficulty: 'beginner',
    points: 150,
    duration: '2-3 days',
    icon: 'music',
    steps: [
      'Create Spotify for Artists account',
      'Add professional photo',
      'Write complete bio',
      'Upload at least 1 track/mix'
    ]
  },
  {
    id: 'competitor-analysis',
    title: 'Niche Analysis',
    description: 'Identify 3 DJs in your niche and analyze their visual style, TikTok formats, bio, and branding.',
    category: MissionCategory.PREPARATION,
    status: MissionStatus.LOCKED,
    difficulty: 'intermediate',
    points: 200,
    duration: '2-3 days',
    icon: 'search',
    steps: [
      'Identify 3 DJs in your niche',
      'Analyze their visual style',
      'Study their TikTok formats',
      'Note their branding and bio'
    ]
  }
]

export default missions
export { missions } 