import { useState } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useEthnies } from '@/hooks/useEthnies';
import { MapPin, Users } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export function Culture() {
  const { ethnies, loading } = useEthnies();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = Array.from(new Set(ethnies.map(e => e.region)));
  const filteredEthnies = selectedRegion
    ? ethnies.filter(e => e.region === selectedRegion)
    : ethnies;

  return (
    <PageTransition>
      <div className="min-h-screen pb-20 pt-16">
        <div className="px-4 py-6">
          <h1 className="text-3xl font-philosopher font-bold mb-2">Carte Culturelle</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explorez les ethnies de Côte d'Ivoire
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="h-64 bg-accent mx-4 rounded-xl mb-6 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
            <p className="text-sm text-gray-600">Carte interactive</p>
          </div>
        </div>

        {/* Region Filters */}
        <div className="px-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge
              variant={selectedRegion === null ? 'success' : 'default'}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedRegion(null)}
            >
              Toutes
            </Badge>
            {regions.map(region => (
              <Badge
                key={region}
                variant={selectedRegion === region ? 'success' : 'default'}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </Badge>
            ))}
          </div>
        </div>

        {/* Ethnies List */}
        <div className="px-4 space-y-4">
          {loading ? (
            <p className="text-center text-gray-500">Chargement...</p>
          ) : (
            filteredEthnies.map(ethnie => (
              <Card key={ethnie.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {ethnie.image_url && (
                      <img
                        src={ethnie.image_url}
                        alt={ethnie.nom}
                        className="w-20 h-20 rounded-lg object-cover"
                        aria-label={`Image de l'ethnie ${ethnie.nom}`}
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-philosopher font-bold mb-1">
                        {ethnie.nom}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{ethnie.region}</span>
                      </div>
                      {ethnie.population_approx && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{formatNumber(ethnie.population_approx)} habitants</span>
                        </div>
                      )}
                      {ethnie.tags && ethnie.tags.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {ethnie.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="default" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {ethnie.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2">
                      {ethnie.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </PageTransition>
  );
}
