import { Home, Map, Camera, Languages, GraduationCap } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'home', icon: Home, label: 'Accueil' },
  { id: 'culture', icon: Map, label: 'Culture' },
  { id: 'scanner', icon: Camera, label: 'Scanner' },
  { id: 'translator', icon: Languages, label: 'Traduire' },
  { id: 'academy', icon: GraduationCap, label: 'Académie' }
];

export function BottomNav() {
  const { currentTab, setCurrentTab } = useAppStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-30">
      <div className="flex justify-around items-center h-16">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setCurrentTab(id)}
            className={cn(
              'flex flex-col items-center justify-center flex-1 h-full min-w-touch transition-colors',
              currentTab === id
                ? 'text-primary'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            )}
            aria-label={label}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
