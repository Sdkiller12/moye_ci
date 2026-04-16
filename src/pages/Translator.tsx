import { useState } from 'react';
import { ArrowLeftRight, Volume2 } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useTranslator } from '@/hooks/useTranslator';
import { toast } from 'sonner';

const languages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'dioula', name: 'Dioula' }
];

export function Translator() {
  const [sourceText, setSourceText] = useState('');
  const [sourceLang, setSourceLang] = useState('fr');
  const [targetLang, setTargetLang] = useState('dioula');
  const { translate, translating, translation } = useTranslator();

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast.error('Veuillez entrer du texte');
      return;
    }
    await translate(sourceText, sourceLang, targetLang);
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translation);
  };

  return (
    <PageTransition>
      <div className="min-h-screen pb-20 pt-16">
        <div className="px-4 py-6">
          <h1 className="text-3xl font-philosopher font-bold mb-2">Traducteur</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Traduisez entre le français et les langues locales
          </p>
        </div>

        <div className="px-4 space-y-4">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 min-h-touch"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <Button variant="ghost" size="sm" onClick={swapLanguages}>
              <ArrowLeftRight className="w-5 h-5" />
            </Button>

            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 min-h-touch"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Source Text */}
          <Card>
            <CardContent className="p-4">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Entrez votre texte..."
                className="w-full h-32 bg-transparent outline-none resize-none"
                aria-label="Texte à traduire"
              />
            </CardContent>
          </Card>

          {/* Translate Button */}
          <Button
            onClick={handleTranslate}
            disabled={translating || !sourceText.trim()}
            className="w-full"
          >
            {translating ? 'Traduction...' : 'Traduire'}
          </Button>

          {/* Translation Result */}
          {translation && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Traduction</p>
                  <Button variant="ghost" size="sm">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-lg">{translation}</p>
              </CardContent>
            </Card>
          )}

          {/* Common Phrases */}
          <div className="mt-8">
            <h3 className="text-lg font-philosopher font-bold mb-3">
              Phrases courantes
            </h3>
            <div className="space-y-2">
              {[
                { fr: 'Bonjour', dioula: 'I ni sɔgɔma' },
                { fr: 'Merci', dioula: 'I ni cɛ' },
                { fr: 'Comment allez-vous?', dioula: 'I ka kɛnɛ wa?' }
              ].map((phrase, i) => (
                <Card
                  key={i}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSourceText(phrase.fr)}
                >
                  <CardContent className="p-3">
                    <p className="font-medium">{phrase.fr}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {phrase.dioula}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
