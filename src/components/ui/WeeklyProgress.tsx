import { useMemo } from 'react'

interface WeeklyProgressProps {
  data: {
    day: 'S' | 'M' | 'T' | 'W' | 'T' | 'F' | 'S'
    value: number
    isToday?: boolean
  }[]
  maxValue: number
  currentValue: string
  label: string
}

export function WeeklyProgress({ data, maxValue, currentValue, label }: WeeklyProgressProps) {
  const normalizedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      height: `${(item.value / maxValue) * 100}%`
    }))
  }, [data, maxValue])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{currentValue}</div>
          <div className="text-sm text-[#d1d5db]">{label}</div>
        </div>
      </div>

      <div className="flex-1 flex items-end gap-3 mt-6">
        {normalizedData.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full relative h-32">
              <div 
                className={`w-full rounded-full transition-all duration-500 ease-out ${
                  item.isToday 
                    ? 'bg-gradient-to-t from-purple-500 to-blue-500' 
                    : 'bg-white/10'
                }`}
                style={{ height: item.height }}
              />
            </div>
            <span className="text-sm text-[#d1d5db]">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
} 