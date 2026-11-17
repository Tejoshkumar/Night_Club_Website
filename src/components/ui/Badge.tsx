import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'violet' | 'blue' | 'success' | 'warning' | 'danger' | 'subtle';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'violet',
  children,
  ...props
}) => {
  const variants = {
    violet: 'bg-nc-violet/15 text-nc-violet-soft border-nc-violet/30',
    blue: 'bg-nc-blue/15 text-nc-blue border-nc-blue/30',
    success: 'bg-nc-success/15 text-nc-success border-nc-success/30',
    warning: 'bg-nc-warning/15 text-nc-warning border-nc-warning/30',
    danger: 'bg-nc-danger/15 text-nc-danger border-nc-danger/30',
    subtle: 'bg-nc-surface-3 text-nc-text-muted border-nc-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border select-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
