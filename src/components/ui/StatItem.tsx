import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  current: number
  previous: number
  color?: 'pink' | 'green' | 'purple' | 'blue'
  iconClassName?: string
}

export function StatItem({ 
  icon: Icon, 
  label, 
  current, 
  previous,
  color = 'blue',
  iconClassName
}: StatItemProps) {
  const percentage = Math.round(((current - previous) / previous) * 100)
  const isPositive = current >= previous

  const colors = {
    pink: 'bg-pink-50 text-pink-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    blue: 'bg-blue-50 text-blue-600'
  }

  return (
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${iconClassName}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">{label}</span>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(percentage)}%
            </span>
          </div>
        </div>
        <div className="text-xl font-bold text-gray-900 mt-1">
          {current.toLocaleString()}
        </div>
      </div>
    </div>
  )
} 