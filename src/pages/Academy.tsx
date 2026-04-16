import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAcademy } from '@/hooks/useAcademy';
import { useAppStore } from '@/store/useAppStore';
import { Lock, Star, Trophy } from 'lucide-react';

const niveauColors = {
  grain_de_sable: 'bg-yellow-100 text-yellow-800',
  palmier: 'bg-green-100 text-green-800',
  baobab: 'bg-blue-100 text-blue-800'
};

const niveauLabels = {
  grain_de_sable: 'Grain de Sable',
  palmier: 'Palmier',
  baobab: 'Baobab'
};

export function Academy() {
  const { modules, loading } = useAcademy();
  const { user, totalXP } = useAppStore();

  return (
    <PageTransition>
      <div className="min-h-screen pb-20 pt-16">
        <div className="px-4 py-6">
          <h1 className="text-3xl font-philosopher font-bold mb-2">Académie</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Apprenez les langues et cultures ivoiriennes
          </p>
        </div>

        {/* User Progress */}
        {user && (
          <div className="px-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="font-medium">Votre progression</span>
                  </div>
                  <span className="text-primary font-bold">{totalXP} XP</span>
                </div>
                <ProgressBar value={totalXP} max={1000} showLabel />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modules */}
        <div className="px-4 space-y-4">
          {loading ? (
            <p className="text-center text-gray-500">Chargement...</p>
          ) : modules.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Aucun module disponible pour le moment
                </p>
              </CardContent>
            </Card>
          ) : (
            modules.map((module, index) => {
              const isLocked = !user && index > 0;
              
              return (
                <Card
                  key={module.id}
                  className={`${isLocked ? 'opacity-60' : 'hover:shadow-lg cursor-pointer'} transition-shadow`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {isLocked ? (
                          <Lock className="w-6 h-6 text-gray-400" />
                        ) : (
                          <Star className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-philosopher font-bold">{module.titre}</h3>
                          <Badge
                            variant="default"
                            className={niveauColors[module.niveau]}
                          >
                            {niveauLabels[module.niveau]}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          +{module.xp_reward} XP
                        </p>
                        
                        {!isLocked && (
                          <div className="mt-3">
                            <ProgressBar value={0} max={100} />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Guest Message */}
        {!user && (
          <div className="px-4 mt-6">
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Connectez-vous pour débloquer tous les modules et suivre votre progression
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
