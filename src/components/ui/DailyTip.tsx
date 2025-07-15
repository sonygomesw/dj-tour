import { useState, useEffect } from 'react'
import { Lightbulb } from 'lucide-react'

interface DailyTipProps {
  tips: {
    emoji: string
    content: string
  }[]
}

export function DailyTip({ tips }: DailyTipProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentTipIndex((prev) => (prev + 1) % tips.length)
        setIsVisible(true)
      }, 500)
    }, 10000)

    return () => clearInterval(interval)
  }, [tips.length])

  const currentTip = tips[currentTipIndex]

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 right-0">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <div className="relative">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-500/10">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
          </div>
          <div className={`transition-all duration-500 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="text-gray-900 dark:text-white font-medium mb-1">Conseil du jour</h3>
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentTip.emoji}</span>
              <p className="text-[#d1d5db] text-sm">{currentTip.content}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-1 mt-4">
        {tips.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentTipIndex ? 'bg-yellow-400' : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  )
} 