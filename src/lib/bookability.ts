// Utilitaire pour calculer le Bookability Score
// Basé sur les followers Instagram et les auditeurs Spotify mensuels

export interface BookabilityData {
  instagramFollowers: number
  spotifyListeners: number
}

export interface BookabilityResult {
  instagramScore: number
  spotifyScore: number
  totalScore: number
  level: number
  levelName: string
}

/**
 * Calcule le score Instagram basé sur le nombre de followers
 */
export function calculateInstagramScore(followers: number): number {
  if (followers < 1000) return 5
  if (followers < 5000) return 10
  if (followers < 10000) return 20
  if (followers < 50000) return 30
  if (followers < 100000) return 40
  return 50 // >100k
}

/**
 * Calcule le score Spotify basé sur les auditeurs mensuels
 */
export function calculateSpotifyScore(listeners: number): number {
  if (listeners < 1000) return 0
  if (listeners < 10000) return 5
  if (listeners < 50000) return 10
  if (listeners < 150000) return 15
  if (listeners < 300000) return 25
  if (listeners < 500000) return 40
  if (listeners < 800000) return 60
  if (listeners < 1000000) return 80
  return 100 // >1M
}

/**
 * Détermine le niveau basé sur le score total
 */
export function calculateLevel(score: number): { level: number; levelName: string } {
  if (score < 20) return { level: 1, levelName: 'Débutant' }
  if (score < 50) return { level: 2, levelName: 'En progression' }
  if (score < 80) return { level: 3, levelName: 'Confirmé' }
  if (score >= 100) return { level: 5, levelName: 'Légende' }
  return { level: 4, levelName: 'Expert' }
}

/**
 * Calcule le Bookability Score total (plafonné à 100)
 */
export function calculateBookabilityScore(data: BookabilityData): BookabilityResult {
  const instagramScore = calculateInstagramScore(data.instagramFollowers)
  const spotifyScore = calculateSpotifyScore(data.spotifyListeners)
  
  // Addition des scores, plafonnée à 100
  const rawTotal = instagramScore + spotifyScore
  const totalScore = Math.min(rawTotal, 100)
  
  const { level, levelName } = calculateLevel(totalScore)
  
  return {
    instagramScore,
    spotifyScore,
    totalScore,
    level,
    levelName
  }
}

/**
 * Formate un nombre en K/M pour l'affichage
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * Détermine la couleur du niveau
 */
export function getLevelColor(level: number): string {
  switch (level) {
    case 1: return 'text-gray-400'
    case 2: return 'text-blue-400'
    case 3: return 'text-purple-400'
    case 4: return 'text-yellow-400'
    case 5: return 'text-pink-400'
    default: return 'text-gray-400'
  }
}

/**
 * Détermine le gradient de couleur pour les barres de progression
 */
export function getLevelGradient(level: number): string {
  switch (level) {
    case 1: return 'from-gray-500 to-gray-600'
    case 2: return 'from-blue-500 to-blue-600'
    case 3: return 'from-purple-500 to-purple-600'
    case 4: return 'from-yellow-500 to-yellow-600'
    case 5: return 'from-pink-500 to-pink-600'
    default: return 'from-gray-500 to-gray-600'
  }
} 