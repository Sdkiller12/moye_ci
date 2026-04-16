import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { TopBar } from '@/components/layout/TopBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Home } from '@/pages/Home';
import { Culture } from '@/pages/Culture';
import { Scanner } from '@/pages/Scanner';
import { Translator } from '@/pages/Translator';
import { Academy } from '@/pages/Academy';
import { Profile } from '@/pages/Profile';
import { Chat } from '@/pages/Chat';
import { useAppStore } from '@/store/useAppStore';
import { initDB } from '@/lib/db';

function App() {
  const { currentTab } = useAppStore();

  useEffect(() => {
    initDB();
  }, []);

  const renderPage = () => {
    switch (currentTab) {
      case 'home':
        return <Home />;
      case 'culture':
        return <Culture />;
      case 'scanner':
        return <Scanner />;
      case 'translator':
        return <Translator />;
      case 'academy':
        return <Academy />;
      case 'profile':
        return <Profile />;
      case 'chat':
        return <Chat />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <TopBar />
      <main className="relative">
        {renderPage()}
      </main>
      <BottomNav />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
