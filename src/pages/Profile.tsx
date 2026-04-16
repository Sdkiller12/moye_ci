import { useState } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import { useAppStore } from '@/store/useAppStore';
import { Mail, LogOut, Award, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

export function Profile() {
  const { user, signInWithEmail, signOut } = useAuth();
  const { totalXP } = useAppStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email) {
      toast.error('Veuillez entrer votre email');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmail(email);
      toast.success('Lien magique envoyé! Vérifiez votre email.');
      setEmail('');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du lien');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Déconnexion réussie');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pb-20 pt-16">
        <div className="px-4 py-6">
          <h1 className="text-3xl font-philosopher font-bold mb-2">Profil</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez votre compte et vos badges
          </p>
        </div>

        <div className="px-4 space-y-4">
          {user ? (
            <>
              {/* User Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{user.email}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {totalXP} XP
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Se déconnecter
                  </Button>
                </CardContent>
              </Card>

              {/* Badges */}
              <div>
                <h2 className="text-xl font-philosopher font-bold mb-3">
                  Mes badges
                </h2>
                <Card>
                  <CardContent className="p-8 text-center">
                    <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Complétez des modules pour débloquer des badges
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Stats */}
              <div>
                <h2 className="text-xl font-philosopher font-bold mb-3">
                  Statistiques
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-primary">{totalXP}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Points XP
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-primary">0</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Modules complétés
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-philosopher font-bold mb-2">
                      Connexion
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Recevez un lien magique par email
                    </p>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:border-primary"
                      aria-label="Adresse email"
                    />
                    
                    <Button
                      onClick={handleSignIn}
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? 'Envoi...' : 'Envoyer le lien magique'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Guest Benefits */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Pourquoi se connecter?</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Suivez votre progression</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Débloquez des badges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Accédez au chat Palaver</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Sauvegardez vos favoris</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
