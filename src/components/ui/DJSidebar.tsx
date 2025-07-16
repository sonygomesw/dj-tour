'use client'

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { 
  Home, 
  BarChart3, 
  Trophy, 
  Settings, 
  User,
  LogOut,
  Sparkles,
  Users,
  Rocket,
  Navigation,
  Mail,
  FileText,
  Sun,
  Moon,
  Brain,
  MessageCircle,
  Play,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Calendar, label: 'My DJ Plan', href: '/my-dj-plan' },
  { icon: Navigation, label: 'My Tour', href: '/my-tour' },
  { icon: MessageCircle, label: 'DJ Coach AI', href: '/dj-coach-ai' },
  { icon: BarChart3, label: 'Stats', href: '/stats' },
  { icon: Users, label: 'Contacts', href: '/contacts' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function DJSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Gestion simple du thème sans contexte externe
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('dj-tour-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(savedTheme);
    } else {
      // Par défaut, utiliser le thème light
      setTheme('light');
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('dj-tour-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('dj-tour-theme', newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 h-full w-80 backdrop-blur-2xl bg-black/[0.02] border-r border-black/10 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.08)]">
      {/* Logo Section */}
              <div className="p-6 border-b border-black/10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 flex items-center justify-center shadow-[0_8px_32px_rgba(139,92,246,0.3),0_3px_16px_rgba(139,92,246,0.2)] border border-white/10">
              <Trophy className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-black">DJ Tour</h1>
            <p className="text-sm text-black/60 font-medium">Pro Edition</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-medium text-base hover:scale-105 active:scale-95",
                isActive
                  ? "text-gray-800 bg-gray-200/80 hover:bg-gray-300/90 hover:text-gray-900 shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
                  : "text-black/70 hover:bg-black/[0.05] hover:text-black",
                "relative",
                isActive && "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-black border border-violet-500/30 shadow-[0_8px_32px_rgba(139,92,246,0.25),0_2px_16px_rgba(139,92,246,0.15)]"
              )}
            >
              <div className="relative">
                <item.icon
                  className={cn(
                    "w-6 h-6 transition-colors duration-300",
                    isActive
                      ? "text-gray-700 group-hover:text-gray-900"
                      : "text-black/60 group-hover:text-black"
                  )}
                />
              </div>
              <span className="tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-black/10 space-y-2">
        {/* Theme Toggle - Removed since we're removing dark mode */}
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-black/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group font-medium text-base hover:scale-105"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
} 