'use client'

import { Play, LayoutDashboard, Target, Search, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()
  
  if (pathname === '/') return null

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[100]">
      <div className="relative flex flex-col gap-4 items-center backdrop-blur-[32px] bg-[rgba(30,30,30,0.7)] rounded-[20px] py-4 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] before:absolute before:inset-0 before:rounded-[20px] before:backdrop-blur-3xl before:bg-gradient-to-b before:from-white/10 before:to-transparent before:border before:border-white/10">
        <div className="relative z-10 flex flex-col gap-4">
          <NavItem href="/dashboard" icon={LayoutDashboard} />
          <NavItem href="/missions" icon={Target} />
          <NavItem href="/profile" icon={User} />
          <NavItem href="/search" icon={Search} />
        </div>
      </div>
    </div>
  )
}

function NavItem({ href, icon: Icon }: { href: string; icon: typeof Play }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link 
      href={href}
      className={`
        group relative w-9 h-9 flex items-center justify-center rounded-[14px]
        transition-all duration-300
        ${isActive 
          ? 'bg-gradient-to-b from-white/20 to-white/10 text-gray-900 dark:text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
          : 'hover:bg-white/10 text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
        }
      `}
    >
      <Icon className={`
        w-[18px] h-[18px] 
        transition-all duration-300 
        ${isActive ? 'scale-100' : 'scale-90 group-hover:scale-100'}
      `} />
      {isActive && (
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/80 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
      )}
    </Link>
  )
} 