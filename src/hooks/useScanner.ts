import { useState } from 'react';
import { scanImage } from '@/lib/gemini';
import type { ScanResult } from '@/types';

export function useScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scan = async (imageFile: File) => {
    setScanning(true);
    setError(null);
    setResult(null);

    try {
      const data = await scanImage(imageFile);
      setResult(data);
    } catch (err) {
      setError('Échec de l\'analyse. Veuillez réessayer.');
    } finally {
      setScanning(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { scan, scanning, result, error, reset };
}
