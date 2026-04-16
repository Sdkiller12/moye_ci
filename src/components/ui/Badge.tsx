import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning';
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
          {
            'bg-primary/10 text-primary': variant === 'default',
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': variant === 'success',
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': variant === 'warning'
          },
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
