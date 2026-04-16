import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent } from '@/components/ui/Card';
import { MessageCircle } from 'lucide-react';

export function Chat() {
  return (
    <PageTransition>
      <div className="min-h-screen pb-20 pt-16">
        <div className="px-4 py-6">
          <h1 className="text-3xl font-philosopher font-bold mb-2">Palaver Chat</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discutez en temps réel avec traduction automatique
          </p>
        </div>

        <div className="px-4">
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Bientôt disponible</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Le chat Palaver avec traduction en temps réel arrive prochainement
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
