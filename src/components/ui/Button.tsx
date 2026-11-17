import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nc-violet focus-visible:ring-offset-2 focus-visible:ring-offset-nc-bg disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary: 'bg-nc-violet hover:bg-nc-violet-soft text-nc-bg font-semibold shadow-glow-subtle hover:shadow-glow-violet',
      secondary: 'bg-nc-surface-2 hover:bg-nc-surface-3 text-nc-text border border-nc-border hover:border-nc-violet/30',
      outline: 'bg-transparent hover:bg-nc-surface-2 text-nc-text border border-nc-border hover:border-nc-violet-soft/40',
      ghost: 'bg-transparent hover:bg-nc-surface-2 text-nc-text-muted hover:text-nc-text',
      destructive: 'bg-nc-danger/15 hover:bg-nc-danger/25 text-nc-danger border border-nc-danger/30',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-10',
      lg: 'text-base px-6 py-2.5 gap-2.5 h-12',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-current" /> : leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
