import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
  color?: string;
  showValue?: boolean;
  animated?: boolean;
  glowEffect?: boolean;
}

export function ProgressBar({ 
  progress, 
  className,
  color = 'from-violet-500 via-fuchsia-500 to-pink-500',
  showValue = false,
  animated = true,
  glowEffect = true
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={cn(
      'relative w-full overflow-hidden rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
      'border border-gray-200 dark:border-gray-600 shadow-inner',
      className
    )}>
      {/* Animated background pulse */}
      <motion.div
        animate={{ 
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.02, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-full"
      />
      
      {/* Progress bar with enhanced effects */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: `${clampedProgress}%`,
          opacity: 1
        }}
        transition={{ 
          duration: animated ? 1.2 : 0, 
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: animated ? 0.3 : 0
        }}
        className={cn(
          'relative h-full rounded-full bg-gradient-to-r shadow-lg',
          color,
          glowEffect && 'shadow-violet-500/50 dark:shadow-violet-400/30'
        )}
      >
        {/* Shimmer effect */}
        <motion.div
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
        />
        
        {/* Particle effects */}
        {clampedProgress > 0 && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, 10, 20],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{ right: i * 3 }}
              />
            ))}
          </div>
        )}
        {/* Effet de brillance animé */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'linear'
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
            />
          </div>
        )}
        
        {/* Effet de pulsation pour les scores élevés */}
        {clampedProgress > 80 && glowEffect && (
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(139,92,246,0.4)',
                '0 0 30px rgba(139,92,246,0.6)',
                '0 0 20px rgba(139,92,246,0.4)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 rounded-full"
          />
        )}
        
        {/* Texture subtile */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full" />
      </motion.div>
      
      {/* Valeur affichée */}
      {showValue && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: animated ? 0.5 : 0, duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-xs font-bold text-gray-900 dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {Math.round(clampedProgress)}%
          </span>
        </motion.div>
      )}
      
      {/* Effet de lueur externe */}
      {glowEffect && clampedProgress > 0 && (
        <div 
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background: `radial-gradient(ellipse at center, rgba(139,92,246,0.2) 0%, transparent 70%)`,
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        />
      )}
    </div>
  );
} 