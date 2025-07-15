'use client'

import { Home, Target, BarChart2, User, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Missions', href: '/missions', icon: Target },
  { label: 'Stats', href: '/stats', icon: BarChart2 },
  { label: 'Profil', href: '/profile', icon: User },
]

export function MainNav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 h-12 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 z-50">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
              DJ Tour
            </h1>
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-gray-600 dark:text-white/70 hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 z-50">
        <div className="flex justify-around p-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 ${
                  isActive ? 'text-white' : 'text-gray-600 dark:text-white/70'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-3 right-3 p-1.5 rounded-lg bg-white/10 z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  )
} 