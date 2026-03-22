"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  BookOpen, 
  MessageSquare,
  Settings
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/learning', label: 'Learning', icon: BookOpen },
  { href: '/resume', label: 'Resume', icon: FileText },
  { href: '/contact', label: 'Connect', icon: MessageSquare },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className={cn(
        'fixed left-0 top-0 h-full w-[280px] bg-black/80 backdrop-blur-xl border-r border-white/10 z-40 shadow-2xl',
        isCollapsed && 'w-20'
      )}
    >
      {/* Header */}
      <div className='p-6 border-b border-white/10'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
            <span className='text-white font-bold text-lg'>M</span>
          </div>
          <div className={cn('space-y-1', isCollapsed && 'hidden')}>
            <h1 className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
              Madhusudhan JS
            </h1>
            <p className='text-xs text-gray-400'>Full Stack Dev</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className='p-4 space-y-2'>
        {NAV_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={item.href}>
                <Button
                  variant='ghost'
                  size='md'
                  className={cn(
                    'w-full justify-start h-14 gap-3 hover:bg-white/10 backdrop-blur-sm',
                    isCollapsed && 'justify-center p-0 w-16 h-16'
                  )}
                >
                  <Icon className='w-5 h-5 shrink-0' />
                  {!isCollapsed && <span className='text-sm font-medium'>{item.label}</span>}
                </Button>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className='absolute bottom-6 left-6 right-6 space-y-3'>
        <Button size='sm' className='w-full'>
          Download Resume
        </Button>
        <Button variant='ghost' size='sm' className='w-full'>
          <Settings className='w-4 h-4 mr-2' />
          Settings
        </Button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className='absolute -right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-110'
      >
        <span className={cn('transition-transform', isCollapsed && 'rotate-180')}>
          {'→'}
        </span>
      </button>
    </motion.aside>
  );
}

