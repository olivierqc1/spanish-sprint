// src/components/ui/Card.tsx
import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'success' | 'danger';
}

interface CardSubComponentProps {
  children: ReactNode;
  className?: string;
}

const variantClasses = {
  default: 'bg-slate-950 border-slate-700',
  primary: 'bg-blue-950 border-blue-700',
  success: 'bg-emerald-950 border-emerald-700',
  danger: 'bg-red-950 border-red-700',
};

export function Card({ children, className = '', variant = 'default', ...props }: CardProps) {
  return (
    <div className={`p-5 border rounded-xl ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: CardSubComponentProps) {
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: CardSubComponentProps) {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }: CardSubComponentProps) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '' }: CardSubComponentProps) {
  return (
    <div className={`pt-0 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: CardSubComponentProps) {
  return (
    <div className={`flex items-center pt-0 ${className}`}>
      {children}
    </div>
  );
}