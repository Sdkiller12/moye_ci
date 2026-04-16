import { useParams } from 'react-router-dom';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent } from '@/components/ui/Card';
import { useEthnie } from '@/hooks/useEthnies';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';

export function EthniePage() {
  const { id } = useParams<{ id: string }>();
  const { ethnie, loading } = useEthnie(id!);
  const { setCurrentTab } = useAppStore();

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen pb-20 pt-16 flex items-center justify-center">
          <p className="text-gray-500">Chargement...</p>
        </div>
      </PageTransition>
    );
  }

  if (!ethnie) {
    return (
      <PageTransition>
        <div className="min-h-screen pb-20 pt-16 px-4">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Ethnie non trouvée
              </p>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pb-20 pt-16">
        <div className="px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentTab('culture')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>

        {ethnie.image_url && (
          <div className="h-64 overflow-hidden">
            <img
              src={ethnie.image_url}
              alt={ethnie.nom}
              className="w-full h-full object-cover"
              aria-label={`Image de l'ethnie ${ethnie.nom}`}
            />
          </div>
        )}

        <div className="px-4 py-6 space-y-6">
          <div>
            <h1 className="text-3xl font-philosopher font-bold mb-2">
              {ethnie.nom}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{ethnie.region}</p>
          </div>

          {ethnie.description && (
            <Card>
              <CardContent className="p-4">
                <h2 className="font-philosopher font-bold mb-2">Description</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {ethnie.description}
                </p>
              </CardContent>
            </Card>
          )}

          {ethnie.histoire && (
            <Card>
              <CardContent className="p-4">
                <h2 className="font-philosopher font-bold mb-2">Histoire</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {ethnie.histoire}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
