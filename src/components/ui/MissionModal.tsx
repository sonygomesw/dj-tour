'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Star, Trophy, Play, CheckCircle2, Target, Camera, TrendingUp, Calendar, Users, Zap, Rocket } from 'lucide-react';
import { Mission } from '@/types/mission';
import { cn } from '@/lib/utils';

interface MissionModalProps {
  mission: Mission | null;
  isOpen: boolean;
  onClose: () => void;
  onStartMission: (mission: Mission) => void;
}

export function MissionModal({ mission, isOpen, onClose, onStartMission }: MissionModalProps) {
  if (!mission) return null;

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

  // Icônes et couleurs pour les niveaux
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return <div className="flex items-center gap-1 text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium">Débutant</span>
        </div>;
      case 'intermediate':
        return <div className="flex items-center gap-1 text-orange-600">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">Intermédiaire</span>
        </div>;
      case 'advanced':
        return <div className="flex items-center gap-1 text-red-600">
          <Rocket className="w-4 h-4" />
          <span className="text-sm font-medium">Avancé</span>
        </div>;
      default:
        return <div className="flex items-center gap-1 text-violet-600">
          <Trophy className="w-4 h-4" />
          <span className="text-sm font-medium">{difficulty}</span>
        </div>;
    }
  };

  const handleStartMission = () => {
    onStartMission(mission);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{getCategoryBadge(mission.category)}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mission.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {mission.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Infos mission */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{mission.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getDifficultyIcon(mission.difficulty)}
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{mission.points} pts</span>
                    </div>
                  </div>
                </div>
                
                {/* Bouton fermer */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {/* Étapes de la mission */}
                {mission.steps && mission.steps.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-violet-500" />
                      Étapes de la mission
                    </h3>
                    <div className="space-y-3">
                      {mission.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Récompenses */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Récompenses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {mission.points} Points XP
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Progression dans votre carrière
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                      <Trophy className="w-5 h-5 text-violet-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          Badge DJ
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Débloque de nouvelles missions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conseils */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 text-sm">
                    💡 Conseil
                  </h4>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    Prenez votre temps pour bien comprendre chaque étape. La qualité est plus importante que la vitesse !
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Durée estimée : {mission.duration}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Fermer
                  </button>
                  <motion.button
                    onClick={handleStartMission}
                    className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm hover:shadow-md flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-4 h-4" />
                    Commencer la mission
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 