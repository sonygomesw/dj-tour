'use client'

import { FC, ReactNode } from 'react'

interface GradientBackgroundProps {
  children: ReactNode
  className?: string
}

export const GradientBackground: FC<GradientBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-[#121212] relative ${className}`}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#121212] to-black opacity-5" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      {/* Hero banner image */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] to-[#121212]" />
        <img
          src="/fond.jpeg"
          alt="DJ Background"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 