"use client";

import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  glow?: boolean;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    children, 
    isLoading = false, 
    glow = false,
    disabled,
    ...props 
  }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-medium rounded-xl border backdrop-blur-sm transition-all duration-200 overflow-hidden shadow-lg',
          glow && 'shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]',
          {
            // Variants
            'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent hover:from-blue-700 hover:to-purple-700 active:scale-[0.97]': variant === 'primary',
            'border-blue-500/50 bg-white/5 text-blue-300 hover:bg-white/10 hover:border-blue-400': variant === 'secondary',
            'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40': variant === 'ghost',
            'border-red-500/50 bg-white/5 text-red-300 hover:bg-red-500/10': variant === 'destructive',
            
            // Sizes
            'px-4 py-2 text-sm h-10': size === 'sm',
            'px-6 py-3 text-base h-12': size === 'md',
            'px-8 py-4 text-lg h-14': size === 'lg',
          },
          className
        )}
        disabled={disabled || isLoading}
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
        {...(props as unknown as Record<string, unknown>)}
      >
        <AnimatePresence mode='wait'>
          {isLoading ? (
            <motion.svg
              key='loading'
              className='w-5 h-5 animate-spin'
              viewBox='0 0 24 24'
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
            >
              <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='3' fill='none' strokeLinecap='round' pathLength='1' strokeDasharray='31.4' className='opacity-30' />
              <path d='M12 3V9' stroke='currentColor' strokeWidth='3' strokeLinecap='round' pathLength='0.5' strokeDasharray='31.4' className='opacity-75' />
            </motion.svg>
          ) : (
            <span key='content' className='flex items-center gap-2'>{children}</span>
          )}
        </AnimatePresence>
        
        {/* Ripple effect */}
        <div className='absolute inset-0 pointer-events-none' />
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

