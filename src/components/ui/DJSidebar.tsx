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
    <div className="fixed left-0 top-0 h-full w-96 backdrop-blur-2xl bg-black/[0.02] dark:bg-white/[0.02] border-r border-black/10 dark:border-white/10 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.08)]">
      {/* Logo Section */}
      <div className="p-8 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-[0_8px_32px_rgba(139,92,246,0.3),0_3px_16px_rgba(139,92,246,0.2)] border border-white/10">
              <Trophy className="w-7 h-7 text-gray-900 dark:text-white drop-shadow-sm" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-2.5 h-2.5 text-gray-900 dark:text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white">DJ Tour</h1>
            <p className="text-sm text-black/60 dark:text-gray-600 dark:text-white/60 font-medium">Pro Edition</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-6 space-y-3">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          const isDarkItem = item.label === 'Presskit Examples' || item.label === 'Contacts';
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl font-medium text-lg",
                "transition-all duration-300 group cursor-pointer",
                "hover:scale-105",
                isDarkItem 
                  ? "text-gray-800 dark:text-gray-200 bg-gray-200/80 dark:bg-gray-800/80 hover:bg-gray-300/90 dark:hover:bg-gray-700/90 hover:text-gray-900 dark:hover:text-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
                  : "text-black/70 dark:text-white/70 hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:text-black dark:hover:text-white",
                "hover:shadow-[0_8px_32px_rgba(139,92,246,0.15),0_2px_16px_rgba(139,92,246,0.1)]",
                isActive && "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-black dark:text-white border border-violet-500/30 shadow-[0_8px_32px_rgba(139,92,246,0.25),0_2px_16px_rgba(139,92,246,0.15)]"
              )}
            >
              <div className="relative">
                <item.icon className={cn(
                  "w-6 h-6 transition-all duration-300",
                  isActive 
                    ? "text-violet-400" 
                    : isDarkItem 
                      ? "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                      : "text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white"
                )} />
                {isActive && (
                  <div className="absolute inset-0 bg-violet-500/30 rounded-full blur-lg -z-10" />
                )}
              </div>
              <span className="font-semibold">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 shadow-lg" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-black/10 dark:border-white/10 space-y-3">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-black/60 dark:text-gray-600 dark:text-white/60 hover:text-violet-400 hover:bg-violet-500/10 transition-all duration-300 group font-medium text-lg hover:scale-105"
        >
          {theme === 'dark' ? (
            <Sun className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          ) : (
            <Moon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          )}
          <span className="font-semibold">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-black/60 dark:text-gray-600 dark:text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group font-medium text-lg hover:scale-105"
        >
          <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
} 