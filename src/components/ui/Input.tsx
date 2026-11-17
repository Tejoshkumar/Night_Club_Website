import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, type = 'text', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-nc-text-muted">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          className={cn(
            'w-full px-3.5 py-2.5 bg-nc-surface-2 border border-nc-border rounded-lg text-nc-text placeholder:text-nc-text-subtle text-sm transition-all focus:outline-none focus:border-nc-violet focus:ring-1 focus:ring-nc-violet',
            error && 'border-nc-danger focus:border-nc-danger focus:ring-nc-danger',
            className
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-nc-text-subtle">{hint}</p>}
        {error && <p className="text-xs text-nc-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
