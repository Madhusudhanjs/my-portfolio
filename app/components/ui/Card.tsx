"use client";

import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hoverLift?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className, 
    glow = false,
    hoverLift = true,
    header,
    footer,
    ...props 
  }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative rounded-2xl border border-white/10 bg-white/[2.5%] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden',
          glow && 'shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]',
          className
        )}
        whileHover={hoverLift ? { y: -4, transition: { duration: 0.2 } } : {}}
        {...props}
      >
        {/* Optional header */}
        {header && (
          <div className='border-b border-white/5 p-6 pb-4'>
            {header}
          </div>
        )}
        
        {/* Content */}
        <div className='p-6'>
          {children}
        </div>
        
        {/* Optional footer */}
        {footer && (
          <div className='border-t border-white/5 p-6 pt-4 bg-white/[1%]'>
            {footer}
          </div>
        )}
        
        {/* Subtle inner glow border */}
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

