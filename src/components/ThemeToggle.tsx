import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, ThemeMode } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const modes: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
    { value: 'auto', label: 'Auto', icon: Monitor },
    { value: 'day', label: 'Day', icon: Sun },
    { value: 'night', label: 'Night', icon: Moon },
  ];

  const currentMode = modes.find(m => m.value === mode) || modes[0];
  const CurrentIcon = currentMode.icon;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300"
        aria-label="Toggle theme"
      >
        <CurrentIcon className="w-4 h-4 text-white" />
        <span className="text-sm font-medium text-white hidden sm:inline">
          {currentMode.label}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 rounded-lg bg-black/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden z-50"
          >
            {modes.map((themeMode) => {
              const Icon = themeMode.icon;
              const isActive = mode === themeMode.value;

              return (
                <motion.button
                  key={themeMode.value}
                  onClick={() => {
                    setMode(themeMode.value);
                    setIsOpen(false);
                  }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{themeMode.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTheme"
                      className="ml-auto w-2 h-2 rounded-full bg-white"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


