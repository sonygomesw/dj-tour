import { motion } from 'framer-motion';
import { GlassContainer } from './GlassContainer';
import Badge from './badge';
import { 
  Trophy, 
  Clock, 
  Star, 
  ChevronRight, 
  Play, 
  Target, 
  Camera, 
  TrendingUp, 
  Calendar, 
  Users, 
  Zap, 
  Rocket, 
  CheckCircle2 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressBar } from './ProgressBar';

interface MissionCardProps {
  title: string;
  description: string;
  duration: string;
  points: number;
  difficulty: string;
  category: string;
  isCompleted?: boolean;
  icon?: React.ReactNode;
  index?: number;
  onClick?: () => void;
  progress?: number;
}

export function MissionCard({
  title,
  description,
  duration,
  points,
  difficulty,
  category,
  isCompleted,
  icon,
  index,
  onClick,
  progress = 0
}: MissionCardProps) {
  // Badges emoji par catégorie
  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case 'booking':
        return '🎯';
      case 'content':
        return '📸';
      case 'visibility':
        return '📈';
      case 'preparation':
        return '📅';
      case 'networking':
        return '👥';
      default:
        return '🏆';
    }
  };

  // Icônes par catégorie (pour le fond)
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'booking':
        return <Target className="w-4 h-4 text-orange-500" />;
      case 'content':
        return <Camera className="w-4 h-4 text-purple-500" />;
      case 'visibility':
        return <TrendingUp className="w-4 h-4 text-pink-500" />;
      case 'preparation':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'networking':
        return <Users className="w-4 h-4 text-teal-500" />;
      default:
        return <Trophy className="w-4 h-4 text-violet-500" />;
    }
  };

  // Icônes et couleurs pour les niveaux
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return (
          <div className="flex items-center gap-1 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium">Débutant</span>
          </div>
        );
      case 'intermediate':
        return (
          <div className="flex items-center gap-1 text-orange-600">
            <Zap className="w-3 h-3" />
            <span className="text-xs font-medium">Intermédiaire</span>
          </div>
        );
      case 'advanced':
        return (
          <div className="flex items-center gap-1 text-red-600">
            <Rocket className="w-3 h-3" />
            <span className="text-xs font-medium">Avancé</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 text-violet-600">
            <Trophy className="w-3 h-3" />
            <span className="text-xs font-medium">{difficulty}</span>
          </div>
        );
    }
  };

  return (
    <div className="h-full">
      <motion.div
        className={cn(
          "h-full flex flex-col p-6 cursor-pointer group relative overflow-hidden",
          "bg-white border border-gray-200",
          "rounded-xl transition-all duration-300",
          "hover:shadow-xl hover:shadow-violet-500/10",
          "hover:border-violet-300",
          "hover:scale-[1.02] hover:-translate-y-1"
        )}
        onClick={onClick}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Effet de lumière subtile au hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Header avec badges */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {description}
            </p>
          </div>
          {/* Badge catégorie emoji en haut à droite */}
          <div className="flex items-center gap-2 ml-4">
            <div className="text-2xl">{getCategoryBadge(category)}</div>
            {isCompleted && (
              <div className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Informations essentielles */}
        <div className="space-y-3 mb-4 relative z-10">
          {/* Durée */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          {/* Niveau et points - toujours visibles */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getDifficultyIcon(difficulty)}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">{points} pts</span>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Barre de progression améliorée */}
        <div className="mb-4 relative z-10">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-gray-600">Progression</span>
            <span className="text-gray-900 font-medium">{Math.round(progress)}%</span>
          </div>
          {/* Barre de progression avec style amélioré même à 0% */}
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-violet-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            {/* Indicateur visuel même à 0% */}
            {progress === 0 && (
              <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-violet-400 rounded-full animate-pulse" />
            )}
          </div>
        </div>

        {/* Bouton d'action amélioré */}
        <motion.button
          className={cn(
            "w-full flex items-center justify-center gap-2 p-3 rounded-xl relative z-10",
            "font-semibold text-sm transition-all duration-300",
            "shadow-sm hover:shadow-lg",
            isCompleted
              ? "bg-green-50 text-green-700 hover:bg-green-100"
              : "bg-violet-600 hover:bg-violet-700 text-white hover:shadow-violet-500/25"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Mission terminée</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Commencer la mission</span>
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
} 