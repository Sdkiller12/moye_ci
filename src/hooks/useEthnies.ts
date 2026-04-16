import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { cacheEthnies, getCachedEthnies } from '@/lib/db';
import type { Ethnie } from '@/types';

export function useEthnies() {
  const [ethnies, setEthnies] = useState<Ethnie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchEthnies() {
      try {
        const { data, error: fetchError } = await supabase
          .from('ethnies')
          .select('*')
          .order('nom');

        if (fetchError) throw fetchError;

        setEthnies(data || []);
        if (data) cacheEthnies(data);
      } catch (err) {
        setError(err as Error);
        const cached = getCachedEthnies();
        if (cached.length > 0) {
          setEthnies(cached);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchEthnies();
  }, []);

  return { ethnies, loading, error };
}

export function useEthnie(id: string) {
  const [ethnie, setEthnie] = useState<Ethnie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEthnie() {
      const { data } = await supabase
        .from('ethnies')
        .select('*')
        .eq('id', id)
        .single();

      setEthnie(data);
      setLoading(false);
    }

    fetchEthnie();
  }, [id]);

  return { ethnie, loading };
}
