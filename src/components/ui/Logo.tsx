import React from 'react';
import { cn } from '../../lib/utils';

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withGlow?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  withGlow = true,
  className,
  alt = 'Nightclub Logo',
  ...props
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center shrink-0', className)}>
      {withGlow && (
        <div className="absolute inset-0 rounded-lg bg-nc-violet/25 blur-md pointer-events-none" />
      )}
      <img
        src="/logo.png"
        alt={alt}
        className={cn(
          'relative object-contain rounded-lg border border-nc-border/60 bg-nc-surface-1 shadow-sm',
          sizes[size]
        )}
        {...props}
      />
    </div>
  );
};
