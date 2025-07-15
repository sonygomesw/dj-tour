import { useRef, useState } from 'react';
import { MissionCard } from './MissionCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { Mission as MissionType } from '@/types/mission';

interface MissionCarouselProps {
  missions: (Omit<MissionType, 'status' | 'steps'> & { isCompleted?: boolean })[];
  onMissionClick?: (mission: MissionType) => void;
}

export function MissionCarousel({ missions, onMissionClick }: MissionCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const scrollAmount = direction === 'left' ? -350 : 350;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <div className="relative">
      {/* Navigation simplifiée */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      )}
      
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      )}

      {/* Carousel simplifié */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-none gap-8 pb-4 scroll-smooth px-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {missions.map((mission, index) => (
          <div
            key={mission.id}
            className="min-w-[320px] max-w-[320px] flex-shrink-0"
          >
            <MissionCard
              {...mission}
              index={index}
              onClick={() => onMissionClick?.(mission as MissionType)}
            />
          </div>
        ))}
      </div>

      {/* Masques de dégradé simplifiés */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none" />
    </div>
  );
} 