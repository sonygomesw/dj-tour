import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
}

function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';
  
  const variantStyles = {
    default: 'bg-white/10 text-white',
    secondary: 'bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100',
    outline: 'border border-white/20 text-gray-700 dark:text-white/80'
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
export { Badge }; 