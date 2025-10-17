// src/components/ui/Badge.tsx
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

const variantClasses = {
  default: 'bg-slate-700 text-slate-200',
  primary: 'bg-blue-600 text-white',
  success: 'bg-emerald-600 text-white',
  warning: 'bg-amber-600 text-white',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
