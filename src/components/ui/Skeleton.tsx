// src/components/ui/Skeleton.tsx
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular' 
}: SkeletonProps) {
  const baseClass = 'animate-pulse bg-slate-800';
  
  const variantClass = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }[variant];

  return <div className={`${baseClass} ${variantClass} ${className}`} />;
}

// Exemple d'utilisation des Skeletons
export function ConversationCardSkeleton() {
  return (
    <div className="p-5 border-2 border-slate-700 rounded-xl">
      <div className="flex justify-between items-start mb-3">
        <Skeleton variant="circular" className="w-12 h-12" />
        <Skeleton variant="rectangular" className="w-12 h-6" />
      </div>
      <Skeleton variant="text" className="w-3/4 mb-2" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
  );
    }
