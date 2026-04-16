import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, X } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useScanner } from '@/hooks/useScanner';
import { toast } from 'sonner';

export function Scanner() {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { scan, scanning, result, error, reset } = useScanner();

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    await scan(file);
  };

  const handleReset = () => {
    setPreview(null);
    reset();
  };

  return (
    <PageTransition>
      <div className="min-h-screen pb-20 pt-16">
        <div className="px-4 py-6">
          <h1 className="text-3xl font-philosopher font-bold mb-2">Scanner</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Identifiez des objets culturels ivoiriens
          </p>
        </div>

        <div className="px-4">
          {!preview ? (
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Prenez une photo ou importez une image
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    L'IA analysera l'objet culturel
                  </p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />
                  
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Choisir une image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Aperçu"
                      className="w-full rounded-lg"
                      aria-label="Image à analyser"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/90"
                      onClick={handleReset}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {scanning && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <p className="text-gray-600 dark:text-gray-400">
                      Analyse en cours...
                    </p>
                  </CardContent>
                </Card>
              )}

              {error && (
                <Card className="border-red-200 dark:border-red-800">
                  <CardContent className="p-4 text-center text-red-600 dark:text-red-400">
                    {error}
                  </CardContent>
                </Card>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-philosopher font-bold mb-3">
                        Résultat de l'analyse
                      </h3>
                      
                      {result.type_objet === 'inconnu' ? (
                        <p className="text-gray-600 dark:text-gray-400">
                          Cet objet ne semble pas être un artefact culturel ivoirien.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                            <p className="font-medium capitalize">{result.type_objet}</p>
                          </div>
                          
                          {result.nom_probable && (
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Nom probable</p>
                              <p className="font-medium">{result.nom_probable}</p>
                            </div>
                          )}
                          
                          {result.ethnie_probable && (
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Ethnie</p>
                              <p className="font-medium">{result.ethnie_probable}</p>
                            </div>
                          )}
                          
                          {result.description_courte && (
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                              <p className="text-sm">{result.description_courte}</p>
                            </div>
                          )}
                          
                          {result.usage_culturel && (
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Usage culturel</p>
                              <p className="text-sm">{result.usage_culturel}</p>
                            </div>
                          )}
                          
                          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Confiance: {Math.round(result.confiance * 100)}%
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
