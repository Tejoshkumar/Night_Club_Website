import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'solid' | 'interactive' | 'featured' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'solid',
  children,
  ...props
}) => {
  const variants = {
    solid: 'bg-nc-surface-1 border border-nc-border rounded-xl shadow-sm',
    interactive: 'bg-nc-surface-1 border border-nc-border rounded-xl hover:border-nc-violet/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
    featured: 'bg-gradient-to-b from-nc-surface-2 to-nc-surface-1 border border-nc-violet/30 rounded-xl shadow-glow-subtle',
    glass: 'nc-glass rounded-xl shadow-glass',
  };

  return (
    <div className={cn(variants[variant], 'p-5', className)} {...props}>
      {children}
    </div>
  );
};
