import { Sun, Moon, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';

export function TopBar() {
  const [darkMode, setDarkMode] = useState(false);
  const { user, totalXP } = useAppStore();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30">
      <div className="flex items-center justify-between px-4 h-14">
        <h1 className="text-2xl font-philosopher font-bold text-primary">MOYÉ</h1>
        
        <div className="flex items-center gap-2">
          {user && (
            <div className="text-sm font-medium">
              <span className="text-primary">{totalXP}</span> XP
            </div>
          )}
          
          <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          <Button variant="ghost" size="sm" onClick={() => useAppStore.getState().setCurrentTab('profile')}>
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
