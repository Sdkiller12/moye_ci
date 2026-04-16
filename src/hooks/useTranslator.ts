import { useState } from 'react';
import { translateText } from '@/lib/translate';

export function useTranslator() {
  const [translating, setTranslating] = useState(false);
  const [translation, setTranslation] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const translate = async (text: string, source: string, target: string) => {
    setTranslating(true);
    setError(null);

    try {
      const result = await translateText(text, source, target);
      setTranslation(result);
    } catch (err) {
      setError('Échec de la traduction. Veuillez réessayer.');
    } finally {
      setTranslating(false);
    }
  };

  const reset = () => {
    setTranslation('');
    setError(null);
  };

  return { translate, translating, translation, error, reset };
}
