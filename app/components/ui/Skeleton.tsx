import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  count?: number;
  width?: string | number;
  height?: string | number;
  pulse?: boolean;
}

export default function Skeleton({
  className,
  count = 1,
  width,
  height,
  pulse = true
}: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            'bg-gradient-to-r from-gray-700/40 via-white/10 to-gray-700/40 rounded-xl border border-gray-800/50 backdrop-blur-sm',
            pulse && 'animate-pulse',
            width && typeof width === 'string' && width,
            height && typeof height === 'string' && height,
            className
          )}
          style={
            width && typeof width === 'number' 
              ? { width } 
              : height && typeof height === 'number' 
              ? { height } 
              : undefined
          }
          initial={{ opacity: 0.4 }}
          animate={pulse ? { opacity: [0.4, 0.7, 0.4] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      ))}
    </>
  );
}

