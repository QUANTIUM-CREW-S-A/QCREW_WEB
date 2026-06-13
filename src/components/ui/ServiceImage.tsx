import { useState } from 'react';

interface ServiceImageProps {
  src: string;
  alt: string;
  className?: string;
  serviceType: 'dev' | 'systems' | 'support' | 'install';
}

const gradientColors = {
  dev: 'from-blue-600 via-purple-600 to-pink-600',
  systems: 'from-green-600 via-teal-600 to-blue-600',
  support: 'from-orange-600 via-red-600 to-pink-600',
  install: 'from-indigo-600 via-purple-600 to-pink-600'
};

const serviceIcons = {
  dev: '💻',
  systems: '🖥️',
  support: '🎧',
  install: '🔧'
};

export function ServiceImage({ src, alt, className = '', serviceType }: ServiceImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`${className} bg-gradient-to-br ${gradientColors[serviceType]} flex items-center justify-center relative overflow-hidden`}>
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        
        {/* Icono del servicio */}
        <div className="relative z-10 text-center">
          <div className="text-4xl mb-2">{serviceIcons[serviceType]}</div>
          <div className="text-white/80 text-sm font-medium">{alt}</div>
        </div>
        
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
}