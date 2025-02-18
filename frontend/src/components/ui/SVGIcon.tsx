import React from 'react';

interface SvgIconProps {
  name: string;
  className?: string;
  size?: number;
  fallback?: React.ReactNode;
}

const SVGIcon: React.FC<SvgIconProps> = ({ 
  name, 
  className = '', 
  size = 24, 
  fallback = null 
}) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    // Reset error state when icon name changes
    setHasError(false);
  }, [name]);

  if (hasError) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <span className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
        ?
      </span>
    );
  }

  try {
    return (
      <svg
        className={`inline-block ${className}`}
        width={size}
        height={size}
        onError={() => setHasError(true)}
      >
        <use
          href={`#${name}`}
          width="100%"
          height="100%"
          onError={() => setHasError(true)}
        />
      </svg>
    );
  } catch (error) {
    setHasError(true);
    return fallback || null;
  }
};

export default SVGIcon;