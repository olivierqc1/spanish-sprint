// src/components/ui/Card.tsx
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'success' | 'danger';
}

const variantClasses = {
  default: 'bg-slate-950 border-slate-700',
  primary: 'bg-blue-950 border-blue-700',
  success: 'bg-emerald-950 border-emerald-700',
  danger: 'bg-red-950 border-red-700',
};

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  return (
    <div className={`p-5 border rounded-xl ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
