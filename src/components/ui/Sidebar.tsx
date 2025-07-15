'use client'

import { Home, Target, BarChart2, User, Music, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { defaultProfile } from '@/data/defaultProfile'
import Image from 'next/image'

const mainNavItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Missions', href: '/missions', icon: Target },
  { label: 'Stats', href: '/stats', icon: BarChart2 },
  { label: 'Profil', href: '/profile', icon: User },
]

const bottomNavItems = [
  { label: 'Paramètres', href: '/settings', icon: Settings },
  { label: 'Déconnexion', href: '/auth', icon: LogOut },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-black/40 backdrop-blur-xl border-r border-white/10">
      <div className="flex flex-col h-full p-6">
        {/* Logo */}
        <div className="flex items-center gap-4 px-2 py-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-yellow-500 flex items-center justify-center">
            <Music className="w-7 h-7 text-gray-900 dark:text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
            DJ Tour
          </span>
        </div>

        {/* Profile Preview */}
        <div className="mt-8 p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/20">
              <Image
                src={defaultProfile.avatar}
                alt={defaultProfile.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{defaultProfile.name}</h3>
              <p className="text-sm text-gray-600 dark:text-white/60 mt-1">{defaultProfile.level}</p>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                2750 pts
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="mt-10 space-y-3">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-600 dark:text-white/60 hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-base font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-yellow-500" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="mt-auto">
          <div className="pt-6 border-t border-white/10">
            {bottomNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl text-gray-600 dark:text-white/60 hover:bg-white/5 hover:text-gray-900 dark:text-white transition-all"
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-base font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
} 