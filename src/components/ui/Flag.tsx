// src/components/ui/Flag.tsx
interface FlagProps {
  country: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const countryToCode: Record<string, string> = {
  'Espagne': 'spain',
  'Mexique': 'mexico',
  'Argentine': 'argentina',
  'Colombie': 'colombia',
  'Pérou': 'peru',
  'Chili': 'chile',
  'Cuba': 'cuba',
  'Venezuela': 'venezuela',
};

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export function Flag({ country, size = 'md', className = '' }: FlagProps) {
  const countryCode = countryToCode[country] || 'spain';
  const src = `/images/flags/${countryCode}.svg`;

  return (
    <img
      src={src}
      alt={`Flag of ${country}`}
      className={`inline-block rounded ${sizeClasses[size]} ${className}`}
      onError={(e) => {
        // Fallback vers emoji si image non trouvée
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const span = document.createElement('span');
        span.textContent = country === 'Espagne' ? '🇪🇸' : 
                          country === 'Mexique' ? '🇲🇽' :
                          country === 'Argentine' ? '🇦🇷' : '🌍';
        span.className = `text-${size === 'sm' ? 'base' : size === 'md' ? 'xl' : '3xl'}`;
        target.parentNode?.replaceChild(span, target);
      }}
    />
  );
}
