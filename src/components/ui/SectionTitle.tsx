import { FC, ReactNode } from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h1 className={`text-3xl font-bold mb-6 ${className}`}>
      {children}
    </h1>
  );
} 