import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, max = 100, className, showLabel = false }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('w-full', className)}>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-right">
          {value} / {max}
        </p>
      )}
    </div>
  );
}
