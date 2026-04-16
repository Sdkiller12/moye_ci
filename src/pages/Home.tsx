import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent } from '@/components/ui/Card';
import { useEthnies } from '@/hooks/useEthnies';
import { useAppStore } from '@/store/useAppStore';

export function Home() {
  const [search, setSearch] = useState('');
  const { ethnies, loading } = useEthnies();
  const { setCurrentTab } = useAppStore();

  const filteredEthnies = ethnies.filter(e =>
    e.nom.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 3);

  return (
    <PageTransition>
      <div className="min-h-screen pb-20 pt-16">
        {/* Hero Section */}
        <motion.div
          className="relative h-64 bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          
          <div className="relative z-10 text-center text-white px-4">
            <motion.h1
              className="text-4xl md:text-5xl font-philosopher font-bold mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              MOYÉ
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              La Lumière sur notre patrimoine
            </motion.p>
          </div>
        </motion.div>

        {/* Search */}
        <div className="px-4 -mt-6 relative z-20">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une ethnie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mt-8">
          <h2 className="text-xl font-philosopher font-bold mb-4">Explorer</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setCurrentTab('scanner')}
            >
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-center">Scanner un objet</h3>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setCurrentTab('culture')}
            >
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                  <Search className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-medium text-center">Carte culturelle</h3>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Ethnies */}
        {!loading && filteredEthnies.length > 0 && (
          <div className="px-4 mt-8">
            <h2 className="text-xl font-philosopher font-bold mb-4">
              {search ? 'Résultats' : 'À découvrir'}
            </h2>
            <div className="space-y-4">
              {filteredEthnies.map((ethnie) => (
                <Card
                  key={ethnie.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    useAppStore.setState({ currentTab: 'culture' });
                  }}
                >
                  <CardContent className="flex items-center gap-4">
                    {ethnie.image_url && (
                      <img
                        src={ethnie.image_url}
                        alt={ethnie.nom}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-philosopher font-bold">{ethnie.nom}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {ethnie.region}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
