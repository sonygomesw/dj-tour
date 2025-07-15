import { LucideIcon } from 'lucide-react'

interface AppCardProps {
  title: string
  subtitle: string
  points: number
  price: string
  icon: LucideIcon
  gradient: string
  isCompleted: boolean
  onComplete?: () => void
}

export function AppCard({
  title,
  subtitle,
  points,
  price,
  icon: Icon,
  gradient,
  isCompleted,
  onComplete
}: AppCardProps) {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl cursor-pointer
      bg-gradient-to-br ${gradient}
      transition-all duration-300 ease-out
      hover:scale-[1.02] hover:shadow-xl
      aspect-[4/5]
    `}>
      <div className="absolute inset-[1px] rounded-2xl bg-[#0e0e10]/90 flex flex-col p-6">
        {/* Status Badge */}
        {isCompleted ? (
          <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
            Completed
          </div>
        ) : onComplete && (
          <button
            onClick={onComplete}
            className="absolute top-4 right-4 bg-[#007AFF]/20 text-[#007AFF] px-3 py-1 rounded-full text-sm hover:bg-[#007AFF]/30 transition-colors"
          >
            Start Now
          </button>
        )}

        {/* Icon */}
        <div className="p-2 rounded-xl bg-white/[0.05] w-fit mb-4">
          <Icon className="w-6 h-6 text-white/90" />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-white/90 font-medium mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-white/60 text-sm line-clamp-2">{subtitle}</p>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <div className="text-white/90">
            <span className="font-medium">{points}</span>
            <span className="text-gray-600 dark:text-white/60 text-sm ml-1">pts</span>
          </div>
          <div className="text-gray-600 dark:text-white/60 text-sm">{price}</div>
        </div>
      </div>
    </div>
  )
} 