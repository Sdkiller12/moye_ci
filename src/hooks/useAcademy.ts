import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';
import type { ModuleApprentissage, QuestionQuiz, UserProgress } from '@/types';

export function useAcademy() {
  const [modules, setModules] = useState<ModuleApprentissage[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, addXP } = useAppStore();

  useEffect(() => {
    async function fetchModules() {
      const { data } = await supabase
        .from('modules_apprentissage')
        .select('*')
        .order('ordre');

      setModules(data || []);
      setLoading(false);
    }

    fetchModules();
  }, []);

  const completeModule = async (moduleId: string, score: number) => {
    if (!user) return;

    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        module_id: moduleId,
        score,
        completed: true,
        completed_at: new Date().toISOString()
      });

    if (!error) {
      addXP(module.xp_reward);
    }
  };

  return { modules, loading, completeModule };
}

export function useQuiz(moduleId: string) {
  const [questions, setQuestions] = useState<QuestionQuiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      const { data } = await supabase
        .from('questions_quiz')
        .select('*')
        .eq('module_id', moduleId);

      setQuestions(data || []);
      setLoading(false);
    }

    fetchQuestions();
  }, [moduleId]);

  return { questions, loading };
}
