"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Button from './ui/Button';
import { Bell, Search, User } from 'lucide-react';

export default function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <motion.div 
      className='bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-lg z-30'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
        {/* Left: Branding */}
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-xl flex items-center justify-center'>
            <span className='text-sm font-bold text-white'>MAAI</span>
          </div>
          <div className='hidden md:block'>
            <h1 className='text-lg font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent'>
              Dashboard
            </h1>
          </div>
        </div>

        {/* Right: Actions */}
        <div className='flex items-center gap-2'>
          {/* Search */}
          <motion.div
            animate={{ scale: searchOpen ? 1 : 1 }}
            className='relative'
          >
            <Button
              variant='ghost'
              size='sm'
              className='w-10 h-10 p-0'
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className='w-5 h-5' />
            </Button>
            {searchOpen && (
              <motion.input
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 240 }}
                className='absolute right-12 top-1/2 -translate-y-1/2 bg-black/80 border border-white/20 rounded-xl px-4 py-2 text-sm backdrop-blur-md outline-none focus:border-blue-500'
                placeholder='Search projects, learning...'
              />
            )}
          </motion.div>

          {/* Notifications */}
          <Button variant='ghost' size='sm' className='w-10 h-10 p-0 relative'>
            <Bell className='w-5 h-5' />
            <motion.div 
              className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg'
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              3
            </motion.div>
          </Button>

          {/* Profile */}
          <Button variant='ghost' size='sm' className='w-10 h-10 p-0 overflow-hidden rounded-full'>
            <img 
              src='/profile.jpg' 
              alt='Profile' 
              className='w-10 h-10 rounded-full object-cover shadow-2xl ring-2 ring-white/20'
            />
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
}

